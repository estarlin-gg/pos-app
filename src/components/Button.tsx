import React, { ReactNode } from "react";

interface ButtonProps {
  classes?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  text?: string;
  disabled?: boolean;
}
export const Button = ({
  classes,
  children,
  onClick,
  text,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${classes}  capitalize`}
      onClick={onClick}
    >
      {text} {children}
    </button>
  );
};
