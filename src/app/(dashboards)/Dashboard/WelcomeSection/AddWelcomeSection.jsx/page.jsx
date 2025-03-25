"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddWelcomeSectionMutation } from "@/redux/Feature/Admin/welcomesection/welcomesectionApi";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const AddWelcomeSection = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      welcomeMessageEnglish: "Welcome Message (English)",
      welcomeMessageBangla: "Welcome Message (Bangla)",
      detailsLink: "Details Link",
      buttonNameEnglish: "Button English",
      buttonNameBangla: "Button Bangla",
      status: "Status",
      createButton: "Create",
      enterWelcomeMessageEnglish: "Enter welcome message in English",
      enterWelcomeMessageBangla: "Enter welcome message in Bangla",
      enterDetailsLink: "Enter details link",
      enterButtonEnglish: "Enter Button name in English",
      enterButtonBangla: "Enter Button name in Bangla",
      selectStatus: "Select status",
      active: "Active",
      inactive: "Inactive",
    },
    bn: {
      welcomeMessageEnglish: "স্বাগতম বার্তা (ইংরেজি)",
      welcomeMessageBangla: "স্বাগতম বার্তা (বাংলা)",
      detailsLink: "বিস্তারিত লিঙ্ক",
      buttonNameEnglish: "বাটন ইংরেজি",
      buttonNameBangla: "বাটন বাংলা",
      status: "অবস্থা",
      createButton: "তৈরি করুন",
      enterWelcomeMessageEnglish: "ইংরেজিতে স্বাগতম বার্তা লিখুন",
      enterWelcomeMessageBangla: "বাংলায় স্বাগতম বার্তা লিখুন",
      enterDetailsLink: "বিস্তারিত লিঙ্ক লিখুন",
      enterButtonEnglish: "ইংরেজিতে বাটন নাম লিখুন",
      enterButtonBangla: "বাংলায় বাটন নাম লিখুন",
      selectStatus: "অবস্থা নির্বাচন করুন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
    },
  };

  const dispatch = useAppDispatch();
  const [addWelcomeSection, { isLoading, isError, error, isSuccess, data }] = useAddWelcomeSectionMutation();

  const handleSubmit = (data) => {
    addWelcomeSection(data);
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
        buttonName={translations[currentLanguage].createButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTextArea
            name="detailsEnglish"
            label={translations[currentLanguage].welcomeMessageEnglish}
            placeholder={translations[currentLanguage].enterWelcomeMessageEnglish}
          />
          <ZInputTextArea
            name="detailsBangla"
            label={translations[currentLanguage].welcomeMessageBangla}
            placeholder={translations[currentLanguage].enterWelcomeMessageBangla}
          />
          <ZInputTwo
            name="detailsLink"
            type="url"
            label={translations[currentLanguage].detailsLink}
            placeholder={translations[currentLanguage].enterDetailsLink}
          />
          <ZInputTwo
            name="buttonNameEnglish"
            type="text"
            label={translations[currentLanguage].buttonNameEnglish}
            placeholder={translations[currentLanguage].enterButtonEnglish}
          />
          <ZInputTwo
            name="buttonNameBangla"
            type="text"
            label={translations[currentLanguage].buttonNameBangla}
            placeholder={translations[currentLanguage].enterButtonBangla}
          />
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            placeholder={translations[currentLanguage].selectStatus}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddWelcomeSection;
