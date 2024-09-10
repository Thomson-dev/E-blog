
'use client'
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
const UserTable = ({users}) => {


  

  return (
    <table className=" w-full divide-y px-3 table-auto  divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="text-center lg:px-6 py-3">
            Name
          </th>
          <th scope="col" className="lg:px-6 text-center py-3">
            Status
          </th>
          <th scope="col" className="lg:px-6 text-center py-3">
            Email
          </th>
          {/* <th scope="col" className="lg:px-6 text-center py-3">
            createdAt
          </th> */}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {/* @ts-ignore */}
        {users &&  users.slice(0,4).map((user) => (
          <tr key={user._id}>
            <td className="lg:px-6 py-4 text-center whitespace-nowrap">
              {user.username}
            </td>
            <td className="lg:px-6 py-4 text-center whitespace-nowrap">
              {user.isAdmin == true ? 'Admin' : 'User'}
            </td>
            <td className="lg:px-6 py-4 text-center whitespace-nowrap">
              {user.email}
            </td>
            <td className="lg:px-6 py-4 text-center whitespace-nowrap">
            {/* {new Date(user.createdAt).toLocaleDateString()} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;


