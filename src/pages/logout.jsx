import { delValue } from "../utilities/localStore";
import { redirect } from "react-router-dom";

export const logoutAction = async ({ request }) => {
  console.log("logout called");
  delValue("userName");
  return redirect("/");
};
