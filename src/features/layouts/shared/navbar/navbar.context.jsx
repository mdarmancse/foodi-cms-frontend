import { createContext } from "react";

export const NavbarContext = createContext({
  sidebarOpen: false,
  drawerOpen: false,
  toggleSidebar() {},
  toggleDrawer() {},
});
