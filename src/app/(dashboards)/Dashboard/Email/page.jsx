"use client";
import React, { useContext, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddEmail from "./AddEmail/page";  // Assuming this is the Add Email component
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditEmail from "./EditEmail/page";  // Assuming this is the Edit Email component
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteEmailMutation, useGetEmailsQuery } from "@/redux/Feature/Admin/email/emailApi"; // Assuming these APIs exist
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const Email = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the component text
  const translations = {
    en: {
      name: "Name",
      emailAddress: "Email Address",
      action: "Action",
      edit: "Edit",
      delete: "Delete",
      addEmail: "Add Email",
      editEmail: "Edit Email",
      deleteEmail: "Delete Email",
      addNewEmail: "Add New Email",
      deleteDescription: "The corresponding email will be deleted",
    },
    bn: {
      name: "নাম",
      emailAddress: "ইমেইল ঠিকানা",
      action: "একশন",
      edit: "এডিট",
      delete: "মুছে ফেলুন",
      addEmail: "ইমেইল যোগ করুন",
      editEmail: "ইমেইল সম্পাদনা করুন",
      deleteEmail: "ইমেইল মুছুন",
      addNewEmail: "নতুন ইমেইল যোগ করুন",
      deleteDescription: "সংশ্লিষ্ট ইমেইল মুছে ফেলা হবে",
    },
  };

  const dispatch = useAppDispatch();
  const [selectedEmail, setSelectedEmail] = useState({});
  const { data, error, isLoading: emailIsLoading } = useGetEmailsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [deleteEmail, { isLoading: dEIsLoading, isError, isSuccess, data: dEData, error: dError }] = useDeleteEmailMutation();

  const emailData = data?.data?.map((email, index) => ({
    key: index,
    id: email.id,
    name: email.name,
    email: email.email,
    subject: email.subject,
    body: email.body,
  }));

  const handleEditEmail = (emailData) => {
    setSelectedEmail(emailData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (emailData) => {
    setSelectedEmail(emailData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteEmail = () => {
    deleteEmail(selectedEmail?.id);
  };

  const columns = [
    {
      title: translations[currentLanguage].name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: translations[currentLanguage].emailAddress,
      dataIndex: "email",
      key: "email",
    },
    {
      title: translations[currentLanguage].action,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditEmail(record)}>
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
            ? "Manage email notification from here"
            : "এখানে অভিযোগ নোটিফিকেশন  ইমেইল পরিচালনা করুন"}
        </p>
      </div>
      {emailData?.length == 0 && (
        <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
          <ButtonWithModal title={translations[currentLanguage].addEmail} />
        </div>
      )}

      <DashboardTable columns={columns} data={emailData} loading={emailIsLoading} />

      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addNewEmail}>
        <AddEmail />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].editEmail}>
        <EditEmail selectedEmail={selectedEmail} />
      </EditModal>

      {/* Delete Email Modal */}
      <DeleteModal
        data={dEData}
        error={dError}
        isLoading={dEIsLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteEmail}
        onDelete={handleDeleteEmail}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default Email;
