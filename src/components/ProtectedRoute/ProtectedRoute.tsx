import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./ProtectedRoute.module.scss";
import { useAppSelector } from "../../services/hooks/hooks";

interface ProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({
  onlyUnAuth = false,
  component: Component,
}) => {
  const { user, isAuthChecked } = useAppSelector((store) => store.auth);
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

  return Component;
};

export const OnlyAuth: React.FC<ProtectedProps> = Protected;
export const OnlyUnAuth: React.FC<ProtectedProps> = ({ component }) => (
  <Protected onlyUnAuth component={component} />
);
