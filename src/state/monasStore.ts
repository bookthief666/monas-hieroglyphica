import { create } from 'zustand';

export type GlyphPhase = 'point' | 'line' | 'circle' | 'sun' | 'moon' | 'cross-preview';

interface MonasState {
  activeSentenceId: string;
  phase: GlyphPhase;
  setActiveSentence: (id: string) => void;
  setPhase: (phase: GlyphPhase) => void;
}

export const useMonasStore = create<MonasState>((set) => ({
  activeSentenceId: 't1-s1',
  phase: 'circle',
  setActiveSentence: (id) => set({ activeSentenceId: id }),
  setPhase: (phase) => set({ phase }),
}));
