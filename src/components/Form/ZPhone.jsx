/* eslint-disable react-hooks/exhaustive-deps */
import { LanguageContext } from "@/context/LanguageContext";
import { Form, Input } from "antd";
import { useContext, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/;

const ZPhone = ({ name, label, value, placeholder }) => {
  const { control, setValue } = useFormContext();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Validation messages in multiple languages
  const validationMessages = {
    required: {
      en: "This Phone number field is required",
      bn: " ফোন নম্বর প্রদান করুন",
    },
    pattern: {
      en: "Invalid phone number format",
      bn: "ফোন নম্বরের ফর্ম্যাট সঠিক নয়",
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
        required: validationMessages.required[currentLanguage],
        pattern: {
          value: phoneRegex,
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

export default ZPhone;
