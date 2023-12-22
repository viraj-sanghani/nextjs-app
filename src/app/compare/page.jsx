"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Sticky from "react-stickynode";
import { Button } from "@mui/material";
import DataLoading from "@/components/DataLoading";
import { useGetCompareProperty } from "@/queryHooks/useGetCompareProperty";
import { removeFromCompare } from "@/redux/reducers/activityReducer";
import icons from "@/utils/icons";
import HtmlToPdf from "@/components/HtmlToPdf";

function Compare() {
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const [property, setProperty] = useState([]);
  const [PDFData, setPDFData] = useState({});
  const { compareList } = useSelector((state) => state.activity);
  const contentRef = useRef(null);

  const {
    data,
    isLoading: loading,
    isFetching,
    isError,
    error,
  } = useGetCompareProperty(compareList.map((ele) => ele.id));
  if (isError) {
    console.log(error);
  }

  const handleResize = () => {
    setIsSticky(window.innerWidth >= 1250);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data?.data) {
      const arr = compareList.map((ele) => ele.id);
      const idToIndexMap = {};
      for (let i = 0; i < arr.length; i++) {
        idToIndexMap[arr[i]] = i;
      }
      const propArr = data.data;
      propArr.sort((a, b) => idToIndexMap[a.id] - idToIndexMap[b.id]);
      setProperty(propArr.filter((ele) => arr.includes(ele.id)));
    }
  }, [compareList, data]);

  const downloadPDF = () => {
    const content = contentRef.current;
    const options = {
      margin: 0,
      filename: "comparison.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a3",
        orientation: "landscape",
        // width: 1200,
      },
    };

    setPDFData({ content, options });
  };

  return (
    <>
      <div className="compare-con">
        <div className="compare-heading-wrap">
          <h3 className="compare-title">Compare Properties</h3>
          {property.length > 0 && (
            <Button variant="contained" onClick={downloadPDF}>
              Download as PDF
            </Button>
          )}
        </div>
        <div ref={contentRef} className="compare-scroll-wrap">
          <Sticky enabled={isSticky} top={70} innerZ={1}>
            <div className="com-header">
              {compareList.length > 0 ? (
                <div className="com-prop-con">
                  <div className="com-prop-item"></div>
                  {compareList.map((ele, i) => (
                    <div className="com-prop-item" key={i}>
                      <Link href={ele.url} target="_blank">
                        <div className="com-prop-item-img">
                          {property.length > 0 ? (
                            <Image
                              src={property[i].img}
                              height={150}
                              width={200}
                              alt={ele.title}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <h4>{ele.title}</h4>
                        <p>{ele.desc}</p>
                      </Link>
                      <button
                        className="com-prop-item-remove"
                        onClick={() => dispatch(removeFromCompare(ele))}
                      >
                        {icons.close}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="com-no-data">No property to compare</div>
              )}
            </div>
          </Sticky>

          {compareList.length > 0 &&
            (loading ? (
              <DataLoading />
            ) : (
              <div className="com-data">
                <div className="com-data-item">
                  {data?.titles &&
                    data.titles.length > 0 &&
                    data.titles.map((val, i) => (
                      <p key={i}>
                        <span>{val}</span>
                      </p>
                    ))}
                </div>
                {property.map((ele, i) => (
                  <div className="com-data-item" key={i}>
                    {data.fields.map((key, index) => (
                      <p key={index}>
                        <span>{ele[key] || "-"}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <HtmlToPdf data={PDFData} />
    </>
  );
}

export default Compare;
