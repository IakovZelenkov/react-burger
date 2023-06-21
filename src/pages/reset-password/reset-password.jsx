import React from "react";
import styles from "./reset-password.module.scss";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../services/slices/authSlice";
import Loader from "../../components/Loader/Loader";
import { resetPassword } from "../../services/actions/authActions";

const ResetPasswordPage = () => {
  const { password, token, request } = useSelector((state) => ({
    password: state.auth.resetPasswordForm.password,
    token: state.auth.resetPasswordForm.token,
    request: state.auth.resetPasswordForm.request,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (evt) => {
    const { value, name } = evt.target;
    dispatch(
      setFormValue({ value, fieldName: name, formName: "resetPasswordForm" })
    );
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword(password, token, () => navigate("/login")));
  };

  React.useEffect(() => {
    if (!localStorage.getItem("forgotPassword")) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form name="resetPassword" className={styles.form} onSubmit={onSubmit}>
        {request ? (
          <Loader />
        ) : (
          <>
            <PasswordInput
              value={password}
              onChange={onChange}
              name={"password"}
              placeholder={"Введите новый пароль"}
            />
            <Input
              value={token}
              onChange={onChange}
              name={"token"}
              placeholder={"Введите код из письма"}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={!password || !token}
            >
              Сохранить
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

export default ResetPasswordPage;
