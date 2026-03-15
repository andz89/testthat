"use server";

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export async function createQuiz() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quizzes")
    .insert([
      {
        title: "Untitled Quiz",
        grade: "grade 1",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Create quiz error:", error);
    return;
  }

  // redirect to edit page (recommended UX)
  redirect(`/editQuestions/${data.id}`);
}
