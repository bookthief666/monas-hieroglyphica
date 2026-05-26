import { monasSentences } from '../data/monasSentences';
import { theoremMeta } from '../data/theoremMeta';
import { useMonasStore } from '../state/monasStore';

export default function TheoremNavigator() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const setActiveSentence = useMonasStore((state) => state.setActiveSentence);
  const setPhase = useMonasStore((state) => state.setPhase);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];

  function selectTheorem(theorem: number) {
    const first = monasSentences.find((sentence) => sentence.theorem === theorem);
    if (!first) return;
    setActiveSentence(first.id);
    setPhase(first.phase);
    window.requestAnimationFrame(() => {
      document.getElementById('manifestation-stage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  return (
    <nav className="mt-5 border-t border-amber-100/10 pt-5" aria-label="Theorem navigator">
      <ul className="flex flex-wrap justify-center gap-5 sm:gap-8">
        {theoremMeta.map((item) => {
          const selected = active.theorem === item.id;
          return (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => selectTheorem(item.id)}
                className={`font-blackletter text-3xl transition duration-500 sm:text-4xl ${
                  selected
                    ? 'scale-110 text-amber-200 drop-shadow-[0_0_20px_rgba(255,200,89,0.48)]'
                    : 'text-amber-100/45 hover:text-amber-200'
                }`}
                title={item.title}
              >
                {item.numeral}
              </button>
              {selected && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-red-400 drop-shadow-[0_0_10px_rgba(255,68,68,0.8)]">
                  ▲
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
