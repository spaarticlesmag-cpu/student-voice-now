import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, Suspense } from "react";
import { Loader2, ShieldAlert, Send, Users, Mail, Scale, GraduationCap } from "lucide-react";

import { getPetitionStats, signPetition } from "@/lib/petition.functions";
import heroImage from "@/assets/protest-hero.jpg";

const statsQuery = queryOptions({
  queryKey: ["petition-stats"],
  queryFn: () => getPetitionStats(),
  staleTime: 15_000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Justice for Students — Petition Against Brutality at Jantar Mantar",
      },
      {
        name: "description",
        content:
          "Sign the petition demanding an end to police brutality against peaceful student protesters at Jantar Mantar, Delhi. Delivered to the PM, Supreme Court, and Education Minister.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(statsQuery);
  },
  component: PetitionPage,
});

function PetitionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Hero />
      <Recipients />
      <Suspense fallback={null}>
        <Wall />
      </Suspense>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Students holding candles at a peaceful protest at Jantar Mantar, Delhi"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-28 lg:py-32">
        <div className="text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <ShieldAlert className="h-3.5 w-3.5" />
            Jantar Mantar · Delhi
          </div>

          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Stop the brutality against
            <span className="block text-[oklch(0.85_0.16_75)]">peaceful student protesters.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Students who gathered at Jantar Mantar to raise their voice were met with force
            instead of dialogue. Add your name below. Every signature is delivered directly
            to the Prime Minister's Office, the Supreme Court of India, and the Union
            Education Minister.
          </p>

          <Suspense
            fallback={
              <div className="mt-8 h-6 w-40 animate-pulse rounded bg-white/20" />
            }
          >
            <SignatureCount />
          </Suspense>
        </div>

        <div className="relative">
          <SignForm />
        </div>
      </div>
    </section>
  );
}

function SignatureCount() {
  const { data } = useSuspenseQuery(statsQuery);
  return (
    <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
      <Users className="h-5 w-5" />
      <div>
        <div className="font-display text-2xl font-bold leading-none tabular-nums">
          {data.total.toLocaleString("en-IN")}
        </div>
        <div className="text-xs uppercase tracking-wider text-white/75">
          signatures so far
        </div>
      </div>
    </div>
  );
}

function SignForm() {
  const router = useRouter();
  const sign = useServerFn(signPetition);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    { kind: "idle" } | { kind: "loading" } | { kind: "error"; msg: string } | { kind: "done"; total: number }
  >({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "loading" });
    try {
      const res = await sign({ data: { name, email } });
      setState({ kind: "done", total: res.total });
      setName("");
      setEmail("");
      router.invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setState({ kind: "error", msg });
    }
  }

  if (state.kind === "done") {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-8 text-card-foreground"
        style={{ boxShadow: "var(--shadow-strong)" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Send className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">Thank you for standing up.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your signature has been recorded. You are number{" "}
          <span className="font-semibold text-foreground">{state.total.toLocaleString("en-IN")}</span>{" "}
          to demand accountability. Share this petition — the louder we are, the harder we
          are to ignore.
        </p>
        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign another name →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8"
      style={{ boxShadow: "var(--shadow-strong)" }}
    >
      <h2 className="font-display text-2xl font-bold leading-tight">Add your signature</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Takes 20 seconds. No spam, ever.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none ring-ring/30 transition focus:border-ring focus:ring-4"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none ring-ring/30 transition focus:border-ring focus:ring-4"
          />
        </div>

        {state.kind === "error" && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.msg}
          </p>
        )}

        <button
          type="submit"
          disabled={state.kind === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
        >
          {state.kind === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Sign the petition
            </>
          )}
        </button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          By signing, you agree to have your name displayed publicly on this page and
          delivered to the officials listed below. Your email is kept private.
        </p>
      </div>
    </form>
  );
}

function Recipients() {
  const items = [
    {
      icon: ShieldAlert,
      title: "Prime Minister's Office",
      email: "appt.pmo@nic.in",
    },
    {
      icon: Scale,
      title: "Supreme Court of India",
      email: "supremecourt@nic.in",
    },
    {
      icon: GraduationCap,
      title: "Union Education Minister",
      email: "d.pradhan@sansad.nic.in",
    },
  ];

  return (
    <section className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            <Mail className="h-3.5 w-3.5" /> Where your signature goes
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Delivered to the three offices that must answer for this.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-secondary-foreground/75">
            Every signature is recorded and formally notified to the following public
            offices. Silence is not an option.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.email}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-primary/50 hover:bg-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-1 break-all text-sm text-secondary-foreground/70">
                {item.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wall() {
  const { data } = useSuspenseQuery(statsQuery);
  if (data.recent.length === 0) {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-bold">Be the first to sign.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your name will lead this petition.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Standing together
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A few of the {data.total.toLocaleString("en-IN")} people who have added their
              name.
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {data.recent.map((s, i) => (
            <li
              key={i}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-card-foreground"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        <p>
          This is a citizen-run petition. No political party or organization is affiliated.
          Signatures are stored securely and used only for delivery to the offices listed.
        </p>
      </div>
    </footer>
  );
}
