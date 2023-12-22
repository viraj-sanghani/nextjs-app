"use client";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import validate from "@/utils/validation";
import { call, addContacted } from "@/services/api";
import Loading from "./Loading";
import { success } from "./Toast";
import { formatNumber } from "@/utils/helper";
import { setContact } from "@/redux/reducers/appReducer";
import Model from "./Model";
import { setAuthModel } from "@/redux/reducers/authReducer";
import icons from "@/utils/icons";
import { useForm, useModalBackPress } from "./CustomHook";

function ViewContact() {
  const dispatch = useDispatch();
  const { contactOpen, contactData } = useSelector((state) => state.app);
  const { profile } = useSelector((state) => state.auth);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoData, setInfoData] = useState(null);

  const handleClose = () => {
    dispatch(setContact({ open: false, data: {} }));
  };

  useModalBackPress({
    open: contactOpen,
    hide: handleClose,
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    if (contactData.forr === "Sale") {
      if (!values.reasonToBuy) {
        setErrors({ reasonToBuy: "Select reason to buy" });
      }
      if (!values.planningToBuy) {
        setErrors({ planningToBuy: "Select when you buy" });
      }
      if (!values.reasonToBuy || !values.planningToBuy) return;
    }

    try {
      const data = {
        propertyId: contactData.id,
        reasonToBuy: values?.reasonToBuy,
        isDealer: values.isDealer,
        planningToBuy: values?.planningToBuy,
        homeLoan: values.homeLoan ? "Yes" : "No",
        siteVisit: values.siteVisit ? "Yes" : "No",
        name: values.name,
        email: values.email,
        mobile: values.mobile,
      };
      const res = await call(addContacted(data));
      success(res?.message);
      setInfoOpen(true);
      setInfoData(res?.owner);
      resetForm();
      handleClose();
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      isDealer: "",
      reasonToBuy: "",
      planningToBuy: "",
      homeLoan: false,
      siteVisit: false,
      terms: "",
      name: "",
      email: "",
      mobile: "",
    },
    schema: validate.contactDealerSchema,
    callback: handleSubmit,
  });

  const handleNavigate = () => {
    handleClose();
    // history.push("/auth/login", { redirect: location.pathname });
    dispatch(setAuthModel("login"));
  };

  useEffect(() => {
    if (profile?.name) {
      form.setValues({
        ...form.values,
        name: profile?.name,
        email: profile?.email,
        mobile: profile?.username,
      });
    }
  }, [profile]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    success("Copied to clipboard");
  };

  return (
    <>
      <Model
        open={contactOpen}
        hideCloseBtn={true}
        width={920}
        onClose={handleClose}
      >
        <div className="view-contact-con">
          <form onSubmit={form.handleSubmit}>
            <h3 className="v-c-title">
              You are requesting to view advertiser details.
            </h3>
            <div className="v-c-property-info">
              <div className="v-c-pro-i">
                <h4>POSTED BY {contactData?.iam}</h4>
                <p>
                  +91 {contactData?.mobile} | {contactData?.email}
                </p>
                <p>{contactData?.name}</p>
              </div>
              <div className="v-c-pro-i">
                <h4>POSTED ON {moment(contactData.date).format("ll")}</h4>
                <p>
                  ₹{" "}
                  {formatNumber(
                    contactData?.exp_price || contactData?.monthly_rent || 0
                  )}{" "}
                  {contactData?.monthly_rent ? <small>/ month</small> : ""} |{" "}
                  {contactData?.project_name}
                </p>
                <p>
                  {contactData?.carpet_area || contactData?.super_area}{" "}
                  {(contactData?.carpet_area || contactData?.super_area) &&
                    contactData?.area_unit}{" "}
                  | {contactData?.bedroom && contactData?.bedroom + " BHK"}{" "}
                  {contactData?.property_type}
                </p>
              </div>
            </div>
            <h3 className="v-c-title">
              Please fill in your details to be shared with this advertiser
              only.
            </h3>
            <div className="v-c-detail">
              <div className="v-c-d-con">
                <h4>BASIC INFORMATION</h4>
                {contactData.forr === "Sale" && (
                  <FormControl sx={{ mb: 1 }}>
                    <FormLabel id="reasonToBuy">
                      Your reason to buy is
                    </FormLabel>
                    <RadioGroup
                      row
                      name="reasonToBuy"
                      value={form.values?.reasonToBuy}
                      onChange={form.handleChange}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Invetment"
                        value="Invetment"
                        style={{ fontSize: 23 }}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Self Use"
                        value="Self Use"
                        style={{ fontSize: 23 }}
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {form.touched.reasonToBuy && form.errors.reasonToBuy}
                    </FormHelperText>
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <FormLabel id="isDealer">Are you a property dealer</FormLabel>
                  <RadioGroup
                    row
                    name="isDealer"
                    value={form.values?.isDealer}
                    onChange={form.handleChange}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Yes"
                      value="Yes"
                      style={{ fontSize: 23 }}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="No"
                      value="No"
                      style={{ fontSize: 23 }}
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {form.touched.isDealer && form.errors.isDealer}
                  </FormHelperText>
                </FormControl>

                <div className="v-c-user-form">
                  <TextField
                    fullWidth
                    className="input-field"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                    helperText={form.touched.name && form.errors.name}
                  />
                  <TextField
                    fullWidth
                    className="input-field"
                    label="Mobile No"
                    name="mobile"
                    autoComplete="mobile"
                    value={form.values.mobile}
                    onChange={form.handleChange}
                    helperText={form.touched.mobile && form.errors.mobile}
                  />
                  <TextField
                    fullWidth
                    className="input-field"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    helperText={form.touched.email && form.errors.email}
                  />
                </div>
              </div>
              <div className="v-c-d-con">
                <h4>OPTIONAL INFORMATION</h4>

                {contactData.forr === "Sale" && (
                  <>
                    <FormControl>
                      <FormLabel id="planningToBuy">
                        By when you are planning to buy the property?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="planningToBuy"
                        value={form.values?.planningToBuy}
                        onChange={form.handleChange}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="3 Months"
                          value="3 Months"
                          style={{ fontSize: 23 }}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="4 Months"
                          value="4 Months"
                          style={{ fontSize: 23 }}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="More than 6 Months"
                          value="More than 6 Months"
                          style={{ fontSize: 23 }}
                        />
                      </RadioGroup>
                      <FormHelperText>
                        {form.touched.planningToBuy &&
                          form.errors.planningToBuy}
                      </FormHelperText>
                    </FormControl>
                    <FormControl sx={{ mt: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ fontSize: 23 }}
                            name="homeLoan"
                            checked={form.values?.homeLoan}
                            onChange={(e) => {
                              form.setFieldValue("homeLoan", e.target.checked);
                            }}
                          />
                        }
                        label="I am interested in home loan"
                      />
                    </FormControl>
                  </>
                )}

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ fontSize: 23 }}
                        name="siteVisit"
                        checked={form.values?.siteVisit}
                        onChange={(e) => {
                          form.setFieldValue("siteVisit", e.target.checked);
                        }}
                      />
                    }
                    label="I am interested in site visits."
                  />
                </FormControl>

                <FormControl sx={{ mt: 5 }}>
                  <FormControlLabel
                    style={{
                      alignItems: "flex-start",
                    }}
                    control={
                      <Checkbox
                        style={{ fontSize: 23 }}
                        name="terms"
                        checked={form.values?.terms ? true : false}
                        onChange={(e) => {
                          form.setFieldValue("terms", e.target.checked);
                        }}
                      />
                    }
                    label="I agree to be contacted by HousingMagic for similar
                  properties or related services via WhatsApp,
                  phone(overriding NDNC registration), sms, e-mail etc."
                  />
                  <FormHelperText>
                    {form.touched.terms && form.errors.terms}
                  </FormHelperText>
                </FormControl>

                <div className="v-c-btns">
                  <Button variant="contained" type="submit">
                    {form.isSubmitting ? (
                      <Loading color="#fff" />
                    ) : (
                      "View Advertiser Details"
                    )}
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Model>
      {/* <Model
        open={contactOpen}
        width={400}
        hideCloseBtn={true}
        onClose={handleClose}
      >
        <div className="login-mes-box">
          <h3>Login or register to view number</h3>
          <h5>Access your activity across devices by registering with us</h5>
          <Button variant="contained" fullWidth onClick={handleNavigate}>
            Login
          </Button>
        </div>
      </Model> */}
      <Model
        open={infoOpen}
        width={400}
        hideCloseBtn={true}
        onClose={() => setInfoOpen(false)}
      >
        <div>
          <h1 className="contact-d-title">Owner's Detail</h1>
          <div>
            <div className="contact-d-item">
              <div>
                <b>Name:</b> {infoData?.name}
              </div>
            </div>
            <div className="contact-d-item">
              <div>
                <b>Email Id:</b> {infoData?.email}
              </div>
              <button onClick={() => handleCopy(infoData?.email)}>
                {icons.copy}
              </button>
            </div>
            <div className="contact-d-item">
              <div>
                <b>Mobile No:</b> {infoData?.mobile}
              </div>
              <button onClick={() => handleCopy(infoData?.mobile)}>
                {icons.copy}
              </button>
            </div>
          </div>

          <Button
            sx={{ mt: 3 }}
            variant="contained"
            fullWidth
            onClick={() => setInfoOpen(false)}
          >
            Close
          </Button>
        </div>
      </Model>
    </>
  );
}

export default ViewContact;
