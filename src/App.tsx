import ParticleManifestation from './components/ParticleManifestation';
import SentenceDecoder from './components/SentenceDecoder';
import CommentaryPanel from './components/CommentaryPanel';
import SymbolProgress from './components/SymbolProgress';
import { monasSentences } from './data/monasSentences';
import { useMonasStore } from './state/monasStore';

export default function App() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-amber-50">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(122,71,25,0.23),transparent_34rem),radial-gradient(circle_at_20%_70%,rgba(114,34,14,0.18),transparent_26rem),linear-gradient(180deg,#050302_0%,#130b07_50%,#050302_100%)]" />
      <div className="fixed inset-0 opacity-[0.14] mix-blend-screen smoke-noise" />
      <div className="fixed inset-0 pointer-events-none vignette" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-4 sm:px-5 lg:px-8 lg:py-7">
        <header className="ritual-frame mb-4 overflow-hidden rounded-[1.8rem] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="latin-caps text-[0.68rem] font-black text-amber-300/70">Monas Hieroglyphica · Prototype 002</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-amber-50 drop-shadow-[0_0_28px_rgba(255,187,84,0.16)] sm:text-6xl lg:text-7xl">
                The Birth of the Monad
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-amber-100/70 sm:text-base">
                Click a sentence and the theorem’s geometry manifests from smoke: point, line, circumference,
                solar centre, lunar horn, and the first shadow of the cross.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/10 bg-black/30 px-4 py-3 text-xs leading-5 text-amber-100/65 shadow-[0_0_34px_rgba(0,0,0,0.45)]">
              <span className="latin-caps block text-amber-300/70">Active theorem {active.theorem}</span>
              <span>{active.paraphrase}</span>
            </div>
          </div>
          <SymbolProgress />
        </header>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[0.95fr_1.12fr_0.93fr]">
          <aside className="ritual-panel order-2 min-h-[35rem] overflow-hidden rounded-[1.7rem] lg:order-1">
            <SentenceDecoder />
          </aside>

          <section className="manifestation-stage order-1 min-h-[32rem] overflow-hidden rounded-[2rem] lg:order-2 lg:min-h-[calc(100vh-15rem)]">
            <ParticleManifestation />
            <div className="pointer-events-none absolute inset-0 stage-grid" />
            <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between text-[0.62rem] font-black tracking-[0.24em] text-amber-200/45 sm:inset-x-7">
              <span>QVOD NON INTELLIGIT</span>
              <span>MONAS</span>
            </div>
            <div className="pointer-events-none absolute inset-x-6 bottom-6 text-center">
              <p className="latin-caps text-[0.62rem] font-black text-amber-300/55">{active.symbols.join(' · ')}</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-amber-50/72">{active.paraphrase}</p>
            </div>
          </section>

          <aside className="ritual-panel order-3 min-h-[35rem] overflow-hidden rounded-[1.7rem]">
            <CommentaryPanel />
          </aside>
        </div>
      </section>
    </main>
  );
}
