import { getTokenFromURL } from "./lib/api";
import PageClient from "./pageClient";

export default async function Home({searchParams}:any) {
  getTokenFromURL(searchParams);
  return (
    <PageClient />
  );
}