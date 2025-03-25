"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateAdminMutation } from "@/redux/Feature/Admin/AdminApi/AdminApi";
import { LanguageContext } from "@/context/LanguageContext"; // Language context

const EditAdmin = ({ selectedAdmin }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  // Translations for the labels and placeholders based on the current language
  const translations = {
    en: {
      adminName: "Admin Name",
      adminEmail: "Admin Email",
      adminPhone: "Phone Number",
      role: "Role",
      permissions: "Permissions",
      updateButton: "Update",
      enterFullName: "Enter admin's full name",
      enterEmail: "Enter admin's email",
      enterPhone: "Enter admin's phone number",
      selectRole: "Select role",
      selectPermissions: "Select permissions",
    },
    bn: {
      adminName: "অ্যাডমিনের নাম",
      adminEmail: "অ্যাডমিনের ইমেইল",
      adminPhone: "ফোন নম্বর",
      role: "ভুমিকা",
      permissions: "অনুমতিসমূহ",
      updateButton: "আপডেট",
      enterFullName: "অ্যাডমিনের পূর্ণ নাম লিখুন",
      enterEmail: "অ্যাডমিনের ইমেইল লিখুন",
      enterPhone: "অ্যাডমিনের ফোন নম্বর লিখুন",
      selectRole: "ভুমিকা নির্বাচন করুন",
      selectPermissions: "অনুমতিসমূহ নির্বাচন করুন",
    },
  };

  const dispatch = useAppDispatch();

  const [
    updateAdmin,
    {
      isLoading: updateLoading,
      error: updateError,
      isError: updateIsError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateAdminMutation();

  const handleSubmit = (data) => {
    updateAdmin({ data, id: selectedAdmin?.id });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
      <ZFormTwo
        isLoading={updateLoading}
        isSuccess={updateSuccess}
        isError={updateIsError}
        error={updateError}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="edit"
        buttonName={translations[currentLanguage].updateButton}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="adminFullName"
            type="text"
            label={translations[currentLanguage].adminName}
            value={selectedAdmin?.adminFullName || ""}
            placeholder={translations[currentLanguage].enterFullName}
          />
          <ZInputTwo
            name="adminEmail"
            type="email"
            label={translations[currentLanguage].adminEmail}
            value={selectedAdmin?.adminEmail || ""}
            placeholder={translations[currentLanguage].enterEmail}
          />
          <ZInputTwo
            name="adminPhone"
            type="text"
            label={translations[currentLanguage].adminPhone}
            value={selectedAdmin?.adminPhone || ""}
            placeholder={translations[currentLanguage].enterPhone}
          />
          <ZSelect
            name="adminRole"
            label={translations[currentLanguage].role}
            options={[
              { label: "Editor", value: "editor" },
              { label: "Sub-admin", value: "subadmin" },
            ]}
            value={selectedAdmin?.adminRole || ""}
            placeholder={translations[currentLanguage].selectRole}
          />

          <ZSelect
            name="adminPermissions"
            label={translations[currentLanguage].permissions}
            mode="multiple"
            options={[
              { label: "Contents", value: "content" },
              { label: "Grievances", value: "userGrievance" },
              { label: "DashBoard", value: "dashboard" },
              { label: "Users", value: "user" },
              { label: "Admins", value: "admins" },
              { label: "Breaking News", value: "breakingnews" },
              { label: "Faq", value: "faq" },
              { label: "Header", value: "header" },
              { label: "HotSpot Section One", value: "hotSpot" },
              { label: "HotSpot Section Two", value: "hotSpotTwo" },
              { label: "Footer Section", value: "footersection" },
              { label: "Welcome Section", value: "welcomesection" },
              { label: "Email", value: "email" },
            ]}
            value={selectedAdmin?.adminPermissions || ""}
            placeholder={translations[currentLanguage].selectPermissions}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditAdmin;
