import { checkLocalStorage, getInboxMessages, getMyProfile, getToken } from "../lib/api";
import SelectedOption from "./SelectedOption";
import SidebarOption from "./SidebarOption";

const Dashboard = async() => {
  checkLocalStorage();
  const messages = await getInboxMessages();
  const myProfile = await getMyProfile();
  const token=getToken();
  return (
    <div className="flex justify-between items-center">
      <SidebarOption profile={myProfile} messages={messages} token={token} />
      {/* <SelectedOption messages={messages} token={token} /> */}
    </div>
  )
};

export default Dashboard;