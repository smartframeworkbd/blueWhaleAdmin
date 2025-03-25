"use client";
import { useContext, useEffect } from "react";
import { useUserLoginMutation } from "@/redux/Feature/auth/authApi";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LanguageContext } from "@/context/LanguageContext";
import getTranslation from "@/context/getTranslationUtility";
import labels from "../../../translationData/HomePage.json";
import Cookies from "js-cookie";
import DashboardTitle from "@/components/DashboardTitle/DashboardTitle";

const LoginLabels = labels.LoginLabels;

const Login = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [userLogin, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: userLoginData }] = useUserLoginMutation();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken") && Cookies.get("userToken");
    if (token) {
      router.push("/UserDashboard/Grievance/AddGrievance");
    }
  }, [router]);


  const handleSubmit = async (data) => {
    try {
      const { data: userLoginData } = await userLogin(data);
      if (userLoginData?.data?.accessToken && userLoginData?.data?.user) {
        localStorage.setItem("userToken", userLoginData?.data?.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(userLoginData?.data?.user));
        Cookies.set("userToken", userLoginData?.data?.accessToken, {
          expires: 365,
          path: "/",
          secure: false,
        });
        router.push("/UserDashboard/UserHome");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


    //Tab labels:
    const userLogins = getTranslation(
      "userLogins.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const PhoneNumber = getTranslation(
      "PhoneNumber.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const enterPhoneNumber = getTranslation(
      "enterPhoneNumber.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const Passscode = getTranslation(
      "Passscode.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const enterPassscode = getTranslation(
      "enterPassscode.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const noAccount = getTranslation(
      "noAccount.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const registerNoew = getTranslation(
      "registerNoew.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const forgotPasscode = getTranslation(
      "forgotPasscode.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const loginButton = getTranslation(
      "loginButton.tabTitle",
      currentLanguage,
      LoginLabels
    );
    const infoLogin = getTranslation(
      "infoLogin.tabTitle",
      currentLanguage,
      LoginLabels
    );




  return (
    <>
    <DashboardTitle windowTitle={"অভিযোগকারী লগইন"}/>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5">
      <div className="relative sm:w-[40%] sm:mx-auto">
        <div className="relative px-4 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">
        <div className="text-center mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
      <p>{infoLogin}</p>
        </div>
          <div className="max-w-md mx-auto text-center">
            <ZFormTwo
              isLoading={lIsloading}
              error={error}
              isError={lIsError}
              isSuccess={lIsSuccess}
              submit={handleSubmit}
              data={userLoginData}
              buttonName={loginButton}
            >
              <div>
                <h1 className="text-2xl mt-2 text-center">{userLogins}</h1>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative mb-8">
                  {/* Input for userPhone */}
                  <ZInputTwo
                    name="userPhone"
                    type="text"
                    label={PhoneNumber}
                    defaultKey={""}
                    placeholder={enterPhoneNumber}
                    required={1}
                  />
                </div>
                <div className="relative">
                  {/* Input for passCode */}
                  <ZInputTwo
                    required={1}
                    name="passCode"
                    type="password"
                    label={Passscode}
                    defaultKey={""}
                    placeholder={enterPassscode}
                  />
                </div>

                <div className="flex justify-start items-center mt-2">
            <div>
              <p className="text-sm text-gray-500">
                <Link href="/RecoverPasscode">
                  <button className="underline text-blue-500 ms-2">
                    {forgotPasscode}
                  </button>
                </Link>
              </p>
            </div>
          </div>


              </div>
            </ZFormTwo>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div>
              <p className="text-sm text-gray-500">
                {noAccount}
                <Link href="/Register">
                  <button className="underline text-blue-500 ms-2">
                    {registerNoew}
                  </button>
                </Link>
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
