import React from "react";
import "./index.scss"; 

const Button = ({
  variant = "primary", 
  size = "medium", 
  isLoading = false, 
  children,
  ...props
}) => {

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };


  const sizeClasses = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large",
  };


  const buttonClassNames = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${
    isLoading ? "btn-loading" : ""
  }`;

  return (
    <button className={buttonClassNames} disabled={isLoading || props.disabled} {...props}>
      {isLoading && (
        <svg
          className="btn-spinner"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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

export default Button;
