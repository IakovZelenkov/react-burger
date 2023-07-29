import React from "react";
import styles from "./forgot-password.module.scss";
import Cookies from "js-cookie";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { forgotPassword } from "../../services/slices/auth/actions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setValue] = React.useState({ email: "" });
  const { status, error } = useAppSelector((state) => state.auth);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      forgotPassword({
        email: form.email,
        redirect: () => navigate("/reset-password"),
      })
    );
  };

  if (Cookies.get("forgotPassword") === "success") {
    <Navigate replace to="/reset-password" />;
  }

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h2>
      <form name="forgotPassword" className={styles.form} onSubmit={onSubmit}>
        {status === "pending" ? (
          <Loader />
        ) : (
          <>
            <EmailInput
              value={form.email}
              onChange={onChange}
              name={"email"}
              placeholder="Укажите e-mail"
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
              disabled={!form.email}
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
