import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (blogId > 100) {
      navigate("/not-found", { replace: true });
    }
  }, [blogId]);

  return (
    <>
      <div>Details {blogId}</div>
      <Link to="/blog/123">New Blog Post</Link>
      <Link onClick={() => navigate(-1)}>Back</Link>
    </>
  );
};

export default BlogDetails;
