import axios from "axios";

const exchangeAPI = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
  timeout: 1000,
});

//list categories
export const getLatest = async (option) => {
  return await exchangeAPI
    .get("list.php", {
      params: {
        [option]: "list",
      },
    })
    .then((response) => response.data);
};

//list categories meals
export const getCategoryMeals = async (option) => {
  return await exchangeAPI
    .get("filter.php", {
      params: {
        c: option,
      },
    })
    .then((response) => response.data);
};
