import React from "react";

const QuestionInput = ({ index, watch, setValue }) => {
  return (
    <div className="bg-gray-50 border border-gray-300  p-1 flex">
      {" "}
      <span className="font-bold text-gray-600">{index + 1}.</span>
      <div
        contentEditable
        suppressContentEditableWarning
        className="w-full min-h-[40px] focus:outline-none"
        ref={(el) => {
          if (el && !el.innerText) {
            el.innerText = watch(`questions.${index}.question`) || "";
          }
        }}
        onInput={(e) =>
          setValue(`questions.${index}.question`, e.currentTarget.textContent)
        }
      />
    </div>
  );
};

export default QuestionInput;
