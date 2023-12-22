"use client";

import { useSelector } from "react-redux";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { success } from "@/components/Toast";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import validate from "@/utils/validation";
import { call, updateProfile } from "@/services/api";

function Profile() {
  const { profile } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const val = { ...values };
      delete val.email;
      delete val.usertype;
      const res = await call(updateProfile(val));
      success(res.message);
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      name: profile.name,
      email: profile.email,
      mobile: profile.username,
      usertype: profile.usertype,
    },
    schema: validate.accountSchema,
    callback: handleSubmit,
  });

  return (
    <div className="profile-con">
      <div className="profile-title">My Details</div>
      <form className="profile-details" noValidate onSubmit={form.handleSubmit}>
        <FormControl sx={{ mb: 1 }}>
          <FormLabel id="usertype" style={{ color: "#000" }}>
            User Type : {form.values?.usertype}
          </FormLabel>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
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
          label="Email Address"
          name="email"
          autoComplete="email"
          value={form.values.email}
          onChange={form.handleChange}
          disabled={true}
          helperText={form.touched.email && form.errors.email}
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
          {form.isSubmitting ? <Loading color="#fff" /> : "Save Details"}
        </Button>
      </form>
    </div>
  );
}

export default Profile;
