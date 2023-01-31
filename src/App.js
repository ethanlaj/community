import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/ProtectedRoute'
import UnexpectedError from "./components/common/UnexpectedError";
import Unauthorized from "./components/common/Unauthorized";
import SuperSecret from './components/SuperSecret';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProtectedRoute>
        <SuperSecret></SuperSecret>
      </ProtectedRoute>,
    errorElement: <UnexpectedError />,
  },
  {
    path: "/login",
    element: <LoginForm></LoginForm>,
  },
  {
    path: "/Unauthorized",
    element: <Unauthorized></Unauthorized>,
  }
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
