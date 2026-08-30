"use client";

import { useEffect } from "react";

export interface CapabilityData {
  label: string;
  icon: string;
  title: string;
  description: string;
  included: string[];
  exampleText: string;
  exampleTarget: string;
}

interface CapabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  capability: CapabilityData | null;
}

export function CapabilityModal({ isOpen, onClose, capability }: CapabilityModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !capability) return null;

  const handleExampleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const target = document.querySelector(capability.exampleTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 150); // Small timeout to let modal fade out first
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 sm:p-8 dark:border-slate-200/80 dark:bg-white/95 text-slate-100 dark:text-slate-900 max-h-[90vh] overflow-y-auto animate-modal-entrance">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-semibold hover:bg-white/15 dark:border-slate-300 dark:bg-slate-200/50 dark:hover:bg-slate-200 transition cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{capability.icon}</span>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 dark:text-cyan-600 font-bold block">
              Core Capability
            </span>
            <h3 className="text-2xl font-bold text-white dark:text-slate-950 leading-tight">
              {capability.title}
            </h3>
          </div>
        </div>

        {/* Body Description */}
        <p className="mt-5 text-sm sm:text-base leading-7 text-slate-300 dark:text-slate-600">
          {capability.description}
        </p>

        {/* Deliverables List */}
        <div className="mt-6 border-t border-white/10 pt-5 dark:border-slate-200/60">
          <h4 className="text-xs uppercase tracking-wider text-cyan-300 dark:text-cyan-600 font-bold">
            What's Included
          </h4>
          <ul className="mt-3 grid gap-2.5 text-sm text-slate-400 dark:text-slate-600">
            {capability.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-cyan-300 dark:text-cyan-600 mt-0.5 font-semibold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reference / Proof Example */}
        <div className="mt-6 border-t border-white/10 pt-5 dark:border-slate-200/60">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
            Real Proof
          </h4>
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-500">
            {capability.exampleText}
          </p>
          <a
            href={capability.exampleTarget}
            onClick={handleExampleClick}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-400 dark:text-cyan-600 dark:hover:text-cyan-700 transition"
          >
            See Example in Action →
          </a>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 border border-white/15 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 dark:bg-slate-900/10 dark:border-slate-900/15 dark:text-slate-900 dark:hover:bg-slate-900/20 cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>

      <style jsx global>{`
        @keyframes modalEntrance {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-entrance {
          animation: modalEntrance 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
