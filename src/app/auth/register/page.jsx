"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, FormControl, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { call, register } from "@/services/api";
import { setAuthModel } from "@/redux/reducers/authReducer";
import { success } from "@/components/Toast";
import validate from "@/utils/validation";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";

function Register() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(pathname !== "/auth/register");
  const { draftData } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await call(register(values));
      success(res.message);
      isModal ? dispatch(setAuthModel(null)) : router.replace("/");
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      userType: "Owner",
      name:
        (isModal
          ? draftData?.name
          : router.query?.data && router.query.data?.name) || "",
      email:
        (isModal
          ? draftData?.email
          : router.query?.data && router.query.data?.email) || "",
      socialId:
        (isModal
          ? draftData?.id
          : router.query?.data && router.query.data?.id) || null,
      platform:
        (isModal
          ? draftData?.platform
          : router.query?.data && router.query.data?.platform) || null,
      mobile: "",
      password: "",
    },
    schema: validate.registerSchema,
    callback: handleSubmit,
  });

  return (
    <div className="auth-container">
      <div className="auth-form-con">
        <div className="auth-heading">Sign up for Housingmagic</div>

        <form className="auth-form" noValidate onSubmit={form.handleSubmit}>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <Autocomplete
              value={form.values.userType}
              onChange={(e, val) => form.setFieldValue("userType", val)}
              name="userType"
              disableClearable
              options={["Owner", "Builder", "Customer", "Partner"]}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="User Type" variant="outlined" />
                  <FormHelperText>
                    {form.touched.userType && form.errors.userType}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            value={form.values.name}
            onChange={form.handleChange}
            helperText={form.touched.name && form.errors.name}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            value={form.values.email}
            onChange={form.handleChange}
            helperText={form.touched.email && form.errors.email}
          />
          <span style={{ fontSize: 12, fontWeight: 600 }}>
            A verification mail is sent to this email.
          </span>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={form.values.password}
            onChange={form.handleChange}
            helperText={form.touched.password && form.errors.password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile No"
            name="mobile"
            autoComplete="mobile"
            value={form.values.mobile}
            onChange={form.handleChange}
            helperText={form.touched.mobile && form.errors.mobile}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Create account"}
          </Button>
        </form>

        <div className="auth-extra-link">
          {isModal ? (
            <a onClick={() => dispatch(setAuthModel("login"))}>
              Already have an account? Log in
            </a>
          ) : (
            <Link
              href={{
                pathname: "/auth/login",
              }}
            >
              Already have an account? Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
