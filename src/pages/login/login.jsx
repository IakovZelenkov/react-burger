import React from "react";
import styles from "./login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/slices/auth/actions";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = React.useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth.login);

  const onChange = (evt) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser({ email: form.email, password: form.password }));
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form name="login" className={styles.form} onSubmit={onSubmit}>
        {loading === "pending" ? (
          <Loader />
        ) : (
          <>
            <EmailInput
              value={form.email}
              onChange={onChange}
              name={"email"}
              placeholder="E-mail"
            />
            <PasswordInput
              value={form.password}
              onChange={onChange}
              name={"password"}
            />
            {error ? (
              <p className="input__error text_type_main-default">{error}</p>
            ) : (
              ""
            )}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={!form.email || !form.password}
            >
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
