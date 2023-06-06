import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export const ProtectedRoutes = () => {
  const [user] = useAppStore((state) => {
    return [state.user];
  });
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

// export const ProtectedRoutes = () => {
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />;
// };
