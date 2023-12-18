import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import icons from "@/utils/icons";
import MesCon from "./MesCon";
import { validate } from "./validate";
import { error } from "@/components/Toast";
import images from "@/utils/images";
import { initChat, newRes } from "@/redux/actions/bot";
import moment from "moment";
import Image from "next/image";

function ChatCon() {
  const dispatch = useDispatch();
  const chatMesRef = useRef(null);
  const { menu, isOpen, isInitChat, curMenu } = useSelector(
    (state) => state.bot
  );

  useEffect(() => {
    isOpen && !isInitChat && dispatch(initChat(menu));
  }, [isOpen, isInitChat]);

  const setData = (val, key) => {
    setInfoFormData({ ...infoFormData, [key]: val });
  };

  const handleInfoSubmit = () => {
    let err;
    for (const key in infoFormData) {
      err = validate(infoFormData[key], key);
      if (err) break;
    }
    if (!err) {
      dispatch(setInfoData(infoFormData));
    } else error(err);
  };

  const sendMes = () => {
    const val = chatMesRef.current.value;
    if (val) {
      const err =
        curMenu?.valid && curMenu?.valid !== "any"
          ? validate(val, curMenu?.valid)
          : false;
      if (!err) {
        chatMesRef.current.value = "";
        chatMesRef.current.disabled = true;
        chatMesRef.current.focus();
        dispatch(newRes(val, curMenu.save, menu, curMenu?.next));
      } else {
        error(err);
      }
    }
  };

  return (
    <div className="chat-body">
      {false ? (
        <div className="chat-intro-sec">
          <div className="intro-header">
            <div className="itr-hdr-logo">
              <Image
                src={"/img/bot/botLogo.png"}
                alt="Bot Icon"
                width={50}
                height={50}
              />
            </div>
            <p className="itr-txt">
              Please fill out the form below to start chatting.
            </p>
          </div>
          <div className="intro-form">
            <TextField
              className="intro-input"
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) => setData(e.target.value, "name")}
            />
            <TextField
              className="intro-input"
              label="Email Id"
              variant="outlined"
              size="small"
              onChange={(e) => setData(e.target.value, "email")}
            />
            <TextField
              className="intro-input"
              label="Mobile No"
              variant="outlined"
              size="small"
              onChange={(e) => setData(e.target.value, "mobile")}
            />
            <Button variant="contained" onClick={handleInfoSubmit}>
              {icons.send} Start Chat
            </Button>
          </div>
        </div>
      ) : (
        <>
          <MesCon />

          <div className="chat-mes-box">
            <input
              type="text"
              className="chat-text-box"
              id="messageChatInput"
              placeholder="Type your message here"
              autoComplete="off"
              ref={chatMesRef}
              onKeyDown={(e) => {
                e.keyCode === 13 && sendMes(e.target.value);
              }}
              disabled={curMenu?.type === "question" ? false : true}
            />
            <Button
              className="send-btn"
              variant="contained"
              onClick={sendMes}
              disabled={curMenu?.type === "question" ? false : true}
            >
              {icons.send}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatCon;
