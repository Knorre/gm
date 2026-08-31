import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { ExplainView } from "@/components/explain-view";
import { MarketView } from "@/components/market-view";
import { BotView } from "@/components/bot-view";
import { HookView } from "@/components/hook-view";
import { useSim } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const view = useSim((s) => s.view);
  return (
    <Shell>
      {view === "explain" && <ExplainView />}
      {view === "market" && <MarketView />}
      {view === "bot" && <BotView />}
      {view === "hook" && <HookView />}
    </Shell>
  );
}
