import React from "react";

const FillTheBlankInput = ({ register, index }) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Correct Answer</span>
        <input
          type="text"
          placeholder="Type the correct answer..."
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register(`questions.${index}.correct`)}
        />
      </div>
    </>
  );
};

export default FillTheBlankInput;
