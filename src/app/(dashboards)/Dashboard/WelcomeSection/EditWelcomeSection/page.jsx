"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateWelcomeSectionMutation } from "@/redux/Feature/Admin/welcomesection/welcomesectionApi";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const EditWelcomeSection = ({ selectedWS }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      welcomeMessageEnglish: "Welcome Message (English)",
      welcomeMessageBangla: "Welcome Message (Bangla)",
      detailsLink: "Details Link",
      status: "Status",
      updateButton: "Update",
      enterMessageEnglish: "Enter welcome message in English",
      enterMessageBangla: "বাংলায় স্বাগতম বার্তা লিখুন",
      enterDetailsLink: "Enter details link",
      selectStatus: "Select status",
      active: "Active",
      inactive: "Inactive",
    },
    bn: {
      welcomeMessageEnglish: "স্বাগতম বার্তা (ইংরেজি)",
      welcomeMessageBangla: "স্বাগতম বার্তা (বাংলা)",
      detailsLink: "বিস্তারিত লিঙ্ক",
      status: "অবস্থা",
      updateButton: "আপডেট করুন",
      enterMessageEnglish: "ইংরেজিতে স্বাগতম বার্তা লিখুন",
      enterMessageBangla: "বাংলায় স্বাগতম বার্তা লিখুন",
      enterDetailsLink: "বিস্তারিত লিঙ্ক লিখুন",
      selectStatus: "অবস্থা নির্বাচন করুন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
    },
  };

  const dispatch = useAppDispatch();
  const [editWelcomeSection, { isLoading, isError, error, isSuccess, data }] = useUpdateWelcomeSectionMutation();

  const handleSubmit = (data) => {
    editWelcomeSection({ id: selectedWS?.id, data });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="edit"
        data={data}
        buttonName={translations[currentLanguage].updateButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTextArea
            name="detailsEnglish"
            label={translations[currentLanguage].welcomeMessageEnglish}
            value={selectedWS?.detailsEnglish || ""}
            placeholder={translations[currentLanguage].enterMessageEnglish}
          />
          <ZInputTextArea
            name="detailsBangla"
            label={translations[currentLanguage].welcomeMessageBangla}
            value={selectedWS?.detailsBangla || ""}
            placeholder={translations[currentLanguage].enterMessageBangla}
          />
          <ZInputTwo
            name="detailsLink"
            type="url"
            label={translations[currentLanguage].detailsLink}
            value={selectedWS?.detailsLink || ""}
            placeholder={translations[currentLanguage].enterDetailsLink}
          />
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            value={selectedWS?.status}
            placeholder={translations[currentLanguage].selectStatus}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditWelcomeSection;
