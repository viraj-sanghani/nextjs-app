"use client";

import { Button, TextField } from "@mui/material";
import { success } from "@/components/Toast";
import { useForm } from "@/components/CustomHook";
import validate from "@/utils/validation";
import Loading from "@/components/Loading";
import { call, changePass } from "@/services/api";

function ChangePassword() {
  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    if (values.newPass !== values.confirmPass) {
      return setErrors({
        confirmPass: "New password and confirm password must be same.",
      });
    }
    try {
      const val = { ...values };
      delete val.confirmPass;
      const res = await call(changePass(val));
      success(res.message);
      resetForm();
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    schema: validate.changePassSchema,
    callback: handleSubmit,
  });

  return (
    <div className="change-pass-con">
      <div className="change-pass-title">Change Password</div>
      <form
        className="change-pass-details"
        noValidate
        onSubmit={form.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="oldPass"
          label="Old Password"
          type="password"
          id="oldPass"
          value={form.values.oldPass}
          onChange={form.handleChange}
          helperText={form.touched.oldPass && form.errors.oldPass}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPass"
          label="New Password"
          type="password"
          id="newPass"
          value={form.values.newPass}
          onChange={form.handleChange}
          helperText={form.touched.newPass && form.errors.newPass}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPass"
          label="Confirm Password"
          type="password"
          id="confirmPass"
          value={form.values.confirmPass}
          onChange={form.handleChange}
          helperText={form.touched.confirmPass && form.errors.confirmPass}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? <Loading color="#fff" /> : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
