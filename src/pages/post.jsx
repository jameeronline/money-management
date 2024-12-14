import { useEffect } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SyntaxHighlighter from "react-syntax-highlighter";
//import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "@/components/ui/button";

import client from "../cms/client";
import {
  convertTimestampToReadableDate,
  formatToUrlString,
} from "../utilities/formats";
import { Spinner } from "../components/spinner";

export async function postLoader({ request }) {
  const url = new URL(request.url);
  const data = url.searchParams.get("id");

  try {
    const content = await client.getEntry(data);
    const assetId = content.fields.postThumbnail.sys.id;

    //thumbnail
    const thumbnail = await client.getAsset(assetId);
    const thumbnailURL = thumbnail.fields?.file?.url;

    return { content, thumbnailURL };
  } catch (e) {
    throw new Error("Error: there is a error to fetch a blog");
  }
}

const Post = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  // Check if the page is loading
  const isLoading = navigation.state === "loading";

  const { content, thumbnailURL } = useLoaderData();
  const { title, summary, details, author } = content.fields;
  console.log(content);

  //author details
  const authorName = author.fields.name;
  const authorImage = author.fields.avatar.fields.file.url;
  const authorId = author.sys.id;

  const options = {
    // renderMark: {
    //   [MARKS.CODE]: (text) =>
    //     // <SyntaxHighlighter style={monokaiSublime} showLineNumbers={true}>
    //     ({ text }),
    //     // </SyntaxHighlighter>
    // },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { title, description } = node.data.target.fields;
        return (
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { url, description, fileName } = node.data.target.fields.file;
        const altText =
          node.data.target.fields.title || description || fileName;

        return (
          <figure>
            <img src={url} alt={altText} />
            {description && <figcaption>{description}</figcaption>}
          </figure>
        );
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <article className="prose dark:prose-invert">
          <h1>{title}</h1>
          <p>
            Posted on: {convertTimestampToReadableDate(content.sys.createdAt)}
          </p>
          <p className="flex gap-2 items-center">
            <img src={authorImage} alt="" className="w-10 h-10 rounded-full" />
            <Link
              to={`/author/${formatToUrlString(authorName)}?id=${authorId}`}
            >
              {authorName}
            </Link>
          </p>
          <p className="prose-lead">{summary}</p>
          {thumbnailURL && (
            <img src={thumbnailURL} alt={title} className="w-full max-w-lg" />
          )}
          {documentToReactComponents(details, options)}

          <footer className="flex justify-center">
            <Button onClick={() => navigate(-1)} variant="secondary">
              Back to Posts
            </Button>
          </footer>
        </article>
      )}
    </>
  );
};

export default Post;
