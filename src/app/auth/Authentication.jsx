"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Model from "@/components/Model";
import { setAuthModel } from "@/redux/reducers/authReducer";
import Login from "./login/page";
import Register from "./register/page";
import Forgot from "./forgot-password/page";

function Authentication() {
  const dispatch = useDispatch();
  const { authModel } = useSelector((state) => state.auth);

  const closeModal = () => dispatch(setAuthModel(null));

  useEffect(() => {
    window.addEventListener("popstate", closeModal);
    return () => {
      window.removeEventListener("popstate", closeModal);
    };
  }, []);

  return (
    authModel && (
      <Model
        className="auth-model"
        open={true}
        width={450}
        preventClose={true}
        onClose={closeModal}
      >
        <div className="model-body">
          {authModel === "login" ? (
            <Login />
          ) : authModel === "register" ? (
            <Register />
          ) : (
            <Forgot />
          )}
        </div>
      </Model>
    )
  );
}

export default Authentication;
