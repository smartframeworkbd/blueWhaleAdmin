/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Upload, Button } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

const ZMultipleImage = ({ name, label, onImageUpload }) => {
  const { control, resetField } = useFormContext();

  const onChange = (fileList) => {
    const images = fileList.map((item) => item.originFileObj);
    if (onImageUpload) {
      onImageUpload(images);
    }
  };

  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  useEffect(() => {
    if (resetField) {
      resetField(name, { defaultValue: [] });
    }
  }, [resetField, name]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            {...field}
            listType="picture"
            multiple
            beforeUpload={() => false} // Prevent auto upload
            onChange={({ fileList }) => {
              field.onChange(fileList);
              onChange(fileList); // Trigger the image upload handler
            }}
            onDrop={onDrop}
            fileList={field.value || []}
          >          
              <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZMultipleImage;
