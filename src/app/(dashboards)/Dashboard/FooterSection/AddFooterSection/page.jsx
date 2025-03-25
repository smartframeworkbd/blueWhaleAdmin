"use client";
import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext"; // Assuming the context is in the context folder
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddFooterMutation } from "@/redux/Feature/Admin/footer/footerApi";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


const AddFooterSection = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [addFooter, { isLoading, isError, error, isSuccess, data }] = useAddFooterMutation();
  const { isAddModalOpen } = useAppSelector((state) => state.modal);

  const [addLinks, setAddLinks] = useState([1]);

  useEffect(() => {
    if (!isAddModalOpen) {
      setAddLinks([1]);
    }
  }, [isAddModalOpen]);

  const quickLinksOptions = [
    {
      labelEn: "Administrative Login",
      labelBn: "প্রশাসনিক লগইন",
      value: "/AdminLogin",
    },
    {
      labelEn: "Complainant Login",
      labelBn: "অভিযোগকারীর লগইন",
      value: "/Login",
    },
    {
      labelEn: "Overall Collaboration",
      labelBn: "সার্বিক সহযোগিতা",
      value: "/Collaboration",
    },
  ];

  const handleSubmit = (formData) => {
    if (formData.quickLinks) {
      formData.quickLinks = formData.quickLinks.map((value) => {
        const selectedOption = quickLinksOptions.find((option) => option.value === value);
        return {
          labelEn: selectedOption.labelEn,
          labelBn: selectedOption.labelBn,
          value: selectedOption.value,
        };
      });
    }

    // console.log(formData);
    addFooter(formData);
  };

  const handleCloseModal = () => {
    dispatch(setIsAddModalOpen(false));
  };

  const handleAddPage = () => {
    setAddLinks([...addLinks, addLinks.length + 1]);
  };

  const handleRemovePage = (pageValue) => {
    const updatedPages = addLinks.filter((item) => item !== pageValue);
    setAddLinks([...updatedPages]);
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
      buttonName={currentLanguage === "en" ? "Create" : "তৈরি করুন"} // Language-specific button text
    >
      <div className="grid grid-cols-1 gap-3 mt-10">
        {/* About Text Input */}
        <ZInputTextArea
          name="aboutTextEnglish"
          type="text"
          label={currentLanguage === "en" ? "About Text English" : "এবাউট টেক্সট বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter about text for footer" : "ফুটারের জন্য এবাউট টেক্সট লিখুন"}
        />
        <ZInputTwo
          name="copyrightTextEnglish"
          type="text"
          label={currentLanguage === "en" ? "Copyright Text English" : "কপিরাইট টেক্সট বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter copyright text english" : "কপিরাইট টেক্সট বাংলায় লিখুন"}
        />
        <ZInputTwo
          name="copyrightTextBangla"
          type="text"
          label={currentLanguage === "en" ? "Copyright Text Bangla" : "কপিরাইট টেক্সট বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter copyright text bangla" : "কপিরাইট টেক্সট বাংলায় লিখুন"}
        />

        <ZInputTextArea
          name="aboutTextBangla"
          type="text"
          label={currentLanguage === "en" ? "About Text Bangla" : "এবাউট টেক্সট বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter about text for footer" : "ফুটারের জন্য এবাউট টেক্সট লিখুন"}
        />

        {/* Contact Email Input */}
        <ZInputTwo
          name="contactEmail"
          type="email"
          label={currentLanguage === "en" ? "Contact Email" : "যোগাযোগের ইমেইল"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter contact email" : "যোগাযোগের ইমেইল লিখুন"}
        />

        {/* Contact Phone Input */}
        <ZInputTwo
          name="contactPhone"
          type="tel"
          label={currentLanguage === "en" ? "Contact Phone" : "যোগাযোগের ফোন"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter contact phone" : "যোগাযোগের ফোন লিখুন"}
        />

        {/* Address Input */}
        <ZInputTextArea
          name="addressEnglish"
          type="text"
          label={currentLanguage === "en" ? "Address English" : "ঠিকানা বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter address for footer" : "ফুটারের জন্য ঠিকানা লিখুন"}
        />
        <ZInputTextArea
          name="addressBangla"
          type="text"
          label={currentLanguage === "en" ? "Address Bangla" : "ঠিকানা বাংলা"} // Dynamic label based on language
          placeholder={currentLanguage === "en" ? "Enter address for footer" : "ফুটারের জন্য ঠিকানা লিখুন"}
        />

        {/* Social Media Links Multi-Select */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            {currentLanguage === "en" ? "Social Media Links" : "সোশ্যাল মিডিয়া লিংক"}
          </h4>
          <div className="max-h-[400px] overflow-y-scroll thin-scrollbar mb-5">
            {addLinks.map((page, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 items-center"
              >
                <div className="w-[85%] flex items-center gap-2">
                  <ZInputTwo
                    name={`socialMediaLinks.${index}.name`}
                    type="text"
                    label={currentLanguage === "en" ? "Link Name English" : "লিংক নাম বাংলা"} // Dynamic label based on language
                    placeholder={currentLanguage === "en" ? "Enter Link Name English" : "লিংক নাম বাংলা লিখুন"}
                  />

                  <ZInputTwo
                    name={`socialMediaLinks.${index}.url`}
                    type="text"
                    label={currentLanguage === "en" ? "URL" : "ইউআরএল"} // Dynamic label based on language
                    placeholder={currentLanguage === "en" ? "Enter your URL" : "আপনার ইউআরএল লিখুন"}
                  />
                  <ZInputTwo
                    name={`socialMediaLinks.${index}.bangla`}
                    type="text"
                    label={currentLanguage === "en" ? "Link Name Bangla" : "লিংক নাম বাংলা"} // Dynamic label based on language
                    placeholder={currentLanguage === "en" ? "Enter Link Name Bangla" : "লিংক নাম বাংলা লিখুন"}
                  />
                </div>
                <div className="w-[15%]">
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={handleAddPage}
                      className="bg-blue-500 text-white py-1 mt-2 px-2 rounded"
                    >
                      <AiOutlinePlus size={15} />
                    </button>
                  )}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePage(page)}
                      className="bg-red-500 text-white rounded px-2 py-1 mt-2"
                    >
                      <AiOutlineMinus size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Multi-Select */}
        <ZSelect
          name="quickLinks"
          mode="multiple"
          label={currentLanguage === "en" ? "Quick Links" : "কুইক লিঙ্কস"}
          options={quickLinksOptions.map((item) => ({
            label: `${item.labelEn} | ${item.labelBn}`,
            value: item.value,
          }))}

          placeholder={currentLanguage === "en" ? "Add quick links" : "দ্রুত লিঙ্ক যোগ করুন"}
        />


    <ZSelect
            name="status"
            label={currentLanguage === "en" ? "Status" : "স্ট্যাটাস"}
            options={[
              { label: currentLanguage === "en" ? "Active" : "সক্রিয়", value: true },
              { label: currentLanguage === "en" ? "Inactive" : "নিষ্ক্রিয়", value: false },
            ]}
            placeholder={currentLanguage === "en" ? "Select status" : "স্ট্যাটাস নির্বাচন করুন"}
          />
      </div>
    </ZFormTwo>
  );
};

export default AddFooterSection;
