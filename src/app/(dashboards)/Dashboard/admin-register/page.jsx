"use client";

import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZPhone from "@/components/Form/ZPhone";
import ZSelect from "@/components/Form/ZSelect";
import { useAddAdminMutation } from "@/redux/Feature/Admin/AdminApi/AdminApi";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { LanguageContext } from "@/context/LanguageContext";

const AdminRegister = () => {
  const dispatch = useAppDispatch();

  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Language translations
  const translations = {
    en: {
      formTitle: "Admin Registration",
      adminName: "Admin Name",
      adminEmail: "Admin Email",
      adminPhone: "Admin Phone",
      adminRole: "Admin Role",
      adminPermissions: "Admin Permissions",
      adminPassword: "Admin Password",
      placeholderName: "Enter admin name",
      placeholderEmail: "Enter admin email",
      placeholderPhone: "Enter phone number",
      placeholderRole: "Select role",
      placeholderPermissions: "Select permissions",
      placeholderPassword: "Enter a secure password",
      buttonCreate: "Create",
    },
    bn: {
      formTitle: "অ্যাডমিন নিবন্ধন",
      adminName: "অ্যাডমিন নাম",
      adminEmail: "অ্যাডমিন ইমেইল",
      adminPhone: "অ্যাডমিন ফোন",
      adminRole: "অ্যাডমিন ভূমিকা",
      adminPermissions: "অ্যাডমিন অনুমতি",
      adminPassword: "অ্যাডমিন পাসওয়ার্ড",
      placeholderName: "অ্যাডমিন নাম লিখুন",
      placeholderEmail: "অ্যাডমিন ইমেইল লিখুন",
      placeholderPhone: "ফোন নম্বর লিখুন",
      placeholderRole: "ভূমিকা নির্বাচন করুন",
      placeholderPermissions: "অনুমতি নির্বাচন করুন",
      placeholderPassword: "একটি নিরাপদ পাসওয়ার্ড লিখুন",
      buttonCreate: "তৈরি করুন",
    },
  };

  const t = translations[currentLanguage]; // Dynamically fetch translations based on context

  // Mutation hook
  const [
    addFaq,
    { isLoading: FIsLoading, isError: FIsError, error: FError, isSuccess: FIsSuccess, data },
  ] = useAddAdminMutation();

  const handleSubmit = (data) => {
    addFaq(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ZFormTwo
        isLoading={FIsLoading}
        isSuccess={FIsSuccess}
        isError={FIsError}
        error={FError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName={t.buttonCreate}
      >
        {/* Admin Full Name */}
        <div className="mb-6">
          <ZInputTwo
            name="adminFullName"
            type="text"
            label={t.adminName}
            defaultKey=""
            required
            placeholder={t.placeholderName}
          />
        </div>

        {/* Admin Email */}
        <div className="mb-6">
          <ZInputTwo
            name="adminEmail"
            type="email"
            label={t.adminEmail}
            defaultKey=""
            required
            placeholder={t.placeholderEmail}
          />
        </div>

        {/* Admin Phone */}
        <div className="mb-6">
          <ZPhone
            label={t.adminPhone}
            name="adminPhone"
            placeholder={t.placeholderPhone}
          />
        </div>

        {/* Admin Role */}
        <div className="mb-6">
          <ZSelect
            name="adminRole"
            label={t.adminRole}
            defaultKey=""
            required
            options={[
              { label: currentLanguage === "en" ? "Editor" : "সম্পাদক", value: "editor" },
              { label: currentLanguage === "en" ? "Sub-admin" : "সহকারী অ্যাডমিন", value: "subadmin" },
            ]}
            placeholder={t.placeholderRole}
          />
        </div>

        {/* Admin Permissions */}
        <div className="mb-6">
          <ZSelect
            name="adminPermissions"
            label={t.adminPermissions}
            defaultKey=""
            required
            options={[
              { label: currentLanguage === "en" ? "Contents" : "বিষয়বস্তু", value: "content" },
              { label: currentLanguage === "en" ? "Grievances" : "অভিযোগ", value: "userGrievance" },
              { label: currentLanguage === "en" ? "Dashboard" : "ড্যাশবোর্ড", value: "dashboard" },
              { label: currentLanguage === "en" ? "Users" : "ব্যবহারকারীরা", value: "user" },
              { label: currentLanguage === "en" ? "Admins" : "অ্যাডমিন", value: "admins" },
              { label: currentLanguage === "en" ? "Breaking News" : "সর্বশেষ খবর", value: "breakingnews" },
              { label: currentLanguage === "en" ? "FAQ" : "প্রশ্নোত্তর", value: "faq" },
              { label: currentLanguage === "en" ? "Header" : "হেডার", value: "header" },
              { label: currentLanguage === "en" ? "Footer Section" : "ফুটার বিভাগ", value: "footersection" },
            ]}
            placeholder={t.placeholderPermissions}
            mode="multiple"
          />
        </div>

        {/* Admin Password */}
        <div className="mb-6">
          <ZInputTwo
            name="adminPassword"
            type="password"
            label={t.adminPassword}
            defaultKey=""
            required
            placeholder={t.placeholderPassword}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AdminRegister;
