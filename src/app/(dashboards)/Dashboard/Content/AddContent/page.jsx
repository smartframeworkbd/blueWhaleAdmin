"use client";

import React, { useContext, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Upload } from "antd";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddContentMutation, useUploadImageMutation } from "@/redux/Feature/Admin/contentApi/contentApi";
import { LanguageContext } from "@/context/LanguageContext";

const AddContent = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [slug, setSlug] = useState("")
  const dispatch = useAppDispatch();
  const [imageUrlFile, setImageUrlFile] = useState(null);
  const [videoUrlFile, setVideoUrlFile] = useState(null);
  const [metaImageFile, setMetaImageFile] = useState(null);
  // console.log(metaImageFile)
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  };
  const [addContent, { isLoading, isSuccess, isError, data: CEGdata , error: cError}] =
    useAddContentMutation();
  const [uploadImage] = useUploadImageMutation();

  const handleSubmit = async (data) => {

    let postData =
    {
      ...data , type : "article", isMenu: true , parent: 0

    }


    const formData = new FormData();
    const formData1 = new FormData();
    const formData2 = new FormData();

    if (imageUrlFile) {
      formData.append("file", imageUrlFile);
      const imageUrlResponse = await uploadImage(formData).unwrap();
      // console.log(imageUrlResponse);
      postData["imageUrl"] = `/uploads/${imageUrlResponse.files[0].filename}`

    }
    if (videoUrlFile) {
      formData1.append("file", videoUrlFile);
      const imageUrlResponse = await uploadImage(formData1).unwrap();
      // console.log(imageUrlResponse);
      postData["videoUrl"] = `/uploads/${imageUrlResponse.files[0].filename}`
    }
    if (metaImageFile) {
      formData2.append("file", metaImageFile);
      const imageUrlResponse = await uploadImage(formData2).unwrap();
      // console.log(imageUrlResponse);
      postData["meta_image"] = `/uploads/${imageUrlResponse.files[0].filename}`
    }


    try {
      const response = await addContent(postData).unwrap();
      // console.log("Content added successfully:", response);
    } 
    
    catch (error) {
      console.error("Error adding content:", error);
    }



  };



  const translations = {
    en: {
      title: "Content Title",
      slug: "Content Slug",
      subtitle: "Content Subtitle",
      description: "Description",
      uploadImage: "Upload Image",
      uploadVideo: "Upload Video",
      externalVideoUrl: "External Video URL",
      buttonText: "Button Text",
      buttonLink: "Button Link",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      metaImageUpload: "Meta Image Upload",
      createButton: "Create",
    },
    bn: {
      title: "বিষয়বস্তুর শিরোনাম",
      slug: "বিষয়বস্তুর স্লাগ",
      subtitle: "বিষয়বস্তুর সাবটাইটেল",
      description: "বর্ণনা",
      uploadImage: "ছবি আপলোড করুন",
      uploadVideo: "ভিডিও আপলোড করুন",
      externalVideoUrl: "বাহ্যিক ভিডিও URL",
      buttonText: "বোতামের লেখা",
      buttonLink: "বোতামের লিংক",
      status: "স্ট্যাটাস",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      metaTitle: "মেটা শিরোনাম",
      metaDescription: "মেটা বর্ণনা",
      metaImageUpload: "মেটা ছবি আপলোড করুন",
      createButton: "তৈরি করুন",
    },
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  const handleChange = (data) => {
    const slugData = generateSlug(data)
    setSlug(slugData)
    // console.log(slug)

  }
  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <ZFormTwo
        submit={handleSubmit}
        data={CEGdata}
        closeModal={handleCloseAndOpen}
        formType="create"
        buttonName="Create"
        isLoading={isLoading}
        isError={isError}
        error={cError}
        isSuccess={isSuccess}
      >
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ZInputTwo
            name="title"
            label={translations[currentLanguage].title}
            placeholder={translations[currentLanguage].title}
            onSelectChange={handleChange}
            required={1}
          />
          <ZInputTwo
            value={slug}
            name="slag"
            label={translations[currentLanguage].slug}
            placeholder={translations[currentLanguage].slug}
            required={1}
          />
          <ZInputTwo
            name="subTitle"
            label={translations[currentLanguage].subtitle}
            placeholder={translations[currentLanguage].subtitle}
          />
          <ZInputTextArea
            name="description"
            label={translations[currentLanguage].description}
            placeholder={translations[currentLanguage].description}
          />
          <div className="mt-4">
            <label className="font-medium">{translations[currentLanguage].uploadImage}</label>
            <input
              type="file"
              onChange={(e) => setImageUrlFile(e.target.files[0])}
              accept="image/*"
              className="p-2 rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="font-medium">{translations[currentLanguage].uploadVideo}</label>
            <input
              type="file"
              onChange={(e) => setVideoUrlFile(e.target.files[0])}
              accept="video/*"
              className="p-2 rounded-md"
            />
          </div>
          <ZInputTwo
            name="external_videoUrl"
            label={translations[currentLanguage].externalVideoUrl}
            placeholder={translations[currentLanguage].externalVideoUrl}
          />
          <ZInputTwo
            name="buttonText"
            label={translations[currentLanguage].buttonText}
            placeholder={translations[currentLanguage].buttonText}
          />
          <ZInputTwo
            name="buttonLink"
            label={translations[currentLanguage].buttonLink}
            placeholder={translations[currentLanguage].buttonLink}
          />
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            placeholder={translations[currentLanguage].status}
          />
          <ZInputTwo
            name="meta_title"
            label={translations[currentLanguage].metaTitle}
            placeholder={translations[currentLanguage].metaTitle}
          />
          <ZInputTextArea
            name="meta_description"
            label={translations[currentLanguage].metaDescription}
            placeholder={translations[currentLanguage].metaDescription}
          />
          <div className="mt-4 mb-5">
            <label className="font-medium">{translations[currentLanguage].metaImageUpload}</label>
            <input
              type="file"
              onChange={(e) => setMetaImageFile(e.target.files[0])}
              accept="image/*"
              className="p-2 rounded-md"
            />
          </div>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddContent;
