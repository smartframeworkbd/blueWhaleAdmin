"use client";
import React, { useContext, useState } from 'react';
import Skeleton from '@/components/Skeleton/Skeleton';
import { LanguageContext } from '@/context/LanguageContext';
import { useGetFaqsQuery } from '@/redux/Feature/Admin/faq/faqApi';
import { usePathname } from 'next/navigation';

const Faq = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [openIndex, setOpenIndex] = useState(null);
  const { data, error, isLoading } = useGetFaqsQuery();
  const pathName = usePathname();

  if (isLoading) {
    return <Skeleton />;
  }

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[90%] mx-auto py-5">
      <div className="space-y-4 w-[90%] mx-auto">
        <h1 className={`text-2xl text-center font-bold mb-5 ${pathName === "/" && "hidden"}`}>
          FAQ Section
        </h1>
        {data?.data?.map((faq, index) => (
          <div key={faq.Id || index} className="group">
            <summary
              className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 "
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-black font-bold text-[16px]">
                {currentLanguage === "en" ? faq.questionEnglish : faq.questionBangla}
              </h2>
              <svg
                className={`size-5 shrink-0 transition duration-300 ${openIndex === index ? "-rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            {openIndex === index && (
              <p className="mt-4 px-4 leading-relaxed text-black text-[15px]">
                {currentLanguage === "en" ? faq.answerEnglish : faq.answerBangla}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
