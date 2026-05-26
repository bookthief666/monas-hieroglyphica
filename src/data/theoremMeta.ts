export type TheoremShape =
  | 'line-circle'
  | 'point-monad'
  | 'sun-earth'
  | 'sun-moon'
  | 'cross-elements';

export interface TheoremMeta {
  id: number;
  numeral: string;
  title: string;
  shape: TheoremShape;
  marginalia: string;
  scholium: string;
  bgImage: string;
}

export const theoremMeta: TheoremMeta[] = [
  {
    id: 1,
    numeral: 'I',
    title: 'Theorema I',
    shape: 'line-circle',
    marginalia: 'Mysterium magnum in puncto centrum...',
    scholium: 'All of reality is constructed from two primordial acts of geometry: extension and boundary.',
    bgImage:
      'https://raw.githubusercontent.com/bookthief666/monas-hieroglyphica/88dad9bc4f64ab194c99b755d24e63013c2110c9/theorema-I.jpg',
  },
  {
    id: 2,
    numeral: 'II',
    title: 'Theorema II',
    shape: 'point-monad',
    marginalia: 'Ex uno omnia, et in unum omnia revertuntur.',
    scholium: 'A circle requires a line, a line requires a point, and the point is the hidden origin of the Work.',
    bgImage:
      'https://raw.githubusercontent.com/bookthief666/monas-hieroglyphica/88dad9bc4f64ab194c99b755d24e63013c2110c9/theorema-II.jpg',
  },
  {
    id: 3,
    numeral: 'III',
    title: 'Theorema III',
    shape: 'sun-earth',
    marginalia: 'Sol est fons lucis et caloris, cor caeli.',
    scholium: 'The point becomes Earth; the circle becomes solar dignity; cosmology enters the glyph.',
    bgImage:
      'https://raw.githubusercontent.com/bookthief666/monas-hieroglyphica/88dad9bc4f64ab194c99b755d24e63013c2110c9/theorema-III.jpg',
  },
  {
    id: 4,
    numeral: 'IV',
    title: 'Theorema IV',
    shape: 'sun-moon',
    marginalia: 'Luna recipit lumen a sole, sicut anima a spiritu.',
    scholium: 'The lunar crescent crowns the solar circle, receives its light, vanishes, and returns horned.',
    bgImage:
      'https://raw.githubusercontent.com/bookthief666/monas-hieroglyphica/88dad9bc4f64ab194c99b755d24e63013c2110c9/theorema-IV.jpg',
  },
  {
    id: 6,
    numeral: 'VI',
    title: 'Theorema VI',
    shape: 'cross-elements',
    marginalia: 'Crux elementorum sustentat luminaria.',
    scholium: 'The cross receives the luminaries and lets ternary and quaternary begin to interlock.',
    bgImage:
      'https://raw.githubusercontent.com/bookthief666/monas-hieroglyphica/88dad9bc4f64ab194c99b755d24e63013c2110c9/theorema-V.jpg',
  },
];

export function getTheoremMeta(theorem: number): TheoremMeta {
  return theoremMeta.find((item) => item.id === theorem) ?? theoremMeta[0];
}
