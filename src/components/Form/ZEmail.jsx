/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { LanguageContext } from "@/context/LanguageContext";
import { Form, Input } from "antd";
import { useContext, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ZEmail = ({ name, label, value, placeholder ,required}) => {
  const { control, setValue } = useFormContext();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };



  const validationMessages = {
    required: {
      en: "This email field is required",
      bn: " ইমেইল প্রদান করুন",
    },
    pattern: {
      en: "Invalid email format",
      bn: "ইমেইল ফর্ম্যাট সঠিক নয়",
    },
  };

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
      ...( required && { required: validationMessages.required[currentLanguage]} ),
        pattern: {
          value: emailRegex,
          message: validationMessages.pattern[currentLanguage],
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input {...field} placeholder={placeholder} />
        </Form.Item>
      )}
    />
  );
};

export default ZEmail;
