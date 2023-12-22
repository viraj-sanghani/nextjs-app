"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import Sticky from "react-stickynode";
import DataLoading from "@/components/DataLoading";
import icons from "@/utils/icons";
import { setAuthModel } from "@/redux/reducers/authReducer";

function ActivityLayout({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [page, setPage] = useState("");
  const { isLoggedIn, isVerify } = useSelector((state) => state.auth);

  useEffect(() => {
    setPage((pathname || "").split("/").at(-1));
  }, [pathname]);

  return (
    <div id="account">
      <div className="account-con activity-con">
        <div className="account-header">My Activity</div>
        <div className="account-content-wrap">
          <div className="acc-sidebar-con">
            {/* <Sticky enabled={true} top={100} bottomBoundary="#sticky-container"> */}
            <div className="acc-sidebar">
              <Link
                className={`acc-sb-item ${
                  page === "recent-search" || page === "" || page === "activity"
                    ? "active"
                    : ""
                }`}
                href={{ pathname: "/activity/recent-search" }}
              >
                <span>{icons.search}</span>Recent Searches
              </Link>
              <Link
                className={`acc-sb-item ${
                  page === "shortlisted" ? "active" : ""
                }`}
                href={{ pathname: "/activity/shortlisted" }}
              >
                <span>{icons.star}</span>Shortlisted
              </Link>
              <Link
                className={`acc-sb-item ${page === "viewed" ? "active" : ""}`}
                href={{ pathname: "/activity/viewed" }}
              >
                <span>{icons.viewed}</span>Viewed
              </Link>
              <Link
                className={`acc-sb-item ${
                  page === "contacted" ? "active" : ""
                }`}
                href={{ pathname: "/activity/contacted" }}
              >
                <span>{icons.call}</span>Contacted
              </Link>
              {/* <Link
              className={`acc-sb-item ${page === "liked" ? "active" : ""}`}
              href={{ pathname: "/activity/liked" }}
            >
              <span>{icons.heart}</span>Liked
            </Link> */}
              <Link
                className={`acc-sb-item ${
                  page === "scheduled-visits" ? "active" : ""
                }`}
                href={{ pathname: "/activity/scheduled-visits" }}
              >
                <span>{icons.clock}</span>Scheduled Visits
              </Link>
            </div>
            {/* </Sticky> */}
          </div>
          {!isVerify ? (
            <DataLoading />
          ) : isLoggedIn ? (
            children
          ) : (
            <div className="login-mes-wrap">
              <div className="login-mes-box">
                <h3>Login or register to save your activity</h3>
                <h5>
                  Access your activity across devices by registering with us
                </h5>
                {/* <Link
                  href={{
                    pathname: "/auth/login",
                    state: { redirect: pathname },
                  }}
                >
                  <Button variant="contained" fullWidth>
                    Login
                  </Button>
                </Link> */}
                {
                  <a onClick={() => dispatch(setAuthModel("login"))}>
                    <Button variant="contained" fullWidth>
                      Login
                    </Button>
                  </a>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityLayout;
