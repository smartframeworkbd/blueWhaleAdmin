"use client";

import React, { useContext } from "react";
import ZSelect from "@/components/Form/ZSelect";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddHeaderMutation } from "@/redux/Feature/Admin/HeaderApi/HeaderApi";
import { useGetContentIsMenuQuery } from "@/redux/Feature/content/contentApi";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const AddHeader = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const [addHeader, { isLoading, isError, error, isSuccess, data }] = useAddHeaderMutation();
  const { data: menuData, isLoading: menuLoading, isSuccess: menuSuccess } = useGetContentIsMenuQuery();


  const handleSubmit = (formData) => {
    // Map navLinks values to full objects using options
    formData.navLinks = formData.navLinks.map((value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? { label: option.label, value: option.value } : { label: "Unknown", value };
    });

    // Submit the modified formData
    addHeader(formData);
  };

  const handleCloseModal = () => {
    dispatch(setIsAddModalOpen(false));
  };

  // Create options based on menu data and static options
  const op =
    menuSuccess && Array.isArray(menuData.data)
      ? menuData.data.map((menu) => ({
          label: menu.slag,
          value: `/content/${menu.slag}`,
        }))
      : [];

  const options = [
    ...op,
    { label: "Administrative Login", value: "/AdminLogin" },
    { label: "Complainant Login", value: "/Login" },
    { label: "Complainant Register", value: "/Register" },
  ];

    // Translations for the labels and placeholders based on the current language
    const translations = {
      en: {
        navigationLinks: "Navigation Links",
        selectNavLinks: "Select navigation links",
        status: "Status",
        selectStatus: "Select status",
        active: "Active",
        inactive: "Inactive",
        createButton: "Create Header",
      },
      bn: {
        navigationLinks: "নেভিগেশন লিঙ্কগুলি",
        selectNavLinks: "নেভিগেশন লিঙ্কগুলি নির্বাচন করুন",
        status: "অবস্থা",
        selectStatus: "অবস্থা নির্বাচন করুন",
        active: "সক্রিয়",
        inactive: "নিষ্ক্রিয়",
        createButton: "হেডার তৈরি করুন",
      },
    };

  return (
    <ZFormTwo
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      submit={handleSubmit}
      closeModal={handleCloseModal}
      formType="create"
      data={data}
      buttonName={translations[currentLanguage].createButton}
    >
      <div className="grid grid-cols-1 gap-3 mt-10">
        {/* Navigation Links Multi-Select */}
        <ZSelect
          name="navLinks"
          mode={"multiple"}
          label={translations[currentLanguage].navigationLinks}
          options={options}
          placeholder={translations[currentLanguage].selectNavLinks}
          isMulti
        />

        {/* Status Dropdown */}
        <ZSelect
          name="status"
          label={translations[currentLanguage].status}
          options={[
            { label: translations[currentLanguage].active, value: true },
            { label: translations[currentLanguage].inactive, value: false },
          ]}
          placeholder={translations[currentLanguage].selectStatus}
        />
      </div>
    </ZFormTwo>
  );
};

export default AddHeader;
