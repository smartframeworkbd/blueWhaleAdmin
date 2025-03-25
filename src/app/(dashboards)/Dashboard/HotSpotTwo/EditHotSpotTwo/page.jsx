/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import ZRadio from "@/components/Form/ZRadio";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Alert, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetHotspotQuery,
  useUpdateHotspotMutation,
  useUploadImageMutation,
} from "@/redux/Feature/Admin/hotspot/hotSpotApi";
import LoadingPage from "@/components/LoadingPage";
import ButtonWithModal from "@/components/Button/ButtonWithModal";

const EditHotSpotTwo = () => {
  const searchParams = useSearchParams();
  const hotSpotId = searchParams.get("id");
  const router = useRouter();

  // States
  const [hotData, setHotData] = useState("");
  const [hotspotType, setHotspotType] = useState("");
  const [urlOption, setUrlOption] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [modelOption, setModelOption] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState(null);
  const [content, setContent] = useState({ title: "", description: "" });

  const { data: hotSpotData, isSuccess: isFetching , isLoading : editLoading } = useGetHotspotQuery(hotSpotId);
  const [updateHotspot, { isLoading, isError, error, isSuccess , data: updateData }] =
    useUpdateHotspotMutation();
  const [uploadImage] = useUploadImageMutation();
  //  console.log(hotSpotData)



  // Populate form data on load
  useEffect(() => {
    if (hotSpotData) {
      const { data } = hotSpotData;
      setHotData(data);
      setHotspotType(data?.hotspotType || "");
      setUrlOption(data?.moduleName || "");
      // setUrlValue(data?.url || "");
      setModelOption(data?.moduleName || "");
      setContent(
        typeof data?.content === "string" ? JSON.parse(data?.content) : data?.content || { title: "", description: "" }
      );
    }
  }, [hotSpotData]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/Dashboard/HotSpotTwo");
    }
  }, [isSuccess]);

  const files =
  typeof hotData?.file === "string"
    ? JSON.parse(hotData?.file)
    : hotData?.file;

    // const parsedContent =  typeof hotData?.content === "string" ? JSON.parse(hotData?.content) : hotData?.content;
    // console.log(parsedContent)

  // Handle File Change
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleIconChange = (e) => setIcon(e.target.files[0]);

  if(editLoading){
    return <div><LoadingPage/></div>
  }

  // Submit Handler
  const handleSubmit = async (formData) => {
    const { content, url, ...data } = formData;
    let submitData = { ...data, hotspotSectionName: "sectionTwo" };

    // Type-specific logic
    if (hotspotType === "link") {
      if (urlOption === "OthersUrl") {
        submitData["moduleName"] = "OthersUrl";
        submitData["url"] = url;
      } else {
        submitData["moduleName"] = urlOption;
        submitData["url"] = urlOption;
      }
    } 
    else if (hotspotType === "model") {
      if (modelOption === "Others") {
        submitData["moduleName"] = "others";
        submitData["content"] = content;
      } else if (modelOption === "file") {
        submitData["moduleName"] = "file";
      } else {
        submitData["moduleName"] = modelOption;
      }
    }

    // Handle Icon Upload
    if (icon) {
      const iconData = new FormData();
      iconData.append("file", icon);
      const iconResponse = await uploadImage(iconData).unwrap();
      submitData.hotspotIcon = `/uploads/${iconResponse?.files[0]?.filename}`;
    } else {
      submitData.hotspotIcon = hotData.hotspotIcon;
    }

    // Handle File Upload
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);
      const fileResponse = await uploadImage(fileData).unwrap();
      submitData.file = fileResponse?.files[0]?.data;
    } 
    
    else {
      submitData.file = files;
    }

    // console.log(submitData);

    // Update Hotspot
    try {
      await updateHotspot({ id: hotSpotId, data: submitData });
    } catch (err) {
      console.error("Error submitting the form:", err);
    }
  };



  return (
    <div>
      <div className="flex justify-end">
       <ButtonWithModal title={`Back`} back path={'/Dashboard/HotSpotTwo'}/>
      </div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        formType="edit"
        data={updateData}
        buttonName="Update"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="hotspotNameEnglish"
            type="text"
            label="Hotspot Name (English)"
            placeholder="Enter the hotspot name in English"
            value={hotData?.hotspotNameEnglish}
          />
          <ZInputTwo
            name="hotspotNameBangla"
            type="text"
            label="Hotspot Name (Bangla)"
            placeholder="হটস্পটের নাম বাংলায় লিখুন"
            value={hotData?.hotspotNameBangla}
          />
          <ZInputTextArea
            name="hotspotDetailsEnglish"
            label="Hotspot Details (English)"
            placeholder="Enter details in English"
            value={hotData?.hotspotDetailsEnglish}
          />
          <ZInputTextArea
            name="hotspotDetailsBangla"
            label="Hotspot Details (Bangla)"
            placeholder="বিবরণ বাংলায় লিখুন"
            value={hotData?.hotspotDetailsBangla}
          />

          <div className="mt-4">
            <h3 className="font-medium">Upload New Icon</h3>
            <input
              type="file"
              onChange={handleIconChange}
              accept=".jpeg, .jpg, .png"
            />
            {hotData?.hotspotIcon && (
              <>
                <h3 className="font-medium mt-3">Previous Icon:</h3>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${hotData.hotspotIcon}`}
                  alt=""
                  className="w-[150px] h-[100px] mt-5"
                />
              </>
            )}
          </div>

          <ZRadio
            name="hotspotType"
            label="Hotspot Type"
            options={[
              { label: "Modal", value: "model" },
              { label: "Link", value: "link" },
            ]}
            defaultValue={hotspotType}
            onChange={(value) => setHotspotType(value)}
          />

          {hotspotType === "link" && (
            <ZSelect
              placeholder="Select URL Type"
              name="urlOption"
              label="URL Type"
              options={[
                { label: "Faq", value: "Faq" },
                { label: "Trace", value: "Trace" },
                { label: "Collaboration", value: "Collaboration" },
                { label: "OthersUrl", value: "OthersUrl" },
              ]}
              value={urlOption}
              onSelectChange={(value) => {
                setUrlOption(value);
                setUrlValue("");
              }}
            />
          )}

          {hotspotType === "link" &&
          urlOption === "OthersUrl" &&  (
              <div className="mt-4 mb-4">
              <h3 className="font-medium mb-4">Previous Url:</h3>            
               <Alert message={hotData?.url} type="info" />
            </div>
          )}

          {hotspotType === "link" && urlOption === "OthersUrl" && (
            <ZInputTwo
              name="url"
              type="text"
              label={"Add New Url:"}
              placeholder={"Enter your Url"}
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          )}         


          {hotspotType === "model" && (
            <ZSelect
              placeholder="Select Modal Type"
              name="modelOption"
              label="Model Type"
              options={[
                { label: "Faq", value: "Faq" },
                { label: "Trace", value: "Trace" },
                { label: "Collaboration", value: "Collaboration" },
                { label: "Others", value: "Others" },
                { label: "File", value: "file" },
              ]}
              value={modelOption}
              onSelectChange={(value) =>{ setModelOption(value)

                setContent({ title: "", description: "" });
              }
                
              }
            />
          )}


        {hotspotType === "model" && hotData?.moduleName === "others" && (
            <div className="mt-4">
              <h3 className="font-medium">Section Modal</h3>
              <ZInputTwo
                name="content.title"
                type="text"
                label="modalTitle"
                placeholder="enterModalTitle"
                value={content?.title}
              />
              <ZInputTextArea
                name="content.description"
                label="modalDescription"
                placeholder="enterModalDescription"
                value={content?.description}

              />
            </div>
          )}



          {hotspotType === "model" && modelOption === "Others" && (
            <div className="mt-4">
              <h3 className="font-medium">Section Modal</h3>
              <ZInputTwo
                name="content.title"
                type="text"
                label="modalTitle"
                placeholder="enterModalTitle"
              />
              <ZInputTextArea
                name="content.description"
                label="modalDescription"
                placeholder="enterModalDescription"
              />
            </div>
          )}


          {hotspotType === "model" && modelOption === "file" && (
            <div className="mt-4">
              <h3 className="font-medium">Upload New File</h3>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpeg, .jpg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip, .mp4, .mp3"
              />
            </div>
          )}

          {hotData?.hotspotType === "model" &&
            hotData?.moduleName === "file" && (
              <>
              <div className="mt-4">
                <h3 className="font-medium">Previous File</h3>
                <a
                  href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${files?.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip title="Click to view">
                    <span className="text-blue-500">View file</span>
                  </Tooltip>
                </a>
              </div>
              </>
            )}
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditHotSpotTwo;
