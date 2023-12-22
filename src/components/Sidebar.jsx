"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserLogo from "./UserLogo";
import { setAuthModel, setLogoutModel } from "@/redux/reducers/authReducer";
import { useModalBackPress } from "./CustomHook";
import Icons from "@/utils/icons";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile, isLoggedIn } = useSelector((state) => state.auth);
  const [url, seturl] = useState(router.asPath);

  useModalBackPress({
    open: isOpen,
    hide: () => setIsOpen(false),
    url,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleOpenLogout = () => {
    dispatch(setLogoutModel(true));
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  const handleOpenLogin = () => {
    dispatch(setAuthModel("login"));
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  return (
    <>
      <div className={isOpen == true ? "active" : ""} id="sidebar">
        <div className="sd-header">
          {!isLoggedIn ? (
            <h4 className="sd-login-link">
              <a onClick={handleOpenLogin}>Login / Register</a>
            </h4>
          ) : (
            <div>
              <UserLogo name={profile?.name} />
              <Link
                style={{ fontWeight: 600, fontSize: 15 }}
                href={{ pathname: "/account" }}
              >
                {profile?.name}
              </Link>
            </div>
          )}
          <div className="sd-close-btn" onClick={() => setIsOpen(false)}>
            {Icons.close}
          </div>
        </div>
        <div className="sd-body">
          {isLoggedIn && (
            <Link href={{ pathname: "/account" }}>
              <div className="sd-b-item">My Account</div>
            </Link>
          )}

          <Link href={{ pathname: "/activity/recent-search" }}>
            <div className="sd-b-item">Recent Searches</div>
          </Link>
          <Link href={{ pathname: "/activity/shortlisted" }}>
            <div className="sd-b-item">Shortlisted Properties</div>
          </Link>
          <Link href={{ pathname: "/activity/viewed" }}>
            <div className="sd-b-item">Viewed Properties</div>
          </Link>
          <Link href={{ pathname: "/activity/contacted" }}>
            <div className="sd-b-item">Contacted Properties</div>
          </Link>

          <div className="sd-line"></div>
          <Link href={{ pathname: "/post-property" }}>
            <div className="sd-b-main-item sd-b-post-pro">
              Post Property <span>Free</span>
            </div>
          </Link>
          <div className="sd-line"></div>
          <Link href={{ pathname: "/" }}>
            <div className="sd-b-item">Home</div>
          </Link>
          <Link href={{ pathname: "/info/about-us" }}>
            <div className="sd-b-item">About Us</div>
          </Link>
          <Link href={{ pathname: "/info/contact-us" }}>
            <div className="sd-b-item">Contact Us</div>
          </Link>
          {isLoggedIn && (
            <div
              className="logout-btn"
              style={{ padding: ".7rem" }}
              onClick={handleOpenLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
