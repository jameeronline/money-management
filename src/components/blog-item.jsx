import { Link } from "react-router-dom";
import {
  convertTimestampToReadableDate,
  formatToUrlString,
} from "../utilities/formats";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogItem = ({ item }) => {
  //thumbnail
  const { title, summary, postThumbnail } = item.fields;
  const { id, createdAt } = item.sys;

  const thumbnailURL = postThumbnail.fields?.file?.url;

  console.log(thumbnailURL);

  return (
    <article className="prose">
      <div className="flex flex-col gap-10 sm:flex-row">
        <LazyLoadImage
          alt={title}
          height={240}
          src={thumbnailURL} // use normal <img> attributes as props
          width={240}
          effect="blur"
          className="m-0 object-cover"
        />
        <div>
          <h1 className="mb-0">
            <Link
              to={`/blog/${formatToUrlString(title)}?id=${id}`}
              className="no-underline font-extrabold"
            >
              {title}
            </Link>
          </h1>
          <p className="mt-0">{convertTimestampToReadableDate(createdAt)}</p>
          <p>{summary}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
