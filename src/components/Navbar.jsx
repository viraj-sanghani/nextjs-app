import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import UserLogo from "./UserLogo";
import Sidebar from "./Sidebar";
import icons from "@/utils/icons";
import { navbarInvalidPath } from "@/utils/data";
import { setAuthModel, setLogoutModel } from "@/redux/reducers/authReducer";
import { useFindVisibility } from "./CustomHook";

function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { profile, isLoggedIn } = useSelector((state) => state.auth);
  const [isHome, setIsHome] = useState(pathname === "" || pathname === "/");
  const [isOpen, setIsOpen] = useState(false);

  const isValidPath = useFindVisibility(navbarInvalidPath);

  const showSearchbar = pathname === "" || pathname === "/" || isValidPath;

  const handleScroll = (e) => {
    setIsHome(!(window.innerHeight / 2 + 100 <= window.pageYOffset));
  };

  useEffect(() => {
    setIsOpen(false);
    if (pathname === "" || pathname === "/") {
      document.body.style.paddingTop = "70px";
      document.addEventListener("scroll", handleScroll, { passive: true });
    } else if (!isValidPath) {
      document.body.style.paddingTop = "0px";
    } else {
      document.body.style.paddingTop = "70px";
    }
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    showSearchbar && (
      <>
        <header id={!isHome ? "navbar" : "home-navbar"}>
          <div className="nav-logo">
            <Link href="/">
              <span className="color-3">H</span>ousing
              <span className="color-3"> M</span>agic
              {/* <img
        src={images.logoLight}
        alt="HousingMagic"
        style={{ height: 100 }}
      /> */}
            </Link>
          </div>

          {!isHome ? (
            <>
              <Searchbar />

              <Link href="/post-property">
                <div className="post-property-btn">
                  Post Property
                  <span>Free</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="nav-tabs">
                <Link href="/search/buy/residential/all" className="n-tab">
                  For Buyers
                </Link>
                <Link href="/search/rent/residential/all" className="n-tab">
                  For tenants
                </Link>
              </div>

              <Link href="/post-property" style={{ marginLeft: "auto" }}>
                <div className="post-property-btn">
                  Post Property
                  <span>Free</span>
                </div>
              </Link>
            </>
          )}

          <div className="profile-btn onhover">
            <span className="profile-icon">{icons.person}</span>
            <div className="profile-wrap onhover-open">
              {!isLoggedIn ? (
                <a onClick={() => dispatch(setAuthModel("login"))}>
                  <div className="login-btn">Login / Register</div>
                </a>
              ) : (
                <Link href="/account">
                  <div className="login-btn">
                    <UserLogo
                      size={30}
                      background="var(--color-3)"
                      name={profile?.name}
                    />
                    {profile?.name}
                  </div>
                </Link>
              )}

              <Link href="/activity/recent-search">
                <div className="item">Recent Searches</div>
              </Link>
              <Link href="/activity/shortlisted">
                <div className="item">Shortlisted properties</div>
              </Link>
              <Link href="/activity/viewed">
                <div className="item">Viewed properties</div>
              </Link>
              <Link href="/activity/contacted">
                <div className="item">Contacted properties</div>
              </Link>

              {isLoggedIn && (
                <div
                  className="logout-btn"
                  onClick={() => dispatch(setLogoutModel(true))}
                >
                  Logout
                </div>
              )}
            </div>
          </div>

          <div className="menu-btn" onClick={() => setIsOpen(true)}>
            <span>{icons.menu}</span>
          </div>
        </header>

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    )
  );
}

export default Navbar;
