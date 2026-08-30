import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),_transparent_50%)]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <span className="text-sm uppercase tracking-[0.35em] text-cyan-300 font-bold block mb-4">
        Quadrant Error
      </span>
      <h1 className="text-7xl font-extrabold text-white dark:text-slate-950 tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent dark:from-cyan-600 dark:via-indigo-600 dark:to-fuchsia-600">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-slate-100 dark:text-slate-900 mb-4">
        Coordinates Lost in Space
      </h2>
      <p className="max-w-md text-sm sm:text-base leading-7 text-slate-400 dark:text-slate-600 mb-10">
        The launch location you are looking for does not exist, has been shifted, or is undergoing a core system update.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="rounded-full bg-white px-8 py-3.5 text-center font-semibold text-slate-950 transition hover:scale-[1.02] shadow-lg dark:bg-slate-950 dark:text-white cursor-pointer"
        >
          Return Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/15 bg-white/10 px-8 py-3.5 text-center font-semibold text-white transition hover:bg-white/20 dark:border-slate-300/60 dark:bg-slate-100/70 dark:text-slate-900 cursor-pointer"
        >
          Contact Support
        </Link>
      </div>
    </main>
  );
}
