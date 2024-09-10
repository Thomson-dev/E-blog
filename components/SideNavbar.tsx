"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";

import { BsFileEarmarkPost } from "react-icons/bs";
import { FaCog, FaHome, FaSignInAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { GiRamProfile } from "react-icons/gi";

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const navLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: <FaHome />,
  },
  {
    label: "Profile",
    href: "/admin-dashboard/admin-profile",
    icon: <GiRamProfile />,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: <FaUser/>,
  },

  {
    label: "Posts",
    href: "/admin-dashboard/create-posts",
    icon: <BsFileEarmarkPost />,
  },
  // Add more links as needed
];

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
//@ts-ignore
  const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);

  return (
    <div className="py-4 lg:px-10 px-4 flex sticky top-0 items-center justify-between bg-white shadow-sm">
      <div>
        <button onClick={toggleSidebar}>
          <IoMdMenu className="text-3xl" />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <IoIosNotificationsOutline className="text-3xl text-[#B66A25]" />
          <div className="w-5 h-5 flex items-center justify-center text-white -top-1 right-3 text-sm absolute rounded-full bg-red-600">
            0
          </div>
        </div>

        <div className="relative h-12 w-12">
          {currentUser && currentUser.profilePicture ? (
            <Image
              fill
              className="rounded-full"
              src={currentUser.profilePicture}
              alt="user photo"
            />
          ) : (
            <div className="rounded-full bg-gray-300 h-full w-full"></div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="position overlay fixed lg:hidden z-40 top-0 left-0 w-full h-full bg-[#00000080]"
        ></div>
      )}
      <div
        className={`w-[250px] px-8 z-index h-full fixed lg:hidden text-black bg-[#ffff] ${
          isOpen ? "left-0 duration-1000 delay-75" : "-left-[30rem] duration-1000 delay-75"
        } top-0`}
      >
       <ul className="mt-[5rem] flex space-y-12 flex-col">
            {navLinks.map((link: NavLink) => {
            
              return (
                <li key={link.href} className={` `}>
                  <Link
                    className="flex flex-row gap-3 text-lg items-center"
                    href={link.href}
                  >
                    {link.icon && (
                      <span className="text-2xl text-slate-700 ">
                        {link.icon}
                      </span>
                    )}
                    <span className="text-slate-700 ">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
      </div>
    </div>
  );
};

export default Navbar2;