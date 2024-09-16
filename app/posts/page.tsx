"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Background from "../../public/background.jpg";
import React, { useEffect, useState } from "react";
import img from "../../public/116.jpg";
import img2 from "../../public/117.jpg";
import img3 from "../../public/118.jpg";
import Slider from "../../components/Slider";
import Footer from "@/components/Footer";
import Preloader from "../../components/preloader";
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
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <div className="">
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
                    {posts.map((article, index) => (
                      //@ts-ignore
                      <Link href={`/home/post/${article._id}`} className="">
                        <div className="inline-block overflow-hidden">
                          
                          <img
                          //@ts-ignore
                            src={article.image}
                            alt=""
                            className="w-full h-[18rem] hover:scale-110 transition-transform duration-500 object-cover rounded-t-lg"
                          />
                        </div>

                        <div className="flex my-3 gap-4">
                          {/* @ts-ignore */}
                          <h4 className="font-semibold">{article.author}</h4>
                        </div>

                        <div className="">
                          <h1 className="text-xl font-bold">
                            {/* @ts-ignore */}
                            <Link href={`/home/post/${article._id}`} >
                            {/* @ts-ignore */}
                              {article.title}
                            </Link>
                          </h1>
                        </div>
                      </Link>
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
      )}
    </div>
  );
};

export default Posts;
