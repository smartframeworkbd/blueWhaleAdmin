"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form as AntdForm } from 'antd';

const ZForm = ({ children, submitHandler, defaultValues }) => {
  const formConfig = defaultValues ? { defaultValues } : {};
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <AntdForm onFinish={handleSubmit(onSubmit)}>
        {children}
      </AntdForm>
    </FormProvider>
  );
};

export default ZForm;
