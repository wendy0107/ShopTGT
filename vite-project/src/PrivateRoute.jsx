import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateRoutes = ({ setLastPath }) => {
  const { userID } = useContext(UserContext);
  const isSignedIn = Boolean(userID);
  const { pathname } = useLocation();
  if (pathname != "/") {
    setLastPath(pathname);
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
