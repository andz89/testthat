"use client";

import { supabase } from "../utils/supabase/client";

import Image from "next/image";
const signin = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google OAuth error:", error.message);
    }
  };
  return (
    <div className="w-[340px] mx-auto px-6  flex flex-col border border-neutral-500 rounded-md  py-8 items-center justify-center  mt-15 shadow-sm">
      <form className="   flex flex-col gap-2 w-full">
        <h3 className="text-3xl mt-5 text-center">Login</h3>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-800 py-3 font-medium text-sm text-white transition hover:bg-zinc-900 cursor-pointer"
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            width={100}
            height={100}
            alt="Google"
            className="h-4 w-4"
          />
          Or sign in with Google
        </button>
      </form>
    </div>
  );
};

export default signin;
