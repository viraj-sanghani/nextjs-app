import * as Yup from "yup";
import store from "@/redux/store";
// import { step1FormFields } from "../pages/property/Form";
const step1FormFields = {};

const validate = {};
let type, forr;
let array = [];

function check(field) {
  const data = store.getState().propertyForm;
  if (type !== data.type || forr !== data.for) {
    type = data.type;
    forr = data.for;
    if (data?.type && data?.for) {
      array = step1FormFields[data.type][data.for];
    }
  }
  const isExist = array.includes(field);
  return isExist;
}

validate.contactSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  message: Yup.string().required("Message is required"),
});

validate.feedbackSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  feedback: Yup.string().required("Feedback is required"),
});

validate.loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

validate.registerSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

validate.registerExtraSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

validate.forgot = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

validate.forgotVerifySchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm Password must be at least 6 characters")
    .required("Confirm password is required"),
});

validate.changePassSchema = Yup.object().shape({
  oldPass: Yup.string()
    .min(6, "Old password must be at least 6 characters")
    .required("Old password is required"),
  newPass: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPass: Yup.string()
    .min(6, "Confirm Password must be at least 6 characters")
    .required("Confirm password is required"),
});

validate.accountSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

validate.siteVisitSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  message: Yup.string().required("Message is required"),
  dateTime: Yup.string().required("Preferred date & time is required"),
  alongWith: Yup.string().required("Along with is required"),
});

validate.contactDealerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  isDealer: Yup.string().required("Select are you a dealer"),
  terms: Yup.string().required("Please agree terms"),
});

validate.supportSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  issue: Yup.string().required("Please write down issue"),
});

validate.newsLetterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

