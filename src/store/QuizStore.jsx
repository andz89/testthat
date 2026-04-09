// stores/quizStore.js
import { create } from "zustand";

export const useQuizStore = create((set) => ({
  details: {},
  questions: [],

  setDetails: (details) => set({ details }),

  setQuestions: (questions) => set({ questions }),

  updateQuestion: (index, updatedQuestion) => {
    console.log(
      "Updating question at index:",
      index,
      "with data:",
      updatedQuestion,
    );
    set((state) => {
      const newQuestions = [...state.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        ...updatedQuestion,
      };

      return { questions: newQuestions };
    });
  },

  addQuestion: () =>
    set((state) => ({
      questions: [
        ...state.questions,
        {
          id: Date.now(),
          question: "",
          layout: "col",
          options: [
            { id: 1, label: "", value: "A" },
            { id: 2, label: "", value: "B" },
            { id: 3, label: "", value: "C" },
            { id: 4, label: "", value: "D" },
          ],
          correct: "",
        },
      ],
    })),

  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
}));
