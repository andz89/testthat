// stores/quizStore.js
import { create } from "zustand";

const createEmptyQuestion = (type = "multiple") => ({
  question_id: Date.now(),
  question: "",
  type,
  layout: "col",
  correct: "",
  isDirty: true,
  isNew: true, // 👈 add this (important)
  showLabel: true, // ✅ default ON
  dirtyFields: {
    question_id: true,
    question: true,
    type: true,
    layout: true,
    correct: true,
    showLabel: true, // ✅ track this
  },
});
const createOption = (questionId, label = "") => ({
  option_id: Date.now() + Math.random(),
  question_id: questionId,
  label,
  order: 0,
  isDirty: true,
  isNew: true, // 👈 add this

  dirtyFields: {
    label: true,

    question_id: true,
    order: true,
  },
});

export const useQuizStore = create((set) => ({
  questions: [],
  options: [],
  deletedQuestions: [],
  deletedOptions: [],
  details: {},

  setDetails: (details) => set({ details }),
  updateQuestionLabelVisibility: (question_id, value) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.question_id !== question_id) return q;

        return {
          ...q,
          showLabel: value,
          isDirty: true,
          dirtyFields: {
            ...(q.dirtyFields || {}),
            showLabel: true,
          },
        };
      }),
    })),
  addQuestion: () =>
    set((state) => {
      const q = createEmptyQuestion("multiple");
      const newOptions = [createOption(q.question_id, "", "1")];

      return {
        questions: [...state.questions, q],
        options: [...state.options, ...newOptions],
      };
    }),
  addOption: (question_id) =>
    set((state) => {
      console.log("Adding option to question", state.options);
      const currentOptions = state.options.filter(
        (opt) => opt.question_id === question_id,
      );

      // ✅ safer than length
      const maxOrder = currentOptions.length
        ? Math.max(...currentOptions.map((o) => o.order ?? 0))
        : -1;

      const newOption = [createOption(question_id, "", maxOrder + 1)];

      return {
        options: [...state.options, ...newOption],
      };
    }),
  updateDetails: (key, value) =>
    set((state) => ({
      details: {
        ...state.details,
        [key]: value,
        isDirty: true,
        dirtyFields: {
          ...(state.details.dirtyFields || {}),
          [key]: true,
        },
      },
    })),
  updateQuestion: (id, updatedQuestion) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.question_id === id
          ? {
              ...q,
              ...updatedQuestion,
              isDirty: true,
              dirtyFields: {
                ...(q.dirtyFields || {}),
                ...Object.keys(updatedQuestion).reduce((acc, key) => {
                  acc[key] = true;
                  return acc;
                }, {}),
              },
            }
          : q,
      ),
    })),
  updateOption: (id, updatedOption) =>
    set((state) => ({
      options: state.options.map((opt) =>
        opt.option_id === id
          ? {
              ...opt,
              ...updatedOption,
              isDirty: true,
              dirtyFields: {
                ...(opt.dirtyFields || {}),
                ...Object.keys(updatedOption).reduce((acc, key) => {
                  acc[key] = true;
                  return acc;
                }, {}),
              },
            }
          : opt,
      ),
    })),
  removeQuestion: (questionId) =>
    set((state) => {
      const q = state.questions.find(
        (question) => question.question_id === questionId,
      );
      console.log("Removing question", questionId, "question:", q);
      return {
        questions: state.questions.filter(
          (question) => question.question_id !== questionId,
        ),
        options: state.options.filter(
          (opt) => opt.question_id !== q.question_id,
        ),
        deletedQuestions: q.isNew
          ? state.deletedQuestions
          : [...state.deletedQuestions, q.question_id],
      };
    }),
  removeOption: (optionId) =>
    set((state) => {
      const opt = state.options.find((option) => option.option_id === optionId);

      return {
        options: state.options.filter(
          (option) => option.option_id !== optionId,
        ),
        deletedOptions: opt.isNew
          ? state.deletedOptions
          : [...state.deletedOptions, opt.option_id],
      };
    }),

  duplicateQuestion: (questionId) =>
    set((state) => {
      const index = state.questions.findIndex(
        (q) => q.question_id === questionId,
      );

      if (index === -1) return state;

      const q = state.questions[index];
      const newId = Date.now();

      const newQuestion = {
        ...q,
        question_id: newId,
        isDirty: true,
      };

      const newOptions = state.options
        .filter((opt) => opt.question_id === q.question_id)
        .map((opt) => ({
          ...opt,
          option_id: Date.now() + Math.random(),
          question_id: newId,
          isDirty: true,
        }));

      const newQuestions = [...state.questions];
      newQuestions.splice(index + 1, 0, newQuestion);

      return {
        questions: newQuestions,
        options: [...state.options, ...newOptions],
      };
    }),

  addQuestionAfter: (questionId, type) =>
    set((state) => {
      if (questionId === null) {
        const newQuestion = {
          ...createEmptyQuestion(type),
          question_id: Date.now(),
          type,
        };
        let newOptions = [];

        if (type === "multiple") {
          newOptions = [createOption(newQuestion.question_id, "", "1")];
        }

        // ✅ short = no options (correct)

        const newQuestions = [...state.questions];
        newQuestions.splice(newQuestions.length, 0, newQuestion);

        return {
          questions: newQuestions,
          options: [...state.options, ...newOptions],
        };
      } else {
        const index = state.questions.findIndex(
          (q) => q.question_id === questionId,
        );

        if (index === -1) return state;

        // ✅ create question properly with type
        const newQuestion = {
          ...createEmptyQuestion(),
          question_id: Date.now(),
          type,
        };

        let newOptions = [];

        if (type === "multiple") {
          newOptions = [createOption(newQuestion.question_id, "", "1")];
        }

        // ✅ short = no options (correct)

        const newQuestions = [...state.questions];
        newQuestions.splice(index, 0, newQuestion);

        return {
          questions: newQuestions,
          options: [...state.options, ...newOptions],
        };
      }
    }),

  clearDirty: ({ questions = [], options = [], details = [] }) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        const match = questions.find(
          (item) => item.question_id === q.question_id,
        );
        if (!match) return q;

        const newDirtyFields = { ...q.dirtyFields };

        match.fields.forEach((field) => {
          delete newDirtyFields[field];
        });

        return {
          ...q,
          isNew: false,
          dirtyFields: newDirtyFields,
          isDirty: Object.keys(newDirtyFields).length > 0,
        };
      }),

      options: state.options.map((opt) => {
        const match = options.find((item) => item.option_id === opt.option_id);
        if (!match) return opt;

        const newDirtyFields = { ...opt.dirtyFields };

        match.fields.forEach((field) => {
          delete newDirtyFields[field];
        });

        return {
          ...opt,
          dirtyFields: newDirtyFields,
          isDirty: Object.keys(newDirtyFields).length > 0,
        };
      }),

      details: state.details
        ? (() => {
            const newDirtyFields = { ...state.details.dirtyFields };

            details.forEach((field) => {
              delete newDirtyFields[field];
            });

            return {
              ...state.details,
              dirtyFields: newDirtyFields,
              isDirty: Object.keys(newDirtyFields).length > 0,
            };
          })()
        : state.details,
      deletedQuestions: [], //

      deletedOptions: [], //
    })),
}));
