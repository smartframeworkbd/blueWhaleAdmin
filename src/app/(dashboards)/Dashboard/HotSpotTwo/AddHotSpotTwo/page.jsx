"use client";
import React, { useState, useEffect, useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ZSelect from "@/components/Form/ZSelect";
import { useAddHotspotMutation, useUploadImageMutation } from "@/redux/Feature/Admin/hotspot/hotSpotApi";
import ZRadio from "@/components/Form/ZRadio";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { useRouter } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ZImageInput from "@/components/Form/ZImageInput";
import { LanguageContext } from "@/context/LanguageContext"; // Assuming you have a LanguageContext
import ButtonWithModal from "@/components/Button/ButtonWithModal";

const AddHotSpotTwo = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" }; 
  
  const dispatch = useAppDispatch();
  const [
    addHotSpot,
    {
      isLoading: hIsLoading,
      isError: hIsError,
      error: hError,
      isSuccess: hIsSuccess,
      data,
    },
  ] = useAddHotspotMutation();
  const [uploadImage] = useUploadImageMutation(); 
  const [hotspotType, setHotspotType] = useState("");
  const [urlOption, setUrlOption] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [modelOption, setModelOption] = useState("");
  const [file, setFile] = useState([]);
  const [icon, setIcon] = useState([]);
  const router = useRouter();

  const translations = {
    en: {
      hotspotName: "Hotspot Name (English)",
      hotspotNameBangla: "Hotspot Name (Bangla)",
      hotspotDetails: "Hotspot Details (English)",
      hotspotDetailsBangla: "Hotspot Details (Bangla)",
      buttonName: "Button Name (English)",
      buttonNameBangla: "Button Name (Bangla)",
      uploadIcon: "Upload Icon",
      hotspotType: "Hotspot Type",
      urlType: "URL Type",
      selectUrlOption: "Select URL Type",
      modalType: "Modal Type",
      selectModalOption: "Select Modal Type",
      url: "URL",
      modalTitle: "Modal Title",
      modalDescription: "Modal Description",
      uploadFile: "Upload file",
    },
    bn: {
      hotspotName: "হটস্পটের নাম (ইংরেজি)",
      hotspotNameBangla: "হটস্পটের নাম (বাংলা)",
      hotspotDetails: "হটস্পটের বিস্তারিত (ইংরেজি)",
      hotspotDetailsBangla: "হটস্পটের বিস্তারিত (বাংলা)",
      buttonName: "বাটনের নাম (ইংরেজি)",
      buttonNameBangla: "বাটনের নাম (বাংলা)",
      uploadIcon: "আইকন আপলোড করুন",
      hotspotType: "হটস্পট টাইপ",
      urlType: "URL টাইপ",
      selectUrlOption: "URL টাইপ নির্বাচন করুন",
      modalType: "মডেল টাইপ",
      selectModalOption: "মডেল টাইপ নির্বাচন করুন",
      url: "URL",
      modalTitle: "মডেল শিরোনাম",
      modalDescription: "মডেল বর্ণনা",
      uploadFile: "ফাইল আপলোড করুন",
    },
    placeholders: {
      en: {
        hotspotName: "Enter Hotspot Name (English)",
        hotspotNameBangla: "Enter Hotspot Name (Bangla)",
        hotspotDetails: "Enter Hotspot Details (English)",
        hotspotDetailsBangla: "Enter Hotspot Details (Bangla)",
        buttonName: "Enter Button Name (English)",
        buttonNameBangla: "Enter Button Name (Bangla)",

      },
      bn: {
        hotspotName: "হটস্পটের নাম (ইংরেজি) লিখুন",
        hotspotNameBangla: "হটস্পটের নাম (বাংলা) লিখুন",
        hotspotDetails: "হটস্পটের বিস্তারিত (ইংরেজি) লিখুন",
        hotspotDetailsBangla: "হটস্পটের বিস্তারিত (বাংলা) লিখুন",
        buttonName: "বাটনের নাম (ইংরেজি) লিখুন",
        buttonNameBangla: "বাটনের নাম (বাংলা) লিখুন",
      
      },
    },
  };
  

  const getTranslation = (key) => translations[currentLanguage][key] || key;
  const getPlaceholder = (key) => translations.placeholders[currentLanguage][key];

  const handleSubmit = async (formData) => {
    const modifiedData = new FormData();
    const iconData = new FormData();
    const { content, url, ...data } = formData;
    let submitData = { ...data, hotspotSectionName: "sectionTwo" };

    if (hotspotType === "link") {
      if (urlOption === "OthersUrl") {
        submitData["moduleName"] = "OthersUrl";
        submitData["url"] = url;
      } else {
        submitData["moduleName"] = urlOption;
        submitData["url"] = urlOption;
      }
    } else if (hotspotType === "model") {
      if (modelOption === "Others") {
        submitData["moduleName"] = "others";
        submitData["content"] = content;
      } else if (modelOption === "file") {
        submitData["moduleName"] = "file";
      } else {
        submitData["moduleName"] = modelOption;
      }
    }

    try {
      if (icon) {
        iconData.append("file", icon);
      }

      if (icon) {
        const uploadedImage = await uploadImage(iconData).unwrap();
        // console.log(uploadedImage.files[0]);
        submitData["hotspotIcon"] = `/uploads/${uploadedImage.files[0]?.filename}`;
      }

      modifiedData.append("data", JSON.stringify(submitData));
      if (file) {
        modifiedData.append('file', file);
      }
     
      addHotSpot(modifiedData);

    } catch (error) {
      console.error("Error in image upload or form submission:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleIconChange = (e) => {
    const selectedFile = e.target.files[0];
    setIcon(selectedFile);
  };

  useEffect(() => {
    if (hIsSuccess) {
     router.push("/Dashboard/HotSpotTwo")
    }
  }, [ hIsSuccess]);

  return (
    <div>
       <div className="flex justify-end">
       <ButtonWithModal title={`Back`} back path={'/Dashboard/HotSpotTwo'}/>
      </div>
      <ZFormTwo
        isLoading={hIsLoading}
        isSuccess={hIsSuccess}
        isError={hIsError}
        error={hError}
        submit={handleSubmit}
        formType="create"
        data={data}
        buttonName="Create"  // Assuming "createButton" is in the translations file
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="hotspotNameEnglish"
            type="text"
            label={getTranslation("hotspotName")}
            placeholder={getPlaceholder("hotspotName")}
            required={1}
          />
          <ZInputTwo
            name="hotspotNameBangla"
            type="text"
            label={getTranslation("hotspotNameBangla")}
            placeholder={getPlaceholder("hotspotNameBangla")}
            required={1}

          />
          <ZInputTextArea
            name="hotspotDetailsEnglish"
            label={getTranslation("hotspotDetails")}
            placeholder={getPlaceholder("hotspotDetails")}
            required={1}

          />
          <ZInputTextArea
            name="hotspotDetailsBangla"
            label={getTranslation("hotspotDetailsBangla")}
            placeholder={getPlaceholder("hotspotDetailsBangla")}
            required={1}

          />
          <ZInputTwo
            name="hotspotButtonTextEnglish"
            type="text"
            label={getTranslation("buttonName")}
            placeholder={getPlaceholder("buttonName")}
            required={1}

          />
          <ZInputTwo
            name="hotspotButtonTextBangla"
            type="text"
            label={getTranslation("buttonNameBangla")}
            placeholder={getPlaceholder("buttonNameBangla")}
            required={1}

          />

          <div className="mt-4">
            <h3 className="font-medium">{getTranslation("uploadIcon")}</h3>
            <input
              required
              type="file"
              onChange={handleIconChange}
              accept=".jpeg, .jpg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip, .mp4, .mp3"
            />
          </div>

          <ZRadio
            name="hotspotType"
            label={getTranslation("hotspotType")}
            options={[
              { label: "Modal", value: "model" },
              { label: "Link", value: "link" },
            ]}
            onChange={(value) => setHotspotType(value)}
          />

          {hotspotType === "link" && (
            <ZSelect
              placeholder={getTranslation("selectUrlOption")}
              name="urlOption"
              label={getTranslation("urlType")}
              options={[
                { label: "Faq", value: "Faq" },
                { label: "Trace", value: "Trace" },
                { label: "Collaboration", value: "Collaboration" },
                { label: "OthersUrl", value: "OthersUrl" },
              ]}
              onSelectChange={(value) => {
                setUrlOption(value);
                setUrlValue("");
              }}
            />
          )}

          {hotspotType === "link" && urlOption === "OthersUrl" && (
            <ZInputTwo
              name="url"
              type="text"
              label={getTranslation("url")}
              placeholder={getTranslation("enterUrl")}
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          )}

          {hotspotType === "model" && (
            <ZSelect
              placeholder={getTranslation("selectModalOption")}
              name="modelOption"
              label={getTranslation("modalType")}
              options={[
                { label: "Faq", value: "Faq" },
                { label: "Trace", value: "Trace" },
                { label: "Collaboration", value: "Collaboration" },
                { label: "Others", value: "Others" },
                { label: "File", value: "file" },
              ]}
              onSelectChange={(value) => setModelOption(value)}
            />
          )}

          {hotspotType === "model" && modelOption === "Others" && (
            <div className="mt-4">
              <h3 className="font-medium">{getTranslation("sectionModal")}</h3>
              <ZInputTwo
                name="content.title"
                type="text"
                label={getTranslation("modalTitle")}
                placeholder={getTranslation("enterModalTitle")}
              />
              <ZInputTextArea
                name="content.description"
                label={getTranslation("modalDescription")}
                placeholder={getTranslation("enterModalDescription")}
              />
            </div>
          )}

          {hotspotType === "model" && modelOption === "file" && (
            <div className="mt-4">
              <h3 className="font-medium">{getTranslation("uploadFile")}</h3>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpeg, .jpg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip, .mp4, .mp3"
              />
            </div>
          )}



        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddHotSpotTwo;
