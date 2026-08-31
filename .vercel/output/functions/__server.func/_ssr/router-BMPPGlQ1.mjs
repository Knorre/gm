import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BMPPGlQ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/** Pons V2 snipe tax: 99% at t=0, ~25% at 1s, ~3% at 2s, 0 at 5s. */
function snipeTaxBps(ageSec) {
	if (ageSec <= 0) return 9900;
	if (ageSec >= 5) return 0;
	if (ageSec <= 1) return Math.round(9900 * Math.exp(-Math.log(9900 / 2500) * ageSec));
	if (ageSec <= 2) return Math.round(2500 * Math.exp(-Math.log(2500 / 300) * (ageSec - 1)));
	return Math.max(0, Math.round(300 * Math.exp(-Math.log(300) * ((ageSec - 2) / 3))));
}
var GRADUATION_ETH = 4.2;
var PROTOCOL_SHARE_BPS = 3e3;
var TOTAL_SUPPLY = 1e9;
var CURVE_SHARE = 8e8;
var LP_SHARE = 2e8;
var PHANTOM_QUOTE = .18;
var ETH_USD = 3480;
function quotePrice(quoteReserve, tokenReserve) {
	if (tokenReserve <= 0) return 0;
	return quoteReserve / tokenReserve;
}
function marketCap(price) {
	return price * TOTAL_SUPPLY;
}
/**
* Constant-product buy against the curve.
* Fees and snipe tax are taken from the quote input (never from the launch token).
*/
function buyOnCurve(opts) {
	const { ethIn, quoteReserve, tokenReserve, snipeBps, feeBps, creatorTaxBps, buybackEnabled } = opts;
	const empty = {
		tokensOut: 0,
		ethNet: 0,
		feeEth: 0,
		snipeTaxEth: 0,
		protocolFee: 0,
		creatorFee: 0,
		buybackFee: 0,
		refundEth: ethIn,
		graduated: tokenReserve <= 1e-9
	};
	if (ethIn <= 0 || tokenReserve <= 1e-9) return empty;
	const snipeTaxEth = ethIn * snipeBps / 1e4;
	const afterSnipe = ethIn - snipeTaxEth;
	const tradingFee = afterSnipe * feeBps / 1e4;
	const creatorTax = afterSnipe * creatorTaxBps / 1e4;
	const feeEth = tradingFee + creatorTax;
	const ethNet = afterSnipe - feeEth;
	if (ethNet <= 0) return {
		...empty,
		snipeTaxEth,
		feeEth,
		refundEth: 0
	};
	const k = quoteReserve * tokenReserve;
	let newToken = k / (quoteReserve + ethNet);
	let tokensOut = tokenReserve - newToken;
	let usedNet = ethNet;
	let refundEth = 0;
	let graduated = false;
	if (newToken <= 0 || tokensOut >= tokenReserve) {
		tokensOut = tokenReserve;
		usedNet = k / 1e-12 - quoteReserve;
		if (usedNet > ethNet) usedNet = ethNet;
		const unused = ethNet - usedNet;
		refundEth = unused > 0 ? unused : 0;
		newToken = 0;
		graduated = true;
	}
	const protocolFee = tradingFee * PROTOCOL_SHARE_BPS / 1e4;
	const remainder = tradingFee - protocolFee;
	const buybackFee = buybackEnabled ? remainder * .2 : 0;
	const creatorFee = remainder - buybackFee + creatorTax + snipeTaxEth * .7;
	const protocolFromSnipe = snipeTaxEth * .3;
	return {
		tokensOut,
		ethNet: usedNet,
		feeEth,
		snipeTaxEth,
		protocolFee: protocolFee + protocolFromSnipe,
		creatorFee,
		buybackFee,
		refundEth,
		graduated
	};
}
function sellOnCurve(opts) {
	const { tokensIn, quoteReserve, tokenReserve, feeBps, creatorTaxBps, buybackEnabled, readyToGraduate } = opts;
	if (tokensIn <= 0 || readyToGraduate) return {
		ethOut: 0,
		feeEth: 0,
		protocolFee: 0,
		creatorFee: 0,
		buybackFee: 0
	};
	const gross = quoteReserve - quoteReserve * tokenReserve / (tokenReserve + tokensIn);
	if (gross <= 0) return {
		ethOut: 0,
		feeEth: 0,
		protocolFee: 0,
		creatorFee: 0,
		buybackFee: 0
	};
	const tradingFee = gross * feeBps / 1e4;
	const creatorTax = gross * creatorTaxBps / 1e4;
	const feeEth = tradingFee + creatorTax;
	const ethOut = gross - feeEth;
	const protocolFee = tradingFee * PROTOCOL_SHARE_BPS / 1e4;
	const remainder = tradingFee - protocolFee;
	const buybackFee = buybackEnabled ? remainder * .2 : 0;
	return {
		ethOut,
		feeEth,
		protocolFee,
		creatorFee: remainder - buybackFee + creatorTax,
		buybackFee
	};
}
function buyOnPool(opts) {
	return buyOnCurve({
		...opts,
		snipeBps: 0
	});
}
var ADJ = [
	"Cash",
	"Hood",
	"Silent",
	"Greedy",
	"Lucky",
	"Broken",
	"Atomic",
	"Paper",
	"Rusty",
	"Night",
	"Feral",
	"Soft",
	"Prime",
	"Hollow",
	"Rapid",
	"Quiet",
	"Bold",
	"Tiny",
	"Grand",
	"Sour"
];
var NOUN = [
	"Cat",
	"Frog",
	"Hawk",
	"Crab",
	"Wolf",
	"Bean",
	"Hook",
	"Moth",
	"Pike",
	"Crow",
	"Toad",
	"Lynx",
	"Gull",
	"Mole",
	"Wasp",
	"Colt",
	"Hare",
	"Bass",
	"Kite",
	"Dusk"
];
function makeTokenIdentity(seed) {
	const a = ADJ[seed % ADJ.length];
	const n = NOUN[Math.floor(seed / ADJ.length) % NOUN.length];
	return {
		name: `${a} ${n}`,
		symbol: `${a.slice(0, 3)}${n.slice(0, 3)}`.toUpperCase(),
		address: toAddr(seed * 7919 + 17),
		chip: seed % 6 + 1
	};
}
function toAddr(n) {
	return `0x${Math.abs(Math.floor(n * 1000003 + 11256099)).toString(16).padStart(40, "0").slice(0, 40)}`;
}
var HOOK_ADDRESS = "0xE5e702641Ea86F4ae6cC3cDaeD2B886f976Be044";
var FACTORY_ADDRESS = "0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e";
var ESCROW_ADDRESS = "0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e";
var LOCKER_ADDRESS = "0x267444D099b10fB5Ed7c3Cc7B7c767AdcA574952";
function rand(world) {
	world.seed = (world.seed * 16807 + 0) % 2147483647;
	return world.seed / 2147483647;
}
function id(prefix, n) {
	return `${prefix}-${n.toString(36)}`;
}
function createWorld(now = Date.now()) {
	return {
		now,
		nextLaunchAt: now + 400,
		seed: 42424242,
		tokens: [],
		tape: [],
		hook: {
			protocolFeesEth: 0,
			creatorFeesEth: 0,
			buybackEth: 0,
			snipeTaxEth: 0,
			pendingSweepEth: 0,
			poolsBound: 0,
			swapsProcessed: 0,
			volumeEth: 0,
			launches: 0,
			graduations: 0
		},
		positions: [],
		closed: [],
		botCash: 2.5,
		botStartCash: 2.5,
		feeSeries: [{
			t: now,
			fees: 0,
			volume: 0,
			bot: 0
		}],
		lastSeriesAt: now
	};
}
function creditFees(world, fees) {
	world.hook.protocolFeesEth += fees.protocolFee;
	world.hook.creatorFeesEth += fees.creatorFee;
	world.hook.buybackEth += fees.buybackFee;
	world.hook.snipeTaxEth += fees.snipeTaxEth;
	world.hook.pendingSweepEth += fees.protocolFee + fees.creatorFee + fees.buybackFee;
}
function pushTape(world, item) {
	world.tape.unshift(item);
	if (world.tape.length > 80) world.tape.length = 80;
}
function tokenPrice(token) {
	if (token.graduated) return quotePrice(token.poolQuote, token.poolToken);
	return quotePrice(token.quoteReserve, token.tokenReserve);
}
function sparkPush(token, price) {
	token.spark.push(price);
	if (token.spark.length > 24) token.spark.shift();
}
function launchToken(world) {
	const n = world.hook.launches + 1;
	const ident = makeTokenIdentity(n * 17 + world.seed);
	const hot = rand(world) < .28;
	const creatorTaxBps = rand(world) < .35 ? 50 : 0;
	const buybackEnabled = rand(world) < .4;
	const token = {
		id: id("t", n),
		address: ident.address,
		name: ident.name,
		symbol: ident.symbol,
		chip: ident.chip,
		launchedAt: world.now,
		quoteReserve: PHANTOM_QUOTE,
		phantomQuote: PHANTOM_QUOTE,
		tokenReserve: CURVE_SHARE,
		reservedLp: LP_SHARE,
		totalSupply: TOTAL_SUPPLY,
		graduated: false,
		graduatedAt: null,
		poolQuote: 0,
		poolToken: 0,
		volumeEth: 0,
		trades: 0,
		holders: 1,
		creatorTaxBps,
		curveFeeBps: 100,
		buybackEnabled,
		hot,
		lastPrice: quotePrice(PHANTOM_QUOTE, CURVE_SHARE),
		openPrice: quotePrice(PHANTOM_QUOTE, CURVE_SHARE),
		spark: [quotePrice(PHANTOM_QUOTE, CURVE_SHARE)]
	};
	world.tokens.unshift(token);
	world.hook.launches += 1;
	if (world.tokens.length > 36) {
		const drop = world.tokens.pop();
		if (drop) world.positions = world.positions.filter((p) => p.tokenId !== drop.id);
	}
	return token;
}
function graduate(world, token) {
	if (token.graduated) return;
	const realQuote = Math.max(0, token.quoteReserve - token.phantomQuote);
	token.graduated = true;
	token.graduatedAt = world.now;
	token.poolQuote = Math.max(realQuote, GRADUATION_ETH * .92);
	token.poolToken = token.reservedLp + token.tokenReserve;
	token.tokenReserve = 0;
	token.quoteReserve = token.phantomQuote;
	world.hook.graduations += 1;
	world.hook.poolsBound += 1;
}
function applyBuy(world, token, ethIn, trader) {
	if (ethIn <= 0) return null;
	const ageSec = (world.now - token.launchedAt) / 1e3;
	const snipeBps = token.graduated ? 0 : snipeTaxBps(ageSec);
	const result = token.graduated ? buyOnPool({
		ethIn,
		quoteReserve: token.poolQuote,
		tokenReserve: token.poolToken,
		feeBps: token.curveFeeBps,
		creatorTaxBps: token.creatorTaxBps,
		buybackEnabled: token.buybackEnabled
	}) : buyOnCurve({
		ethIn,
		quoteReserve: token.quoteReserve,
		tokenReserve: token.tokenReserve,
		snipeBps,
		feeBps: token.curveFeeBps,
		creatorTaxBps: token.creatorTaxBps,
		buybackEnabled: token.buybackEnabled
	});
	if (result.tokensOut <= 0 && !result.graduated) return null;
	if (token.graduated) {
		token.poolQuote += result.ethNet;
		token.poolToken = Math.max(1, token.poolToken - result.tokensOut);
	} else {
		token.quoteReserve += result.ethNet;
		token.tokenReserve = Math.max(0, token.tokenReserve - result.tokensOut);
		const real = token.quoteReserve - token.phantomQuote;
		if (result.graduated || token.tokenReserve <= 1 || real >= 4.2) graduate(world, token);
	}
	token.volumeEth += ethIn - result.refundEth;
	token.trades += 1;
	if (trader !== "creator") token.holders += trader === "bot" ? 1 : rand(world) < .4 ? 1 : 0;
	token.lastPrice = tokenPrice(token);
	sparkPush(token, token.lastPrice);
	creditFees(world, result);
	world.hook.swapsProcessed += 1;
	world.hook.volumeEth += ethIn - result.refundEth;
	pushTape(world, {
		id: id("x", world.hook.swapsProcessed),
		tokenId: token.id,
		symbol: token.symbol,
		side: "buy",
		trader,
		eth: ethIn - result.refundEth,
		tokens: result.tokensOut,
		feeEth: result.feeEth,
		snipeTaxEth: result.snipeTaxEth,
		ts: world.now,
		price: token.lastPrice,
		graduated: token.graduated
	});
	return result;
}
function applySell(world, token, tokensIn, trader) {
	if (tokensIn <= 0) return null;
	if (!token.graduated) {
		const ready = token.quoteReserve - token.phantomQuote >= GRADUATION_ETH * .97;
		const sold = sellOnCurve({
			tokensIn,
			quoteReserve: token.quoteReserve,
			tokenReserve: token.tokenReserve,
			feeBps: token.curveFeeBps,
			creatorTaxBps: token.creatorTaxBps,
			buybackEnabled: token.buybackEnabled,
			readyToGraduate: ready
		});
		if (sold.ethOut <= 0) return null;
		token.tokenReserve += tokensIn;
		token.quoteReserve -= sold.ethOut + sold.feeEth;
		if (token.quoteReserve < token.phantomQuote) token.quoteReserve = token.phantomQuote;
		token.volumeEth += sold.ethOut;
		token.trades += 1;
		token.lastPrice = tokenPrice(token);
		sparkPush(token, token.lastPrice);
		creditFees(world, {
			...sold,
			snipeTaxEth: 0
		});
		world.hook.swapsProcessed += 1;
		world.hook.volumeEth += sold.ethOut;
		pushTape(world, {
			id: id("x", world.hook.swapsProcessed),
			tokenId: token.id,
			symbol: token.symbol,
			side: "sell",
			trader,
			eth: sold.ethOut,
			tokens: tokensIn,
			feeEth: sold.feeEth,
			snipeTaxEth: 0,
			ts: world.now,
			price: token.lastPrice
		});
		return sold;
	}
	const sold = sellOnCurve({
		tokensIn,
		quoteReserve: token.poolQuote,
		tokenReserve: token.poolToken,
		feeBps: token.curveFeeBps,
		creatorTaxBps: token.creatorTaxBps,
		buybackEnabled: token.buybackEnabled,
		readyToGraduate: false
	});
	if (sold.ethOut <= 0) return null;
	token.poolToken += tokensIn;
	token.poolQuote -= sold.ethOut + sold.feeEth;
	if (token.poolQuote < .01) token.poolQuote = .01;
	token.volumeEth += sold.ethOut;
	token.trades += 1;
	token.lastPrice = tokenPrice(token);
	sparkPush(token, token.lastPrice);
	creditFees(world, {
		...sold,
		snipeTaxEth: 0
	});
	world.hook.swapsProcessed += 1;
	world.hook.volumeEth += sold.ethOut;
	pushTape(world, {
		id: id("x", world.hook.swapsProcessed),
		tokenId: token.id,
		symbol: token.symbol,
		side: "sell",
		trader,
		eth: sold.ethOut,
		tokens: tokensIn,
		feeEth: sold.feeEth,
		snipeTaxEth: 0,
		ts: world.now,
		price: token.lastPrice
	});
	return sold;
}
function crowdTick(world) {
	const live = world.tokens.slice(0, 18);
	for (const token of live) {
		const age = (world.now - token.launchedAt) / 1e3;
		const heat = token.hot ? 1.8 : 1;
		const launchBoost = age < 8 ? 2.2 : age < 25 ? 1.2 : .7;
		const pBuy = Math.min(.72, .18 * heat * launchBoost);
		const pSell = token.graduated ? .16 : .08;
		const roll = rand(world);
		if (roll < pBuy) applyBuy(world, token, (.004 + rand(world) * (token.hot ? .09 : .035)) * heat, "crowd");
		else if (roll < pBuy + pSell && token.trades > 4) {
			const frac = .01 + rand(world) * .04;
			applySell(world, token, (token.graduated ? token.poolToken : token.tokenReserve) * frac, "crowd");
		}
	}
}
function closePosition(world, pos, token, reason) {
	const proceeds = applySell(world, token, pos.tokens, "bot")?.ethOut ?? 0;
	world.botCash += proceeds;
	world.closed.unshift({
		id: id("c", world.closed.length + 1),
		tokenId: token.id,
		symbol: token.symbol,
		costEth: pos.costEth,
		proceedsEth: proceeds,
		pnlEth: proceeds - pos.costEth,
		reason,
		ts: world.now
	});
	if (world.closed.length > 40) world.closed.length = 40;
	world.positions = world.positions.filter((p) => p !== pos);
}
function botTick(world, bot) {
	if (!bot.running) return;
	for (const pos of [...world.positions]) {
		const token = world.tokens.find((t) => t.id === pos.tokenId);
		if (!token) {
			world.positions = world.positions.filter((p) => p !== pos);
			continue;
		}
		const price = tokenPrice(token);
		const value = pos.tokens * price;
		const pnlPct = pos.costEth > 0 ? (value - pos.costEth) / pos.costEth * 100 : 0;
		if (pnlPct >= bot.takeProfitPct) {
			closePosition(world, pos, token, "tp");
			continue;
		}
		if (pnlPct <= -bot.stopLossPct) {
			closePosition(world, pos, token, "sl");
			continue;
		}
		if (bot.sellOnGraduate && token.graduated) closePosition(world, pos, token, "graduate");
	}
	if (world.positions.length >= bot.maxPositions) return;
	if (world.botCash < bot.buyEth) return;
	const pick = world.tokens.filter((t) => {
		if (t.graduated) return false;
		if (world.positions.some((p) => p.tokenId === t.id)) return false;
		if (bot.skipHotOnly && !t.hot) return false;
		const age = (world.now - t.launchedAt) / 1e3;
		if (snipeTaxBps(age) > bot.maxSnipeTaxBps) return false;
		if (t.quoteReserve - t.phantomQuote > 3.57) return false;
		return age < 40;
	})[0];
	if (!pick) return;
	const spend = Math.min(bot.buyEth, world.botCash);
	const result = applyBuy(world, pick, spend, "bot");
	if (!result || result.tokensOut <= 0) return;
	world.botCash -= spend - result.refundEth;
	world.positions.push({
		tokenId: pick.id,
		tokens: result.tokensOut,
		costEth: spend - result.refundEth,
		openedAt: world.now
	});
}
function tick(world, now, bot) {
	const dt = Math.min(800, Math.max(16, now - world.now));
	world.now = now;
	if (now >= world.nextLaunchAt) {
		launchToken(world);
		world.nextLaunchAt = now + (2800 + rand(world) * 5200);
	}
	crowdTick(world);
	botTick(world, bot);
	if (now - world.lastSeriesAt > 1400) {
		const botValue = botEquity(world);
		world.feeSeries.push({
			t: now,
			fees: world.hook.protocolFeesEth,
			volume: world.hook.volumeEth,
			bot: botValue
		});
		if (world.feeSeries.length > 48) world.feeSeries.shift();
		world.lastSeriesAt = now;
	}
	return dt;
}
function botEquity(world) {
	let v = world.botCash;
	for (const pos of world.positions) {
		const token = world.tokens.find((t) => t.id === pos.tokenId);
		if (!token) continue;
		v += pos.tokens * tokenPrice(token);
	}
	return v;
}
function curveProgress(token) {
	if (token.graduated) return 1;
	const real = Math.max(0, token.quoteReserve - token.phantomQuote);
	return Math.min(1, real / GRADUATION_ETH);
}
function positionValue(world, pos) {
	const token = world.tokens.find((t) => t.id === pos.tokenId);
	if (!token) return 0;
	return pos.tokens * tokenPrice(token);
}
function sweepHook(world) {
	const swept = world.hook.pendingSweepEth;
	world.hook.pendingSweepEth = 0;
	return swept;
}
function resetWorld() {
	return createWorld(Date.now());
}
var BOT_KEY = "hook-bot-config-v1";
var defaultBot = {
	running: false,
	buyEth: .05,
	maxSnipeTaxBps: 300,
	takeProfitPct: 80,
	stopLossPct: 35,
	maxPositions: 4,
	sellOnGraduate: true,
	skipHotOnly: false
};
function loadBot() {
	if (typeof localStorage === "undefined") return defaultBot;
	try {
		const raw = localStorage.getItem(BOT_KEY);
		if (!raw) return defaultBot;
		return {
			...defaultBot,
			...JSON.parse(raw),
			running: false
		};
	} catch {
		return defaultBot;
	}
}
var useSim = create((set, get) => ({
	world: createWorld(Date.now()),
	bot: defaultBot,
	view: "explain",
	selectedId: null,
	hydrated: false,
	setView: (view) => set({ view }),
	select: (selectedId) => set({ selectedId }),
	patchBot: (p) => {
		const bot = {
			...get().bot,
			...p
		};
		set({ bot });
		try {
			localStorage.setItem(BOT_KEY, JSON.stringify({
				...bot,
				running: false
			}));
		} catch {}
	},
	toggleBot: () => {
		set({ bot: {
			...get().bot,
			running: !get().bot.running
		} });
	},
	sweep: () => {
		const world = get().world;
		sweepHook(world);
		set({ world: {
			...world,
			hook: { ...world.hook }
		} });
	},
	reset: () => {
		set({
			world: resetWorld(),
			selectedId: null,
			bot: {
				...get().bot,
				running: false
			}
		});
	},
	step: (now) => {
		const { world, bot } = get();
		tick(world, now, bot);
		set({ world: {
			...world,
			tokens: world.tokens.slice(),
			tape: world.tape.slice(),
			positions: world.positions.slice(),
			closed: world.closed.slice(),
			feeSeries: world.feeSeries.slice(),
			hook: { ...world.hook }
		} });
	},
	hydrate: () => {
		if (get().hydrated) return;
		set({
			bot: loadBot(),
			hydrated: true,
			world: createWorld(Date.now())
		});
	}
}));
function useBotEquity() {
	return useSim((s) => botEquity(s.world));
}
function SimLoop() {
	const hydrate = useSim((s) => s.hydrate);
	const step = useSim((s) => s.step);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = 0;
		const loop = (t) => {
			if (t - last > 220) {
				step(Date.now());
				last = t;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [step]);
	return null;
}
var styles_default = "/assets/styles-B7yiQPwL.css";
var APP_NAME = "HOOK";
var FONTS = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "En körbar papperskopia av Pons V2 Meme Hook på Robinhood Chain — kassamaskinen bakom memecoin-handeln."
			},
			{
				name: "theme-color",
				content: "#0c0c0b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
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
				href: FONTS
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "sv",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimLoop, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter = () => import("./routes-B9RPPPHG.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { positionValue as a, HOOK_ADDRESS as c, GRADUATION_ETH as d, marketCap as f, curveProgress as i, LOCKER_ADDRESS as l, useBotEquity as n, ESCROW_ADDRESS as o, snipeTaxBps as p, useSim as r, FACTORY_ADDRESS as s, router_exports as t, ETH_USD as u };
