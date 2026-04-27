import React, { useRef, useEffect } from "react";
import { useQuizStore } from "../../store/QuizStore";
import { BsX } from "react-icons/bs";
const getOptionLabel = (index) => {
  return String.fromCharCode(65 + index); // 65 = "A"
};
const MultipleChoicesInput = ({ opt, index, questionOptionsLength }) => {
  const updateOption = useQuizStore((state) => state.updateOption);
  const updateQuestion = useQuizStore((state) => state.updateQuestion);
  const removeOption = useQuizStore((state) => state.removeOption);

  const questions = useQuizStore((state) => state.questions);

  const ref = useRef(null);

  const question = questions.find((q) => q.question_id === opt.question_id);

  const handleOptionChange = (value) => {
    updateOption(opt.option_id, {
      label: value,
    });
  };

  const handleCorrectChange = () => {
    updateQuestion(opt.question_id, {
      correct: opt.value,
    });
  };

  useEffect(() => {
    if (ref.current && ref.current.innerText !== opt.label) {
      ref.current.innerText = opt.label || "";
    }
  }, [opt.label]);

  if (!question) return null;

  return (
    <div className="flex flex-row items-start gap-1">
      {/* Radio */}
      <label className="flex items-start mt-[11px] gap-1">
        <input
          type="radio"
          checked={question.correct === opt.value}
          onChange={handleCorrectChange}
        />
      </label>

      {/* Label */}
      <span className="w-[20px] font-bold mt-[6px]">
        {getOptionLabel(index)}.
      </span>

      {/* Editable */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="focus:outline-none bg-gray-50 border border-gray-300 rounded p-1 w-full min-h-[30px]"
        onInput={(e) => handleOptionChange(e.currentTarget.textContent)}
      />
      <button
        disabled={questionOptionsLength <= 1}
        onClick={() => removeOption(opt.option_id)}
        className="font-light"
      >
        <BsX
          size={33}
          className={`${
            questionOptionsLength <= 1
              ? "opacity-300 cursor-not-allowed text-gray-300"
              : "text-gray-500 hover:text-gray-700 font-light hover:bg-gray-200 hover:cursor-pointer transition rounded-sm"
          }`}
        />
      </button>
    </div>
  );
};
export default MultipleChoicesInput;
