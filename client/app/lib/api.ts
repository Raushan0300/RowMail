import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getData } from "../config";

export const getTokenFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    redirect("/dashboard");
  } else {
    return null;
  }
};

export const checkLocalStorage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/");
  }
};

export const getInboxMessages = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const response = await getData('inbox', {Authorization:`Bearer ${token}`});
  return response;
};