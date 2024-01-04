import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  step1FormFields,
  fieldData,
  formField,
  step1Fields,
  keyMap,
} from "@/app/post-property/Form";
import { useForm } from "@/components/CustomHook";
import Loading from "@/components/Loading";
import validate from "@/utils/validation";
import { call, getCity, getLocality, updateProperty } from "@/services/api";
import {
  setStep,
  setPropType,
  setPropId,
  setPropFor,
} from "@/redux/reducers/propertyFormReducer";
import LocationPin from "@/components/LeafLetMap/LocationPin";

import { ToWords } from "to-words";
const toWords = new ToWords({});

function Step1({ draftData }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocality] = useState([]);
  const { propertyId, step } = useSelector((state) => state.propertyForm);

  const handleForChange = (key, val, type = "") => {
    form.setErrors({});
    form.setFieldValue("for", val);
    form.setFieldValue("type", type);
    setFormData([]);
    dispatch(setPropFor(val));
  };

  const fetchCity = async () => {
    try {
      const res = await getCity();
      setCities(res.data.map((ele) => ele?.city));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocality = async (city) => {
    if (!city) return;
    try {
      const res = await call(getLocality({ city }));
      setLocality(res.data.map((ele) => ele?.locality));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePossChange = (status) => {
    setFormData((prev) =>
      prev.map((ele) => {
        if (ele.key == "availableFrom" && status == "Under Construction") {
          ele.hide = false;
        }
        if (ele.key == "ageOfConstruction" && status == "Under Construction") {
          ele.hide = true;
        }
        if (ele.key == "availableFrom" && status == "Ready to Move") {
          ele.hide = true;
        }
        if (ele.key == "ageOfConstruction" && status == "Ready to Move") {
          ele.hide = false;
        }
        return ele;
      })
    );
  };

  const setDraftData = async () => {
    try {
      const data = {};
      if (draftData?.id) {
        let k;
        for (const key in keyMap) {
          k = keyMap[key];
          if (draftData[k]) {
            data[key] =
              fieldData[key] && fieldData[key]?.type === "checkbox"
                ? draftData[k].split(",")
                : draftData[k];
          }
        }

        draftData?.forr &&
          handleForChange("for", draftData.forr, draftData?.property_type);
        draftData?.property_type &&
          handleTypeChange("type", draftData.property_type, draftData.forr);
        draftData?.prop_availability &&
          handlePossChange(draftData.prop_availability);
        fetchLocality(draftData?.city ? draftData.city : cities[0]);
        form.setValues({ ...form.values, ...data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCity();
    setDraftData();
  }, []);

  const handleTypeChange = (key, val, forr = null) => {
    form.setErrors({});

    const data = step1FormFields[val][forr || form.values?.for].map(
      (ele) => fieldData[ele]
    );

    form.setFieldValue("type", val);
    setFormData(data);
    dispatch(setPropType(val));
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await call(updateProperty(propertyId, values));
      dispatch(setStep(step + 1));
      dispatch(setPropId(res?.propertyId));
    } catch (err) {
      setErrors(err);
    }
    setSubmitting(false);
  };

  const handleChange = (key, val) => {
    if (key === "possessionStatus") {
      setFormData((prev) =>
        prev.map((ele) => {
          if (ele.key == "availableFrom" && val == "Under Construction") {
            ele.hide = false;
          }
          if (ele.key == "ageOfConstruction" && val == "Under Construction") {
            ele.hide = true;
          }
          if (ele.key == "availableFrom" && val == "Ready to Move") {
            ele.hide = true;
          }
          if (ele.key == "ageOfConstruction" && val == "Ready to Move") {
            ele.hide = false;
          }
          return ele;
        })
      );
    } else if (key === "city") {
      fetchLocality(val);
      form.setFieldValue("locality", "");
      for (let i = 0; i < 4; i++) {
        form.setFieldValue(`nearByLocation${i + 1}`, "");
      }
    } else if (key === "expectedPrice") {
      form.setFieldValue(
        "priceInWord",
        toWords.convert(val ? val : 0, { currency: true })
      );
    }
    form.setFieldValue(key, val);
  };

  const setLocationData = (data) => {
    form.setFieldValue("latitude", data.lat);
    form.setFieldValue("longitude", data.lng);
  };

  const form = useForm({
    initial: {
      ...step1Fields,
      postingAs: draftData?.iam,
      for: draftData?.forr,
    },
    schema: validate.propertyStep1Schema,
    callback: handleSubmit,
  });

  return (
    step === 1 && (
      <form noValidate onSubmit={form.handleSubmit}>
        <div className="p-form-fields-con">
          {/* {formField.radio({
            key: "postingAs",
            type: "radio",
            label: "Posting as",
            options: ["Owner", "Builder"],
            value: form.values.postingAs,
            onChange: handleChange,
            error: form.errors.postingAs,
          })} */}
          {formField.radio({
            key: "postFor",
            type: "radio",
            label: "Posting For",
            options:
              form.values?.postingAs === "Channel Partner"
                ? [
                    { label: "B2C / on Portal For All", value: "B2C" },
                    {
                      label: "Channel Partner Community",
                      value: "CP",
                    },
                    { label: "Self", value: "Self" },
                  ]
                : [
                    { label: "B2C / on Portal For All", value: "B2C" },
                    { label: "Self", value: "Self" },
                  ],
            value: form.values.postFor,
            onChange: handleChange,
            error: form.errors.postFor,
          })}
          {formField.radio({
            key: "for",
            type: "radio",
            label: "For",
            options: ["Sale", "Rent/Lease"],
            value: form.values.for,
            onChange: handleForChange,
            error: form.errors.for,
          })}
          {formField.text({
            key: "name",
            type: "text",
            label: "Name of Contact Person",
            value: form.values.name,
            onChange: handleChange,
            error: form.errors.name,
          })}
          {formField.number({
            key: "mobile",
            type: "number",
            label: "Mobile No",
            value: form.values.mobile,
            onChange: handleChange,
            error: form.errors.mobile,
          })}
          {formField.text({
            key: "email",
            type: "text",
            label: "Email Id",
            value: form.values.email,
            onChange: handleChange,
            error: form.errors.email,
          })}
          {formField.select({
            key: "type",
            type: "select",
            label: "Property Type",
            options:
              form.values.for === "Sale"
                ? [
                    "Flat/Apartment",
                    "Residential House",
                    "Villa",
                    "Builder Floor Apartment",
                    "Residential Land/Plot",
                    "Penthouse",
                    "Studio Apartment",
                    "Commercial Office Space",
                    "Office in IT Park/SEZ",
                    "Commercial Shop",
                    "Commercial Showroom",
                    "Commercial Land",
                    "Warehouse/Godown",
                    "Industrial Land",
                    "Industrial Building",
                    "Industrial Shed",
                    "Agricultural Land",
                    "Farm House",
                  ]
                : [
                    "Flat/Apartment",
                    "Residential House",
                    "Villa",
                    "Builder Floor Apartment",
                    "Penthouse",
                    "Studio Apartment",
                    "Service Apartment",
                    "Commercial Office Space",
                    "Office in IT Park/SEZ",
                    "Commercial Shop",
                    "Commercial Showroom",
                    "Commercial Land",
                    "Warehouse/Godown",
                    "Industrial Land",
                    "Industrial Building",
                    "Industrial Shed",
                    "Agricultural Land",
                    "Farm House",
                  ],
            value: form.values.type,
            onChange: handleTypeChange,
            error: form.errors.type,
          })}
          {formField.text({
            key: "address",
            type: "text",
            label: "Address",
            value: form.values.address,
            onChange: handleChange,
            error: form.errors.address,
          })}
          {formField.select({
            key: "city",
            type: "select",
            label: "City",
            options: cities,
            value: form.values.city,
            onChange: handleChange,
            error: form.errors.city,
          })}
          {formField.select({
            key: "locality",
            type: "select",
            label: "Locality",
            options: localities,
            value: form.values.locality,
            onChange: handleChange,
            error: form.errors.locality,
          })}
          {[1, 2, 3, 4].map((ele) => (
            <Fragment key={ele}>
              {formField.select({
                key: "nearByLocation" + ele,
                type: "select",
                label: "Near By Location " + ele,
                options: localities,
                value: form.values["nearByLocation" + ele],
                onChange: handleChange,
                error: form.errors["nearByLocation" + ele],
              })}
            </Fragment>
          ))}

          <h5 style={{ width: "100%" }}>Pin Your Property Location</h5>
          <LocationPin
            location={
              form.values?.latitude && form.values?.longitude
                ? {
                    lat: form.values?.latitude,
                    lng: form.values?.longitude,
                  }
                : null
            }
            setLocationChange={setLocationData}
          />
          {formField.text({
            key: "reraNo",
            type: "text",
            label: "RERA Number",
            value: form.values.reraNo,
            onChange: handleChange,
            error: form.errors.reraNo,
          })}
          {formData.map((ele, i) => (
            <Fragment key={i}>
              {!ele?.hide &&
                formField[ele.type]({
                  ...ele,
                  value: form.values[ele.key],
                  onChange: handleChange,
                  error: form.errors[ele.key],
                })}
            </Fragment>
          ))}
        </div>
        <div className="p-form-btn-con">
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? <Loading color="#fff" /> : "Next"}
          </Button>
        </div>
      </form>
    )
  );
}

export default Step1;
