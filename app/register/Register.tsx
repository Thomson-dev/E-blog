import Link from "next/link";

import React from "react";

const Register = () => {
  return (
    <div className="max-w-[500px] w-[95%]  flex justify-center min-h-screen   mx-auto">
      <form className="flex flex-col  w-full space-y-5 mt-[3rem] ">
        <h2 className="py-[2rem] lg:text-4xl text-3xl text-center">Sign Up</h2>
        <input
          type="text"
          className="border outline-orange-400 px-4 py-3"
          placeholder="Full name"
        />
        <input
          type="text"
          className="border outline-orange-400  px-4 py-3"
          placeholder="Your email"
        />
        <input
          type="text"
          className="border outline-orange-400  px-4 py-4"
          placeholder="Password"
        />
        <input
          type="text"
          className="border outline-orange-400  px-4 py-3"
          placeholder="Re-enter password"
        />
        <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
          <button className=" w-[90%] py-4 hover:bg-black duration-700 text-white bg-[#B66A25]">
            Create an account
          </button>
        </div>
        <div className="text-center underline mt-5">
          <span>You already have an account</span>
          <Link  className ='text-orange-400 ' href={"/login"}>?Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
