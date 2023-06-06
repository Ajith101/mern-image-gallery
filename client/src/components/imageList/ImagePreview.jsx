import React from "react";

const ImagePreview = ({ popup, setShowImage }) => {
  return (
    <>
      <div className="fixed left-[50%] top-[50%] z-50 flex w-[650px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-[10px] bg-white p-[8px] shadow-xl md:p-[25px]">
        <h1 className="mb-[23px] text-[20px] font-[300] text-slate-600 sm:text-[32px] md:mb-[50px]">
          Image Preview
        </h1>
        <img
          src={popup}
          className="h-[210px] w-full bg-[10%] object-cover sm:h-[350px]"
          alt=""
        />
        <div
          onClick={() => setShowImage(false)}
          className="absolute right-[15px] top-[15px] flex cursor-pointer items-center justify-center rounded-[5px] bg-black px-[6px] py-[4px] text-center text-[16px] font-[400] text-white hover:opacity-80"
        >
          X
        </div>
        <div
          onClick={() => setShowImage(false)}
          className="mt-[10px] cursor-pointer rounded-[4px] bg-orange-700 px-[40px] py-[8px] text-center text-[16px] text-white hover:opacity-75 sm:px-[60px] sm:py-[15px] md:mt-[20px]"
        >
          Close
        </div>
      </div>
      <div className="fixed left-0 top-0 h-full w-full bg-[#00000080]"></div>
    </>
  );
};

export default ImagePreview;
