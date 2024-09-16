'use client'
import React from "react";
import { useEffect, useState } from "react";
import Preloader from "../../components/preloader";
import { useCountdown } from "../../components/useCountdown";


const Comingsoon = () => {
  
  // Set the target date to countdown to
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 25); // 25 days from now
  targetDate.setHours(targetDate.getHours() + 5); // 5 hours from now

  // Use the useCountdown hook
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const Loading = () => {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    };
    Loading();
  }, []);
  return (
    <>
      {Loading ? (
        <Preloader />
      ) : (
        <div className="">
       
          <div className="background flex  h-full justify-center items-center">
            <div className="">
              <h5 className="text-white text-center tracking-widest">
                {" "}
                COMMING SOON{" "}
              </h5>
              <div className="flex space-x-6 mt-[4rem]">
                <div className=" flex flex-col space-y-2 ">
                  <div className="bg-[#0a0b14] border-r border-[#0a0b14] px-4 py-4">
                    <h2 className="text-3xl text-[#ff4674] font-bold ">
                      {days}
                    </h2>
                  </div>
                  <h6 className="text-sm text-white tracking-widest text-center">
                    DAYS
                  </h6>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="bg-[#0a0b14] border-full border-[#0a0b14] px-4 py-4">
                    <h2 className="text-3xl  text-[#ff4674] font-bold">
                      {hours}
                    </h2>
                  </div>
                  <h6 className="text-sm text-white tracking-widest text-center">
                    HOURS
                  </h6>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="bg-[#0a0b14] border-full border-[#0a0b14] px-4 py-4">
                    <h2 className="text-3xl text-[#ff4674] font-bold">
                      {minutes}
                    </h2>
                  </div>
                  <h6 className="text-sm text-white tracking-widest text-center">
                    MINUTES
                  </h6>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="bg-[#0a0b14] border-full border-[#0a0b14] px-4 py-4">
                    <h2 className="text-3xl text-[#ff4674] font-bold">
                      {seconds}
                    </h2>
                  </div>
                  <h6 className="text-sm text-white tracking-widest text-center ">
                    {" "}
                    SECONDS
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer/> */}
        </div>
      )}
    </>
  );
};

export default Comingsoon;