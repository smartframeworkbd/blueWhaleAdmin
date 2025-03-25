"use client";
import { useRegisterMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ZPhone from "@/components/Form/ZPhone";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import labels from "../../../translationData/HomePage.json";
import getTranslation from "@/context/getTranslationUtility";
import ZSelect from "@/components/Form/ZSelect";
import { HomeNavbar } from "@/components/Navbar/HomeNavbar";
import Footer from "@/components/Footer/Footer";
import { toast } from "sonner";
import DashboardTitle from "@/components/DashboardTitle/DashboardTitle";
import Swal from "sweetalert2";
const RegisterLabels = labels.RegisterLabels;

const Register = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [selectedIdType, setSelectedIdType] = useState("nid");

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const handleIdTypeChange = (e) => {
    setSelectedIdType(e.target.value);
  };

  const [
    register,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: rData,
    },
  ] = useRegisterMutation();

  const handleSubmit = (data) => {
    register(data);
  };


  useEffect(() => {
    if (lIsSuccess) {
      // Display SweetAlert
      Swal.fire({
        icon: 'success',
        title: currentLanguage == "en" ? "Registration Successful" : "নিবন্ধন সফল হয়েছে",
        text: currentLanguage == "en" 
          ? "Please check your mobile for passcode and login" 
          : "পাসকোড এবং লগইন জন্য আপনার মোবাইল চেক করুন",
        confirmButtonText: currentLanguage == "en" ? "OK" : "ঠিক আছে",
      }).then(() => {
        // Navigate after alert confirmation
        router.push("/Login");
      });
  
      // toast.success(
      //   currentLanguage == "en" 
      //     ? "Registration Successful please check your mobile for passcode and login" 
      //     : "নিবন্ধন সফল হয়েছে পাসকোড এবং লগইন জন্য আপনার মোবাইল চেক করুন", 
      //   { id: 1, duration: 10000 }
      // );
    }
  }, [lIsSuccess, router]);
  

  // useEffect(() => {
  //   toast.dismiss(1);
  // }, []);

  useEffect(() => {
    // Fetch countries data
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const countryOptions = countries.map((country) => ({
    label: country.name.common,
    value: country.name.common,
  }));


  //Tab labels:
  const userRegister = getTranslation(
    "userRegister.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const userName = getTranslation(
    "userName.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterUserName = getTranslation(
    "enterUserName.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const registerBirth = getTranslation(
    "registerBirth.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterDateOfB = getTranslation(
    "enterDateOfB.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regemail = getTranslation(
    "regemail.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterEmail = getTranslation(
    "enterEmail.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterPhone = getTranslation(
    "enterPhone.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regGender = getTranslation(
    "regGender.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterGender = getTranslation(
    "enterGender.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regprofession = getTranslation(
    "regprofession.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterProfession = getTranslation(
    "enterProfession.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const educationQualification = getTranslation(
    "educationQualification.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterEducationQualification = getTranslation(
    "enterEducationQualification.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regCountry = getTranslation(
    "regCountry.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterCountry = getTranslation(
    "enterCountry.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterPhoneNumber = getTranslation(
    "enterPhoneNumber.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regNationality = getTranslation(
    "regNationality.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterNationality = getTranslation(
    "enterNationality.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const regAddress = getTranslation(
    "regAddress.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const enterAddress = getTranslation(
    "enterAddress.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const selectIdType = getTranslation(
    "selectIdType.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const nidNumber = getTranslation(
    "nidNumber.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const passportNumber = getTranslation(
    "passportNumber.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const birthCertificateNumber = getTranslation(
    "birthCertificateNumber.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const alreadyAccount = getTranslation(
    "alreadyAccount.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const loginHere = getTranslation(
    "loginHere.tabTitle",
    currentLanguage,
    RegisterLabels
  );
  const registersButton = getTranslation(
    "registersButton.tabTitle",
    currentLanguage,
    RegisterLabels
  );



  const idTypeOptions = [
    { value: "nid", label: getTranslation("nidNumber.tabTitle", currentLanguage, RegisterLabels) },
    {
      value: "passport",
      label: getTranslation("passportNumber.tabTitle", currentLanguage, RegisterLabels),
    },
    {
      value: "bid",
      label: getTranslation("birthCertificateNumber.tabTitle", currentLanguage, RegisterLabels),
    },
  ];

  const selectedIdLabel = idTypeOptions.find((option) => option.value === selectedIdType)?.label;


  return (
    <>
    <DashboardTitle windowTitle={"অভিযোগকারীর নিবন্ধন"}/>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5 ">
        <div className="relative py-3 sm:w-[40%] sm:mx-auto lg:w-[925px]">
          <div className="relative mx-auto px-4 py-2 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl">
            <div className="max-w-2xl mx-auto">
              <ZFormTwo
                // isLoading={lIsloading}
                error={error}
                isError={lIsError}
                // isSuccess={lIsSuccess}
                submit={handleSubmit}
                data={rData}
                formType={"create"}
                buttonName={registersButton}
              >
                <div>
                  <h1 className="text-2xl mt-2 text-center">{userRegister}</h1>
                </div>
                <div className=" text-base  text-gray-700 sm:text-lg">
                  {/* Arrange Inputs Side by Side */}
                  <div className="flex flex-wrap gap-1">
                  

                    <div className="w-full ">
                      <ZInputTwo
                        name="userName"
                        type="text"
                        label={userName}
                        defaultKey={""}
                        required
                        placeholder={enterUserName}
                      />
                    </div>

                    <div className="w-full ">
                      <ZEmail
                        label={regemail}
                        name={"userEmail"}
                        placeholder={enterEmail}
                      />
                    </div>

                    <div className="w-full ">
                      <ZPhone
                        label={enterPhone}
                        name={"userPhone"}
                        placeholder={enterPhoneNumber}
                      />
                    </div>


                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-2">
                    <div className="w-full">
                      <label
                        htmlFor="idType"
                        className="block text-sm font-normal text-black"
                      >
                        {getTranslation("selectIdType.tabTitle", currentLanguage, RegisterLabels)}
                      </label>
                      <select
                        name="idType"
                        id="idType"
                        required
                        className="block w-full mt-3 lg:mt-0 lg:py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleIdTypeChange}
                        value={selectedIdType}
                      >
                        {idTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                      <div className="w-full lg:mt-[12px]">
                        {/* Dynamically changing input name based on selected ID type */}
                        {selectedIdType && (
                          <ZInputTwo
                            name={selectedIdType} // Dynamic name here based on selected value
                            type="text"
                            label={`${selectedIdLabel.toUpperCase()}`} // Dynamic label
                            defaultKey={
                              "block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            }
                            required
                            placeholder={`${currentLanguage == "en" ? "Enter your" : "আপনার"} ${selectedIdLabel.toUpperCase()}`}
                          />
                        )}
                      </div>
                    </div>



                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-5">
                      <div className="w-full ">
                        <ZSelect
                          name="country"
                          label={regCountry}                          
                          options={countryOptions}
                          placeholder={enterGender}
                        />
                      </div>

                      <div className="w-full ">
                        <ZSelect
                          name="nationality"
                          label={regNationality}
                          defaultKey={""}                        
                          options={countryOptions}
                          placeholder={enterNationality}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <ZInputTwo
                        name="address"
                        type="text"
                        label={regAddress}
                        placeholder={enterAddress}
                      />
                    </div>
                  </div>
                   
                </div>
              </ZFormTwo>
            </div>

            <div className="flex justify-center items-center mt-5">
              <div>
                <p className="text-sm text-gray-500">
                  {alreadyAccount}
                  <Link href="/Login">
                    <button className="underline text-blue-500 ms-2">
                      {loginHere}
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

export default Register;
