"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo2 from "../public/logo-04.svg";
import React, { useState } from "react";
import { BsFileEarmarkPost } from "react-icons/bs";
import {  FaHome, FaSignInAlt, FaUber, FaUser,  } from "react-icons/fa";
import { GiRamProfile } from "react-icons/gi";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'

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
    label: "CreatePosts",
    href: "/admin-dashboard/create-posts",
    icon: <BsFileEarmarkPost />,
  },
  {
    label: "Posts",
    href: "/admin-dashboard/posts",
    icon: <BsFileEarmarkPost />,
  }

  
  // Add more links as needed
];
const Sidebar = () => {
  const pathname = usePathname();

  return (
    
    <div className=" hidden lg:flex ">
      <aside
        className={` h-screen w-[250px] fixed top-0 left-0 flex flex-col justify-between px-10 shadow border  text-black `}
      >
        <div className="mt-10">
          {/* <Link href={"/"}>
            <Image src={Logo2} alt="" width={100} height={100} />
          </Link> */}
          <ul className="mt-[5rem] flex space-y-12 flex-col">
            {navLinks.map((link: NavLink) => {
              const isActive =
                pathname === link.href || pathname.startsWith
                (`${link.href}/`);
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

        <div className="mb-10">
          <button className="bg-[#B66A25] py-3 flex items-center justify-center gap-2 text-white w-[90%] rounded-md">
            {" "}
            <FaSignInAlt /> Log out{" "}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
