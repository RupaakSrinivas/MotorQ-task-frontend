import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GaurdedRoute from "./components/gaurdedRoute.tsx";
import Login from "./pages/login/index.tsx";
import NotFound from "./pages/notFound.tsx";

import App from "./App.tsx";
import "./index.css";
import Employees from "./pages/managers/employees/index.tsx";
import ViewVehicles from "./pages/managers/viewVehicles/index.tsx";
import AddEmployee from "./pages/managers/employees/add/index.tsx";
import Assignment from "./pages/managers/assign/index.tsx";
import NewAssignment from "./pages/managers/assign/new/index.tsx";
import AssigRequests from "./pages/drivers/index.tsx";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GaurdedRoute />,
    children: [
      {
        path: "/manager",
        element: <App />,
        children: [
          {
            path: "/manager",
            element: <Employees />,
          },
          {
            path: "/manager/drivers",
            element: <Employees />,
          },
          {
            path: "/manager/drivers/add",
            element: <AddEmployee />,
          },
          {
            path: "/manager/assign",
            element: <Assignment />,
          },
          {
            path: "/manager/assign/add",
            element: <NewAssignment />,
          },
          {
            path: "/manager/vehicles",
            element: <ViewVehicles />,
          },
        ],
      },
      {
        path: "/driver",
        element: <App />,
        children: [
          {
            path: "/driver",
            element: <AssigRequests />,
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
