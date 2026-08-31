import { ArrowRight, Lock, Store, Timer, Coins, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSim } from "@/lib/store";
import { HOOK_ADDRESS } from "@/lib/engine/names";
import { shortAddr } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    icon: Store,
    title: "Någon bakar en ny kaka",
    body: "En person gör en memecoin. Hela högen läggs i en automat — en bonding curve. Automaten säljer kakor billigt först, dyrare sen. Precis som om det bara fanns tre glassar kvar i kiosken.",
  },
  {
    n: "02",
    icon: Coins,
    title: "Folk stoppar in pengar",
    body: "Du ger automaten ETH. Den ger dig kakor tillbaka. Ju mer som köps, desto dyrare blir nästa kaka. Säljer du, får du ETH tillbaka — men lite mindre, för priset har rört sig.",
  },
  {
    n: "03",
    icon: Landmark,
    title: "Kassamaskinen tar en slant",
    body: "Det här är den viktiga biten. Adressen du skickade är inte en person som handlar. Det är kassamaskinen. Varje gång någon köper eller säljer tar den en liten avgift i ETH. Den sitter i VARJE butik som Pons öppnar. Därför ser det ut som att den 'handlar' miljoner gånger.",
  },
  {
    n: "04",
    icon: Timer,
    title: "De första fem sekunderna är en fälla",
    body: "Just när kakan kommer ut tar kassan 99% av pengarna. Efter en sekund ungefär 25%. Efter två sekunder 3%. Efter fem sekunder noll. Det är för att stoppa fuskare som försöker köpa före alla andra. Väntar du lite, betalar du nästan inget extra.",
  },
  {
    n: "05",
    icon: Lock,
    title: "När automaten är tom låses kakan in",
    body: "När folk köpt för 4,2 ETH är automaten slutsåld. Då flyttas kakan till en stor butik (Uniswap v4) och låses för alltid. Ingen kan stjäla pengarna ur butiken. Kassamaskinen sitter kvar och tar avgift där också.",
  },
];

export function ExplainView() {
  const setView = useSim((s) => s.setView);
  const toggleBot = useSim((s) => s.toggleBot);
  const running = useSim((s) => s.bot.running);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-28 pt-6 md:gap-10 md:pb-16 md:pt-10">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Robinhood Chain · Pons V2
        </p>
        <h1 className="font-display text-[2.15rem] leading-[1.12] tracking-[-0.03em] text-fg md:text-5xl">
          Det är inte en robot som handlar.
          <span className="text-muted"> Det är en kassamaskin.</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted">
          Adressen {shortAddr(HOOK_ADDRESS, 6)} på GMGN ser ut som världens mest
          hyperaktiva bot. Den är Pons V2 Meme Hook — en Uniswap v4-krok som tar
          avgift på varje swap. Här är en exakt kopia du kan köra, med
          leksakspengar.
        </p>
      </header>

      <ol className="flex flex-col gap-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="rounded-xl border border-border bg-surface p-4 shadow-panel md:p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-raised text-accent">
                <step.icon className="size-5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-subtle">{step.n}</span>
                  <h2 className="text-[15px] font-medium tracking-tight">{step.title}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
        <h2 className="font-display text-2xl tracking-[-0.03em]">Vad din kopia gör</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          När du startar boten händer två saker, precis som i originalet:
        </p>
        <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="mt-0.5 font-mono text-[11px] text-subtle">A</span>
            <span>
              <strong className="font-medium text-fg">Hooken</strong> binder sig till varje ny
              lansering och tar 1% i ETH. 30% går till protokollet (det är din vinst som
              kassamaskin), 70% till den som bakade kakan.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 font-mono text-[11px] text-subtle">B</span>
            <span>
              <strong className="font-medium text-fg">Snipern</strong> väntar tills
              femsekundersfällan lugnat sig, köper för en fast ETH-summa, och säljer vid
              vinstmål eller stop-loss. Precis så folk försöker rida på samma pools.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          Inga riktiga pengar. Ingen privat nyckel. Marknaden här inne är en levande kopia
          av kurvan, skatten och graduationen — så du ser hur originalet tänker.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => {
              if (!running) toggleBot();
              setView("bot");
            }}
          >
            Starta min kopia
            <ArrowRight />
          </Button>
          <Button variant="outline" onClick={() => setView("market")}>
            Titta på trenches först
          </Button>
        </div>
      </section>
    </div>
  );
}
