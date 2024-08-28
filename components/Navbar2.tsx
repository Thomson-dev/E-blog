"use client";

import Image from "next/image";
import React from "react";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar2 = () => {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  return (
    <div className="py-4  px-10 flex items-center justify-between bg-white shadow ">
      <div className="">
        <IoMdMenu className="text-3xl" />
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <IoIosNotificationsOutline className="text-3xl text-[#B66A25]" />
          <div className="w-5 h-5 flex items-center justify-center text-white -top-2 right-5 text-sm absolute rounded-full bg-red-600">0</div>
        </div>

        <div className="relative h-12 w-12">
          <Image
            fill
            className=" rounded-full"
            src={currentUser.profilePicture}
            alt="user photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
