import React from "react";

const MobileNav = ({ showNav }) => {
  return (
    <div
      className={`absolute right-0 z-10 h-full ${
        showNav ? "w-1/2" : "w-0"
      } bg-blue-100 transition-all duration-500 ease-in-out`}
    >
      MobileNav
    </div>
  );
};

export default MobileNav;
