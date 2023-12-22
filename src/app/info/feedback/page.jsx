"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import icons from "@/utils/icons";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import { success, error } from "@/components/Toast";
import validate from "@/utils/validation";
import { call, sendFeedback } from "@/services/api";

const Feedback = () => {
  const emoji = useRef(null);
  const [star, setStar] = useState(0);
  const handleStarClick = (index) => {
    emoji.current.style.transform = `translateX(-${index * 100}px)`;
    setStar(index + 1);
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    if (star <= 0) {
      error("Please give rating");
      return false;
    }
    try {
      const res = await call(sendFeedback({ ...values, rating: star }));
      success(res?.message);
      resetForm();
      setStar(0);
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const form = useForm({
    initial: {
      name: "",
      email: "",
      feedback: "",
    },
    schema: validate.feedbackSchema,
    callback: handleSubmit,
  });

  return (
    <div className="feedback">
      <div className="feedback-title">
        <h1>Feedback</h1>
      </div>
      <div className="feedback-wrap">
        <h4 className="title">
          We would love to hear you! give thoughts, suggestions or problems so
          we can improve!
        </h4>
        <div className="fd-emoji-con">
          <div className="fd-emoji" ref={emoji}>
            <Image
              src="/img/feedback/1.png"
              alt="poor"
              height={80}
              width={80}
            />
            <Image src="/img/feedback/2.png" alt="bad" height={80} width={80} />
            <Image
              src="/img/feedback/3.png"
              alt="okay"
              height={80}
              width={80}
            />
            <Image
              src="/img/feedback/4.png"
              alt="good"
              height={80}
              width={80}
            />
            <Image
              src="/img/feedback/5.png"
              alt="excellent"
              height={80}
              width={80}
            />
          </div>
        </div>
        <div className="fd-star-container">
          {[0, 0, 0, 0, 0].map((ele, i) => (
            <span
              className={star > i ? "active" : ""}
              key={i}
              onClick={() => handleStarClick(i)}
            >
              {star > i ? icons.starFilled : icons.star}
            </span>
          ))}
        </div>
        <form className="fd-form" onSubmit={form.handleSubmit}>
          <TextField
            className="fd-form-input"
            label="Name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            helperText={form.touched.name && form.errors.name}
          />
          <TextField
            className="fd-form-input"
            label="Email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            helperText={form.touched.email && form.errors.email}
          />
          <TextField
            className="fd-form-input"
            label="Type your feedback"
            multiline
            rows={4}
            name="feedback"
            value={form.values.feedback}
            onChange={form.handleChange}
            helperText={form.touched.feedback && form.errors.feedback}
          />
          <Button
            className="btn btn-1"
            variant="contained"
            size="large"
            type="submit"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Send Feedback"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
