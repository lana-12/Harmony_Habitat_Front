import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./scss/index.scss";
import App from "./components/App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/User/SignIn";
import Login from "./components/Login/LogIn";
import User from "./components/User/User";
import ForgotPassword from "./components/User/ForgotPwd";
import NewPwd from "./components/User/NewPwd";
import { actionLogin } from "./actions/LoginAction";
import { actionUpdateUser } from "./actions/UpdateUserAction";
import { actionAddComment } from "./actions/CommentAction";


//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Routes et actions, import du scss
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="" element={<App />}>
    {/* Route des components */}
    <Route path="/SignIn" element={<SignIn/>}></Route>
    <Route path="/LogIn" element={<Login/>}></Route>
    <Route path="user" element={<User />}></Route>
    <Route path="/ForgotPwd" element={<ForgotPassword/>}></Route>
    <Route path="/NewPwd" element={<NewPwd/>}></Route>
    <Route path="*" element={<Home />} />
    <Route path="/connect" action={actionLogin} />
    <Route path="/addComment" action={actionAddComment} /> 
    <Route path="/updateUser" action={actionUpdateUser} />
    </Route>
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
