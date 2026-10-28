// Pure CSS (see .blob-a / .blob-b in globals.css): no client JS needed for the aurora.
export default function AnimatedBackdrop() {
  return (
    <div aria-hidden="true" className="portfolio-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[65rem] overflow-hidden">
      <div className="blob-a absolute -top-24 right-[-10%] h-[32rem] w-[40rem] transform-gpu rounded-full bg-violet-300/40 blur-[90px] will-change-transform dark:bg-violet-700/20" />
      <div className="blob-b absolute left-[-15%] top-32 h-[30rem] w-[40rem] transform-gpu rounded-full bg-indigo-300/40 blur-[90px] will-change-transform dark:bg-indigo-600/20" />
    </div>
  );
}
