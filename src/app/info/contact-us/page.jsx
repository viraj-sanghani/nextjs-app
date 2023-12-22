"use client";

import { Button, TextField } from "@mui/material";
import icons from "@/utils/icons";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import { success } from "@/components/Toast";
import validate from "@/utils/validation";
import { call, sendContactus } from "@/services/api";

const ContactUs = () => {
  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const res = await call(sendContactus(values));
      success(res?.message);
      resetForm();
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      message: "",
    },
    schema: validate.contactSchema,
    callback: handleSubmit,
  });

  return (
    <div className="contactus">
      <div className="contactus-title">
        <h1>Contact Us</h1>
      </div>
      <div className="contactus-wrap">
        <form className="ct-form" onSubmit={form.handleSubmit}>
          <TextField
            className="ct-form-input"
            label="First Name"
            name="firstName"
            value={form.values.firstName}
            onChange={form.handleChange}
            helperText={form.touched.firstName && form.errors.firstName}
          />
          <TextField
            className="ct-form-input"
            label="Last Name"
            name="lastName"
            value={form.values.lastName}
            onChange={form.handleChange}
            helperText={form.touched.lastName && form.errors.lastName}
          />
          <TextField
            className="ct-form-input"
            label="Email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            helperText={form.touched.email && form.errors.email}
          />
          <TextField
            className="ct-form-input"
            label="Mobile"
            name="mobile"
            value={form.values.mobile}
            onChange={form.handleChange}
            helperText={form.touched.mobile && form.errors.mobile}
          />
          <TextField
            className="ct-form-input"
            label="Type message here"
            multiline
            rows={4}
            name="message"
            value={form.values.message}
            onChange={form.handleChange}
            helperText={form.touched.message && form.errors.message}
          />
          <Button
            className="btn btn-1"
            variant="contained"
            size="large"
            type="submit"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Send Details"}
          </Button>
        </form>
        <div className="ct-details-con">
          <div className="ct-data">
            <div className="ct-d-item">
              {icons.address}B/215, Shanti Shopping Centre, Opp. Railway
              Station,Mira Road - 401107
            </div>
            <div className="ct-d-item">
              {icons.call}
              <a href="tel:7208305579" target="_blank">
                +91 7208305579
              </a>
            </div>
            <div className="ct-d-item">
              {icons.mail}
              <a href="mail:housingmagic@gmail.com" target="_blank">
                housingmagic@gmail.com
              </a>
            </div>
          </div>
          <div className="ct-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.8685348414992!2d72.81545621490648!3d19.418085386892557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a94464003387%3A0xc968b83e1ad458bf!2sWeblord%20Infotech%20and%20education%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1681112383377!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
