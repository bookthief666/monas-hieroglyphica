import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

function theoremLabel(theorem: number) {
  const numerals: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
  };
  return numerals[theorem] ?? String(theorem);
}

export default function FacsimileVeil() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];

  return (
    <aside className="facsimile-veil pointer-events-none absolute left-4 right-4 top-14 z-10 rounded-2xl p-4 sm:left-7 sm:right-auto sm:w-[22rem]">
      <div className="flex items-center justify-between gap-3">
        <p className="latin-caps text-[0.58rem] font-black text-amber-300/62">1564 Source</p>
        <p className="text-[0.62rem] font-black tracking-[0.18em] text-amber-100/45">THEOREMA {theoremLabel(active.theorem)}</p>
      </div>
      <p className="facsimile-line mt-3 text-[0.72rem] italic leading-5 text-amber-50/56">{active.latin}</p>
      <p className="mt-3 line-clamp-2 text-[0.63rem] leading-4 text-amber-100/36">{active.sourceNote}</p>
    </aside>
  );
}
