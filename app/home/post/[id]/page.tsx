"use client";

import FeaturedAritcle from "@/components/FeaturedAritcle";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../../../../components/preloader";
import Link from "next/link";
import { toast } from "react-toastify";

//@ts-ignore
const CommentSection = ({ postId, comments, setComments }) => {
  const [comment, setComment] = useState("");
  //@ts-ignore
  const { currentUser } = useSelector((state) => state.user);
//@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const response = await fetch("https://e-blog-api.onrender.com/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setComment("");
        setComments([data, ...comments]);
        toast.success("Comment added successfully");
      }
    } catch (error) {
      toast.error("Error adding comment:");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "url(/Background-8.png) no-repeat ",
        backgroundSize: "cover",
      }}
      className="lg:p-8 p-2 flex flex-col space-y-8 rounded-lg"
    >
      <h1 className="lg:text-3xl text-lg font-semibold">Leave Your Comment:</h1>
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Your message
        </label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          id="message"
          //@ts-ignore
          rows="8"
          className="block p-2.5 w-full text-gray-900 text-base bg-gray-50 rounded-lg border outline-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-950 lg:text-base text-sm ">
            {200 - comment.length} characters remaining
          </p>
          <button
            className="w-fit bg-black px-7 py-2 rounded-md text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  //@ts-ignore
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://e-blog-api.onrender.com/api/post/getPost/${id}`);
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://e-blog-api.onrender.com/api/comment/getPostComments/${id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostDetails();
    fetchComments();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <Navbar />
          <div className="max-w-[1300px] w-[95%] min-h-screen mt-[1rem] lg:p-6 p-2 mx-auto">
            <div className="flex gap-6">
              <div className="lg:w-[70%] w-full">
                <div>
                  <Image
                    alt=""
                    className="rounded-lg w-full h-auto"
                    width={800}
                    height={1000}
                    //@ts-ignore
                    src={post.image}
                  />
                </div>
                <div className="mt-6">
                {/* @ts-ignore */}
                  <h6 className="font-semibold">{post.author}</h6>
                </div>
                <div className="mt-[1rem]">
                  <h1 className="lg:text-4xl max-w-3xl text-2xl leading-8 font-bold">
                  {/* @ts-ignore */}
                    {post.title}
                  </h1>
                </div>
                <hr className="my-5 w-[98%]" />
                <div className=" ">
                

                  <div className="">
                        {/* @ts-ignore */}
                    <div className="lg:text-lg text-base leading-[2rem] lg:leading-[2.3rem] max-w-3xl  figtree  "  dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>

                <div className="my-24">
                  <div className="border rounded-lg p-3 lg:p-7 w-full">
                    <div>
                      <h1 className="text-xl font-semibold">Comments ({comments.length})</h1>
                    </div>
                    <div>
                      {comments.map((comment) => (
                        //@ts-ignore
                        <div key={comment.id} className="flex gap-7 mt-5">
                          <div>
                          
                            <img
                            //@ts-ignore
                              src={comment.profileImage}
                              alt=""
                              className="w-16 h-14 rounded-full"
                            />
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            {/* @ts-ignore */}
                            <h1 className="font-semibold text-lg">{comment.author}</h1>
                            {/* @ts-ignore */}
                            <p className="text-gray-500 figtree text-base">{comment.content}</p>
                            <hr className="my-4 w-full text-gray-800" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {currentUser ? (
                  <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <Link
                      href={`/user-dashboard`}
                      className="text-xs text-cyan-600 hover:underline"
                    >
                      @{currentUser.username}
                    </Link>
                  </div>
                ) : (
                  <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to comment.
                    <Link
                      className="text-blue-500 hover:underline"
                      href={"/login"}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
                {/* @ts-ignore */}
                {currentUser && <CommentSection postId={post._id} comments={comments} setComments={setComments} />}
              </div>
              <div className="w-[30%] xl:block hidden">
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

export default PostDetails;