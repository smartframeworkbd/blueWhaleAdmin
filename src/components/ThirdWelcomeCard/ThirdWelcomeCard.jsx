
"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetHotspotsQuery } from "@/redux/Feature/Admin/hotspot/hotSpotApi";
import { Card, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import ZModal from "../Form/ZModal";
import Faq from "@/app/(pages)/Faq/page";
import Collaboration from "@/app/(pages)/Collaboration/page";
import GrievanceTrace from "@/app/(pages)/Trace/page";
import { useRouter } from "next/navigation";

export default function ThirdWelcomeCard() {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [modalContent, setModalContent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const router = useRouter()


  const { data, isLoading, isSuccess } = useGetHotspotsQuery();

  const handleCardClick = (card) => {


    setModalTitle(
      currentLanguage === "en" ? card.hotspotNameEnglish : card.hotspotNameBangla
    );
    if (card?.hotspotType === "link" && card?.url) {
      router.push(card.url);
    }
    else if (card.hotspotType === "model") {
      // console.log(card.moduleName);


      if (card.moduleName == "file") {
        // console.log(card);
        const file = JSON.parse(card.file)
        // console.log(file);

        setModalContent(file)
      }
      else if (card.moduleName.length > 0 && card.moduleName !== "others") {

        if (card.moduleName == "Faq") {

          setModalContent(<Faq />);
        }
        else if (card.moduleName === "Trace") {
          setModalContent(<GrievanceTrace />);
        }
        else if (card.moduleName === "Collaboration") {
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
  };
  // console.log(modalContent);

  return (
    <>
      <ZModal
           title={modalTitle} // Pass the title to ZModal
        content={modalContent}
        isModalOpen={isModalOpen}
        onCancel={handleModalClose}
      />

      <div className="py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 gap-y-14 lg:gap-y-5 justify-center">
          {isSuccess && data?.data?.map((card, index) => (
             card?.hotspotSectionName === "sectionTwo" && (
            <Card
              key={index}
              onClick={() => handleCardClick(card)}
              className="relative rounded-none w-full p-6 bg-[#0e2a47] text-white shadow-lg lg:rounded-[20px]  transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {/* Icon Container */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white w-20 h-20 flex items-center justify-center rounded-full border-4 border-green-400 transition-transform duration-500 hover:rotate-360">
                <img
                 src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${card.hotspotIcon}`}
                  alt={card.title}
                  className="w-10 h-10 transition-transform duration-500 hover:rotate-[360deg]"
                />
              </div>

              {/* Card Content */}
              <div className="text-center mt-12">
                <Typography variant="h5" className="font-bold mb-2">
                  {currentLanguage === "en" ? card.hotspotNameEnglish : card?.hotspotNameBangla}
                </Typography>
                <Typography className="text-sm">{currentLanguage === "en" ? card.hotspotDetailsEnglish : card?.hotspotDetailsBangla}</Typography>
              </div>
            </Card>
             )
          ))}
        </div>
      </div></>

  );
}
