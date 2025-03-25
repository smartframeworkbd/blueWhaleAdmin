"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { useAppSelector } from "@/redux/Hook/Hook";
import { Form, Input } from "antd";
import { useContext, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ZInputTwo = ({
  name,
  type,
  label,
  defaultKey,
  value,
  placeholder,
  required,
  reset,
  onSelectChange, // Add this prop
}) => {
  const { control, setValue, resetField } = useFormContext();
  const { isEditModalOpen } = useAppSelector((state) => state.modal);
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);


  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue, name]);

  useEffect(() => {
    if (reset === true) {
      if (!isEditModalOpen) {
        resetField(name);
      }
    }
  }, [reset, isEditModalOpen, resetField, name]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(required && currentLanguage =="en" ? { required: `This ${label} field is required`} : 
            (required && currentLanguage =="bn" && { required: `${label} প্রদান করুন`})),
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            className={defaultKey ? `${defaultKey}` : ``}
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e); // Update React Hook Form's state
              if (onSelectChange) {
                onSelectChange(e.target.value); // Call the onSelectChange handler
              }
            }}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZInputTwo;
