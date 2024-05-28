// useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user && user.role === "admin";

  const isAuthor = (commentData) => {
    return user && user._id === commentData.author._id;
  };

  const isLoggedIn = !!user;

  return { isLoggedIn, isAdmin, isAuthor };
};

export default useAuth;
