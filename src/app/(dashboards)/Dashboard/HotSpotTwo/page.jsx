"use client"
import React, { useEffect, useState, useContext } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen } from "@/redux/Modal/ModalSlice";
import { useDeleteHotspotMutation, useGetHotspotsQuery } from "@/redux/Feature/Admin/hotspot/hotSpotApi";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/context/LanguageContext";

const translations = {
  en: {
    serialNo: "Serial No",
    nameEnglish: "Name (English)",
    nameBangla: "Name (Bangla)",
    detailsEnglish: "Details (English)",
    detailsBangla: "Details (Bangla)",
    action: "Action",
    deleteTooltip: "Delete",
    deleteDescription: "This will permanently delete the selected hotspot data.",
    addHotspot: "Add Hotspot Two",
    deleteHotspot: "Delete Hotspot",
  },
  bn: {
    serialNo: "সিরিয়াল নম্বর",
    nameEnglish: "নাম (ইংরেজি)",
    nameBangla: "নাম (বাংলা)",
    detailsEnglish: "বিস্তারিত (ইংরেজি)",
    detailsBangla: "বিস্তারিত (বাংলা)",
    action: "একশন",
    deleteTooltip: "মুছুন",
    deleteDescription: "এইটি নির্বাচিত হটস্পট ডেটা স্থায়ীভাবে মুছে ফেলবে।",
    addHotspot: "হটস্পট যোগ করুন",
    deleteHotspot: "হটস্পট মুছুন",
  },
};

const HotSpotTwo = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const router = useRouter();
  const { data, error, isLoading: hotspotIsLoading } = useGetHotspotsQuery();
  const { isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedHotspot, setSelectedHotspot] = useState({});
  const [deleteHotspot, { isLoading: dHIsLoading, isError, isSuccess, data: dHData, error: dHError }] = useDeleteHotspotMutation();
  // console.log("All HotSpot", data?.data)
  const hotspotData = data?.data
  ?.filter(hotspot => hotspot?.hotspotSectionName === "sectionTwo")
  ?.map((hotspot, index) => ({
    key: index + 1,
    id: hotspot.id,
    nameEnglish: hotspot.hotspotNameEnglish,
    nameBangla: hotspot.hotspotNameBangla,
    detailsEnglish: hotspot.hotspotDetailsEnglish,
    detailsBangla: hotspot.hotspotDetailsBangla,
  }));


  const handleEditHotspot = (hotspotId) => {
    router.push(`/Dashboard/HotSpotTwo/EditHotSpotTwo?id=${hotspotId}`);
  };

  const handleDelete = (hotspotData) => {
    setSelectedHotspot(hotspotData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteHotspot = () => {
    deleteHotspot(selectedHotspot?.id);
  };

  const columns = [
    {
      title: translations[currentLanguage].serialNo,
      dataIndex: "key",
      key: "key",
    },
    {
      title: translations[currentLanguage].nameEnglish,
      dataIndex: "nameEnglish",
      key: "nameEnglish",
    },
    {
      title: translations[currentLanguage].nameBangla,
      dataIndex: "nameBangla",
      key: "nameBangla",
    },
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
      title: translations[currentLanguage].action,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditHotspot(record.id)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title={translations[currentLanguage].deleteTooltip} placement="top">
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
          {currentLanguage === "en" ? "Manage your hotspot easily from here" : "এখান থেকে সহজেই আপনার হটস্পট টু পরিচালনা করুন"}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={translations[currentLanguage].addHotspot} path={'/Dashboard/HotSpotTwo/AddHotSpotTwo'}/>
      </div>

      <DashboardTable columns={columns} data={hotspotData} loading={hotspotIsLoading} />
      
      {/* Delete Hotspot Modal */}
      <DeleteModal
        data={dHData}
        error={dHError}
        isLoading={dHIsLoading}
        isSuccess={isSuccess}
        title={translations[currentLanguage].deleteHotspot}
        onDelete={handleDeleteHotspot}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={translations[currentLanguage].deleteDescription}
      />
    </>
  );
};

export default HotSpotTwo;
