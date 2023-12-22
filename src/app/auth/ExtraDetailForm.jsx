"use client";

import Button from "@mui/material/Button";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { call, updateProfile } from "@/services/api";
import Loading from "@/components/Loading";
import { success } from "@/components/Toast";
import Model from "@/components/Model";
import validate from "@/utils/validation";
import { useForm } from "@/components/CustomHook";
import { setDetailForm, setProfile } from "@/redux/reducers/authReducer";

function ExtraDetailForm() {
  const dispatch = useDispatch();
  const { detailFormOpen } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await call(updateProfile(values));
      success(res?.message);
      resetForm();
      dispatch(setProfile(res.data));
      dispatch(setDetailForm(false));
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      userType: "Owner",
      mobile: "",
    },
    schema: validate.registerExtraSchema,
    callback: handleSubmit,
  });

  return (
    <Model open={detailFormOpen} hideCloseBtn={true} preve width={500}>
      <div className="extra-detail-con">
        <form onSubmit={form.handleSubmit}>
          <h3 className="e-detail-title">Your Details</h3>

          <FormControl fullWidth>
            <InputLabel id="userType">User Type</InputLabel>
            <Select
              labelId="userType"
              label="User Type"
              name="userType"
              value={form.values.userType}
              onChange={form.handleChange}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Builder">Builder</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Channel Partner">Channel Partner</MenuItem>
            </Select>
            <FormHelperText>
              {form.touched.userType && form.errors.userType}
            </FormHelperText>
          </FormControl>

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
            sx={{ mt: 3 }}
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Save Details"}
          </Button>
        </form>
      </div>
    </Model>
  );
}

export default ExtraDetailForm;
