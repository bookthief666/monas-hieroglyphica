import { useMonasStore, type GlyphPhase } from '../state/monasStore';

const phases: { id: GlyphPhase; label: string }[] = [
  { id: 'point', label: 'Point' },
  { id: 'line', label: 'Line' },
  { id: 'circle', label: 'Circumference' },
  { id: 'sun', label: 'Sun' },
  { id: 'moon', label: 'Moon' },
  { id: 'cross-preview', label: 'Cross' },
];

export default function SymbolProgress() {
  const phase = useMonasStore((state) => state.phase);
  const activeIndex = phases.findIndex((item) => item.id === phase);

  return (
    <nav className="border-b border-stone-800/20 px-4 py-4 sm:px-8" aria-label="Symbolic progress">
      <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {phases.map((item, index) => {
          const active = index <= activeIndex;
          return (
            <li key={item.id} className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full border ${
                  active ? 'border-amber-800 bg-amber-600' : 'border-stone-500/40 bg-stone-400/30'
                }`}
              />
              <span className={`text-xs font-semibold ${active ? 'text-stone-950' : 'text-stone-500'}`}>
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
