# Monas Hieroglyphica

Interactive Monas: a sentence-level, Latin-facing, animated reading engine for John Dee’s *Monas Hieroglyphica*.

## Prototype 001: The Birth of the Monad

This first vertical slice covers Theorems 1–4 and a preview of Theorem 6. It proves the core interaction:

> Select a sentence → reveal Dee’s Latin → read a corrected English rendering → animate the corresponding phase of the glyph.

Current phases:

1. Point
2. Line
3. Circle
4. Sun
5. Moon
6. Cross preview

## Run on Android / Termux

```bash
pkg update -y && pkg upgrade -y
pkg install -y git nodejs-lts
cd ~
git clone https://github.com/bookthief666/monas-hieroglyphica.git
cd monas-hieroglyphica
npm install
npm run dev -- --host 0.0.0.0
```

Then open:

```text
http://127.0.0.1:5173/
```

For future updates:

```bash
cd ~/monas-hieroglyphica
git pull
npm install
npm run dev -- --host 0.0.0.0
```

Usually `npm install` is only needed when dependencies change.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- SVG-first symbolic animation

## Source principle

The app keeps Dee’s Latin visible beside the working English. Commentary is layered so the reader can distinguish literal explanation, geometry, astronomy, Cabala, alchemy, and speculative interpretation.
