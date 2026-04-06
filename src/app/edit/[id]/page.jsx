import React from "react";

import QuestionBuilder from "../../../components/addQuiz/QuestionBuilder";
import { getQuizById } from "../../../data-access/quiz";
export default async function Page({ params }) {
  const { id } = await params;

  const quiz = await getQuizById(id);

  return (
    <div>
      <h1>Create Questions</h1>
      <QuestionBuilder quiz={quiz} />
    </div>
  );
}
