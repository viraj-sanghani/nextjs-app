"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setListenerOpen, setLocationOpen } from "@/redux/reducers/appReducer";
import icons from "@/utils/icons";
import DataLoading from "./DataLoading";
import { useGetSearchSuggestion } from "./../queryHooks/useSearchSuggestion";
import SearchbarFilter from "./SearchbarFilter";
import { setSearchType } from "@/redux/reducers/filterReducer";
import { useModalBackPress, useOutsideClick } from "./CustomHook";

const propertyTypes = [
  "residential",
  "commercial",
  "plots-land" /* , "projects" */,
];

function Searchbar({ isHome }) {
  const dispatch = useDispatch();
  const { searchType } = useSelector((state) => state.filter);
  const [search, setSearch] = useState("");
  const [showType, setShowType] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState({});
  const typeWrapRef = useRef(null);
  const searchInput = useRef(null);

  useOutsideClick(typeWrapRef, () => setShowType(false));

  const { data: suggestionList } = useGetSearchSuggestion(
    search,
    searchType.type || "buy"
  );

  const handleBackButton = (e) => {
    searchInput.current.blur();
    setShowSuggestion(false);
    setShowFilter(false);
  };

  useModalBackPress({
    open: showSuggestion || showFilter,
    hide: handleBackButton,
  });

  useEffect(() => {
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      setShowSuggestion(true);
      setShowFilter(false);
    } else {
      setShowFilter(true);
      setShowSuggestion(false);
    }
  };

  const handleKeyUp = (e) => {
    if (e.target.value.length > 0) {
      setShowSuggestion(true);
      setShowFilter(false);
    } else {
      setShowSuggestion(false);
      setShowFilter(true);
    }
    if (e.key === "ArrowUp" && selectedIndex > 0)
      setSelectedIndex((prev) => prev - 1);
    else if (e.key === "ArrowDown" && selectedIndex < suggestionList.length - 1)
      setSelectedIndex((prev) => prev + 1);
    else if (e.key === "Enter" && selectedIndex >= 0)
      handleSugClick(suggestionList[selectedIndex]);
  };

  const handleSugClick = (ele) => {
    if (ele.type === "project") {
      setShowSuggestion(false);
      setShowFilter(false);
      setSearch("");
      setSelectedItem(null);
      ele?.url && window.open(ele.url);
    } else {
      setShowSuggestion(false);
      setShowFilter(true);
      setSearch("");
      setSelectedItem(ele);
    }
  };

  const handleLocation = () => {
    setShowSuggestion(false);
    setShowFilter(false);
    dispatch(setLocationOpen(true));
  };

  const handleVoiceSearch = () => {
    setShowSuggestion(false);
    setShowFilter(false);
    dispatch(setListenerOpen(true));
  };

  const handleSearchChange = (data) => {
    dispatch(setSearchType(data));
    setShowType(false);
  };

  return (
    <>
      <div className="searchbar-box">
        <div
          className={`searchbar-layer ${
            showSuggestion || showFilter ? "active" : ""
          }`}
          onClick={() => {
            setShowSuggestion(false);
            setShowFilter(false);
          }}
        ></div>

        <div
          className={`searchbar-con ${
            showSuggestion || showFilter ? "active" : ""
          }`}
        >
          {(isHome || showFilter || showSuggestion) && (
            <div className="s-prop-type-con">
              {(showFilter || showSuggestion) && (
                <div className="s-prop-t-wrap p-type-m-btn">
                  <div className="p-type-select-con" ref={typeWrapRef}>
                    <div
                      className="p-type-btn"
                      onClick={() => setShowType(true)}
                    >
                      {searchType.for}{" "}
                      {showType ? icons.upArrow : icons.downArrow}
                    </div>
                    <div
                      className={`p-type-option-wrap ${showType ? "show" : ""}`}
                    >
                      {["buy", "rent"].map((ele, i) => (
                        <div
                          key={i}
                          className={`p-type-item ${
                            searchType.for === ele ? "active" : ""
                          }`}
                          onClick={() => handleSearchChange({ for: ele })}
                        >
                          {ele}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {propertyTypes.map((item, i) => (
                <div
                  key={i}
                  className={`s-p-t-item ${
                    searchType.type === item ? "active" : ""
                  }`}
                  onClick={() => handleSearchChange({ type: item })}
                >
                  <div className="s-p-t-i-title">{item}</div>
                </div>
              ))}
            </div>
          )}
          <div className="searchbar">
            <span className="search-close-icon" onClick={handleBackButton}>
              {icons.close}
            </span>
            <span className="search-icon">{icons.search}</span>
            <div className="input-wrap">
              <input
                ref={searchInput}
                type="text"
                placeholder="Search for city, locality, property" // , landmark project, or builder
                value={search}
                onFocus={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeyUp}
              />
            </div>
            <div
              className="location-icon"
              onClick={handleLocation}
              title="Near by location"
            >
              {icons.location}
            </div>
            <div
              className="voice-icon"
              onClick={handleVoiceSearch}
              title="Voice search"
            >
              {icons.mic}
            </div>
          </div>

          <SearchbarFilter
            searchParams={selectedItem}
            className={!showFilter ? "hide" : ""}
          />

          <div
            className={`search-suggestion-wrap ${
              !showSuggestion ? "hide" : ""
            }`}
          >
            {suggestionList ? (
              suggestionList.length > 0 ? (
                suggestionList.map((ele, i) => (
                  <div
                    className={
                      selectedIndex === i ? "s-sug-item active" : "s-sug-item"
                    }
                    key={i}
                    onClick={() => handleSugClick(ele)}
                  >
                    <div className="sug-title">{ele.title}</div>
                    <div className="sug-type">{ele.type}</div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <Image
                    src="/img/no-result.gif"
                    height={300}
                    width={400}
                    alt="No Result"
                  />
                </div>
              )
            ) : (
              <DataLoading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
