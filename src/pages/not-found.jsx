import { Link, useRouteError, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { House, Undo2 } from "lucide-react";

const NotFound = ({ message }) => {
  //const error = useRouteError();
  //const navigate = useNavigate();
  //console.error(error);

  return (
    <div id="error-page" className="text-center prose mx-auto">
      <h1 className="text-6xl mb-4">
        <span className="text-teal-500">Oops!</span> <br />
        404 Page not found
      </h1>
      <p className="text-lg text-slate-500">
        <span>{message ?? `Page Not Found`}</span>
      </p>

      <div className="flex gap-2 justify-center mt-10">
        {/* <Button onClick={() => navigate(-1)} className="h-10">
          <Undo2 />
          Back
        </Button> */}
        <Button asChild className="h-10">
          <Link to="/" className="no-underline">
            <House /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
