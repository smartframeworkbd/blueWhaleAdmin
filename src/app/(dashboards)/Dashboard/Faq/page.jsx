"use client";
import React, { useContext, useState } from "react";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddFaq from "./AddFaq/page";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditFaq from "./EditFaq/page";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteFaqMutation, useGetFaqsQuery } from "@/redux/Feature/Admin/faq/faqApi";
import { LanguageContext } from "@/context/LanguageContext";

const Faq = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };



  const dispatch = useAppDispatch();
  const [selectedFaq, setSelectedFaq] = useState({});
  const { data, isLoading: faqIsLoading } = useGetFaqsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [deleteFaq, { isLoading: dFIsLoading, isError, isSuccess, data: dFData, error: dFError }] = useDeleteFaqMutation();

  const faqData = data?.data?.map((faq, index) => ({
    key: index,
    id: faq.Id,
    questionEnglish: faq.questionEnglish,
    questionBangla: faq.questionBangla,
    answerEnglish: faq.answerEnglish,
    answerBangla: faq.answerBangla,
    status: faq.status,
  }));

  const handleEditFaq = (faqData) => {
    setSelectedFaq(faqData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (faqData) => {
    setSelectedFaq(faqData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteFaq = () => {
    deleteFaq(selectedFaq?.id);
  };


    // Translations for the FAQ text
    const translations = {
      en: {
        questionEnglish: "Question (English)",
        questionBangla: "Question (Bangla)",
        answerEnglish: "Answer (English)",
        answerBangla: "Answer (Bangla)",
        status: "Status",
        action: "Action",
        edit: "Edit",
        delete: "Delete",
        addFaq: "Add FAQ",
        editFaq: "Edit FAQ",
        deleteFaq: "Delete FAQ",
        addNewFaq: "Add New FAQ",
        deleteDescription: "The corresponding FAQ will be deleted",
      },
      bn: {
        questionEnglish: "প্রশ্ন (ইংরেজি)",
        questionBangla: "প্রশ্ন (বাংলা)",
        answerEnglish: "উত্তর (ইংরেজি)",
        answerBangla: "উত্তর (বাংলা)",
        status: "অবস্থা",
        action: "একশন",
        edit: "সম্পাদনা",
        delete: "মুছুন",
        addFaq: "প্রশ্নোত্তর যোগ করুন",
        editFaq: "প্রশ্নোত্তর সম্পাদনা করুন",
        deleteFaq: "FAQ মুছুন",
        addNewFaq: "নতুন FAQ যোগ করুন",
        deleteDescription: "সংশ্লিষ্ট FAQ মুছে ফেলা হবে",
      },
    };

  const columns = [
    {
      title: translations[currentLanguage].questionEnglish,
      dataIndex: "questionEnglish",
      key: "questionEnglish",
    },
    {
      title: translations[currentLanguage].questionBangla,
      dataIndex: "questionBangla",
      key: "questionBangla",
    },
    {
      title: translations[currentLanguage].answerEnglish,
      dataIndex: "answerEnglish",
      key: "answerEnglish",
    },
    {
      title: translations[currentLanguage].answerBangla,
      dataIndex: "answerBangla",
      key: "answerBangla",
    },
    {
      title: translations[currentLanguage].status,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status
            ? currentLanguage === "en"
              ? "Active"
              : "সক্রিয়"
            : currentLanguage === "en"
            ? "Inactive"
            : "নিষ্ক্রিয়"}
        </Tag>
      ),
    },
    {
      title: translations[currentLanguage].action,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditFaq(record)}>
            <Tooltip title={translations[currentLanguage].edit} placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title={translations[currentLanguage].delete} placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <p className="lg:text-2xl text-center font-bold mb-10">
          {currentLanguage === "en"
            ? "Manage your FAQ's easily from here"
            : "এখান থেকে সহজেই আপনার প্রশ্নোত্তর পরিচালনা করুন"}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={translations[currentLanguage].addFaq} />
      </div>

      <DashboardTable columns={columns} data={faqData} loading={faqIsLoading} />

      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addNewFaq}>
        <AddFaq />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].editFaq}>
        <EditFaq selectedFaq={selectedFaq} />
      </EditModal>

      {/* Delete FAQ Modal */}
      <DeleteModal
        data={dFData}
        error={dFError}
        isLoading={dFIsLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteFaq}
        onDelete={handleDeleteFaq}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default Faq;
