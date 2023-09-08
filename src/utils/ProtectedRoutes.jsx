import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoutes = ({ children }) => {
  const authToken = cookies.get("auth-token");

  return authToken ? children : <Navigate to="/" />;
};

export default ProtectedRoutes;
