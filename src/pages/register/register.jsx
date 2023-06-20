import React from "react";
import styles from "./register.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../services/slices/authSlice";
import { registerUser } from "../../services/actions/authActions";
import Loader from "../../components/Loader/Loader";

const RegisterPage = () => {
  const { name, email, password, submit } = useSelector((state) => ({
    name: state.auth.registerForm.name,
    email: state.auth.registerForm.email,
    password: state.auth.registerForm.password,
    submit: state.auth.registerForm.submit,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (evt) => {
    const { value, name } = evt.target;
    dispatch(
      setFormValue({ value, fieldName: name, formName: "registerForm" })
    );
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerUser(name, email, password, () => navigate("/login")));
  };
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form name="login" className={styles.form} onSubmit={onSubmit}>
        {submit ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Input
              value={name}
              onChange={onChange}
              name={"name"}
              placeholder={"Имя"}
            />
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
