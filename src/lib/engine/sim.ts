import {
  buyOnCurve,
  buyOnPool,
  CURVE_FEE_BPS,
  CURVE_SHARE,
  GRADUATION_ETH,
  LP_SHARE,
  PHANTOM_QUOTE,
  quotePrice,
  sellOnCurve,
  snipeTaxBps,
  TOTAL_SUPPLY,
} from "./math";
import { makeTokenIdentity } from "./names";
import type { BotConfig, Position, Token, World } from "./types";

function rand(world: World) {
  world.seed = (world.seed * 16807 + 0) % 2147483647;
  return world.seed / 2147483647;
}

function id(prefix: string, n: number) {
  return `${prefix}-${n.toString(36)}`;
}

export function createWorld(now = Date.now()): World {
  return {
    now,
    nextLaunchAt: now + 400,
    seed: 42_424_242,
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
      graduations: 0,
    },
    positions: [],
    closed: [],
    botCash: 2.5,
    botStartCash: 2.5,
    feeSeries: [{ t: now, fees: 0, volume: 0, bot: 0 }],
    lastSeriesAt: now,
  };
}

function creditFees(
  world: World,
  fees: { protocolFee: number; creatorFee: number; buybackFee: number; snipeTaxEth: number },
) {
  world.hook.protocolFeesEth += fees.protocolFee;
  world.hook.creatorFeesEth += fees.creatorFee;
  world.hook.buybackEth += fees.buybackFee;
  world.hook.snipeTaxEth += fees.snipeTaxEth;
  world.hook.pendingSweepEth += fees.protocolFee + fees.creatorFee + fees.buybackFee;
}

function pushTape(world: World, item: World["tape"][number]) {
  world.tape.unshift(item);
  if (world.tape.length > 80) world.tape.length = 80;
}

function tokenPrice(token: Token) {
  if (token.graduated) return quotePrice(token.poolQuote, token.poolToken);
  return quotePrice(token.quoteReserve, token.tokenReserve);
}

function sparkPush(token: Token, price: number) {
  token.spark.push(price);
  if (token.spark.length > 24) token.spark.shift();
}

function launchToken(world: World) {
  const n = world.hook.launches + 1;
  const ident = makeTokenIdentity(n * 17 + world.seed);
  const hot = rand(world) < 0.28;
  const creatorTaxBps = rand(world) < 0.35 ? 50 : 0;
  const buybackEnabled = rand(world) < 0.4;
  const token: Token = {
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
    curveFeeBps: CURVE_FEE_BPS,
    buybackEnabled,
    hot,
    lastPrice: quotePrice(PHANTOM_QUOTE, CURVE_SHARE),
    openPrice: quotePrice(PHANTOM_QUOTE, CURVE_SHARE),
    spark: [quotePrice(PHANTOM_QUOTE, CURVE_SHARE)],
  };
  world.tokens.unshift(token);
  world.hook.launches += 1;
  if (world.tokens.length > 36) {
    const drop = world.tokens.pop();
    if (drop) {
      world.positions = world.positions.filter((p) => p.tokenId !== drop.id);
    }
  }
  return token;
}

function graduate(world: World, token: Token) {
  if (token.graduated) return;
  const realQuote = Math.max(0, token.quoteReserve - token.phantomQuote);
  token.graduated = true;
  token.graduatedAt = world.now;
  token.poolQuote = Math.max(realQuote, GRADUATION_ETH * 0.92);
  token.poolToken = token.reservedLp + token.tokenReserve;
  token.tokenReserve = 0;
  token.quoteReserve = token.phantomQuote;
  world.hook.graduations += 1;
  world.hook.poolsBound += 1;
}

