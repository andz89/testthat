"use client";
import { useState } from "react";
import QuizDetails from "./QuizDetails";
import { useForm, useFieldArray } from "react-hook-form";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";
import QuestionInput from "./QuestionInput";
import LayoutOptions from "./LayoutOptions";
import MultipleChoicesInput from "./MultipleChoicesInput";
import FillTheBlankInput from "./FillTheBlankInput";
import QuizTypeOptions from "./QuizTypeOptions";

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
            {/* ================================================== Quiz details ============================================== */}
            <QuizDetails register={register} />

            {/* =========================================== questions =============================================== */}
            {fields.map((field, index) => {
              const layout = watch(`questions.${index}.layout`);
              const type = watch(`questions.${index}.type`);

              return (
                <div key={field.id} className=" p-6  border border-gray-200  ">
                  <div className="flex flex-col gap-4">
                    {/* ==================================== question input ==================================== */}
                    <QuestionInput
                      index={index}
                      watch={watch}
                      setValue={setValue}
                    />

                    {/* ================================================================layout options buttons  =============================================================*/}
                    <LayoutOptions
                      register={register}
                      index={index}
                      type={type}
                    />
                    {/* ================================================================ answer input for fill in the blank quiz type  =============================================================*/}
                    <FillTheBlankInput
                      register={register}
                      index={index}
                      type={type}
                    />

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
                          <MultipleChoicesInput
                            key={opt.id}
                            opt={opt}
                            index={index}
                            register={register}
                            setValue={setValue}
                          />
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
