import { RouteGuardProvider, RouteVisibility } from "@gswag/react-route-guard";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Loading() {
  return (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export function Guard({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { accessToken, user, permission } = useSelector(
    (state) => state.userCredential
  );

  const isLogin = accessToken && user?.userId && user?.name;

  const routeAdvisor = ({ pathname, isLogin }) => {
    if (pathname.includes("/auth")) {
      if (pathname === "/auth/login") {
        if (isLogin) {
          return {
            visibility: RouteVisibility.Redirect,
            targetRoute: pathname,
            redirectRoute: "/",
          };
        } else {
          return {
            visibility: RouteVisibility.Show,
            targetRoute: pathname,
            redirectRoute: "",
          };
        }
      } else {
      }
    } else {
      if (isLogin) {
        return {
          visibility: RouteVisibility.Show,
          targetRoute: pathname,
          redirectRoute: "",
        };
      } else {
        return {
          visibility: RouteVisibility.Redirect,
          targetRoute: pathname,
          redirectRoute: "/auth/login",
        };
      }
    }
  };

  return (
    <RouteGuardProvider
      routeChanger={navigate}
      pageLoader={Loading}
      advisorArgs={{ pathname, isLogin }}
      routeAdvisor={routeAdvisor}
    >
      {children}
    </RouteGuardProvider>
  );
}
