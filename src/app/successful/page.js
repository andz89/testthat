import React from "react";
import { flashStore } from "../utils/lib/flash";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const token = params.token;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    console.log(payload.ok);
    if (!payload.ok) redirect("/");
  } catch {
    redirect("/");
  }

  return (
    <>
      {" "}
      <div>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-sm w-full text-center space-y-4 -mt-35">
            <h1 className="text-2xl font-semibold bg-primary text-white p-2 rounded">
              Sign Up Successful 🎉
            </h1>

            <p className="text-gray-600">
              Your account has been created. Please check your email inbox and
              click the verification link to complete your sign-in.
            </p>

            <p className="text-sm text-gray-500">
              Didn’t receive the email? Check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
