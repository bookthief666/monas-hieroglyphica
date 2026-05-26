import { useEffect, useMemo, useRef, useState } from 'react';
import { useMonasStore, type GlyphPhase } from '../state/monasStore';

const baseFrequency: Record<GlyphPhase, number> = {
  point: 111,
  line: 144,
  circle: 180,
  sun: 216,
  moon: 192,
  'cross-preview': 252,
};

export default function AmbientDrone() {
  const phase = useMonasStore((state) => state.phase);
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const frequency = useMemo(() => baseFrequency[phase], [phase]);

  useEffect(() => {
    if (!enabled || !oscRef.current || !gainRef.current || !filterRef.current || !audioRef.current) return;
    const now = audioRef.current.currentTime;
    oscRef.current.frequency.cancelScheduledValues(now);
    oscRef.current.frequency.setTargetAtTime(frequency, now, 0.38);
    filterRef.current.frequency.cancelScheduledValues(now);
    filterRef.current.frequency.setTargetAtTime(frequency * 3.8, now, 0.55);
    gainRef.current.gain.cancelScheduledValues(now);
    gainRef.current.gain.setTargetAtTime(0.045, now, 0.4);
  }, [enabled, frequency]);

  function toggle() {
    if (!enabled) {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextCtor();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      filter.type = 'lowpass';
      filter.frequency.value = frequency * 3.8;
      gain.gain.value = 0;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.setTargetAtTime(0.045, ctx.currentTime, 0.5);
      audioRef.current = ctx;
      oscRef.current = osc;
      gainRef.current = gain;
      filterRef.current = filter;
      setEnabled(true);
      return;
    }

    if (audioRef.current && gainRef.current && oscRef.current) {
      const ctx = audioRef.current;
      gainRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.18);
      window.setTimeout(() => {
        oscRef.current?.stop();
        ctx.close();
        audioRef.current = null;
        oscRef.current = null;
        gainRef.current = null;
        filterRef.current = null;
      }, 350);
    }
    setEnabled(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-full border px-3 py-2 text-[0.65rem] font-black tracking-[0.12em] transition ${
        enabled
          ? 'border-amber-300/40 bg-amber-300/15 text-amber-100 shadow-[0_0_20px_rgba(245,172,74,0.2)]'
          : 'border-amber-100/12 bg-black/30 text-amber-100/56 hover:border-amber-200/28 hover:text-amber-50'
      }`}
    >
      {enabled ? 'DRONE ON' : 'DRONE OFF'}
    </button>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
