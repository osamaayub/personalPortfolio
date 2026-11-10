import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
};

export default function SectionHeading({ children, subtitle, eyebrow }: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-10">
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>
      ) : (
        <span
          aria-hidden="true"
          className="mb-4 block h-1 w-10 rounded-full bg-brand"
        />
      )}
      <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-[2.6rem]">{children}</h2>
      {subtitle ? (
        <p className="mt-3 max-w-[40rem] text-base leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
