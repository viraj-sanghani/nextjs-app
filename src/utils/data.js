const getPropTypes = (type) => {
  const residential = [
    {
      title: "Flat/Apartment",
      value: "1",
      active: false,
      type: "propertyType",
    },
    {
      title: "Residential House",
      value: "2",
      active: false,
      type: "propertyType",
    },
    {
      title: "Villa",
      value: "3",
      active: false,
      type: "propertyType",
    },
    {
      title: "Builder Floor Apartment",
      value: "4",
      active: false,
      type: "propertyType",
    },
    {
      title: "Residential Land/Plot",
      value: "5",
      active: false,
      type: "propertyType",
    },
    {
      title: "Penthouse",
      value: "6",
      active: false,
      type: "propertyType",
    },
    {
      title: "Studio Apartment",
      value: "7",
      active: false,
      type: "propertyType",
    },
    {
      title: "Service Apartment",
      value: "8",
      active: false,
      type: "propertyType",
    },
    {
      title: "Farm House",
      value: "19",
      active: false,
      type: "propertyType",
    },
  ];
  const commercial = [
    {
      title: "Commercial Office Space",
      value: "9",
      active: false,
      type: "propertyType",
    },
    {
      title: "Office in IT Park/SEZ",
      value: "10",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Shop",
      value: "11",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Showroom",
      value: "12",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Land",
      value: "13",
      active: false,
      type: "propertyType",
    },
    {
      title: "Warehouse/Godown",
      value: "14",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Land",
      value: "15",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Shed",
      value: "16",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Building",
      value: "17",
      active: false,
      type: "propertyType",
    },
  ];
  const plots = [
    {
      title: "Residential Land/Plot",
      value: "5",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Land",
      value: "13",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Land",
      value: "15",
      active: false,
      type: "propertyType",
    },
    {
      title: "Agricultural Land",
      value: "18",
      active: false,
      type: "propertyType",
    },
  ];
  const defaultTypes = [
    {
      title: "Flat/Apartment",
      value: "1",
      active: false,
      type: "propertyType",
    },
    {
      title: "Residential House",
      value: "2",
      active: false,
      type: "propertyType",
    },
    {
      title: "Villa",
      value: "3",
      active: false,
      type: "propertyType",
    },
    {
      title: "Builder Floor Apartment",
      value: "4",
      active: false,
      type: "propertyType",
    },
    {
      title: "Residential Land/Plot",
      value: "5",
      active: false,
      type: "propertyType",
    },
    {
      title: "Penthouse",
      value: "6",
      active: false,
      type: "propertyType",
    },
    {
      title: "Studio Apartment",
      value: "7",
      active: false,
      type: "propertyType",
    },
    {
      title: "Service Apartment",
      value: "8",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Office Space",
      value: "9",
      active: false,
      type: "propertyType",
    },
    {
      title: "Office in IT Park/SEZ",
      value: "10",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Shop",
      value: "11",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Showroom",
      value: "12",
      active: false,
      type: "propertyType",
    },
    {
      title: "Commercial Land",
      value: "13",
      active: false,
      type: "propertyType",
    },
    {
      title: "Warehouse/Godown",
      value: "14",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Land",
      value: "15",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Shed",
      value: "16",
      active: false,
      type: "propertyType",
    },
    {
      title: "Industrial Building",
      value: "17",
      active: false,
      type: "propertyType",
    },
    {
      title: "Agricultural Land",
      value: "18",
      active: false,
      type: "propertyType",
    },
    {
      title: "Farm House",
      value: "19",
      active: false,
      type: "propertyType",
    },
  ];
  if (type === "residential") return residential;
  else if (type === "commercial") return commercial;
  else if (type === "plots-land") return plots;
  else if (type === "default") return defaultTypes;
  else return [];
};

const getBudgetRange = (forr, type) => {
  const budgetRange = {
    residential: {
      buy: [500000, 100000000],
      rent: [5000, 1000000],
    },
    commercial: {
      buy: [500000, 100000000],
      rent: [5000, 1000000],
    },
    "plots-land": {
      buy: [0, 1000000000],
      rent: [0, 1000000],
    },
  };
  return budgetRange[type]
    ? budgetRange[type][forr] || [0, 100000000]
    : [0, 100000000];
};

