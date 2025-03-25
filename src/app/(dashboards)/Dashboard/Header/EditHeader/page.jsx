"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateHeaderMutation } from "@/redux/Feature/Admin/HeaderApi/HeaderApi";
import { useGetContentIsMenuQuery } from "@/redux/Feature/content/contentApi";
import { LanguageContext } from "@/context/LanguageContext";

const EditHeader = ({ selectedHeader }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const dispatch = useAppDispatch();
  const [updateHeader, { isLoading, isError, error, isSuccess, data }] = useUpdateHeaderMutation();
  const { data: menuData, isLoading: menuLoading, isSuccess: menuSuccess } = useGetContentIsMenuQuery();

  const handleSubmit = (formData) => {
    formData.navLinks = formData.navLinks.map((value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? { label: option.label, value: option.value } : { label: "Unknown", value };
    });
    updateHeader({ id: selectedHeader?.id, data: formData });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen(false));
  };

  const op = menuSuccess && Array.isArray(menuData.data)
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
        selectNavigationLinks: "Select navigation links",
        status: "Status",
        selectStatus: "Select status",
        active: "Active",
        inactive: "Inactive",
        updateButton: "Update Header",
      },
      bn: {
        navigationLinks: "ন্যাভিগেশন লিঙ্ক",
        selectNavigationLinks: "ন্যাভিগেশন লিঙ্ক নির্বাচন করুন",
        status: "অবস্থা",
        selectStatus: "অবস্থা নির্বাচন করুন",
        active: "সক্রিয়",
        inactive: "নিষ্ক্রিয়",
        updateButton: "হেডার আপডেট করুন",
      },
    };

  return (
    <div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="edit"
        data={data}
        buttonName={translations[currentLanguage].updateButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Navigation Links Multi-Select */}
          <ZSelect
            name="navLinks"
            mode={"multiple"}
            label={translations[currentLanguage].navigationLinks}
            options={options}
            value={selectedHeader?.navLinks || []}
            placeholder={translations[currentLanguage].selectNavigationLinks}
          />

          {/* Status Dropdown */}
          <ZSelect
            name="status"
            label={translations[currentLanguage].status}
            options={[
              { label: translations[currentLanguage].active, value: true },
              { label: translations[currentLanguage].inactive, value: false },
            ]}
            value={selectedHeader?.status}
            placeholder={translations[currentLanguage].selectStatus}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditHeader;
