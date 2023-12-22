import React, { useState, useEffect } from "react";
import { MarkerF, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import MapGoogle from "./MapGoogle";
import { useSelector } from "react-redux";
// import Sticky from "react-stickynode";
import { Button } from "@mui/material";
import MapSwiper from "../Swiper/MapSwiper";
import ResultHeader from "../../pages/searchResult/ResultHeader";

const clusterStyles = [
  {
    textColor: "white",
    url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
    height: 53,
    width: 53,
  },
  {
    textColor: "white",
    url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png",
    height: 56,
    width: 56,
  },
];
const clusterImg =
  "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";

function PropertyMap() {
  const [infoOpen, setInfoOpen] = useState(false);
  const { properties } = useSelector((state) => state.filter);
  const { activePropOnMap } = useSelector((state) => state.app);
  const [center, setCenter] = useState(null);
  const [current, setCurrent] = useState(-1);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [activeMarkers, setActiveMarkers] = useState([]);
  const [zoom, setZoom] = useState(12);
  const [activePlaceId, setActivePlaceId] = useState(null);

  const markerClickHandler = (e, place) => {
    setActivePlaceId(place.id);
    setZoom(zoom === 18 ? 18.01 : 18);

    const sliderProperties = Array.isArray(properties)
      ? properties.filter(
          (ele) =>
            ele.latitude === place.latitude && ele.longitude === place.longitude
        )
      : [];
    setActiveMarkers(sliderProperties);
    setInfoOpen(false);
    setTimeout(() => setInfoOpen(true));

    if (e && properties) {
      const index = properties.findIndex((obj) => obj.id === place.id);
      setCurrent(index);
    }
  };

  const hideMarkerHandler = () => {
    setInfoOpen(false);
    setActiveMarkers([]);
  };

  const handleNavigationClick = (move) => {
    if (move === "prev" && current > 0) {
      markerClickHandler(null, properties[current - 1]);
      setCurrent(current - 1);
    } else if (move === "next" && current < properties.length - 1) {
      markerClickHandler(null, properties[current + 1]);
      setCurrent(current + 1);
    }
  };

  const handleClusterClick = (event) => {
    let cluster = event;
    const temp = event.getClusterer();

    const markersInCluster = cluster.getMarkers();
    const isAllMarkersAtSameLocation = markersInCluster.every(
      (marker, index, arr) => {
        return (
          index === 0 ||
          (marker.getPosition().lat() === arr[index - 1].getPosition().lat() &&
            marker.getPosition().lng() === arr[index - 1].getPosition().lng())
        );
      }
    );

    if (isAllMarkersAtSameLocation) {
      if (temp.getTotalClusters() === 1) {
        const lat = markersInCluster[0].position.lat();
        const lng = markersInCluster[0].position.lng();

        setInfoOpen(false);

        setTimeout(() => setInfoOpen(true));

        // setInfoOpen(true);

        const sliderProperties = properties.filter(
          (ele) => ele.latitude === lat && ele.longitude === lng
        );
        setActiveMarkers(sliderProperties);
      }
    }
  };

  useEffect(() => {
    if (properties && properties.length > 0 && properties.length <= 20) {
      setCurrent(-1);
      setCenter(
        properties[0]?.latitude &&
          properties[0]?.longitude && {
            lat: properties[0]?.latitude,
            lng: properties[0]?.longitude,
          }
      );
    }

    const markers = [];

    properties?.forEach((ele) => {
      if (ele?.latitude && ele?.longitude) {
        markers.push({ lat: ele.latitude, lng: ele.longitude });
      }
    });

    setMarkerPositions(markers);
  }, [properties]);

  useEffect(() => {
    if (activePropOnMap) {
      markerClickHandler(true, activePropOnMap);
    }
    return () => {
      hideMarkerHandler();
    };
  }, [activePropOnMap]);

  const matchedObjectIndex = activeMarkers.findIndex(
    (obj) => obj.id === activePlaceId
  );

  if (matchedObjectIndex !== -1) {
    const removedObject = activeMarkers.splice(matchedObjectIndex, 1)[0];
    activeMarkers.unshift(removedObject);
  }

  return (
    <div className="property-map">
      <ResultHeader />
      <MapGoogle
        zoom={zoom}
        mapContainerStyle={{
          height: "inherit",
          width: "100%",
        }}
        onCurLocation={(coords) => setCenter(coords)}
        center={center || { lat: 22, lng: 75 }}
        onClick={hideMarkerHandler}
      >
        {properties && (
          <MarkerClusterer
            options={{
              imagePath: clusterImg,
              styles: clusterStyles,
            }}
            onClick={(event) => handleClusterClick(event)}
          >
            {(clusterer) =>
              markerPositions.map((position, i) => {
                const property = properties[i];
                return property ? (
                  <MarkerF
                    key={i}
                    position={position}
                    onClick={(event) => markerClickHandler(event, property)}
                    clusterer={clusterer}
                    title={property.id}
                  />
                ) : null;
              })
            }
          </MarkerClusterer>
        )}

        {infoOpen &&
          activeMarkers &&
          activeMarkers[0] &&
          activeMarkers[0].latitude &&
          activeMarkers[0].longitude && (
            <InfoWindow
              // anchor={markerMap[selectedPlace.id]}

              position={{
                lat: activeMarkers[0]?.latitude,
                lng: activeMarkers[0]?.longitude,
              }}
              onCloseClick={() => setInfoOpen(false)}
            >
              <MapSwiper
                data={activeMarkers}
                mobile={true}
                hideShare={true}
                hideShortlist={true}
              />
            </InfoWindow>
          )}

        <Button
          variant="outlined"
          className="map-btn prev-prop-btn"
          onClick={() => handleNavigationClick("prev")}
          title="Current Location"
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          className="map-btn next-prop-btn"
          onClick={() => handleNavigationClick("next")}
          title="Current Location"
        >
          Next
        </Button>
      </MapGoogle>
    </div>
  );
}

export default PropertyMap;
