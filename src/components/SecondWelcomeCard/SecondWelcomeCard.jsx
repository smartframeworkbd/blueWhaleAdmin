"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetHotspotsQuery } from "@/redux/Feature/Admin/hotspot/hotSpotApi";
import { Card, Button } from "@material-tailwind/react";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useContext, useState } from "react";
import ZModal from "../Form/ZModal";
import Faq from "@/app/(pages)/Faq/page";
import GrievanceTrace from "@/app/(pages)/Trace/page";
import Collaboration from "@/app/(pages)/Collaboration/page";
import { useRouter } from "next/navigation";

export default function SecondWelcomeCard() {
  const { currentLanguage } = useContext(LanguageContext) || {currentLanguage: "en"};
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isSuccess, isError } = useGetHotspotsQuery();
  const router = useRouter()

  const handleCardClick = (card) => {
    setModalTitle(
      currentLanguage === "en"
        ? card.hotspotNameEnglish
        : card.hotspotNameBangla
    );

    if (card?.hotspotType === "link" && card?.url) {
        router.push(card.url);
    } 
    
    else if (card.hotspotType === "model") {
      if (card.moduleName === "file") {
        const file = JSON.parse(card.file);
        console.log(file)
        setModalContent(file);
      } else if (card.moduleName.length > 0 && card.moduleName !== "others") {
        if (card.moduleName === "Faq") {
          setModalContent(<Faq />);
        } else if (card.moduleName === "Trace") {
          setModalContent(<GrievanceTrace />);
        } else if (card.moduleName === "Collaboration") {
          setModalContent(<Collaboration />);
        }
      }
       else {
        const content = JSON.parse(card.content);
        setModalContent(content);
      }

      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle(""); // Reset title when modal closes
  };

  if (isError) {
    return (
      <div className="text-center text-red-400 font-bold mt-8">
        Error loading data
      </div>
    );
  }

  return (
    <div className="mt-5">
      <ZModal
        title={modalTitle} // Pass the title to ZModal
        content={modalContent}
        isModalOpen={isModalOpen}
        onCancel={handleModalClose}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {isSuccess &&
          data?.data?.map(
            (card, index) =>
              card?.hotspotSectionName === "sectionOne" && (
                <Card
                  key={index}
                  onClick={() => handleCardClick(card)}
                  className="relative w-full h-[320px] rounded-none lg:rounded-[20px] p-4 flex flex-col items-start justify-start shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${card.hotspotIcon}`}
                    alt={card.title}
                    className="w-20 h-20 rounded-full mb-4 bg-blue-100"
                  />
                  <img
                    src="/07.png"
                    alt="Corner Design"
                    className="absolute top-0 right-0 w-[120px] h-[120px] rounded-tr-[20px]"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {currentLanguage === "en"
                      ? card.hotspotNameEnglish
                      : card.hotspotNameBangla}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentLanguage === "en"
                      ? card.hotspotDetailsEnglish
                      : card.hotspotDetailsBangla}
                  </p>

                  {card.link ? (
                    <Link href={card.link}>
                      <Button
                        size="sm"
                        color="blue"
                        ripple={true}
                        className="flex items-center mt-auto bg-blue-500 text-white hover:bg-[#203990] hover:text-white transition-colors duration-300"
                      >
                        {currentLanguage === "en"
                          ? card.hotspotButtonTextEnglish
                          : card.hotspotButtonTextBangla}
                        <RiArrowRightUpLine size={22} className="ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      color="blue"
                      ripple={true}
                      className="flex items-center mt-auto bg-blue-500 text-white hover:bg-[#203990] hover:text-white transition-colors duration-300"
                    >
                      {currentLanguage === "en"
                        ? card.hotspotButtonTextEnglish
                        : card.hotspotButtonTextBangla}{" "}
                      <RiArrowRightUpLine size={22} className="ml-2" />
                    </Button>
                  )}
                </Card>
              )
          )}
      </div>
    </div>
  );
}
