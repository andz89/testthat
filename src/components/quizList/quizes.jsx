"use client";

import Link from "next/link";
export default function Quizes({ quizzes }) {
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

            <p className="text-gray-600 mb-4">{quiz.grade}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {quiz.questions} Questions
              </span>

              <Link
                href={`/edit/${quiz.id}`}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
