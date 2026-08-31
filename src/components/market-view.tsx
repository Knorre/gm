import { useSim } from "@/lib/store";
import { curveProgress } from "@/lib/engine/sim";
import { GRADUATION_ETH, marketCap, ETH_USD } from "@/lib/engine/math";
import { snipeTaxBps } from "@/lib/engine/math";
import { Badge } from "@/components/ui/badge";
import { Spark } from "@/components/spark";
import { cn, formatCompact, formatEth, formatPct, formatUsd, shortAddr } from "@/lib/utils";
import type { Token } from "@/lib/engine/types";

const CHIP = [
  "bg-chip-1",
  "bg-chip-2",
  "bg-chip-3",
  "bg-chip-4",
  "bg-chip-5",
  "bg-chip-6",
] as const;

function ageSec(token: Token, now: number) {
  return (now - token.launchedAt) / 1000;
}

export function MarketView() {
  const tokens = useSim((s) => s.world.tokens);
  const now = useSim((s) => s.world.now);
  const tape = useSim((s) => s.world.tape);
  const selectedId = useSim((s) => s.selectedId);
  const select = useSim((s) => s.select);
  const selected = tokens.find((t) => t.id === selectedId) ?? tokens[0];

  return (
    <div className="grid gap-3 pb-28 md:grid-cols-[minmax(0,1fr)_300px] md:pb-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 rounded-xl border border-border bg-surface">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h2 className="text-sm font-medium">Trenches</h2>
            <p className="text-xs text-muted">Nya Pons V2-lanseringar · kurva till {GRADUATION_ETH} ETH</p>
          </div>
          <Badge>{tokens.length} tokens</Badge>
        </header>
        <div className="hidden grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_1fr] gap-2 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-subtle md:grid">
          <span>Token</span>
          <span className="text-right">Pris</span>
          <span className="text-right">Mcap</span>
          <span className="text-right">Kurva</span>
          <span className="text-right">Snipe</span>
        </div>
        <ul className="max-h-[70vh] divide-y divide-border overflow-y-auto">
          {tokens.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-muted">Väntar på första lanseringen…</li>
          )}
          {tokens.map((token) => {
            const age = ageSec(token, now);
            const tax = token.graduated ? 0 : snipeTaxBps(age);
            const prog = curveProgress(token);
            const up = token.lastPrice >= token.openPrice;
            const active = selected?.id === token.id;
            return (
              <li key={token.id}>
                <button
                  type="button"
                  onClick={() => select(token.id)}
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left md:grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_1fr]",
                    active ? "bg-raised" : "hover:bg-raised/60",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-md font-mono text-[10px] text-accent",
                        CHIP[(token.chip - 1) % CHIP.length],
                      )}
                    >
                      {token.symbol.slice(0, 2)}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{token.name}</span>
                        {token.hot && <Badge tone="short">het</Badge>}
                        {token.graduated && <Badge tone="long">v4</Badge>}
                      </span>
                      <span className="block font-mono text-[11px] text-subtle">
                        {token.symbol} · {shortAddr(token.address)}
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "hidden text-right font-mono text-xs tabular md:block",
                      up ? "text-long" : "text-short",
                    )}
                  >
                    {formatEth(token.lastPrice, 6)}
                  </span>
                  <span className="hidden text-right font-mono text-xs tabular text-muted md:block">
                    {formatUsd(marketCap(token.lastPrice) / ETH_USD)}
                  </span>
                  <span className="hidden md:block">
                    <span className="mb-1 block text-right font-mono text-[11px] text-muted">
                      {token.graduated ? "låst" : `${Math.round(prog * 100)}%`}
                    </span>
                    <span className="block h-1 overflow-hidden rounded-full bg-raised">
                      <span
                        className="block h-full rounded-full bg-accent"
                        style={{ width: `${Math.round(prog * 100)}%` }}
                      />
                    </span>
                  </span>
                  <span className="flex items-center justify-end gap-2">
                    <Spark data={token.spark} up={up} className="hidden h-7 w-16 sm:block" />
                    <span className={cn("font-mono text-xs tabular", tax > 300 ? "text-short" : "text-muted")}>
                      {token.graduated ? "—" : `${(tax / 100).toFixed(0)}%`}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <aside className="flex min-w-0 flex-col gap-3">
        {selected ? <TokenDetail token={selected} now={now} /> : null}
        <section className="rounded-xl border border-border bg-surface">
          <header className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-medium">Tape</h2>
            <p className="text-xs text-muted">Varje rad går genom hooken</p>
          </header>
          <ul className="max-h-72 divide-y divide-border overflow-y-auto font-mono text-[11px]">
            {tape.slice(0, 24).map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-2 px-4 py-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span className={row.side === "buy" ? "text-long" : "text-short"}>
                    {row.side === "buy" ? "BUY" : "SELL"}
                  </span>
                  <span className="truncate text-fg">{row.symbol}</span>
                  {row.trader === "bot" && <Badge tone="accent">du</Badge>}
                </span>
                <span className="tabular text-muted">{formatEth(row.eth, 3)} ETH</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function TokenDetail({ token, now }: { token: Token; now: number }) {
  const age = ageSec(token, now);
  const tax = token.graduated ? 0 : snipeTaxBps(age);
  const prog = curveProgress(token);
  const real = Math.max(0, token.quoteReserve - token.phantomQuote);
  const up = token.lastPrice >= token.openPrice;
  const chg = token.openPrice > 0 ? ((token.lastPrice - token.openPrice) / token.openPrice) * 100 : 0;

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium">{token.name}</h2>
          <p className="font-mono text-[11px] text-subtle">{shortAddr(token.address, 6)}</p>
        </div>
        <Badge tone={token.graduated ? "long" : "muted"}>
          {token.graduated ? "Uniswap v4" : "kurva"}
        </Badge>
      </div>
      <p className={cn("mt-3 font-mono text-2xl tabular", up ? "text-long" : "text-short")}>
        {formatEth(token.lastPrice, 8)}
        <span className="ml-2 text-xs">{formatPct(chg)}</span>
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <Stat label="Volym" value={`${formatEth(token.volumeEth, 3)} ETH`} />
        <Stat label="Trades" value={formatCompact(token.trades)} />
        <Stat label="Holders" value={String(token.holders)} />
        <Stat
          label="Kurva"
          value={token.graduated ? "4.20 / 4.20" : `${real.toFixed(2)} / ${GRADUATION_ETH}`}
        />
        <Stat label="Snipe-skatt" value={token.graduated ? "0%" : `${(tax / 100).toFixed(1)}%`} />
        <Stat label="Creator tax" value={`${(token.creatorTaxBps / 100).toFixed(1)}%`} />
      </dl>
      <div className="mt-4">
        <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-wide text-subtle">
          <span>Graduation</span>
          <span>{Math.round(prog * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-raised">
          <div className="h-full rounded-full bg-accent" style={{ width: `${Math.round(prog * 100)}%` }} />
        </div>
      </div>
      {token.buybackEnabled && (
        <p className="mt-3 text-xs text-muted">Buyback på. Återköpta tokens låses i fem år.</p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-subtle">{label}</dt>
      <dd className="mt-0.5 font-mono tabular text-fg">{value}</dd>
    </div>
  );
}
