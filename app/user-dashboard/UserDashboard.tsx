"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);

  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  return (
    <div className="max-w-[1400px] bg-white pt-[5rem]   rounded-md mx-auto py-10 ">
      <div className="flex justify-center gap-5 flex-col items-center">
        <h2 className="text-center font-bold">Profile</h2>
        <Image
          src={currentUser.profilePicture}
          className="rounded-full"
          alt=""
          width={100}
          height={100}
        />
      </div>

      <div className="mt-[6rem]">
        <div className="max-w-[1000px]    w-[94%] min-h-[50vh] mx-auto  ">
          <form className="flex  flex-col gap-y-9">
            <div className="flex items-center justify-between">
              <h4>Username</h4>
              <input
                type="text"
                className="w-[70%] py-3 outline-none rounded-md bg-[#F3F4F6] "
                value={currentUser.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <h4>Email</h4>
              <input
                type="text"
                className="w-[70%] py-3 outline-none rounded-md bg-[#F3F4F6] "
                value={currentUser.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <h4>Password</h4>
              <input
                type="text"
                className="w-[70%] py-3 outline-none rounded-md bg-[#F3F4F6] "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-4 sm:pl-[13rem] items-center">
              <div className="">
                <button className="bg-red-600 text-white  px-6 py-3 rounded-md">Delete Account</button>
              </div>
              <div className="">
                <button className=" bg-[#10B981] text-white  px-6 py-3 rounded-md ">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
