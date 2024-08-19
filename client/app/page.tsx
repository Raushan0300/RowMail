import { getTokenFromCookie } from "./lib/api";
import PageClient from "./pageClient";

export default async function Home() {
  getTokenFromCookie();
  return (
    <PageClient />
  );
}