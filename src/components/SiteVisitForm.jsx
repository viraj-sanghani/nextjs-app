"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { success } from "./Toast";
import { useForm } from "./CustomHook";
import DataLoading from "./DataLoading";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import validate from "@/utils/validation";
import { setAuthModel } from "@/redux/reducers/authReducer";
import { addSiteVisit, call } from "@/services/api";

function SiteVisitForm({ propertyId }) {
  const dispatch = useDispatch();
  const { isLoggedIn, profile, isVerify } = useSelector((state) => state.auth);
  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const data = {
        ...values,
        dateTime: values.dateTime.format("DD/MM/YYYY h:m A"),
        prop_id: propertyId,
      };
      const res = await call(addSiteVisit(data));
      success(res?.message);
      resetForm();
    } catch (err) {
      setErrors(err);
    }
  };

  const form = useForm({
    initial: {
      name: "",
      mobile: "",
      email: "",
      message: "",
      dateTime: "",
      alongWith: "Alone",
    },
    schema: validate.siteVisitSchema,
    callback: handleSubmit,
  });

  useEffect(() => {
    profile?.name &&
      form.setValues({
        ...form.values,
        name: profile?.name,
        email: profile?.email,
        mobile: profile?.username,
      });
  }, [profile]);

  return !isVerify ? (
    <DataLoading />
  ) : isLoggedIn ? (
    <form noValidate onSubmit={form.handleSubmit}>
      <TextField
        margin="normal"
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
        fullWidth
        name="mobile"
        label="Mobile no"
        id="mobile"
        autoComplete="mobile"
        value={form.values.mobile}
        onChange={form.handleChange}
        helperText={form.touched.mobile && form.errors.mobile}
      />
      <TextField
        margin="normal"
        fullWidth
        name="email"
        label="Email id"
        id="email"
        autoComplete="email"
        value={form.values.email}
        onChange={form.handleChange}
        helperText={form.touched.email && form.errors.email}
      />

      <FormControl fullWidth margin="normal">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label="Preferred Date & Time"
            disablePast={true}
            format="DD/MM/YYYY h:m A"
            onChange={(val) => form.setFieldValue("dateTime", val)}
          />
        </LocalizationProvider>
        <FormHelperText>
          {form.touched.dateTime && form.errors.dateTime}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="alongWith">Along With</InputLabel>
        <Select
          labelId="alongWith"
          name="alongWith"
          label="Along With"
          autoComplete="alongWith"
          value={form.values.alongWith}
          onChange={form.handleChange}
        >
          <MenuItem value="Alone">Alone</MenuItem>
          <MenuItem value="With Family">With family</MenuItem>
          <MenuItem value="With Friend">With friend</MenuItem>
        </Select>
      </FormControl>

      <TextField
        margin="normal"
        multiline={true}
        rows={3}
        fullWidth
        name="message"
        label="Message"
        id="message"
        autoComplete="message"
        value={form.values.message}
        onChange={form.handleChange}
        helperText={form.touched.message && form.errors.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ my: 2 }}
        disabled={form.isSubmitting}
      >
        {form.isSubmitting ? <Loading color="#fff" /> : "Submit"}
      </Button>
    </form>
  ) : (
    <div className="login-mes-wrap">
      <div className="login-mes-box">
        <h3>Login or register to schedule visit</h3>
        {/* <Link
          to={{
            pathname: "/auth/login",
            state: { redirect: location.pathname },
          }}
        >
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </Link> */}
        <a onClick={() => dispatch(setAuthModel("login"))}>
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </a>
      </div>
    </div>
  );
}

export default SiteVisitForm;
