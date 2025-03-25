import { useGetWelcomeSectionQuery } from "@/redux/Feature/Admin/welcomesection/welcomesectionApi";
import { Button, Card } from "@material-tailwind/react";
import Skeleton from "../Skeleton/Skeleton";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function FirstWelcomeCard() {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const { data, error, isLoading } = useGetWelcomeSectionQuery();
  const router = useRouter()

  // Check for loading state
  if (isLoading) {
    return <Skeleton />;
  }

  // Check for error state
  if (error) {
    return <p>Error loading data</p>;
  }

  // Access the details link from the first item in the data array
  const mainDetailsLink = data?.data?.[0]?.detailsLink || "#";

  return (
    <div className="flex justify-center items-center mt-3">
      <Card className="w-full p-8 flex flex-col md:flex-row items-center gap-6 bg-[#F7F7F7] shadow-lg rounded-none">
        {/* Left Side - Large Button */}
        <div className="w-full md:w-1/3 flex justify-center">
  <Button
    size="lg"
    onClick={() => {
      const token = localStorage.getItem("userToken") || Cookies.get("userToken");
      if (token) {
     
       router.push("https://grs.taxappealctg.gov.bd/UserDashboard/Grievance/AddGrievance");
      } else {
       
        router.push("https://grs.taxappealctg.gov.bd/Login");
      }
    }}
    className="w-full md:w-auto text-white font-bold py-4 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 bg-[#C60184] focus:outline-none focus:ring-4 focus:ring-[#C60184] shadow-xl shadow-pink-400 hover:shadow-[#203990] hover:bg-[#203990]"
    ripple={true}
  >
  {
    currentLanguage == "en" ? "Submit Grievance" :
    "অভিযোগ দাখিল"
 }  
  </Button>
</div>


        {/* Right Side - Text Content */}
        <div className="w-full md:w-2/3 text-justify">
          {data?.data?.map((item, index) => {
            // Get dynamic content based on the current language
            const details = currentLanguage === "en" ? item.detailsEnglish : item.detailsBangla;

            return (
              <div key={index} className="mb-4">
                <p className="text-[17px] text-black leading-relaxed">
                  {details}
                  <Button
                    size="sm"
                    onClick={() =>router.push(item.detailsLink)} // Open each item's details link in a new tab
                    className="bg-blue-500 text-white font-medium focus:outline-none hover:bg-[#203990] transition-colors duration-200 rounded-1 m-2"
                  >
                   {currentLanguage === "en" ? item.buttonNameEnglish : item.buttonNameBangla}
                  </Button>
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
