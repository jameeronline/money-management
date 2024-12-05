import { getValue } from "./localStore";

export const getMatchingAllItems = ({ category, key, value }) => {
  const data = JSON.parse(getValue(category)) ?? [];

  return data.filter((item) => item[key] === value);
};
