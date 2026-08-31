import { useSim, useBotEquity } from "@/lib/store";
import { positionValue } from "@/lib/engine/sim";
import { snipeTaxBps } from "@/lib/engine/math";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEth, formatPct, formatUsd } from "@/lib/utils";
import { Play, Square } from "lucide-react";

export function BotView() {
  const bot = useSim((s) => s.bot);
  const patch = useSim((s) => s.patchBot);
  const toggle = useSim((s) => s.toggleBot);
  const world = useSim((s) => s.world);
  const equity = useBotEquity();
  const pnl = equity - world.botStartCash;
  const pnlPct = (pnl / world.botStartCash) * 100;
  const wins = world.closed.filter((c) => c.pnlEth > 0).length;
  const losses = world.closed.filter((c) => c.pnlEth <= 0).length;
  const winRate = wins + losses === 0 ? 0 : (wins / (wins + losses)) * 100;

  return (
    <div className="grid gap-3 pb-28 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:pb-4">
      <section className="rounded-xl border border-border bg-surface p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Sniper</p>
            <h2 className="mt-1 font-display text-2xl tracking-[-0.03em]">Din kopia handlar</h2>
            <p className="mt-1 max-w-md text-sm text-muted">
              Väntar ut snipe-skatten, köper, säljer på mål. Hooken tar avgift på dina
              affärer också — precis som originalet.
            </p>
          </div>
          <Button variant={bot.running ? "short" : "default"} onClick={toggle}>
            {bot.running ? <Square /> : <Play />}
            {bot.running ? "Stoppa" : "Starta boten"}
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Kpi label="Equity" value={`${formatEth(equity, 3)} ETH`} sub={formatUsd(equity)} />
          <Kpi
            label="PnL"
            value={formatEth(pnl, 3)}
            sub={formatPct(pnlPct)}
            tone={pnl >= 0 ? "long" : "short"}
          />
          <Kpi label="Win rate" value={`${winRate.toFixed(0)}%`} sub={`${wins}W / ${losses}L`} />
          <Kpi label="Kassa" value={`${formatEth(world.botCash, 3)}`} sub={`${world.positions.length} öppna`} />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <SliderField
            label="Köpsumma"
            hint={`${bot.buyEth.toFixed(3)} ETH per entry`}
            min={0.01}
            max={0.25}
            step={0.01}
            value={bot.buyEth}
            onChange={(v) => patch({ buyEth: v })}
          />
          <SliderField
            label="Max snipe-skatt"
            hint={`Köper först under ${(bot.maxSnipeTaxBps / 100).toFixed(0)}%`}
            min={0}
            max={9900}
            step={50}
            value={bot.maxSnipeTaxBps}
            onChange={(v) => patch({ maxSnipeTaxBps: v })}
          />
          <SliderField
            label="Take profit"
            hint={`Sälj vid +${bot.takeProfitPct.toFixed(0)}%`}
            min={10}
            max={400}
            step={5}
            value={bot.takeProfitPct}
            onChange={(v) => patch({ takeProfitPct: v })}
          />
          <SliderField
            label="Stop loss"
            hint={`Sälj vid −${bot.stopLossPct.toFixed(0)}%`}
            min={5}
            max={80}
            step={1}
            value={bot.stopLossPct}
            onChange={(v) => patch({ stopLossPct: v })}
          />
          <SliderField
            label="Max positioner"
            hint={`${bot.maxPositions} samtidigt`}
            min={1}
            max={8}
            step={1}
            value={bot.maxPositions}
            onChange={(v) => patch({ maxPositions: v })}
          />
          <label className="flex items-center justify-between gap-3 rounded-md bg-raised px-3 py-3 text-sm">
            <span>
              Sälj vid graduation
              <span className="mt-0.5 block text-xs text-muted">Lämna kurvan när poolen låses</span>
            </span>
            <input
              type="checkbox"
              checked={bot.sellOnGraduate}
              onChange={(e) => patch({ sellOnGraduate: e.target.checked })}
              className="size-5 accent-accent"
            />
          </label>
        </div>
      </section>

      <div className="flex min-w-0 flex-col gap-3">
        <section className="rounded-xl border border-border bg-surface">
          <header className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-medium">Öppna positioner</h3>
          </header>
          <ul className="divide-y divide-border">
            {world.positions.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-muted">
                {bot.running ? "Spanar efter tokens under skattetaket…" : "Starta boten för att öppna affärer."}
              </li>
            )}
            {world.positions.map((pos) => {
              const token = world.tokens.find((t) => t.id === pos.tokenId);
              if (!token) return null;
              const value = positionValue(world, pos);
              const pnlPos = value - pos.costEth;
              const pct = pos.costEth > 0 ? (pnlPos / pos.costEth) * 100 : 0;
              const tax = token.graduated ? 0 : snipeTaxBps((world.now - token.launchedAt) / 1000);
              return (
                <li key={pos.tokenId} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{token.symbol}</p>
                    <p className="font-mono text-[11px] text-subtle">
                      in {formatEth(pos.costEth, 3)} · tax {(tax / 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono text-sm tabular ${pnlPos >= 0 ? "text-long" : "text-short"}`}>
                      {formatPct(pct)}
                    </p>
                    <p className="font-mono text-[11px] text-muted">{formatEth(value, 3)} ETH</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-medium">Stängda affärer</h3>
            <Badge>{world.closed.length}</Badge>
          </header>
          <ul className="max-h-72 divide-y divide-border overflow-y-auto">
            {world.closed.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-muted">Inga stängda affärer än.</li>
            )}
            {world.closed.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div>
                  <p className="text-sm">{c.symbol}</p>
                  <p className="font-mono text-[11px] uppercase text-subtle">{reasonSv(c.reason)}</p>
                </div>
                <p className={`font-mono text-sm tabular ${c.pnlEth >= 0 ? "text-long" : "text-short"}`}>
                  {c.pnlEth >= 0 ? "+" : ""}
                  {formatEth(c.pnlEth, 3)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function reasonSv(r: string) {
  if (r === "tp") return "take profit";
  if (r === "sl") return "stop loss";
  if (r === "graduate") return "graduation";
  if (r === "manual") return "manuell";
  return r;
}

function Kpi({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "long" | "short";
}) {
  return (
    <div className="rounded-md bg-raised px-3 py-3">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{label}</p>
      <p className={`mt-1 font-mono text-lg tabular ${tone === "long" ? "text-long" : tone === "short" ? "text-short" : "text-fg"}`}>
        {value}
      </p>
      {sub && <p className="font-mono text-[11px] text-muted">{sub}</p>}
    </div>
  );
}

function SliderField({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-[11px] text-muted">{hint}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 w-full accent-accent"
      />
    </label>
  );
}
