import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as Landmark, d as ChartCandlestick, f as Bot, i as Square, l as Copy, m as ArrowRight, n as Timer, o as Play, p as BookOpen, r as Store, s as Lock, u as Coins } from "../_libs/lucide-react.mjs";
import { a as positionValue, c as HOOK_ADDRESS, d as GRADUATION_ETH, f as marketCap, i as curveProgress, l as LOCKER_ADDRESS, n as useBotEquity, o as ESCROW_ADDRESS, p as snipeTaxBps, r as useSim, s as FACTORY_ADDRESS, u as ETH_USD } from "./router-BMPPGlQ1.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9RPPPHG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function shortAddr(addr, size = 4) {
	if (addr.length < size * 2 + 2) return addr;
	return `${addr.slice(0, 2 + size)}…${addr.slice(-size)}`;
}
function formatEth(n, digits = 4) {
	if (!Number.isFinite(n)) return "0";
	const abs = Math.abs(n);
	if (abs === 0) return "0";
	if (abs >= 100) return n.toFixed(2);
	if (abs >= 1) return n.toFixed(Math.min(digits, 4));
	if (abs >= 1e-4) return n.toFixed(Math.min(digits + 1, 5));
	return n.toExponential(2);
}
function formatUsd(eth, ethPrice = 3480) {
	const usd = eth * ethPrice;
	const abs = Math.abs(usd);
	const sign = usd < 0 ? "-" : "";
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}k`;
	if (abs >= 1) return `${sign}$${abs.toFixed(2)}`;
	return `${sign}$${abs.toFixed(3)}`;
}
function formatCompact(n) {
	const abs = Math.abs(n);
	if (abs >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
	if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
	if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
	return n.toFixed(0);
}
function formatPct(n, digits = 1) {
	return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}
var TABS = [
	{
		id: "explain",
		label: "Så funkar det",
		icon: BookOpen
	},
	{
		id: "market",
		label: "Trenches",
		icon: ChartCandlestick
	},
	{
		id: "bot",
		label: "Min bot",
		icon: Bot
	},
	{
		id: "hook",
		label: "Hooken",
		icon: Landmark
	}
];
function Shell({ children }) {
	const view = useSim((s) => s.view);
	const setView = useSim((s) => s.setView);
	const running = useSim((s) => s.bot.running);
	const fees = useSim((s) => s.world.hook.protocolFeesEth);
	const swaps = useSim((s) => s.world.hook.swapsProcessed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium tracking-tight",
									children: "HOOK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden font-mono text-[10px] uppercase tracking-[0.14em] text-subtle sm:block",
									children: "Pons V2 replica"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView(tab.id),
								className: cn("inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", view === tab.id ? "bg-raised text-fg" : "text-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, {
									className: "size-4",
									strokeWidth: 1.6
								}), tab.label]
							}, tab.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 font-mono text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("hidden sm:inline", running ? "text-long" : "text-subtle"),
									children: running ? "LIVE" : "IDLE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-muted",
									children: [formatEth(fees, 4), " ETH"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden tabular text-subtle sm:inline",
									children: [swaps, " tx"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-3 pt-3 md:px-4 md:pt-5",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(tab.id),
						className: cn("flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[11px]", view === tab.id ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, {
							className: "size-4",
							strokeWidth: 1.6
						}), tab.label]
					}) }, tab.id))
				})
			})
		]
	});
}
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			className: "fill-raised"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M9 8h3.2v12.2a4.8 4.8 0 1 0 9.6 0V14H19v6.2a1.6 1.6 0 1 1-3.2 0V8H9z",
			className: "fill-accent"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "border border-border bg-transparent text-fg hover:bg-raised",
			long: "bg-long text-bg hover:opacity-90",
			short: "bg-short text-fg hover:opacity-90",
			subtle: "bg-raised text-fg hover:bg-border"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var STEPS = [
	{
		n: "01",
		icon: Store,
		title: "Någon bakar en ny kaka",
		body: "En person gör en memecoin. Hela högen läggs i en automat — en bonding curve. Automaten säljer kakor billigt först, dyrare sen. Precis som om det bara fanns tre glassar kvar i kiosken."
	},
	{
		n: "02",
		icon: Coins,
		title: "Folk stoppar in pengar",
		body: "Du ger automaten ETH. Den ger dig kakor tillbaka. Ju mer som köps, desto dyrare blir nästa kaka. Säljer du, får du ETH tillbaka — men lite mindre, för priset har rört sig."
	},
	{
		n: "03",
		icon: Landmark,
		title: "Kassamaskinen tar en slant",
		body: "Det här är den viktiga biten. Adressen du skickade är inte en person som handlar. Det är kassamaskinen. Varje gång någon köper eller säljer tar den en liten avgift i ETH. Den sitter i VARJE butik som Pons öppnar. Därför ser det ut som att den 'handlar' miljoner gånger."
	},
	{
		n: "04",
		icon: Timer,
		title: "De första fem sekunderna är en fälla",
		body: "Just när kakan kommer ut tar kassan 99% av pengarna. Efter en sekund ungefär 25%. Efter två sekunder 3%. Efter fem sekunder noll. Det är för att stoppa fuskare som försöker köpa före alla andra. Väntar du lite, betalar du nästan inget extra."
	},
	{
		n: "05",
		icon: Lock,
		title: "När automaten är tom låses kakan in",
		body: "När folk köpt för 4,2 ETH är automaten slutsåld. Då flyttas kakan till en stor butik (Uniswap v4) och låses för alltid. Ingen kan stjäla pengarna ur butiken. Kassamaskinen sitter kvar och tar avgift där också."
	}
];
function ExplainView() {
	const setView = useSim((s) => s.setView);
	const toggleBot = useSim((s) => s.toggleBot);
	const running = useSim((s) => s.bot.running);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 pb-28 pt-6 md:gap-10 md:pb-16 md:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-muted",
						children: "Robinhood Chain · Pons V2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-[2.15rem] leading-[1.12] tracking-[-0.03em] text-fg md:text-5xl",
						children: ["Det är inte en robot som handlar.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: " Det är en kassamaskin."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-xl text-base leading-relaxed text-muted",
						children: [
							"Adressen ",
							shortAddr(HOOK_ADDRESS, 6),
							" på GMGN ser ut som världens mest hyperaktiva bot. Den är Pons V2 Meme Hook — en Uniswap v4-krok som tar avgift på varje swap. Här är en exakt kopia du kan köra, med leksakspengar."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-border bg-surface p-4 shadow-panel md:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-raised text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
								className: "size-5",
								strokeWidth: 1.6
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-subtle",
									children: step.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[15px] font-medium tracking-tight",
									children: step.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: step.body
							})]
						})]
					})
				}, step.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-[-0.03em]",
						children: "Vad din kopia gör"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "När du startar boten händer två saker, precis som i originalet:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 flex flex-col gap-3 text-sm leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 font-mono text-[11px] text-subtle",
								children: "A"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "Hooken"
							}), " binder sig till varje ny lansering och tar 1% i ETH. 30% går till protokollet (det är din vinst som kassamaskin), 70% till den som bakade kakan."] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 font-mono text-[11px] text-subtle",
								children: "B"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "Snipern"
							}), " väntar tills femsekundersfällan lugnat sig, köper för en fast ETH-summa, och säljer vid vinstmål eller stop-loss. Precis så folk försöker rida på samma pools."] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Inga riktiga pengar. Ingen privat nyckel. Marknaden här inne är en levande kopia av kurvan, skatten och graduationen — så du ser hur originalet tänker."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								if (!running) toggleBot();
								setView("bot");
							},
							children: ["Starta min kopia", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setView("market"),
							children: "Titta på trenches först"
						})]
					})
				]
			})
		]
	});
}
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide", tone === "muted" && "bg-raised text-muted", tone === "long" && "bg-long-dim text-long", tone === "short" && "bg-short-dim text-short", tone === "accent" && "bg-accent text-accent-fg", className),
		children
	});
}
function Spark({ data, className, up }) {
	if (data.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className });
	const min = Math.min(...data);
	const span = Math.max(...data) - min || 1;
	const w = 72;
	const h = 28;
	const d = data.map((v, i) => {
		const x = i / (data.length - 1) * w;
		const y = h - (v - min) / span * 26 - 1;
		return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: up ? "var(--color-long)" : "var(--color-short)",
			strokeWidth: "1.5"
		})
	});
}
var CHIP = [
	"bg-chip-1",
	"bg-chip-2",
	"bg-chip-3",
	"bg-chip-4",
	"bg-chip-5",
	"bg-chip-6"
];
function ageSec(token, now) {
	return (now - token.launchedAt) / 1e3;
}
function MarketView() {
	const tokens = useSim((s) => s.world.tokens);
	const now = useSim((s) => s.world.now);
	const tape = useSim((s) => s.world.tape);
	const selectedId = useSim((s) => s.selectedId);
	const select = useSim((s) => s.select);
	const selected = tokens.find((t) => t.id === selectedId) ?? tokens[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 pb-28 md:grid-cols-[minmax(0,1fr)_300px] md:pb-4 lg:grid-cols-[minmax(0,1fr)_340px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0 rounded-xl border border-border bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Trenches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Nya Pons V2-lanseringar · kurva till ",
							GRADUATION_ETH,
							" ETH"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [tokens.length, " tokens"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_1fr] gap-2 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-subtle md:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Token" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Pris"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Mcap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Kurva"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Snipe"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-[70vh] divide-y divide-border overflow-y-auto",
					children: [tokens.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-10 text-center text-sm text-muted",
						children: "Väntar på första lanseringen…"
					}), tokens.map((token) => {
						const age = ageSec(token, now);
						const tax = token.graduated ? 0 : snipeTaxBps(age);
						const prog = curveProgress(token);
						const up = token.lastPrice >= token.openPrice;
						const active = selected?.id === token.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => select(token.id),
							className: cn("grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left md:grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_1fr]", active ? "bg-raised" : "hover:bg-raised/60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex size-9 shrink-0 items-center justify-center rounded-md font-mono text-[10px] text-accent", CHIP[(token.chip - 1) % CHIP.length]),
										children: token.symbol.slice(0, 2)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate text-sm font-medium",
													children: token.name
												}),
												token.hot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "short",
													children: "het"
												}),
												token.graduated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "long",
													children: "v4"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block font-mono text-[11px] text-subtle",
											children: [
												token.symbol,
												" · ",
												shortAddr(token.address)
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("hidden text-right font-mono text-xs tabular md:block", up ? "text-long" : "text-short"),
									children: formatEth(token.lastPrice, 6)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-right font-mono text-xs tabular text-muted md:block",
									children: formatUsd(marketCap(token.lastPrice) / ETH_USD)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden md:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-right font-mono text-[11px] text-muted",
										children: token.graduated ? "låst" : `${Math.round(prog * 100)}%`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block h-1 overflow-hidden rounded-full bg-raised",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full rounded-full bg-accent",
											style: { width: `${Math.round(prog * 100)}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
										data: token.spark,
										up,
										className: "hidden h-7 w-16 sm:block"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("font-mono text-xs tabular", tax > 300 ? "text-short" : "text-muted"),
										children: token.graduated ? "—" : `${(tax / 100).toFixed(0)}%`
									})]
								})
							]
						}) }, token.id);
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex min-w-0 flex-col gap-3",
			children: [selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenDetail, {
				token: selected,
				now
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Tape"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Varje rad går genom hooken"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-72 divide-y divide-border overflow-y-auto font-mono text-[11px]",
					children: tape.slice(0, 24).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: row.side === "buy" ? "text-long" : "text-short",
									children: row.side === "buy" ? "BUY" : "SELL"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-fg",
									children: row.symbol
								}),
								row.trader === "bot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: "du"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-muted",
							children: [formatEth(row.eth, 3), " ETH"]
						})]
					}, row.id))
				})]
			})]
		})]
	});
}
function TokenDetail({ token, now }) {
	const age = ageSec(token, now);
	const tax = token.graduated ? 0 : snipeTaxBps(age);
	const prog = curveProgress(token);
	const real = Math.max(0, token.quoteReserve - token.phantomQuote);
	const up = token.lastPrice >= token.openPrice;
	const chg = token.openPrice > 0 ? (token.lastPrice - token.openPrice) / token.openPrice * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: token.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-subtle",
					children: shortAddr(token.address, 6)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: token.graduated ? "long" : "muted",
					children: token.graduated ? "Uniswap v4" : "kurva"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-3 font-mono text-2xl tabular", up ? "text-long" : "text-short"),
				children: [formatEth(token.lastPrice, 8), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-xs",
					children: formatPct(chg)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Volym",
						value: `${formatEth(token.volumeEth, 3)} ETH`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Trades",
						value: formatCompact(token.trades)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Holders",
						value: String(token.holders)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Kurva",
						value: token.graduated ? "4.20 / 4.20" : `${real.toFixed(2)} / ${GRADUATION_ETH}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Snipe-skatt",
						value: token.graduated ? "0%" : `${(tax / 100).toFixed(1)}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Creator tax",
						value: `${(token.creatorTaxBps / 100).toFixed(1)}%`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between font-mono text-[10px] uppercase tracking-wide text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Graduation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(prog * 100), "%"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-raised",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-accent",
						style: { width: `${Math.round(prog * 100)}%` }
					})
				})]
			}),
			token.buybackEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Buyback på. Återköpta tokens låses i fem år."
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5 font-mono tabular text-fg",
		children: value
	})] });
}
function BotView() {
	const bot = useSim((s) => s.bot);
	const patch = useSim((s) => s.patchBot);
	const toggle = useSim((s) => s.toggleBot);
	const world = useSim((s) => s.world);
	const equity = useBotEquity();
	const pnl = equity - world.botStartCash;
	const pnlPct = pnl / world.botStartCash * 100;
	const wins = world.closed.filter((c) => c.pnlEth > 0).length;
	const losses = world.closed.filter((c) => c.pnlEth <= 0).length;
	const winRate = wins + losses === 0 ? 0 : wins / (wins + losses) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 pb-28 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-4 md:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-muted",
							children: "Sniper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl tracking-[-0.03em]",
							children: "Din kopia handlar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-md text-sm text-muted",
							children: "Väntar ut snipe-skatten, köper, säljer på mål. Hooken tar avgift på dina affärer också — precis som originalet."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: bot.running ? "short" : "default",
						onClick: toggle,
						children: [bot.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), bot.running ? "Stoppa" : "Starta boten"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi$1, {
							label: "Equity",
							value: `${formatEth(equity, 3)} ETH`,
							sub: formatUsd(equity)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi$1, {
							label: "PnL",
							value: formatEth(pnl, 3),
							sub: formatPct(pnlPct),
							tone: pnl >= 0 ? "long" : "short"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi$1, {
							label: "Win rate",
							value: `${winRate.toFixed(0)}%`,
							sub: `${wins}W / ${losses}L`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi$1, {
							label: "Kassa",
							value: `${formatEth(world.botCash, 3)}`,
							sub: `${world.positions.length} öppna`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Köpsumma",
							hint: `${bot.buyEth.toFixed(3)} ETH per entry`,
							min: .01,
							max: .25,
							step: .01,
							value: bot.buyEth,
							onChange: (v) => patch({ buyEth: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Max snipe-skatt",
							hint: `Köper först under ${(bot.maxSnipeTaxBps / 100).toFixed(0)}%`,
							min: 0,
							max: 2500,
							step: 50,
							value: bot.maxSnipeTaxBps,
							onChange: (v) => patch({ maxSnipeTaxBps: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Take profit",
							hint: `Sälj vid +${bot.takeProfitPct.toFixed(0)}%`,
							min: 10,
							max: 400,
							step: 5,
							value: bot.takeProfitPct,
							onChange: (v) => patch({ takeProfitPct: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Stop loss",
							hint: `Sälj vid −${bot.stopLossPct.toFixed(0)}%`,
							min: 5,
							max: 80,
							step: 1,
							value: bot.stopLossPct,
							onChange: (v) => patch({ stopLossPct: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Max positioner",
							hint: `${bot.maxPositions} samtidigt`,
							min: 1,
							max: 8,
							step: 1,
							value: bot.maxPositions,
							onChange: (v) => patch({ maxPositions: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 rounded-md bg-raised px-3 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Sälj vid graduation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs text-muted",
								children: "Lämna kurvan när poolen låses"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: bot.sellOnGraduate,
								onChange: (e) => patch({ sellOnGraduate: e.target.checked }),
								className: "size-5 accent-accent"
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "border-b border-border px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Öppna positioner"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-border",
					children: [world.positions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-8 text-center text-sm text-muted",
						children: bot.running ? "Spanar efter tokens under skattetaket…" : "Starta boten för att öppna affärer."
					}), world.positions.map((pos) => {
						const token = world.tokens.find((t) => t.id === pos.tokenId);
						if (!token) return null;
						const value = positionValue(world, pos);
						const pnlPos = value - pos.costEth;
						const pct = pos.costEth > 0 ? pnlPos / pos.costEth * 100 : 0;
						const tax = token.graduated ? 0 : snipeTaxBps((world.now - token.launchedAt) / 1e3);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: token.symbol
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-subtle",
									children: [
										"in ",
										formatEth(pos.costEth, 3),
										" · tax ",
										(tax / 100).toFixed(0),
										"%"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `font-mono text-sm tabular ${pnlPos >= 0 ? "text-long" : "text-short"}`,
									children: formatPct(pct)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-muted",
									children: [formatEth(value, 3), " ETH"]
								})]
							})]
						}, pos.tokenId);
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Stängda affärer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: world.closed.length })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-72 divide-y divide-border overflow-y-auto",
					children: [world.closed.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-8 text-center text-sm text-muted",
						children: "Inga stängda affärer än."
					}), world.closed.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 px-4 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: c.symbol
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase text-subtle",
							children: reasonSv(c.reason)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `font-mono text-sm tabular ${c.pnlEth >= 0 ? "text-long" : "text-short"}`,
							children: [c.pnlEth >= 0 ? "+" : "", formatEth(c.pnlEth, 3)]
						})]
					}, c.id))]
				})]
			})]
		})]
	});
}
function reasonSv(r) {
	if (r === "tp") return "take profit";
	if (r === "sl") return "stop loss";
	if (r === "graduate") return "graduation";
	if (r === "manual") return "manuell";
	return r;
}
function Kpi$1({ label, value, sub, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-raised px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-wide text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-1 font-mono text-lg tabular ${tone === "long" ? "text-long" : tone === "short" ? "text-short" : "text-fg"}`,
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-muted",
				children: sub
			})
		]
	});
}
function SliderField({ label, hint, min, max, step, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] text-muted",
				children: hint
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "h-11 w-full accent-accent"
		})]
	});
}
function HookView() {
	const hook = useSim((s) => s.world.hook);
	const series = useSim((s) => s.world.feeSeries);
	const sweep = useSim((s) => s.sweep);
	const reset = useSim((s) => s.reset);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const data = series.map((p) => ({
		t: p.t,
		fees: Number(p.fees.toFixed(5)),
		volume: Number(p.volume.toFixed(4))
	}));
	async function copy() {
		try {
			await navigator.clipboard.writeText(HOOK_ADDRESS);
			setCopied(true);
			setTimeout(() => setCopied(false), 1400);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 pb-28 md:pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-4 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-muted",
							children: "PonsV2MemeHook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl tracking-[-0.03em]",
							children: "Kassamaskinen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: copy,
							className: "mt-2 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-fg",
							children: [
								shortAddr(HOOK_ADDRESS, 8),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
								copied ? "kopierad" : "kopiera originalet"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: sweep,
							children: "Sweep fees"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: reset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Nollställ"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "Protokollavgifter",
							value: `${formatEth(hook.protocolFeesEth, 4)} ETH`,
							sub: formatUsd(hook.protocolFeesEth)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "Creator + skatt",
							value: `${formatEth(hook.creatorFeesEth, 4)}`,
							sub: "70% av fee + tax"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "Volym genom hook",
							value: `${formatEth(hook.volumeEth, 3)}`,
							sub: `${hook.swapsProcessed} swaps`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "Pending sweep",
							value: `${formatEth(hook.pendingSweepEth, 4)}`,
							sub: `${hook.poolsBound} v4-pooler`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-48 w-full",
					children: data.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "feeFill",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-accent)",
										stopOpacity: .28
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--color-accent)",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "t",
									hide: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									hide: true,
									domain: ["auto", "auto"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--color-raised)",
										border: "1px solid var(--color-border)",
										borderRadius: 8,
										fontSize: 12,
										fontFamily: "IBM Plex Mono, monospace"
									},
									labelFormatter: () => "Ackumulerade protokollavgifter",
									formatter: (v) => [`${formatEth(Number(v), 5)} ETH`, "fees"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "fees",
									stroke: "var(--color-accent)",
									fill: "url(#feeFill)",
									strokeWidth: 1.6
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full items-center justify-center text-sm text-muted",
						children: "Avgifter ritas upp så fort första swappen går igenom."
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Vad kontraktet faktiskt gör"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 flex flex-col gap-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "beforeInitialize"
						}), " — släpper bara in pooler som Pons-fabriken registrerat."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "afterSwap"
						}), " — tar protokollavgift och creator tax i quote-valutan (ETH), aldrig i memecoinen."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Andra Uniswap-callbacks är avstängda. Hooken stoppar ingen handel, håller inga användarpengar, och tar inte transfer-skatt." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Den håller bara upplupna avgifter tills någon anropar sweep. Precis som originalet på kedjan." })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Riktiga adresser (kedja 4663)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 space-y-2 font-mono text-[12px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Hook",
								v: HOOK_ADDRESS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Factory",
								v: FACTORY_ADDRESS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Fee escrow",
								v: ESCROW_ADDRESS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "LP locker",
								v: LOCKER_ADDRESS
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "singleton" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "fee-on-unspecified" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "no user funds" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "long",
								children: [hook.launches, " launches"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [hook.graduations, " graduated"] })
						]
					})
				]
			})]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "truncate text-fg",
			children: shortAddr(v, 6)
		})]
	});
}
function Kpi({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-raised px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-wide text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-lg tabular",
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-muted",
				children: sub
			})
		]
	});
}
function Home() {
	const view = useSim((s) => s.view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		view === "explain" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplainView, {}),
		view === "market" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketView, {}),
		view === "bot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotView, {}),
		view === "hook" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HookView, {})
	] });
}
//#endregion
export { Home as component };
