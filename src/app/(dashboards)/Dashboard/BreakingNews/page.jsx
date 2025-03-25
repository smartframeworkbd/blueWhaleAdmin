"use client";
import React, { useEffect, useState, useContext } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeletebreakingnewsMutation, useGetbreakingnewsQuery } from "@/redux/Feature/Admin/breakingnews/breakingnews";
import AddBreakingNews from "./AddBreakingNews/page";
import EditBreakingNews from "./EditBreakingNews/page";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const BreakingNews = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const { data, error, isLoading: bIsLoading } = useGetbreakingnewsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedBN, setSelectedBN] = useState({});
  const [deleteFaq, { isLoading: dFIsLoading, isError, isSuccess, data: dFData, error: dError }] = useDeletebreakingnewsMutation();

  const bData = data?.data?.map((news, index) => ({
    key: index,
    id: news.id,
    email: news.email,
    phoneNumber: news.phoneNumber,
    newsBangla: news.newsBangla,
    newsEnglish: news.newsEnglish,
    status: news.status,
  }));

  const handleEditFaq = (bData) => {
    setSelectedBN(bData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (bData) => {
    setSelectedBN(bData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteFaq = () => {
    deleteFaq(selectedBN?.id);
  };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      addBreakingNews: "Add Breaking News",
      newsBangla: "News in Bangla",
      newsEnglish: "News in English",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      edit: "Edit",
      delete: "Delete",
      deleteBreakingNews: "Delete Breaking News",
      deleteDescription: "Under the Breaking News corresponding data will be removed",
    },
    bn: {
      addBreakingNews: "নিউজ যোগ করুন",
      newsBangla: "বাংলায় নিউজ",
      newsEnglish: "ইংরেজিতে নিউজ",
      status: "স্ট্যাটাস",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      edit: "এডিট",
      delete: "মুছুন",
      deleteBreakingNews: "ব্রেকিং নিউজ মুছুন",
      deleteDescription: "ব্রেকিং নিউজ সম্পর্কিত তথ্য মুছে ফেলা হবে",
    },
  };

  const columns = [
    {
      title: translations[currentLanguage].newsBangla,
      dataIndex: "newsBangla",
      key: "newsBangla",
    },
    {
      title: translations[currentLanguage].newsEnglish,
      dataIndex: "newsEnglish",
      key: "newsEnglish",
    },
    {
      title: translations[currentLanguage].status,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? translations[currentLanguage].active : translations[currentLanguage].inactive}
        </Tag>
      ),
    },
    {
      title: "Action",
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
            ? "Manage your breaking news easily from here"
            : "এখান থেকে সহজেই আপনার ব্রেকিং নিউজ পরিচালনা করুন"}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={translations[currentLanguage].addBreakingNews} />
      </div>

      <DashboardTable columns={columns} data={bData} loading={bIsLoading} />
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addBreakingNews}>
        <AddBreakingNews />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].addBreakingNews}>
        <EditBreakingNews selectedBN={selectedBN} />
      </EditModal>

      {/* Delete FAQ Modal */}
      <DeleteModal
        data={dFData}
        error={dError}
        isLoading={dFIsLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteBreakingNews}
        onDelete={handleDeleteFaq}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default BreakingNews;
