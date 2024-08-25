import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import React from "react";

const Login = () => {
  return (
    <div className="max-w-[400px] w-[95%] py-12  flex justify-center min-h-screen   mx-auto">
      <form className="flex flex-col  w-full space-y-5 mt-[3rem] ">
        <h2 className="py-[2rem] lg:text-4xl text-3xl text-center">Sign In</h2>

        <input
          type="text"
          className="border outline-orange-400  px-4 py-4"
          placeholder="Your email"
        />
        <input
          type="text"
          className="border outline-orange-400  px-4 py-4"
          placeholder="Password"
        />
        <div className="flex justify-end underline">
          <Link className="text-orange-400" href={""}>
            Forget Password?
          </Link>
        </div>
        <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
          <button className=" w-[90%] py-4 text-base hover:bg-black duration-700 text-white bg-[#B66A25]">
            Log in
          </button>
        </div>

        <span className="text-center">OR</span>
        <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
          <button className=" w-[90%] py-4 flex items-center justify-center space-x-3 text-base hover:bg-black duration-700 border text-black  hover:text-white bg-white">
            <FaGoogle className="" />
            <div className="">
            Login With Google
            </div>
           
          </button>
        </div>

        <div className="text-center underline mt-10">
          <span>Have no account yet</span>
          <Link className="text-orange-400 " href={"/register"}>
            ?Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