const getAreaRange = (forr) => {
  const areaRange = {
    buy: [0, 4000],
    rent: [0, 10000],
  };

  return areaRange[forr] || [0, 10000];
};

const getBudgetSteps = (forr, type) => {
  const steps = {
    residential: {
      buy: 500000,
      rent: 2000,
    },
    commercial: {
      buy: 500000,
      rent: 2000,
    },
    "plots-land": {
      buy: 2500000,
      rent: 50000,
    },
  };
  return steps[type] ? steps[type][forr] || 2000 : 2000;
};

const getBudgetDistance = (forr, type) => {
  const budgetDistance = {
    residential: {
      buy: 5000000,
      rent: 50000,
    },
    commercial: {
      buy: 5000000,
      rent: 50000,
    },
    "plots-land": {
      buy: 50000000,
      rent: 50000,
    },
  };
  return budgetDistance[type] ? budgetDistance[type][forr] || 5000000 : 5000000;
};

export const getFilters = (forr, type) => [
  {
    key: "propertyType",
    title: "Property Type",
    items: getPropTypes(type),
  },
  {
    key: "bedRoom",
    title: "No. of Bedrooms",
    items: [
      { title: "1 RK/1 BHK", value: "1", active: false, type: "bedRoom" },
      { title: "2 BHK", value: "2", active: false, type: "bedRoom" },
      { title: "3 BHK", value: "3", active: false, type: "bedRoom" },
      { title: "4 BHK", value: "4", active: false, type: "bedRoom" },
      { title: "5 BHK", value: "5", active: false, type: "bedRoom" },
      { title: "6 BHK", value: "6", active: false, type: "bedRoom" },
      { title: "7 BHK", value: "7", active: false, type: "bedRoom" },
      { title: "7+ BHK", value: "7+", active: false, type: "bedRoom" },
    ],
  },
  {
    key: "constructionStatus",
    title: "Construction Status",
    items: [
      {
        title: "Ready To Move",
        value: "1",
        active: false,
        type: "constructionStatus",
      },
      {
        title: "Under Construction",
        value: "2",
        active: false,
        type: "constructionStatus",
      },
    ],
  },
  {
    key: "postBy",
    title: "Post By",
    items: [
      { title: "Owner", value: "1", active: false, type: "postBy" },
      { title: "Builder", value: "2", active: false, type: "postBy" },
      { title: "Dealer", value: "3", active: false, type: "postBy" },
    ],
  },
  {
    key: "furnishing",
    title: "Furnishing status",
    items: [
      {
        title: "Furnished",
        value: "1",
        active: false,
        type: "furnishing",
      },
      {
        title: "Semifurnished",
        value: "2",
        active: false,
        type: "furnishing",
      },
      {
        title: "Unfurnished",
        value: "3",
        active: false,
        type: "furnishing",
      },
    ],
  },
  {
    key: "area",
    title: "Area",
    range: getAreaRange(forr),
    steps: 200,
    distance: 500,
  },
  {
    key: "budget",
    title: "Budget",
    range: getBudgetRange(forr, type),
    steps: getBudgetSteps(forr, type),
    distance: getBudgetDistance(forr, type),
  },
];

const filterFields = {
  residential: {
    buy: ["propertyType", "bedRoom", "constructionStatus", "postBy", "budget"],
    rent: ["propertyType", "bedRoom", "furnishing", "postBy", "budget"],
  },
  commercial: {
    buy: ["propertyType", "area", "constructionStatus", "postBy", "budget"],
    rent: ["propertyType", "area", "constructionStatus", "postBy", "budget"],
  },
  "plots-land": {
    buy: ["propertyType", "area", "postBy", "budget"],
    rent: ["propertyType", "area", "postBy", "budget"],
  },
  default: [
    "propertyType",
    "bedRoom",
    "constructionStatus",
    "furnishing",
    "area",
    "postBy",
    "budget",
  ],
};

export const getFilterFields = (search) => {
  if (search.for === "default") return filterFields["default"];
  return filterFields[search.type]
    ? filterFields[search.type][search.for] || []
    : [];
};

export const sliderKeys = ["budget", "area"];

