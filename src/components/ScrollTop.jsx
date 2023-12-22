"use client";

import { useEffect, useState } from "react";
import icons from "@/utils/icons";
import { ScrollBtnInvalidPath } from "@/utils/data";
import { useFindVisibility } from "./CustomHook";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const showBtn = useFindVisibility(ScrollBtnInvalidPath);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible &&
    showBtn && (
      <div className="scroll-to-top" onClick={scrollToTop}>
        {icons.arrowUpward}
      </div>
    )
  );
}

export default ScrollTop;
