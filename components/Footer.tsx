import React from "react";
import Logo2 from "../public/logo-04.svg";
import Image from "next/image";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const logoData = [
    {
      logoPath: Logo2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod consectetur adipiscing elit. Sed do eiusmod.",
      socialIcons: [
        { iconPath: <FaFacebookSquare /> },
        { iconPath: <FaInstagramSquare /> },
        { iconPath: <FaTwitterSquare /> },
      ],
    },
  ];

  const categories = [
    { name: "Salads", count: 5 },
    { name: "Sundae", count: 10 },
    { name: "Fast Food", count: 7 },
    { name: "Juice", count: 11 },
    { name: "Pastries", count: 2 },
  ];
  const retreats = [
    {
      title: "How Can A Retreat Help Reconnect You to Your",
      readingTime: "3 Minute Read",
      image: "/153.jpg", // Replace with the actual path to your image
    },
    {
      title: "How Can A Retreat Help Reconnect You to Your",
      readingTime: "3 Minute Read",
      image: "/gallery-13.jpg", // Replace with the actual path to your image
    },

    // Add more objects as needed
  ];

  return (
    <div className="shadow-md border min-h-[60vh]  py-16 flex lg:items-center">
      <div className="max-w-[1300px] w-[95%] p-2 flex lg:items-center mx-auto ">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 place-content-start lg:place-items-center  gap-5">
          <div className="">
            {logoData.map((item) => (
              <div className="">
                <Image src={item.logoPath} alt="" width={100} height={100} />

                <p className="mt-6 leading-6 text-slate-600 text-base">{item.description}</p>
                <div className="flex mt-6 gap-5 items-center">
                  {item.socialIcons.map((_) => (
                    <div className="text-xl">{_.iconPath}</div>
                  ))}
                </div>
              </div>
            ))}

            <div className=""></div>
          </div>

          <div className="">
            <h1 className="text-xl font-bold font-sans lg:text-center ">
              Browser Category
            </h1>
            <ul className="mt-5">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex space-y-3 text-slate-600 justify-between"
                >
                  <span>{category.name}</span>
                  <span>{category.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl font-bold font-sans text-left lg:text-center">
              Recent Post
            </h1>

            <ul className="mt-5">
              {retreats.map((retreat, index) => (
                <li
                  key={index}
                  className="flex gap-7 space-y-3 text-slate-600 justify-between"
                >
                  <div className="">
                    <Image
                      src={retreat.image}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className=" mt-1 gap-1 flex flex-col">
                    <span className="text-base font-semibold text-slate-600">
                      {" "}
                      {retreat.title}
                    </span>
                    <span className="text-sm">{retreat.readingTime}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-7">
            <h1 className="text-xl font-bold font-sans text-left lg:text-center">Get weekly updates</h1>
            <div className="mt-10 flex justify-center items-center flex-col">
                <input
                   
                    placeholder="Enter your email"
                    className="p-3 border border-red-600 rounded-md  w-full focus:outline-none"
                />
                <button className="p-3 text-white mt-5 w-full bg-red-700   hover:bg-red-600">
                    Subscribe
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
