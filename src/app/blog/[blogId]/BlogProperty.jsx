"use client";

import { useEffect, useState } from "react";
import PropertySwiper from "@/components/Swiper/PropertySwiper";

const BlogProperty = ({ blogId }) => {
  const [blogProperties, setBlogProperties] = useState([]);

  const fetchBlogProp = async () => {
    try {
      const res = await call(getBlogProperties(blogId));
      setBlogProperties(res?.data || []);
    } catch (err) {}
  };

  useEffect(() => {
    fetchBlogProp();
  }, []);

  return (
    blogProperties.length > 0 && (
      <div className="max-width" style={{ maxWidth: 1330, padding: 10 }}>
        <div className="prop-sec-title">Related Properties</div>
        <PropertySwiper data={blogProperties} />
      </div>
    )
  );
};

export default BlogProperty;
