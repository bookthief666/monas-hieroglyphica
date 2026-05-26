import { motion } from 'framer-motion';
import { monasSentences } from '../data/monasSentences';
import { useMonasStore, type GlyphPhase } from '../state/monasStore';

const rank: Record<GlyphPhase, number> = {
  point: 0,
  line: 1,
  circle: 2,
  sun: 3,
  moon: 4,
  'cross-preview': 5,
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

function modeFromSentence(id: string) {
  if (id === 't2-s1') return 'radius';
  if (id === 't2-s2') return 'point';
  if (id === 't2-s3') return 'center';
  if (id === 't3-s1') return 'orbits';
  if (id === 't3-s2') return 'sun';
  if (id === 't4-s1') return 'moon-crown';
  if (id === 't4-s2') return 'obedience';
  if (id === 't4-s3') return 'equal-radius';
  if (id === 't4-s4') return 'solar-infusion';
  if (id === 't4-s5') return 'vanishing';
  if (id === 't4-s6') return 'crescent';
  if (id === 't6-preview') return 'cross';
  return 'genesis';
}

function SmallPlanet({ angle, radius, label }: { angle: number; radius: number; label: string }) {
  const cx = 320 + Math.cos(angle) * radius;
  const cy = 350 + Math.sin(angle) * radius;
  return (
    <motion.g initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 0.8, scale: 1 }} transition={{ duration: 0.8 }}>
      <circle cx={cx} cy={cy} r="5" fill="rgba(255,218,117,0.84)" />
      <text x={cx + 10} y={cy + 4} className="glyph-label" fill="rgba(255,237,183,0.58)">{label}</text>
    </motion.g>
  );
}

export default function EtchedGlyphOverlay() {
  const phase = useMonasStore((state) => state.phase);
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];
  const mode = modeFromSentence(active.id);

  const showLine = rank[phase] >= rank.line;
  const showCircle = rank[phase] >= rank.circle;
  const showMoon = rank[phase] >= rank.moon;
  const showCross = rank[phase] >= rank['cross-preview'];
  const key = `${active.id}-${phase}`;

  return (
    <svg
      key={key}
      viewBox="0 0 640 720"
      className="pointer-events-none absolute inset-0 h-full w-full text-amber-100"
      role="img"
      aria-label="Etched symbolic overlay"
    >
      <defs>
        <filter id="aureole" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.95  0 0.7 0 0 0.46  0 0 0.25 0 0.08  0 0 0 1 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="solarField" cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor="rgba(255,206,96,0.42)" />
          <stop offset="48%" stopColor="rgba(166,80,22,0.14)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="320"
        cy="350"
        r="214"
        fill="url(#solarField)"
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: showCircle ? 1 : 0.22, scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      <g filter="url(#aureole)" strokeLinecap="round" strokeLinejoin="round">
        {showCircle && (
          <motion.circle
            cx="320"
            cy="350"
            r="122"
            fill="none"
            stroke="rgba(255,238,188,0.82)"
            strokeWidth="2.6"
            variants={draw}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.15 }}
          />
        )}

        <motion.circle
          cx="320"
          cy="350"
          r={mode === 'point' ? 15 : 9}
          fill="rgba(255,227,142,0.96)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        />

        {showLine && (
          <motion.path
            d="M320 350 L320 228"
            stroke="rgba(255,235,174,0.74)"
            strokeWidth="2.4"
            variants={draw}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.85 }}
          />
        )}

        {showMoon && (
          <motion.path
            d="M198 228 A122 122 0 0 1 442 228"
            fill="none"
            stroke="rgba(255,242,206,0.9)"
            strokeWidth="3.2"
            variants={draw}
            initial="hidden"
            animate={mode === 'vanishing' ? { pathLength: 1, opacity: 0.18 } : 'visible'}
            transition={{ duration: 1 }}
          />
        )}

        {showCross && (
          <g stroke="rgba(255,176,91,0.8)" strokeWidth="3">
            <motion.path d="M320 362 L320 610" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.9 }} />
            <motion.path d="M206 500 L434 500" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.9, delay: 0.1 }} />
          </g>
        )}

        {mode === 'orbits' && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {[162, 206, 252].map((radius, index) => (
              <motion.circle
                key={radius}
                cx="320"
                cy="350"
                r={radius}
                fill="none"
                stroke="rgba(255,219,137,0.22)"
                strokeWidth="1.2"
                variants={draw}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1.4, delay: index * 0.12 }}
              />
            ))}
            <SmallPlanet angle={-0.2} radius={162} label="☉" />
            <SmallPlanet angle={2.2} radius={206} label="☽" />
            <SmallPlanet angle={4.8} radius={252} label="♄" />
          </motion.g>
        )}

        {mode === 'sun' && (
          <g stroke="rgba(255,190,83,0.62)" strokeWidth="1.7">
            {Array.from({ length: 24 }).map((_, index) => {
              const angle = (Math.PI * 2 * index) / 24;
              const x1 = 320 + Math.cos(angle) * 142;
              const y1 = 350 + Math.sin(angle) * 142;
              const x2 = 320 + Math.cos(angle) * 194;
              const y2 = 350 + Math.sin(angle) * 194;
              return (
                <motion.path
                  key={index}
                  d={`M${x1} ${y1} L${x2} ${y2}`}
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.55, delay: index * 0.018 }}
                />
              );
            })}
          </g>
        )}

        {(mode === 'equal-radius' || mode === 'radius') && (
          <g stroke="rgba(255,235,174,0.56)" strokeWidth="1.5" strokeDasharray="5 7">
            <motion.path d="M320 350 L442 350" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.8 }} />
            <motion.path d="M320 228 L442 228" variants={draw} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 0.12 }} />
            <text x="452" y="354" className="glyph-label" fill="rgba(255,237,183,0.56)">radius</text>
          </g>
        )}

        {mode === 'solar-infusion' && (
          <g stroke="rgba(255,191,79,0.62)" strokeWidth="1.8">
            {[-72, -48, -24, 0, 24, 48, 72].map((offset, index) => (
              <motion.path
                key={offset}
                d={`M${320 + offset} 254 C${315 + offset * 0.4} 238 ${320 + offset * 0.24} 220 ${320 + offset * 0.12} 196`}
                variants={draw}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.75, delay: index * 0.08 }}
              />
            ))}
          </g>
        )}

        {mode === 'cross' && (
          <g fill="rgba(255,202,117,0.82)">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const angle = -Math.PI / 2 + (Math.PI * 2 * index) / 7;
              return (
                <motion.circle
                  key={index}
                  cx={320 + Math.cos(angle) * 78}
                  cy={500 + Math.sin(angle) * 78}
                  r="4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                />
              );
            })}
          </g>
        )}
      </g>

      <g className="glyph-label" fill="rgba(255,237,183,0.50)">
        <text x="320" y="80" textAnchor="middle">{active.symbols.slice(0, 4).join(' · ').toUpperCase()}</text>
        <text x="320" y="665" textAnchor="middle">SENTENTIA FIT OPERATIO</text>
      </g>
    </svg>
  );
}
