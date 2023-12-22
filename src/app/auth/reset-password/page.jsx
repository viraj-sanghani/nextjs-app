"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { call, forgotVerify, resetPass } from "@/services/api";
import { success } from "@/components/Toast";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import validate from "@/utils/validation";
import DataLoading from "@/components/DataLoading";
import { useRouter } from "next/navigation";

function ForgotVerify() {
  const router = useRouter();
  const [isTokenVerified, setIsTokenVerified] = useState(null);

  const checkToken = async () => {
    try {
      await forgotVerify({ token: router.query?.token });
      setIsTokenVerified(true);
    } catch (err) {
      setIsTokenVerified(false);
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (values.password !== values.confirmPassword) {
      return setErrors({
        confirmPassword: "Password and confirm password must be same.",
      });
    }

    try {
      const res = await call(resetPass({ password: values.password, token }));
      success(res.message);
      router.replace("/auth/login");
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      password: "",
      confirmPassword: "",
    },
    schema: validate.forgotVerifySchema,
    callback: handleSubmit,
  });

  return isTokenVerified == null ? (
    <DataLoading />
  ) : isTokenVerified ? (
    <div className="auth-container">
      <div className="auth-form-con">
        <div className="auth-heading">Set new password</div>
        <form className="auth-form" noValidate onSubmit={form.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={form.values.password}
            onChange={form.handleChange}
            helperText={form.touched.password && form.errors.password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            helperText={
              form.touched.confirmPassword && form.errors.confirmPassword
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Reset Password"}
          </Button>
        </form>

        <div className="auth-extra-link">
          <Link href="/auth/login">Back to Log in</Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="error-wrapper">
      <h1 className="title">Token Expired.</h1>
      <Link href={{ pathname: "/" }}>
        <Button variant="contained">Go To Home</Button>
      </Link>
    </div>
  );
}

export default ForgotVerify;
