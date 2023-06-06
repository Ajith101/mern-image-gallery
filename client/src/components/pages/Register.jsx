import React from "react";
import loginBg from "../../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import axios from "../store/axios";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppStore } from "../store/appStore";

const initialValues = {
  firstName: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [registerHandler, error] = useAppStore((state) => {
    return [state.registerHandler, state.error];
  });

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        registerHandler(values, navigate, action);
      },
    });

  return (
    <div className="flex w-full items-center justify-center sm:h-screen">
      <div
        className={`${
          width < 640 ? "" : "shadows"
        } flex w-full flex-col items-center justify-center rounded-[15px] sm:w-[70%] sm:flex-row`}
      >
        <div className="mb-[90px] flex w-full flex-col items-center justify-center sm:mb-0 sm:h-[700px] sm:w-1/2">
          <h2 className="my-[20px] text-center text-[26px] font-[500]">
            Register
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-center gap-[15px]"
          >
            {error && <h2>{error.message}</h2>}
            <div className="w-[80%] sm:w-[60%]">
              <label htmlFor="firstName" className="text-slate-500">
                First Name
              </label>
              {errors.firstName && touched.firstName ? (
                <p className="text-red-600">{errors.firstName}</p>
              ) : null}
              <input
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full rounded-[10px] border-[2px] border-blue-100 px-[10px] py-[10px] text-[16px] outline-none"
              />
            </div>
            <div className="w-[80%] sm:w-[60%]">
              <label htmlFor="email" className="text-slate-500">
                Email
              </label>
              {errors.email && touched.email ? (
                <p className="text-red-600">{errors.email}</p>
              ) : null}
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                id="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full rounded-[10px] border-[2px] border-blue-100 px-[10px] py-[10px] text-[16px] outline-none"
              />
            </div>
            <div className="w-[80%] sm:w-[60%]">
              <label htmlFor="password" className="text-slate-500">
                Password
              </label>
              {errors.password && touched.password ? (
                <p className="text-red-600">{errors.password}</p>
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
            <div className="w-[80%] sm:w-[60%]">
              <label htmlFor="confirm_password" className="text-slate-500">
                Confirm Password
              </label>
              {errors.confirm_password && touched.confirm_password ? (
                <p className="text-red-600">{errors.confirm_password}</p>
              ) : null}
              <input
                type="password"
                placeholder="Enter Password"
                name="confirm_password"
                id="confirm_password"
                value={values.confirm_password}
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
                Submit
              </button>
            </div>
            <h2>
              Already have account ?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-red-600"
              >
                Sign In Now
              </span>
            </h2>
          </form>
        </div>
        <div className="order-first h-[350px] w-full sm:order-none sm:h-[700px] sm:w-1/2">
          <img
            src={loginBg}
            alt=""
            className="h-full w-full overflow-hidden object-cover sm:rounded-br-[15px] sm:rounded-tr-[15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
