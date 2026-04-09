import React from "react";

const LayoutOptions = ({ register, index }) => {
  return (
    <>
      <div className="flex gap-2 text-sm">
        <span>Options layout:</span>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="col"
            {...register(`questions.${index}.layout`)}
          />
          Column
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="row"
            {...register(`questions.${index}.layout`)}
          />
          Row
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="grid"
            {...register(`questions.${index}.layout`)}
          />
          Grid
        </label>
      </div>
    </>
  );
};

export default LayoutOptions;
