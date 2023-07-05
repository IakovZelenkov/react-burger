import React, { useEffect } from "react";
import styles from "./profile-home.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  checkUserAuth,
  updateUser,
} from "../../../services/slices/auth/actions";

const ProfileHome = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [disabled, setDisabled] = React.useState(true);
  const [form, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const onChange = (evt) => {
    const { value, name } = evt.target;
    setValue({ ...form, [name]: value });
  };

  const onIconClick = () => {
    setDisabled(!disabled);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const onSubmit = (evt) => {
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
    setValue({ name: user.name, email: user.email, password: "" });
    setDisabled(true);
  };

  useEffect(() => {
    setValue({ ...form, name: user.name, email: user.email });
  }, [user.name, user.email]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const checkForms = () => {
    return !form.name || !form.email || !form.password;
  };

  const showButtons = () => {
    return (
      user.name !== form.name || user.email !== form.email || form.password
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
