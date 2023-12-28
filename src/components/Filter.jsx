"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Slider, Switch } from "@mui/material";
import icons from "@/utils/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterData,
  setFilterInit,
  setShowFilter,
  setVoiceData,
} from "@/redux/reducers/filterReducer";
import { formatNumber } from "@/utils/helper";
import { useModalBackPress, useOutsideClick } from "./CustomHook";
import { processSearch } from "@/utils/voiceSearch";
import {
  getFilterFields,
  keyValues,
  getFilters,
  sliderKeys,
} from "@/utils/data";
import FilterSkeleton from "./Skeleton/FilterSkeleton";

function Filter() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { params } = useParams();
  const searchParams = useSearchParams();
  const searchType = {
    for: params[0] || "default",
    type: params[1] || "default",
  };
  const { showFilter } = useSelector((state) => state.filter);
  const [pageInit, setPageInit] = useState(false);
  const [filter, setFilter] = useState([]);
  const [sliderFields, setSliderFields] = useState({});
  const [itemsShow, setItemsShow] = useState({
    propertyType: true,
    bedRoom: true,
    constructionStatus: true,
    postBy: true,
    purchaseType: true,
    amenities: true,
    furnishing: true,
    budget: true,
    area: true,
  });
  const [switchItems, setSwitchItems] = useState({
    alreadySeen: false,
    verified: false,
  });
  const [activeFilters, setActiveFilters] = useState([]);

  useModalBackPress({
    open: showFilter,
    hide: () => dispatch(setShowFilter(false)),
  });

  const filterWrapRef = useRef(null);
  useOutsideClick(filterWrapRef, () => dispatch(setShowFilter(false)));

  const handleTitle = (value, max) => {
    return formatNumber(value) + (value == max ? "+" : "");
  };

  const handleSliderChange = (
    event,
    newValue,
    activeThumb,
    key,
    max,
    minDistance
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setSliderFields({
          ...sliderFields,
          [key]: {
            ...sliderFields[key],
            value: [clamped, clamped + minDistance],
          },
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSliderFields({
          ...sliderFields,
          [key]: {
            ...sliderFields[key],
            value: [clamped - minDistance, clamped],
          },
        });
      }
    } else {
      setSliderFields({
        ...sliderFields,
        [key]: {
          ...sliderFields[key],
          value: newValue,
        },
      });
    }
  };

  const handleSliderStop = (e, newValue, key, maxVal) => {
    const isPresent = activeFilters.some((ele) => ele.type === key);
    const max = newValue[1] == maxVal ? "+" : "";

    const item = {
      title: `₹ ${formatNumber(newValue[0])} - ${formatNumber(
        newValue[1]
      )}${max}`,
      value: { min: newValue[0], max: newValue[1] },
      active: true,
      type: key,
    };

    if (isPresent) {
      setActiveFilters((prevData) =>
        prevData.map((ele) => {
          if (ele.type === key) {
            return item;
          } else return ele;
        })
      );
    } else setActiveFilters((prevData) => [...prevData, item]);
  };

  const handleToggleItem = (key) => {
    setItemsShow({ ...itemsShow, [key]: !itemsShow[key] });
  };

  const handleToggleSwitch = (key) => {
    dispatch(setFilterData({ hideSeen: !switchItems[key] }));
    setSwitchItems({ ...switchItems, [key]: !switchItems[key] });
  };

  const removeFilterEle = (item, itemIndex) => {
    if (sliderKeys.includes(item.type))
      setSliderFields((prev) => {
        return {
          ...prev,
          [item.type]: {
            ...prev[item.type],
            value: prev[item.type].range,
          },
        };
      });
    else
      setFilter(
        filter.map((ele, i) => {
          if (ele.key === item.type) {
            ele.items = ele.items.map((e, index) => {
              if (item.title === e.title && item.type === e.type) {
                e.active = false;
              }
              return e;
            });
          }
          return ele;
        })
      );
    setActiveFilters(activeFilters.filter((e, i) => i !== itemIndex));
  };

  const clearFilterAll = () => {
    setFilter(
      filter.map((ele) => {
        if (!sliderKeys.includes(ele.key)) {
          ele.items = ele.items.map((e) => {
            e.active = false;
            return e;
          });
        }
        return ele;
      })
    );

    const newData = {};
    for (const key in sliderFields) {
      newData[key] = {
        ...sliderFields[key],
        value: sliderFields[key].range,
      };
    }

    setSliderFields(newData);
    setActiveFilters([]);
  };

  const clearFilter = (e, type) => {
    e.stopPropagation();
    if (sliderKeys.includes(type))
      setSliderFields((prev) => {
        return {
          ...prev,
          [type]: {
            ...prev[type],
            value: prev[type].range,
          },
        };
      });
    else
      setFilter(
        filter.map((ele) => {
          if (ele.key === type) {
            ele.items = ele.items.map((e) => {
              e.active = false;
              return e;
            });
          }
          return ele;
        })
      );
    setActiveFilters(activeFilters.filter((ele) => ele.type !== type));
  };

  const handleToggleFilter = (mainIndex, item, itemIndex) => {
    let isActive = false;
    setFilter(
      filter.map((ele, i) => {
        if (mainIndex === i) {
          ele.items = ele.items.map((e, index) => {
            if (itemIndex === index) {
              isActive = e.active;
              e.active = !e.active;
            }
            return e;
          });
        }
        return ele;
      })
    );
    if (isActive) {
      setActiveFilters(
        activeFilters.filter(
          (e, i) => e.title !== item.title || e.type !== item.type
        )
      );
    } else setActiveFilters([...activeFilters, item]);
  };

  const handleShowAll = (index) => {
    setFilter(
      filter.map((ele, i) => {
        if (index === i) {
          ele.showAll = true;
        }
        return ele;
      })
    );
  };

  const updateFilters = () => {
    if (pageInit) {
      const data = {
        propertyType: [],
        bedRoom: [],
        constructionStatus: [],
        postBy: [],
        purchaseType: [],
        furnishing: [],
        budget: {},
        area: {},
      };

      activeFilters.forEach((ele) => {
        if (!sliderKeys.includes(ele.type))
          data[ele.type] && data[ele.type].push(ele.value);
        else data[ele.type] = ele.value;
      });

      dispatch(setFilterData(data));
      dispatch(setFilterInit(true));
      if (filterWrapRef.current) {
        filterWrapRef.current.scrollTop = 0;
      }
    } else {
      let data;
      let active = [];
      const fields = getFilterFields(searchType);
      const ftr = getFilters(searchType.for, searchType.type).filter((ele) =>
        fields.includes(ele.key)
      );

      if (searchParams.get("keyword")) {
        data = processSearch(searchParams.get("keyword"));

        dispatch(setVoiceData({ ...data }));

        if (data?.propertyType && data.propertyType.length > 0) {
          data.propertyType = data.propertyType.map(
            (ele) => keyValues.propertyType[ele] || ""
          );
        }
        if (data?.constructionStatus && data.constructionStatus.length > 0) {
          data.constructionStatus = data.constructionStatus.map(
            (ele) => keyValues.constructionStatus[ele] || ""
          );
        }
        if (data?.postBy && data.postBy.length > 0) {
          data.postBy = data.postBy.map((ele) => keyValues.postBy[ele] || "");
        }
        if (data?.furnishing && data.furnishing.length > 0) {
          data.furnishing = data.furnishing.map(
            (ele) => keyValues.furnishing[ele] || ""
          );
        }
      } else {
        dispatch(setVoiceData({}));
        data = {
          propertyType: searchParams.get("property_type")
            ? searchParams.get("property_type").split(",")
            : [],
          constructionStatus: searchParams.get("construction")
            ? searchParams.get("construction").split(",")
            : [],
          bedRoom: searchParams.get("bedroom")
            ? searchParams.get("bedroom").split(",")
            : [],
          postBy: searchParams.get("postby")
            ? searchParams.get("postby").split(",")
            : [],
          furnishing: searchParams.get("furnishing")
            ? searchParams.get("furnishing").split(",")
            : [],
        };

        ftr.forEach((ele) => {
          if (sliderKeys.includes(ele.key)) {
            const urlVal = {
              min: searchParams.get(ele.key + "_min") || null,
              max: searchParams.get(ele.key + "_max") || null,
            };

            if (urlVal.min || urlVal.max) {
              const finalVal = {
                min: urlVal.min || ele.range[0],
                max: urlVal.max || ele.range[1],
              };
              const actItem = {
                title: `₹ ${formatNumber(finalVal.min)} - ${formatNumber(
                  finalVal.max
                )}${!urlVal.max || urlVal.max == ele.range[1] ? "+" : ""}`,
                value: finalVal,
                active: true,
                type: ele.key,
              };
              active.push(actItem);

              setSliderFields((prev) => {
                return {
                  ...prev,
                  [ele.key]: {
                    ...ele,
                    value: [parseInt(finalVal.min), parseInt(finalVal.max)],
                  },
                };
              });
            }
          }
        });
      }

      Object.entries(data).forEach((ele) => {
        const arr = ftr.filter((flt) => flt.key === ele[0]);
        if (arr[0]) {
          const objs = arr[0].items.filter((item) =>
            ele[1].includes(item.value)
          );
          if (objs[0]) {
            active = [...active, ...objs];
          }
        }
      });

      setFilter(
        ftr.map((ele) => {
          if (data[ele.key]) {
            ele.items = ele.items.map((itm) => {
              if (data[ele.key].includes(itm.value)) {
                itm.active = true;
              }
              return itm;
            });
          }

          return ele;
        })
      );

      setActiveFilters(active);
      setPageInit(true);
    }
  };

  useEffect(() => {
    updateFilters();
  }, [pageInit, activeFilters]);

  useEffect(() => {
    const fields = getFilterFields(searchType);
    const ftr = getFilters(searchType.for, searchType.type).filter((ele) =>
      fields.includes(ele.key)
    );
    ftr.forEach((ele) => {
      if (sliderKeys.includes(ele.key)) {
        setSliderFields((prev) => {
          return {
            ...prev,
            [ele.key]: {
              ...ele,
              value: ele.range,
            },
          };
        });
      }
    });
    if (pageInit) {
      setPageInit(false);
      dispatch(setFilterInit(false));
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => {
      clearFilterAll();
      dispatch(setFilterInit(false));
      setPageInit(false);
    };
  }, []);

  return (
    <div className={`s-r-filter-con ${showFilter ? "mobile-show" : ""}`}>
      <div className="filter-layer">
        <div className="filter" ref={filterWrapRef}>
          {activeFilters.length > 0 && (
            <div className="active-f-wrap">
              <div className="fil-head">
                <div>Applied Filters</div>
                <div className="fil-clear-btn" onClick={clearFilterAll}>
                  Clear All
                </div>
              </div>
              <div className="f-o-items-wrap show">
                {activeFilters.map((ele, i) => (
                  <div
                    className="f-o-item active"
                    key={i}
                    onClick={() => removeFilterEle(ele, i)}
                  >
                    {ele.title}
                    {icons.close}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="filter-wrap">
            {filter.length === 0 ? (
              <FilterSkeleton />
            ) : (
              <>
                <div className="f-switch-item">
                  <div className="fil-head">
                    <span>Hide already seen</span>
                    <Switch
                      checked={switchItems.alreadySeen}
                      onChange={() => handleToggleSwitch("alreadySeen")}
                    />
                  </div>
                </div>

                {/* <div className="f-switch-item">
                    <div className="fil-head">
                      <span>Verified properties</span>
                      <Switch
                        checked={switchItems.verified}
                        onChange={() => handleToggleSwitch("verified")}
                      />
                    </div>
                  </div> */}

                {filter.map((ele, i) =>
                  sliderKeys.includes(ele.key) ? (
                    <div className="f-slider-item" key={i}>
                      <div
                        className="fil-head"
                        onClick={() => handleToggleItem(ele.key)}
                      >
                        <span>{ele.title}</span>
                        <span className="fil-clear-btn">
                          <span onClick={(e) => clearFilter(e, ele.key)}>
                            Clear
                          </span>{" "}
                          {itemsShow[ele.key] ? icons.upArrow : icons.downArrow}
                        </span>
                      </div>
                      <div
                        className={`f-s-items-wrap ${
                          itemsShow[ele.key] ? "show" : ""
                        }`}
                      >
                        <Slider
                          value={sliderFields[ele.key]?.value}
                          onChange={(e, val, thumb) =>
                            handleSliderChange(
                              e,
                              val,
                              thumb,
                              ele.key,
                              ele.range[1],
                              ele.distance
                            )
                          }
                          onChangeCommitted={(e, val) =>
                            handleSliderStop(e, val, ele.key, ele.range[1])
                          }
                          valueLabelDisplay="on"
                          disableSwap
                          step={ele.steps}
                          min={ele.range[0]}
                          max={ele.range[1]}
                          getAriaValueText={(val) =>
                            handleTitle(val, ele.range[1])
                          }
                          valueLabelFormat={(val) =>
                            handleTitle(val, ele.range[1])
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="f-opt-item" key={i}>
                      <div
                        className="fil-head"
                        onClick={() => handleToggleItem(ele.key)}
                      >
                        <span>{ele.title}</span>
                        <span className="fil-clear-btn">
                          <span onClick={(e) => clearFilter(e, ele.key)}>
                            Clear
                          </span>{" "}
                          {itemsShow[ele.key] ? icons.upArrow : icons.downArrow}
                        </span>
                      </div>
                      <div
                        className={`f-o-items-wrap ${
                          itemsShow[ele.key] ? "show" : ""
                        }`}
                      >
                        {ele.items.map((btn, index) => (
                          <div
                            className={`f-o-item ${
                              index > 5 && !ele.showAll ? "hide" : ""
                            } ${btn.active ? "active" : ""}`}
                            key={index}
                            onClick={() => handleToggleFilter(i, btn, index)}
                          >
                            {btn.title}
                          </div>
                        ))}
                        {!ele?.showAll && ele.items.length > 6 && (
                          <span
                            className="show-more-btn"
                            onClick={() => {
                              handleShowAll(i);
                            }}
                          >
                            +{ele.items.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
