import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { convertBlogCatUrl } from "@/utils/helper";
import { getCategories } from "@/services/api";

const fetchBlogCategories = async () => {
  try {
    const res = await getCategories();
    return res.data;
  } catch (err) {
    return [];
  }
};
const BlogCategory = async () => {
  const data = await fetchBlogCategories("all");

  return (
    <div className="blog-category-wrap">
      <h3 className="blog-category-title">Blog Categories</h3>
      <Link href="/blog">
        <div className="blog-category-card">
          <p>All Blogs</p>
          <p className="categoryLeftArrIcon">
            <ChevronRightIcon />
          </p>
        </div>
      </Link>
      {data.map((ele, i) => (
        <Link href={{ pathname: convertBlogCatUrl(ele.name, ele?.id) }} key={i}>
          <div className="blog-category-card">
            <p>{ele?.name}</p>
            <p className="categoryLeftArrIcon">
              <ChevronRightIcon />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCategory;
