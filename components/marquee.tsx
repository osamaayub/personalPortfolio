// Decorative only: the same skills are listed in full in the cards below.
export default function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items];

  return (
    <div className="marquee overflow-hidden py-1" aria-hidden="true">
      <ul
        className="marquee-track flex w-max"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, i) => (
          <li
            key={i}
            className="mr-3 rounded-full border border-indigo-100 bg-white/80 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
