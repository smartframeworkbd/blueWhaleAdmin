"use client";
import React, { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

const Collaboration = () => {
  const { currentLanguage } = useContext(LanguageContext);

  return (
    <div className="max-w-[800px] mx-auto py-8">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
        {currentLanguage === "en"
          ? "Planning, Design, and Development"
          : "পরিকল্পনা, নকশা ও উন্নয়ন"}
      </h2>
      <ul className="space-y-2 text-gray-700 text-lg leading-relaxed text-center">
        <li>
          <span className="font-semibold">
            {currentLanguage === "en" ? "Shamina Islam" : "শামিনা ইসলাম"}
          </span>
          <p>
            {currentLanguage === "en"
              ? "Commissioner of Taxes (Appeals)"
              : "কর কমিশনার (আপিল)"}
          </p>
          <p>
            {currentLanguage === "en"
              ? "Chattogram Tax Appeal Zone"
              : "কর আপিল অঞ্চল চট্টগ্রাম"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Collaboration;
