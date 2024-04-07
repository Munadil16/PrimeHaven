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
import BuyProperty from "./pages/Properties/BuyProperty/BuyProperty.jsx";
import SellProperty from "./pages/Properties/SellProperty/SellProperty.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentCancel from "./components/PaymentCancel.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="logout" element={<Logout />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="update-password" element={<UpdatePassword />} />
      <Route path="buy-property" element={<BuyProperty />} />
      <Route path="sell-property" element={<SellProperty />} />
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="payment-cancel" element={<PaymentCancel />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
