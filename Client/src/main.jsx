import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Logout from "./pages/Logout/Logout.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword.jsx";
import Properties from "./pages/Explore/Properties/Properties.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="logout" element={<Logout />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="update-password" element={<UpdatePassword />} />
      <Route path="explore/properties" element={<Properties />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
