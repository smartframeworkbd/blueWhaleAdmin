"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddFaqMutation } from "@/redux/Feature/Admin/faq/faqApi";
import ZSelect from "@/components/Form/ZSelect";
import { LanguageContext } from "@/context/LanguageContext"; // Import Language Context

const AddFaq = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const [addFaq, { isLoading: FIsLoading, isError: FIsError, error: FError, isSuccess: FIsSuccess, data }] = useAddFaqMutation();

  // Translations for the component
  const translations = {
    en: {
      questionEnglish: "Question (English)",
      questionBangla: "Question (Bangla)",
      answerEnglish: "Answer (English)",
      answerBangla: "Answer (Bangla)",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      placeholderQuestionEnglish: "Enter your question in English",
      placeholderQuestionBangla: "আপনার প্রশ্নটি বাংলায় লিখুন",
      placeholderAnswerEnglish: "Enter your answer in English",
      placeholderAnswerBangla: "আপনার উত্তরের বাংলায় লিখুন",
      selectStatus: "Select status",
      buttonName: "Create",
    },
    bn: {
      questionEnglish: "প্রশ্ন (ইংরেজি)",
      questionBangla: "প্রশ্ন (বাংলা)",
      answerEnglish: "উত্তর (ইংরেজি)",
      answerBangla: "উত্তর (বাংলা)",
      status: "অবস্থা",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      placeholderQuestionEnglish: "আপনার প্রশ্নটি ইংরেজিতে লিখুন",
      placeholderQuestionBangla: "আপনার প্রশ্নটি বাংলায় লিখুন",
      placeholderAnswerEnglish: "আপনার উত্তরের ইংরেজিতে লিখুন",
      placeholderAnswerBangla: "আপনার উত্তরের বাংলায় লিখুন",
      selectStatus: "অবস্থা নির্বাচন করুন",
      buttonName: "তৈরি করুন",
    },
  };

  const handleSubmit = (data) => {
    addFaq(data);
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
        buttonName={translations[currentLanguage].buttonName}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="questionEnglish"
            type="text"
            label={translations[currentLanguage].questionEnglish}
            placeholder={translations[currentLanguage].placeholderQuestionEnglish}
          />
          <ZInputTwo
            name="questionBangla"
            type="text"
            label={translations[currentLanguage].questionBangla}
            placeholder={translations[currentLanguage].placeholderQuestionBangla}
          />
          <ZInputTextArea
            name="answerEnglish"
            label={translations[currentLanguage].answerEnglish}
            placeholder={translations[currentLanguage].placeholderAnswerEnglish}
          />
          <ZInputTextArea
            name="answerBangla"
            label={translations[currentLanguage].answerBangla}
            placeholder={translations[currentLanguage].placeholderAnswerBangla}
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

export default AddFaq;
