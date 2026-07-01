import * as React from "react";

/** Consistent section heading: eyebrow + title + optional intro, with a hi-vis rule. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Tag = as;
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag className="mt-2 text-3xl font-extrabold uppercase leading-[1.05] tracking-stencil text-smoke sm:text-4xl">
        {title}
      </Tag>
      <div className={`mt-3 h-[3px] w-14 rounded-sm bg-hivis ${align === "center" ? "mx-auto" : ""}`} />
      {intro ? (
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-steel">{intro}</p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
