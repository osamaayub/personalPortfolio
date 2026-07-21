import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function SectionHeading({
  children,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <h2 className="text-3xl font-medium capitalize">{children}</h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-[40rem] text-base leading-relaxed text-gray-600 dark:text-white/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
