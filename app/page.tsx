import QuizPage from "./components/displayQuiz/quizes";
import { createQuiz } from "./actions/homeActions";

export default function Home() {
  return (
    <>
      <div className="p-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Quizzes</h1>

          <form action={createQuiz}>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              + Create Quiz
            </button>
          </form>
        </div>
      </div>

      <QuizPage />
    </>
  );
}
