import images from "./images";

export function formatNumber(num) {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + " L";
  } else {
    return num.toString();
  }
}

export function timeAgo(date) {
  const currentDate = new Date();
  const previousDate = new Date(date);
  const diffInMs = currentDate.getTime() - previousDate.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  let timeAgo;

  if (diffInDays < 1) {
    timeAgo = "today";
  } else if (diffInDays === 1) {
    timeAgo = "1 day ago";
  } else if (diffInDays < 7) {
    timeAgo = `${diffInDays} days ago`;
  } else if (diffInDays < 14) {
    timeAgo = "1 week ago";
  } else if (diffInDays < 30) {
    timeAgo = `${Math.round(diffInDays / 7)} weeks ago`;
  } else if (diffInDays < 365) {
    timeAgo = `${Math.round(diffInDays / 30)} months ago`;
  } else {
    timeAgo = `${Math.round(diffInDays / 365)} years ago`;
  }

  return timeAgo;
}

export const convertFilters = (url) => {
  const urlParams = new URLSearchParams(url);
  const property_type = urlParams.get("property_type")
    ? urlParams.get("property_type").split(",").map(Number)
    : [];
  const bedroom = urlParams.get("bedroom")
    ? urlParams.get("bedroom").split(",").map(Number)
    : [];
  const construction = urlParams.get("construction")
    ? urlParams.get("construction").split(",").map(Number)
    : [];
  const postby = urlParams.get("postby")
    ? urlParams.get("postby").split(",").map(Number)
    : [];
  const furnishing = urlParams.get("furnishing")
    ? urlParams.get("furnishing").split(",").map(Number)
    : [];

  const result = {};

  // property_type
  if (property_type.length > 0) {
    result.propertyType = property_type;
  }

  // bedroom
  if (bedroom.length > 0) {
    result.bedroom = bedroom;
  }

  // construction
  if (construction.length > 0) {
    result.constructionStatus = construction;
  }

  // postby
  if (postby.length > 0) {
    result.postBy = postby;
  }

  // furnishing
  if (furnishing.length > 0) {
    result.furnishing = furnishing;
  }

  // Budget
  if (urlParams.get("budget_min") || urlParams.get("budget_max")) {
    result.budget = {};
  }
  if (urlParams.get("budget_min")) {
    result.budget.min = parseInt(urlParams.get("budget_min"));
  }
  if (urlParams.get("budget_max")) {
    result.budget.max = parseInt(urlParams.get("budget_max"));
  }

  // Area
  if (urlParams.get("area_min") || urlParams.get("area_max")) {
    result.area = {};
  }
  if (urlParams.get("area_min")) {
    result.area.min = parseInt(urlParams.get("area_min"));
  }
  if (urlParams.get("area_max")) {
    result.area.max = parseInt(urlParams.get("area_max"));
  }

  return result;
};

export function convertUrl(property, id) {
  return `/property/${(property?.project_name || "")
    .toLowerCase()
    .replaceAll(" ", "-")}-${
    property?.bedroom ? property.bedroom + "-bhk-" : ""
  }${(property?.property_type || "")
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("/", "-")}${
    property?.forr ? (property.forr == "Sale" ? "-for-sale" : "-for-rent") : ""
  }-in-${(property?.locality || "").toLowerCase().replaceAll(" ", "-")}-${(
    property?.city || ""
  )
    .toLowerCase()
    .replaceAll(" ", "-")}-${id}`;
}

export function convertBlogCatUrl(name, id) {
  return `/blog/c/${(name || "").toLowerCase().replaceAll(" ", "-")}${
    name != "" ? "-" : ""
  }${id}`;
}

export function convertSingleBlogUrl(name, id) {
  return `/blog/${(name || "").toLowerCase().replaceAll(" ", "-")}${
    name != "" ? "-" : ""
  }${id}`;
}

//initial={500000} state={2500000} limit={20000000}  increment={25 * 100000}
export const setMarks = (initial, start, limit, increment) => {
  const array = [];

  if (start > 100000 && start < 9999999) {
    array.push({ label: `${initial / 100000}L`, value: initial });
    array.push({ label: `${limit / 10000000}cr+`, value: limit });
  }

  if (start > 9999999) {
    array.push({ label: `${limit / 10000000}cr+`, value: limit });
  }

  if (start < 99999 && start > 999) {
    array.push({ label: `${limit / 100000}L+`, value: limit });
    array.push({ label: `${5000 / 1000}k`, value: 5000 });
  }

  while (start < limit) {
    if (start > 100000 && start < 9999999) {
      array.push({ label: `${start / 100000}L`, value: start });
    }
    if (start > 9999999) {
      array.push({ label: `${start / 10000000}cr`, value: start });
    }

    if (start < 99999 && start > 999) {
      array.push({ label: `${start / 1000}k`, value: start });
    }

    start = start + increment;
  }

  return array;
};

export const setMarksInterest = (initial, start, limit, increment) => {
  const array = [];

  //   array.push({ label: `${initial / 100000}L`, value: initial });

  // if(array.some(obj => obj.lable === `${start/10000000}cr`)){
  // alert(true)
  //   array.push({ label: `${limit / 10000000}cr`, value: limit });
  // }
  //   initial={1} start={1} limit={20}  increment={1}

  array.push({ label: `${initial}%`, value: initial });
  array.push({ label: `${limit}%`, value: limit });

  while (start < limit) {
    array.push({ label: `${start}%`, value: start });

    start = start + increment;
  }

  return array;
};

export const setMarksYear = (initial, start, limit, increment) => {
  const array = [];
  array.push({ label: `${initial}Y`, value: initial });
  array.push({ label: `${limit}Y`, value: limit });

  while (start < limit) {
    array.push({ label: `${start}Y`, value: start });

    start = start + increment;
  }

  return array;
};

export const toNumber = (number) => {
  return parseFloat(number.replace(/,/g, ""));
};

export const toCSString = (number) => {
  return Number(parseFloat(number).toFixed(2)).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
  });
};

export const propertySmallImg = (img) =>
  img
    ? `${process.env.NEXT_PUBLIC_AWS_URL}/property/small/${img}`
    : "/img/no-image.png";

export const propertyOriginalImg = (img) =>
  img
    ? `${process.env.NEXT_PUBLIC_AWS_URL}/property/original/${img}`
    : "/img/no-image.png";

export const propertyBrochure = (file) =>
  `${process.env.NEXT_PUBLIC_AWS_URL}/property/brochure/${file}`;

export const blogSmallImg = (img) =>
  img ? `${process.env.NEXT_PUBLIC_AWS_URL}/blog/small/${img}` : "";

export const blogOriginalImg = (img) =>
  img ? `${process.env.NEXT_PUBLIC_AWS_URL}/blog/original/${img}` : "";

export const adsImg = (img) =>
  img ? `${process.env.NEXT_PUBLIC_AWS_URL}/ads/${img}` : "";

export const getDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (
    /mobile|iphone|ipad|android/.test(userAgent) ||
    (window.innerWidth <= 768 && /ipad/.test(userAgent))
  ) {
    return "MOBILE";
  } else if (/tablet|ipad/.test(userAgent)) {
    return "TABLET";
  } else {
    return "PC";
  }
};
