"use client";
import React from "react";

const quizzes = [
  {
    id: 1,
    title: "Bible Knowledge Quiz",
    description: "Test your knowledge of the Bible.",
    questions: 10,
  },
  {
    id: 2,
    title: "General Knowledge",
    description: "Random trivia questions.",
    questions: 15,
  },
  {
    id: 3,
    title: "Science Quiz",
    description: "Basic science questions.",
    questions: 12,
  },
];

export default function Quizes() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}

      {/* Quiz Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>

            <p className="text-gray-600 mb-4">{quiz.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {quiz.questions} Questions
              </span>

              <button className="text-blue-600 hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
