import React from "react";
import styles from "./reset-password.module.scss";
import Cookies from "js-cookie";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { resetPassword } from "../../services/slices/auth/actions";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = React.useState({ password: "", token: "" });
  const { loading, error } = useSelector((state) => state.auth.resetPassword);

  const onChange = (evt) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      resetPassword({
        password: form.password,
        token: form.token,
        redirect: () => navigate("/login"),
      })
    );
  };

  React.useEffect(() => {
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
        {loading === "pending" ? (
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
