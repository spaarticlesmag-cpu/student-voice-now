import { c as createServerFn, i as TSS_SERVER_FUNCTION, y as __toESM } from "./createServerFn-BpgqxZjr.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BqZKx5nx.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as require_react, i as require_jsx_runtime, n as useSuspenseQuery, r as QueryClientProvider, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { c as createFileRoute, d as useRouter, f as isRedirect, i as HeadContent, l as createRootRouteWithContext, o as createRouter, r as Scripts, s as Outlet, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mail, i as Scale, n as ShieldAlert, o as LoaderCircle, r as Send, s as GraduationCap, t as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Tvj7WARm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Be7Zuyq9.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$2 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Justice for Students — Petition Against Brutality at Jantar Mantar" },
			{
				name: "description",
				content: "Sign the petition demanding an end to police brutality against peaceful student protesters at Jantar Mantar, Delhi. Your signature is delivered to the PM, Supreme Court and Education Minister."
			},
			{
				name: "author",
				content: "Justice for Students"
			},
			{
				property: "og:title",
				content: "Justice for Students — Petition Against Brutality at Jantar Mantar"
			},
			{
				property: "og:description",
				content: "Stand with the students. Demand accountability from the PM, Supreme Court, and Education Minister."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$2.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var signInput = objectType({
	name: stringType().trim().min(2, "Please enter your full name").max(100),
	email: stringType().trim().toLowerCase().email("Please enter a valid email").max(255)
});
var signPetition = createServerFn({ method: "POST" }).validator((data) => signInput.parse(data)).handler(createSsrRpc("db628e9f56c100202510c1d9dba52d1f67669868d0728940e0314836bad9c568"));
var getPetitionStats = createServerFn({ method: "GET" }).handler(createSsrRpc("290c3254fad5d8e6aa219c8cf772579890fdaa2de3ef6cb3323f127d81d6b753"));
var catchUpEmails = createServerFn({ method: "POST" }).handler(createSsrRpc("3f60bbca8a69d7ae029e7f553d786d6d90ab561281d9cc00d030c44a6abc9a5f"));
var protest_hero_default = "/assets/protest-hero-BcIpUFXm.jpg";
var statsQuery = queryOptions({
	queryKey: ["petition-stats"],
	queryFn: () => getPetitionStats(),
	staleTime: 15e3
});
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Justice for Students — Petition Against Brutality at Jantar Mantar" }, {
		name: "description",
		content: "Sign the petition demanding an end to police brutality against peaceful student protesters at Jantar Mantar, Delhi. Delivered to the PM, Supreme Court, and Education Minister."
	}] }),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(statsQuery);
	},
	component: PetitionPage
});
function PetitionPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground font-body",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recipients, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: protest_hero_default,
				alt: "Students holding candles at a peaceful protest at Jantar Mantar, Delhi",
				width: 1920,
				height: 1280,
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "var(--gradient-hero)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-28 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3.5 w-3.5" }), "Jantar Mantar · Delhi"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl",
							children: ["Stop the brutality against", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[oklch(0.85_0.16_75)]",
								children: "peaceful student protesters."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg",
							children: "Students who gathered at Jantar Mantar to raise their voice were met with force instead of dialogue. Add your name below. Every signature is delivered directly to the Prime Minister's Office, the Supreme Court of India, and the Union Education Minister."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-6 w-40 animate-pulse rounded bg-white/20" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignatureCount, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignForm, {})
				})]
			})
		]
	});
}
function SignatureCount() {
	const { data } = useSuspenseQuery(statsQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-3 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-bold leading-none tabular-nums",
			children: data.total.toLocaleString("en-IN")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-white/75",
			children: "signatures so far"
		})] })]
	});
}
function SignForm() {
	const router = useRouter();
	const sign = useServerFn(signPetition);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)({ kind: "idle" });
	async function onSubmit(e) {
		e.preventDefault();
		setState({ kind: "loading" });
		try {
			const res = await sign({ data: {
				name,
				email
			} });
			setState({
				kind: "done",
				total: res.total
			});
			setName("");
			setEmail("");
			router.invalidate();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Something went wrong.";
			setState({
				kind: "error",
				msg
			});
		}
	}
	if (state.kind === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-8 text-card-foreground",
		style: { boxShadow: "var(--shadow-strong)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-2xl font-bold",
				children: "Thank you for standing up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"Your signature has been recorded. You are number",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: state.total.toLocaleString("en-IN")
					}),
					" ",
					"to demand accountability. Share this petition — the louder we are, the harder we are to ignore."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setState({ kind: "idle" }),
				className: "mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline",
				children: "Sign another name →"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8",
		style: { boxShadow: "var(--shadow-strong)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold leading-tight",
				children: "Add your signature"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Takes 20 seconds. No spam, ever."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "name",
						className: "text-sm font-semibold",
						children: "Full name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "name",
						type: "text",
						required: true,
						minLength: 2,
						maxLength: 100,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Priya Sharma",
						className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none ring-ring/30 transition focus:border-ring focus:ring-4"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "email",
						className: "text-sm font-semibold",
						children: "Email address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "email",
						type: "email",
						required: true,
						maxLength: 255,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "you@example.com",
						className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none ring-ring/30 transition focus:border-ring focus:ring-4"
					})] }),
					state.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: state.msg
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: state.kind === "loading",
						className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60",
						children: state.kind === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Signing…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Sign the petition"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted-foreground",
						children: "By signing, you agree to have your name displayed publicly on this page and delivered to the officials listed below. Your email is kept private."
					})
				]
			})
		]
	});
}
function Recipients() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border bg-secondary text-secondary-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), " Where your signature goes"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl",
						children: "Delivered to the three offices that must answer for this."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-secondary-foreground/75",
						children: "Every signature is recorded and formally notified to the following public offices. Silence is not an option."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						icon: ShieldAlert,
						title: "Prime Minister's Office",
						email: "appt.pmo@nic.in"
					},
					{
						icon: Scale,
						title: "Supreme Court of India",
						email: "supremecourt@nic.in"
					},
					{
						icon: GraduationCap,
						title: "Union Education Minister",
						email: "d.pradhan@sansad.nic.in"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-primary/50 hover:bg-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-bold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 break-all text-sm text-secondary-foreground/70",
							children: item.email
						})
					]
				}, item.email))
			})]
		})
	});
}
function Wall() {
	const { data } = useSuspenseQuery(statsQuery);
	if (data.recent.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold",
				children: "Be the first to sign."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your name will lead this petition."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold leading-tight sm:text-4xl",
					children: "Standing together"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"A few of the ",
						data.total.toLocaleString("en-IN"),
						" people who have added their name."
					]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 flex flex-wrap gap-2",
				children: data.recent.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-card-foreground",
					children: s.name
				}, i))
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This is a citizen-run petition. No political party or organization is affiliated. Signatures are stored securely and used only for delivery to the offices listed." })
		})
	});
}
var Route = createFileRoute("/admin")({ component: AdminPage });
function AdminPage() {
	const [status, setStatus] = (0, import_react.useState)({ kind: "idle" });
	async function handleCatchUp() {
		setStatus({ kind: "sending" });
		try {
			const result = await catchUpEmails();
			setStatus({
				kind: "done",
				sent: result.sent,
				total: result.total
			});
		} catch (err) {
			setStatus({
				kind: "error",
				message: err instanceof Error ? err.message : "Unknown error"
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-2 text-2xl font-bold",
				children: "Admin — Catch-up Emails"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-sm text-muted-foreground",
				children: "Send petition notification emails for ALL existing signatories. Each signatory gets one email addressed to the Supreme Court, with PMO and Education Minister in CC. A 3-second delay is applied between sends."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleCatchUp,
				disabled: status.kind === "sending",
				className: "rounded bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50",
				children: status.kind === "sending" ? "Sending…" : "Send Catch-up Emails"
			}),
			status.kind === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded border border-green-500/30 bg-green-500/10 p-4 text-green-700",
				children: [
					"Done! Sent ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: status.sent }),
					" of ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: status.total }),
					" emails."
				]
			}),
			status.kind === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded border border-red-500/30 bg-red-500/10 p-4 text-red-700",
				children: ["Error: ", status.message]
			})
		]
	});
}
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	AdminRoute: Route.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
