"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { call, forgot } from "@/services/api";
import { success } from "@/components/Toast";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import validate from "@/utils/validation";
import { setAuthModel } from "@/redux/reducers/authReducer";

function Forgot() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(pathname !== "/auth/forgot-password");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await call(forgot(values));
      success(res.message);
      isModal ? dispatch(setAuthModel(null)) : router.replace("/");
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      email: "",
    },
    schema: validate.forgotSchema,
    callback: handleSubmit,
  });

  return (
    <div className="auth-container">
      <div className="auth-form-con">
        <div className="auth-heading">Enter your email to reset password</div>
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
          {isModal ? (
            <a onClick={() => dispatch(setAuthModel("login"))}>
              Back to Log in
            </a>
          ) : (
            <Link href="/auth/login">Back to Log in</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;
