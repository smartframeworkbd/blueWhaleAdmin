"use client";

import React, { useState, useContext } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useGetContentQuery, useDeleteContentMutation } from "@/redux/Feature/Admin/contentApi/contentApi";
import AddContent from "./AddContent/page";
import EditContent from "./EditContent/page";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const Content = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const [selectedContent, setSelectedContent] = useState({});
  const { data, isLoading: contentLoading } = useGetContentQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [deleteContent, { isLoading: deleteLoading, isError, isSuccess, error: dError , data:dData}] = useDeleteContentMutation();

  const contentData = data?.data?.map((content, index) => ({
    key: index + 1,
    id: content.Id,
    title: content.title,
    slag: content.slag,
    subTitle: content.subTitle,
    description: content.description,
    type: content.type,
    imageUrl: content.imageUrl,
    videoUrl: content.videoUrl,
    external_videoUrl: content.external_videoUrl,
    buttonText: content.buttonText,
    buttonLink: content.buttonLink,
    status: content.status,
    meta_title: content.meta_title,
    meta_description: content.meta_description,
    meta_image: content?.meta_image,
  }));

  const translations = {
    en: {
    serialNo: "Serial No",
      manageContent: "Manage your content easily from here",
      addContent: "Add Content",
      editContent: "Edit Content",
      title: "Title",
      slug: "Slug",
      subtitle: "Subtitle",
      description: "Description",
      type: "Type",
      image: "Image",
      video: "Video",
      externalVideo: "External Video",
      buttonText: "Button Text",
      buttonLink: "Button Link",
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      metaImage: "Meta Image",
      status: "Status",
      action: "Action",
      active: "Active",
      inactive: "Inactive",
      edit: "Edit",
      delete: "Delete",
      deleteContent: "Delete Content",
      deleteDescription: "This will permanently remove the content data.",
    },
    bn: {
    serialNo: "সিরিয়াল নম্বর",
      manageContent: "এখান থেকে সহজেই আপনার বিষয়বস্তু পরিচালনা করুন",
      addContent: "বিষয়বস্তু যোগ করুন",
      editContent: "বিষয়বস্তু এডিট করুন",
      title: "শিরোনাম",
      slug: "স্লাগ",
      subtitle: "উপশিরোনাম",
      description: "বর্ণনা",
      type: "প্রকার",
      image: "ছবি",
      video: "ভিডিও",
      externalVideo: "বহিরাগত ভিডিও",
      buttonText: "বোতামের টেক্সট",
      buttonLink: "বোতামের লিঙ্ক",
      metaTitle: "মেটা শিরোনাম",
      metaDescription: "মেটা বর্ণনা",
      metaImage: "মেটা ছবি",
      status: "স্থিতি",
      action: "একশন",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      edit: "সম্পাদনা করুন",
      delete: "মুছে ফেলুন",
      deleteContent: "বিষয়বস্তু মুছে ফেলুন",
      deleteDescription: "এটি স্থায়ীভাবে বিষয়বস্তু ডেটা মুছে দেবে।",
    },
  };

  const handleEditContent = (content) => {
    setSelectedContent(content);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (content) => {
    setSelectedContent(content);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteContent = () => {
    deleteContent(selectedContent?.id);
  };

  const columns = [
    {
      title: translations[currentLanguage].serialNo,
      dataIndex: "key",
      key: "key",
    },

    {
      title: translations[currentLanguage].title,
      dataIndex: "title",
      key: "title",
    },
    {
      title: translations[currentLanguage].slug,
      dataIndex: "slag",
      key: "slag",
    },
    {
      title: translations[currentLanguage].subtitle,
      dataIndex: "subTitle",
      key: "subTitle",
    },
    {
      title: translations[currentLanguage].description,
      dataIndex: "description",
      key: "description",
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
          <a onClick={() => handleEditContent(record)}>
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
      <p className="lg:text-2xl text-center font-bold mb-10">
        {translations[currentLanguage].manageContent}
      </p>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={translations[currentLanguage].addContent} />
      </div>
      <DashboardTable columns={columns} data={contentData} loading={contentLoading} />
      <AddModal width={700} isAddModalOpen={isAddModalOpen} title={translations[currentLanguage].addContent}>
        <AddContent />
      </AddModal>
      <EditModal width={700} isEditModalOpen={isEditModalOpen} title={translations[currentLanguage].editContent}>
        <EditContent selectedContent={selectedContent} />
      </EditModal>
      <DeleteModal
        title={translations[currentLanguage].deleteContent}
        description={translations[currentLanguage].deleteDescription}
        onDelete={handleDeleteContent}
        isDeleteModalOpen={isDeleteModalOpen}
        isLoading={deleteLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={dError}
        data={dData}
      />
    </>
  );
};

export default Content;
