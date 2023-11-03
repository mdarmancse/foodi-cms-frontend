import { removeUser, useLogoutMutation } from "@/features/auth";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsBell } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LOGO from "./images/foodi.svg";
import { useNavbar } from "./use-navbar.hook";

export const Navbar = () => {
  const { toggleSidebar } = useNavbar();
  const { user } = useSelector((state) => state.userCredential);
  const dispatch = useDispatch();
  const [logout, { isSuccess, isError, data, status, isLoading }] =
    useLogoutMutation();

  const handleLogout = async () => {
    // await logout({
    //   userName: user?.name,
    // });
    dispatch(removeUser());
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to Logout.");
    }

    if (data && isSuccess) {
      dispatch(removeUser());
      toast.success(data?.message);
    }
  }, [data, isSuccess, isError]);

  const userName = user?.name.split(" ")[0] || "";
  return (
    <Nav
      className="w-100 bg-white border-bottom d-flex align-items-center justify-content-between navbar px-2 position-fixed"
      activeKey="1"
      style={{
        zIndex: 100,
      }}
    >
      {/* //@TODO: this will be change later */}
      <div className="d-flex align-items-center">
        <div className="">
          <Link to="/">
            <img
              src={LOGO}
              style={{
                width: 120,
                height: 30,
              }}
            />
          </Link>
        </div>

        <div>
          <Button variant="light" onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </Button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Nav.Item className="pe-3">
          <Button variant="" size="sm">
            <BsBell className="fs-5 " />
          </Button>
        </Nav.Item>
        <NavDropdown
          title={userName}
          id="nav-dropdown"
          className=" bg-primary nav-dropdown rounded"
        >
          <NavDropdown.Item
            eventKey="4.1"
            className="d-flex align-items-center "
          >
            <FaUser />
            <span className="ps-2">Profile</span>
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">
            <FcSettings />
            <span className="ps-2">Settings</span>
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="4.4"
            disabled={isLoading}
            onClick={handleLogout}
          >
            <RiLogoutCircleRLine />
            <span className="ps-2">Logout</span>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </Nav>
  );
};

const Avatar = () => {
  return <div className="avatar"></div>;
};
