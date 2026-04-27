"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import QuizDetails from "./QuizDetails";
import QuestionInput from "./QuestionInput";
import LayoutOptions from "./LayoutOptions";
import MultipleChoicesInput from "./MultipleChoicesInput";
import FillTheBlankInput from "./FillTheBlankInput";
import QuestionFooter from "./QuestionFooter";
import { useQuizStore } from "../../store/QuizStore";

import ErrorModal from "../modal/ErrorModal";
import PublishSettingsModal from "../modal/PublishSettingsModal";
import { useSaveQuiz } from "../hooks/useSaveQuiz";
function normalizeSingleQuiz(quiz) {
  const questions = [];
  const options = [];

  quiz.questions?.forEach((q) => {
    questions.push({
      ...q,
      isDirty: false,
    });

    q.options?.forEach((opt) => {
      options.push({
        ...opt,
        question_id: q.question_id,
        isDirty: false,
      });
    });
  });

  return { questions, options };
}
export default function QuestionBuilder({ quiz }) {
  const {
    questions,
    addQuestion,
    options,

    setDetails,
    details,
    deletedQuestions,
    deletedOptions,
    addOption,
  } = useQuizStore();

  const { handleSave, sending, error, setError } = useSaveQuiz();
  const [openMenu, setOpenMenu] = useState(null);
  const [openPublishModal, setOpenPublishModal] = useState(false);

  const [manualSave, setManualSave] = useState(false);

  //  compute dirty state (for UI only)
  const dirtyQuestions = questions.filter((q) => q.isDirty);
  const dirtyOptions = options.filter((o) => o.isDirty);
  const dirtyDetails = details?.isDirty;

  const isDirty =
    dirtyQuestions.length > 0 ||
    dirtyOptions.length > 0 ||
    dirtyDetails ||
    deletedQuestions.length > 0 ||
    deletedOptions.length > 0;

  const saveRef = useRef(handleSave);
  useEffect(() => {
    saveRef.current = handleSave;
  }, [handleSave]);

  //  INTERVAL AUTOSAVE (stable, no reset)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     saveRef.current(); // always latest, but interval never resets
  //   }, 15000);
  //   if (!isDirty) return; // if not dirty, don't set interval
  //   return () => clearInterval(interval);
  // }, []);

  const activeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!activeRef.current) return;

      if (!activeRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!quiz || quiz.length === 0) return;

    const currentQuiz = quiz;

    if (currentQuiz.questions.length > 0) {
      const { questions, options } = normalizeSingleQuiz(currentQuiz);

      useQuizStore.setState({
        questions,
        options,
      });
    }

    setDetails({
      quizId: currentQuiz.id,
      title: currentQuiz.title || "",
      description: currentQuiz.description || "",
      grade: currentQuiz.grade || "",
      subject: currentQuiz.subject || "",
      quarter: currentQuiz.quarter || "",
      objectives: currentQuiz.objectives || "",
    });

    if (currentQuiz.questions.length === 0) {
      // only add question if DB has none
      addQuestion();
    }
  }, [quiz]);
  const handlePublish = (settings) => {
    console.log("Publishing with settings:", settings);

    // call your API here
  };
  return (
    <div className="bg-white min-h-screen mb-40">
      {/* quiz header */}
      <div className="fixed top-0   py-2 bg-gray-50 z-10 flex items-center gap-4 w-full justify-end px-6 border-b border-gray-200 ">
        <div className="">
          <span
            className={`px-4 py-2 rounded   ${
              sending ? "bg-yellow-100 text-yellow-800 " : "opacity-0"
            }`}
          >
            {manualSave ? "Saving..." : "Auto saving..."}
          </span>
        </div>
        <ErrorModal
          isOpen={!!error}
          onClose={() => setError(null)}
          title="Save Failed"
          message={error?.message}
          type={error?.type}
        />
        <button
          onClick={() => {
            setManualSave(true);
            handleSave();
          }}
          disabled={sending || !isDirty}
          className={`px-4 py-2 rounded shadow-sm ${
            sending
              ? "bg-gray-400"
              : !isDirty
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
          }`}
        >
          Save
        </button>
        <PublishSettingsModal
          isOpen={openPublishModal}
          onClose={() => setOpenPublishModal(false)}
          onPublish={handlePublish}
        />
        <button
          onClick={() => setOpenPublishModal(true)}
          className={`cursor-pointer px-4 py-2 rounded shadow-sm bg-green-700 text-white `}
        >
          Publish
        </button>
      </div>
      {/* quiz header end */}

      <div className="max-w-[720px] mx-auto    ">
        <div className="flex flex-col pt-20">
          {/* Quiz Details */}
          <QuizDetails quiz={quiz} />

          {/* Questions details end */}
          <div>
            {questions?.map((q, index) => {
              const questionOptions = options.filter(
                (opt) => opt.question_id === q.question_id,
              );

              return (
                <div key={q.question_id} className="  ">
                  <div className="flex items-center justify-end gap-3  w-full mt-7 mb-1">
                    <QuestionFooter
                      questionLength={questions.length}
                      questionId={q.question_id}
                      setOpenMenu={setOpenMenu}
                      openMenu={openMenu}
                      isActive={openMenu === q.question_id}
                      activeRef={activeRef}
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-6 border border-gray-200 rounded">
                    {/* Question */}

                    <QuestionInput id={q.question_id} order={index} />
                    {/* Layout */}
                    {q.type !== "short" && (
                      <LayoutOptions id={q.question_id} layoutData={q.layout} />
                    )}

                    {/* Fill in the blank */}
                    {q.type === "short" && <FillTheBlankInput index={index} />}
                    {/* Multiple Choice */}
                    {q.type !== "short" && (
                      <div
                        className={`gap-2 ${
                          q.layout === "row"
                            ? "flex flex-row flex-wrap justify-around"
                            : q.layout === "grid"
                              ? "grid grid-cols-2"
                              : "flex flex-col"
                        }`}
                      >
                        {questionOptions.map((opt, index) => (
                          <MultipleChoicesInput
                            questionOptionsLength={questionOptions.length}
                            key={opt.option_id}
                            opt={opt}
                            index={index}
                          />
                        ))}

                        {/* Footer */}
                      </div>
                    )}

                    {q.type !== "short" && (
                      <button
                        onClick={() => addOption(q.question_id)}
                        className="ml-2 px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition w-32"
                      >
                        + Add Option
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
