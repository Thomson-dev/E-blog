"use client";

import Link from "next/link";

import Logo from "../public/logo-01-w.svg";
import Logo2 from "../public/logo-04.svg";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const links = [
  { href: "/", label: "Home" },
  { href: "/Posts", label: "Posts" },
  { href: "/About", label: "About" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-white shadow-sm w-full relative  py-8">
      <div className="mx-auto w-[92%] max-w-[1350px]">
        <div className="flex flex-row items-center justify-between">
          <Image src={Logo2} alt="" width={100} height={100} />
          <ul className="lg:flex hidden flex-row gap-14 items-center">
            {links.map((item) => {
              return <Link href={item.href}>{item.label}</Link>;
            })}
          </ul>
          <div className="flex items-center space-x-10">
            <Link href={'/login'}>Login</Link>
            <button onClick={toggleSidebar}>
              <CgMenuRight className="text-2xl" />
            </button>
          </div>
          {isOpen && (
            <div onClick={toggleSidebar} className="postion overlay fixed z-30  top-0 left-0 w-full h-full bg-[#00000080] "></div>
          )}

          <div
            className={` lg:w-[350px] w-[300px] z-50 h-screen fixed  text-white bg-[#181823] ${
              isOpen ? "right-[0rem] duration-1000 delay-75" : "-right-[30rem] duration-1000 delay-75"
            } top-0`}
          >
            <div className="flex mt-[10rem] flex-col lg:items-center ">
             <div className="hidden lg:items-center  lg:flex flex-col">
             <Image src={Logo} alt="" width={150} height={150} />
              <h2 className="mt-[6rem] text-2xl">Get Newsletter</h2>

              <input
                placeholder="Your email... "
                type="email"
                className="bg-[#181823] mt-4 px-2 border py-2 text-white"
              />
              <button className="bg-[#B66A25] w-[70%] py-3 mt-5">
                Subscribe now
              </button>
             </div>
             <div className="lg:hidden block">
             <ul className="flex px-6 flex-col gap-14 text-lg items-start ">
            {links.map((item) => {
              return <Link href={item.href}>{item.label}</Link>;
            })}
          </ul>
             </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="absolute top-0 bg-[#B66A25] p-3"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
