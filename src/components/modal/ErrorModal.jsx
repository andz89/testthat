"use client";
import { useEffect } from "react";

export default function ErrorModal({
  isOpen,
  onClose,
  title = "Something went wrong",
  message = "An unexpected error occurred.",
  type = "general", // "network" | "server" | "general"
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icon = type === "network" ? "🌐" : type === "server" ? "🛠️" : "⚠️";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 " onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl p-6 animate-[fadeIn_.2s_ease]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">{icon}</span>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              window.location.reload(); // optional retry
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>

      {/* Animation (Tailwind doesn't include this by default) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
