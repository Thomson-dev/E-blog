"use client";
import Footer from "@/components/Footer";
import Navbar2 from "@/components/SideNavbar";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const users = [
  {
    name: "John Doe",
    status: "admin",
    email: "john.doe@example.com",
    createdAt: "2023-01-01",
  },
  {
    name: "Jane Smith",
    status: "user",
    email: "jane.smith@example.com",
    createdAt: "2023-02-15",
  },
  {
    name: "Alice Johnson",
    status: "admin",
    email: "alice.johnson@example.com",
    createdAt: "2023-03-10",
  },
  {
    name: "Bob Brown",
    status: "user",
    email: "bob.brown@example.com",
    createdAt: "2023-04-05",
  },
  {
    name: "Alice Johnson",
    status: "admin",
    email: "alice.johnson@example.com",
    createdAt: "2023-03-10",
  },
  {
    name: "Bob Brown",
    status: "user",
    email: "bob.brown@example.com",
    createdAt: "2023-04-05",
  },
];

const CheckboxLabel = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev); // Toggles the checked state
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-300
          ${isChecked ? "bg-green-600" : "bg-gray-200"} 
          peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800`}
      >
        <div
          className={`absolute w-5 h-5 bg-white rounded-full border transition-transform duration-300
            ${isChecked ? "translate-x-full" : "translate-x-0"}
            border-gray-300`}
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
      <div className="max-w-[1200px]   w-[95%] mx-auto">
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
                  <td className="px-4 py-4 text-center whitespace-nowrap ">
                    {/* @ts-ignore */}
                    {user.username}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {/* @ts-ignore */}
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell  text-center whitespace-nowrap">
                    {/* @ts-ignore */}
                    {user.email}
                  </td>
                  <td className="px-4 hidden lg:table-cell  py-4 text-center whitespace-nowrap">
                {/* @ts-ignore */}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    <CheckboxLabel />
                  </td>
                  <td className="px-4 py-4 text-center flex justify-center items-center whitespace-nowrap">
                    <MdDelete className="text-2xl text-red-600" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex max-w-[1200px] mx-auto justify-start items-start">
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
      <Footer />
    </div>
  );
};

export default UserTable;
