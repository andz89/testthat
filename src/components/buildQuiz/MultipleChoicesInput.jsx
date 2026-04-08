import React from "react";

const MultipleChoicesInput = ({ opt, index, register, setValue }) => {
  return (
    <div key={opt.id} className="flex flex-row items-start   gap-1 ">
      <label className="flex items-start mt-[11px] gap-1 ">
        <input
          type="radio"
          value={opt.id}
          {...register(`questions.${index}.correct`)}
        />
      </label>
      <span className="w-[20px] font-bold mt-[6px]">{opt.value}.</span>

      <div
        contentEditable
        suppressContentEditableWarning
        className="focus:outline-none bg-gray-50 border border-gray-300 rounded p-1 w-full min-h-[30px]"
        onInput={(e) =>
          setValue(
            `questions.${index}.options.${optIndex}.label`,
            e.currentTarget.textContent
          )
        }
      >
        {" "}
        {opt.label}
      </div>
    </div>
  );
};

export default MultipleChoicesInput;
