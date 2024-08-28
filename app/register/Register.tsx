"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, Button, Label, Spinner } from "flowbite-react";

import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[500px] w-[95%]  flex justify-center min-h-screen   mx-auto">
      <form
        className="flex flex-col  w-full space-y-5 mt-[3rem]  "
        onSubmit={handleSubmit}
      >
        <h2 className="py-[2rem] lg:text-4xl text-3xl text-center">Sign Up</h2>
        <input
          type="text"
          className="border rounded-md outline-orange-400 px-4 py-3"
          placeholder="Full name"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          onChange={handleChange}
          className="border rounded-md outline-orange-400  px-4 py-3"
          placeholder="Your email"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="border rounded-md outline-orange-400  px-4 py-4"
          placeholder="Password"
        />
        {/* <input
          type="text"
          className="border outline-orange-400  px-4 py-3"
          placeholder="Re-enter password"
        /> */}
        <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
          <button
            type="submit"
            className=" w-[90%] py-4 rounded-md hover:bg-black duration-700 text-white bg-[#B66A25]"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              " Create an account"
            )}
          </button>
        </div>
        <div className="text-center flex items-center flex-col justify-center  mt-10">
          <div className="">
          <span>You already have an account</span>
          <Link className="text-orange-400 " href={"/login"}>? Sign in
          </Link>
          </div>
         

          {errorMessage && (
           <div className="p-4 mb-4 mt-10  w-[90%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium no-underline ">{errorMessage}</span> 
         </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
