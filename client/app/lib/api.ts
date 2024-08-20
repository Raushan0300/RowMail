import { redirect } from "next/navigation";
import { getData } from "../config";
import { cookies } from "next/headers";

// export const getTokenFromCookie = () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value;
//   if (token) {
//     redirect("/dashboard");
//   } else {
//     return null;
//   }
// };

export const getTokenFromURL = (searchParams:any) => {
  // const token = localStorage.getItem("token");
  const cookieStore=cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    redirect("/dashboard");
  } else{
    const tokenFromParams = searchParams.token;
    if(tokenFromParams){
      redirect(`/api/set-token?token=${tokenFromParams}`);
    }
  }
};

export const checkLocalStorage = () => {
  const cookieStore=cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/");
  }
};

export const getInboxMessages = async () => {
  const cookieStore=cookies();
  const token = cookieStore.get("token")?.value;
  const response = await getData('inbox', {Authorization:`Bearer ${token}`});
  return response;
};