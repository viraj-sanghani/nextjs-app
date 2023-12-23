import moment from "moment";
import Image from "next/image";
import E404 from "@/components/Error";
import { blogOriginalImg } from "@/utils/helper";
import BlogCategory from "../BlogCategory";
import BlogProperty from "./BlogProperty";
import { call, getBlogDetail } from "@/services/api";

const fetchBlog = async (blogId) => {
  try {
    const res = await call(getBlogDetail(blogId));
    return res.data;
  } catch (err) {
    return null;
  }
};

function createMarkup(content) {
  return { __html: content };
}

const page = async ({ params }) => {
  const blogId = (params.blogId || "").split("-").at(-1);
  const blog = await fetchBlog(blogId);

  return blog ? (
    <div className="blog-box">
      <div className="blog-wrap">
        <div className="blog-image-wrap">
          <Image
            src={blog?.img && blogOriginalImg(blog?.img)}
            height={400}
            width={1300}
            style={{
              objectFit: "cover",
            }}
            alt={(blog?.meta_title || "").replaceAll(" | ", ", ")}
          />
        </div>
        <div className="blog-content-wrap">
          <div className="blog-detail">
            <h2 className="blog-title">{blog?.title}</h2>
            <p className="blog-created-time">
              Updated :{" "}
              {blog?.createdAt && moment(blog?.createdAt).format("LL")}
            </p>
            <hr />
            <div className="blog-content">
              <div dangerouslySetInnerHTML={createMarkup(blog?.content)} />
            </div>
          </div>
          <div className="blog-other-wrap">
            <BlogCategory />
          </div>
        </div>
      </div>

      <BlogProperty />
    </div>
  ) : (
    <E404 />
  );
};

export default page;
