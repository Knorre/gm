import { BookOpen, CandlestickChart, Landmark, Bot } from "lucide-react";
import { useSim } from "@/lib/store";
import { formatEth } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const TABS = [
  { id: "explain", label: "Så funkar det", icon: BookOpen },
  { id: "market", label: "Trenches", icon: CandlestickChart },
  { id: "bot", label: "Min bot", icon: Bot },
  { id: "hook", label: "Hooken", icon: Landmark },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const view = useSim((s) => s.view);
  const setView = useSim((s) => s.setView);
  const running = useSim((s) => s.bot.running);
  const fees = useSim((s) => s.world.hook.protocolFeesEth);
  const swaps = useSim((s) => s.world.hook.swapsProcessed);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <p className="text-sm font-medium tracking-tight">HOOK</p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-subtle sm:block">
                Pons V2 replica
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setView(tab.id)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                  view === tab.id ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                <tab.icon className="size-4" strokeWidth={1.6} />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className={cn("hidden sm:inline", running ? "text-long" : "text-subtle")}>
              {running ? "LIVE" : "IDLE"}
            </span>
            <span className="tabular text-muted">{formatEth(fees, 4)} ETH</span>
            <span className="hidden tabular text-subtle sm:inline">{swaps} tx</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-3 pt-3 md:px-4 md:pt-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <ul className="grid grid-cols-4">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setView(tab.id)}
                className={cn(
                  "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[11px]",
                  view === tab.id ? "text-fg" : "text-muted",
                )}
              >
                <tab.icon className="size-4" strokeWidth={1.6} />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-raised" />
      <path
        d="M9 8h3.2v12.2a4.8 4.8 0 1 0 9.6 0V14H19v6.2a1.6 1.6 0 1 1-3.2 0V8H9z"
        className="fill-accent"
      />
    </svg>
  );
}
