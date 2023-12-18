import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import menu from "@/Bot/menu";

const initState = {
  menu: menu,
  isOpen: false,
  isInitChat: false,
  isFullScreen: false,
  curMenu: {},
  attributesData: {},
  chats: [
    /* {
      type: "text",
      align: "l",
      mes: "👋Hi , I'm HousingMagic Assistant and I see that you're looking to Buy a Residential Property in Mumbai",
      createdAt: "06-06-2023 11:00 AM",
    },
    {
      type: "question",
      align: "l",
      mes: "How are you?",
      createdAt: "06-06-2023 11:01 AM",
    },
    {
      type: "list",
      align: "l",
      opt: [
        {
          key: 215905,
          type: "option",
          mes: "Mumbai",
          parent: 476289,
          next: 975877,
        },
        {
          key: 904795,
          type: "option",
          mes: "Navi Mumbai",
          parent: 476289,
          next: 516720,
        },
        {
          key: 696141,
          type: "option",
          mes: "Thane",
          parent: 476289,
          next: 455414,
        },
        {
          key: 898700,
          type: "option",
          mes: "Raigarh",
          parent: 476289,
          next: 424213,
        },
        {
          key: 648421,
          type: "option",
          mes: "Pune",
          parent: 476289,
          next: 305747,
        },
      ],
      mes: "Which City are you looking to view a Property in?",
      createdAt: "06-06-2023 11:01 AM",
    },
    {
      type: "property",
      align: "l",
      mes: "Property Slider",
      url: "http://localhost:5000/api/v1/bot/properties",
      params: {
        city: "Thane",
        for: "Sale",
        type: "Flat/Apartment",
        bhk: "2 BHK",
        budget: "10000000",
      },
      createdAt: "06-06-2023 11:02 AM",
    }, */
  ],
  isChatLoading: true,
  attributesData: {},
};

export const botSlice = createSlice({
  name: "bot",
  initialState: initState,
  reducers: {
    setBotOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setInitChat: (state, action) => {
      state.isInitChat = true;
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
    restartBot: (state, action) => {
      state.isInitChat = false;
      state.attributesData = {};
      state.chats = [];
      state.curMenu = {};
    },
    setChatLoading: (state, action) => {
      state.isChatLoading = true;
    },
    nextQues: (state, action) => {
      state.isChatLoading = false;
      let key = action.payload?.next;
      // state.localData = { ...state.localData, curMenu: key };

      const ele = { ...state.menu[key] };
      if (ele) {
        if (ele.type === "property") {
          let p = {};
          ele?.params &&
            ele.params.length > 0 &&
            ele?.params.map((e) => {
              p[e.key] = state.attributesData[e.value] || e?.defaultValue;
            });
          ele.params = p;
        }
        // RECEIVE_AUDIO.play();
        state.chats = [
          ...state.chats,
          {
            ...ele,
            align: "l",
            createdAt: moment().format("YYYY-MM-DD h:mm:ss"),
          },
        ];
        state.curMenu = ele;
      }
    },
    addChat: (state, action) => {
      if (action.payload?.save) {
        state.attributesData = {
          ...state.attributesData,
          [action.payload.save]: action.payload.mes,
        };
      }

      const chats = [
        ...state.chats,
        { ...action.payload, createdAt: moment().format("YYYY-MM-DD h:mm:ss") },
      ];
      if (action.payload.align === "l") {
      } /* RECEIVE_AUDIO.play(); */ else {
        // SEND_AUDIO.play();
        const index = chats.findIndex((ele) => ele.key == state.curMenu?.key);
        if (index != -1 && chats[index]?.opt) {
          chats[index].opt = [];
        }
      }
      state.chats = chats;
    },
  },
});

export const {
  setBotOpen,
  setFullScreen,
  restartBot,
  setChatLoading,
  setInitChat,
  nextQues,
  addChat,
} = botSlice.actions;

export default botSlice.reducer;