function applyBuy(world: World, token: Token, ethIn: number, trader: "crowd" | "bot" | "creator") {
  if (ethIn <= 0) return null;
  const ageSec = (world.now - token.launchedAt) / 1000;
  const snipeBps = token.graduated ? 0 : snipeTaxBps(ageSec);

  const result = token.graduated
    ? buyOnPool({
        ethIn,
        quoteReserve: token.poolQuote,
        tokenReserve: token.poolToken,
        feeBps: token.curveFeeBps,
        creatorTaxBps: token.creatorTaxBps,
        buybackEnabled: token.buybackEnabled,
      })
    : buyOnCurve({
        ethIn,
        quoteReserve: token.quoteReserve,
        tokenReserve: token.tokenReserve,
        snipeBps,
        feeBps: token.curveFeeBps,
        creatorTaxBps: token.creatorTaxBps,
        buybackEnabled: token.buybackEnabled,
      });

  if (result.tokensOut <= 0 && !result.graduated) return null;

  if (token.graduated) {
    token.poolQuote += result.ethNet;
    token.poolToken = Math.max(1, token.poolToken - result.tokensOut);
  } else {
    token.quoteReserve += result.ethNet;
    token.tokenReserve = Math.max(0, token.tokenReserve - result.tokensOut);
    const real = token.quoteReserve - token.phantomQuote;
    if (result.graduated || token.tokenReserve <= 1 || real >= GRADUATION_ETH) {
      graduate(world, token);
    }
  }

  token.volumeEth += ethIn - result.refundEth;
  token.trades += 1;
  if (trader !== "creator") token.holders += trader === "bot" ? 1 : rand(world) < 0.4 ? 1 : 0;
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
    graduated: token.graduated,
  });

  return result;
}

function applySell(
  world: World,
  token: Token,
  tokensIn: number,
  trader: "crowd" | "bot",
) {
  if (tokensIn <= 0) return null;
  if (!token.graduated) {
    const real = token.quoteReserve - token.phantomQuote;
    const ready = real >= GRADUATION_ETH * 0.97;
    const sold = sellOnCurve({
      tokensIn,
      quoteReserve: token.quoteReserve,
      tokenReserve: token.tokenReserve,
      feeBps: token.curveFeeBps,
      creatorTaxBps: token.creatorTaxBps,
      buybackEnabled: token.buybackEnabled,
      readyToGraduate: ready,
    });
    if (sold.ethOut <= 0) return null;
    token.tokenReserve += tokensIn;
    token.quoteReserve -= sold.ethOut + sold.feeEth;
    if (token.quoteReserve < token.phantomQuote) token.quoteReserve = token.phantomQuote;
    token.volumeEth += sold.ethOut;
    token.trades += 1;
    token.lastPrice = tokenPrice(token);
    sparkPush(token, token.lastPrice);
    creditFees(world, { ...sold, snipeTaxEth: 0 });
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
      price: token.lastPrice,
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
    readyToGraduate: false,
  });
  if (sold.ethOut <= 0) return null;
  token.poolToken += tokensIn;
  token.poolQuote -= sold.ethOut + sold.feeEth;
  if (token.poolQuote < 0.01) token.poolQuote = 0.01;
  token.volumeEth += sold.ethOut;
  token.trades += 1;
  token.lastPrice = tokenPrice(token);
  sparkPush(token, token.lastPrice);
  creditFees(world, { ...sold, snipeTaxEth: 0 });
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
    price: token.lastPrice,
  });
  return sold;
}

function crowdTick(world: World) {
  const live = world.tokens.slice(0, 18);
  for (const token of live) {
    const age = (world.now - token.launchedAt) / 1000;
    const heat = token.hot ? 1.8 : 1;
    const launchBoost = age < 8 ? 2.2 : age < 25 ? 1.2 : 0.7;
    const pBuy = Math.min(0.72, 0.18 * heat * launchBoost);
    const pSell = token.graduated ? 0.16 : 0.08;
    const roll = rand(world);
    if (roll < pBuy) {
      const size = (0.004 + rand(world) * (token.hot ? 0.09 : 0.035)) * heat;
      applyBuy(world, token, size, "crowd");
    } else if (roll < pBuy + pSell && token.trades > 4) {
      const frac = 0.01 + rand(world) * 0.04;
      const reserve = token.graduated ? token.poolToken : token.tokenReserve;
      applySell(world, token, reserve * frac, "crowd");
    }
  }
}

