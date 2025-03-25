"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdatebreakingnewsMutation } from "@/redux/Feature/Admin/breakingnews/breakingnews";
import ZSelect from "@/components/Form/ZSelect";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const EditBreakingNews = ({ selectedBN }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      breakingNewsEnglish: "Breaking News (English)",
      breakingNewsBangla: "Breaking News (Bangla)",
      status: "Status",
      updateButton: "Update",
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
      updateButton: "আপডেট করুন",
      enterNewsEnglish: "ইংরেজিতে ব্রেকিং নিউজ লিখুন",
      enterNewsBangla: "বাংলায় ব্রেকিং নিউজ লিখুন",
      selectStatus: "অবস্থা নির্বাচন করুন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
    },
  };

  const dispatch = useAppDispatch();
  const [editBreakingNews, { isLoading: editLoading, error: editError, isError: editIsError, isSuccess: editSuccess, data }] = useUpdatebreakingnewsMutation();

  const handleSubmit = (data) => {
    editBreakingNews({ id: selectedBN?.id, data });
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
        buttonName={translations[currentLanguage].updateButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTextArea
            name="newsEnglish"
            label={translations[currentLanguage].breakingNewsEnglish}
            value={selectedBN?.newsEnglish || ""}
            placeholder={translations[currentLanguage].enterNewsEnglish}
          />
          <ZInputTextArea
            name="newsBangla"
            label={translations[currentLanguage].breakingNewsBangla}
            value={selectedBN?.newsBangla || ""}
            placeholder={translations[currentLanguage].enterNewsBangla}
          />
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            value={selectedBN?.status}
            placeholder={translations[currentLanguage].selectStatus}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditBreakingNews;
