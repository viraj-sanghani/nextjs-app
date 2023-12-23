"use client";

import { useEffect, useState } from "react";

const sectionNames = ["Home", "Overview", "Location", "More Details"];

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const sectionOffsets = sectionNames.map((section) => {
      const element = document.getElementById(section.replace(" ", ""));
      return element ? element.offsetTop : 0;
    });

    const scrollTop = window.scrollY;
    const scrollPosition = scrollTop + window.innerHeight * 0.25;
    let activeSection = 0;

    for (let i = sectionOffsets.length - 1; i >= 0; i--) {
      if (scrollPosition >= sectionOffsets[i]) {
        activeSection = i;
        break;
      }
    }

    setActiveSection(activeSection);
  };

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const scrollToOffset = sectionElement.offsetTop - 150;
      window.scrollTo({ top: scrollToOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="prop-d-sticky-header">
      <div className="prop-d-com-header">
        {sectionNames.map((section, index) => (
          <div
            key={index}
            className={
              activeSection === index
                ? "prop-d-header-item active"
                : "prop-d-header-item"
            }
            onClick={() => scrollToSection(section.replace(" ", ""))}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNav;
