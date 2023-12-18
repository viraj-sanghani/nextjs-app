import React, { Fragment, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, List, URL, Form, Property, DateTitle } from "./Chat";
import images from "@/utils/images";
import { newRes } from "@/redux/actions/bot";

function MesCon() {
  const dispatch = useDispatch();
  const chatConRef = useRef(null);
  const { menu, chats, isChatLoading, attributesData } = useSelector(
    (state) => state.bot
  );

  const AGENT_IMG = "/img/bot/agent.png";
  const CUSTOMER_IMG = "/img/bot/customer.png";

  const scrollToBottom = () => {
    setTimeout(() => {
      const scrollHeight = chatConRef.current.scrollHeight;
      const height = chatConRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatConRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const selectBtn = (btn) => {
    dispatch(newRes(btn.mes, menu[btn.parent].save, menu, btn?.next));
  };

  const icon = (align) => (align === "r" ? CUSTOMER_IMG : AGENT_IMG);

  const mes = {
    text: (i, a, item) => <Text key={i} align={a} icon={icon(a)} item={item} />,

    question: (i, a, item) => (
      <Text key={i} align={a} icon={icon(a)} item={item} />
    ),

    list: (i, a, item) => (
      <List
        key={i}
        align={a}
        icon={icon(a)}
        item={item}
        selectBtn={selectBtn}
      />
    ),

    url: (i, a, item) => <URL key={i} align={a} icon={icon(a)} item={item} />,

    form: (i, a, item) => <Form key={i} align={a} icon={icon(a)} item={item} />,

    property: (i, a, item) => (
      <Property key={i} align={a} icon={icon(a)} item={item} />
    ),

    dateTitle: (i, mes) => <DateTitle key={i} mes={mes} />,
  };

  let last, cur;

  return (
    <div className="chat-container" ref={chatConRef}>
      {chats.length > 0 &&
        chats.map((chat, i) => {
          cur = chat.createdAt.split(" ")[0];
          if (last === cur) return mes[chat.type](i, chat.align, chat);
          else {
            last = cur;
            return (
              <Fragment key={i}>
                {mes["dateTitle"](i + "1", cur)}
                {mes[chat.type](i + "2", chat.align, chat)}
              </Fragment>
            );
          }
        })}
      {isChatLoading && (
        <div className="chat-left">
          <div className="chat-mes">
            <div className="chat-bot-loading-text"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MesCon;
