"use client";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../features/userSlice";
import { useRouter } from "next/navigation";
import { Alert, Spinner } from "flowbite-react";

const GoogleAuth = () => {
  const auth = getAuth(app);

  const router = useRouter();
  const dispatch = useDispatch();


  
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        dispatch(signInSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
      <button
        onClick={handleGoogleClick}
        type="button"
        className=" w-[90%] rounded-md  py-4  flex items-center justify-center space-x-3 text-base hover:bg-black duration-700 border text-black  hover:text-white bg-white"
      >
        <FaGoogle className="" />
        <div className="">Login With Google</div>
      </button>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

 //@ts-ignore
  const { currentUser, loading, error: errorMessage,} = useSelector((state) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const router = useRouter();
 //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
     //@ts-ignore
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      }
    } catch (error) {
       //@ts-ignore
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <div className="max-w-[400px] w-[95%] py-12  flex justify-center min-h-screen   mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-full space-y-5 mt-[3rem] "
      >
        <h2 className="py-[2rem] lg:text-4xl text-3xl text-center">Sign In</h2>

        <input
          type="text"
          onChange={handleChange}
          id="email"
          className="border rounded-md  outline-orange-400  px-4 py-4"
          placeholder="Your email"
        />
        <input
          type="password"
          onChange={handleChange}
          id="password"
          className="border rounded-md  outline-orange-400  px-4 py-4"
          placeholder="Password"
        />
        <div className="flex justify-end ">
          <Link className="text-orange-400" href={""}>
            Forget Password?
          </Link>
        </div>
        <div className="flex justify-center mt-[3rem] rounded-sm shadow-sm">
          <button className=" w-[90%] py-4 rounded-md  text-base hover:bg-black duration-700 text-white bg-[#B66A25]">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Log in"
            )}
          </button>
        </div>

        <span className="text-center">OR</span>
        <GoogleAuth />

        <div className="text-center  mt-10">
          <span>Have no account yet</span>
          <Link className="text-orange-400 " href={"/register"}>
            ? Sign Up
          </Link>
        </div>
        <div className="flex justify-center text-center">
          {errorMessage && (
            <div
              className="p-4 mb-4 mt-3  w-[90%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium no-underline ">{errorMessage}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
