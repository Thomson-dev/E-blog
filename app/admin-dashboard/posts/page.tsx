"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Navbar2 from "@/components/Navbar2";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../../../firebase";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";

import ReactQuill from "react-quill";
import Link from "next/link";
//@ts-ignore
const FileUpload = ({ setFile }) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        //@ts-ignore
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
    </div>
  );
};

//@ts-ignore
const ModalComponent = ({ toggleModal, postId }) => {
  //@ts-ignore
  const {currentUser,loading,error: errorMessage,} = useSelector((state) => state.user);

  
//@ts-ignore
  const handleBackgroundClick = (e) => {
    if (e.target.id === "popup-modal") {
      toggleModal();
    }
  };

  const handleDeleteUser = async () => {
    if (!currentUser) {
      console.error("No current user found");
      return;
    }

    try {
      const res = await fetch(
        `https://e-blog-api.onrender.com/api/post/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Post deleted");
      }
    } catch (error) {}
  };

  const handleDeleteAndToggleModal = () => {
    handleDeleteUser();
    toggleModal();
  };

  return (
    <div
      id="popup-modal"
      //@ts-ignore
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
      onClick={handleBackgroundClick}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div
          className="relative bg-white rounded-lg shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={toggleModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete your account?
            </h3>
            <button
              type="button"
              onClick={handleDeleteAndToggleModal}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//@ts-ignore
const Editpost = ({ isOpen, postId }) => {
  //@ts-ignore
  const { currentUser, loading, error: errorMessage,} = useSelector((state) => state.user);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploadError, setImageUploadError] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://e-blog-api.onrender.com/api/post/getPost/${postId}`
        );
        const data = await res.json();

        if (data) {
          setFormData({
            title: data.title || "",
            category: data.category || "",
            content: data.content || "",
            image: data.image || "",
          });
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        //@ts-ignore
        console.error("Error fetching post:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://e-blog-api.onrender.com/api/post/update/${postId} `,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Post updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        toast.error("Please select an image");
        return;
      }
      //@ts-ignore
      setImageUploadError(null);
      const storage = getStorage(app);
      //@ts-ignore
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //@ts-ignore
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
          toast.error("Image upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //@ts-ignore
            setImageUploadProgress(null);
            //@ts-ignore
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            toast.success("Image uploaded successfully");
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      toast.error("Image upload failed");
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 w-[85%] z-50 bg-white h-full overflow-y-scroll ${
        isOpen
          ? "right-0 duration-1000 delay-75"
          : "-right-[80rem] duration-1000 delay-75"
      }`}
    >
      <div className="max-w-[900px] w-[95%] mx-auto py-12 overflow-y-auto">
        <h1 className="text-3xl py-6 font-semibold text-center">Edit Post</h1>

        <form onSubmit={handleSubmit} className="flex-col mt-[2rem]">
          <div className="flex gap-6 sm:flex-row flex-col justify-between">
            <input
              type="text"
              placeholder="Title"
              required
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full py-3 rounded-lg"
            />
            <select
              id="countries"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[50%] p-2.5 dark:focus:border-blue-500"
            >
              <option value="">Choose a category</option>
              <option value="Football">Football</option>
            </select>
          </div>

          <div className="flex justify-between sm:w-[70%] w-full mt-8 items-center">
            <div className="w-[100%] gap-4 justify-between flex-col md:flex-row flex">
              <FileUpload setFile={setFile} />

              <button
                onClick={handleUploadImage}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Upload Image
              </button>
            </div>
          </div>

          <div className="flex justify-start items-start">
            {formData.image && (
              <img
                src={formData.image}
                alt="upload"
                className="w-[100%] lg:w-[70%] mt-5 h-auto object-cover"
              />
            )}
          </div>

          <div className="mt-8">
            <ReactQuill
              theme="snow"
              onChange={(value) => setFormData({ ...formData, content: value })}
              className="h-56 mb-12"
            />
          </div>

          <div className="mt-[5rem] flex justify-start">
            <button
              type="submit"
              className="w-fit bg-black text-white px-6 rounded-md py-2"
            >
              {isLoading ? "Loading ..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //@ts-ignore
  const toggleSidebar = (postId) => {
    setSelectedPostId(postId);
    setIsOpen(!isOpen);
  };
//@ts-ignore
  const toggleModal = (postId) => {
    setSelectedPostId(postId);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(
        "https://e-blog-api.onrender.com/api/post/getPosts"
      );
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(posts.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPosts = posts.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-[100%] bg-gray-50 min-h-screen overflow-clip">
      <Navbar2 />

      <div className="mx-auto mt-[2rem] flex flex-col w-[95%] 2xl:max-w-full max-w-[1150px]">
        <div className="overflow-x-auto">
          <table className="table-auto border w-full border-collapse divide-y px-3 divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Post Image</th>
                <th className="px-4 hidden lg:table-cell py-2">Post Title</th>
                <th className="py-3">Delete</th>
                <th className="py-3">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {currentPosts.map((item, index) => (
                <tr key={index}>
                  <td className="text-sm lg:text-base px-4 py-2">
                  {/* @ts-ignore */}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {/* @ts-ignore */}
                    <Image src={item.image} width={100} height={100} alt="" />
                  </td>
                  <td className="px-4 text-base hidden lg:table-cell py-2">
                    {/* @ts-ignore */}
                    {item.title}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-white px-2 py-1 rounded">
                      <MdDelete
                      // @ts-ignore
                        onClick={() => toggleModal(item._id)}
                        className="text-2xl text-red-600"
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                    // @ts-ignore
                      onClick={() => toggleSidebar(item._id)}
                      className="text-white px-2 py-1 rounded"
                    >
                      <FaEdit className="text-2xl text-green-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Editpost
        isOpen={isOpen}
        postId={selectedPostId}
        //@ts-ignore
        toggleModal={toggleModal}
      />

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed z-40 top-0 left-0 w-full h-full bg-[#00000080]"
        ></div>
      )}

      <div className="flex max-w-[1200px] w-[95%] mx-auto justify-start items-start">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          maxWidth={5}
          onPageChange={setCurrentPage}
          className="flex gap-4 text-[16px] border-blue-500 w-full py-10 justify-start"
          pageItemClassName="w-[10vw] md:w-[3vw] text-center rounded-[4px] text-black border"
          activeItemClassName="border-[blue] page-item"
          disabledItemClassName="text-gray-400"
          nextClassName="active:bg-green-700"
        />
      </div>

      {showModal && (
        <ModalComponent toggleModal={toggleModal} postId={selectedPostId} />
      )}
    </div>
  );
};

export default Page;
