"use client";
import { useState } from "react";
import QuizDetails from "./QuizDetails";
import { useForm, useFieldArray } from "react-hook-form";
import { BiDuplicate, BiPlus, BiSolidTrash } from "react-icons/bi";
import QuestionInput from "./QuestionInput";
import LayoutOptions from "./LayoutOptions";
import MultipleChoicesInput from "./MultipleChoicesInput";
import FillTheBlankInput from "./FillTheBlankInput";
import { useEffect } from "react";
import { useQuizStore } from "../../store/QuizStore";
import QuestionFooter from "./QuestionFooter";

export default function QuestionBuilder({ quiz }) {
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

  const { setDetails, setQuestions } = useQuizStore();

  const _details = watch("details");
  const _questions = watch("questions");

  useEffect(() => {
    setDetails(_details);
  }, [_details]);

  useEffect(() => {
    setQuestions(_questions);
  }, [_questions]);

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "questions",
  });
  const { details, questions } = useQuizStore();

  const onSubmit = async () => {
    const payload = {
      details,
      questions,
    };

    console.log("FROM ZUSTAND:", payload);

    // await fetch("/api/quiz", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });
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
                    {/********************** end *****************************/}

                    {/* ============================= layout options buttons  =============================================================*/}
                    {type !== "short" && (
                      <LayoutOptions register={register} index={index} />
                    )}
                    {/********************** end *****************************/}

                    {/* ============================ answer input for fill in the blank quiz type  =============================================================*/}

                    {type === "short" && (
                      <FillTheBlankInput register={register} index={index} />
                    )}
                    {/********************** end *****************************/}

                    {/* ======================================= multiple choices input  =============================================================*/}
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
                    {/********************** end *****************************/}
                  </div>

                  {/* =========================== question footer buttons  =============================================================*/}
                  <div className="flex items-center justify-end gap-3 mt-5 w-full">
                    <QuestionFooter
                      index={index}
                      setOpenMenu={setOpenMenu}
                      insert={insert}
                      duplicateQuestion={duplicateQuestion}
                      remove={remove}
                      openMenu={openMenu}
                    />
                  </div>
                  {/********************** end *****************************/}
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
