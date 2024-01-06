"use client";

import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Slider, Switch } from "@mui/material";
import icons from "@/utils/icons";
import { getFilterFields, getFilters, sliderKeys } from "@/utils/data";
import { formatNumber } from "@/utils/helper";
import Loading from "./Loading";

function SearchbarFilter({ searchParams, className, handleCloseSearchBar }) {
  const router = useRouter();
  const { searchType } = useSelector((state) => state.filter);
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
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (searchParams?.title) {
      setSearchError(false);
      const item = activeFilters.filter((e, i) => e.type === "searchFor");

      if (item[0]) {
        setActiveFilters((prev) =>
          prev.map((ele, i) => {
            if (ele.type === "searchFor") {
              ele.title = `${searchParams.title} (${searchParams.type})`;
              ele.name = searchParams.title;
              ele.value = searchParams.title;
              ele.isType = searchParams.type;
              ele.id = searchParams.id;
              ele.city_id = searchParams.city_id;
            }
            return ele;
          })
        );
      } else {
        setActiveFilters([
          {
            title: `${searchParams.title} (${searchParams.type})`,
            name: searchParams.title,
            value: searchParams.title,
            isType: searchParams.type,
            id: searchParams.id,
            city_id: searchParams.city_id,
            active: true,
            type: "searchFor",
          },
          ...activeFilters,
        ]);
      }
    }
  }, [searchParams]);

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
    setFilter(ftr);
    setActiveFilters(activeFilters.filter((ele) => ele.type === "searchFor"));
  }, [searchType]);

  const handleSearch = () => {
    const searchFor = activeFilters.filter(
      (ele) => ele.type === "searchFor"
    )[0];

    if (!searchFor) {
      return setSearchError(true);
    }

    setLoading(true);
    setSearchError(false);
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
      if (ele.type !== "searchFor") {
        if (!sliderKeys.includes(ele.type))
          data[ele.type] && data[ele.type].push(ele.value);
        else data[ele.type] = ele.value;
      }
    });

    const keyObj = {
      propertyType: "property_type",
      bedRoom: "bedroom",
      constructionStatus: "construction",
      postBy: "postby",
      furnishing: "furnishing",
    };

    let urlData = "";

    for (const key in data) {
      if (!sliderKeys.includes(key) && data[key].length > 0) {
        urlData += `&${keyObj[key]}=${encodeURIComponent(data[key])}`;
      }
    }

    sliderKeys.forEach((key) => {
      if (data[key].min > 0) {
        urlData += `&${key}_min=${data[key].min}`;
      }
      if (data[key].max && data[key].max != sliderFields[key].range[1]) {
        urlData += `&${key}_max=${data[key].max}`;
      }
    });

    let url = searchFor.name.replaceAll(",", "");
    url = url.replaceAll(" ", "-");
    url = url.toLowerCase();
    if (searchFor.isType === "city") {
      url += `?city=${searchFor.id}`;
    } else if (searchFor.isType === "locality") {
      url += `?city=${searchFor.city_id}&locality=${searchFor.id}`;
    } else if (searchFor.isType === "project") {
      url += `?project=yes`;
    }

    router.push(
      `/search/${searchType.for}/${searchType.type}/${url}${urlData}`
    );

    setLoading(false);
    handleCloseSearchBar();
  };

  const updateFilters = () => {
    const urlParams = router.query;

    const data = {
      propertyType: urlParams?.property_type
        ? urlParams.property_type.split(",")
        : [],
      constructionStatus: urlParams?.construction
        ? urlParams.construction.split(",")
        : [],
      bedRoom: urlParams?.bedroom ? urlParams.bedroom.split(",") : [],
      postBy: urlParams?.postby ? urlParams.postby.split(",") : [],
      furnishing: urlParams?.furnishing ? urlParams.furnishing.split(",") : [],
    };

    let active = [];
    const fields = getFilterFields(searchType);
    const ftr = getFilters(searchType.for, searchType.type).filter((ele) =>
      fields.includes(ele.key)
    );

    ftr.forEach((ele) => {
      if (sliderKeys.includes(ele.key)) {
        const urlVal = {
          min: urlParams?.[ele.key + "_min"] || null,
          max: urlParams?.[ele.key + "_max"] || null,
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

    Object.entries(data).forEach((ele) => {
      const arr = ftr.filter((flt) => flt.key === ele[0]);
      if (arr[0]) {
        const objs = arr[0].items.filter((item) => ele[1].includes(item.value));
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
  };

  useEffect(() => {
    updateFilters();
    return () => clearFilterAll();
  }, []);

  return (
    <div className={`search-filter-wrap ${className}`}>
      {searchError && (
        <span className="search-filter-error">
          Please select city, locality
        </span>
      )}
      <div className="search-filter-body">
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
          {/* <div className="f-switch-item">
            <div className="fil-head">
              <span>Hide already seen</span>
              <Switch
                checked={switchItems.alreadySeen}
                onChange={() => handleToggleSwitch("alreadySeen")}
              />
            </div>
          </div> */}

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
                    <span onClick={(e) => clearFilter(e, ele.key)}>Clear</span>{" "}
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
                    getAriaValueText={(val) => handleTitle(val, ele.range[1])}
                    valueLabelFormat={(val) => handleTitle(val, ele.range[1])}
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
                    <span onClick={(e) => clearFilter(e, ele.key)}>Clear</span>{" "}
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
        </div>
      </div>
      <div className="search-filter-footer">
        <Button color="error" onClick={clearFilterAll}>
          Clear All
        </Button>
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? <Loading color="#fff" /> : "Search"}
        </Button>
      </div>
    </div>
  );
}

export default memo(SearchbarFilter);
