"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { call, login } from "@/services/api";
import { success } from "@/components/Toast";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import validate from "@/utils/validation";
import { setAuthModel, setProfile } from "@/redux/reducers/authReducer";
// import SocialLogin from "./SocialLogin";

function Login() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [isModal, setIsModal] = useState(pathname !== "/auth/login");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await call(login(values));
      // dispatch(setProfile(res.data));
      dispatch(setProfile({ ...res.data, token: res.token }));
      success(res.message);
      isModal
        ? dispatch(setAuthModel(null))
        : router.replace(router.query.state?.redirect || "/");
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      email: "",
      password: "",
    },
    schema: validate.loginSchema,
    callback: handleSubmit,
  });

  return (
    <div className="auth-container">
      <div className="auth-form-con">
        <div className="auth-heading">Sign in to Housingmagic</div>

        {/* <SocialLogin /> */}

        <div className="auth-or-title">or</div>
        <form className="auth-form" noValidate onSubmit={form.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.values.email}
            onChange={form.handleChange}
            helperText={form.touched.email && form.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.values.password}
            onChange={form.handleChange}
            helperText={form.touched.password && form.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Log in"}
          </Button>
        </form>

        <div className="auth-extra-link">
          {isModal ? (
            <>
              <a onClick={() => dispatch(setAuthModel("forgot"))}>
                Forgot password?
              </a>
              <a onClick={() => dispatch(setAuthModel("register"))}>
                Don't have an account? Create one
              </a>
            </>
          ) : (
            <>
              <Link href={{ pathname: "/auth/forgot-password" }}>
                Forgot password?
              </Link>
              <Link href={{ pathname: "/auth/register" }}>
                Don't have an account? Create one
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
