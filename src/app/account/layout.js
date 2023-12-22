"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import icons from "@/utils/icons";
import DataLoading from "@/components/DataLoading";
import { setAuthModel } from "@/redux/reducers/authReducer";

function AccountLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const { isLoggedIn, isVerify, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    setPage((pathname || "").split("/").at(-1));
  }, [pathname]);

  return (
    <div id="account">
      <div className="account-con">
        <div className="account-header">My Account</div>
        <div className="account-content-wrap">
          <div className="acc-sidebar">
            <Link
              className={`acc-sb-item ${
                page === "profile" || page === "" || page === "account"
                  ? "active"
                  : ""
              }`}
              href={{ pathname: "/account/profile" }}
            >
              <span>{icons.account}</span>My Profile
            </Link>
            <Link
              className={`acc-sb-item ${
                page === "change-password" ? "active" : ""
              }`}
              href={{ pathname: "/account/change-password" }}
            >
              <span>{icons.password}</span>Change Password
            </Link>
            {["Owner", "Builder", "Channel Partner"].includes(
              profile?.usertype
            ) && (
              <>
                <Link
                  className={`acc-sb-item ${
                    page === "listings" ? "active" : ""
                  }`}
                  href={{ pathname: "/account/listings" }}
                >
                  {<span>{icons.listing}</span>}Listings
                </Link>
                <Link
                  className={`acc-sb-item ${page === "leads" ? "active" : ""}`}
                  href={{ pathname: "/account/leads" }}
                >
                  {<span>{icons.leads}</span>}Leads
                </Link>
                <Link
                  className={`acc-sb-item ${page === "visits" ? "active" : ""}`}
                  href={{ pathname: "/account/visits" }}
                >
                  {<span>{icons.visits}</span>}Visits
                </Link>
              </>
            )}
          </div>

          {!isVerify ? (
            <DataLoading />
          ) : isLoggedIn ? (
            children
          ) : (
            <div className="login-mes-wrap">
              <div className="login-mes-box">
                <h3>Login or register</h3>
                <h5>Access your data across devices by registering with us</h5>
                {/* <Link
                  href={{ pathname: "/auth/login" }}
                  state={{ redirect: pathname }}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
