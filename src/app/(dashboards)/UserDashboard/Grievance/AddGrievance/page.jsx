"use client";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAddGrievanceMutation } from "@/redux/Feature/User/Grievance/grievanceApi";
import { useAppSelector } from "@/redux/Hook/Hook";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { LanguageContext } from "@/context/LanguageContext";
import labels from "../../../../../translationData/HomePage.json";
import getTranslation from "@/context/getTranslationUtility";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFile,
} from "react-icons/fa";

const GrievanceForm = labels.GrievanceForm;

// Dynamically import components that may use `window`
const ZCkEditor = dynamic(() => import("@/components/Form/ZCkEditor"), {
  ssr: false,
});
const PrintContent = dynamic(() => import("../PrintContent"), { ssr: false });

const AddGrievance = () => {
  const { isAddModalOpen } = useAppSelector((state) => state.modal);
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [triggerPrint, setTriggerPrint] = useState(false);
  const [proofDetails, setProofDetails] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const router = useRouter();
  const { currentLanguage } = useContext(LanguageContext) || {
    currentLanguage: "en",
  };
  // console.log(files);

  const [createGrievance, { isLoading, isError, error, isSuccess, data }] =
    useAddGrievanceMutation();

  const handleFileChange = (e) => {
    if (typeof window === "undefined") return;
    const newFiles = Array.from(e.target.files);

    if (files.length + newFiles.length > 5) {
      toast.error("You can upload a maximum of 5 files.");
      return;
    }
    setFiles([...files, ...newFiles]);
    setProofDetails([...proofDetails, ...newFiles.map(() => "")]);
    setSelectedImages([
      ...selectedImages,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (idx) => {
    const updatedFiles = files.filter((_, index) => index !== idx);
    setFiles(updatedFiles);
    setProofDetails(proofDetails.filter((_, index) => index !== idx));
    setSelectedImages(selectedImages.filter((_, index) => index !== idx));
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDetails = [...proofDetails];
    updatedDetails[index] = value;
    setProofDetails(updatedDetails);
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    const modifiedData = {
      ...data,
      grievanceDetails: description,
      grievanceStatus: "Pending",
      userId: userInfo?.Id,
      userName: userInfo?.userName,
      userPhone: userInfo?.userPhone,
    };

    // console.log(modifiedData);

    formData.append("data", JSON.stringify(modifiedData));
    files.forEach((file, index) => {
      formData.append("relatedProofs", file);
      formData.append(`proofDetails[${index}]`, proofDetails[index]);
    });

    try {
      await createGrievance(formData);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const toLabel = getTranslation("toLabel", currentLanguage, GrievanceForm);
  const officerTitle = getTranslation(
    "officerTitle",
    currentLanguage,
    GrievanceForm
  );
  const officerLocation = getTranslation(
    "officerLocation",
    currentLanguage,
    GrievanceForm
  );
  const subjectLabel = getTranslation(
    "subjectLabel",
    currentLanguage,
    GrievanceForm
  );
  const salutation = getTranslation(
    "salutation",
    currentLanguage,
    GrievanceForm
  );
  const faithfullyYours = getTranslation(
    "faithfullyYours",
    currentLanguage,
    GrievanceForm
  );
  const attachmentsLabel = getTranslation(
    "attachmentsLabel",
    currentLanguage,
    GrievanceForm
  );
  const fileLabel = getTranslation("fileLabel", currentLanguage, GrievanceForm);
  const descriptionLabel = getTranslation(
    "descriptionLabel",
    currentLanguage,
    GrievanceForm
  );
  const formSubject = getTranslation(
    "formSubject",
    currentLanguage,
    GrievanceForm
  );
  const formType = getTranslation("formType", currentLanguage, GrievanceForm);
  const formDescription = getTranslation(
    "formDescription",
    currentLanguage,
    GrievanceForm
  );
  const formProofs = getTranslation(
    "formProofs",
    currentLanguage,
    GrievanceForm
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Grievance created successfully, check your mobile for tracking number",
        { id: 1, duration: 10000 }
      );
      router.push("/UserDashboard/Grievance");
    }

    if (triggerPrint && typeof window !== "undefined") {
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const content = `
      <div style="padding: 20px;">
       <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          font-size: 22px; 
        }
        
        .content-container {
          width: 100%;
          text-align: left;
          margin-top: 100px;
        }
  
        .content-container p {
          font-size: 22px; 
              
        }
  
        .large-text {
          font-size: 22px; 
          font-weight: bold;
          margin: 40px 0;
        }
  
        .description {
          margin-top: 70px;
          text-align: justify;
        }
      </style>
      <div class="content-container">
       <p>${toLabel}</p>
       <p>${officerTitle}</p>
        <p><strong></strong> ${officerLocation}</p>
        <p style="font-size: 16px; margin-top:30px; margin-bottom:30px"><strong>${subjectLabel}</strong> ${subject}</p>
        <p style="font-size: 16px;"><strong>${salutation}</strong></p>
        <p style="font-size: 16px; margin-top:20px; margin-bottom:40px"> ${description}</p>
        <p>${faithfullyYours}</p>
        <p style="text-transform: uppercase; font-weight: bold;">${
          userInfo?.userName
        }</p>
        <p style="font-size: 16px;"><strong>${attachmentsLabel}</strong></p>
        <div style="margin-left: 20px; margin-top: 10px;">
          ${files
            .map(
              (file, index) => `
            <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; background-color: #f9f9f9; margin-bottom: 10px;">
              <p style="font-weight: bold;">${fileLabel} ${file.name}</p>
              <p>${descriptionLabel} ${proofDetails[index]}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      </div>
    `;

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
      <html>
        <head>
          <title>Print Grievance Submission</title>
          <style>
            body { font-family: Arial, sans-serif; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
      doc.close();

      // Wait for the content to load and then print
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Remove iframe after printing
      document.body.removeChild(iframe);
      setTriggerPrint(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAddModalOpen,
    isSuccess,
    router,
    triggerPrint,
    userInfo?.userName,
    type,
    subject,
    description,
  ]);

  const handlePrint = () => {
    setTriggerPrint(true);
  };

  const getFileIcon = (fileType) => {
    if (/image/.test(fileType)) return null; // No icon for images, show preview instead
    if (/pdf/.test(fileType))
      return <FaFilePdf className="text-red-500 text-4xl" />;
    if (/word/.test(fileType))
      return <FaFileWord className="text-blue-500 text-4xl" />;
    if (/excel/.test(fileType))
      return <FaFileExcel className="text-green-500 text-4xl" />;
    if (/video/.test(fileType))
      return <FaFileVideo className="text-purple-500 text-4xl" />;
    if (/audio/.test(fileType))
      return <FaFileAudio className="text-orange-500 text-4xl" />;
    if (/zip|rar/.test(fileType))
      return <FaFileArchive className="text-gray-500 text-4xl" />;
    return <FaFile className="text-gray-500 text-4xl" />;
  };

  return (
    <>
      <div className="text-center text-2xl font-bold uppercase">
        {currentLanguage == "en" ? "Add your grievance " : "অভিযোগ দাখিল করুন"}
      </div>
      <ZFormTwo
        isLoading={isLoading}
        // isSuccess={isSuccess}
        isError={isError}
        error={error}
        data={data}
        submit={handleSubmit}
        formType={"create"}
      >
        <div className="space-y-5">
          {/* Grievance Fields */}
          <div>
            <ZInputTwo
              label={formSubject}
              name={"grievanceSubject"}
              type={"text"}
              placeholder={"Enter your grievance subject"}
              value={subject}
              onSelectChange={(val) => setSubject(val)}
              required={1}
            />
          </div>

          <div>
            <ZSelect
              options={[{ label: "General", value: "General" }]}
              label={formType}
              name={"grievanceType"}
              placeholder={"Select Grievance Type"}
              onSelectChange={setType} // Store type for preview
            />
          </div>

          <div className=""  >
            <p className="mb-2">{formDescription}</p>
           <div >
            
            <ZCkEditor setDescription={setDescription}></ZCkEditor>
            </div> 
          </div>

          {/* File Uploads and Descriptions */}
          <div className="">
            <div className="">
              <label>{formProofs}</label>

              <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".jpeg, .jpg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip, .mp4, .mp3"
                  />
                </div>

                <div>
                  <p className="text-[#8E5EC7]">
                    ( ফাইলের সর্বোচ্চ সাইজ ১০ মেগাবাইট(MB) এবং ফাইলের অনুমোদিত
                    টাইপ সমূহ png, PNG, jpeg, JPEG, doc, DOC, docx, DOCX, pdf,
                    PDF, xls, xlsx, mp3, MP3, mp4, MP4, zip, rar )
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                {/* Preview Selected Images */}
                <div>
                  {selectedImages.length > 0 && (
                    <div className="flex flex-col gap-3 w-full">
                      {files.map((file, index) => (
                        <div key={index} className="flex flex-col items-center">
                          {/image/.test(file.type) ? (
                            <img
                              src={URL.createObjectURL(
                                new Blob([file], { type: file.type })
                              )}
                              alt={file.name}
                              className="w-[100px] h-[100px] object-cover rounded shadow"
                            />
                          ) : (
                            <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded shadow">
                              {getFileIcon(file.type)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center my-[60px] gap-2"
                    >
                      <div className="w-full">
                        <label>{file.name}</label>
                        <input
                          type="text"
                          placeholder={`Enter description for file`}
                          value={proofDetails[index] || ""}
                          onChange={(e) =>
                            handleDescriptionChange(index, e.target.value)
                          }
                          className="w-full rounded-md border outline-none border-blue-500 bg-white text-sm text-gray-700 py-1 me-2 shadow-sm px-2"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 text-white rounded px-2 py-1 mt-5"
                      >
                        <ImCross size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => setShowPreview(true)}
                  className="mt-4 mb-4"
                >
                  {currentLanguage === "en" ? "Preview" : "প্রিভিউ"}
                </Button>
                <Button type="primary" className="mt-4 mb-4">
                  <button type="submit">
                    {" "}
                    {currentLanguage === "en" ? "Submit" : "জমা দিন"}
                  </button>
                </Button>
              </div>
            </div>

            <Modal
              centered
              title={
                currentLanguage === "en"
                  ? "Preview Grievance Submission"
                  : "প্রিভিউ অভিযোগ সাবমিশন"
              }
              visible={showPreview}
              onCancel={() => setShowPreview(false)}
              width={700}
              footer={[
                <Button
                  key="print"
                  onClick={handlePrint}
                  className="bg-green-500 text-white"
                >
                  {currentLanguage === "en" ? "Print" : "প্রিন্ট"}
                </Button>,
                <Button
                  key="close"
                  onClick={() => setShowPreview(false)}
                  className="bg-blue-500 text-white"
                >
                  {currentLanguage === "en" ? "Close" : "বন্ধ করুন"}
                </Button>,
              ]}
            >
              <PrintContent
                type={type}
                subject={subject}
                description={description}
                files={files}
                proofDetails={proofDetails}
                userName={userInfo?.userName}
              />
            </Modal>
          </div>
        </div>
      </ZFormTwo>
    </>
  );
};

export default AddGrievance;