function closePosition(world: World, pos: Position, token: Token, reason: World["closed"][number]["reason"]) {
  const sold = applySell(world, token, pos.tokens, "bot");
  const proceeds = sold?.ethOut ?? 0;
  world.botCash += proceeds;
  world.closed.unshift({
    id: id("c", world.closed.length + 1),
    tokenId: token.id,
    symbol: token.symbol,
    costEth: pos.costEth,
    proceedsEth: proceeds,
    pnlEth: proceeds - pos.costEth,
    reason,
    ts: world.now,
  });
  if (world.closed.length > 40) world.closed.length = 40;
  world.positions = world.positions.filter((p) => p !== pos);
}

function botTick(world: World, bot: BotConfig) {
  if (!bot.running) return;

  for (const pos of [...world.positions]) {
    const token = world.tokens.find((t) => t.id === pos.tokenId);
    if (!token) {
      world.positions = world.positions.filter((p) => p !== pos);
      continue;
    }
    const price = tokenPrice(token);
    const value = pos.tokens * price;
    const pnlPct = pos.costEth > 0 ? ((value - pos.costEth) / pos.costEth) * 100 : 0;
    if (pnlPct >= bot.takeProfitPct) {
      closePosition(world, pos, token, "tp");
      continue;
    }
    if (pnlPct <= -bot.stopLossPct) {
      closePosition(world, pos, token, "sl");
      continue;
    }
    if (bot.sellOnGraduate && token.graduated) {
      closePosition(world, pos, token, "graduate");
    }
  }

  if (world.positions.length >= bot.maxPositions) return;
  if (world.botCash < bot.buyEth) return;

  const ranked = world.tokens.filter((t) => {
    if (t.graduated) return false;
    if (world.positions.some((p) => p.tokenId === t.id)) return false;
    if (bot.skipHotOnly && !t.hot) return false;
    const age = (world.now - t.launchedAt) / 1000;
    const tax = snipeTaxBps(age);
    if (tax > bot.maxSnipeTaxBps) return false;
    const real = Math.max(0, t.quoteReserve - t.phantomQuote);
    if (real > GRADUATION_ETH * 0.9) return false;
    return true;
  });

  for (const pick of ranked) {
    if (world.positions.length >= bot.maxPositions) break;
    if (world.botCash < bot.buyEth) break;
    const spend = Math.min(bot.buyEth, world.botCash);
    if (spend <= 0) break;
    const result = applyBuy(world, pick, spend, "bot");
    if (!result || result.tokensOut <= 0) continue;
    world.botCash -= spend - result.refundEth;
    world.positions.push({
      tokenId: pick.id,
      tokens: result.tokensOut,
      costEth: spend - result.refundEth,
      openedAt: world.now,
    });
  }
}

export function tick(world: World, now: number, bot: BotConfig) {
  const dt = Math.min(800, Math.max(16, now - world.now));
  world.now = now;

  if (now >= world.nextLaunchAt) {
    launchToken(world);
    const gap = 2800 + rand(world) * 5200;
    world.nextLaunchAt = now + gap;
  }

  crowdTick(world);
  botTick(world, bot);

  if (now - world.lastSeriesAt > 1400) {
    const botValue = botEquity(world);
    world.feeSeries.push({
      t: now,
      fees: world.hook.protocolFeesEth,
      volume: world.hook.volumeEth,
      bot: botValue,
    });
    if (world.feeSeries.length > 48) world.feeSeries.shift();
    world.lastSeriesAt = now;
  }

  return dt;
}

export function botEquity(world: World) {
  let v = world.botCash;
  for (const pos of world.positions) {
    const token = world.tokens.find((t) => t.id === pos.tokenId);
    if (!token) continue;
    v += pos.tokens * tokenPrice(token);
  }
  return v;
}

export function curveProgress(token: Token) {
  if (token.graduated) return 1;
  const real = Math.max(0, token.quoteReserve - token.phantomQuote);
  return Math.min(1, real / GRADUATION_ETH);
}

export function positionValue(world: World, pos: Position) {
  const token = world.tokens.find((t) => t.id === pos.tokenId);
  if (!token) return 0;
  return pos.tokens * tokenPrice(token);
}

export function sweepHook(world: World) {
  const swept = world.hook.pendingSweepEth;
  world.hook.pendingSweepEth = 0;
  return swept;
}

export function resetWorld(): World {
  return createWorld(Date.now());
}
