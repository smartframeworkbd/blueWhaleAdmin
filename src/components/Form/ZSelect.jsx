"use client";
import { LanguageContext } from "@/context/LanguageContext";
/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Select } from "antd";
import { useContext, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ZSelect = ({
  name,
  label,
  mode,
  options,
  isLoading,
  value,
  placeholder,
  required,
  onSelectChange,
}) => {
  const { control, setValue, resetField } = useFormContext();
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);


  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  const handleSelectChange = (value) => {
    if (onSelectChange) {
      onSelectChange(value); // Call custom change handler if provided
    }
  };

  const onSearch = (_value) => {
    // Custom onSearch logic if needed
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
          <Select
            {...field}
            virtual={true}
            allowClear={true}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={(value) => {
              field.onChange(value);
              handleSelectChange(value);
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options || []}
            mode={mode || undefined}
            loading={isLoading || false}
            disabled={isLoading || false}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZSelect;
