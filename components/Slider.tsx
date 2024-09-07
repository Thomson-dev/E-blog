import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import "swiper/css/autoplay";
import Image from "next/image";

const Slider = () => {
  const images = [
    "/category-25.png",
    "/category-26.png",
    "/category-27.png",
    "/category-28.png",
    "/category-29.png",
    "/category-30.png",
    "/category-25.png",
    "/category-26.png",
    "/category-27.png",
  ];

  return (
    <Swiper
      modules={[  A11y, Autoplay]}
      spaceBetween={0}
      breakpoints={{
        300: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
       
      }}
      slidesPerView={5}
      effect={"fade"}
      className="mt-9"
      speed={1000}
      autoplay={{ delay: 2000 }}
     
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center gap-14  justify-center">
            <Image src={image} alt={image} className=""   width={170} height={190} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
