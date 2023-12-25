"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button } from "@mui/material";
import icons from "@/utils/icons";

const MapEvents = ({ handleMapClick, handleLocationFound }) => {
  useMapEvents({
    click(e) {
      handleMapClick(e.latlng);
    },
    locationfound(e) {
      handleLocationFound(e.latlng);
    },
  });
  return null;
};

const MapSearch = ({ searchQuery }) => {
  const map = useMap();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`
      );
      if (!response.data[0]) return;
      const { boundingbox } = response.data[0];
      map.flyToBounds(
        [
          [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
          [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
        ],
        {
          duration: 2,
        }
      );
    } catch (err) {}
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery !== "") {
        handleSearch();
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return null;
};

const MemoizedMapSearch = memo(MapSearch);

function Map(props) {
  const {
    style = {},
    hideCurLocationIcon,
    pinnedLocation = null,
    circleLocation,
    circleRadius,
    center,
    search,
    handleCurLocation = () => {},
    handleMapClick = () => {},
  } = props;

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    map && center && map.flyTo(center, 13, { duration: 3 });
  }, [center]);

  useEffect(() => {
    search && setSearchQuery(search);
  }, [search]);

  const conRef = useRef();

  const handleMapLoad = (e) => {
    props?.onLoad && props?.onLoad(e.target);
    setMap(e.target);
  };

  const handleZoomIn = () => {
    if (map && map._zoom < 20) {
      map.setZoom(map._zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (map && map._zoom > 0) {
      map.setZoom(map._zoom - 1);
    }
  };

  const handleToggleFullscreen = () => {
    const mapElement = conRef.current;

    if (mapElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        mapElement.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  const fetchCurLocation = () => {
    map.locate();
  };

  const handleLocationFound = (coords) => {
    setCurrentLocation(coords);
    map.flyTo(coords, 13, { duration: 3 });
    handleCurLocation(coords);
  };

  const customIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
  });

  return (
    <div
      ref={conRef}
      className="map-container"
      style={isFullscreen ? { ...style, height: "100vh" } : style}
    >
      <div className="map-controls">
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

        <Button
          variant="outlined"
          className="map-btn full-scr-btn"
          onClick={handleToggleFullscreen}
          title="Full Screen"
        >
          {isFullscreen ? icons.fullScreenExit : icons.fullScreen}
        </Button>

        <input
          type="search"
          placeholder="Search"
          className="map-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          spellCheck={false}
        />
      </div>

      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[19.07, 72.87]}
        zoom={12}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        whenReady={handleMapLoad}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapEvents
          handleMapClick={handleMapClick}
          handleLocationFound={handleLocationFound}
        />

        <MemoizedMapSearch searchQuery={searchQuery} />

        {currentLocation && !hideCurLocationIcon && (
          <Marker
            position={[currentLocation.lat, currentLocation.lng]}
            icon={customIcon}
          />
        )}

        {pinnedLocation && (
          <Marker position={pinnedLocation} icon={customIcon} />
        )}

        {circleLocation && circleRadius && (
          <Circle
            center={circleLocation}
            radius={circleRadius}
            pathOptions={{
              fillColor: "#0078b1",
              fillOpacity: 0.2,
              strokeColor: "#0078b1",
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
