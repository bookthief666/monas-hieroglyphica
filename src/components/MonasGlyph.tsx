import { motion } from 'framer-motion';
import { useMonasStore, type GlyphPhase } from '../state/monasStore';

const rank: Record<GlyphPhase, number> = {
  point: 0,
  line: 1,
  circle: 2,
  sun: 3,
  moon: 4,
  'cross-preview': 5,
};

function useVisible(min: GlyphPhase) {
  const phase = useMonasStore((state) => state.phase);
  return rank[phase] >= rank[min];
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

export default function MonasGlyph() {
  const showLine = useVisible('line');
  const showCircle = useVisible('circle');
  const showSun = useVisible('sun');
  const showMoon = useVisible('moon');
  const showCross = useVisible('cross-preview');

  return (
    <svg viewBox="0 0 320 420" className="h-auto w-full text-stone-950" role="img" aria-label="Animated Monas glyph">
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#f8df97" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#c58a2b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2b1b0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle cx="160" cy="190" r="120" fill="url(#goldGlow)" initial={{ opacity: 0 }} animate={{ opacity: showCircle ? 1 : 0 }} />

      {showCross && (
        <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.76">
          <motion.path d="M160 205 L160 372" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.8 }} />
          <motion.path d="M92 300 L228 300" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 0.15 }} />
        </g>
      )}

      {showMoon && (
        <motion.path
          d="M88 110 A72 72 0 0 1 232 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.85 }}
        />
      )}

      {showCircle && (
        <motion.circle
          cx="160"
          cy="182"
          r="72"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          variants={draw}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        />
      )}

      {showLine && (
        <motion.path
          d="M160 182 L160 110"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75 }}
        />
      )}

      <motion.circle
        cx="160"
        cy="182"
        r={showSun ? 7 : 5}
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      <g className="font-serif text-[13px] font-bold" fill="currentColor" opacity="0.62">
        <text x="160" y="35" textAnchor="middle">QVOD NON INTELLIGIT</text>
        <text x="160" y="392" textAnchor="middle">PUNCTVM · LINEA · CIRCVMFERENTIA</text>
      </g>
    </svg>
  );
}
