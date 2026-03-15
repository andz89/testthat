"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button onClick={logout} className="text-red-500">
      Logout
    </button>
  );
}
