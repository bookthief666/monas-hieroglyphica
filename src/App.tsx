import MonasGlyph from './components/MonasGlyph';
import SentenceDecoder from './components/SentenceDecoder';
import CommentaryPanel from './components/CommentaryPanel';
import SymbolProgress from './components/SymbolProgress';
import { monasSentences } from './data/monasSentences';
import { useMonasStore } from './state/monasStore';

export default function App() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];

  return (
    <main className="min-h-screen p-3 text-stone-950 sm:p-5 lg:p-8">
      <section className="parchment mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] engraved-border">
        <header className="border-b border-stone-800/20 px-5 py-5 sm:px-8">
          <p className="latin-caps text-xs font-semibold text-stone-700">Monas Hieroglyphica · Prototype 001</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">
            The Birth of the Monad
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700 sm:text-base">
            A sentence-level, Latin-facing reading engine for Dee’s first symbolic operations: point, line,
            circumference, Sun, Moon, and the first preview of the cross.
          </p>
        </header>

        <SymbolProgress />

        <div className="grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[1.05fr_0.95fr_1.05fr]">
          <aside className="border-b border-stone-800/20 lg:border-b-0 lg:border-r">
            <SentenceDecoder />
          </aside>

          <section className="flex min-h-[360px] flex-col items-center justify-center border-b border-stone-800/20 p-5 lg:border-b-0 lg:border-r">
            <div className="w-full max-w-[420px] rounded-[2rem] border border-stone-900/20 bg-stone-950/5 p-5 shadow-inner">
              <MonasGlyph />
            </div>
            <div className="mt-5 max-w-md text-center">
              <p className="latin-caps text-[0.7rem] font-bold text-stone-700">Active theorem {active.theorem}</p>
              <p className="mt-2 text-sm leading-6 text-stone-800">{active.paraphrase}</p>
            </div>
          </section>

          <aside>
            <CommentaryPanel />
          </aside>
        </div>
      </section>
    </main>
  );
}
