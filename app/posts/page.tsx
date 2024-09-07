"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Background from "../../public/background.jpg";
import React from "react";
import img from "../../public/116.jpg";
import img2 from "../../public/117.jpg";
import img3 from "../../public/118.jpg";
import Slider from "../../components/Slider";
import Footer from "@/components/Footer";
import Article from "@/components/Article";
import FeaturedAritcle from "@/components/FeaturedAritcle";
import Link from "next/link";

const Posts = () => {
  const articles = [
    {
      category: "Football",
      title: "A Soccer Spectacle in São Paulo Target USA CUP",
      author: "Thomson",

      image: img, // Add the image path here
    },
    {
      category: "Body Builder",
      title: "These Insta Account Having a Personal Trainer Only",
      author: "Thomson",

      image: img2, // Add the image path here
    },
    {
      category: "Golf",
      title: "I Worked Out in Only a Sports Bra for the First Time Ever",
      author: "Thomson",

      image: img3, // Add the image path here
    },
  ];

  const articles2 = [
    {
      id: 1,
      title: "Napoli and Galatasaray Confirm Osimhen Loan Deal",
      author: "Sports News",
      views: 1900,
      category: "Sports",
      content: `Napoli and Galatasaray have confirmed that Nigeria striker Victor Osimhen has joined Galatasaray on loan until the end of the 2024-25 season. 
                  Napoli also secured a one-year contract extension with Osimhen, keeping him tied to the club until June 2027. 
                  Despite interest from Chelsea and Al-Ahli, Osimhen opted for a move to Turkey.
                  The Nigerian has scored 76 goals in 133 appearances for Napoli and played a key role in their 2022-23 Serie A title win.`,
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/77ba/live/0c17f450-6aeb-11ef-bca3-61f7b73970e9.jpg.webp",
    },
    {
      id: 2,
      title: "Premier League Clears Chelsea's £76m Sale of Two Hotels to Avoid PSR Breach",
      author: "Kaveh Solhekol",
      views: 1900,
      category: "Sports",
      content: `The Premier League has cleared the sale of two Stamford Bridge hotels by Chelsea's owners to an associated company.
                  The Millennium and Copthorne hotels were sold by Chelsea FC Holdings Ltd to BlueCo 22 Properties Ltd in June 2023. Both companies are ultimately owned by BlueCo 22 Ltd, Chelsea's holding company.
                  This sale ensures Chelsea avoids breaching the Premier League's spending rules.`,
      image:
        "https://e0.365dm.com/24/07/1600x900/skysports-chelsea-stamford-bridge_6629885.jpg?20240717200703",
    },
    {
      id: 3,
      title: "Ten Hag Job at Risk Unless Style of Play Starts to Impress United Bosses",
      author: "The Guardian",
      views: 1900,
      category: "Sports",
      content: `Erik ten Hag's style of play is coming under scrutiny at Manchester United from the INEOS-led football department at the club. 
                  The Dutchman's tactics reportedly have to start impressing soon or he will risk losing his job at Old Trafford, according to The Guardian.
                  The football department, overseen by Sir Jim Ratcliffe and led by sporting director Dan Ashworth and technical director Jason Wilcox, is not satisfied with United's performances this season, with losses to Brighton and Liverpool.
                  While Ten Hag has received backing from Ashworth and chief executive Omar Berrada, he must demonstrate his team's ability to dominate games to secure his future.`,
      image:
        "https://liveblog.digitalimages.sky/lc-images-sky/lcimg-62e452b8-a75b-4182-b635-e26ae1305c2b.jpg",
    },
    {
      id: 4,
      title: "Real Madrid to Make Move for Rodri Next Summer?",
      author: "AS",
      views: 1900,
      category: "Sports",
      content: `Real Madrid have made signing Manchester City midfielder Rodri a top priority for next summer, according to Spanish outlet AS. 
                  The Spain international is under contract with the Premier League champions until 2027 and is valued at around £109m. 
                  Real Madrid, having signed Kylian Mbappe this summer and Jude Bellingham the previous year for a deal potentially exceeding £115m, are aiming to further bolster their squad.`,
      image: "https://www.espn.com/photo/2024/0830/r1379876_1296x729_16-9.jpg",
    },

    {
        id: 1,
        title: "Napoli and Galatasaray Confirm Osimhen Loan Deal",
        author: "Sports News",
        views: 1900,
        category: "Sports",
        content: `Napoli and Galatasaray have confirmed that Nigeria striker Victor Osimhen has joined Galatasaray on loan until the end of the 2024-25 season. 
                    Napoli also secured a one-year contract extension with Osimhen, keeping him tied to the club until June 2027. 
                    Despite interest from Chelsea and Al-Ahli, Osimhen opted for a move to Turkey.
                    The Nigerian has scored 76 goals in 133 appearances for Napoli and played a key role in their 2022-23 Serie A title win.`,
        image:
          "https://ichef.bbci.co.uk/news/976/cpsprodpb/77ba/live/0c17f450-6aeb-11ef-bca3-61f7b73970e9.jpg.webp",
      },
      {
        id: 2,
        title: "Premier League Clears Chelsea's £76m Sale of Two Hotels to Avoid PSR Breach",
        author: "Kaveh Solhekol",
        views: 1900,
        category: "Sports",
        content: `The Premier League has cleared the sale of two Stamford Bridge hotels by Chelsea's owners to an associated company.
                    The Millennium and Copthorne hotels were sold by Chelsea FC Holdings Ltd to BlueCo 22 Properties Ltd in June 2023. Both companies are ultimately owned by BlueCo 22 Ltd, Chelsea's holding company.
                    This sale ensures Chelsea avoids breaching the Premier League's spending rules.`,
        image:
          "https://e0.365dm.com/24/07/1600x900/skysports-chelsea-stamford-bridge_6629885.jpg?20240717200703",
      },
      {
        id: 3,
        title: "Ten Hag Job at Risk Unless Style of Play Starts to Impress United Bosses",
        author: "The Guardian",
        views: 1900,
        category: "Sports",
        content: `Erik ten Hag's style of play is coming under scrutiny at Manchester United from the INEOS-led football department at the club. 
                    The Dutchman's tactics reportedly have to start impressing soon or he will risk losing his job at Old Trafford, according to The Guardian.
                    The football department, overseen by Sir Jim Ratcliffe and led by sporting director Dan Ashworth and technical director Jason Wilcox, is not satisfied with United's performances this season, with losses to Brighton and Liverpool.
                    While Ten Hag has received backing from Ashworth and chief executive Omar Berrada, he must demonstrate his team's ability to dominate games to secure his future.`,
        image:
          "https://liveblog.digitalimages.sky/lc-images-sky/lcimg-62e452b8-a75b-4182-b635-e26ae1305c2b.jpg",
      },
      {
        id: 4,
        title: "Real Madrid to Make Move for Rodri Next Summer?",
        author: "AS",
        views: 1900,
        category: "Sports",
        content: `Real Madrid have made signing Manchester City midfielder Rodri a top priority for next summer, according to Spanish outlet AS. 
                    The Spain international is under contract with the Premier League champions until 2027 and is valued at around £109m. 
                    Real Madrid, having signed Kylian Mbappe this summer and Jude Bellingham the previous year for a deal potentially exceeding £115m, are aiming to further bolster their squad.`,
        image: "https://www.espn.com/photo/2024/0830/r1379876_1296x729_16-9.jpg",
      },
  ];

  return (
    <div>
      <Navbar />

      <div className="max-w-[1300px] w-[95%] mt-[1rem]  mx-auto">
        <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  ">
          {articles.map((item, index) => (
            <div key={index} className="relative">
              <div className="inline-block overflow-hidden ">
                <Image
                  src={item.image}
                  width={500}
                  className="hover:scale-110 transition-transform duration-500"
                  height={550}
                  alt={item.title}
                />

                <div className="absolute text-white bottom-10 left-4">
                  <div className=" w-fit px-4 bg-red-600 ">
                    <span className="text-sm">{item.category}</span>
                  </div>

                  <h1 className="text-2xl font-bold  mt-3">{item.title}</h1>
                  <div className="mt-3">
                    <p>{item.author}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 
        <div className="relative  my-10">
          <div className="w-ful real h-auto">
            <Image
              src={Background}
              alt="Background Image"
              fill
              className="object-contain "
            />
          </div>

          <div className="absolute w-full h-full top-0 bg-black opacity-80 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center  p-4 rounded-lg">
              <div className="text-white mb-4 md:mb-0">
                <h1 className="text-2xl font-extrabold tracking-tight font-serif uppercase text-white">
                  Join our newsletter for the latest updates!
                </h1>
              </div>
              <div className="flex gap-3 justify-between items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 border-none focus:outline-none"
                />
                <button className="p-2 bg-red-700   hover:bg-red-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="mt-[8rem] ">
          <h1 className="text-3xl font-bold text-center">Top Category</h1>

          <div className="">
            <Slider />
          </div>
        </div>

        <div className="my-[5rem] w-full  flex gap-6 ">
          <div className="xl:w-[70%] w-full ">
            <div className="w-full py-10  min-h-[40rem] border lg:px-10 px-2 rounded-lg ">
              <div className=" sm:grid-cols-2 grid-cols-1 gap-9 gap-y-16 grid">
                {articles2.map((article, index) => (
                  <div className="">
                    <div className="inline-block overflow-hidden">
                      <img
                        src={article.image}
                        alt=""
                        className="w-full h-[18rem] hover:scale-110 transition-transform duration-500 object-cover rounded-t-lg"
                      />
                    </div>

                    <div className="flex my-3 gap-4">
                      <h4 className="font-semibold">{article.author}</h4>
                    </div>

                    <div className="">
                      <h1 className="text-xl font-bold">
                        <Link href={`/home/post/${article.id}`}>
                          {article.title}
                        </Link>
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" w-[28%] xl:block  hidden">
            <FeaturedAritcle />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Posts;
