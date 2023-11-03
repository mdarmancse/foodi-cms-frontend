import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { NavbarContext } from "./navbar.context";

export const NavbarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMediumScreen = useMedia("(min-width: 768px)", true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const value = {
    drawerOpen,
    sidebarOpen,
    toggleDrawer,
    toggleSidebar,
  };

  useEffect(() => {
    if (!isMediumScreen) if (sidebarOpen) setSidebarOpen(false);
    if (isMediumScreen) if (!sidebarOpen) setSidebarOpen(true);
    if (isMediumScreen) if (drawerOpen) setDrawerOpen(false);
  }, [isMediumScreen]);

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};
