"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "./app-context";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const { addConsultation } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("02:00 PM");
  const [service, setService] = useState("Web Experiences");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !date || !time) {
      setError("Please fill in all fields.");
      return;
    }

    addConsultation({
      name,
      email,
      date,
      time,
      service,
    });
    setSubmitted(true);
  };

  const resetState = () => {
    setName("");
    setEmail("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 sm:p-8 dark:border-slate-200/80 dark:bg-white/95 text-slate-100 dark:text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl font-semibold hover:bg-white/15 dark:border-slate-300 dark:bg-slate-200/50 dark:hover:bg-slate-200 transition"
          aria-label="Close Scheduler"
        >
          ✕
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-3xl mb-6 animate-pulse">
              ✓
            </div>
            <h3 className="text-2xl font-semibold text-white dark:text-slate-900">
              Meeting Booked!
            </h3>
            <p className="mt-4 text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
              Hi <span className="font-semibold text-slate-200 dark:text-slate-800">{name}</span>, your session regarding **{service}** is booked for **{date}** at **{time}**.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              This appointment is logged in real-time under the **Consultations** tab inside the Admin Dashboard.
            </p>
            <button
              onClick={resetState}
              className="mt-8 rounded-full bg-cyan-400 px-6 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300 dark:text-cyan-600 font-semibold">
              Discovery session
            </span>
            <h3 className="text-2xl font-semibold text-white dark:text-slate-950 mt-1 mb-6">
              Schedule Consultation
            </h3>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="e.g. Sarah Jenkins"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="e.g. sarah@vertex.io"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Focus Topic</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                >
                  <option value="Web Experiences">Web Experiences</option>
                  <option value="UI / UX Systems">UI / UX Systems</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Growth Strategy">Growth Strategy</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white"
              >
                Confirm Discovery Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
