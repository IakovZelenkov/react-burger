import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import styles from "./ProtectedRoute.module.scss";

const Protected = ({ onlyUnAuth = false, component }) => {
  const { user, isAuthChecked } = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth component={component} />
);

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.node.isRequired,
};
