"use client";
import React, { useState, useContext } from "react";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsEditModalOpen, setIsDeleteModalOpen } from "@/redux/Modal/ModalSlice";
import DashboardTable from "@/components/Table/DashboardTable";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useGetHeaderQuery, useDeleteHeaderMutation } from "@/redux/Feature/Admin/HeaderApi/HeaderApi";
import AddHeader from "./AddHeader/page";
import EditHeader from "./EditHeader/page";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const Header = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const { data, isLoading, error } = useGetHeaderQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedHeader, setSelectedHeader] = useState({});
  const [deleteHeader, { isLoading: deleteLoading, isError, isSuccess, data: deleteData, error: deleteError }] = useDeleteHeaderMutation();

  const headerData = data?.data?.map((header, index) => ({
    key: index,
    id: header.id,
    navLinks: JSON.parse(header.navLinks),
    status: header.status,
  }));

  const handleEditHeader = (header) => {
    setSelectedHeader(header);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (header) => {
    setSelectedHeader(header);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteHeader = () => {
    deleteHeader(selectedHeader?.id);
  };

  const translations = {
    en: {
      addHeader: "Add Header",
      editHeader: "Edit Header",
      deleteHeader: "Delete Header",
      navigationLinks: "Navigation Links",
      status: "Status",
      action: "Action",
      active: "Active",
      inactive: "Inactive",
      deleteDescription: "This will remove the selected header data.",
    },
    bn: {
      addHeader: "হেডার যোগ করুন",
      editHeader: "হেডার সম্পাদনা করুন",
      deleteHeader: "হেডার মুছুন",
      navigationLinks: "ন্যাভিগেশন লিঙ্কসমূহ",
      status: "অবস্থা",
      action: "একশন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      deleteDescription: "এটি নির্বাচিত হেডারের ডেটা মুছে ফেলবে।",
    },
  };

  const columns = [
    {
      title: translations[currentLanguage].navigationLinks,
      dataIndex: "navLinks",
      key: "navLinks",
      render: (navLinks) => (
        <ul className="space-y-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <strong className="text-blue-600 border border-green-400 border-b-2 border-t-0 border-l-0 border-r-0">
                {link.label}
              </strong>
            </li>
          ))}
        </ul>
      ),
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
          <a onClick={() => handleEditHeader(record)}>
            <Tooltip title={translations[currentLanguage].editHeader} placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title={translations[currentLanguage].deleteHeader} placement="top">
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
          {currentLanguage === "en" ? "Manage your header easily from here" : "এখান থেকে সহজেই আপনার হেডার পরিচালনা করুন"}
        </p>
      </div>
      
      {headerData?.length === 0 && (
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={translations[currentLanguage].addHeader} />
      </div>
      )}
      <DashboardTable columns={columns} data={headerData} loading={isLoading} />

      {/* Add Header Modal */}
      <AddModal isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addHeader}>
        <AddHeader />
      </AddModal>

      {/* Edit Header Modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].editHeader}>
        <EditHeader selectedHeader={selectedHeader} />
      </EditModal>

      {/* Delete Header Modal */}
      <DeleteModal
        data={deleteData}
        error={deleteError}
        isLoading={deleteLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteHeader}
        onDelete={handleDeleteHeader}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default Header;
