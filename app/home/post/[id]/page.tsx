"use client";

import FeaturedAritcle from "@/components/FeaturedAritcle";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

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
    title:
      "Premier League Clears Chelsea's £76m Sale of Two Hotels to Avoid PSR Breach",
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
    title:
      "Ten Hag Job at Risk Unless Style of Play Starts to Impress United Bosses",
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

const CommentSection = () => {
  return (
    <div
      style={{
        background: "url(/Background-8.png) no-repeat ",
        backgroundSize: "cover",
      }}
      className="lg:p-8 p-2 flex flex-col space-y-8 rounded-lg"
    >
      <h1 className="text-3xl font-semibold">Leave Your Comment:</h1>
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Your message
        </label>
        <textarea
       //@ts-ignore
          rows="8"
          className="block p-2.5 w-full  text-gray-900 text-lg bg-gray-50 rounded-lg border outline-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
    </div>
  );
};

const Comment = () => {
  const comments = [
    {
      id: 1,
      author: "Alice",
      text: "This is the first comment.",
      profileImage: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    },
    {
      id: 2,
      author: "Bob",
      text: "This is the second comment.",
      profileImage: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    },
    {
      id: 3,
      author: "Charlie",
      text: "This is the third comment.",
      profileImage: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    },
  
  ];

  return (
    <div className="border rounded-lg  p-7 w-full">
      <div className="">
        <h1 className="text-xl font-semibold">Comments (02)</h1>
      </div>

      <div className="">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-7 mt-5">
            <div>
              <img
                src={comment.profileImage}
                alt=""
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <h1 className="font-semibold text-lg">{comment.author}</h1>
              <p className="text-gray-500 figtree text-base lg:text-lg">
                {comment.text}
              </p>
              <hr className="my-4 w-full text-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostDetails = () => {
   {/* @ts-ignore */}
  const { currentUser,loading,error: errorMessage,} = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-[1300px] w-[95%] min-h-screen mt-[1rem] lg:p-6 p-2 mx-auto">
        <div className="flex gap-6">
          <div className="lg:w-[70%] w-full">
            <div>
              <Image
                alt=""
                className="rounded-lg"
                width={800}
                height={400}
                src={articles2[3].image}
              />
            </div>
            <div className="mt-6">
              <h6 className="font-semibold">{articles2[3].author}</h6>
            </div>
            <div className="mt-[1rem]">
              <h1 className="lg:text-4xl text-2xl font-bold">
                {articles2[3].title.length > 50
                  ? `${articles2[3].title.substring(0, 50)}...`
                  : articles2[3].title}
              </h1>
            </div>
            <hr className="my-14 w-[98%]" />
            <div className="">
              <p className="text-xl leading-[2.8rem] figtree max-w-3xl">
                {articles2[3].content}
              </p>
            </div>

            <div className="my-24">
              <Comment />
            </div>

            {currentUser && <CommentSection />}
          </div>
          <div className="w-[30%] xl:block  hidden">
            <FeaturedAritcle />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
