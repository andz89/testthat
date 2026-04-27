import { useQuizStore } from "../../store/QuizStore";

import QuizTypeOptions from "./QuizTypeOptions";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";

const QuestionFooter = ({
  questionLength,
  questionId,
  openMenu,
  setOpenMenu,
  isActive,
  activeRef,
}) => {
  const { removeQuestion, duplicateQuestion } = useQuizStore();

  return (
    <div ref={isActive ? activeRef : null} className="flex items-center gap-2">
      {/* Add */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenMenu(openMenu === questionId ? null : questionId)
          }
          className="hover:cursor-pointer flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition"
        >
          <BiPlus size={16} className="text-gray-700" />
        </button>

        {openMenu === questionId && (
          <QuizTypeOptions questionId={questionId} setOpenMenu={setOpenMenu} />
        )}
      </div>

      {/* Duplicate */}
      <button
        onClick={() => duplicateQuestion(questionId)}
        className="hover:cursor-pointer flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition"
      >
        <BiDuplicate size={16} className="text-gray-700 hover:text-blue-600" />
      </button>

      {/* Delete */}

      <button
        disabled={questionLength <= 1}
        onClick={() => removeQuestion(questionId)}
        className={`${
          questionLength <= 1
            ? "cursor-not-allowed   flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 bg-gray-100   transition"
            : "hover:cursor-pointer flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 bg-white hover:bg-red-50 hover:border-red-400 transition"
        }`}
      >
        <BiSolidTrash
          size={16}
          className={`${
            questionLength <= 1
              ? "text-gray-400"
              : "text-gray-700 hover:text-red-400"
          }`}
        />
      </button>
    </div>
  );
};

export default QuestionFooter;
