import AmbientDrone from './components/AmbientDrone';
import BackgroundCrossfade from './components/BackgroundCrossfade';
import EtchedGlyphOverlay from './components/EtchedGlyphOverlay';
import FacsimileVeil from './components/FacsimileVeil';
import LivingMarginalia from './components/LivingMarginalia';
import ManuscriptScholium from './components/ManuscriptScholium';
import ParticleManifestation from './components/ParticleManifestation';
import SentenceDecoder from './components/SentenceDecoder';
import CommentaryPanel from './components/CommentaryPanel';
import SymbolProgress from './components/SymbolProgress';
import TheoremNavigator from './components/TheoremNavigator';
import { monasSentences } from './data/monasSentences';
import { getTheoremMeta } from './data/theoremMeta';
import { useMonasStore } from './state/monasStore';

export default function App() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];
  const meta = getTheoremMeta(active.theorem);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-amber-50 selection:bg-red-950 selection:text-amber-200">
      <BackgroundCrossfade image={meta.bgImage} />
      <div className="fixed inset-0 bg-black/76 backdrop-blur-[2px]" />
      <div className="fixed inset-0 opacity-[0.17] mix-blend-screen smoke-noise" />
      <div className="fixed inset-0 pointer-events-none vignette" />
      <LivingMarginalia />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-4 sm:px-5 lg:px-8 lg:py-7">
        <header className="ritual-frame mb-4 overflow-hidden rounded-[1.8rem] px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="latin-caps text-[0.68rem] font-black text-amber-300/70">Monas Hieroglyphica · Prototype 005</p>
              <h1 className="font-blackletter mt-2 text-5xl tracking-wide text-amber-200 drop-shadow-[0_0_28px_rgba(255,187,84,0.28)] sm:text-7xl lg:text-8xl">
                Monas Hieroglyphica
              </h1>
              <p className="font-medieval mt-3 max-w-3xl text-sm uppercase tracking-[0.24em] text-amber-100/62 sm:text-base">
                Iohannes Dee <span className="text-red-400">✤</span> Londinensis <span className="text-red-400">✤</span> 1564
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-amber-100/70 sm:text-base">
                Click a sentence: the manuscript background crossfades, the text burns into a new theorem,
                particles gather as constellations, and the etched plate reveals the operation.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/10 bg-black/30 px-4 py-3 text-xs leading-5 text-amber-100/65 shadow-[0_0_34px_rgba(0,0,0,0.45)]">
              <div className="flex items-start justify-between gap-3">
                <span className="latin-caps block text-amber-300/70">{meta.title}</span>
                <AmbientDrone />
              </div>
              <span className="font-script mt-2 block text-base italic text-amber-100/72">{meta.marginalia}</span>
            </div>
          </div>
          <SymbolProgress />
          <TheoremNavigator />
        </header>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[0.95fr_1.12fr_0.93fr]">
          <aside className="ritual-panel order-2 min-h-[35rem] overflow-hidden rounded-[1.7rem] lg:order-1">
            <SentenceDecoder />
          </aside>

          <section id="manifestation-stage" className="manifestation-stage order-1 min-h-[34rem] overflow-hidden rounded-[2rem] lg:sticky lg:top-4 lg:order-2 lg:min-h-[calc(100vh-9rem)]">
            <ParticleManifestation />
            <EtchedGlyphOverlay />
            <FacsimileVeil />
            <div className="pointer-events-none absolute inset-0 stage-grid" />
            <div className="pointer-events-none absolute inset-0 stage-aura" />
            <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between text-[0.62rem] font-black tracking-[0.24em] text-amber-200/45 sm:inset-x-7">
              <span>QVOD NON INTELLIGIT</span>
              <span>{meta.numeral}</span>
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

        <div className="mt-4">
          <ManuscriptScholium />
        </div>
      </section>
    </main>
  );
}
