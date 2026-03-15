"use client";
import { React } from "react";
import { useState } from "react";

import { login } from "../auth/actions";
const signin = () => {
  const [error, setError] = useState("");
  const handleSignUpFormData = async (formData) => {
    const msg = await login(formData);

    setError(msg);
  };
  return (
    <div className="w-[340px] mx-auto px-6  flex flex-col border border-neutral-500 rounded-md  py-8 items-center justify-center  mt-15 shadow-sm">
      <form className="   flex flex-col gap-2 w-full">
        <h3 className="text-3xl mt-5 text-center">Login</h3>
        <label
          htmlFor="email"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="name@flowbite.com"
          required
          className="border-1 border-neutral-500 w-full p-2 rounded-lg focus:outline focus:outline-gray-400"
        />

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your password
          </label>
          <input
            placeholder="••••••••"
            required
            type="password"
            id="password"
            name="password"
            className="border-1 border-neutral-500 w-full p-2 rounded-lg focus:outline focus:outline-gray-400"
          />
        </div>

        <p className="text-sm text-rose-500 text-center">
          {error ? error : ""}
        </p>

        <div>
          <button
            formAction={handleSignUpFormData}
            className=" bg-slate-800 text-white font-medium rounded shadow-sm p-2 w-full  cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default signin;
