import React from "react";
import styles from "./profile-home.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../services/actions/authActions";

const ProfileHome = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [disabled, setDisabled] = React.useState(true);
  const [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const onChange = (evt) => {
    const { value, name } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onIconClick = () => {
    setDisabled(!disabled);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      updateUser(formValues.name, formValues.email, formValues.password)
    );
    setDisabled(true);
    resetFormValues();
  };

  const resetFormValues = () => {
    setFormValues({ name: user.name, email: user.email, password: "" });
    setDisabled(true);
  };

  React.useEffect(() => {
    setFormValues({ ...formValues, name: user.name, email: user.email });
  }, [user.name, user.email]);

  const checkForms = () => {
    return !formValues.name || !formValues.email || !formValues.password;
  };

  const showButtons = () => {
    return (
      user.name !== formValues.name ||
      user.email !== formValues.email ||
      formValues.password
    );
  };

  return (
    <div className={styles.container}>
      <form name="profile" className={styles.form} onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          value={formValues.name}
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
          value={formValues.email}
          onChange={onChange}
          name={"email"}
          placeholder="E-mail"
          isIcon={true}
        />
        <PasswordInput
          value={formValues.password}
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
