import { useEffect, useMemo, useRef } from 'react';
import { useMonasStore, type GlyphPhase } from '../state/monasStore';

type ManifestationMode =
  | 'primordial-circle'
  | 'hidden-radius'
  | 'point-seed'
  | 'central-ministry'
  | 'earth-orbits'
  | 'solar-dignity'
  | 'lunar-crown'
  | 'lunar-obedience'
  | 'lunar-radius'
  | 'solar-infusion'
  | 'lunar-disappearance'
  | 'crescent-return'
  | 'cross-septenary';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  hue: number;
  seed: number;
};

type Target = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  hue: number;
};

function modeFromSentence(id: string, phase: GlyphPhase): ManifestationMode {
  switch (id) {
    case 't2-s1':
      return 'hidden-radius';
    case 't2-s2':
      return 'point-seed';
    case 't2-s3':
      return 'central-ministry';
    case 't3-s1':
      return 'earth-orbits';
    case 't3-s2':
      return 'solar-dignity';
    case 't4-s1':
      return 'lunar-crown';
    case 't4-s2':
      return 'lunar-obedience';
    case 't4-s3':
      return 'lunar-radius';
    case 't4-s4':
      return 'solar-infusion';
    case 't4-s5':
      return 'lunar-disappearance';
    case 't4-s6':
      return 'crescent-return';
    case 't6-preview':
      return 'cross-septenary';
    default:
      return phase === 'point' ? 'point-seed' : 'primordial-circle';
  }
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function addCluster(targets: Target[], x: number, y: number, radius: number, amount: number, hue = 42, alpha = 0.9) {
  for (let i = 0; i < amount; i += 1) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    targets.push({ x: x + Math.cos(a) * r, y: y + Math.sin(a) * r, size: randomBetween(1.1, 2.8), alpha, hue });
  }
}

function addLine(targets: Target[], x1: number, y1: number, x2: number, y2: number, amount: number, hue = 36, alpha = 0.88) {
  for (let i = 0; i < amount; i += 1) {
    const t = amount <= 1 ? 0 : i / (amount - 1);
    targets.push({
      x: x1 + (x2 - x1) * t + randomBetween(-1.7, 1.7),
      y: y1 + (y2 - y1) * t + randomBetween(-1.7, 1.7),
      size: randomBetween(1.05, 2.25),
      alpha,
      hue,
    });
  }
}

function addArc(
  targets: Target[],
  cx: number,
  cy: number,
  radius: number,
  start: number,
  end: number,
  amount: number,
  hue = 43,
  alpha = 0.9,
) {
  for (let i = 0; i < amount; i += 1) {
    const t = amount <= 1 ? 0 : i / (amount - 1);
    const a = start + (end - start) * t;
    targets.push({
      x: cx + Math.cos(a) * radius + randomBetween(-1.6, 1.6),
      y: cy + Math.sin(a) * radius + randomBetween(-1.6, 1.6),
      size: randomBetween(1.05, 2.35),
      alpha,
      hue,
    });
  }
}

function addRays(targets: Target[], cx: number, cy: number, inner: number, outer: number, spokes: number, hue = 36) {
  for (let s = 0; s < spokes; s += 1) {
    const a = (Math.PI * 2 * s) / spokes;
    addLine(
      targets,
      cx + Math.cos(a) * inner,
      cy + Math.sin(a) * inner,
      cx + Math.cos(a) * outer,
      cy + Math.sin(a) * outer,
      18,
      hue,
      0.68,
    );
  }
}

