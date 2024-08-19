import { checkLocalStorage, getInboxMessages } from "../lib/api";
import EmailBox from "./EmailBox";
import SelectedOption from "./SelectedOption";
import SidebarOption from "./SidebarOption";

const Dashboard = async() => {
  checkLocalStorage();
  const messages = await getInboxMessages();
  return (
    <div className="flex justify-between items-center">
      <SidebarOption />
      <SelectedOption messages={messages} />
      <EmailBox />
    </div>
  )
}

export default Dashboard;