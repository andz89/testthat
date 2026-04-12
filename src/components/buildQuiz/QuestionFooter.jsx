import { useQuizStore } from "../../store/QuizStore";
import QuizTypeOptions from "./QuizTypeOptions";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";

const QuestionFooter = ({ questionId, openMenu, setOpenMenu }) => {
  const { removeQuestion, duplicateQuestion } = useQuizStore();

  return (
    <div className="flex items-center gap-2">
      {/* Add */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenMenu(openMenu === questionId ? null : questionId)
          }
          className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition"
        >
          <BiPlus size={18} className="text-gray-700" />
        </button>

        {openMenu === questionId && (
          <QuizTypeOptions questionId={questionId} setOpenMenu={setOpenMenu} />
        )}
      </div>

      {/* Duplicate */}
      <button
        onClick={() => duplicateQuestion(questionId)}
        className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition"
      >
        <BiDuplicate size={18} className="text-gray-700 hover:text-blue-600" />
      </button>

      {/* Delete */}
      <button
        onClick={() => removeQuestion(questionId)}
        className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white hover:bg-red-50 hover:border-red-400 transition"
      >
        <BiSolidTrash size={18} className="text-gray-700 hover:text-red-600" />
      </button>
    </div>
  );
};

export default QuestionFooter;
