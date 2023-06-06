import React, { useEffect, useState } from "react";
import axios from "./store/axios";
import ImagePreview from "./imageList/ImagePreview";
import Images from "./imageList/Images";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppStore } from "./store/appStore";
import LoadingSpinner from "./spinner/LoadingSpinner";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const [imageDetail, setImageDetail] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [popup, setPopup] = useState("");
  const [auth, setAuth] = useState(false);

  const [fetchAllImages, allPosts, loading, createNewPost, upload, user] =
    useAppStore((state) => {
      return [
        state.fetchAllImages,
        state.allPosts,
        state.loading,
        state.createNewPost,
        state.upload,
        state.user,
      ];
    });

  useEffect(() => {
    fetchAllImages();
  }, []);

  const imageUploadHandler = (event) => {
    if (!user) {
      return console.log("Login First");
    }
    createNewPost(event);
  };

  const displayAllImages = allPosts?.map((item) => {
    return (
      <Images
        setPopup={setPopup}
        setShowImage={setShowImage}
        item={item}
        key={item._id}
      />
    );
  });

  return (
    <div className="mb-[84px] flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[90%] flex-col items-center sm:w-[80%] lg:w-[946px]">
        <h1 className="mt-[81px] text-[32px] font-[400] md:mb-[12px] md:text-[50px]">
          Photo Gallery
        </h1>
        <h3 className="text-[18px] font-[300] text-[#ACACAC] sm:mb-[76px] sm:text-[32px]">
          A picture is worth thousand words.
        </h3>
        <form className="flex flex-col items-center justify-center">
          {imageDetail && (
            <img
              src={URL.createObjectURL(imageDetail)}
              className="h-[120px] w-[120px] object-cover"
              alt=""
            />
          )}
          {auth ? (
            <p className="text-center text-red-600">Please login to upload</p>
          ) : null}
          <label
            onClick={() => {
              if (!user?.firstName) {
                setAuth(true);
              }
            }}
            htmlFor={`${user?.firstName ? "upload_file" : ""}`}
            className="mt-[20px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-[1px] border-[#EED8C0] text-center text-[30px] font-[300] text-[#EED8C0]"
          >
            +
          </label>
          {imageDetail && (
            <h3 className="text-[22px] font-[400] text-[#ACACAC]">
              {imageDetail?.name}
            </h3>
          )}
          <input
            onChange={imageUploadHandler}
            type="file"
            name="upload_file"
            id="upload_file"
            className="invisible"
          />
        </form>
        {upload && (
          <div className="flex w-full items-center gap-[10px]">
            <div
              style={{ width: `${upload}%` }}
              className={`mb-[33px] mt-[27px] h-[7px] rounded-[10px] bg-[#EFD9C2] transition-all`}
            ></div>
            <h3 className="text-[16px]">
              {upload}
              {"%"}
            </h3>
          </div>
        )}
        <div>{loading ? <LoadingSpinner /> : null}</div>
        <div className="relative grid h-full w-full grid-cols-2 gap-[10px] sm:grid-cols-3 md:gap-[23px]">
          {displayAllImages}{" "}
          {showImage && (
            <ImagePreview popup={popup} setShowImage={setShowImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
