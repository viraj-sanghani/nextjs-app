"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { success } from "./Toast";
import Alert from "./Alert";
import { call, logout } from "@/services/api";
import { setLogoutModel, setProfile } from "@/redux/reducers/authReducer";

function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openLogout } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    let isLogout = false;
    try {
      await call(logout());
      dispatch(setProfile({}));
      success("Logout Successful");
      router.push("/");
      isLogout = true;
    } catch (err) {
      console.log(err);
    }
    dispatch(setLogoutModel(false));
    // setTimeout(() => {
    // }, 2000);
  };

  return (
    <Alert
      open={openLogout}
      handleClose={() => dispatch(setLogoutModel(false))}
      animation="scale"
      data={{
        title: "Are You Sure! Want to Logout?",
        icon: "logout",
        buttons: [
          {
            text: "Cancel",
            callback: () => dispatch(setLogoutModel(false)),
          },
          {
            class: "red",
            type: "error",
            text: "Logout",
            callback: () => handleLogout(),
          },
        ],
      }}
    />
  );
}

export default Logout;
