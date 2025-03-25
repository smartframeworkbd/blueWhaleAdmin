/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import {
  useUpdateContentMutation,
  useUploadImageMutation,
} from "@/redux/Feature/Admin/contentApi/contentApi";
import { LanguageContext } from "@/context/LanguageContext";

const EditContent = ({ selectedContent }) => {
  const { currentLanguage } = useContext(LanguageContext) || {
    currentLanguage: "en",
  };
  const [updateContent, { isLoading, isSuccess, isError, data: updatedData }] =
  useUpdateContentMutation();
  const [uploadImage] = useUploadImageMutation();
  const [contentState, setContentState] = useState({ ...selectedContent });
  const [imageUrlFile, setImageUrlFile] = useState(null);
  const [videoUrlFile, setVideoUrlFile] = useState(null);
  const [metaImageFile, setMetaImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const metaImageInputRef = useRef(null);
  const dispatch = useAppDispatch();
 

  useEffect(() => {
    setContentState({ ...selectedContent });
  }, [selectedContent]);

  const handleRemoveImage = (type) => {
    setContentState((prevState) => ({
      ...prevState,
      [type]: null,
    }));

    switch (type) {
      case "imageUrl":
        setImageUrlFile(null);
        selectedContent.imageUrl = null;
        if (imageInputRef.current) imageInputRef.current.value = null;
        break;
      case "videoUrl":
        setVideoUrlFile(null);
        selectedContent.videoUrl = null;
        if (videoInputRef.current) videoInputRef.current.value = null; 
        break;
      case "meta_image":
        setMetaImageFile(null);
        selectedContent.meta_image = null;
        if (metaImageInputRef.current) metaImageInputRef.current.value = null;
        break;
      default:
        break;
    }
  };
  

  const translations = {
    en: {
      title: "Content Title",
      slug: "Content Slug",
      subTitle: "Content Subtitle",
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
      update: "Update",
    },
    bn: {
      title: "কনটেন্ট শিরোনাম",
      slug: "কনটেন্ট স্লাগ",
      subTitle: "কনটেন্ট সাবটাইটেল",
      description: "বিবরণ",
      uploadImage: "ছবি আপলোড করুন",
      uploadVideo: "ভিডিও আপলোড করুন",
      externalVideoUrl: "বাহ্যিক ভিডিও লিঙ্ক",
      buttonText: "বোতামের পাঠ্য",
      buttonLink: "বোতাম লিঙ্ক",
      status: "স্ট্যাটাস",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      metaTitle: "মেটা শিরোনাম",
      metaDescription: "মেটা বিবরণ",
      metaImageUpload: "মেটা ছবি আপলোড করুন",
      update: "আপডেট করুন",
    },
  };

  const handleSubmit = async (data) => {
    let postData = { ...data };

    const formData = new FormData();
    if (imageUrlFile) {
      formData.append("file", imageUrlFile);
      const imageResponse = await uploadImage(formData).unwrap();
      postData["imageUrl"] = `/uploads/${imageResponse.files[0].filename}`;
    } else {
      postData["imageUrl"] = selectedContent.imageUrl;
    }

    const videoFormData = new FormData();
    if (videoUrlFile) {
      videoFormData.append("file", videoUrlFile);
      const videoResponse = await uploadImage(videoFormData).unwrap();
      postData["videoUrl"] = `/uploads/${videoResponse.files[0].filename}`;
    } else {
      postData["videoUrl"] = selectedContent.videoUrl;
    }

    const metaFormData = new FormData();
    if (metaImageFile) {
      metaFormData.append("file", metaImageFile);
      const metaResponse = await uploadImage(metaFormData).unwrap();
      postData["meta_image"] = `/uploads/${metaResponse.files[0].filename}`;
    } else {
      postData["meta_image"] = selectedContent.meta_image;
    }

    try {
      await updateContent({ id: selectedContent.id, data: postData });
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <ZFormTwo
        submit={handleSubmit}
        data={updatedData}
        closeModal={handleCloseModal}
        formType="edit"
        buttonName={translations[currentLanguage].update}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ZInputTwo
            name="title"
            label={translations[currentLanguage].title}
            value={selectedContent.title || ""}
            placeholder={translations[currentLanguage].title}
          />
          <ZInputTwo
            name="slag"
            label={translations[currentLanguage].slug}
            value={selectedContent.slag || ""}
            placeholder={translations[currentLanguage].slug}
          />
          <div className="lg:col-span-2">
            <ZInputTwo
              name="subTitle"
              label={translations[currentLanguage].subTitle}
              value={selectedContent.subTitle || ""}
              placeholder={translations[currentLanguage].subTitle}
            />
          </div>
          <div className="lg:col-span-2">
            <ZInputTextArea
              name="description"
              label={translations[currentLanguage].description}
              value={selectedContent.description || ""}
              placeholder={translations[currentLanguage].description}
            />
          </div>

          <div className="mt-4">
            <label className="font-medium">
              {translations[currentLanguage].uploadImage}
            </label>
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => setImageUrlFile(e.target.files[0])}
              accept="image/*"
              className="p-2 rounded-md"
            />

            {contentState.imageUrl && (
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedContent.imageUrl}`}
                  alt=""
                  className="w-[150px] h-[100px]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage("imageUrl")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium">
              {translations[currentLanguage].uploadVideo}
            </label>
            <input
              type="file"
              ref={videoInputRef}
              onChange={(e) => setVideoUrlFile(e.target.files[0])}
              accept="video/*"
              className="p-2 rounded-md"
            />
            {contentState.videoUrl && (
               <div className="flex items-center gap-4 mt-2">
               <img
                 src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedContent.videoUrl}`}
                 alt=""
                 className="w-[150px] h-[100px]"
               />
               <button
                 type="button"
                 onClick={() => handleRemoveImage("videoUrl")}
                 className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
               >
                 Remove
               </button>
             </div>
            )}
          </div>

          <ZInputTwo
            name="external_videoUrl"
            label={translations[currentLanguage].externalVideoUrl}
            value={selectedContent.external_videoUrl || ""}
            placeholder={translations[currentLanguage].externalVideoUrl}
          />
          <ZInputTwo
            name="buttonText"
            label={translations[currentLanguage].buttonText}
            value={selectedContent.buttonText || ""}
            placeholder={translations[currentLanguage].buttonText}
          />
          <ZInputTwo
            name="buttonLink"
            label={translations[currentLanguage].buttonLink}
            value={selectedContent.buttonLink || ""}
            placeholder={translations[currentLanguage].buttonLink}
          />
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            value={selectedContent.status}
            placeholder={translations[currentLanguage].status}
          />
          <ZInputTwo
            name="meta_title"
            label={translations[currentLanguage].metaTitle}
            value={selectedContent.meta_title || ""}
            placeholder={translations[currentLanguage].metaTitle}
          />

          <div className="mt-4">
            <label className="font-medium">
              {translations[currentLanguage].metaImageUpload}
            </label>
            <input
              type="file"
              ref={metaImageInputRef}
              onChange={(e) => setMetaImageFile(e.target.files[0])}
              accept="image/*"
              className="p-2 rounded-md"
            />
            {contentState.meta_image && (
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedContent.meta_image}`}
                  alt=""
                  className="w-[150px] h-[100px]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage("meta_image")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ZInputTextArea
              name="meta_description"
              label={translations[currentLanguage].metaDescription}
              value={selectedContent.meta_description || ""}
              placeholder={translations[currentLanguage].metaDescription}
            />
          </div>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditContent;
