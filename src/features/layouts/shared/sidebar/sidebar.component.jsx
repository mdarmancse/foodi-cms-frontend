import { useSelector } from "react-redux";
import { useNavbar } from "../navbar";
import { SidebarMenu } from "./sidebar-menu.component";

export const Sidebar = () => {
  const { sidebarOpen } = useNavbar();
  const { menu } = useSelector((state) => state.userCredential);

  const Menus = menu || [];
  return (
    <div className={`sidebar ${!sidebarOpen ? "sidebar-close" : ""}`}>
      <SidebarMenu menuList={Menus} />
    </div>
  );
};
