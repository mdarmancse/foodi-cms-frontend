import { useNavbar } from "./navbar";

export const Page = ({ children }) => {
  const { sidebarOpen } = useNavbar();

  return (
    <div className={`main-content px-2 ${sidebarOpen ? "sidebar-open" : ""}`}>
      {children}
    </div>
  );
};
