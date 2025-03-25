"use client";
import React, { useContext } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateFooterMutation } from "@/redux/Feature/Admin/footer/footerApi";
import { LanguageContext } from "@/context/LanguageContext";  // Import LanguageContext

const EditFooterSection = ({ selectedFooter }) => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useContext(LanguageContext);  // Get currentLanguage context
  const [updateFooter, { isLoading, isError, error, isSuccess, data }] = useUpdateFooterMutation();

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

  const selectedQuickLinks = selectedFooter?.quickLinks

  const handleSubmit = (formData) => {

    if (formData.quickLinks && formData.quickLinks.length > 0) {
      // Map the selected quickLinks values to the corresponding options
      formData.quickLinks = formData.quickLinks.map((value) => {
        const selectedOption = quickLinksOptions.find((option) => option.value === value);
        return selectedOption
          ? {
              labelEn: selectedOption.labelEn,
              labelBn: selectedOption.labelBn,
              value: selectedOption.value,
            }
          : {selectedQuickLinks};
      });
    } 
    // else {
    //   // If quickLinks is not selected, use the existing quickLinks from selectedFooter
    //   formData.quickLinks = selectedFooter?.quickLinks || [];
    // }
    

    updateFooter({ id: selectedFooter?.id, data: formData });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
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
        buttonName={currentLanguage === "en" ? "Update" : "আপডেট করুন"}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTextArea
            name="aboutTextEnglish"
            label={currentLanguage === "en" ? "About Text English" : "অবস্থান টেক্সট বাংলা"} 
            value={selectedFooter?.aboutTextEnglish || ""}
            placeholder={currentLanguage === "en" ? "Enter about text in English for footer" : "পাদচরণে ইংরেজি তথ্য প্রবেশ করুন"}
          />
          <ZInputTextArea
            name="aboutTextBangla"
            label={currentLanguage === "en" ? "About Text Bangla" : "অবস্থান টেক্সট বাংলা"}
            value={selectedFooter?.aboutTextBangla || ""}
            placeholder={currentLanguage === "en" ? "Enter about text in Bangla for footer" : "পাদচরণে বাংলা তথ্য প্রবেশ করুন"}
          />
          <ZInputTwo
            name="copyrightTextEnglish"
            type="text"
            label={currentLanguage === "en" ? "Copyright Text English" : "কপিরাইট টেক্সট ইংরেজি"}
            value={selectedFooter?.copyrightTextEnglish}
            placeholder={currentLanguage === "en" ? "Enter copyright text english" : "কপিরাইট টেক্সট ইংরেজি প্রবেশ করুন"}
          />
          <ZInputTwo
            name="copyrightTextBangla"
            type="text"
            label={currentLanguage === "en" ? "Copyright Text Bangla" : "কপিরাইট টেক্সট বাংলা"}
            value={selectedFooter?.copyrightTextBangla}
            placeholder={currentLanguage === "en" ? "Enter copyright text bangla" : "কপিরাইট টেক্সট বাংলা প্রবেশ করুন"}
          />
          <ZInputTwo
            name="contactEmail"
            type="email"
            label={currentLanguage === "en" ? "Contact Email" : "যোগাযোগের ইমেইল"}
            value={selectedFooter?.contactEmail || ""}
            placeholder={currentLanguage === "en" ? "Enter contact email" : "যোগাযোগের ইমেইল প্রবেশ করুন"}
          />
          <ZInputTwo
            name="contactPhone"
            type="tel"
            label={currentLanguage === "en" ? "Contact Phone" : "যোগাযোগের ফোন"}
            value={selectedFooter?.contactPhone || ""}
            placeholder={currentLanguage === "en" ? "Enter contact phone number" : "যোগাযোগের ফোন নম্বর প্রবেশ করুন"}
          />

          {/* Address Input */}
          <ZInputTextArea
            name="addressEnglish"
            label={currentLanguage === "en" ? "Address English" : "ঠিকানা ইংরেজি"}
            value={selectedFooter?.addressEnglish || ""}
            placeholder={currentLanguage === "en" ? "Enter address in English" : "ঠিকানা ইংরেজিতে প্রবেশ করুন"}
          />
          <ZInputTextArea
            name="addressBangla"
            label={currentLanguage === "en" ? "Address Bangla" : "ঠিকানা বাংলা"}
            value={selectedFooter?.addressBangla || ""}
            placeholder={currentLanguage === "en" ? "Enter address in Bangla" : "ঠিকানা বাংলায় প্রবেশ করুন"}
          />

          {/* Quick Links Multi-Select */}
          <ZSelect
            name="quickLinks"
            mode="multiple"
            label={currentLanguage === "en" ? "Quick Links" : "দ্রুত লিঙ্ক"}
            options={quickLinksOptions.map((item) => ({
              label: `${item.labelEn} | ${item.labelBn}`,
              value: item.value,
            }))}
            placeholder={currentLanguage === "en" ? "Add quick links" : "দ্রুত লিঙ্ক যোগ করুন"}
            value={selectedFooter?.quickLinks}
          />


          <ZSelect
            name="status"
            label={currentLanguage === "en" ? "Status" : "স্ট্যাটাস"}
            options={[
              { label: currentLanguage === "en" ? "Active" : "সক্রিয়", value: true },
              { label: currentLanguage === "en" ? "Inactive" : "নিষ্ক্রিয়", value: false },
            ]}
            value={selectedFooter?.status}
            placeholder={currentLanguage === "en" ? "Select status" : "স্ট্যাটাস নির্বাচন করুন"}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditFooterSection;
