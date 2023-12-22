"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataLoading from "@/components/DataLoading";
import MyListingCard from "@/components/Cards/MyListingCard";
import NoData from "@/components/NoData";
import Alert from "@/components/Alert";
import { success } from "@/components/Toast";
import {
  call,
  deleteProperty,
  getListings,
  updatePropertyActive,
} from "@/services/api";

function Listings() {
  const { profile } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [status, setStatus] = useState({});
  const [data, setData] = useState([]);
  const [listings, setListings] = useState([]);
  const [curTab, setCurTab] = useState("all");
  const fetchData = async () => {
    try {
      const res = await call(getListings());
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const cancelDelete = () => {
    setDeleteId("");
    setOpen(false);
  };

  const handleDeleteProperty = async () => {
    setOpen(false);
    try {
      const res = await call(deleteProperty(deleteId));
      setData((prev) => prev.filter((ele) => ele.id != deleteId));
      setDeleteId("");
      success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = (data) => {
    setStatus(data);
    setOpenStatus(true);
  };

  const cancelStatus = () => {
    setStatus({});
    setOpenStatus(false);
  };

  const handleStatusProperty = async () => {
    setOpenStatus(false);
    try {
      const res = await call(
        updatePropertyActive({ propertyId: status?.id, isActive: !status?.cur })
      );
      setData(
        data.map((ele) => {
          if (ele.id == status?.id) {
            ele.isActive = !ele.isActive;
          }
          return ele;
        })
      );
      setStatus({});
      success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setListings(
      curTab !== "all" ? data.filter((ele) => ele?.postFor === curTab) : data
    );
  }, [curTab, data]);

  return (
    <div className="shortlisted-wrap">
      {profile.usertype === "Channel Partner" && (
        <div className="listing-tabs">
          <div
            className={`listing-tab-item ${curTab === "all" ? "active" : ""}`}
            onClick={() => setCurTab("all")}
          >
            All
          </div>
          <div
            className={`listing-tab-item ${curTab === "B2C" ? "active" : ""}`}
            onClick={() => setCurTab("B2C")}
          >
            B2C
          </div>
          <div
            className={`listing-tab-item ${curTab === "CP" ? "active" : ""}`}
            onClick={() => setCurTab("CP")}
          >
            CP
          </div>
          <div
            className={`listing-tab-item ${curTab === "Self" ? "active" : ""}`}
            onClick={() => setCurTab("Self")}
          >
            Self
          </div>
        </div>
      )}
      {loading ? (
        <DataLoading />
      ) : listings.length > 0 ? (
        listings.map((ele, i) => (
          <MyListingCard
            data={ele}
            key={i}
            isListingCard={true}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))
      ) : (
        <NoData />
      )}

      <Alert
        open={open}
        handleClose={cancelDelete}
        animation="scale"
        data={{
          title: "Are You Sure! Want to Delete This Property?",
          icon: "warning",
          extraInfo:
            "Do you really want to delete these property? You can't view this in your list anymore if you delete!",
          buttons: [
            {
              type: "success",
              text: "No, Keep It",
              callback: cancelDelete,
            },
            {
              class: "red",
              type: "error",
              text: "Yes, Delete It",
              callback: handleDeleteProperty,
            },
          ],
        }}
      />

      <Alert
        open={openStatus}
        handleClose={cancelStatus}
        animation="scale"
        data={{
          title: `Are You Sure! Want to ${
            status?.cur == 0 ? "Activate" : "Deactivate"
          } This Property?`,
          icon: "warning",
          buttons: [
            {
              type: "primary",
              text: "Cancel",
              callback: cancelStatus,
            },
            {
              class: "yellow",
              type: "warning",
              text: "Confirm",
              callback: handleStatusProperty,
            },
          ],
        }}
      />
    </div>
  );
}

export default Listings;
