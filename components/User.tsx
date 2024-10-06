"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const users2 = [
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
];
//@ts-ignore
const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
    <table className="w-full table-auto divide-y px-3 divide-gray-200 ">
      <thead className="bg-gray-50 ">
        <tr>
          <th scope="col" className="text-center py-3 min-w-[150px]">
            Name 
          </th>
          <th scope="col" className="text-center py-3 min-w-[150px]">
            Status
          </th>
          <th scope="col" className="text-center py-3 min-w-[200px]">
            Email
          </th>
          <th scope="col" className="text-center py-3 min-w-[150px]">
            Created At
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {/* @ts-ignore */}
        {users && users.slice(0, 4).map((user) => (
            <tr key={user._id}>
              <td className=" py-4 text-center truncate min-w-[150px]">
                {user.username}
              </td>
              <td className=" py-4 text-center truncate min-w-[150px]">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className=" py-4 text-center truncate min-w-[200px]">
                {user.email}
              </td>
              <td className=" py-4 text-center min-w-[150px]">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  
  
  
  
  );
};

export default UserTable;