export const keyValues = {
  propertyType: {
    "Flat/Apartment": "1",
    "Residential House": "2",
    Villa: "3",
    "Builder Floor Apartment": "4",
    "Residential Land/Plot": "5",
    Penthouse: "6",
    "Studio Apartment": "7",
    "Service Apartment": "8",
    "Commercial Office Space": "9",
    "Office in IT Park/SEZ": "10",
    "Commercial Shop": "11",
    "Commercial Showroom": "12",
    "Commercial Land": "13",
    "Warehouse/Godown": "14",
    "Industrial Land": "15",
    "Industrial Shed": "16",
    "Industrial Building": "17",
    "Agricultural Land": "18",
    "Farm House": "19",
  },
  constructionStatus: {
    "Ready To Move": "1",
    "Under Construction": "2",
  },
  postBy: {
    Owner: "1",
    Builder: "2",
    Dealer: "3",
  },
  furnishing: {
    Furnished: "1",
    "Semi-Furnished": "2",
    Unfurnished: "3",
  },
};

export const filterValues = {
  propertyType: {
    1: "Flat/Apartment",
    2: "Residential House",
    3: "Villa",
    4: "Builder Floor Apartment",
    5: "Residential Land/Plot",
    6: "Penthouse",
    7: "Studio Apartment",
    8: "Service Apartment",
    9: "Commercial Office Space",
    10: "Office in IT Park/SEZ",
    11: "Commercial Shop",
    12: "Commercial Showroom",
    13: "Commercial Land",
    14: "Warehouse/Godown",
    15: "Industrial Land",
    16: "Industrial Shed",
    17: "Industrial Building",
    18: "Agricultural Land",
    19: "Farm House",
  },
  constructionStatus: {
    1: "Ready To Move",
    2: "Under Construction",
  },
  postBy: {
    1: "Owner",
    2: "Builder",
    3: "Dealer",
  },
  furnishing: {
    1: "Furnished",
    2: "Semi-Furnished",
    3: "Unfurnished",
  },
};

export const sort = [
  { title: "Relevance", value: "rlv" },
  { title: "Newest first", value: "nf" },
  { title: "Price Low to High", value: "lth" },
  { title: "Price High to Low", value: "htl" },
  // { title: "Price / sq.ft. : Low to High", value: "" },
  // { title: "Price / sq.ft. : High to Low", value: "" },
];

export const compareFields = {
  project_name: "Project Name",
  iam: "Post By",
  forr: "For",
  property_type: "Property Type",
  city: "City",
  locality: "Locality",
  address: "Address",
  bedroom: "Bedroom",
  balconies: "Balconies",
  floor_no: "Floor No",
  total_floor: "Total Floor",
  furnish_status: "Furnish Status",
  bathroom: "Bathroom",
  area_unit: "Area in",
  super_area: "Super Area",
  carpet_area: "Carpet Area",
  built_area: "Built Area",
  covered_area: "Covered Area",
  plot_area: "Plot Area",
  plot_length: "Plot Length",
  plot_breadth: "Plot Breadth",
  prop_availability: "Possession Status",
  avai_from_year: "Available From",
  age_of_con: "Age Of Construction",
  exp_price: "Expected Price",
  price_per: "Price Per",
  otc_chrg: "Other Charge",
  booking_amt: "Booking Amount",
  maintainance: "Maintainance",
  per: "Maintainance Per",
  amenities: "Amenities",
  overlookng: "Overlookng",
  car_parking: "Car Parking",
  multi_unit: "Multiple Units",
  ownership_status: "Ownership Status",
  electricity: "Electricity",
  avail_water: "Availability of Water",
  flooring: "Flooring",
  monthly_rent: "Monthly Rent",
  security_amt: "Security Amount",
  transaction_type: "Transaction Type",
  open_side: "Open Side",
  width_road: "Width Road",
  washrooms: "Washrooms",
  corner_shop: "Corner Shop",
  main_road: "Main Road",
  width_entrace: "Width Entrace",
  electricity_water: "Electricity Water",
  connectivity: "Connectivity",
  connectivity_within: "Within 2km",
  conn_within1: "Within 5km",
  conn_within2: "Within 10km",
};

export const navbarInvalidPath = ["/auth/", "/chatbot", "/test"];

export const footerInvalidPath = ["/auth/", "/search/", "/chatbot", "/test"];

export const chatbotInvalidPath = ["/auth/", "/test"];

export const compareInvalidPath = ["/auth/", "/chatbot"];

export const ScrollBtnInvalidPath = ["/auth/", "/chatbot"];
