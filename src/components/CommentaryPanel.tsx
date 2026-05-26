import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

export default function CommentaryPanel() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const sentence = monasSentences.find((item) => item.id === activeSentenceId) ?? monasSentences[0];

  return (
    <div className="h-full p-4 sm:p-5">
      <p className="latin-caps text-xs font-bold text-stone-700">Commentary Layers</p>
      <h2 className="mt-1 text-xl font-black text-stone-950">Theorem {sentence.theorem}</h2>

      <div className="mt-4 rounded-2xl border border-stone-900/15 bg-white/35 p-4">
        <p className="latin-caps text-[0.68rem] font-black text-stone-600">Source note</p>
        <p className="mt-2 text-sm leading-6 text-stone-800">{sentence.sourceNote}</p>
      </div>

      <div className="mt-4 space-y-3">
        {Object.entries(sentence.layers).map(([key, value]) => (
          <section key={key} className="rounded-2xl border border-stone-900/15 bg-white/35 p-4">
            <h3 className="latin-caps text-[0.68rem] font-black text-stone-600">{key}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-900">{value}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
