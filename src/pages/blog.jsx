import { Link } from "react-router-dom";
const blog = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="1">Articel 1</Link>
        </li>
        <li>
          <Link to="2">Articel 2</Link>
        </li>
        <li>
          <Link to="3">Articel 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default blog;