function buildTargets(mode: ManifestationMode, width: number, height: number, count: number): Target[] {
  const targets: Target[] = [];
  const cx = width / 2;
  const cy = height * 0.52;
  const scale = Math.max(0.72, Math.min(width, height) / 520);
  const r = 96 * scale;
  const moonY = cy - 104 * scale;
  const crossY = cy + 126 * scale;

  const addSolar = (portion = 1) => {
    addArc(targets, cx, cy, r, 0, Math.PI * 2, Math.floor(count * 0.34 * portion), 42, 0.92);
    addCluster(targets, cx, cy, 11 * scale, Math.floor(count * 0.08 * portion), 39, 0.96);
  };
  const addMoon = (portion = 1, hue = 50) => {
    addArc(targets, cx, moonY, r, Math.PI, Math.PI * 2, Math.floor(count * 0.23 * portion), hue, 0.92);
  };

  switch (mode) {
    case 'point-seed':
      addCluster(targets, cx, cy, 19 * scale, Math.floor(count * 0.62), 38, 0.98);
      addArc(targets, cx, cy, 58 * scale, 0, Math.PI * 2, Math.floor(count * 0.16), 32, 0.25);
      break;
    case 'hidden-radius':
      addLine(targets, cx, cy, cx, cy - r, Math.floor(count * 0.42), 37, 0.95);
      addArc(targets, cx, cy, r, -Math.PI / 2, Math.PI * 1.5, Math.floor(count * 0.18), 42, 0.28);
      addCluster(targets, cx, cy, 11 * scale, Math.floor(count * 0.08), 42, 0.9);
      break;
    case 'central-ministry':
      addCluster(targets, cx, cy, 15 * scale, Math.floor(count * 0.2), 36, 0.98);
      addArc(targets, cx, cy, r, 0, Math.PI * 2, Math.floor(count * 0.26), 42, 0.78);
      addArc(targets, cx, cy, r * 1.45, 0, Math.PI * 2, Math.floor(count * 0.22), 50, 0.34);
      addLine(targets, cx - r * 1.45, cy, cx + r * 1.45, cy, Math.floor(count * 0.1), 22, 0.4);
      break;
    case 'earth-orbits':
      addCluster(targets, cx, cy, 13 * scale, Math.floor(count * 0.12), 38, 0.98);
      [0.72, 1, 1.32, 1.66].forEach((mul, i) => {
        addArc(targets, cx, cy, r * mul, 0, Math.PI * 2, Math.floor(count * (0.13 - i * 0.015)), 43 + i * 9, 0.72 - i * 0.08);
      });
      break;
    case 'solar-dignity':
      addSolar(1.1);
      addRays(targets, cx, cy, r * 1.08, r * 1.62, 18, 34);
      break;
    case 'lunar-crown':
      addSolar(0.78);
      addMoon(1.1, 49);
      addLine(targets, cx, cy, cx, moonY, Math.floor(count * 0.07), 44, 0.36);
      break;
    case 'lunar-obedience':
      addSolar(0.82);
      addMoon(0.95, 53);
      addLine(targets, cx - r * 0.72, moonY + 16 * scale, cx, cy - r * 0.78, Math.floor(count * 0.1), 49, 0.52);
      addLine(targets, cx + r * 0.72, moonY + 16 * scale, cx, cy - r * 0.78, Math.floor(count * 0.1), 49, 0.52);
      break;
    case 'lunar-radius':
      addSolar(0.75);
      addMoon(1.0, 50);
      addLine(targets, cx, moonY, cx + r, moonY, Math.floor(count * 0.1), 51, 0.66);
      addLine(targets, cx, cy, cx + r, cy, Math.floor(count * 0.1), 34, 0.66);
      break;
    case 'solar-infusion':
      addSolar(0.82);
      addMoon(0.85, 54);
      for (let i = 0; i < 9; i += 1) {
        const offset = (i - 4) * 18 * scale;
        addLine(targets, cx + offset, cy - r * 0.78, cx + offset * 0.45, moonY + 18 * scale, Math.floor(count * 0.035), 34, 0.72);
      }
      break;
    case 'lunar-disappearance':
      addSolar(0.9);
      addArc(targets, cx, moonY, r, Math.PI, Math.PI * 2, Math.floor(count * 0.1), 54, 0.18);
      addCluster(targets, cx, moonY + 20 * scale, r * 0.85, Math.floor(count * 0.28), 54, 0.12);
      break;
    case 'crescent-return':
      addSolar(0.62);
      addArc(targets, cx, moonY, r, Math.PI * 1.12, Math.PI * 1.88, Math.floor(count * 0.35), 53, 0.98);
      addCluster(targets, cx - r * 0.85, moonY + 3 * scale, 7 * scale, Math.floor(count * 0.04), 54, 1);
      addCluster(targets, cx + r * 0.85, moonY + 3 * scale, 7 * scale, Math.floor(count * 0.04), 54, 1);
      break;
    case 'cross-septenary':
      addSolar(0.74);
      addMoon(0.82, 51);
      addLine(targets, cx, cy - r * 0.05, cx, crossY, Math.floor(count * 0.22), 12, 0.92);
      addLine(targets, cx - r * 0.95, cy + r * 1.05, cx + r * 0.95, cy + r * 1.05, Math.floor(count * 0.18), 12, 0.9);
      addCluster(targets, cx, cy + r * 1.05, 9 * scale, Math.floor(count * 0.04), 10, 0.96);
      break;
    case 'primordial-circle':
    default:
      addLine(targets, cx, cy, cx, cy - r, Math.floor(count * 0.12), 37, 0.76);
      addSolar(0.95);
      addArc(targets, cx, cy, r * 1.32, 0, Math.PI * 2, Math.floor(count * 0.16), 49, 0.2);
      break;
  }

  while (targets.length < count) {
    const anchor = targets[Math.floor(Math.random() * Math.max(1, targets.length))] ?? { x: cx, y: cy, size: 1.4, alpha: 0.5, hue: 43 };
    targets.push({
      x: anchor.x + randomBetween(-8 * scale, 8 * scale),
      y: anchor.y + randomBetween(-8 * scale, 8 * scale),
      size: randomBetween(0.8, 2.6),
      alpha: Math.max(0.08, anchor.alpha * randomBetween(0.48, 1.05)),
      hue: anchor.hue + randomBetween(-5, 5),
    });
  }

  return targets.slice(0, count);
}

