"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useFindVisibility,
  useModalBackPress,
  useOutsideClick,
} from "./CustomHook";
import { error } from "./Toast";
import {
  removeAllFromCompare,
  removeFromCompare,
  setInitCompare,
} from "@/redux/reducers/activityReducer";
import icons from "@/utils/icons";
import { propertySmallImg } from "@/utils/helper";
import { compareInvalidPath } from "@/utils/data";

function CompareSticky() {
  const dispatch = useDispatch();
  const router = useRouter();
  const showCompare = useFindVisibility(compareInvalidPath);
  const [showCompareBtn, setShowCompareBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const { compareList } = useSelector((state) => state.activity);
  const compareWrapRef = useRef(null);
  useOutsideClick(compareWrapRef, () => setOpen(false));

  const handleOpen = (show) => {
    setOpen(show);
  };

  useModalBackPress({
    open: open,
    hide: () => handleOpen(false),
  });

  useEffect(() => {
    setShowCompareBtn(compareList.length > 0);
  }, [compareList]);

  useEffect(() => {
    const compare = localStorage.getItem("compare");
    const data = compare ? JSON.parse(compare) : [];
    Array.isArray(data) &&
      data.length > 0 &&
      data.length <= 4 &&
      dispatch(setInitCompare(data));
  }, []);

  const handleRedirect = () => {
    if (compareList.length < 2)
      return error("Minimum 2 property required for comparison");
    handleOpen(false);
    router.push("/compare");
  };

  return (
    showCompare &&
    showCompareBtn && (
      <div className="compare-sticky-box" ref={compareWrapRef}>
        <div className={`com-sticky ${open ? "open" : ""}`}>
          {compareList.length > 0 ? (
            <>
              <div className="com-s-prop-list">
                {compareList.map((ele, i) => (
                  <div className="com-s-prop-item" key={i}>
                    <Link href={ele?.url} target="_blank">
                      <div className="com-s-item-img">
                        <Image
                          src={propertySmallImg(ele?.img)}
                          height={60}
                          width={60}
                          alt={ele?.title}
                        />
                      </div>
                    </Link>
                    <Link href={ele?.url} target="_blank">
                      <div className="com-s-item-details">
                        <h4>{ele?.title}</h4>
                        <p>{ele?.desc}</p>
                      </div>
                    </Link>
                    <button
                      className="com-s-item-remove"
                      onClick={() => dispatch(removeFromCompare(ele))}
                    >
                      {icons.close}
                    </button>
                  </div>
                ))}
              </div>

              <div className="com-s-prop-btns">
                <Button
                  onClick={() => dispatch(removeAllFromCompare())}
                  color="error"
                >
                  Remove All
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleRedirect}
                >
                  Compare
                </Button>
              </div>
            </>
          ) : (
            <div className="com-no-data">No property to compare</div>
          )}
        </div>
        {!open && (
          <div className="com-stk-btn" onClick={() => handleOpen(true)}>
            <div className="mobile-hide">
              <div>C</div>
              <div>o</div>
              <div>m</div>
              <div>p</div>
              <div>a</div>
              <div>r</div>
              <div>e</div>
            </div>
            <div style={{ marginTop: 10 }}>( {compareList.length} )</div>
          </div>
        )}
      </div>
    )
  );
}

{
  /* <div className="com-stk-btn" onClick={()=>handleOpen(true)}>
          Compare ( {compareList.length} )
        </div> */
}

export default CompareSticky;
