import { redirect } from "next/navigation";
import { getData } from "../config";
import { cookies } from "next/headers";

export const getTokenFromURL = (searchParams:any) => {
  // const token = localStorage.getItem("token");
  const token=getToken();
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
  const token=getToken();
  if (!token) {
    redirect("/");
  }
};

export const getInboxMessages = async () => {
  const token=getToken();
  const response = await getData('inbox', {Authorization:`Bearer ${token}`});
  return response;
};

export const getMyProfile = async()=>{
  const token=getToken();
  const response = await getData('user', {Authorization:`Bearer ${token}`});
  return response;
}

// export const getEmailById=async(id:string)=>{
//   const cookieStore=cookies();
//   const token = cookieStore.get("token")?.value;
//   const response = await getData(`email/${id}`, {Authorization:`Bearer ${token}`});
//   return response;
// }

export const getToken=()=>{
  const cookieStore=cookies();
  return cookieStore.get("token")?.value;
}