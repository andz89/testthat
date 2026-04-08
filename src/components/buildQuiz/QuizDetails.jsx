import React from "react";

const quizDetails = ({ register }) => {
  return (
    <div>
      {" "}
      <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-white">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Quiz Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Quiz Title</label>
            <input
              type="text"
              placeholder="Enter quiz title"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("details.title")}
            />
          </div>

          {/* Grade Level */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Grade Level</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("details.grade")}
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`Grade ${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Subject</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("details.subject")}
            >
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="Filipino">Filipino</option>
              <option value="MAPEH">MAPEH</option>
              <option value="English">English</option>
              <option value="EPP">EPP</option>
              <option value="Araling Panlipunan">Araling Panlipunan</option>
              <option value="ESP">ESP</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Quarter */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Quarter</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("details.quarter")}
            >
              <option value="">Select Quarter</option>
              <option value="1st">1st Quarter</option>
              <option value="2nd">2nd Quarter</option>
              <option value="3rd">3rd Quarter</option>
              <option value="4th">4th Quarter</option>
            </select>
          </div>
        </div>

        {/* Competencies / Objectives */}
        <div className="flex flex-col mt-4">
          <label className="text-sm text-gray-600 mb-1">
            Competencies / Objectives
          </label>
          <textarea
            rows={3}
            placeholder="Enter competencies or objectives..."
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("details.objectives")}
          />
        </div>
      </div>
    </div>
  );
};

export default quizDetails;
