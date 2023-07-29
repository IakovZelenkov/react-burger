import React, { useEffect } from "react";
import styles from "./App.module.scss";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { geIngredients } from "../../services/slices/burgerIngredientsSlice";
import { checkUserAuth } from "../../services/slices/auth/actions";

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
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import FeedPage from "../../pages/feed/feed";
import OrderInfo from "../OrderInfo/OrderInfo";
import { useAppDispatch } from "../../services/hooks/hooks";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let state = location.state;

  useEffect(() => {
    dispatch(geIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderNumber" element={<OrderInfo />} />
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
        <Route
          path="/profile/orders/:orderNumber"
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientsPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:orderNumber"
            element={
              <Modal
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <Modal
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
