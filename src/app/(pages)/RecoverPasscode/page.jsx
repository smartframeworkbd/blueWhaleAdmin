"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoverPasscodeMutation } from '@/redux/Feature/auth/authApi';
import ZFormTwo from '@/components/Form/ZFormTwo';
import ZInputTwo from '@/components/Form/ZInputTwo';
import { LanguageContext } from "@/context/LanguageContext";
import getTranslation from "@/context/getTranslationUtility";
import labels from "../../../translationData/HomePage.json";

const LoginLabels = labels.LoginLabels;

const RecoverPasscode = () => {
  const [recoverPasscode, { isLoading, isError, isSuccess, error }] = useRecoverPasscodeMutation();
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const router = useRouter();

  // Function to change the language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const handleSubmit = async (data) => {
    try {
      await recoverPasscode(data).unwrap(); // Send data to backend
      router.push('/Login');
    } catch (err) {
      console.error("Failed to send passcode:", err);
    }
  };

  // Tab labels:
  const RememberedyourPasscode = getTranslation("RememberedyourPasscode.tabTitle", currentLanguage, LoginLabels);
  const LogInHere = getTranslation("LogInHere.tabTitle", currentLanguage, LoginLabels);
  const RecoverPasscodeLabel = getTranslation("RecoverPasscode.tabTitle", currentLanguage, LoginLabels);
  const Recovertext = getTranslation("Recovertext.tabTitle", currentLanguage, LoginLabels);
  const PhoneNumber = getTranslation("PhoneNumber.tabTitle", currentLanguage, LoginLabels);
  const enterPhoneNumber = getTranslation("enterPhoneNumber.tabTitle", currentLanguage, LoginLabels);
  const SendPasscode = getTranslation("SendPasscode.tabTitle", currentLanguage, LoginLabels);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h4 className="text-2xl font-semibold text-center mb-6">{RecoverPasscodeLabel}</h4>
        <h6>{Recovertext}</h6>
        <ZFormTwo
          isLoading={isLoading}
          error={error}
          isError={isError}
          isSuccess={isSuccess}
          submit={handleSubmit}  // Form data will be passed here
          buttonName={SendPasscode}
        >
          <div className="py-8 text-base space-y-6 text-gray-700">
            <div className="relative mb-8">
              <ZInputTwo
                name="userPhone"
                type="text"
                label={PhoneNumber}
                defaultKey={""}
                placeholder={enterPhoneNumber}
                required={1}
              />
            </div>
            <p className="text-sm text-gray-500">
              {RememberedyourPasscode}
              <Link href="/Login" className="underline text-blue-500">{LogInHere}</Link>
            </p>
          </div>
        </ZFormTwo>
      </div>
    </div>
  );
};

export default RecoverPasscode;
