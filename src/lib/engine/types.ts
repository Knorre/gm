export type Trader = "crowd" | "bot" | "creator";
export type Side = "buy" | "sell";

export type Token = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  chip: number;
  launchedAt: number;
  quoteReserve: number;
  phantomQuote: number;
  tokenReserve: number;
  reservedLp: number;
  totalSupply: number;
  graduated: boolean;
  graduatedAt: number | null;
  poolQuote: number;
  poolToken: number;
  volumeEth: number;
  trades: number;
  holders: number;
  creatorTaxBps: number;
  curveFeeBps: number;
  buybackEnabled: boolean;
  hot: boolean;
  lastPrice: number;
  openPrice: number;
  spark: number[];
};

export type TapeItem = {
  id: string;
  tokenId: string;
  symbol: string;
  side: Side;
  trader: Trader;
  eth: number;
  tokens: number;
  feeEth: number;
  snipeTaxEth: number;
  ts: number;
  price: number;
  graduated?: boolean;
};

export type Position = {
  tokenId: string;
  tokens: number;
  costEth: number;
  openedAt: number;
};

export type ClosedTrade = {
  id: string;
  tokenId: string;
  symbol: string;
  costEth: number;
  proceedsEth: number;
  pnlEth: number;
  reason: "tp" | "sl" | "graduate" | "manual" | "rug";
  ts: number;
};

export type BotConfig = {
  running: boolean;
  buyEth: number;
  maxSnipeTaxBps: number;
  takeProfitPct: number;
  stopLossPct: number;
  maxPositions: number;
  sellOnGraduate: boolean;
  skipHotOnly: boolean;
};

export type HookStats = {
  protocolFeesEth: number;
  creatorFeesEth: number;
  buybackEth: number;
  snipeTaxEth: number;
  pendingSweepEth: number;
  poolsBound: number;
  swapsProcessed: number;
  volumeEth: number;
  launches: number;
  graduations: number;
};

export type FeePoint = {
  t: number;
  fees: number;
  volume: number;
  bot: number;
};

export type World = {
  now: number;
  nextLaunchAt: number;
  seed: number;
  tokens: Token[];
  tape: TapeItem[];
  hook: HookStats;
  positions: Position[];
  closed: ClosedTrade[];
  botCash: number;
  botStartCash: number;
  feeSeries: FeePoint[];
  lastSeriesAt: number;
};
