import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import images from "../../utils/images";
import Loading from "../../components/Loading";
import { call, socialLogin } from "../../redux/axios";
import { error, success } from "../../components/Toast";
import {
  setAuthModel,
  setDraftData,
  setProfile,
} from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function Google({ callback }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [mes, setMes] = useState("Continue with Google");

  const handleError = (error) => {
    setLoading(false);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoading(false);
      setIsVerifying(true);
      setMes("Signing you in...");
      setUser(codeResponse);
    },
    onNonOAuthError: handleError,
    onError: handleError,
  });

  const startLogin = () => {
    if (!isVerifying) {
      setLoading(true);
      login();
    }
  };

  const fetchUserData = async () => {
    try {
      if (user?.access_token) {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        );
        callback && callback({ ...res.data, platform: "google" });
      }
    } catch (err) {
    } finally {
      setIsVerifying(false);
      setMes("Continue with Google");
    }
  };

  useEffect(() => {
    user && fetchUserData();
  }, [user]);

  return (
    <a className="a-s-btn" onClick={startLogin}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="s-icon-img">
            <img src={images.google} alt="Google Login" />
          </div>
          {mes}
        </>
      )}
    </a>
  );
}

const Facebook = ({ callback }) => {
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [mes, setMes] = useState("Continue with Facebook");

  const handleCallback = async (data) => {
    setLoading(false);
    setIsVerifying(true);
    setMes("Signing you in...");
    try {
      if (data?.accessToken) {
        const res = await axios.get(
          `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email,picture`
        );
        callback && callback({ ...res.data, platform: "facebook" });
      }
    } catch (err) {
    } finally {
      setIsVerifying(false);
      setMes("Continue with Facebook");
    }
  };

  const startLogin = (e, call) => {
    if (!isVerifying) {
      setLoading(true);
      call(e);
    }
  };

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_ID}
      // autoLoad
      callback={handleCallback}
      render={(renderProps) => (
        <a
          className="a-s-btn"
          onClick={(e) => startLogin(e, renderProps.onClick)}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="s-icon-img">
                <img src={images.facebook} alt="Facebook Login" />
              </div>
              {mes}
            </>
          )}
        </a>
      )}
    />
  );
};

function SocialLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isModal, setIsModal] = useState(location.pathname !== "/auth/login");

  const loginCall = async (data) => {
    try {
      const res = await call(
        socialLogin({
          platform: data?.platform,
          socialId: data?.id,
          email: data?.email,
        })
      );
      if (res?.isloggedIn) {
        success(res.message);
        dispatch(setProfile(res.data));
        isModal
          ? dispatch(setAuthModel(null))
          : history.replace(location.state?.redirect || "/");
      } else if (res?.isNotVerify) {
        error(res.message);
      } else {
        isModal
          ? dispatch(setDraftData({ model: "register", data: data }))
          : history.replace({
              pathname: "/auth/register",
              state: { data: data },
            });
      }
    } catch (err) {
    } finally {
      // setIsVerifying(false);
      // setMes("Continue with Google");
    }
  };

  return (
    <div className="auth-social-btns">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
        <Google callback={loginCall} />
      </GoogleOAuthProvider>

      <Facebook callback={loginCall} />
    </div>
  );
}

export default SocialLogin;
