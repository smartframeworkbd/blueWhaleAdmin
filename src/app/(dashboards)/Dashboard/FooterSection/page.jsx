"use client"
import React, { useState, useContext } from "react";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsEditModalOpen, setIsDeleteModalOpen } from "@/redux/Modal/ModalSlice";
import DashboardTable from "@/components/Table/DashboardTable";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import AddFooterSection from "./AddFooterSection/page";
import EditFooterSection from "./EditFooterSection/page";
import { useDeleteFooterMutation, useGetFooterQuery } from "@/redux/Feature/Admin/footer/footerApi";
import { LanguageContext } from "@/context/LanguageContext";  // Import your LanguageContext

const FooterSection = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" }; // Using your LanguageContext
  const [selectedFooter, setSelectedFooter] = useState({});
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(state => state.modal);
  const { data, isLoading, error } = useGetFooterQuery();
  const [deleteFooter, { isLoading: deleteLoading, isError, isSuccess, data: deleteData, error: deleteError }] = useDeleteFooterMutation();
  const dispatch = useAppDispatch();
  

  const footerData = data?.data?.map((footer, index) => ({
    key: index + 1,
    id: footer.id,
    logo: <img src={footer.logo} alt="Logo" style={{ width: "50px" }} />,
    aboutTextEnglish: footer.aboutTextEnglish,
    aboutTextBangla: footer.aboutTextBangla,
    copyrightTextEnglish: footer.copyrightTextEnglish,
    copyrightTextBangla: footer.copyrightTextBangla,
    contactEmail: footer.contactEmail,
    contactPhone: footer.contactPhone,
    addressEnglish: footer.addressEnglish,
    addressBangla: footer.addressBangla,
    socialMediaLinks: JSON.parse(footer.socialMediaLinks || {}),
    quickLinks: JSON.parse(footer.quickLinks || {}),
    status: footer.status,
  }));

  const handleEditFooter = (footer) => {
    setSelectedFooter(footer);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (footer) => {
    setSelectedFooter(footer);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteFooter = () => {
    deleteFooter(selectedFooter?.id);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: currentLanguage === "en" ? "About English" : "বিষয় ইংলিশ",
      dataIndex: "aboutTextEnglish",
      key: "aboutTextEnglish",
    },
    {
      title: currentLanguage === "en" ? "About Bangla" : "বিষয় বাংলা",
      dataIndex: "aboutTextBangla",
      key: "aboutTextBangla",
    },



    {
      title: currentLanguage === "en" ? "Contact Email" : "ইমেইল",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: currentLanguage === "en" ? "Contact Phone" : "ফোন",
      dataIndex: "contactPhone",
      key: "contactPhone",
    },
    {
      title: currentLanguage === "en" ? "Address English" : "ঠিকানা (বাংলা)",
      dataIndex: currentLanguage === "en" ? "addressEnglish" : "addressBangla",
      key: currentLanguage === "en" ? "addressEnglish" : "addressBangla",
    },
    {
      title: currentLanguage === "en" ? "Quick Links" : "কুইক লিঙ্ক",
      dataIndex: "quickLinks",
      key: "quickLinks",
      render: (quickLinks) =>  <ul className="space-y-3">
        {quickLinks.map((link, index) => (
          <li className="" key={index}>
            {currentLanguage === "en" ? link.labelEn : link.labelBn}
          </li>
        ))}
      </ul>,
    },
    {
      title: currentLanguage === "en" ? "Status" : "অবস্থা",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? (currentLanguage === "en" ? "Active" : "সক্রিয়") : (currentLanguage === "en" ? "Inactive" : "নিষ্ক্রিয়")}
        </Tag>
      ),
    },
    {
      title: currentLanguage === "en" ? "Action" : "একশন",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditFooter(record)}>
            <Tooltip title={currentLanguage === "en" ? "Edit" : "এডিট"} placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title={currentLanguage === "en" ? "Delete" : "মুছুন"} placement="top">
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
          {currentLanguage === "en" ? "Manage your footer easily from here" : "এখান থেকে সহজেই আপনার ফুটার পরিচালনা করুন"}
        </p>
      </div>

      <div className="lg:max-w-5xl lg:mx-auto">
      {footerData?.length === 0 && (
        <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
          <ButtonWithModal title={currentLanguage === "en" ? "Add Footer" : "ফুটার যুক্ত করুন"} />
        </div>
      )}
        <DashboardTable columns={columns} data={footerData} loading={isLoading} />
      </div>

      {/* Add Footer Modal */}
      <AddModal isAddModalOpen={isAddModalOpen} title={currentLanguage === "en" ? "Add New Footer" : "নতুন ফুটার যোগ করুন"}>
        <AddFooterSection />
      </AddModal>

      {/* Edit Footer Modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title={currentLanguage === "en" ? "Edit Footer" : "ফুটার এডিট করুন"}>
        <EditFooterSection selectedFooter={selectedFooter} />
      </EditModal>

      {/* Delete Footer Modal */}
      <DeleteModal
        data={deleteData}
        error={deleteError}
        isLoading={deleteLoading}
        isSuccess={isSuccess}
        title={currentLanguage === "en" ? "Delete Footer" : "ফুটার মুছুন"}
        onDelete={handleDeleteFooter}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={currentLanguage === "en" ? "This will remove the selected footer data." : "এটি নির্বাচিত ফুটার ডেটা মুছে ফেলবে।"}
      />
    </>
  );
};

export default FooterSection;
