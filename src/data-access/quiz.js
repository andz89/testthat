// homeActions
"use server";
import { createClient } from "../app/utils/supabase/server";

import { redirect } from "next/navigation";
export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return { supabase, session };
}

export async function createQuiz() {
  const { supabase } = await requireUser();

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
  redirect(`/edit/${data.id}`);
}

export async function getQuiz() {
  const { supabase } = await requireUser();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get quiz error:", error);
    return [];
  }

  return data;
}

export async function getQuizById(id) {
  if (!id) {
    console.error("Quiz ID is missing");
    return null;
  }

  const { supabase } = await requireUser();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get quiz error:", error);
    return null;
  }

  return data;
}
