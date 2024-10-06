"use client";

import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from 'react';
import { app } from "../../../firebase";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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

const CreatePost = () => {
  //@ts-ignore
  const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string>('');
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const dispatch = useDispatch();

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
            setImageUploadProgress(null);
             //@ts-ignore
            setImageUploadError(null);
             //@ts-ignore
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
 //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("https://e-blog-api.onrender.com/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      if (res.ok) {
        toast.success("Post uploaded");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="max-w-[1000px] w-[95%] mx-auto py-12 min-h-[95vh]">
        <h1 className="text-3xl py-6 font-semibold text-center">Create Post</h1>

        <form onSubmit={handleSubmit} className="flex-col mt-[2rem]">
          <div className="flex gap-6 sm:flex-row flex-col justify-between">
            <input
              type="text"
              placeholder="Title"
              required
              id="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full py-3 rounded-lg"
            />
            <select
              id="countries"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[50%] p-2.5 dark:focus:border-blue-500"
            >
              <option selected>Choose a category</option>
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
          {/* @ts-ignore */}
            {formData.image && (
              <img
               //@ts-ignore
                src={formData.image}
                alt="upload"
                className="w-[100%] lg:w-[70%] mt-5 h-auto object-cover"
              />
            )}
          </div>

          <div className="mt-8">
            <ReactQuill
              theme='snow'
              placeholder='Write something...'
              className='h-56 -z-40 mb-12'
              //@ts-ignore
              required
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>

          <div className="mt-[5rem] flex justify-start">
            <button type='submit' className="w-fit bg-black text-white px-6 rounded-md py-2">
              {isLoading ? 'Loading ...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;