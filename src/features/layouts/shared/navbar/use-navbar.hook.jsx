import { useContext } from "react";
import { NavbarContext } from "./navbar.context";

export const useNavbar = () => useContext(NavbarContext);
