import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

export default function SentenceDecoder() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const setActiveSentence = useMonasStore((state) => state.setActiveSentence);
  const setPhase = useMonasStore((state) => state.setPhase);

  return (
    <div className="h-full p-4 sm:p-5">
      <div className="mb-4">
        <p className="latin-caps text-xs font-bold text-stone-700">Sentence Decoder</p>
        <h2 className="mt-1 text-xl font-black text-stone-950">Latin · English · Operation</h2>
      </div>
      <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
        {monasSentences.map((sentence) => {
          const active = sentence.id === activeSentenceId;
          return (
            <button
              key={sentence.id}
              type="button"
              onClick={() => {
                setActiveSentence(sentence.id);
                setPhase(sentence.phase);
              }}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                active
                  ? 'border-amber-800/60 bg-amber-100/80 shadow-md'
                  : 'border-stone-800/15 bg-white/35 hover:border-stone-800/35 hover:bg-white/55'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="latin-caps text-[0.68rem] font-black text-stone-700">Theorem {sentence.theorem}</span>
                <span className="rounded-full bg-stone-900/10 px-2 py-0.5 text-[0.65rem] font-bold text-stone-700">
                  {sentence.phase}
                </span>
              </div>
              <p className="text-xs italic leading-5 text-stone-700">{sentence.latin}</p>
              <p className="mt-3 text-sm leading-6 text-stone-950">{sentence.english}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
