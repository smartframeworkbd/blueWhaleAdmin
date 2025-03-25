"use client";

import { LanguageContext } from "@/context/LanguageContext";
import { useGetbreakingnewsQuery } from "@/redux/Feature/Admin/breakingnews/breakingnews";
import React, { useContext, useEffect, useRef } from "react";
import { AiOutlineMail } from "react-icons/ai";

export default function MarqueeN() {
  const marqueeRef = useRef(null);
  const { data, error, isLoading } = useGetbreakingnewsQuery();
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      marquee.addEventListener("scroll", () => {
        if (marquee.scrollLeft >= marquee.scrollWidth - marquee.clientWidth) {
          marquee.scrollLeft = 0;
        }
      });
    }
  }, []);

  return (
    <div className="bg-[#203990]">
      <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-2 lg:gap-8 p-2 lg:max-w-6xl lg:mx-auto text-white">
       <div>
       <a href="mailto:grs@cabinet.gov.bd" className="flex items-center gap-1 mb-2">
          <AiOutlineMail /> 
        </a>
       </div>
       <div>
       <marquee ref={marqueeRef} direction="left">
          <ul className="flex gap-8">
            {isLoading ? (
              <li>Loading breaking news...</li>
            ) : error ? (
              <li>Error loading news</li>
            ) : (
              data?.data.map((newsItem) => {
                if (currentLanguage == "en") {
                  return (
                    <li key={newsItem.id} className="whitespace-nowrap">
                      {newsItem.newsEnglish}
                    </li>
                  );
                } else {
                  return (
                    <li key={newsItem.id} className="whitespace-nowrap">
                      {newsItem.newsBangla}
                    </li>
                  );
                }
              })
            )}
          </ul>
        </marquee>
       </div>
      </div>
    </div>
  );
}
