"use client";
import { useEffect, useState } from "react";

export default function PublishSettingsModal({
  isOpen,
  onClose,
  onPublish,
  initialData = {},
}) {
  const [settings, setSettings] = useState({
    visibility: "private", // private | public
    publishNow: true,
    startDate: "",
    endDate: "",
    allowRetake: false,
    showResults: true,
    ...initialData,
  });

  useEffect(() => {
    if (isOpen) {
      setSettings({
        visibility: "private",
        publishNow: true,
        startDate: "",
        endDate: "",
        allowRetake: false,
        showResults: true,
        ...initialData,
      });
    }
  }, [isOpen]); // ✅ remove initialData

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onPublish(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 " onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-white shadow-xl p-6">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Publish Settings
        </h2>

        {/* Visibility */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visibility
          </label>
          <select
            value={settings.visibility}
            onChange={(e) => handleChange("visibility", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        {/* Publish Timing */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publish Timing
          </label>

          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={settings.publishNow}
                onChange={() => handleChange("publishNow", true)}
              />
              Publish now
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={!settings.publishNow}
                onChange={() => handleChange("publishNow", false)}
              />
              Schedule
            </label>
          </div>

          {!settings.publishNow && (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="datetime-local"
                value={settings.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="border rounded-lg px-2 py-2 text-sm"
              />
              <input
                type="datetime-local"
                value={settings.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="border rounded-lg px-2 py-2 text-sm"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="mb-6 space-y-2">
          <label className="flex items-center justify-between text-sm">
            Allow Retake
            <input
              type="checkbox"
              checked={settings.allowRetake}
              onChange={(e) => handleChange("allowRetake", e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between text-sm">
            Show Results After Submission
            <input
              type="checkbox"
              checked={settings.showResults}
              onChange={(e) => handleChange("showResults", e.target.checked)}
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
