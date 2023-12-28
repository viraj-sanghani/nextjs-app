"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { setLocationOpen } from "@/redux/reducers/appReducer";
import Model from "./Model";
import SearchByLocation from "./LeafLetMap/SearchByLocation";
import { error } from "./Toast";
import { useModalBackPress } from "./CustomHook";

function NearByLocation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locationOpen } = useSelector((state) => state.app);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [propertyFor, setPropertyFor] = useState("buy");
  const [propertyType, setPropertyType] = useState("residential");
  const [radius, setRadius] = useState(3);

  const hideModal = () => {
    dispatch(setLocationOpen(false));
  };

  useModalBackPress({
    open: locationOpen,
    hide: hideModal,
  });

  const handleLocationChange = (coords) => {
    setCoordinates(coords);
  };

  const handleSearch = () => {
    if (coordinates.lat && coordinates.lat) {
      hideModal();
      router.push(
        `/search/${propertyFor}/${propertyType}/location?lat=${coordinates.lat}&lng=${coordinates.lng}&r=${radius}`
      );
    } else error("Select location to search");
  };

  return (
    <Model
      open={locationOpen}
      width={700}
      onClose={hideModal}
      preventClose={true}
    >
      {/* <div>
        <h1 className="error-mes">Enable Location Permission</h1>
        <div className="error-desc">
          <div>
            To perform Nearby Search, go to your{" "}
            <b>
              browser <br /> settings
            </b>{" "}
            and allow access to location.
          </div>
        </div>
      </div> */}
      <h1 className="nrby-title">Nearby Location</h1>

      <SearchByLocation
        handleLocationChange={handleLocationChange}
        radius={radius}
      />

      <div className="nrby-footer">
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="propertyFor">Property For</InputLabel>
          <Select
            labelId="propertyFor"
            name="propertyFor"
            label="Property For"
            value={propertyFor}
            size="small"
            autoComplete="propertyFor"
            onChange={(e) => setPropertyFor(e.target.value)}
          >
            <MenuItem value="buy">Buy</MenuItem>
            <MenuItem value="rent">Rent/Lease</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="propertyType">Property Type</InputLabel>
          <Select
            labelId="propertyType"
            name="propertyType"
            label="Property Type"
            value={propertyType}
            size="small"
            autoComplete="propertyType"
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <MenuItem value="residential">Residential</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
            <MenuItem value="plots-land">Plots-Land</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="radius">Area Radius (km)</InputLabel>
          <Select
            labelId="radius"
            name="radius"
            label="Area Radius (km)"
            value={radius}
            size="small"
            autoComplete="radius"
            onChange={(e) => setRadius(e.target.value)}
          >
            <MenuItem value={3}>3 km</MenuItem>
            <MenuItem value={5}>5 Km</MenuItem>
            <MenuItem value={10}>10 Km</MenuItem>
            <MenuItem value={15}>15 Km</MenuItem>
            <MenuItem value={20}>20 Km</MenuItem>
            <MenuItem value={30}>30 Km</MenuItem>
            <MenuItem value={40}>40 Km</MenuItem>
            <MenuItem value={50}>50 Km</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ px: 5 }} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </Model>
  );
}

export default NearByLocation;
