"use client";

import { useRef, useState } from "react";
import Sticky from "react-stickynode";
import { useDispatch, useSelector } from "react-redux";
import icons from "@/utils/icons";
import { sort as sortBy } from "@/utils/data";
import {
  setShowFilter,
  setSort,
  setViewType,
} from "@/redux/reducers/filterReducer";
import { useOutsideClick } from "@/components/CustomHook";

function ResultHeader({ desktop = false }) {
  const dispatch = useDispatch();
  const [sortOpen, setSortOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { sort, totalResults, viewType } = useSelector((state) => state.filter);
  const sortWrapRef = useRef(null);
  useOutsideClick(sortWrapRef, () => setSortOpen(false));
  const viewWrapRef = useRef(null);
  useOutsideClick(viewWrapRef, () => setViewOpen(false));

  const handleSortValue = (val) => {
    setSortOpen(false);
    dispatch(setSort(val.value));
  };

  const handleViewValue = (val) => {
    setViewOpen(false);
    dispatch(setViewType(val));
  };

  return (
    <div className={`s-r-header ${desktop ? "desktop-device" : ""}`}>
      <Sticky enabled={true} top={70} bottomBoundary="#sticky-container">
        <div className="s-r-h-box">
          <div className="s-r-list-total">{totalResults} results</div>
          <div className="s-r-btn-con">
            <div
              className="s-r-m-btn"
              onClick={() => dispatch(setShowFilter(true))}
            >
              {icons.filter}
              <div className="s-r-m-btn-label">Filter</div>
            </div>
            <div className="s-r-m-btn">
              {icons.sort}
              <div className="sort-select-con" ref={sortWrapRef}>
                <div
                  className="s-r-m-btn-label"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  {sort || "Sort By"}{" "}
                  {sortOpen ? icons.upArrow : icons.downArrow}
                </div>
                <div className={`sort-option-wrap ${sortOpen ? "show" : ""}`}>
                  {sortBy.map((ele, i) => (
                    <div
                      key={i}
                      className={`sort-item ${
                        sort === ele.value ? "active" : ""
                      }`}
                      onClick={() => handleSortValue(ele)}
                    >
                      {ele.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="s-r-m-btn s-r-m-btn-mobile">
              {icons.view}
              <div className="sort-select-con" ref={viewWrapRef}>
                <div
                  className="s-r-m-btn-label"
                  onClick={() => setViewOpen(!viewOpen)}
                >
                  {viewType} {viewOpen ? icons.upArrow : icons.downArrow}
                </div>
                <div
                  className={`sort-option-wrap ${viewOpen ? "show" : ""}`}
                  style={{ left: 0, width: 150 }}
                >
                  <div
                    className={`sort-item ${
                      viewType === "list" ? "active" : ""
                    }`}
                    onClick={() => handleViewValue("list")}
                  >
                    Property List
                  </div>
                  <div
                    className={`sort-item ${
                      viewType === "map" ? "active" : ""
                    }`}
                    onClick={() => handleViewValue("map")}
                  >
                    Property on Map
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    </div>
  );
}

export default ResultHeader;
