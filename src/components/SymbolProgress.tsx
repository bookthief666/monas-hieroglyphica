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
    <nav className="mt-5 border-t border-amber-100/10 pt-4" aria-label="Symbolic progress">
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {phases.map((item, index) => {
          const active = index <= activeIndex;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
                active
                  ? 'border-amber-300/28 bg-amber-300/[0.085] text-amber-50 shadow-[0_0_20px_rgba(209,121,35,0.12)]'
                  : 'border-amber-100/8 bg-black/22 text-amber-100/40'
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  active ? 'bg-amber-400 shadow-[0_0_15px_rgba(255,180,63,0.88)]' : 'bg-amber-100/18'
                }`}
              />
              <span className="text-xs font-bold">{item.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
