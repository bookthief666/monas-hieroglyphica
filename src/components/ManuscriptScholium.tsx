import { monasSentences } from '../data/monasSentences';
import { getTheoremMeta } from '../data/theoremMeta';
import { useMonasStore } from '../state/monasStore';

export default function ManuscriptScholium() {
  const activeSentenceId = useMonasStore((state) => state.activeSentenceId);
  const active = monasSentences.find((sentence) => sentence.id === activeSentenceId) ?? monasSentences[0];
  const meta = getTheoremMeta(active.theorem);
  const first = active.english.charAt(0);
  const rest = active.english.slice(1);

  return (
    <section className="manuscript-scholia ritual-panel rounded-[1.7rem] p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.4fr_0.8fr]">
        <aside className="hidden border-amber-100/10 pr-5 text-right lg:block lg:border-r">
          <p className="font-script text-2xl italic leading-relaxed text-amber-200/76 drop-shadow-[0_0_12px_rgba(255,199,91,0.18)]">
            {meta.marginalia}
          </p>
        </aside>

        <article>
          <p className="latin-caps text-center text-[0.68rem] font-black text-red-300/62">{meta.title}</p>
          <h2 className="mt-1 text-center font-blackletter text-4xl text-red-300 drop-shadow-[0_0_18px_rgba(255,68,68,0.32)]">
            {meta.numeral}
          </h2>
          <p className="mt-5 text-justify text-lg leading-8 text-chromatic sm:text-xl">
            <span className="drop-cap">{first}</span>
            {rest}
          </p>
          <p className="mt-5 border-t border-amber-100/10 pt-4 text-center font-script text-xl italic text-amber-200/72 lg:hidden">
            {meta.marginalia}
          </p>
        </article>

        <aside className="border-t border-amber-100/10 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-12">
          <h3 className="latin-caps text-[0.68rem] font-black text-red-300/68">Scholium</h3>
          <p className="mt-3 text-base italic leading-7 text-amber-50/72">“{active.paraphrase || meta.scholium}”</p>
          <p className="mt-4 text-sm leading-6 text-amber-100/48">{meta.scholium}</p>
        </aside>
      </div>
    </section>
  );
}
