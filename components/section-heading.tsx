import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
};

export default function SectionHeading({ children, subtitle, eyebrow }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          {eyebrow}
        </p>
      ) : (
        <span
          aria-hidden="true"
          className="mx-auto mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-400"
        />
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{children}</h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-[40rem] text-base leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
