import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSim } from "@/lib/store";
import { HOOK_ADDRESS, FACTORY_ADDRESS, ESCROW_ADDRESS, LOCKER_ADDRESS } from "@/lib/engine/names";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEth, formatUsd, shortAddr } from "@/lib/utils";
import { Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

export function HookView() {
  const hook = useSim((s) => s.world.hook);
  const series = useSim((s) => s.world.feeSeries);
  const sweep = useSim((s) => s.sweep);
  const reset = useSim((s) => s.reset);
  const [copied, setCopied] = useState(false);

  const data = series.map((p) => ({
    t: p.t,
    fees: Number(p.fees.toFixed(5)),
    volume: Number(p.volume.toFixed(4)),
  }));

  async function copy() {
    try {
      await navigator.clipboard.writeText(HOOK_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-col gap-3 pb-28 md:pb-4">
      <section className="rounded-xl border border-border bg-surface p-4 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              PonsV2MemeHook
            </p>
            <h2 className="mt-1 font-display text-2xl tracking-[-0.03em]">Kassamaskinen</h2>
            <button
              type="button"
              onClick={copy}
              className="mt-2 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-fg"
            >
              {shortAddr(HOOK_ADDRESS, 8)}
              <Copy className="size-3.5" />
              {copied ? "kopierad" : "kopiera originalet"}
            </button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={sweep}>
              Sweep fees
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw />
              Nollställ
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi
            label="Protokollavgifter"
            value={`${formatEth(hook.protocolFeesEth, 4)} ETH`}
            sub={formatUsd(hook.protocolFeesEth)}
          />
          <Kpi
            label="Creator + skatt"
            value={`${formatEth(hook.creatorFeesEth, 4)}`}
            sub="70% av fee + tax"
          />
          <Kpi
            label="Volym genom hook"
            value={`${formatEth(hook.volumeEth, 3)}`}
            sub={`${hook.swapsProcessed} swaps`}
          />
          <Kpi
            label="Pending sweep"
            value={`${formatEth(hook.pendingSweepEth, 4)}`}
            sub={`${hook.poolsBound} v4-pooler`}
          />
        </div>

        <div className="mt-6 h-48 w-full">
          {data.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="feeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-raised)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: "IBM Plex Mono, monospace",
                  }}
                  labelFormatter={() => "Ackumulerade protokollavgifter"}
                  formatter={(v) => [`${formatEth(Number(v), 5)} ETH`, "fees"]}
                />
                <Area
                  type="monotone"
                  dataKey="fees"
                  stroke="var(--color-accent)"
                  fill="url(#feeFill)"
                  strokeWidth={1.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Avgifter ritas upp så fort första swappen går igenom.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface p-4">
          <h3 className="text-sm font-medium">Vad kontraktet faktiskt gör</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-fg">beforeInitialize</span> — släpper bara in pooler som
              Pons-fabriken registrerat.
            </li>
            <li>
              <span className="text-fg">afterSwap</span> — tar protokollavgift och creator tax i
              quote-valutan (ETH), aldrig i memecoinen.
            </li>
            <li>
              Andra Uniswap-callbacks är avstängda. Hooken stoppar ingen handel, håller inga
              användarpengar, och tar inte transfer-skatt.
            </li>
            <li>
              Den håller bara upplupna avgifter tills någon anropar sweep. Precis som originalet på
              kedjan.
            </li>
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-surface p-4">
          <h3 className="text-sm font-medium">Riktiga adresser (kedja 4663)</h3>
          <dl className="mt-3 space-y-2 font-mono text-[12px]">
            <Row k="Hook" v={HOOK_ADDRESS} />
            <Row k="Factory" v={FACTORY_ADDRESS} />
            <Row k="Fee escrow" v={ESCROW_ADDRESS} />
            <Row k="LP locker" v={LOCKER_ADDRESS} />
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>singleton</Badge>
            <Badge>fee-on-unspecified</Badge>
            <Badge>no user funds</Badge>
            <Badge tone="long">{hook.launches} launches</Badge>
            <Badge>{hook.graduations} graduated</Badge>
          </div>
        </article>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-subtle">{k}</dt>
      <dd className="truncate text-fg">{shortAddr(v, 6)}</dd>
    </div>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-md bg-raised px-3 py-3">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{label}</p>
      <p className="mt-1 font-mono text-lg tabular">{value}</p>
      {sub && <p className="font-mono text-[11px] text-muted">{sub}</p>}
    </div>
  );
}
