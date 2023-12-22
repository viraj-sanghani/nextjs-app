"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, TextField, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/components/CustomHook";
import validate from "@/utils/validation";
import icons from "@/utils/icons";
import DataLoading from "@/components/DataLoading";
import Alert from "@/components/Alert";
import { error } from "@/components/Toast";
import Loading from "@/components/Loading";
import { call, createTicket } from "@/services/api";
import { setAuthModel } from "@/redux/reducers/authReducer";

function Form() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isVerify, isLoggedIn } = useSelector((state) => state.auth);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [files, setFiles] = useState(null);

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const data = new FormData();
      for (const key in values) {
        data.append(key, values[key]);
      }
      if (files) {
        for (let i = 0; i < files.length; i++) {
          data.append("files", files[i]);
        }
      }
      const res = await call(createTicket(data));
      setOpenSuccess(true);
      resetForm();
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const handleFileUpload = (e) => {
    const validFiles = [];
    const file = e.target.files;
    const validExt = ["jpg", "jpeg", "png", "xls", "txt", "doc", "pdf"];

    Object.values(file).forEach((ele) => {
      if (validExt.includes(ele.name.split(".").pop())) {
        validFiles.push(ele);
      } else {
        error(`Invalid File Formate ${ele.name}`);
      }
    });

    setFiles(validFiles);
  };

  const form = useForm({
    initial: {
      subject: "",
      name: "",
      email: "",
      issue: "",
    },
    schema: validate.supportSchema,
    callback: handleSubmit,
  });

  return !isVerify ? (
    <DataLoading />
  ) : isLoggedIn ? (
    <>
      <div className="support-con">
        <div className="support-img">
          <Image
            src="/img/support.svg"
            height={400}
            width={400}
            alt="Support"
          />
        </div>
        <div className="support-form-con">
          <div className="support-page-title">
            <h2>{icons.support} New Ticket</h2>
          </div>

          <form className="support-form" onSubmit={form.handleSubmit}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              variant="outlined"
              value={form.values.subject}
              onChange={form.handleChange}
              helperText={form.errors.subject}
            />

            <div className="support-flex">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
                helperText={form.errors.name}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.values.email}
                onChange={form.handleChange}
                helperText={form.errors.email}
              />
            </div>

            <InputLabel>
              <small>File Format : .jpeg, .png, .pdf, .doc, .txt, .xls</small>
            </InputLabel>
            <TextField
              fullWidth
              type="file"
              name="file"
              inputProps={{
                multiple: true,
              }}
              onChange={handleFileUpload}
            />

            <InputLabel id="Issue">Elaborate your issue</InputLabel>

            <TextField
              rows={4}
              multiline={true}
              fullWidth
              label="Elaborate your issue"
              name="issue"
              value={form.values.issue}
              onChange={form.handleChange}
              helperText={form.errors.issue}
            />

            <Button
              className="btn btn-1 mt-2"
              variant="contained"
              size="large"
              type="submit"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting ? <Loading color="#FFF" /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>

      <Alert
        open={openSuccess}
        handleClose={() => setOpenSuccess(false)}
        animation="scale"
        data={{
          title:
            "Success! Your support ticket has been created. Our team will review your request and respond as soon as possible. Thank you for reaching out to us!",
          icon: "success",
          buttons: [
            {
              text: "Okay",
              callback: () => router.push("/support"),
            },
          ],
        }}
      />
    </>
  ) : (
    <div
      style={{
        height: 500,
        display: "flex",
        alignItems: "center",
        padding: "50px 0",
        background: "var(--color-4)",
      }}
    >
      <div className="login-mes-wrap">
        <div className="login-mes-box">
          <h3>Login or register to view or create tickets</h3>
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
          {
            <a onClick={() => dispatch(setAuthModel("login"))}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </a>
          }
        </div>
      </div>
    </div>
  );
}

export default Form;
