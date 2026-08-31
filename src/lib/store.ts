import { create } from "zustand";
import { botEquity, createWorld, resetWorld, sweepHook, tick } from "@/lib/engine/sim";
import type { BotConfig, World } from "@/lib/engine/types";

const BOT_KEY = "hook-bot-config-v2";

const defaultBot: BotConfig = {
  running: false,
  buyEth: 0.05,
  maxSnipeTaxBps: 2500,
  takeProfitPct: 80,
  stopLossPct: 35,
  maxPositions: 4,
  sellOnGraduate: true,
  skipHotOnly: false,
};

function loadBot(): BotConfig {
  if (typeof localStorage === "undefined") return defaultBot;
  try {
    const raw = localStorage.getItem(BOT_KEY);
    if (!raw) return defaultBot;
    return { ...defaultBot, ...JSON.parse(raw), running: false };
  } catch {
    return defaultBot;
  }
}

type View = "explain" | "market" | "bot" | "hook";

type Store = {
  world: World;
  bot: BotConfig;
  view: View;
  selectedId: string | null;
  hydrated: boolean;
  setView: (v: View) => void;
  select: (id: string | null) => void;
  patchBot: (p: Partial<BotConfig>) => void;
  toggleBot: () => void;
  sweep: () => void;
  reset: () => void;
  step: (now: number) => void;
  hydrate: () => void;
};

export const useSim = create<Store>((set, get) => ({
  world: createWorld(Date.now()),
  bot: defaultBot,
  view: "explain",
  selectedId: null,
  hydrated: false,
  setView: (view) => set({ view }),
  select: (selectedId) => set({ selectedId }),
  patchBot: (p) => {
    const bot = { ...get().bot, ...p };
    set({ bot });
    try {
      localStorage.setItem(BOT_KEY, JSON.stringify({ ...bot, running: false }));
    } catch {
      /* ignore */
    }
  },
  toggleBot: () => {
    const bot = { ...get().bot, running: !get().bot.running };
    set({ bot });
  },
  sweep: () => {
    const world = get().world;
    sweepHook(world);
    set({ world: { ...world, hook: { ...world.hook } } });
  },
  reset: () => {
    set({
      world: resetWorld(),
      selectedId: null,
      bot: { ...get().bot, running: false },
    });
  },
  step: (now) => {
    const { world, bot } = get();
    tick(world, now, bot);
    set({
      world: {
        ...world,
        tokens: world.tokens.slice(),
        tape: world.tape.slice(),
        positions: world.positions.slice(),
        closed: world.closed.slice(),
        feeSeries: world.feeSeries.slice(),
        hook: { ...world.hook },
      },
    });
  },
  hydrate: () => {
    if (get().hydrated) return;
    set({ bot: loadBot(), hydrated: true, world: createWorld(Date.now()) });
  },
}));

export function useBotEquity() {
  return useSim((s) => botEquity(s.world));
}
