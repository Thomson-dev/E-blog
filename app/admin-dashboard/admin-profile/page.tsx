"use client";
import Navbar2 from "@/components/SideNavbar";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from "@/features/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";

//@ts-ignore
const ModalComponent = ({ toggleModal }) => {
  //@ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
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
      dispatch(deleteUserStart());

      const res = await fetch(
        `https://e-blog-api.onrender.com/api/user/delete/${currentUser._id}`,
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
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        localStorage.removeItem("user"); // Clear specific item from local storage
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      //@ts-ignore
      dispatch(deleteUserFailure(error.message));
    }
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

const UserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  //@ts-ignore
  const {currentUser,loading, error: errorMessage,} = useSelector((state) => state.user);
  const router = useRouter();
  //@ts-ignore
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      //@ts-ignore
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // console.log(imageFile, imageFileUrl);
  // console.log(imageFileUploadProgress, imageFileUploadError);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    //    service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    const storage = getStorage(app);
    //@ts-ignore
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    //@ts-ignore
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //@ts-ignore
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        //@ts-ignore
    setImageFileUploadError(   "Could not upload image (File must be less than 2MB)" );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //@ts-ignore
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [currentUser, router]);
  //@ts-ignore
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData)
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      //@ts-ignore
      setUpdateUserError("No changes made");
      toast.error("No changes made");
      return;
    }
    if (imageFileUploading) {
      //@ts-ignore
      setUpdateUserError("Please wait for image to upload");
      toast.error("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `https://e-blog-api.onrender.com/api/user/update/${currentUser._id}`,
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
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        toast.error(data.message);
      } else {
        dispatch(updateSuccess(data));
        //@ts-ignore
        setUpdateUserSuccess("User's profile updated successfully");
        toast.success("User's profile updated successfully");
      }
    } catch (error) {
      //@ts-ignore
      dispatch(updateFailure(error.message));
      //@ts-ignore
      setUpdateUserError(error.message);
      //@ts-ignore
      toast.error(error.message);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Redirect to login if currentUser is null after account deletion
  if (!currentUser) {
    return null; // or you can redirect the user to the login page immediately here
  }

  return (
    <div className="">
      <Navbar2 />
      <form
        onSubmit={handleSubmit}
        className="max-w-[1400px] bg-white pt-[2rem] rounded-md mx-auto py-10"
      >
        <div className="flex justify-center gap-5 flex-col items-center">
          <h2 className="text-center text-xl font-bold">Profile</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            //@ts-ignore
            ref={filePickerRef}
            hidden
          />
          <div
            className="cursor-pointer"
            //@ts-ignore
            onClick={() => filePickerRef.current.click()}
          >
            <Image
              src={imageFileUrl || (currentUser && currentUser.profilePicture)}
              className="rounded-full"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="mt-[3rem]">
          <div className="max-w-[900px] w-[96%] px-3 py-7 mx-auto">
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col  ">
                <h4 className="mb-2 lg:mb-2" >Username</h4>
                <input
                  id="username"
                  type="text"
                  className="w-full py-3 outline-none rounded-md bg-[#F3F4F6]"
                  //@ts-ignore
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <h4 className="mb-2">Email</h4>
                <input
                  id="email"
                  type="email"
                  
                  className="w-full py-3 outline-none rounded-md bg-[#F3F4F6]"
                  //@ts-ignore
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <h4 className="mb-2">Password</h4>
                <input
                  id="password"
                  type="password"
                  className="w-full py-3 outline-none rounded-md bg-[#F3F4F6]"
                  //@ts-ignore
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end mt-8 items-center">
                <div className="flex gap-[10rem] justify-between items-center">
                  <div>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="bg-red-800 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading || imageFileUploading}
                      className="bg-[#10B981] text-white px-4 py-2 rounded-md"
                    >
                      {loading ? "Loading..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
     
     
      {showModal && <ModalComponent toggleModal={toggleModal} />}
      <Footer/>
    </div>
  );
};

export default UserDashboard;
