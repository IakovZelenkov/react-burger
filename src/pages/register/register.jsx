import React from "react";
import styles from "./register.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/slices/auth/actions";
import Loader from "../../components/Loader/Loader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth.register);

  const onChange = (evt) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );
  };
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form name="login" className={styles.form} onSubmit={onSubmit}>
        {loading === "pending" ? (
          <Loader />
        ) : (
          <>
            <Input
              value={form.name}
              onChange={onChange}
              name={"name"}
              placeholder={"Имя"}
            />
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
              disabled={!form.name || !form.email || !form.password}
            >
              Зарегистрироваться
            </Button>
          </>
        )}
      </form>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
