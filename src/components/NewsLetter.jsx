import { useState } from "react";
import { error, success } from "./Toast";
import { call, sendNewsLetter } from "@/services/api";
import validate from "@/utils/validation";

function NewsLetter() {
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
      <h2 className="contact-title">News-Letter</h2>
      <div className="input-container">
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="invite-btn" onClick={addNewsLetter}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewsLetter;
