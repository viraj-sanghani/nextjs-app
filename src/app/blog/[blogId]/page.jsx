import moment from "moment";
import Image from "next/image";
import Error from "@/components/Error";
import { blogOriginalImg, blogSmallImg } from "@/utils/helper";
import BlogCategory from "../BlogCategory";
import BlogProperty from "./BlogProperty";
import generateMeta from "@/utils/metadata";
import { getBlogDetail } from "@/services/api";

export const getBlog = async (blogId) => {
  try {
    const res = await getBlogDetail(blogId);
    return res.data;
  } catch (err) {
    return;
  }
};

export async function generateMetadata({ params, searchParams }, parent) {
  const blogId = (params.blogId || "").split("-").at(-1);
  const data = await getBlog(blogId);

  return data
    ? generateMeta({
        meta_title: data?.meta_title,
        meta_keyword: data?.meta_keyword,
        meta_desc: data?.meta_desc,
        meta_url: data?.meta_url,
        image: data.img ? blogSmallImg(data.img) : "",
      })
    : null;
}

function createMarkup(content) {
  return { __html: content };
}

const page = async ({ params }) => {
  const blogId = (params.blogId || "").split("-").at(-1);
  const blog = await getBlog(blogId);

  if (!blog) return <Error />;

  return (
    <div className="blog-box">
      <div className="blog-wrap">
        <div className="blog-image-wrap">
          <Image
            src={blog?.img && blogOriginalImg(blog?.img)}
            height={400}
            width={1300}
            alt={(blog?.meta_title || "").replaceAll(" | ", ", ")}
          />
        </div>
        <div className="blog-content-wrap">
          <div className="blog-detail">
            <h1 className="blog-title">{blog?.title}</h1>
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

      <BlogProperty blogId={blogId} />
    </div>
  );
};

export default page;
