import { FaPaperPlane } from "react-icons/fa";

interface SubmitBtnProps {
  disabled?: boolean;
}

export default function SubmitBtn({ disabled }: SubmitBtnProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0 disabled:translate-y-0 disabled:opacity-70 sm:w-48"
    >
      {disabled ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
          Sending…
        </>
      ) : (
        <>
          Send message
          <FaPaperPlane className="text-xs opacity-80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
