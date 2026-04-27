import { NextResponse } from "next/server";
import { requireUser } from "../../../data-access/quiz";

export async function POST(req) {
  try {
    const { supabase, user } = await requireUser();

    const body = await req.json();
    const {
      questions = [],
      options = [],
      details,
      deletedQuestions = [],
      deletedOptions = [],
    } = body;

    if (!Array.isArray(questions) || !Array.isArray(options)) {
      throw new Error("Invalid payload");
    }
    if (!Array.isArray(questions)) {
      throw new Error("Invalid payload");
    }
    const questionsWithUser = questions.map((q) => ({
      ...q,
      user_id: user.id,
    }));

    const optionsWithUser = options.map((o) => ({
      ...o,
      user_id: user.id,
    }));
    console.log("Received payload:", {
      options: optionsWithUser,
    });
    // Upsert questions
    const { error: qError } = await supabase
      .from("questions")
      .upsert(questionsWithUser, { onConflict: "question_id" });
    console.log("Upsert questions result:", { qError });
    if (qError) throw qError;

    // Upsert options
    const { error: oError } = await supabase
      .from("options")
      .upsert(optionsWithUser, { onConflict: "option_id" });

    console.log("options upsert result:", optionsWithUser);
    if (oError) throw oError;

    // Delete removed questions
    if (deletedQuestions.length) {
      const { error: dError } = await supabase
        .from("questions")
        .delete()
        .in("question_id", deletedQuestions)
        .eq("user_id", user.id);
      console.log(deletedQuestions, "questions deleted");
      if (dError) throw dError;
    }
    // Delete removed options
    if (deletedOptions.length) {
      const { error: dError } = await supabase
        .from("options")
        .delete()
        .in("option_id", deletedOptions)
        .eq("user_id", user.id);
      console.log(deletedOptions, "options deleted");
      if (dError) throw dError;
    }
    if (details && typeof details === "object") {
      if (!details.id) throw new Error("Missing details.id");
      console.log("Updating quiz details:", details.id);
      const { data, error: dError } = await supabase
        .from("quizzes")
        .update({
          ...details,
          owner_id: user.id,
        })
        .eq("id", details.id) // ✅ keep as string
        .eq("owner_id", user.id)
        .select();

      console.log("Update result:", data);

      if (!data || data.length === 0) {
        throw new Error("Update failed: no matching row");
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    const status = err.message === "Unauthorized" ? 401 : 500;

    return NextResponse.json(
      { success: false, error: err.message },
      { status },
    );
  }
}
