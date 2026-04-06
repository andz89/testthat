import { createQuiz, getQuiz } from "../data-access/quiz";
import QuizPage from "../components/displayQuiz/quizes";
import { logout } from "../app/auth/actions";

export default async function Home() {
  const quizzes = await getQuiz();

  return (
    <>
      <div className="p-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <form>
            <button
              formAction={logout}
              className=" bg-blue-500 text-white font-medium rounded shadow-sm p-2 w-full"
            >
              Logout
            </button>
          </form>
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

      <QuizPage quizzes={quizzes} />
    </>
  );
}
