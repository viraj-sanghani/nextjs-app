"use client";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { blogSmallImg } from "@/utils/helper";

function BlogCard({ data }) {
  return (
    <div className="blogCard">
      <Link
        target="_blank"
        href={{
          pathname: data?.meta_url,
        }}
      >
        <div className="blogCardImgHolder">
          <Image
            src={data?.img && blogSmallImg(data?.img)}
            height={200}
            width={400}
            alt={(data?.meta_title || "").replaceAll(" | ", ", ")}
          />
        </div>
        <div className="blogCategoryTagDate">
          <div className="blogCardTag">{data?.catName}</div>
          <div className="blogCardDate">
            {data?.createdAt && moment(data?.createdAt).format("LL")}
          </div>
        </div>
        <h3 className="blogCardTitle">{data?.title}</h3>
      </Link>
    </div>
  );
}

export default BlogCard;
