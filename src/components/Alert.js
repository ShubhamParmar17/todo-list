import React, { useEffect } from "react";
import "../index.css";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    let timeout = setTimeout(() => {
      removeAlert();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
