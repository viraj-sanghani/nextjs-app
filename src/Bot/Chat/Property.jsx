import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import BotSwiper from "@/components/Swiper/BotSwiper";

function Property({ align, icon, item }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/${item.url}`,
        item.params
      );
      Array.isArray(data.data) && setData(data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={align === "r" ? "chat-right" : "chat-left"}>
      <div className="chat-icon">
        <img src={icon} alt="" />
      </div>
      <div className="chat-mes bg p-1">
        <div className="property-wrapper">
          {loading && (
            <div className="property-data-loader">
              <Loading />
            </div>
          )}
          {!loading &&
            (data.length > 0 ? (
              <BotSwiper data={data} />
            ) : (
              <div
                className="no-data"
                style={{ width: 200, height: 200, fontWeight: 600 }}
              >
                Property Not Found
                <br />
                Try Again?
              </div>
            ))}
        </div>
        <div className="chat-time">
          {moment(item?.createdAt, "YYYY-MM-DD h:mm:ss").format("h:mm a")}
        </div>
      </div>
    </div>
  );
}

export default Property;
