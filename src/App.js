import LoginForm from "./components/LoginForm"
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <div>Hello There!</div>
    </Fragment>
  );
}

export default App;
