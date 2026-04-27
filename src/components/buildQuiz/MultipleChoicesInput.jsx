import React, { useRef, useEffect, use } from "react";
import { useQuizStore } from "../../store/QuizStore";
import { BsX } from "react-icons/bs";
import { BiGridVertical } from "react-icons/bi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const getOptionLabel = (index) => {
  return String.fromCharCode(65 + index); // 65 = "A"
};
const MultipleChoicesInput = ({
  opt,
  index,
  questionOptionsLength,
  showLabel,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: opt.option_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      correct: opt.option_id,
    });
  };

  useEffect(() => {
    if (ref.current && ref.current.innerText !== opt.label) {
      ref.current.innerText = opt.label || "";
    }
  }, [opt.label]);

  if (!question) return null;

  return (
    <div className="flex flex-row    ">
      {/* FIXED label (does NOT move) */}
      {showLabel && (
        <span className="w-[20px] font-bold mt-[6px]">
          {getOptionLabel(index)}.
        </span>
      )}

      {/* DRAGGABLE PART ONLY */}
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-row items-start gap-1 flex-1  w-full "
      >
        {/* Drag handle */}
        <span {...listeners} {...attributes} className="cursor-grab mt-[6px]  ">
          <BiGridVertical size={20} className="text-gray-600 " />
        </span>

        {/* Radio */}
        <label className="flex items-start mt-[11px] ">
          <input
            type="radio"
            checked={question.correct === opt.option_id}
            onChange={handleCorrectChange}
            className="ml-[-1] px-0"
          />
        </label>

        {/* Editable */}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          className="focus:outline-none bg-gray-50 border border-gray-300 rounded p-1 w-full min-h-[30px]"
          onInput={(e) => handleOptionChange(e.currentTarget.textContent)}
        />

        {/* Delete */}
        <button
          disabled={questionOptionsLength <= 1}
          onClick={() => removeOption(opt.option_id)}
          className="cursor-pointer"
        >
          <BsX size={33} />
        </button>
      </div>
    </div>
  );
};
export default MultipleChoicesInput;
