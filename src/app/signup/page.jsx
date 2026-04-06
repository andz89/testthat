"use client";
import { React } from "react";
import { useState } from "react";

import Image from "next/image";
import { signUp } from "../auth/actions";

const signin = () => {
  const [error, setError] = useState("");
  const handleSignUpFormData = async (formData) => {
    const msg = await signUp(formData);
    setError(msg);
  };
  return (
    <div className="w-[350px] mx-auto px-6  flex flex-col border border-neutral-500 rounded-md  py-8 items-center justify-center  mt-15 shadow-sm">
      <form className="   flex flex-col gap-2 w-full">
        <Image
          src="/tuki.png"
          alt="My photo"
          className="mx-auto"
          width={100}
          height={100}
        />

        <h3 className="text-3xl mt-5 text-center">Sign up</h3>
        <div>
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
        </div>

        <div>
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
        <div>
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Repeat Password
          </label>
          <input
            placeholder="••••••••"
            required
            type="password"
            id="password"
            name="repeat-password"
            className="border-1 border-neutral-500 w-full p-2 rounded-lg focus:outline focus:outline-gray-400"
          />
        </div>

        <label htmlFor="remember" className="flex items-center ">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
            required
          />
          <p className="ms-2 text-sm font-medium text-heading select-none">
            I agree with the{" "}
            <a href="#" className="text-fg-brand hover:underline">
              terms and conditions
            </a>
            .
          </p>
        </label>
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
