/** Pons V2 snipe tax: 99% at t=0, ~25% at 1s, ~3% at 2s, 0 at 5s. */
export function snipeTaxBps(ageSec: number): number {
  if (ageSec <= 0) return 9900;
  if (ageSec >= 5) return 0;
  if (ageSec <= 1) {
    const k = Math.log(9900 / 2500);
    return Math.round(9900 * Math.exp(-k * ageSec));
  }
  if (ageSec <= 2) {
    const k = Math.log(2500 / 300);
    return Math.round(2500 * Math.exp(-k * (ageSec - 1)));
  }
  const k = Math.log(300 / 1);
  return Math.max(0, Math.round(300 * Math.exp(-k * ((ageSec - 2) / 3))));
}

export const GRADUATION_ETH = 4.2;
export const CURVE_FEE_BPS = 100; // 1%
export const PROTOCOL_SHARE_BPS = 3000; // 30% of the trading fee
export const CREATOR_SHARE_BPS = 7000; // 70% of the trading fee
export const TOTAL_SUPPLY = 1_000_000_000;
export const CURVE_SHARE = 800_000_000;
export const LP_SHARE = 200_000_000;
export const PHANTOM_QUOTE = 0.18; // starting price not zero
export const ETH_USD = 3480;

export type BuyResult = {
  tokensOut: number;
  ethNet: number;
  feeEth: number;
  snipeTaxEth: number;
  protocolFee: number;
  creatorFee: number;
  buybackFee: number;
  refundEth: number;
  graduated: boolean;
};

export function quotePrice(quoteReserve: number, tokenReserve: number) {
  if (tokenReserve <= 0) return 0;
  return quoteReserve / tokenReserve;
}

export function marketCap(price: number) {
  return price * TOTAL_SUPPLY;
}

/**
 * Constant-product buy against the curve.
 * Fees and snipe tax are taken from the quote input (never from the launch token).
 */
export function buyOnCurve(opts: {
  ethIn: number;
  quoteReserve: number;
  tokenReserve: number;
  snipeBps: number;
  feeBps: number;
  creatorTaxBps: number;
  buybackEnabled: boolean;
}): BuyResult {
  const { ethIn, quoteReserve, tokenReserve, snipeBps, feeBps, creatorTaxBps, buybackEnabled } =
    opts;
  const empty: BuyResult = {
    tokensOut: 0,
    ethNet: 0,
    feeEth: 0,
    snipeTaxEth: 0,
    protocolFee: 0,
    creatorFee: 0,
    buybackFee: 0,
    refundEth: ethIn,
    graduated: tokenReserve <= 1e-9,
  };
  if (ethIn <= 0 || tokenReserve <= 1e-9) return empty;

  const snipeTaxEth = (ethIn * snipeBps) / 10_000;
  const afterSnipe = ethIn - snipeTaxEth;
  const tradingFee = (afterSnipe * feeBps) / 10_000;
  const creatorTax = (afterSnipe * creatorTaxBps) / 10_000;
  const feeEth = tradingFee + creatorTax;
  const ethNet = afterSnipe - feeEth;
  if (ethNet <= 0) {
    return { ...empty, snipeTaxEth, feeEth, refundEth: 0 };
  }

  const k = quoteReserve * tokenReserve;
  const newQuote = quoteReserve + ethNet;
  let newToken = k / newQuote;
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

  const protocolFee = (tradingFee * PROTOCOL_SHARE_BPS) / 10_000;
  const remainder = tradingFee - protocolFee;
  const buybackFee = buybackEnabled ? remainder * 0.2 : 0;
  const creatorFee = remainder - buybackFee + creatorTax + snipeTaxEth * 0.7;
  const protocolFromSnipe = snipeTaxEth * 0.3;

  return {
    tokensOut,
    ethNet: usedNet,
    feeEth,
    snipeTaxEth,
    protocolFee: protocolFee + protocolFromSnipe,
    creatorFee,
    buybackFee,
    refundEth,
    graduated,
  };
}

export function sellOnCurve(opts: {
  tokensIn: number;
  quoteReserve: number;
  tokenReserve: number;
  feeBps: number;
  creatorTaxBps: number;
  buybackEnabled: boolean;
  readyToGraduate: boolean;
}) {
  const { tokensIn, quoteReserve, tokenReserve, feeBps, creatorTaxBps, buybackEnabled, readyToGraduate } =
    opts;
  if (tokensIn <= 0 || readyToGraduate) {
    return {
      ethOut: 0,
      feeEth: 0,
      protocolFee: 0,
      creatorFee: 0,
      buybackFee: 0,
    };
  }
  const k = quoteReserve * tokenReserve;
  const newToken = tokenReserve + tokensIn;
  const newQuote = k / newToken;
  const gross = quoteReserve - newQuote;
  if (gross <= 0) {
    return { ethOut: 0, feeEth: 0, protocolFee: 0, creatorFee: 0, buybackFee: 0 };
  }
  const tradingFee = (gross * feeBps) / 10_000;
  const creatorTax = (gross * creatorTaxBps) / 10_000;
  const feeEth = tradingFee + creatorTax;
  const ethOut = gross - feeEth;
  const protocolFee = (tradingFee * PROTOCOL_SHARE_BPS) / 10_000;
  const remainder = tradingFee - protocolFee;
  const buybackFee = buybackEnabled ? remainder * 0.2 : 0;
  const creatorFee = remainder - buybackFee + creatorTax;
  return { ethOut, feeEth, protocolFee, creatorFee, buybackFee };
}

export function buyOnPool(opts: {
  ethIn: number;
  quoteReserve: number;
  tokenReserve: number;
  feeBps: number;
  creatorTaxBps: number;
  buybackEnabled: boolean;
}) {
  return buyOnCurve({ ...opts, snipeBps: 0 });
}
