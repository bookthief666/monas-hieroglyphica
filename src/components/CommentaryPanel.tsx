import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

export default function CommentaryPanel() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const sentence = monasSentences.find((item) => item.id === activeSentenceId) ?? monasSentences[0];

  return (
    <div className="relative h-full p-4 sm:p-5">
      <p className="latin-caps text-[0.68rem] font-black text-amber-300/62">Commentary Layers</p>
      <h2 className="mt-1 text-2xl font-black tracking-tight text-amber-50">Theorem {sentence.theorem}</h2>
      <p className="mt-2 text-xs leading-5 text-amber-100/55">
        Glosses are separated so Dee, geometry, alchemy, philology and modern visualization do not collapse into one voice.
      </p>

      <div className="commentary-scroll mt-4 max-h-[70vh] space-y-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-18rem)]">
        <section className="rounded-2xl border border-amber-200/14 bg-black/26 p-4 shadow-[inset_0_0_30px_rgba(255,190,94,0.035)]">
          <h3 className="latin-caps text-[0.68rem] font-black text-amber-300/62">Source note</h3>
          <p className="mt-2 text-sm leading-6 text-amber-50/78">{sentence.sourceNote}</p>
        </section>

        {Object.entries(sentence.layers).map(([key, value]) => (
          <section key={key} className="rounded-2xl border border-amber-200/10 bg-black/22 p-4 shadow-[inset_0_0_30px_rgba(255,190,94,0.025)]">
            <h3 className="latin-caps text-[0.68rem] font-black text-amber-300/58">{key}</h3>
            <p className="mt-2 text-sm leading-6 text-amber-50/78">{value}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
