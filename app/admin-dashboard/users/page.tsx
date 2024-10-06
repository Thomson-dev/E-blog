"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";






 
// @ts-ignore
const CheckboxLabel = ({isAdmin}) => {
  console.log(isAdmin)

  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  const [isChecked, setIsChecked] = useState(isAdmin);

  const handleChange = () => {
    //@ts-ignore
    setIsChecked((prev) => !prev);
    // Toggles the checked state
  };

  console.log(isChecked)

  return (
    <label
      className="flex items-center justify-center cursor-pointer"
      onClick={handleChange}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div
        className={`relative lg:!z-0 w-11 h-6 rounded-full transition-colors duration-300 ${
          isChecked ? "bg-green-600" : "bg-gray-200"
        } peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800`}
      >
        <div
          className={`absolute !z-3 w-5 h-5 bg-white rounded-full border transition-transform duration-300 ${
            isChecked ? "translate-x-full" : "translate-x-0"
          } border-gray-300`}
        ></div>
      </div>
    </label>
  );
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  //@ts-ignore
  const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://e-blog-api.onrender.com/api/user/getusers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data)

        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        //@ts-ignore
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Calculate the users to display based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="bg-gray-50  ">
      <Navbar2 />
      <div className="max-w-[1200px] flex flex-col justify-between  w-[95%] mx-auto">
        <table className="w-full border  table-fixed rounded-sm mx-auto mt-[5rem] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="text-center px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 text-center py-3">
                Status
              </th>
              <th
                scope="col"
                className="px-4 hidden lg:table-cell text-center py-3"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 hidden lg:table-cell   text-center py-3"
              >
                Created At
              </th>
              <th scope="col" className="px-4 text-center py-3">
                Admin
              </th>
              <th scope="col" className="px-4 text-center py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers &&
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-center truncate whitespace-nowrap ">
                    {/* @ts-ignore */}
                    {user.username}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {/* @ts-ignore */}
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell truncate  text-center whitespace-nowrap">
                    {/* @ts-ignore */}
                    {user.email}
                  </td>
                  <td className="px-4 hidden lg:table-cell  py-4 text-center whitespace-nowrap">
                {/* @ts-ignore */}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                 {/* @ts-ignore */}
                  <CheckboxLabel isAdmin={user.isAdmin} />
                  </td>
                  <td className="px-4 py-4 text-center flex justify-center items-center whitespace-nowrap">
                    <MdDelete className="text-2xl text-red-600" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex max-w-[1200px] w-[95%] mx-auto justify-start items-start">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            maxWidth={5}
            onPageChange={setCurrentPage}
            className="flex gap-4 text-[16px] border-blue-500 w-full py-10 justify-start"
            pageItemClassName="w-[10vw] md:w-[3vw] text-center rounded-[4px] text-black border"
            activeItemClassName="border-[blue] page-item"
            disabledItemClassName="text-gray-400"
            nextClassName="active:bg-green-700"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTable;