import React from "react";
import QuizTypeOptions from "./QuizTypeOptions";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";
const QuestionFooter = ({
  index,
  setOpenMenu,
  insert,
  duplicateQuestion,
  remove,
  openMenu,
}) => {
  return (
    <>
      {" "}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenMenu(openMenu === index ? null : index)}
          className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition"
        >
          <BiPlus size={18} className="text-slate-700" />
        </button>

        {openMenu === index && (
          <QuizTypeOptions
            index={index}
            insert={insert}
            setOpenMenu={setOpenMenu}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => duplicateQuestion(index)}
        className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-blue-50 hover:border-blue-400 transition"
      >
        <BiDuplicate size={18} className="text-slate-700 hover:text-blue-600" />
      </button>
      <button
        type="button"
        onClick={() => remove(index)}
        className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-red-50 hover:border-red-400 transition"
      >
        <BiSolidTrash size={18} className="text-slate-700 hover:text-red-600" />
      </button>
    </>
  );
};

export default QuestionFooter;
