"use client";

import { useState } from "react";
import validate from "@/utils/validation";
import { error, success } from "@/components/Toast";
import { call, sendNewsLetter } from "@/services/api";

export default function ToolsFotter() {
  const [email, setEmail] = useState("");

  const addNewsLetter = async () => {
    const isValid = await validate.newsLetterSchema.isValid({ email });
    if (!isValid) {
      return error("Invalid Email");
    }

    try {
      const res = await call(sendNewsLetter({ email }));
      success(res?.message);
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          padding: "1.25rem",
          width: "100%",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <div className="email-flex">
          <p className="mort-p">
            {" "}
            If you would like the information presentation in this calculator to
            keep for offline viewing, printing or sharing enter your email below
            an <br /> <b>click 'Send'</b>
          </p>
          <div className="email-com-wrap">
            <div className="email-flex1">
              <div className="email-h1">Join 2,000+ subscribers</div>

              <div className="email-p">
                Stay in the loop with everything you need to know.
              </div>
            </div>

            <div className="email-w-full">
              <div className="email-input-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  className="email-sub-btn"
                  onClick={addNewsLetter}
                >
                  Send
                </button>
              </div>

              <div className="email-input-text">
                We care about your data in our{" "}
                <u className="email-input-ul">privacy policy</u>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
