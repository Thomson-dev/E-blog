"use client";
import Navbar2 from "@/components/SideNavbar";
import React, { useState, useRef, useMemo, useEffect } from "react";

import "react-quill/dist/quill.snow.css";

const FileUpload = () => {
  return (
    <div className="flex flex-col items-center">
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        accept="image/*"
      />
    </div>
  );
};
//@ts-ignore
const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Ensure the editor's content matches the incoming value prop

    //@ts-ignore
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      //@ts-ignore
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      //@ts-ignore
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      aria-placeholder="Write something..."
      className="border p-2 rounded min-h-60 overflow-y-auto"
      onInput={handleInput}
    ></div>
  );
};

const CreatePost = () => {
  const [editorContent, setEditorContent] = useState("");
//@ts-ignore
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  return (
    <div>
      <Navbar2 />
      <div className="max-w-[1000px] w-[95%] mx-auto py-12 min-h-[85vh]">
        <h1 className="text-3xl py-6 font-semibold text-center">Create Post</h1>

        <form className="flex-col mt-[2rem]">
          <div className="flex gap-6 sm:flex-row flex-col justify-between">
            <input
              type="text"
              placeholder="Title"
              className="w-full py-3 rounded-lg"
            />
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[50%] p-2.5 dark:focus:border-blue-500"
            >
              <option selected>Choose a category</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="flex justify-between sm:w-[70%] w-full mt-8 items-center">
            <div className="w-[100%] gap-4 justify-between flex items-center">
              <FileUpload />

              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Upload Image
              </button>
            </div>
          </div>
          <div className="mt-8">
            <TextEditor value={editorContent} onChange={handleEditorChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
