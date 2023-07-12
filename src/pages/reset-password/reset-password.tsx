import React, { useState, useEffect } from "react";
import styles from "./reset-password.module.scss";
import Cookies from "js-cookie";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { resetPassword } from "../../services/slices/auth/actions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ password: "", token: "" });
  const { status, error } = useAppSelector((state) => state.auth);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      resetPassword({
        password: form.password,
        token: form.token,
        redirect: () => navigate("/login"),
      })
    );
  };

  useEffect(() => {
    if (!Cookies.get("forgotPassword")) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h2>
      <form name="resetPassword" className={styles.form} onSubmit={onSubmit}>
        {status === "pending" ? (
          <Loader />
        ) : (
          <>
            <PasswordInput
              value={form.password}
              onChange={onChange}
              name={"password"}
              placeholder={"Введите новый пароль"}
            />
            <Input
              value={form.token}
              onChange={onChange}
              name={"token"}
              placeholder={"Введите код из письма"}
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
              disabled={!form.password || !form.token}
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
