import { useEffect, useState } from "react";
import { getLatest } from "../data/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLoaderData, Link, Outlet, useNavigate } from "react-router-dom";

export async function loader() {
  const list = await getLatest("c");
  return { list };
}

const Events = () => {
  // const [data, setData] = useState([]);
  // const [selectedRate, setSelectedRate] = useState("");
  // const [amount, setAmount] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { list } = useLoaderData();

  useEffect(() => {
    if (list && list?.meals.length > 0) {
      navigate(`/events/${list.meals[0]["strCategory"]}`);
    }
  }, [list, navigate]);

  return (
    <div className="grid gap-2 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-span-4 md:col-span-3 lg:col-span-3">
        {list ? (
          <>
            {list.meals.map((item) => (
              <li key={item["strCategory"]}>
                <Link to={`/events/${item["strCategory"]}`}>
                  {item["strCategory"]}
                </Link>
              </li>
            ))}
          </>
        ) : (
          "No Results"
        )}
      </div>
      <div className="col-span-4 md:col-span-5 lg:col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
