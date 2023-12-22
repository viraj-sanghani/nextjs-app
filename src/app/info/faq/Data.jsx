"use client";

import { useState } from "react";
import icons from "@/utils/icons";

const Data = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDivClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    data?.length > 0 &&
    data.map((ele, i) => (
      <div className="faq-question-wrap" key={i}>
        <div className="faq-w-question" onClick={() => handleDivClick(i)}>
          {ele.question}
          {expandedIndex === i ? icons.upArrow : icons.downArrow}
        </div>
        {expandedIndex === i && (
          <div className="faq-w-answer">{ele.answer}</div>
        )}
      </div>
    ))
  );
};

export default Data;
