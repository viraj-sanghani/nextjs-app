import { useDispatch, useSelector } from "react-redux";
import {
  setBotOpen,
  restartBot,
  setFullScreen,
} from "@/redux/reducers/botReducer";
import icons from "@/utils/icons";
import Image from "next/image";

function Header({ fullScreen }) {
  const { isFullScreen } = useSelector((state) => state.bot);
  const dispatch = useDispatch();

  return (
    <div className="chat-header">
      <div className="img-wrap">
        <Image
          src={"/img/bot/botLogo.png"}
          alt="Bot Icon"
          width={50}
          height={50}
        />
      </div>
      <h2>HousingMagic</h2>
      <div className="bot-sound-btn" onClick={() => dispatch(restartBot())}>
        {icons.refresh}
      </div>
      {!fullScreen && (
        <>
          <div
            className="bot-close-btn"
            onClick={() => dispatch(setFullScreen(!isFullScreen))}
          >
            {isFullScreen ? icons.fullScreenExit : icons.fullScreen}
          </div>
          <div
            className="bot-close-btn"
            onClick={() => dispatch(setBotOpen(false))}
          >
            {icons.close}
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
