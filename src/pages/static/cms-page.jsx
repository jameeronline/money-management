import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../../cms/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NotFound from "../not-found";

export async function contentFulLoader({ params }) {
  const slug = params.slug;
  try {
    const collections = await client.getEntries({
      content_type: "staticPages",
      "fields.slug": slug,
    });
    const content = collections?.items;
    console.log(content);
    return { content };
  } catch (e) {
    throw new Error("Error: Unable to fetch the Content");
  }
}

const CMSPage = () => {
  const { content } = useLoaderData();

  if (!content || !Array.isArray(content) || content.length === 0) {
    return <NotFound message="No content available at the moment." />;
  }

  return (
    <article className="prose lg:max-w-screen-lg">
      {content.map((item) => (
        <Fragment key={item.sys.id}>
          <h1>{item.fields.title}</h1>
          {item.fields.featureImage?.fields?.file?.url && (
            <LazyLoadImage
              alt={item.fields.title}
              src={item.fields.featureImage.fields?.file?.url} // use normal <img> attributes as props
              className="m-0 object-cover w-full h-80 rounded-3xl grayscale"
            />
          )}
          {documentToReactComponents(item.fields.body)}
        </Fragment>
      ))}
    </article>
  );
};

export default CMSPage;
