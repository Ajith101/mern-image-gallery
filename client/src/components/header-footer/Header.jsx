import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./../../hooks/useLocalStorage";
import { useAppStore } from "../store/appStore";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const { user, logoutHandler } = useAppStore((state) => {
    return {
      user: state.user,
      logoutHandler: state.logoutHandler,
    };
  });

  const navigate = useNavigate();
  const navData = [
    { name: "Sign In", to: "/login" },
    { name: "Sign Up", to: "/register" },
  ];
  const displayNavLinks = navData.map((item, id) => {
    return (
      <NavLink
        onClick={() => setShowNav(false)}
        key={id}
        to={item.to}
        style={{ textAlign: "center", width: "100%" }}
        className={({ isActive }) =>
          isActive
            ? `bg-pink-100 p-[10px] font-[700] text-slate-950 sm:h-full sm:p-[25px]`
            : ""
        }
      >
        {item.name}
      </NavLink>
    );
  });

  const showUserName = user ? user?.firstName?.toUpperCase() : null;

  return (
    <>
      <div className="relative m-[5px] flex h-full items-center justify-between px-[10px] shadow sm:m-[20px] sm:px-[90px]">
        <div>
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="py-[10px] text-center text-[22px] font-[700] text-slate-700"
          >
            Photo Gallery <br /> App
          </h1>
        </div>

        <div className="flex items-center justify-center gap-[10px] sm:hidden">
          {showUserName}
          {showNav ? (
            <TfiClose
              size={"25px"}
              className="text-red-700 sm:hidden"
              onClick={() => setShowNav(!showNav)}
            />
          ) : (
            <GiHamburgerMenu
              size={"25px"}
              className="sm:hidden"
              onClick={() => setShowNav(!showNav)}
            />
          )}
        </div>
        <ul className="hidden h-full items-center justify-center gap-[15px] sm:flex">
          {showUserName}{" "}
          <NavLink
            onClick={() => setShowNav(false)}
            to="/"
            style={{ textAlign: "center", width: "100%" }}
            className={({ isActive }) =>
              isActive
                ? `bg-pink-100 p-[10px] font-[700] text-slate-950 hover:bg-pink-500 hover:text-white sm:h-full sm:p-[25px]`
                : ""
            }
          >
            Home
          </NavLink>
          {user ? null : (
            <>
              <NavLink
                onClick={() => setShowNav(false)}
                to="/login"
                style={{ textAlign: "center", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `bg-pink-100 p-[10px] font-[700] text-slate-950 hover:bg-pink-500 hover:text-white sm:h-full sm:p-[25px]`
                    : ""
                }
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setShowNav(false)}
                to="/register"
                style={{ textAlign: "center", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `bg-pink-100 p-[10px] font-[700] text-slate-950 hover:bg-pink-500 hover:text-white sm:h-full sm:p-[25px]`
                    : ""
                }
              >
                Register
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <div
        className={`shadows absolute z-10 h-full w-[70%] sm:hidden ${
          showNav ? "left-0" : "left-[-100%]"
        } bg-white font-[500] text-slate-700 transition-all duration-500 ease-in`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-[15px] text-center">
          <NavLink
            onClick={() => setShowNav(false)}
            to="/"
            style={{ textAlign: "center", width: "100%" }}
            className={({ isActive }) =>
              isActive
                ? `bg-pink-100 p-[10px] font-[700] text-slate-950 sm:h-full sm:p-[25px]`
                : ""
            }
          >
            Home
          </NavLink>
          {user ? null : displayNavLinks}
          {user && (
            <button
              onClick={() => logoutHandler(setShowNav)}
              className="my-[25px] rounded-full bg-pink-100 px-[35px] py-[10px] text-center font-[600] text-slate-900 hover:bg-pink-950 hover:text-white"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
