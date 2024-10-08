import { TabItem } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("https://e-blog-api.onrender.com/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex mt-[3rem] flex-col ">
      {posts && posts.slice(0, 4).map((article, index) => (
        <div key={index} className="p-2 flex gap-8">
          <Image
          //@ts-ignore
            src={article.image}
            width={100}
            height={150}
            alt={`Image for article ${index}`}
          />

          <div className="">
            <h1 className="font-bold">
              {/* @ts-ignore */}
              <Link href={`/home/post/${article._id}`}>
              {/* @ts-ignore */}
                {article.title.length > 50
                //@ts-ignore
                  ? `${article.title.substring(0, 30)}...`
                   //@ts-ignore
                  : article.title}
              </Link>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularPost;
