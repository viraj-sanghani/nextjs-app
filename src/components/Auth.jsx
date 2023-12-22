"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailForm,
  setProfile,
  setVerify,
} from "@/redux/reducers/authReducer";
import { call, getProfile } from "@/services/api";

function Auth() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const verifyUser = async () => {
    try {
      const res = await call(getProfile());
      dispatch(setProfile(res.data));
      if (!res.data?.usertype || res.data?.usertype === "") {
        dispatch(setDetailForm(true));
      }
    } catch (err) {
      dispatch(setVerify());
    }
  };

  useEffect(() => {
    const isloggedin = localStorage.getItem("isLoggedin");
    if (isloggedin == "true") verifyUser();
    else {
      dispatch(setVerify());
    }
  }, [isLoggedIn]);

  return <></>;
}

export default Auth;
