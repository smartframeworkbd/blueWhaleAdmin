"use client";
import React, { useContext, useState } from "react";
import DashboardTable from "@/components/Table/DashboardTable";
import { Image, Space, Tag, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen,setIsViewModalOpen } from "@/redux/Modal/ModalSlice";
import { useGetGrievancesByUserQuery } from "@/redux/Feature/User/Grievance/grievanceApi";
import moment from "moment";
import { LanguageContext } from "@/context/LanguageContext";
import labels from "../../../../translationData/HomePage.json";
import getTranslation from '@/context/getTranslationUtility';
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ButtonLang = labels.ButtonLang;


const Grievance = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  // const [selectedGrievance, setSelectedGrievance] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { data, error, isLoading: grievanceIsLoading } = useGetGrievancesByUserQuery(userInfo?.Id);
  const dispatch = useAppDispatch();
  const router = useRouter()


  const grievance = getTranslation("grievance", currentLanguage, ButtonLang);


  const grievanceData = data?.data?.map((grievance, index) => ({
    key: index,
    id: grievance.Id,
    userId: grievance.userId,
    trackingNo: grievance.trackingNo,
    grievanceType: grievance.grievanceType,
    grievanceSubject: grievance.grievanceSubject,
    grievanceDetails: grievance.grievanceDetails,
    grievanceStatus: grievance.grievanceStatus,
    relatedProofs: grievance.relatedProofs,
    createdAt: moment(grievance.createdAt).format("L"),
    updatedAt: moment(grievance.updatedAt).format("L"),
  }));


// console.log(grievanceData)


  const handleViewGrievance = (grievanceId) => {
    router.push(`/UserDashboard/Grievance/ViewGrievance?id=${grievanceId}`);
  };

  // const handleDelete = (grievanceData) => {
  //   setSelectedGrievance(grievanceData);
  //   dispatch(setIsDeleteModalOpen());
  // };

  // const handleDeleteGrievance = () => {
  //   deleteGrievance(selectedGrievance?.id);
  // };

  const columnTranslations = {
    trackingNo: {
      en: "Tracking No",
      bn: "ট্র্যাকিং নম্বর",
    },
    grievanceType: {
      en: "Grievance Type",
      bn: "অভিযোগের ধরন",
    },
    grievanceSubject: {
      en: "Subject",
      bn: "বিষয়",
    },
    grievanceStatus: {
      en: "Status",
      bn: "অবস্থা",
    },
    createdAt: {
      en: "Date",
      bn: "তারিখ",
    },
    updatedAt: {
      en: "Update Date",
      bn: "আপডেট তারিখ",
    },
    relatedProofs: {
      en: "Proofs",
      bn: "প্রমাণপত্র",
    },
    action: {
      en: "Action",
      bn: "একশন",
    },
  };

  const columns = [
    {
      title: columnTranslations.trackingNo[currentLanguage],
      dataIndex: "trackingNo",
      key: "trackingNo",
    },
    {
      title: columnTranslations.grievanceType[currentLanguage],
      dataIndex: "grievanceType",
      key: "grievanceType",
    },
    {
      title: columnTranslations.grievanceSubject[currentLanguage],
      dataIndex: "grievanceSubject",
      key: "grievanceSubject",
    },
    {
      title: columnTranslations.grievanceStatus[currentLanguage],
      dataIndex: "grievanceStatus",
      key: "grievanceStatus",
      render: (status) => (
        <Tag color={status === "Pending" || status === "Rejected" ? "red" : "green"}>
          <span className="font-bold">{status}</span>
        </Tag>
      ),
    },
    {
      title: columnTranslations.createdAt[currentLanguage],
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: columnTranslations.updatedAt[currentLanguage],
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: columnTranslations.relatedProofs[currentLanguage],
      dataIndex: "relatedProofs",
      key: "relatedProofs",
      render: (proofs) => {
        const parsedProofs = typeof proofs === "string" ? JSON.parse(proofs) : proofs;
        return (
          <div>
            {parsedProofs && parsedProofs.length > 0 ? (
              <ul className="list-disc pl-5">
                {parsedProofs.map((proof, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${proof.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip title="Click to view">
                        <span className="text-blue-500">{`View Proof ${index + 1}`}</span>
                      </Tooltip>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-red-500 bg-yellow-200 border border-black px-2 py-1 font-bold">
                No proofs
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: columnTranslations.action[currentLanguage],
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewGrievance(record.id)}>
          <Tooltip title="Click here to view all" placement="top">
          
          <FaEye size={25}/>
                  </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="text-center lg:text-2xl font-bold uppercase">
     { currentLanguage == 'en' ? "View your all grievances " : "আপনার  অভিযোগ সমূহ দেখুন" } 
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={grievance} path={"/UserDashboard/Grievance/AddGrievance"}/>
      </div>

      <DashboardTable columns={columns} data={grievanceData} loading={grievanceIsLoading} />
      

  

      {/* Delete Grievance Modal */}

      {/* <DeleteModal
        data={dGData}
        error={dGError}
        isLoading={dGIsLoading}
        isSuccess={isSuccess}
        title="Delete Grievance"
        onDelete={handleDeleteGrievance}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"This will permanently remove the grievance record."}
      /> */}
    </>
  );
};

export default Grievance;
