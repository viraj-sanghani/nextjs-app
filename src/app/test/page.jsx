"use client";

import "@/styles/gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { propertyOriginalImg, propertySmallImg } from "@/utils/helper";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import icons from "@/utils/icons";
import { setShare } from "@/redux/reducers/appReducer";

const imageTypes = [
  "Main Image",
  "Exterior View",
  "Living Room",
  "Bedrooms",
  "Bathrooms",
  "Kitchen",
  "Floor Plan",
  "Master Plan",
  "Location Map",
  "Others",
  "Site View",
  "Common Area",
  "Washrooms",
];

function Test({ data, handleGalleryClose }) {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [sortedImages, setSortedImages] = useState([]);
  const [totalImgCount, setTotalImgCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [thumbnail, setThumbnail] = useState(false);
  const [moveIndex, setMoveIndex] = useState({});
  const [selectedItem, setSelectedItem] = useState(0);

  const conRef = useRef();
  const imageGalleryRef = useRef(null);

  const handleThumbnail = () => {
    setThumbnail(!thumbnail);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(false);
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

  const updateData = () => {
    const d = Object.values(sortedImages);
    const data = [];

    d.forEach((ele) => {
      ele.img.map((img) => {
        data.push({
          original: propertyOriginalImg(img),
          thumbnail: propertySmallImg(img),
        });
      });
    });

    setImages(data);
  };

  const handleTypeClick = (clickedType, count) => {
    setSelectedItem(count);
    const clickedCount = Object.values(moveIndex).find(
      (obj) => obj.type === clickedType
    ).count;
    moveToIndex(clickedCount);
  };

  const moveToIndex = (index) => {
    if (imageGalleryRef.current) {
      imageGalleryRef.current.slideToIndex(index);
    }
  };

  function handleSlide(index) {
    for (let i = 0; i < moveIndex.length; i++) {
      if (moveIndex[i].count == index) {
        setSelectedItem(moveIndex[i].count);

        break;
      } else if (moveIndex[i].count > index) {
        setSelectedItem(moveIndex[i - 1].count);

        break;
      }
    }
  }

  useEffect(() => {
    if (data && Array.isArray(data.images)) {
      const groupedImages = data.images.reduce((acc, image) => {
        if (!acc[image.type]) {
          acc[image.type] = { type: image.type, img: [] };
        }
        if (!acc[image.type].img.includes(image.img)) {
          acc[image.type].img.push(image.img);
        }
        return acc;
      }, {});

      const sortedImages = imageTypes
        .map((type) => groupedImages[type])
        .filter(Boolean);

      setSortedImages(sortedImages);

      const d = {};
      let count = 0;
      Object.values(sortedImages).forEach((ele) => {
        d[ele.type] = count;
        count += ele.img.length;
      });
      setTotalImgCount(count);

      const objectsWithCount = Object.keys(d).map((key) => {
        return { type: key, count: d[key] };
      });
      setMoveIndex(objectsWithCount);
    }
  }, [data]);

  useEffect(() => {
    sortedImages.length > 0 && updateData();
  }, [sortedImages]);

  const handleShare = () => dispatch(setShare({ open: true, url: data?.url }));

  const handleClose = () => {
    isFullscreen && handleToggleFullscreen();
    handleGalleryClose();
  };

  return (
    <div className="image-gallery-wrap" ref={conRef}>
      <div className="image-gallery-header">
        <h2> {data?.name}</h2>
        <h4>{data?.price}</h4>
      </div>

      <div className="gallery-share-btn" onClick={handleShare}>
        {icons.share}
      </div>
      <div className="gallery-close-btn" onClick={handleClose}>
        {icons.close}
      </div>

      <div className="image-category-items">
        {moveIndex.length > 0 &&
          moveIndex.map((ele) => (
            <div
              key={ele.type}
              onClick={() => handleTypeClick(ele.type, ele.count)}
              className={`image-category-item ${
                selectedItem == ele.count ? "selected" : ""
              }`}
            >
              {ele.type}
            </div>
          ))}
      </div>

      <h5 className="image-gallery-current-slide">
        {selectedItem + 1} / {totalImgCount}
      </h5>

      <ImageGallery
        ref={imageGalleryRef}
        items={images}
        showPlayButton={true}
        slideInterval={3000}
        slideOnThumbnailOver={false}
        showThumbnails={thumbnail}
        // onImageLoad={moveToIndex(moveimage)}
        onSlide={handleSlide}
        showFullscreenButton={false}
        additionalClass={!thumbnail ? "hide-thumbnail" : ""}
      />

      <div className="image-gallery-btn-wrap">
        <div className={`image-gallery-btn ${isFullscreen ? "active" : ""}`}>
          {thumbnail ? (
            <KeyboardDoubleArrowUpIcon onClick={handleThumbnail} />
          ) : (
            <KeyboardDoubleArrowDownIcon onClick={handleThumbnail} />
          )}
        </div>
        <div
          onClick={handleToggleFullscreen}
          className={`image-gallery-btn ${isFullscreen ? "active" : ""}`}
        >
          {!isFullscreen ? icons.fullScreen : icons.fullScreenExit}
        </div>
      </div>
    </div>
  );
}

export default Test;
