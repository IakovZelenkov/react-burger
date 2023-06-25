import React from "react";
import styles from "./forgot-password.module.scss";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../services/slices/authSlice";
import Loader from "../../components/Loader/Loader";
import { forgotPassword } from "../../services/actions/authActions";

const ForgotPasswordPage = () => {
  const { email, request } = useSelector(
    (state) => state.auth.forgotPasswordForm
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (evt) => {
    const { value, name } = evt.target;
    dispatch(
      setFormValue({ value, fieldName: name, formName: "forgotPasswordForm" })
    );
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(forgotPassword(email, () => navigate("/reset-password")));
  };

  localStorage.getItem("forgotPassword") === "success" && (
    <Navigate replace to="/reset-password" />
  );

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h2>
      <form name="forgotPassword" className={styles.form} onSubmit={onSubmit}>
        {request ? (
          <Loader />
        ) : (
          <>
            <EmailInput
              value={email}
              onChange={onChange}
              name={"email"}
              placeholder="Укажите e-mail"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={!email}
            >
              Восстановить
            </Button>
          </>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
