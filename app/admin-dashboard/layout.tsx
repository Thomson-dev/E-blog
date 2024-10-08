"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { FaCog, FaHome, FaUser } from "react-icons/fa";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex">
       {/* @ts-ignore */}
       <div className="w-[250px] hidden lg:block
       ">
         {/* @ts-ignore */}
       <Sidebar  isOpen={isOpen} setIsOpen={setIsOpen} />
       </div>
      

      <section className={`flex-1 z-0 overflow-hidden `}>{children}</section>
    </div>
  );
}
