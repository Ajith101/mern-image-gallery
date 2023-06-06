import axios from "./axios";
import { create } from "zustand";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userExist = user ? JSON.parse(user) : null;

export const useAppStore = create((set) => {
  return {
    loading: false,
    error: null,
    user: userExist,
    allPosts: [],
    fileName: null,
    upload: "",
    logoutHandler: (setShowNav) => {
      localStorage.clear();
      setShowNav(false);
      set(() => ({ user: null }));
      toast.success("Logout Succesfully");
    },
    fetchAllImages: async () => {
      set(() => ({ loading: true }));
      try {
        const response = await axios.get("/api/images");
        set(() => ({ allPosts: response.data, loading: false }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },
    createNewPost: async (event) => {
      set(() => ({ loading: true }));
      try {
        let images;
        let fileName;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = async () => {
          if (reader.readyState === 2) {
            images = reader.result;
            fileName = event.target.files[0].name;
            const response = await axios(`/api/images`, {
              method: "POST",
              data: { image: images, fileName },
              onUploadProgress: (data) => {
                set(() => ({
                  upload: Math.ceil((data.loaded / data.total) * 100),
                }));
              },
            });
            set(() => ({ allPosts: response.data, loading: false }));
            toast.success("Added Successfully");
          }
        };
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
        toast.error("Something went wrong");
      }
    },
    loginHandler: async (values, navigate, action) => {
      set(() => ({ loading: true }));
      try {
        const response = await axios(`/api/users/login`, {
          method: "POST",
          data: values,
        });
        set(() => ({ user: response.data.user, loading: false }));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        action.resetForm();
        navigate("/");
        toast.success("Logged IN");
      } catch (error) {
        set(() => ({ error: error.response.data, loading: false }));
        toast.error(`${error.response.data.message}`);
      }
    },
    registerHandler: async (values, navigate, action) => {
      set(() => ({ loading: true }));
      try {
        const response = await axios(`/api/users/register`, {
          method: "POST",
          data: values,
        });
        set(() => ({ user: response.data.user, loading: false }));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        action.resetForm();
        navigate("/");
        toast.success("Registered Successfully");
      } catch (error) {
        set(() => ({ error: error.response.data, loading: false }));
        toast.error(`${error.response.data.message}`);
      }
    },
  };
});
