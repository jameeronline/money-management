import { useNavigate } from "react-router-dom";
import BlogItem from "./blog-item";
import { Button } from "@/components/ui/button";

const BlogListing = ({ items }) => {
  const navigate = useNavigate();

  return (
    <>
      {items.map((item) => (
        <BlogItem item={item} key={item.sys.id} />
      ))}

      {/* <Button onClick={() => navigate(-1)} variant="secondary">
        Back to Posts
      </Button> */}
    </>
  );
};

export default BlogListing;
