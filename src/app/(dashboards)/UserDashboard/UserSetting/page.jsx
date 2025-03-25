"use client";

import React, { useContext, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { 
  useChangePasscodeMutation, 
  useGetUserQuery, 
  useUpdateSingleUserMutation 
} from "@/redux/Feature/auth/authApi";
import Skeleton from "@/components/Skeleton/Skeleton";
import LoadingPage from "@/components/LoadingPage";
import { LanguageContext } from "@/context/LanguageContext";

const UserSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { currentLanguage } = useContext(LanguageContext);

  const {
    data: userData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetUserQuery(user?.Id);

  const [updateUser, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateSingleUserMutation();
    
  const [
    changePassword,
    { isLoading: passwordLoading, isSuccess: passwordSuccess },
  ] = useChangePasscodeMutation();

  const handleSubmit = (data) => {
    const profileUpdateData = {
      userEmail: data?.userEmail,
      userName: data?.userName,
    };
    updateUser({ id: user?.Id, data: profileUpdateData });

    if (data.oldPassword && data.newPassword) {
      const passwordData = {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        userId: user?.Id,
      };
      changePassword(passwordData);
    }
  };

  if (profileLoading) {
    return <Skeleton />;
  }

  if (profileError) {
    return <div>Error loading profile</div>;
  }

  // Translations
  const translations = {
    en: {
      updatePassword: "Update Password",
      oldPassword: "Old Password",
      newPassword: "New Password",
      placeholderOldPassword: "Enter your old password",
      placeholderNewPassword: "Enter your new password",
      email: "Email",
      phone: "Phone",
      nid: "NID",
      bid: "BID",
      passport: "Passport",
      country: "Country",
      nationality: "Nationality",
      address: "Address",
    },
    bn: {
      updatePassword: "পাসওয়ার্ড আপডেট করুন",
      oldPassword: "পুরানো পাসওয়ার্ড",
      newPassword: "নতুন পাসওয়ার্ড",
      placeholderOldPassword: "আপনার পুরানো পাসওয়ার্ড লিখুন",
      placeholderNewPassword: "আপনার নতুন পাসওয়ার্ড লিখুন",
      email: "ইমেইল",
      phone: "ফোন",
      nid: "এনআইডি",
      bid: "বিআইডি",
      passport: "পাসপোর্ট",
      country: "দেশ",
      nationality: "জাতীয়তা",
      address: "ঠিকানা",
    },
  };

  const labels = translations[currentLanguage];

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-56 h-[150px] left-5 lg:mt-[-40px]">
              <img
                className="h-[180px] w-[180px] rounded-full absolute object-cover"
                src={`https://ui-avatars.com/api/?name=${userData?.data?.userName?.charAt(0) || "U"}`}
                alt="User Avatar"
              />
            </div>

            <div className="flex flex-col justify-center items-center bg-[#bdcef4] px-6 rounded-t-[30px] w-[300px] h-[100%] gap-y-2 mt-12">
              <h1 className="text-[#042656] mt-3 text-[16px] font-sans font-semibold">
                {userData?.data?.userName || "User"}
              </h1>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {labels.email}: {userData?.data?.userEmail || "user@example.com"}
              </span>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {labels.phone}: {userData?.data?.userPhone || "N/A"}
              </span>
              {userData?.data?.nid && (
                <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                  {labels.nid}: {userData?.data?.nid}
                </span>
              )}
              {userData?.data?.bid && (
                <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                  {labels.bid}: {userData?.data?.bid}
                </span>
              )}
              {userData?.data?.passport && (
                <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                  {labels.passport}: {userData?.data?.passport}
                </span>
              )}
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {labels.country}: {userData?.data?.country || "N/A"}
              </span>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {labels.nationality}: {userData?.data?.nationality || "N/A"}
              </span>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                {labels.address}: {userData?.data?.address || "N/A"}
              </span>
            </div>
          </div>

          <div>
            <ZFormTwo
              isLoading={updateLoading || passwordLoading}
              isSuccess={updateSuccess || passwordSuccess}
              submit={handleSubmit}
              buttonName={"Submit"}
            >
              <div>
                <h1 className="text-2xl mt-2 text-center">{labels.updatePassword}</h1>
              </div>

              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <ZInputTwo
                    name="oldPassword"
                    type="password"
                    label={labels.oldPassword}
                    placeholder={labels.placeholderOldPassword}
                    required
                  />
                </div>
                <div className="relative">
                  <ZInputTwo
                    name="newPassword"
                    type="password"
                    label={labels.newPassword}
                    placeholder={labels.placeholderNewPassword}
                    required
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

export default UserSetting;
