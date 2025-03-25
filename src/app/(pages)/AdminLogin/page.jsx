"use client";
import { useContext, useEffect } from "react";
import { useLoginMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { LanguageContext } from "@/context/LanguageContext";
import getTranslation from "@/context/getTranslationUtility";
import labels from "../../../translationData/HomePage.json";
import DashboardTitle from "@/components/DashboardTitle/DashboardTitle";
const adminLogins = labels.adminLogins;

const AdminLogin = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  // console.log(currentLanguage)
  const [
    login,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: loginData,
    },
  ] = useLoginMutation();
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("authToken") && Cookies.get("authToken")
    if (token) {
      router.push("/Dashboard/AdminHome");
    }
  }, [router]);


  
  const handleSubmit = async (data) => {
    try {
      const { data: loginData } = await login(data);
      if (loginData?.data?.token && loginData?.data?.data) {
        localStorage.setItem("authToken", loginData?.data?.token);
        localStorage.setItem("adminInfo", JSON.stringify(loginData?.data?.data));
        Cookies.set("authToken", loginData?.data?.token, {
          expires: 365,
          path: "/",
          secure: false,
        });
        router.push("/Dashboard/AdminHome");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


   //Tab labels:
   const admnins = getTranslation(
    "admnins.tabTitle",
    currentLanguage,
    adminLogins
  );
   const regemail = getTranslation(
    "regemail.tabTitle",
    currentLanguage,
    adminLogins
  );
   const passwwords = getTranslation(
    "passwwords.tabTitle",
    currentLanguage,
    adminLogins
  );
   const loginButton = getTranslation(
    "loginButton.tabTitle",
    currentLanguage,
    adminLogins
  );
   const adminTitle = getTranslation(
    "adminTitle.tabTitle",
    currentLanguage,
    adminLogins
  );
   const enterEmail = getTranslation(
    "enterEmail.tabTitle",
    currentLanguage,
    adminLogins
  );
   const enterPass = getTranslation(
    "enterPass.tabTitle",
    currentLanguage,
    adminLogins
  );

  return (
    <>
 <DashboardTitle windowTitle={"প্রশাসনিক লগইন"}/>
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:w-[40%] sm:mx-auto">
    <img 
      src="/logo.jpeg"
      alt="Logo" 
      className="w-40 h-auto mx-auto mb-4"
    />
    <h1 className="text-center text-2xl mb-4 font-bold">{adminTitle}</h1>
    <div className="relative px-4 py-10 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto text-center">

            <ZFormTwo
              isLoading={lIsloading}
              error={error}
              isError={lIsError}
              isSuccess={lIsSuccess}
              submit={handleSubmit}
              data={loginData}
              buttonName={loginButton}
            >
              <div>
                <h1 className="text-2xl mt-2 text-center font-bold">
                 {admnins}
                </h1>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative mb-8">
                  <ZEmail label={regemail}
                  value={"grsadmin@gmail.com"}
                   name={"email"}
                   placeholder={enterEmail}
                    required={1}/>
                </div>
                <div className="relative">
                  <ZInputTwo
                    required={1}
                    name="password"
                    type="password"
                    label={passwwords}
                   value={"123456"}
                    placeholder={enterPass}
                  />
                </div>
              </div>
            </ZFormTwo>
          </div>

        </div>
      </div>
    </div>

    </>
  );
};

export default AdminLogin;
