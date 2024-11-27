import React from "react";
import classNames from "classnames";
import { FaSpinner } from "react-icons/fa";
import "./index.scss";

const Button = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  disabled = false,
  ...props
}) => {
  const buttonClassNames = classNames("btn", {
    [`btn-${variant}`]: true,
    [`btn-${size}`]: true,
    "btn-loading": isLoading,
    "btn-disabled": disabled || isLoading,
  });

  return (
    <button
      className={buttonClassNames}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <FaSpinner className="btn-spinner" aria-hidden="true" />
      ) : (
        <span className="btn-text">{children}</span>
      )}
    </button>
  );
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  isLoading: false,
  disabled: false,
};

export default Button;
