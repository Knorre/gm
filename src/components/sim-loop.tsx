import { useEffect } from "react";
import { useSim } from "@/lib/store";

export function SimLoop() {
  const hydrate = useSim((s) => s.hydrate);
  const step = useSim((s) => s.step);

  useEffect(() => {
    hydrate();
    const w = window as unknown as { __hook?: () => unknown };
    w.__hook = () => {
      const s = useSim.getState();
      const now = s.world.now;
      return {
        running: s.bot.running,
        cash: s.world.botCash,
        positions: s.world.positions,
        closed: s.world.closed.length,
        buyEth: s.bot.buyEth,
        maxTax: s.bot.maxSnipeTaxBps,
        tokens: s.world.tokens.slice(0, 8).map((t) => ({
          s: t.symbol,
          age: Number(((now - t.launchedAt) / 1000).toFixed(2)),
          grad: t.graduated,
          real: Number((t.quoteReserve - t.phantomQuote).toFixed(3)),
        })),
      };
    };
  }, [hydrate]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
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
