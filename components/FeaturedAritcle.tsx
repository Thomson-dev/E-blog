import Image from "next/image";
import React from "react";
import PopularPost from "./PopularPost";

const FeaturedAritcle = () => {
  return (
    <div>
      <div className="bg-[#F6F6F6] p-3">
        <h6 className="text-center">About Me</h6>
      </div>

      <div className=" inline-block overflow-hidden mt-5 object-cover">
        <Image
          src={"/featured.jpeg"}
          alt=""
          width={400}
          height={500}
          className="hover:scale-110 transition-transform duration-500 object-cover"
        />
        <div className="flex justify-center items-center mt-5 flex-col">
          <h1 className="text-xl font-semibold">Ronal Sipra</h1>
          <p className="max-w-xs text-lg mt-2 text-center">
            28 yrs old, from Salé, tortor quam sed ipsum ut montes.
          </p>
        </div>

        <div className="mt-[3rem]">
          <div className="bg-[#F6F6F6] p-3">
            <h6 className="text-center">Popular Post</h6>
           
          </div>
          <PopularPost />
        </div>
      </div>
    </div>
  );
};

export default FeaturedAritcle;
