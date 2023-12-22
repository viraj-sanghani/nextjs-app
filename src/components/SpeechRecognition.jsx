"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setListenerOpen, setSpeechResult } from "@/redux/reducers/appReducer";
import icons from "@/utils/icons";
import Model from "./Model";
import { error } from "./Toast";
import { useModalBackPress } from "./CustomHook";

let recognition;

function SpeechReco() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listenerOpen } = useSelector((state) => state.app);
  const { searchType } = useSelector((state) => state.filter);
  const [isBlocked, setIsBlocked] = useState(false);
  const [initListening, setInitListening] = useState(false);
  const [listening, setListening] = useState(false);
  const [notCatch, setNotCatch] = useState(false);
  const [result, setResult] = useState("");

  const handleStop = () => {
    recognition && recognition.abort();
    dispatch(setListenerOpen(false));
  };

  useModalBackPress({
    open: listenerOpen,
    hide: handleStop,
  });

  const initSpeech = () => {
    setResult("");

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      return error(
        "Voice recognition is not supported by your browser, please retry with a supported browser e.g. Chrome"
      );
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      if (event.results[0]?.isFinal) {
        // dispatch(setSpeechResult();
        router.push(
          `/search/${searchType.for.toLowerCase()}/${searchType.type.toLowerCase()}/voice?keyword=${encodeURIComponent(
            event.results[0][0].transcript
          )}`
        );
      } else
        setResult(
          Object.values(event.results)
            .map((item) => item[0].transcript)
            .join("")
        );
    };

    recognition.onerror = (err) => {
      if (err.error === "no-speech") {
        setNotCatch(true);
      }
      if (err.error === "audio-capture") {
        error("Microphone not detected");
        dispatch(setListenerOpen(false));
      }
      if (err.error === "not-allowed") {
        setInitListening(false);
        setListening(false);
        setIsBlocked(true);
      }
      if (err.error === "network") {
        setIsBlocked(false);
        setNotCatch(false);
        setInitListening(false);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      dispatch(setListenerOpen(false));
    };

    recognition.onstart = () => {
      setIsBlocked(false);
      setNotCatch(false);
      setInitListening(true);
      setListening(true);
    };

    recognition.start();
  };

  const handleListening = useCallback(
    (start = true) => {
      if (start) {
        initSpeech();
      } else {
        handleStop();
      }
    },
    [recognition]
  );

  useEffect(() => {
    handleListening(listenerOpen);
  }, [listenerOpen]);

  return (
    <Model
      open={listenerOpen && (isBlocked || notCatch || initListening)}
      width={600}
      onClose={() => dispatch(setListenerOpen(false))}
      hideCloseBtn={true}
    >
      {
        isBlocked ? (
          <div>
            <h1 className="speech-model-title">Enable Microphone Permission</h1>
            <div className="speech-model-text">
              <div>
                To perform Voice Search, go to your{" "}
                <b>
                  browser <br /> settings
                </b>{" "}
                and allow access to microphone.
              </div>
            </div>
            <div className="mic-btn-outline">
              <button className="mic-btn" onClick={handleListening}>
                {icons.mic}
              </button>
            </div>
          </div>
        ) : notCatch ? (
          <div>
            <h1 className="speech-model-title">Didn't catch that.</h1>
            <div className="tap-title-wrap">
              <small className="tap-title">Tap to speak again</small>
            </div>
            <button className="mic-btn" onClick={handleListening}>
              {icons.mic}
            </button>
          </div>
        ) : initListening ? (
          <div>
            <h1 className="speech-model-title">
              {listening && "Listening..."}
            </h1>
            <div className="speech-model-text">
              <div className="title">Try Saying</div>
              <div>"Find 2BHK flats in Sector 100 Noida"</div>
              <div>"3BHK Villas near me"</div>
            </div>
            <div className="mic-btn-outline">
              <div className="tap-title-wrap">
                <small className="tap-title">
                  Tap to {listening ? "Stop" : "Speak"}
                </small>
              </div>
              <button
                className="mic-btn-1"
                onClick={() => handleListening(!listening)}
              >
                {listening && <div className="pulse-ring"></div>}
                {icons.mic}
              </button>
              <div className="speech-result">{result}</div>
            </div>
          </div>
        ) : (
          ""
        ) /* (
        <div>
          <h1 className="speech-model-title">
            Voice recognition is not supported by your browser
          </h1>
          <div className="speech-model-text">
            <div>
              please retry with a supported browser e.g. <b>Chrome</b>
            </div>
          </div>
        </div>
      ) */
      }
    </Model>
  );
}

export default SpeechReco;
