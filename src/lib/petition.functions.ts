import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const signInput = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(255),
});

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function serverClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: createSupabaseFetch(key),
    },
  });
}

export const signPetition = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signInput.parse(data))
  .handler(async ({ data }) => {
    const supabase = serverClient();

    const { error } = await supabase.from("petition_signatures").insert({
      name: data.name,
      email: data.email,
    });

    if (error) {
      if (error.code === "23505") {
        throw new Error("This email has already signed the petition.");
      }
      console.error("[signPetition] insert failed:", error);
      throw new Error("We couldn't record your signature. Please try again.");
    }

    // Send notification emails via Gmail connector (from petitionforpeace26@gmail.com)
    try {
      await sendPetitionEmails(data.name, data.email);
    } catch (e) {
      console.error("[signPetition] email dispatch failed:", e);
      // Do not fail the signature if email dispatch fails
    }

    const { count } = await supabase
      .from("petition_signatures")
      .select("*", { count: "exact", head: true });

    return { ok: true as const, total: count ?? 0 };
  });

export const getPetitionStats = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverClient();
  const { count } = await supabase
    .from("petition_signatures")
    .select("*", { count: "exact", head: true });

  const { data: recent } = await supabase
    .from("petition_signatures")
    .select("name, created_at")
    .order("created_at", { ascending: false })
    .limit(12);

  return { total: count ?? 0, recent: recent ?? [] };
});

const RECIPIENTS = [
  { name: "Prime Minister's Office", email: "connect@mygov.nic.in" },
  { name: "Supreme Court of India", email: "supremecourt@nic.in" },
  { name: "Ministry of Education", email: "minister.sm@gov.in" },
];

function buildRawEmail(to: string, subject: string, body: string): string {
  const from = "Petition for Peace <petitionforpeace26@gmail.com>";
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    body,
  ].join("\r\n");
  // base64url encode
  const b64 = Buffer.from(message, "utf-8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sendPetitionEmails(signerName: string, signerEmail: string) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.warn("[sendPetitionEmails] Missing gateway credentials; skipping.");
    return;
  }

  const subject = "Citizen Petition: End Brutality Against Student Protesters at Jantar Mantar";
  const body = [
    `Respected Sir/Madam,`,
    ``,
    `A citizen has signed a petition calling for immediate action against the brutality inflicted on peaceful student protesters at Jantar Mantar, Delhi.`,
    ``,
    `Signer details:`,
    `  Name: ${signerName}`,
    `  Email: ${signerEmail}`,
    `  Time: ${new Date().toUTCString()}`,
    ``,
    `We urge your office to:`,
    `  1. Investigate the incidents of police excess against student protesters.`,
    `  2. Ensure the constitutional right to peaceful protest is protected.`,
    `  3. Hold those responsible for the violence accountable.`,
    ``,
    `This message was sent on behalf of a signatory of the online petition hosted at Petition for Peace.`,
    ``,
    `Regards,`,
    `Petition for Peace`,
  ].join("\r\n");

  await Promise.all(
    RECIPIENTS.map(async (r) => {
      const raw = buildRawEmail(`${r.name} <${r.email}>`, subject, body);
      const res = await fetch(
        "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": gmailKey,
          },
          body: JSON.stringify({ raw }),
        },
      );
      if (!res.ok) {
        const errText = await res.text();
        console.error(`[sendPetitionEmails] ${r.email} failed [${res.status}]: ${errText}`);
      }
    }),
  );
}
