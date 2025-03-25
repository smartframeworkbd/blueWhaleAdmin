/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZEmail from "@/components/Form/ZEmail";
import { 
  useChangePasswordMutation, 
  useGetAdminQuery, 
  useUpdateAdminMutation 
} from "@/redux/Feature/auth/authApi";
import Skeleton from "@/components/Skeleton/Skeleton";
import LoadingPage from "@/components/LoadingPage";
import { LanguageContext } from "@/context/LanguageContext";

const Setting = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [isLoading, setIsLoading] = useState(false); 
  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  // Translation JSON
  const translations = {
    en: {
      update_profile: "Update Profile",
      submit: "Submit",
      name: "Name",
      enter_name: "Enter your name",
      email: "Email",
      enter_email: "Enter your email",
      old_password: "Old Password",
      enter_old_password: "Enter your old password",
      new_password: "New Password",
      enter_new_password: "Enter your new password",
      loading_profile_error: "Error loading profile",
      admin_avatar: "Admin Avatar",
      grs_admin: "Grs Admin"
    },
    bn: {
      update_profile: "প্রোফাইল আপডেট করুন",
      submit: "জমা দিন",
      name: "নাম",
      enter_name: "আপনার নাম লিখুন",
      email: "ইমেল",
      enter_email: "আপনার ইমেল লিখুন",
      old_password: "পুরানো পাসওয়ার্ড",
      enter_old_password: "আপনার পুরানো পাসওয়ার্ড লিখুন",
      new_password: "নতুন পাসওয়ার্ড",
      enter_new_password: "আপনার নতুন পাসওয়ার্ড লিখুন",
      loading_profile_error: "প্রোফাইল লোড করতে সমস্যা হয়েছে",
      admin_avatar: "অ্যাডমিন অবতার",
      grs_admin: "জিআরএস অ্যাডমিন"
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || key;

  const {
    data: adminData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetAdminQuery(admin?.Id);

  const [updateAdmin, { isLoading: updateLoading, isSuccess: updateSuccess, data: updateAdminData }] =
    useUpdateAdminMutation();

  const [changePassword, { isLoading: passwordLoading, isSuccess: passwordSuccess }] = 
    useChangePasswordMutation();

  const handleSubmit = (data) => {
    const profileUpdateData = {
      adminEmail: data?.adminEmail,
      adminFullName: data?.adminFullName,
    };
    updateAdmin({ id: admin?.Id, data: profileUpdateData });

    if (data.oldPassword && data.newPassword) {
      const passwordData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      changePassword(passwordData);
    }
  };

  if (profileLoading) {
    return <Skeleton />;
  }

  if (profileError) {
    return <div>{t("loading_profile_error")}</div>;
  }

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-56 h-[150px] left-5 lg:mt-[-70px]">
              <img
                className="h-[180px] w-[180px] rounded-full absolute object-cover"
                src={`https://ui-avatars.com/api/?name=${adminData?.data?.adminFullName?.charAt(0) || "A"}`}
                alt={t("admin_avatar")}
              />
            </div>

            <div className="flex flex-col justify-center items-center bg-[#bdcef4] px-6 rounded-t-[30px] w-[300px] h-[190px] gap-y-2">
              <h1 className="text-[#042656] mt-3 text-[16px] font-sans font-semibold">
                {adminData?.data?.adminFullName || t("grs_admin")}
              </h1>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {t("email")}: {adminData?.data?.adminEmail || "superadmin@gmail.com"}
              </span>
            </div>
          </div>

          <div>
            <ZFormTwo
              isLoading={updateLoading || passwordLoading}
              isSuccess={updateSuccess || passwordSuccess}
              submit={handleSubmit}
              buttonName={t("submit")}
              data={updateAdminData}
            >
              <div>
                <h1 className="text-2xl mt-2 text-center">{t("update_profile")}</h1>
              </div>

              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <ZInputTwo
                    required={1}
                    name="adminFullName"
                    type="text"
                    label={t("name")}
                    defaultKey={""}
                    placeholder={t("enter_name")}
                    value={adminData?.data?.adminFullName}
                  />
                </div>
                <div className="relative">
                  <ZEmail label={t("email")} name={"adminEmail"} value={adminData?.data?.adminEmail} />
                </div>
                <div className="relative">
                  <ZInputTwo
                    name="oldPassword"
                    type="password"
                    label={t("old_password")}
                    defaultKey={""}
                    placeholder={t("enter_old_password")}
                  />
                </div>
                <div className="relative">
                  <ZInputTwo
                    name="newPassword"
                    type="password"
                    label={t("new_password")}
                    defaultKey={""}
                    placeholder={t("enter_new_password")}
                  />
                </div>
              </div>
            </ZFormTwo>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
