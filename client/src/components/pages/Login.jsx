import axios from "../store/axios";
import React from "react";
import loginBg from "../../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "./../schema/index";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppStore } from "../store/appStore";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [loginHandler, error] = useAppStore((state) => {
    return [state.loginHandler, state.error];
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginHandler(values, navigate, action);
      },
    });

  return (
    <>
      <div className="flex w-full items-center justify-center sm:h-screen">
        <div
          className={`${
            width < 640 ? "" : "shadows"
          } flex w-full flex-col items-center justify-center rounded-[15px] sm:w-[70%] sm:flex-row`}
        >
          <div className="mb-[90px] flex w-full flex-col items-center justify-center sm:mb-0 sm:h-[650px] sm:w-1/2">
            <h2 className="my-[20px] text-center text-[26px] font-[500]">
              Login
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center justify-center gap-[15px]"
            >
              {error && <h2>{error.message}</h2>}
              <div className="w-[80%] sm:w-[70%] md:w-[60%]">
                <label htmlFor="email" className="text-slate-500">
                  Email
                </label>
                {errors.email && touched.email ? (
                  <p className="text-[14px] text-red-600">{errors.email}</p>
                ) : null}
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border-[2px] border-blue-100 px-[10px] py-[10px] text-[16px] outline-none"
                />
              </div>
              <div className="w-[80%] sm:w-[60%]">
                <label htmlFor="password" className="text-slate-500">
                  Password
                </label>
                {errors.password && touched.password ? (
                  <p className="text-[14px] text-red-600">{errors.password}</p>
                ) : null}
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border-[2px] border-blue-100 px-[10px] py-[10px] text-[16px] outline-none"
                />
              </div>
              <div className="my-[25px] flex items-center justify-center">
                <button
                  type="submit"
                  className="rounded-[4px] bg-blue-950 px-[80px] py-[15px] text-[18px] font-[600] text-white"
                >
                  Login
                </button>
              </div>
              <h2>
                Don't have account ?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer text-red-600"
                >
                  Sign Up
                </span>
              </h2>
            </form>
          </div>
          <div className="order-first h-[350px] w-full sm:order-none sm:h-[650px] sm:w-1/2">
            <img
              src={loginBg}
              alt=""
              className="h-full w-full overflow-hidden object-cover sm:rounded-br-[15px] sm:rounded-tr-[15px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
