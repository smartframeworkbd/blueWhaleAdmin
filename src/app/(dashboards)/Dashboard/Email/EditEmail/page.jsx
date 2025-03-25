"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateEmailMutation } from "@/redux/Feature/Admin/email/emailApi"; // Assuming this API exists
import { LanguageContext } from "@/context/LanguageContext"; // Language context import

const EditEmail = ({ selectedEmail }) => {
  console.log(selectedEmail);
  const dispatch = useAppDispatch();
  const [
    editEmail,
    {
      isLoading: editLoading,
      error: editError,
      isError: editIsError,
      isSuccess: editSuccess,
      data,
    },
  ] = useUpdateEmailMutation();

  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the EditEmail component
  const translations = {
    en: {
      name: "Name",
      email: "Email",
      updateButton: "Update",
      placeholderName: "Enter the name",
      placeholderEmail: "Enter the email address",
    },
    bn: {
      name: "নাম",
      email: "ইমেইল",
      updateButton: "আপডেট করুন",
      placeholderName: "নাম লিখুন",
      placeholderEmail: "ইমেইল ঠিকানা লিখুন",
    },
  };

  const handleSubmit = (data) => {
    // Assuming selectedEmail?.id will give the correct email id to update
    editEmail({ data, id: selectedEmail?.id });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
      <ZFormTwo
        isLoading={editLoading}
        isSuccess={editSuccess}
        isError={editIsError}
        error={editError}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="edit"
        data={data}
        buttonName={translations[currentLanguage].updateButton} // Dynamic button name
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="name"
            type="text"
            label={translations[currentLanguage].name} // Dynamic label
            value={selectedEmail?.name || ""}
            placeholder={translations[currentLanguage].placeholderName} // Dynamic placeholder
          />
          <ZInputTwo
            name="email"
            type="email"
            label={translations[currentLanguage].email} // Dynamic label
            value={selectedEmail?.email || ""}
            placeholder={translations[currentLanguage].placeholderEmail} // Dynamic placeholder
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditEmail;
