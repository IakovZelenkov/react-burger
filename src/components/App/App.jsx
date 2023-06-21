import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIngredient } from "../../services/slices/burgerIngredientsSlice";
import { checkUserAuth } from "../../services/actions/authActions";

import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import AppHeader from "../AppHeader/AppHeader";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientsPage from "../../pages/ingredients/ingredients";
import NotFound from "../../pages/not-found/not-found";
import ProfileHome from "../../pages/profile/profile-home/profile-home";
import ProfileOrders from "../../pages/profile/profile-orders/profile-orders";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredient());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route
              path="/profile"
              element={<OnlyAuth component={<ProfileHome />} />}
            />
            <Route
              path="/profile/orders"
              element={<OnlyAuth component={<ProfileOrders />} />}
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
