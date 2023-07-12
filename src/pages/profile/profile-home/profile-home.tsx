import React, { useEffect, useRef, useState } from "react";
import styles from "./profile-home.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  checkUserAuth,
  updateUser,
} from "../../../services/slices/auth/actions";
import { useAppSelector, useAppDispatch } from "../../../services/hooks/hooks";

const ProfileHome: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [disabled, setDisabled] = useState(true);
  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onIconClick = () => {
    setDisabled(!disabled);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      updateUser({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );
    setDisabled(true);
    resetFormValues();
  };

  const resetFormValues = () => {
    user && setValue({ name: user.name, email: user.email, password: "" });
    setDisabled(true);
  };

  useEffect(() => {
    user && setValue({ ...form, name: user.name, email: user.email });
  }, [user?.name, user?.email]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const checkForms = () => {
    return !form.name || !form.email || !form.password;
  };

  const showButtons = () => {
    return (
      user &&
      (user.name !== form.name || user.email !== form.email || form.password)
    );
  };

  return (
    <div className={styles.container}>
      <form name="profile" className={styles.form} onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          value={form.name}
          onChange={onChange}
          name={"name"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          disabled={disabled}
          onIconClick={() => {
            onIconClick();
          }}
          onBlur={() => {
            setDisabled(true);
          }}
        />
        <EmailInput
          value={form.email}
          onChange={onChange}
          name={"email"}
          placeholder="E-mail"
          isIcon={true}
        />
        <PasswordInput
          value={form.password}
          onChange={onChange}
          name={"password"}
          icon={"EditIcon"}
          // checked
        />
        {showButtons() ? (
          <div className={styles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={resetFormValues}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={checkForms()}
            >
              Сохранить
            </Button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ProfileHome;