validate.propertyStep1Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .test(
      "is-number",
      "Mobile number must contain only digits",
      (value) => !isNaN(value)
    )
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  for: Yup.string().required("For is required"),
  type: Yup.string().required("Property Type is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  locality: Yup.string().required("Locality is required"),
  // nearByLocation1: Yup.string().required("Near By Location is required"),
  // nearByLocation2: Yup.string().required("Near By Location is required"),
  // nearByLocation3: Yup.string().required("Near By Location is required"),
  // nearByLocation4: Yup.string().required("Near By Location is required"),
  // reraNo: Yup.string().required("RERA Number is required"),
  projectName: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("projectName")
      ? propertyStep1Schema.required("Project Name is required")
      : propertyStep1Schema.notRequired();
  }),
  postingAs: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("postingAs")
      ? propertyStep1Schema.required("Posting As is required")
      : propertyStep1Schema.notRequired();
  }),
  landZone: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("landZone")
      ? propertyStep1Schema.required("LandZone is required")
      : propertyStep1Schema.notRequired();
  }),
  idealForBusinesses: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("idealForBusinesses")
      ? propertyStep1Schema.required("Ideal For Businesses is required")
      : propertyStep1Schema.notRequired();
  }),
  nearbyBusinesses: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("nearbyBusinesses")
      ? propertyStep1Schema.required("Near By Businesses is required")
      : propertyStep1Schema.notRequired();
  }),
  bedrooms: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("bedrooms")
      ? propertyStep1Schema.required("Bedrooms is required")
      : propertyStep1Schema.notRequired();
  }),
  bathrooms: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("bathrooms")
      ? propertyStep1Schema.required("Bathrooms is required")
      : propertyStep1Schema.notRequired();
  }),
  balconies: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("balconies")
      ? propertyStep1Schema.required("Balconies is required")
      : propertyStep1Schema.notRequired();
  }),
  floorNo: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("floorNo")
      ? propertyStep1Schema.required("Floor No is required")
      : propertyStep1Schema.notRequired();
  }),
  totalFloors: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("totalFloors")
      ? propertyStep1Schema.required("Total Floors is required")
      : propertyStep1Schema.notRequired();
  }),
  furnishedStatus: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("furnishedStatus")
      ? propertyStep1Schema.required("Furnished Status is required")
      : propertyStep1Schema.notRequired();
  }),
  floorsAllowed: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("floorsAllowed")
      ? propertyStep1Schema.required("Floors Allowed is required")
      : propertyStep1Schema.notRequired();
  }),
  noOfOpenSides: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("noOfOpenSides")
      ? propertyStep1Schema.required("No Of Open Sides is required")
      : propertyStep1Schema.notRequired();
  }),
  widthOfRoadFacing: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("widthOfRoadFacing")
      ? propertyStep1Schema.required("Width Of Road Facing is required")
      : propertyStep1Schema.notRequired();
  }),
  anyConstructionDone: Yup.string().when(
    "type",
    (type, propertyStep1Schema) => {
      return check("anyConstructionDone")
        ? propertyStep1Schema.required("Any Construction Done is required")
        : propertyStep1Schema.notRequired();
    }
  ),
  boundaryWallMade: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("boundaryWallMade")
      ? propertyStep1Schema.required("Boundary Wall Made is required")
      : propertyStep1Schema.notRequired();
  }),
  isInAGatedColony: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("isInAGatedColony")
      ? propertyStep1Schema.required("Is In a Gated Colony is required")
      : propertyStep1Schema.notRequired();
  }),
  washrooms: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("washrooms")
      ? propertyStep1Schema.required("Washrooms is required")
      : propertyStep1Schema.notRequired();
  }),
  personalWashroom: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("personalWashroom")
      ? propertyStep1Schema.required("Personal Washroom is required")
      : propertyStep1Schema.notRequired();
  }),
  pantryCafeteria: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("pantryCafeteria")
      ? propertyStep1Schema.required("Pantry Cafeteria is required")
      : propertyStep1Schema.notRequired();
  }),
  willingToModifInteriors: Yup.string().when(
    "type",
    (type, propertyStep1Schema) => {
      return check("willingToModifInteriors")
        ? propertyStep1Schema.required(
            "Willing To Modify Interiors is required"
          )
        : propertyStep1Schema.notRequired();
    }
  ),
  lockinPeriod: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("lockinPeriod")
      ? propertyStep1Schema.required("Lock in Period is required")
      : propertyStep1Schema.notRequired();
  }),
  cornerShop: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("cornerShop")
      ? propertyStep1Schema.required("Corner Shop is required")
      : propertyStep1Schema.notRequired();
  }),
  isMainRoadFacing: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("isMainRoadFacing")
      ? propertyStep1Schema.required("Is Main Road Facing is required")
      : propertyStep1Schema.notRequired();
  }),
  cornerShowroom: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("cornerShowroom")
      ? propertyStep1Schema.required("Corner Showroom is required")
      : propertyStep1Schema.notRequired();
  }),
  areaIn: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("areaIn")
      ? propertyStep1Schema.required("Area In is required")
      : propertyStep1Schema.notRequired();
  }),
  /* superArea: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("superArea")
      ? propertyStep1Schema.required("Super Area is required")
      : propertyStep1Schema.notRequired();
  }),
  builtupArea: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("builtupArea")
      ? propertyStep1Schema.required("Built up Area is required")
      : propertyStep1Schema.notRequired();
  }), */
  carpetArea: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("carpetArea")
      ? propertyStep1Schema.required("Carpet Area is required")
      : propertyStep1Schema.notRequired();
  }),
  /* coveredArea: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("coveredArea")
      ? propertyStep1Schema.required("Covered Area is required")
      : propertyStep1Schema.notRequired();
  }), */
  widthOfEntrance: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("widthOfEntrance")
      ? propertyStep1Schema.required("Width Of Entrance is required")
      : propertyStep1Schema.notRequired();
  }),
  plotArea: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("plotArea")
      ? propertyStep1Schema.required("Plot Area is required")
      : propertyStep1Schema.notRequired();
  }),
  plotLength: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("plotLength")
      ? propertyStep1Schema.required("Plot Length is required")
      : propertyStep1Schema.notRequired();
  }),
  plotBreadth: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("plotBreadth")
      ? propertyStep1Schema.required("Plot Breadth is required")
      : propertyStep1Schema.notRequired();
  }),
  transactionType: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("transactionType")
      ? propertyStep1Schema.required("Transaction Type is required")
      : propertyStep1Schema.notRequired();
  }),
  possessionStatus: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("possessionStatus")
      ? propertyStep1Schema.required("Possession Status is required")
      : propertyStep1Schema.notRequired();
  }),
  /* availableFrom: Yup.string().when(
    ["type", "possessionStatus"],
    (type, propertyStep1Schema) => {
      return check("availableFrom")
        ? propertyStep1Schema.required("Available From is required")
        : propertyStep1Schema.notRequired();
    }
  ), */
  /* ageOfConstruction: Yup.string().when(
    ["type", "possessionStatus"],
    (type, propertyStep1Schema) => {
      return check("ageOfConstruction")
        ? propertyStep1Schema.required("Age Of Construction is required")
        : propertyStep1Schema.notRequired();
    }
  ), */
  expectedPrice: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("expectedPrice")
      ? propertyStep1Schema.required("Expected Price is required")
      : propertyStep1Schema.notRequired();
  }),
  /* pricePerSqft: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("pricePerSqft")
      ? propertyStep1Schema.required("Price Per Sqft is required")
      : propertyStep1Schema.notRequired();
  }),
  pricePerSqYrd: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("pricePerSqYrd")
      ? propertyStep1Schema.required("Price Per Sq-Yrd is required")
      : propertyStep1Schema.notRequired();
  }), */
  /* otherCharges: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("otherCharges")
      ? propertyStep1Schema.required("Other Charges is required")
      : propertyStep1Schema.notRequired();
  }), */
  bookingOrTokenAmount: Yup.string().when(
    "type",
    (type, propertyStep1Schema) => {
      return check("bookingOrTokenAmount")
        ? propertyStep1Schema.required("Booking Or Token Amount is required")
        : propertyStep1Schema.notRequired();
    }
  ),
  maintenanceCharge: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("maintenanceCharge")
      ? propertyStep1Schema.required("Maintenance Charge is required")
      : propertyStep1Schema.notRequired();
  }),
  maintenancePer: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("maintenancePer")
      ? propertyStep1Schema.required("Maintenance Per is required")
      : propertyStep1Schema.notRequired();
  }),
  monthlyRent: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("monthlyRent")
      ? propertyStep1Schema.required("Monthly Rent is required")
      : propertyStep1Schema.notRequired();
  }),
  /* electricityCharges: Yup.array().when("type", (type, propertyStep1Schema) => {
    return check("electricityCharges")
      ? propertyStep1Schema.required("Electricity Charges is required")
      : propertyStep1Schema.notRequired();
  }), */
  depositAmount: Yup.string().when("type", (type, propertyStep1Schema) => {
    return check("depositAmount")
      ? propertyStep1Schema.required("Deposit Amount is required")
      : propertyStep1Schema.notRequired();
  }),
});

validate.propertyStep2Schema = Yup.object().shape({
  carParking: Yup.string().required("Car Parking is required"),
  multiUnitAvai: Yup.string().required("Multiple Unit Available is required"),
  availOfWater: Yup.string().required("Availability Of Water is required"),
  statusOfElec: Yup.string().required("Status Of Electricity is required"),
  ownershipStatus: Yup.string().required("Ownership Status is required"),
  plotApprovalAuthority: Yup.string().required(
    "Plot Approval Authority is required"
  ),
  // No
  // approvedBy: Yup.string().required("Approved By is required"),
  // amenities: Yup.array().required("Amenities is required"),
});

validate.postRequirementSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  locality: Yup.string().required("Locality is required"),
  community: Yup.string().required("Community is required"),
  property_for: Yup.string().required("Property for is required"),
  property_type: Yup.string().required("Property type is required"),
  furnish_status: Yup.string().required("Furnish status is required"),
  budget_min: Yup.string().required("Budget minimum is required"),
  budget_max: Yup.string().required("Budget maximum is required"),
});

export default validate;