export default function ParticleManifestation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const phase = useMonasStore((state) => state.phase);
  const mode = useMemo(() => modeFromSentence(activeSentenceId, phase), [activeSentenceId, phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let time = 0;
    let particles: Particle[] = [];

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(360, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(2100, Math.max(880, Math.floor((width * height) / 560)));
      const targets = buildTargets(mode, width, height, count);

      particles = targets.map((target, index) => {
        const fromEdge = Math.random();
        const x = fromEdge < 0.42 ? randomBetween(-width * 0.2, width * 1.2) : randomBetween(width * 0.22, width * 0.78);
        const y = fromEdge < 0.42 ? randomBetween(-height * 0.2, height * 1.2) : randomBetween(height * 0.22, height * 0.78);
        return {
          x,
          y,
          vx: randomBetween(-1.2, 1.2),
          vy: randomBetween(-1.2, 1.2),
          tx: target.x,
          ty: target.y,
          size: target.size,
          alpha: target.alpha,
          hue: target.hue,
          seed: index * 19.19 + Math.random() * 1000,
        };
      });
    };

    const drawConstellations = () => {
      const cellSize = 28;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const grid: Particle[][] = Array.from({ length: cols * rows }, () => []);
      const maxDistSq = 560;

      for (const particle of particles) {
        const col = Math.max(0, Math.min(cols - 1, Math.floor(particle.x / cellSize)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(particle.y / cellSize)));
        grid[row * cols + col].push(particle);
      }

      context.save();
      context.globalCompositeOperation = 'lighter';
      context.strokeStyle = 'rgba(255,223,115,0.13)';
      context.lineWidth = 0.58;
      context.shadowColor = 'rgba(255,223,115,0.32)';
      context.shadowBlur = 3;
      context.beginPath();

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const cell = grid[row * cols + col];
          if (!cell.length) continue;
          const neighbors = [
            [row, col],
            [row, col + 1],
            [row + 1, col],
            [row + 1, col + 1],
            [row + 1, col - 1],
          ];

          for (const p1 of cell) {
            for (const [nr, nc] of neighbors) {
              if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
              const neighborCell = grid[nr * cols + nc];
              for (const p2 of neighborCell) {
                if (p1 === p2) continue;
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = dx * dx + dy * dy;
                if (dist < maxDistSq && Math.random() > 0.985) {
                  context.moveTo(p1.x, p1.y);
                  context.lineTo(p2.x, p2.y);
                }
              }
            }
          }
        }
      }

      context.stroke();
      context.restore();
    };

    const drawFrame = () => {
      time += 1;
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = 'rgba(5, 3, 2, 0.155)';
      context.fillRect(0, 0, width, height);

      const mist = context.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
      mist.addColorStop(0, 'rgba(126, 61, 22, 0.08)');
      mist.addColorStop(0.55, 'rgba(40, 21, 12, 0.05)');
      mist.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = mist;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = 'lighter';
      for (const particle of particles) {
        const driftX = Math.sin(time * 0.012 + particle.seed) * 0.05;
        const driftY = Math.cos(time * 0.01 + particle.seed * 0.7) * 0.05;
        particle.vx += (particle.tx - particle.x) * 0.014 + driftX;
        particle.vy += (particle.ty - particle.y) * 0.014 + driftY;
        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const pulse = 0.65 + Math.sin(time * 0.035 + particle.seed) * 0.35;
        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 92%, ${54 + pulse * 20}%, ${particle.alpha * 0.58})`;
        context.shadowColor = `hsla(${particle.hue}, 92%, 65%, ${particle.alpha * 0.42})`;
        context.shadowBlur = 5;
        context.arc(particle.x, particle.y, particle.size * (0.78 + pulse * 0.62), 0, Math.PI * 2);
        context.fill();
      }

      drawConstellations();
      raf = requestAnimationFrame(drawFrame);
    };

    setup();
    context.fillStyle = 'rgba(5, 3, 2, 1)';
    context.fillRect(0, 0, width, height);
    raf = requestAnimationFrame(drawFrame);

    const observer = new ResizeObserver(() => setup());
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
