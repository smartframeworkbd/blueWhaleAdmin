"use client";
import React, { useContext, useState } from "react";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import DashboardTable from "@/components/Table/DashboardTable";
import { Button, Spin, Steps, message } from "antd";
import { useGetGrievanceByTraceQuery } from "@/redux/Feature/User/Grievance/grievanceApi";
import moment from "moment";
import { LanguageContext } from "@/context/LanguageContext";
import { toast } from "sonner";

const GrievanceTrace = () => {
  const { currentLanguage } = useContext(LanguageContext)
  const [traceNo, setTraceNo] = useState("");
  const [submittedTraceNo, setSubmittedTraceNo] = useState(null);

  // Translation function
  const translate = (text) => {
    const translations = {
      "Enter your Tracking Number": { en: "Enter your Tracking Number", bn: "আপনার ট্র্যাকিং নম্বর লিখুন" },
      "Enter your Tracking number": { en: "Enter your Tracking number", bn: "আপনার ট্র্যাকিং নম্বর লিখুন" },
      "Search": { en: "Search", bn: "অনুসন্ধান করুন" },
      "Loading...": { en: "Loading...", bn: "লোড হচ্ছে..." },
      "Pending": { en: "Pending", bn: "পেন্ডিং" },
      "In Progress": { en: "In Progress", bn: "চলমান" },
      "Accepted": { en: "Accepted", bn: "গৃহীত হয়েছে" },
      "Your grievance is pending.": { en: "Your grievance is pending.", bn: "আপনার অভিযোগ পেন্ডিং আছে।" },
      "Your grievance is in progress.": { en: "Your grievance is in progress.", bn: "আপনার অভিযোগ প্রক্রিয়াধীন।" },
      "Your grievance has been accepted.": { en: "Your grievance has been accepted.", bn: "আপনার অভিযোগ গৃহীত হয়েছে।" },
      "Status": { en: "Status", bn: "অবস্থা" },
      "Tracking No": { en: "Tracking No", bn: "ট্র্যাকিং নম্বর" },
      "Type": { en: "Type", bn: "ধরন" },
      "Subject": { en: "Subject", bn: "বিষয়" },
      "Created At": { en: "Created At", bn: "তৈরি করা হয়েছে" },
    };

    return translations[text]?.[currentLanguage] || text;
  };
  const { data, isLoading, error } = useGetGrievanceByTraceQuery(submittedTraceNo);

  const statusToStepIndex = {
    "Pending": 0,
    "In Progress": 1,
    "Accepted": 2,
  };

  const currentStep = data?.data ? statusToStepIndex[data.data.grievanceStatus] || 0 : 0;

  const steps = [
    {
      title: translate("Pending"),
      content: translate("Your grievance is pending."),
    },
    {
      title: translate("In Progress"),
      content: translate("Your grievance is in progress."),
    },
    {
      title: translate("Accepted"),
      content: translate("Your grievance has been accepted."),
    },
  ];

  const grievanceData = data?.data
    ? [
        {
          key: data.data.Id,
          id: data.data.Id,
          userId: data.data.userId,
          trackingNo: data.data.trackingNo,
          grievanceType: data.data.grievanceType,
          grievanceSubject: data.data.grievanceSubject,
          grievanceStatus: data.data.grievanceStatus,
          createdAt: moment(data.data.createdAt).format("L"),
        },
      ]
    : [];

  const columns = [
    { title: translate("Status"), dataIndex: "grievanceStatus", key: "grievanceStatus" },
    { title: translate("Tracking No"), dataIndex: "trackingNo", key: "trackingNo" },
    { title: translate("Type"), dataIndex: "grievanceType", key: "grievanceType" },
    { title: translate("Subject"), dataIndex: "grievanceSubject", key: "grievanceSubject" },
    { title: translate("Created At"), dataIndex: "createdAt", key: "createdAt" },
  ];

  const handleSubmit = () => {
    if (!traceNo.trim()) {
      toast.error("Enter your tracking number", { id: 1 });
      return;
    }
    setSubmittedTraceNo(traceNo);
  };



  return (
    <div className="w-[90%] lg:max-w-5xl mx-auto mb-8 space-y-8 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <Spin size="large" tip={translate("Loading...")} />
        </div>
      )}

      <ZFormTwo submit={handleSubmit} buttonName={translate("Search")} className="mb-5">
        <ZInputTwo
          name="traceNo"
          label={translate("Enter your Tracking Number")}
          placeholder={translate("Enter your Tracking number")}
          value={traceNo}
          onSelectChange={(e) => setTraceNo(e)}
        />
       </ZFormTwo>


     
      {
      (!data?.data && submittedTraceNo) ? (
        <div className="text-red-500 font-bold text-center">
           {currentLanguage == 'en' ? " Invalid tracking number" : "অবৈধ ট্র্যাকিং নম্বর"}
        </div>
      )
       : (
        data?.data && (
          <>
            <Steps current={currentStep}>
              {steps.map((item) => (
                <Steps.Step key={item.title} title={item.title} description={item.content} />
              ))}
            </Steps>
            <DashboardTable columns={columns} data={grievanceData} loading={isLoading} />
          </>
        )
      )}
    </div>
  );
};

export default GrievanceTrace;
