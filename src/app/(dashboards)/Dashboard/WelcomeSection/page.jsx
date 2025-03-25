"use client";
import React, { useEffect, useState, useContext } from "react";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import {
  useGetWelcomeSectionQuery,
  useDeleteWelcomeSectionMutation,
} from "@/redux/Feature/Admin/welcomesection/welcomesectionApi";
import { setIsAddModalOpen, setIsEditModalOpen, setIsDeleteModalOpen } from "@/redux/Modal/ModalSlice";
import AddWelcomeSection from "./AddWelcomeSection.jsx/page";
import EditWelcomeSection from "./EditWelcomeSection/page";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const WelcomeSection = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for different elements
  const translations = {
    en: {
      detailsEnglish: "Details English",
      detailsBangla: "Details Bangla",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      action: "Action",
      edit: "Edit",
      delete: "Delete",
      addWelcome: "Add Welcome",
      addNewWelcomeSection: "Add New Welcome Section",
      editWelcomeSection: "Edit Welcome Section",
      deleteWelcomeSection: "Delete Welcome Section",
      deleteDescription: "The selected Welcome Section entry will be permanently removed.",
    },
    bn: {
      detailsEnglish: "বিস্তারিত (ইংরেজি)",
      detailsBangla: "বিস্তারিত (বাংলা)",
      status: "অবস্থা",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      action: "কার্য",
      edit: "এডিট",
      delete: "মুছুন",
      addWelcome: "ওয়েলকাম যোগ করুন",
      addNewWelcomeSection: "নতুন ওয়েলকাম সেকশন যোগ করুন",
      editWelcomeSection: "ওয়েলকাম সেকশন সম্পাদনা করুন",
      deleteWelcomeSection: "ওয়েলকাম সেকশন মুছুন",
      deleteDescription: "নির্বাচিত ওয়েলকাম সেকশন স্থায়ীভাবে মুছে ফেলা হবে।",
    },
  };

  const dispatch = useAppDispatch();
  const [selectedWS, setSelectedWS] = useState({});
  const { data, error, isLoading } = useGetWelcomeSectionQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);

  const [deleteWelcomeSection, { isLoading: dWSLoading, isSuccess, isError, data: dWSData }] = useDeleteWelcomeSectionMutation();

  const welcomeData = data?.data?.map((item, index) => ({
    key: index,
    id: item.Id,
    detailsEnglish: item.detailsEnglish,
    detailsBangla: item.detailsBangla,
    detailsLink: item.detailsLink,
    icon: item.icon,
    status: item.status,
  }));

  const handleEditWS = (record) => {
    setSelectedWS(record);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteWS = (record) => {
    setSelectedWS(record);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteWelcomeSection = () => {
    deleteWelcomeSection(selectedWS?.id);
  };

  const columns = [
    {
      title: translations[currentLanguage].detailsEnglish,
      dataIndex: "detailsEnglish",
      key: "detailsEnglish",
    },
    {
      title: translations[currentLanguage].detailsBangla,
      dataIndex: "detailsBangla",
      key: "detailsBangla",
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
      title: translations[currentLanguage].action,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditWS(record)}>
            <Tooltip title={translations[currentLanguage].edit} placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteWS(record)}>
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
            ? "Manage your welcome section easily from here"
            : "এখান থেকে সহজেই আপনার ওয়েলকাম সেকশন পরিচালনা করুন"}
        </p>
      </div>

      {welcomeData?.length === 0 && (
        <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
          <ButtonWithModal title={translations[currentLanguage].addWelcome} />
        </div>
      )}

      <DashboardTable columns={columns} data={welcomeData} loading={isLoading} />

      <AddModal isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addNewWelcomeSection}>
        <AddWelcomeSection />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].editWelcomeSection}>
        <EditWelcomeSection selectedWS={selectedWS} />
      </EditModal>

      <DeleteModal
        data={dWSData}
        error={isError}
        isLoading={dWSLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteWelcomeSection}
        onDelete={handleDeleteWelcomeSection}
        isDeleteModalOpen={isDeleteModalOpen}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default WelcomeSection;
