import { processSteps } from "@/data/site";

/** Numbered "How it works" steps with a hi-vis connector. */
export function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {processSteps.map((step, i) => (
        <li
          key={step.title}
          className="relative rounded-md border border-graphite-600 bg-graphite-700/50 p-5"
        >
          <span className="font-heading text-4xl font-extrabold leading-none text-hivis">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-heading text-base font-bold uppercase leading-tight text-smoke">
            {step.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-steel">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSteps;
