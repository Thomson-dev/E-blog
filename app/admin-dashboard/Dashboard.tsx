"use client";


import User from "@/components/User";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PiUsersThreeFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import Navbar2 from "@/components/Navbar2";

const Dashboard = () => {
  const customerData = [
    {
      id: 1,
      icon: <PiUsersThreeFill />,

      title: "Total Customers",
      count: 2420,
      percentage: "17.2%",
    },
    {
      id: 2,
      icon: <PiUsersThreeFill />,
      title: "Active Customers",
      count: 1897,
      percentage: "32.7%",
    },
    {
      id: 3,
      icon: <PiUsersThreeFill />,
      title: "New Customers",
      count: 241,
      percentage: "-2.3%",
    },
  ];

  const [users, setUsers] = useState([]);

  /* @ts-ignore */
  const {currentUser,loading,error: errorMessage,} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://e-blog-api.onrender.com/api/user/getusers `,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        {
          /* @ts-ignore */
          console.log(error.message);
              /* @ts-ignore */
          toast.error(error.message);
        }
       
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);
  const router = useRouter();

 

  return (
    <div className="max-w-full  min-h-screen ">
      <Navbar2 />

      <div className=" mx-auto mt-[2rem] flex flex-col w-[95%] 2xl:max-w-full  max-w-
      [1150px] ">
      
        <h2 className="xl:text-2xl text-lg text-slate-900 font-semibold">
          Users
        </h2>

        <div className="grid lg:grid-cols-3 grid-cols-1 my-[2rem] gap-6">
          {customerData.map((item, index) => (
            <div
              key={index}
              className="flex px-4 rounded-md  items-center   justify-between border"
            >
              <div className="flex h-[6rem] items-center gap-3 justify-between">
                <div
                  className={`text-[2rem] text-center text-white w-12 flex items-center
                   justify-center h-12 rounded-md ${
                     item.id == 1 && "bg-[#4F46E5]"
                   } ${item.id == 2 ? "bg-[#3B82F6]" : ""} ${
                    item.id == 3 ? "bg-[#10B981]" : ""
                  }   `}
                >
                  {item.icon}
                </div>
                <div className="">
                  <p className="text-base">{item.title}</p>
                  <h2 className="md:text-xl text-base mt-2 font-semibold">
                    {item.count}
                  </h2>
                </div>
              </div>
              <div
                className={`flex  h-7 w-16 text-sm font-semibold rounded-full items-center justify-center ${
                  item.id == 1 && "bg-[#D1FAE5] text-green-500 "
                } ${item.id == 2 ? "bg-[#D1FAE5] text-green-500" : ""} ${
                  item.id == 3 ? "bg-[#FEE2E2] text-red-500" : ""
                } `}
              >
                {item.percentage}
              </div>
            </div>
          ))}
        </div>
        <div className=" mb-[4rem] border rounded-md    ">
          <User users={users} />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
