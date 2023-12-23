import BlogCard from "@/components/Cards/BlogCard";
import NoData from "@/components/NoData";
import { call, getBlogs } from "@/services/api";
import BlogCategory from "./BlogCategory";

const fetchBlogs = async () => {
  try {
    const res = await call(getBlogs("all"));
    return res.data;
  } catch (err) {
    return [];
  }
};

async function Blogs() {
  const data = await fetchBlogs("all");

  return (
    <div className="blogBox">
      <div className="blogCategoryContainer">
        <div className="categoryPageLeft">
          {data.length > 0 ? (
            <div className="blog-card-wrap">
              {data.map((blog, i) => (
                <BlogCard key={i} data={blog} />
              ))}
            </div>
          ) : (
            <NoData />
          )}
        </div>
        <div className="blog-other-wrap">
          <BlogCategory />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
