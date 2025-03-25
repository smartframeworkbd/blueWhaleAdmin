"use client";

import React from 'react';
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  label,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

 
  const errorMessage = errors[name]?.message;

  return (
    <div>
      {required && (
        <span style={{ color: "red" }}>*</span>
      )}
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value || field.value}
            />
          ) : (
            <Input
            id={id}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value || field.value}
            />
          )
        }
      />
      {errorMessage && (
        <small style={{ color: "red" }}>{errorMessage}</small>
      )}
    </div>
  );
};

export default FormInput;
