"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateFaqMutation } from "@/redux/Feature/Admin/faq/faqApi";
import { LanguageContext } from "@/context/LanguageContext"; // Import Language Context

const EditFaq = ({ selectedFaq }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const [updateFaq, { isLoading: FIsLoading, isError: FIsError, error: FError, isSuccess: FIsSuccess, data }] =
    useUpdateFaqMutation();

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
      buttonName: "Update",
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
      buttonName: "আপডেট করুন",
    },
  };

  const handleSubmit = (formData) => {
    updateFaq({ id: selectedFaq?.id, ...formData });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
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
        formType="edit"
        data={data}
        buttonName={translations[currentLanguage].buttonName}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="questionEnglish"
            type="text"
            label={translations[currentLanguage].questionEnglish}
            value={selectedFaq.questionEnglish}
            placeholder={translations[currentLanguage].placeholderQuestionEnglish}
          />
          <ZInputTwo
            name="questionBangla"
            type="text"
            label={translations[currentLanguage].questionBangla}
            value={selectedFaq.questionBangla}
            placeholder={translations[currentLanguage].placeholderQuestionBangla}
          />
          <ZInputTextArea
            name="answerEnglish"
            label={translations[currentLanguage].answerEnglish}
            value={selectedFaq.answerEnglish}
            placeholder={translations[currentLanguage].placeholderAnswerEnglish}
          />
          <ZInputTextArea
            name="answerBangla"
            label={translations[currentLanguage].answerBangla}
            value={selectedFaq.answerBangla}
            placeholder={translations[currentLanguage].placeholderAnswerBangla}
          />

          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            value={selectedFaq.status}
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

export default EditFaq;
