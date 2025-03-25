"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddbreakingnewsMutation } from "@/redux/Feature/Admin/breakingnews/breakingnews";
import ZSelect from "@/components/Form/ZSelect";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const AddBreakingNews = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      breakingNewsEnglish: "Breaking News (English)",
      breakingNewsBangla: "Breaking News (Bangla)",
      status: "Status",
      createButton: "Create",
      enterNewsEnglish: "Enter breaking news in English",
      enterNewsBangla: "Enter breaking news in Bangla",
      selectStatus: "Select status",
      active: "Active",
      inactive: "Inactive",
    },
    bn: {
      breakingNewsEnglish: "ব্রেকিং নিউজ (ইংরেজি)",
      breakingNewsBangla: "ব্রেকিং নিউজ (বাংলা)",
      status: "অবস্থা",
      createButton: "তৈরি করুন",
      enterNewsEnglish: "ইংরেজিতে ব্রেকিং নিউজ লিখুন",
      enterNewsBangla: "বাংলায় ব্রেকিং নিউজ লিখুন",
      selectStatus: "অবস্থা নির্বাচন করুন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
    },
  };

  const dispatch = useAppDispatch();
  const [addBreakingNews, { isLoading: FIsLoading, isError: FIsError, error: FError, isSuccess: FIsSuccess, data }] = useAddbreakingnewsMutation();

  const handleSubmit = (data) => {
    addBreakingNews(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={FIsLoading}
        isSuccess={FIsSuccess}
        isError={FIsError}
        error={FError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName={translations[currentLanguage].createButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTextArea
            name="newsEnglish"
            label={translations[currentLanguage].breakingNewsEnglish}
            placeholder={translations[currentLanguage].enterNewsEnglish}
          />
          <ZInputTextArea
            name="newsBangla"
            label={translations[currentLanguage].breakingNewsBangla}
            placeholder={translations[currentLanguage].enterNewsBangla}
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

export default AddBreakingNews;
