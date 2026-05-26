import { monasSentences } from '../data/monasSentences';
import { useMonasStore } from '../state/monasStore';

const glyphs = ['☉', '☽', '☿', '♈', '✦', '✧', '△', '□', '◯', '✚', '✶', '🜂', '🜄', '🜁', '🜃'];

export default function LivingMarginalia() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];
  const symbols = [...active.symbols, ...glyphs].slice(0, 15);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {symbols.map((symbol, index) => {
        const left = 7 + ((index * 29) % 86);
        const top = 10 + ((index * 37) % 80);
        const delay = `${index * -0.9}s`;
        const duration = `${12 + (index % 5) * 3}s`;
        return (
          <span
            key={`${symbol}-${index}`}
            className="marginalia-rune absolute text-amber-200/18"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: delay,
              animationDuration: duration,
              fontSize: `${0.72 + (index % 4) * 0.22}rem`,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </div>
  );
}
