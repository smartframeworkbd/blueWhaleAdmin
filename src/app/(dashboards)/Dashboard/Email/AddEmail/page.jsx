"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddEmailMutation } from "@/redux/Feature/Admin/email/emailApi"; // Changed to emailApi
import ZSelect from "@/components/Form/ZSelect";
import { LanguageContext } from "@/context/LanguageContext"; // Language context import

const AddEmail = () => {
  const dispatch = useAppDispatch();
  const [addEmail, { isLoading, isError, error, isSuccess, data }] = useAddEmailMutation(); // Changed to useAddEmailMutation
  
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" }; // Use current language

  // Translations for the AddEmail component
  const translations = {
    en: {
      name: "Name",
      email: "Email",
      createButton: "Create",
      placeholderName: "Enter your name",
      placeholderEmail: "Enter your email address",
    },
    bn: {
      name: "নাম",
      email: "ইমেইল",
      createButton: "তৈরি করুন",
      placeholderName: "আপনার নাম লিখুন",
      placeholderEmail: "আপনার ইমেইল ঠিকানা লিখুন",
    },
  };

  const handleSubmit = (data) => {
    addEmail(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName={translations[currentLanguage].createButton} // Dynamic button name
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="name"
            type="text"
            label={translations[currentLanguage].name} // Dynamic label
            defaultKey=""
            placeholder={translations[currentLanguage].placeholderName} // Dynamic placeholder
          />
          <ZInputTwo
            name="email"
            type="email"
            label={translations[currentLanguage].email} // Dynamic label
            defaultKey=""
            placeholder={translations[currentLanguage].placeholderEmail} // Dynamic placeholder
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddEmail;
