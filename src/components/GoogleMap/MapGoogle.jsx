"use client";

import { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";
import DataLoading from "./../DataLoading";
import icons from "@/utils/icons";
import images from "@/utils/images";
import { error } from "./../Toast";

const defaultLib = [];

const options = {
  /* styles: [
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#87ceeb" }],
    },
  ], */
  disableDefaultUI: true,
  zoomControl: false,
};

function MapGoogle(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: props?.libraries || defaultLib,
  });
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [mapType, setMapType] = useState("terrain");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [center, setCenter] = useState({
    lat: 22,
    lng: 80,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [child, setChild] = useState("");

  // if (loadError) {
  //   return <div>Error loading maps</div>;
  // }

  useEffect(() => {
    isLoaded && props?.children && setChild(props.children);

    return () => {
      setChild("");
    };
  }, [isLoaded, props.children]);

  useEffect(() => {
    props?.center && setCenter(props.center);
  }, [props?.center]);

  useEffect(() => {
    props?.zoom && setZoom(props.zoom);
  }, [props.zoom]);

  useEffect(() => {
    props?.search && setSearchQuery(props.search);
  }, [props.search]);

  const handleZoomIn = () => {
    if (map && zoom < 20) {
      setZoom((prevZoom) => prevZoom + 1);
      map.setZoom(zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (map && zoom > 1) {
      setZoom((prevZoom) => prevZoom - 1);
      map.setZoom(zoom - 1);
    }
  };

  const handleToggleFullscreen = () => {
    if (map && map.getDiv()) {
      const mapDiv = map.getDiv();
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
        mapDiv.requestFullscreen();
      }
    }
  };

  /* const handleChangeMapType = (type) => {
    setMapType(type);
  }; */

  const fetchCurLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const coords = {
          lat: latitude,
          lng: longitude,
        };
        setCurrentLocation(coords);
        props.onCurLocation && props.onCurLocation(coords);
      });
    } else {
      error("Geolocation is not supported by this browser.");
    }
  };

  const handleGeocodeResults = (results, status) => {
    if (status === "OK" && results && results.length > 0) {
      const location = results[0].geometry.location;
      setCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
      const bounds = results[0].geometry.viewport;
      const newZoom = calculateZoomLevel(bounds);
      setZoom(newZoom);
    }
  };

  const calculateZoomLevel = (bounds) => {
    const GLOBE_WIDTH = 256;
    const latFraction =
      (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 180;
    const lngFraction =
      (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 360;
    const latZoom = Math.floor(
      Math.log(window.innerHeight / latFraction / GLOBE_WIDTH) / Math.LN2
    );
    const lngZoom = Math.floor(
      Math.log(window.innerWidth / lngFraction / GLOBE_WIDTH) / Math.LN2
    );
    return Math.min(latZoom, lngZoom, 20) * 1.05;
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery !== "") {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: searchQuery }, handleGeocodeResults);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return isLoaded ? (
    <div className="map-container">
      <GoogleMap
        onLoad={(m) => {
          props?.onLoad && props?.onLoad(m);
          setMap(m);
        }}
        onClick={props?.onClick}
        center={center}
        zoom={zoom}
        mapContainerStyle={props?.mapContainerStyle}
        options={{ ...options, mapTypeId: mapType }}
      >
        {currentLocation && !props.hideCurrentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: images.currentLocation,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        )}

        {child}

        <Button
          variant="outlined"
          className="map-btn cur-loc-btn"
          onClick={fetchCurLocation}
          title="Current Location"
        >
          {icons.location}
        </Button>
        <Button
          variant="outlined"
          className="map-btn zoom-in-btn"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          {icons.add}
        </Button>
        <Button
          variant="outlined"
          className="map-btn zoom-out-btn"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          {icons.remove}
        </Button>

        <input
          placeholder="Search"
          className="map-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          spellCheck={false}
        />

        <Button
          variant="outlined"
          className="map-btn full-scr-btn"
          onClick={handleToggleFullscreen}
          title="Full Screen"
        >
          {isFullscreen ? icons.fullScreenExit : icons.fullScreen}
        </Button>

        {/* <Button
            variant="contained"
            className={`map-button ${mapType === "terrain" ? "active" : ""}`}
            onClick={() => handleChangeMapType("terrain")}
          >
            Terrain
          </Button>
          <Button
            variant="contained"
            className={`map-button ${mapType === "satellite" ? "active" : ""}`}
            onClick={() => handleChangeMapType("satellite")}
          >
            Satellite
          </Button>
          <Button
            variant="contained"
            className={`map-button ${mapType === "hybrid" ? "active" : ""}`}
            onClick={() => handleChangeMapType("hybrid")}
          >
            Hybrid
          </Button> */}
      </GoogleMap>
    </div>
  ) : (
    <DataLoading />
  );
}

export default MapGoogle;
