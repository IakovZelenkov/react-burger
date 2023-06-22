import React from "react";
import styles from "./login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../services/slices/authSlice";
import { loginUser } from "../../services/actions/authActions";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {
  const { email, password, request } = useSelector(
    (state) => state.auth.loginForm
  );

  const dispatch = useDispatch();

  const onChange = (evt) => {
    const { value, name } = evt.target;
    dispatch(setFormValue({ value, fieldName: name, formName: "loginForm" }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form name="login" className={styles.form} onSubmit={onSubmit}>
        {request ? (
          <Loader />
        ) : (
          <>
            <EmailInput
              value={email}
              onChange={onChange}
              name={"email"}
              placeholder="E-mail"
            />
            <PasswordInput
              value={password}
              onChange={onChange}
              name={"password"}
            />
            <Button htmlType="submit" type="primary" size="medium">
              Войти
            </Button>
          </>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
