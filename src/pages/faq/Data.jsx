"use client";

import icons from "@/utils/icons";
import React, { useState } from "react";

function Data({ d }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDivClick = (index) => {
    if (expandedIndex === index) {
      // Clicked on an already expanded div, so shrink it
      setExpandedIndex(null);
    } else {
      // Clicked on a different div, expand it
      setExpandedIndex(index);
    }
  };
  return (
    <div>
      <div className="page-title">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="max-width page-content">
        <div className="faq-question-container">
          {d?.length > 0 &&
            d.map((ele, i) => (
              <div className="faq-question-wrap" key={i}>
                <div
                  className="faq-w-question"
                  onClick={() => handleDivClick(i)}
                >
                  {ele.question}
                  {expandedIndex === i ? icons.upArrow : icons.downArrow}
                </div>
                {expandedIndex === i && (
                  <div className="faq-w-answer">{ele.answer}</div>
                )}
              </div>
            ))}
        </div>
        <h3 className="page-con-title faq-section">
          How can housingmagic FAQ help users?
        </h3>
        <p className="faq-detail">
          Welcome to the housingmagic FAQ (Frequently Asked Questions) page,
          where buyers and owners can find answers to their questions related to
          login or registration, property search, property advertisement
          posting, account management and other related topics. Start your
          search by simply entering keywords in the search-bar, located at the
          top of the page or you can browse through questions under the
          categories given below. Alternatively, you can also reach out to us at
          1234-56-7890 (Monday to Saturday, 9 AM to 7 PM) to talk to our
          customer support executive.
        </p>
      </div>
    </div>
  );
}

export default Data;
