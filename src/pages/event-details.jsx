import { useEffect } from "react";
import { useParams, useNavigate, Link, useLoaderData } from "react-router-dom";

import { getCategoryMeals } from "../data/api";

export async function eventDetailsLoader({ params }) {
  const paramData = params.eventId;
  const mealDetail = await getCategoryMeals(paramData);
  return { mealDetail };
}

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { mealDetail } = useLoaderData(eventId);

  return (
    <>
      {mealDetail &&
        mealDetail.meals.map((item) => (
          <li key={item.strMeal}>{item.strMeal}</li>
        ))}
      <Link onClick={() => navigate(-1)}>Back</Link>
    </>
  );
};

export default EventDetails;
