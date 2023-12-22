"use client";

import "./style.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ChatCon from "./ChatCon";
import images from "@/utils/images";
import { setBotOpen } from "@/redux/reducers/botReducer";
import { chatbotInvalidPath } from "@/utils/data";
import { useFindVisibility, useModalBackPress } from "@/components/CustomHook";
import Image from "next/image";

function Bot({ fullScreen }) {
  const dispatch = useDispatch();
  const { isOpen, isFullScreen } = useSelector((state) => state.bot);
  const message = "Click here to see the magic 🤖"; // "🙌 Welcome back! How may I help you today? 🤖";
  const showBot = useFindVisibility(chatbotInvalidPath);

  fullScreen && dispatch(setBotOpen(true));

  useModalBackPress({
    open: isOpen,
    hide: () => dispatch(setBotOpen(false)),
  });

  /* const handleMessage = (e) => {
    if (e.data.flag === "returnData") {
      dispatch(setLocalData(e.data.items));
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    dispatch(
      sendMessage({
        flag: "getData",
        keys: ["userId", "botId", "apiKey", "resId", "curMenu"],
      })
    );
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    key && localData && dispatch(fetchData(key, localData));
  }, [key, localData?.userId]); */

  return (
    (fullScreen || showBot) && (
      <>
        <div
          className={`chat-popup align-right ${!isOpen ? "d-none" : ""} ${
            fullScreen || isFullScreen ? "full-screen" : ""
          }`}
        >
          <Header fullScreen={fullScreen} />
          <ChatCon />
          {/* <Footer /> */}
        </div>

        <div
          className={`chat-popup-btn-wrap align-right ${
            isOpen ? "d-none" : ""
          }`}
        >
          <div
            className="chat-popup-btn"
            onClick={() => dispatch(setBotOpen(true))}
          >
            <Image
              className="close-popup-icon"
              src={"/img/bot/botLogo.png"}
              alt="Bot Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="wel-mes">
            {/*  {message.split("").map((ele, i) => (
              <span key={i}>{ele}</span>
            ))} */}
            {message}
          </h3>
        </div>
      </>
    )
  );
}

export default Bot;
