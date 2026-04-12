"use client";

import { useState, useEffect, useRef } from "react";
import QuizDetails from "./QuizDetails";
import QuestionInput from "./QuestionInput";
import LayoutOptions from "./LayoutOptions";
import MultipleChoicesInput from "./MultipleChoicesInput";
import FillTheBlankInput from "./FillTheBlankInput";
import QuestionFooter from "./QuestionFooter";
import { useQuizStore } from "../../store/QuizStore";

export default function QuestionBuilder({ quiz }) {
  const [openMenu, setOpenMenu] = useState(null);

  const { questions, options } = useQuizStore();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[720px] mx-auto py-10 mb-20">
        {/* Submit button */}
        <div className="fixed bottom-4 right-4">
          <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded hover:bg-blue-700">
            Save Quiz
          </button>
        </div>

        <div className="flex flex-col">
          {/* Quiz Details */}
          <QuizDetails />

          {/* Questions */}
          {questions.map((q, index) => {
            return (
              <div key={q.id} className="p-6 border border-gray-200">
                <div className="flex flex-col gap-4">
                  {/* Question */}
                  <QuestionInput id={q.id} order={index} />

                  {/* Layout */}
                  {/* {q.type !== "short" && (
                    <LayoutOptions id={q.id} layoutData={q.layout} />
                  )} */}

                  {/* Fill in the blank */}
                  {/* {q.type === "short" && <FillTheBlankInput index={index} />} */}

                  {/* Multiple Choice */}
                  {q.type !== "short" && (
                    <div
                      className={`gap-2 ${
                        q.layout === "row"
                          ? "flex flex-row flex-wrap justify-around"
                          : q.layout === "grid"
                            ? "grid grid-cols-2"
                            : "flex flex-col"
                      }`}
                    >
                      {questionOptions.map((opt) => (
                        <MultipleChoicesInput key={opt.id} opt={opt} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {/* <div className="flex items-center justify-end gap-3 mt-5 w-full">
                  <QuestionFooter
                    index={index}
                    setOpenMenu={setOpenMenu}
                    openMenu={openMenu}
                  />
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
