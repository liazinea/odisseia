import React from "react";
import classNames from "classnames"; // Usando 'classnames' para condicionalmente adicionar classes
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
      aria-busy={isLoading} // Para melhorar a acessibilidade
      {...props}
    >
      {isLoading && (
        <svg
          className="btn-spinner"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true" // Melhorando a acessibilidade
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
      )}
      {!isLoading && children}
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
