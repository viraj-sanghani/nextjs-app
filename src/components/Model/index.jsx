import { useRef } from "react";
import icons from "@/utils/icons";
import { useOutsideClick } from "../CustomHook";

function Model({
  className,
  children,
  open,
  width,
  hideCloseBtn = false,
  onClose,
  preventClose,
}) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, preventClose ? null : onClose);
  return (
    open && (
      <div className={`model-overlay center ${className ? className : ""}`}>
        <div className="model" style={{ maxWidth: width }} ref={wrapperRef}>
          {!hideCloseBtn && (
            <button onClick={onClose} className="model-close-btn">
              <span>{icons.close}</span>
            </button>
          )}
          {children}
        </div>
      </div>
    )
  );
}

export default Model;
