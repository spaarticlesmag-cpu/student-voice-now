import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const signInput = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(255),
});

function serverClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
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
