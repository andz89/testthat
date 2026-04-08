import React from "react";

const QuizTypeOptions = ({ index, insert, setOpenMenu }) => {
  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20">
      <button
        type="button"
        onClick={() => {
          insert(index + 1, {
            id: Date.now(),
            type: "multiple",
            layout: "col",
            question: "",
            options: [
              { id: 1, label: "option 1", value: "A" },
              { id: 2, label: "option 2", value: "B" },
              { id: 3, label: "option 3", value: "C" },
              { id: 4, label: "option 4", value: "D" },
            ],
            correct: "",
          });
          setOpenMenu(null);
        }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        Multiple Choice
      </button>

      <button
        type="button"
        onClick={() => {
          insert(index + 1, {
            id: Date.now(),
            type: "boolean",
            layout: "col",
            question: "",
            options: [
              { id: 1, label: "True", value: "A" },
              { id: 2, label: "False", value: "B" },
            ],
            correct: "",
          });
          setOpenMenu(null);
        }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        True / False
      </button>
      <button
        type="button"
        onClick={() => {
          insert(index + 1, {
            id: Date.now(),
            type: "short",
            layout: "col",
            question: "",
            options: [],
            correct: "",
          });
          setOpenMenu(null);
        }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        Fill in the Blank
      </button>
    </div>
  );
};

export default QuizTypeOptions;
