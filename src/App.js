import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UnexpectedError from "./shared/components/UnexpectedError";
import Unauthorized from "./shared/components/Unauthorized";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateOrganization from "./dashboard/pages/organizations/components/CreateOrganization";
import SideBar from "./shared/components/SideBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar></SideBar>,
    children: [
      {
        path: "/create-organization",
        element: <CreateOrganization></CreateOrganization>,
        errorElement: <UnexpectedError />,
      },
    ],
  },
  {
    path: "/contacts",
  },
  {
    path: "/communications",
  },
  {
    path: "/Unauthorized",
    element: <Unauthorized></Unauthorized>,
  },
]);

function App() {
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
