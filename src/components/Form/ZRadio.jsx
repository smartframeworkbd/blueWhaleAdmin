import { useAppSelector } from "@/redux/Hook/Hook";
import { Form, Radio } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ZRadio = ({ name, label, options, defaultValue, onChange }) => {
  const { control } = useFormContext();
  const [value, setValue] = useState(defaultValue || "");
  const { isEditModalOpen } = useAppSelector((state) => state.modal);

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    if (onChange) onChange(selectedValue);
  };

  useEffect(() => {
    if (defaultValue || isEditModalOpen) {
      setValue(defaultValue);
    }
  }, [defaultValue, isEditModalOpen]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Radio.Group
            {...field}
            value={value}
            onChange={(e) => {
              handleRadioChange(e);
              field.onChange(e.target.value);
            }}
             {...(defaultValue ? { value: value } : {})}
          >
            {options.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      )}
    />
  );
};

export default ZRadio;
