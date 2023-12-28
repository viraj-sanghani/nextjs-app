"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { call, getDraftProperty } from "@/services/api";
import { setStep } from "@/redux/reducers/propertyFormReducer";
import DataLoading from "@/components/DataLoading";
import { setAuthModel } from "@/redux/reducers/authReducer";

function Add() {
  const dispatch = useDispatch();
  const [draftData, setDraftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, isVerify, profile } = useSelector((state) => state.auth);

  const fetchDraftData = async () => {
    try {
      const res = await call(getDraftProperty());
      setDraftData(res.data);
    } catch (err) {
      setDraftData({});
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerify) {
      if (isLoggedIn) fetchDraftData();
      else setDraftData({});
    }
    dispatch(setStep(1));
  }, [isLoggedIn, isVerify]);

  return (!isVerify && loading) || !draftData ? (
    <DataLoading />
  ) : isLoggedIn ? (
    ["Owner", "Builder", "Channel Partner"].includes(profile?.usertype) ? (
      <div className="property-form-con">
        <div className="property-form">
          <div className="page-title" style={{ padding: 20 }}>
            <h1>Post Property</h1>
          </div>

          <Step1 draftData={draftData} />
          <Step2 draftData={draftData} />
          <Step3 />
        </div>
      </div>
    ) : (
      <div
        style={{
          maxWidth: 500,
          height: 500,
          display: "flex",
          alignItems: "center",
          margin: "20px auto",
        }}
      >
        <div className="login-mes-wrap">
          <div className="login-mes-box">
            <h3>Can't post property as a Customer</h3>
            <h5>
              Login or Register as a Owner, Builder or Channel Partner to post
              property.
            </h5>
            {/* <Link
              to={{
                pathname: "/auth/login",
                state: { redirect: location.pathname },
              }}
            >
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Link> */}
            <a onClick={() => dispatch(setAuthModel("login"))}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </a>
          </div>
        </div>
      </div>
    )
  ) : (
    <div
      style={{
        maxWidth: 500,
        height: 500,
        display: "flex",
        alignItems: "center",
        margin: "20px auto",
      }}
    >
      <div className="login-mes-wrap">
        <div className="login-mes-box">
          <h3>Login or register to post property</h3>
          <h5>Access your activity across devices by registering with us</h5>
          {/* <Link
            to={{
              pathname: "/auth/login",
              state: { redirect: location.pathname },
            }}
          >
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Link> */}
          <a onClick={() => dispatch(setAuthModel("login"))}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Add;
