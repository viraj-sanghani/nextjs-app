"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
const html2pdf = dynamic(() => import("html2pdf.js"));

const HtmlToPdf = ({ data }) => {
  useEffect(() => {
    data?.content &&
      data?.options &&
      html2pdf().from(data.content).set(data.options).save();
  }, [data]);

  return;
};

export default HtmlToPdf;
