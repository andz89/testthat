"use client";
import { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";
export default function QuestionBuilder({ quiz }) {
  console.log(quiz.title);
  const [openMenu, setOpenMenu] = useState(null);
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      details: {
        title: quiz?.title || "",
        grade: quiz?.grade || "",
        subject: quiz?.subject || "",
        quarter: quiz?.quarter || "",
        objectives: quiz?.objectives || "",
      },
      questions: quiz?.questions || [
        {
          id: 1,
          question: "",
          layout: "col",
          options: [
            { id: 1, label: "option 1", value: "A" },
            { id: 2, label: "option 2", value: "B" },
            { id: 3, label: "option 3", value: "C" },
            { id: 4, label: "option 4", value: "D" },
          ],
          correct: "",
        },
      ],
    },
  });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const duplicateQuestion = (index) => {
    const question = watch(`questions.${index}`);

    insert(index + 1, {
      ...question,
      id: Date.now(), // new unique id
      options: question.options.map((opt) => ({
        ...opt,
        id: Math.random(),
      })),
    });
  };
  return (
    <div className="bg-white  min-h-screen  ">
      <div className="max-w-[720px] mx-auto   py-10 mb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fixed bottom-4 right-4">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg px-6 py-3 rounded hover:bg-blue-700"
            >
              Save Quiz
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-white">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Quiz Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter quiz title"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("details.title")}
                  />
                </div>

                {/* Grade Level */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Grade Level
                  </label>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("details.grade")}
                  >
                    <option value="">Select Grade</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={`Grade ${i + 1}`}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Subject</label>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("details.subject")}
                  >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="Filipino">Filipino</option>
                    <option value="MAPEH">MAPEH</option>
                    <option value="English">English</option>
                    <option value="EPP">EPP</option>
                    <option value="Araling Panlipunan">
                      Araling Panlipunan
                    </option>
                    <option value="ESP">ESP</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                {/* Quarter */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Quarter</label>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("details.quarter")}
                  >
                    <option value="">Select Quarter</option>
                    <option value="1st">1st Quarter</option>
                    <option value="2nd">2nd Quarter</option>
                    <option value="3rd">3rd Quarter</option>
                    <option value="4th">4th Quarter</option>
                  </select>
                </div>
              </div>

              {/* Competencies / Objectives */}
              <div className="flex flex-col mt-4">
                <label className="text-sm text-gray-600 mb-1">
                  Competencies / Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter competencies or objectives..."
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register("details.objectives")}
                />
              </div>
            </div>
            {fields.map((field, index) => {
              const layout = watch(`questions.${index}.layout`);
              const type = watch(`questions.${index}.type`);

              return (
                <div key={field.id} className=" p-6  border border-gray-200  ">
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-50 border border-gray-300  p-1 flex">
                      {" "}
                      <span className="font-bold text-gray-600">
                        {index + 1}.
                      </span>
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="w-full min-h-[40px] focus:outline-none"
                        ref={(el) => {
                          if (el && !el.innerText) {
                            el.innerText =
                              watch(`questions.${index}.question`) || "";
                          }
                        }}
                        onInput={(e) =>
                          setValue(
                            `questions.${index}.question`,
                            e.currentTarget.textContent
                          )
                        }
                      />
                    </div>
                    {type !== "short" && (
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
                    )}
                    {type === "short" && (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600">
                          Correct Answer
                        </span>
                        <input
                          type="text"
                          placeholder="Type the correct answer..."
                          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          {...register(`questions.${index}.correct`)}
                        />
                      </div>
                    )}
                    {type !== "short" && (
                      <div
                        className={`gap-2 ${
                          layout === "row"
                            ? "flex flex-row flex-wrap justify-around"
                            : layout === "grid"
                            ? "grid grid-cols-2"
                            : "flex flex-col"
                        }`}
                      >
                        {field.options.map((opt, optIndex) => (
                          <div
                            key={opt.id}
                            className="flex flex-row items-start   gap-1 "
                          >
                            <label className="flex items-start mt-[11px] gap-1 ">
                              <input
                                type="radio"
                                value={opt.id}
                                {...register(`questions.${index}.correct`)}
                              />
                            </label>
                            <span className="w-[20px] font-bold mt-[6px]">
                              {opt.value}.
                            </span>

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
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-5 w-full">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(openMenu === index ? null : index)
                        }
                        className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition"
                      >
                        <BiPlus size={18} className="text-slate-700" />
                      </button>

                      {openMenu === index && (
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
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => duplicateQuestion(index)}
                      className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-blue-50 hover:border-blue-400 transition"
                    >
                      <BiDuplicate
                        size={18}
                        className="text-slate-700 hover:text-blue-600"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-md border border-slate-300 hover:bg-red-50 hover:border-red-400 transition"
                    >
                      <BiSolidTrash
                        size={18}
                        className="text-slate-700 hover:text-red-600"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
