import { Link } from "react-router-dom";
import Logo from "./images/logo-sm.png";

export const LoginHeader = () => {
  return (
    <div className="bg-primary w-100 rounded-top">
      <div className="text-center p-4">
        <h5 className="text-white fs-3">Welcome Back !</h5>
        <p className="text-white text-opacity-75 fw-light fs-xs">
          Sign in to continue to Foodi.
        </p>
        <Link to="/" className="logo logo-admin">
          <img src={Logo} height="24" alt="logo" />
        </Link>
      </div>
    </div>
  );
};
