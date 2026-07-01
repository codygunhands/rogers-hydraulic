import { answerBoxes } from "@/data/site";
import { Icon } from "./Icon";

/** GEO/AI-search answer boxes: What we do / Where we work / Who we serve / etc. */
export function AnswerBoxes() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {answerBoxes.map((box) => (
        <div
          key={box.title}
          className="rounded-md border border-graphite-600 bg-graphite-700/50 p-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-hivis" aria-hidden>
              <Icon name={box.icon} size={20} />
            </span>
            <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-smoke">
              {box.title}
            </h3>
          </div>
          <p className="mt-3 font-body text-sm leading-relaxed text-steel">{box.text}</p>
        </div>
      ))}
    </div>
  );
}

export default AnswerBoxes;
