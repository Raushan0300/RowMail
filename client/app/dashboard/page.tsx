import { checkLocalStorage, getInboxMessages, getToken } from "../lib/api";
import EmailBox from "./EmailBox";
import SelectedOption from "./SelectedOption";
import SidebarOption from "./SidebarOption";

const Dashboard = async() => {
  checkLocalStorage();
  const messages = await getInboxMessages();
  const token=getToken();
  return (
    <div className="flex justify-between items-center">
      <SidebarOption />
      <SelectedOption messages={messages} token={token} />
    </div>
  )
}

export default Dashboard;