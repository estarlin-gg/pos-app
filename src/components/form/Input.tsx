import React, { forwardRef } from "react";

interface InputProps {
  defaultValue?: string | number;
  classes?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ classes, placeholder, type, name, id, onChange,defaultValue }, ref) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`input ${classes}`}
        onChange={onChange}
        ref={ref}
        defaultValue={defaultValue}
      />
    );
  }
);
