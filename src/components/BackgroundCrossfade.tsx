import { useEffect, useState } from 'react';

export default function BackgroundCrossfade({ image }: { image: string }) {
  const [current, setCurrent] = useState(image);
  const [next, setNext] = useState(image);
  const [crossfading, setCrossfading] = useState(false);

  useEffect(() => {
    if (!image || image === current) return;
    setNext(image);
    const frame = requestAnimationFrame(() => setCrossfading(true));
    const done = window.setTimeout(() => {
      setCurrent(image);
      setCrossfading(false);
    }, 950);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [current, image]);

  return (
    <>
      <div
        className={`bg-layer ${crossfading ? 'hidden-bg' : 'visible-bg'}`}
        style={{ backgroundImage: `url('${current}')` }}
      />
      <div
        className={`bg-layer ${crossfading ? 'visible-bg' : 'hidden-bg'}`}
        style={{ backgroundImage: `url('${next}')` }}
      />
    </>
  );
}
