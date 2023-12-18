import {
  addChat,
  nextQues,
  setChatLoading,
  setInitChat,
} from "../reducers/botReducer";

const checkWaiting = (type) => {
  return ["question", "list", "form"].includes(type);
};

const sendNextQues = (menu, key) => (dispatch) => {
  dispatch(setChatLoading());
  let ele = menu[key];
  if (ele?.target) {
    ele = menu[ele?.target];
  }
  setTimeout(() => {
    const next = ele && !checkWaiting(ele.type) ? ele?.next : false;
    dispatch(nextQues({ next: ele.key }));
    next && dispatch(sendNextQues(menu, next));
  }, 1000);
};

const initChat = (menu) => async (dispatch) => {
  dispatch(setInitChat());

  let ele = Object.values(menu).filter((e) => e.prev === null);
  if (ele[0]) {
    dispatch(sendNextQues(menu, ele[0].key));
  }
};

const newRes =
  (val, save, menu, key = null) =>
  (dispatch) => {
    dispatch(addChat({ type: "text", mes: val, save: save, align: "r" }));
    dispatch(sendNextQues(menu, key));
  };

const newMes = (val) => (dispatch) => {
  dispatch(addChat({ type: "text", mes: val, align: "r" }));
};

export { initChat, newRes, newMes };
