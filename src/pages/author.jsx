import { useLoaderData } from "react-router-dom";
import client from "../cms/client";
import BlogListing from "../components/blog-listing";

export async function authorLoader({ request }) {
  const url = new URL(request.url);
  const data = url.searchParams.get("id");

  try {
    const collections = await client.getEntries({
      content_type: "blog",
      "fields.author.sys.id": data,
    });

    console.log(collections);
    const content = collections.items;

    //console.log(content.items);
    return { content };
  } catch (e) {
    throw new Error("Error: there is a error to fetch a blog");
  }
}

const Author = () => {
  const { content } = useLoaderData();

  return (
    <div className="space-y-10">
      {content && <BlogListing items={content} />}
    </div>
  );
};

export default Author;
