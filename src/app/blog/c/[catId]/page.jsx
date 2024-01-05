import BlogCard from "@/components/Cards/BlogCard";
import NoData from "@/components/NoData";
import { getBlogs } from "@/services/api";
import BlogCategory from "./../../BlogCategory";

const fetchBlogs = async (catId) => {
  try {
    const res = await getBlogs(catId);
    return res.data;
  } catch (err) {
    return [];
  }
};

async function BlogsByCat({ params }) {
  const catId = (params?.catId || "all").split("-").at(-1);
  const data = await fetchBlogs(catId);

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

export default BlogsByCat;
