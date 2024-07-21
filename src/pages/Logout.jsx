import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
    localStorage.removeItem("logged");
    localStorage.removeItem("id");
  }, []);
  return <div></div>;
};

export default Logout;
