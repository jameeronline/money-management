import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import client from "../cms/client";
import BlogListing from "../components/blog-listing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../components/spinner";
import { motion, AnimatePresence } from "framer-motion";

export async function blogLoader({ request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const pageSize = 2;
  const skip = (page - 1) * pageSize;

  try {
    const collections = await client.getEntries({
      content_type: "blog",
      limit: pageSize,
      skip: skip,
      "metadata.tags.sys.id[in]": "portfolio", // Filter by the tag "portfolio"
    });

    console.log(collections);
    const content = collections.items;
    const totalPages = collections.total;

    //console.log(content.items);
    return { content, page, totalPages };
  } catch (e) {
    throw new Error("Error: there is a error to fetch a blog");
  }
}

const Blog = () => {
  const { content, page, totalPages } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const handlePrevPage = () => {
    if (page > 1) {
      navigate(`/blog?page=${page - 1}`);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      navigate(`/blog?page=${page + 1}`);
    }
  };

  return (
    <>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Spinner />
        </motion.div>
      )}
      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-10">
              {content && <BlogListing items={content} />}

              <div className="flex gap-4 justify-center">
                <Button
                  variant="secondary"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Blog;
