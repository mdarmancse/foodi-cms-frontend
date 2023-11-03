import { Navbar, NavbarProvider, Page, Sidebar } from "../shared";

export const PanelLayout = ({ children }) => {
  return (
    <NavbarProvider>
      <Navbar />
      <div className="layout ">
        <Sidebar />
        <Page>{children}</Page>
      </div>
    </NavbarProvider>
  );
};
