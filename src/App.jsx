import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PanelLayout } from "./features/layouts";
import "./features/style/main.scss";
import { Guard } from "./features/ui";
import { publicRoutes, routes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Guard children={<PanelLayout>{route.element}</PanelLayout>} />
            }
          />
        ))}

        {publicRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<Guard children={route.element} />}
          />
        ))}
      </Routes>
      <ToastContainer theme="colored" pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
