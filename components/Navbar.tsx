"use client";

import Link from "next/link";

import Logo from "../public/logo-01-w.svg";
import Logo2 from "../public/logo-04.svg";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const links = [
  { href: "/", label: "Home" },
  { href: "/Posts", label: "Posts" },
  { href: "/About", label: "About" },
];

const DropDown = () => {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="border relative">
      <button
        className="flex text-sm bg-gray-800 rounded-full "
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          width={100}
          height={100}
          className="w-8 h-8 rounded-full"
          src={currentUser.profilePicture}
          alt="user photo"
        />
      </button>
      {dropdown && (
        <div
          id="dropdownAvatar"
          className="z-10  bg-white absolute top-10 -right-2 divide-y divide-gray-100 rounded-lg shadow w-44   "
        >
          <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-900  ">
            {currentUser.isAdmin === true ? (
              <div className="font-bold truncate">Admin</div>
            ) : (
              <div className="font-bold truncate">User</div>
            )}
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            {currentUser.isAdmin === true && (
              <li>
                 <button onClick={toggleDropdown} className="w-full">
                <Link
                
                  href="/admin-dashboard"
                  className="block px-4 py-2 hover:bg-gray-100  text-left"
                >
                  Dashboard
                </Link>
                </button>

              </li>
            )}
            <li>
              <button onClick={toggleDropdown} className="w-full">
                <Link
                  href="/user-dashboard"
                  className="block px-4 py-2 hover:bg-gray-100  text-left"
                >
                  Profile
                </Link>
              </button>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-sm w-full relative  py-6">
      <div className="mx-auto w-[92%] max-w-[1350px]">
        <div className="flex flex-row items-center justify-between">
        <Link href={'/'} >
            <Image src={Logo2} alt="" width={100} height={100} />
          </Link>
          <ul className="lg:flex hidden flex-row gap-14 items-center">
            {links.map((item) => {
              return <Link href={item.href}>{item.label}</Link>;
            })}
          </ul>

          {isClient && currentUser ? (
            <div className="flex items-center gap-5">
              <DropDown />
              <button onClick={toggleSidebar}>
                <CgMenuRight className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link className="flex gap-2 items-center" href={"/login"}>
                <FaSignInAlt />
                <h1>Login</h1>
              </Link>
              <button onClick={toggleSidebar}>
                <CgMenuRight className="text-2xl" />
              </button>
            </div>
          )}

          {isOpen && (
            <div
              onClick={toggleSidebar}
              className="postion overlay fixed z-30  top-0 left-0 w-full h-full bg-[#00000080] "
            ></div>
          )}

          <div
            className={` lg:w-[350px] w-[300px] z-50 h-screen fixed  text-white bg-[#181823] ${
              isOpen
                ? "right-[0rem] duration-1000 delay-75"
                : "-right-[30rem] duration-1000 delay-75"
            } top-0`}
          >
            <div className="flex lg:mt-[10rem] mt-[7rem] flex-col lg:items-center ">
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
              {/* Mobile */}
              <div className="lg:hidden block">
                <ul className="flex px-7 flex-col gap-y-6 text-base items-start ">
                  {links.map((item) => {
                    return (
                      <Link
                        href={item.href}
                        className="border-b border-slate-700 w-full pb-4"
                      >
                        {item.label}
                      </Link>
                    );
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
