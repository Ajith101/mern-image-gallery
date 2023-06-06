import React from "react";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import EditeItem from "./components/pages/EditeItem";
import Header from "./components/header-footer/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "./components/store/appStore";
import { ProtectedRoutes } from "./components/pages/ProtectedRoutes";
import PageNotFound from "./components/pages/PageNotFound";

const App = () => {
  const [user] = useAppStore((state) => {
    return [state.user];
  });
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Route>
        <Route element={<EditeItem />} path="/edite" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </>
  );
};

export default App;
