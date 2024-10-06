

"use client";

import Link from "next/link";
import Logo from "../public/logo-01-w.svg";
import Logo2 from "../public/logo-04.svg";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { FaHome, FaSignInAlt, FaTimes, FaUser } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "@/features/userSlice";
import { GiRamProfile } from "react-icons/gi";
import { BsFileEarmarkPost } from "react-icons/bs";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
];
//@ts-ignore
export const navLinks:NavLink[] = [
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
  }  // Add more links as needed
];
//Drop down component
const DropDown = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { currentUser, loading,error: errorMessage,} = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  useEffect(() => {
    //@ts-ignore
    const handleClickOutside = (event) => {
      //@ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(
        "https://e-blog-api.onrender.com/api/user/signout",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      //  @ts-ignore
      console.log(error.message);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex text-sm bg-gray-800 rounded-full "
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          width={100}
          height={100}
          className="w-12 h-12 rounded-full"
          src={currentUser?.profilePicture || "/default-profile.png"}
          alt="user photo"
        />
      </button>
      {dropdown && (
        <div
          id="dropdownAvatar"
          className=" bg-white absolute z-50  top-12 -right-2 divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-900">
            {currentUser?.isAdmin ? (
              <div className="font-bold truncate">Admin</div>
            ) : (
              <div className="font-bold truncate">User</div>
            )}
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            {currentUser?.isAdmin && (
              <li>
                <button onClick={toggleDropdown} className="w-full">
                  <Link
                    href="/admin-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 text-left"
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
                  className="block px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Profile 
                </Link>
              </button>
            </li>
          </ul>
          <div className="py-1 ">
            <button
              type="button"
              onClick={handleSignout}
              className="block px-4 py-2 text-red-500 w-full text-sm rounded-t-md text-left     "
            >
              <a href="#">Sign out</a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScroll(true);
          console.log("scrolling");
        } else {
          setScroll(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on component unmount
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  //@ts-ignore
  const {currentUser,loading,error: errorMessage,} = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-white py-6 sticky top-0 z-50 transition
    -all duration-300 ${scroll ? "shadow py-2" : "py-4"}`}
    >
      <div className="mx-auto w-[92%] relative  max-w-[1350px]">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <Image src={Logo2} alt="" width={100} height={100} />
          </Link>

          {isClient && currentUser ? (
            <div className="flex items-center gap-5">
              <div className="relative ">
                <IoIosNotificationsOutline className="text-3xl text-[#B66A25]" />
                <div className="w-5 h-5 flex items-center justify-center text-white -top-1 right-3 text-sm absolute rounded-full bg-red-600">
                  0
                </div>
              </div>
              <DropDown />

              <button onClick={toggleSidebar}>
                <CgMenuRight className="text-2xl lg:hidden block" />
              </button>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link className="flex gap-2 items-center" href="/login">
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
              className="postion overlay fixed z-30 top-0 left-0 w-full h-full bg-[#00000080]"
            ></div>
          )}

          <div
            className={`lg:w-[300px] w-[250px] z-50 h-screen fixed text-white bg-white ${
              isOpen
                ? "left-[0rem] duration-1000 delay-75"
                : "-left-[30rem] duration-1000 delay-75"
            } top-0`}
          >
            <ul className="mt-[5rem] flex px-5 space-y-12 flex-col">
              {/* @ts-ignore */}
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
      </div>
    </div>
  );
};

export default Navbar2;
