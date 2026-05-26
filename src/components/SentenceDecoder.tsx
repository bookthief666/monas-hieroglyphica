import { useMemo, useState } from 'react';
import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

const filters = ['all', '1', '2', '3', '4', '6'] as const;
type Filter = (typeof filters)[number];

export default function SentenceDecoder() {
  const [filter, setFilter] = useState<Filter>('all');
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const setActiveSentence = useMonasStore((state) => state.setActiveSentence);
  const setPhase = useMonasStore((state) => state.setPhase);

  const visibleSentences = useMemo(() => {
    if (filter === 'all') return monasSentences;
    return monasSentences.filter((sentence) => sentence.theorem === Number(filter));
  }, [filter]);

  const selectSentence = (id: string) => {
    const sentence = monasSentences.find((item) => item.id === id);
    if (!sentence) return;
    setActiveSentence(sentence.id);
    setPhase(sentence.phase);
    window.requestAnimationFrame(() => {
      document.getElementById('manifestation-stage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <div className="relative h-full p-4 sm:p-5">
      <div className="mb-4">
        <p className="latin-caps text-[0.68rem] font-black text-amber-300/62">Sentence Decoder</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-amber-50">Latin · English · Operation</h2>
        <p className="mt-2 text-xs leading-5 text-amber-100/55">
          Filter by theorem, then tap a sentence. The stage will return to view and manifest its diagram.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {filters.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-3 py-2 text-[0.65rem] font-black tracking-[0.12em] transition ${
                active
                  ? 'border-amber-300/45 bg-amber-300/15 text-amber-50 shadow-[0_0_18px_rgba(245,172,74,0.14)]'
                  : 'border-amber-100/10 bg-black/26 text-amber-100/48 hover:border-amber-200/28 hover:text-amber-50'
              }`}
            >
              {item === 'all' ? 'ALL' : `TH. ${item}`}
            </button>
          );
        })}
      </div>

      <div className="decoder-scroll max-h-[70vh] space-y-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-22rem)]">
        {visibleSentences.map((sentence) => {
          const active = sentence.id === activeSentenceId;
          return (
            <button
              key={sentence.id}
              type="button"
              onClick={() => selectSentence(sentence.id)}
              className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${
                active
                  ? 'border-amber-300/52 bg-amber-300/[0.105] shadow-[0_0_34px_rgba(213,118,25,0.24)]'
                  : 'border-amber-100/10 bg-black/24 hover:border-amber-200/26 hover:bg-amber-200/[0.055]'
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,202,117,0.16),transparent_13rem)] opacity-0 transition group-hover:opacity-100" />
              <div className="relative mb-3 flex items-center justify-between gap-3">
                <span className="latin-caps text-[0.68rem] font-black text-amber-300/72">Theorem {sentence.theorem}</span>
                <span className="rounded-full border border-amber-200/12 bg-black/34 px-2 py-0.5 text-[0.65rem] font-bold text-amber-100/62">
                  {sentence.phase}
                </span>
              </div>
              <p className="relative text-xs italic leading-5 text-amber-100/66">{sentence.latin}</p>
              <p className="relative mt-3 text-sm leading-6 text-amber-50/88">{sentence.english}</p>
              <div className="relative mt-3 flex flex-wrap gap-1.5">
                {sentence.symbols.map((symbol) => (
                  <span key={symbol} className="rounded-full bg-amber-200/[0.075] px-2 py-0.5 text-[0.62rem] font-bold text-amber-100/52">
                    {symbol}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
