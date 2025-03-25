"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { MdOutlineImportContacts } from "react-icons/md";
import Logo from "../../../../public/logo.jpeg";
import Logo2 from "../../../../public/sf-logo-2.png";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HomeContextProvider } from "@/components/HomeProvider/HomeProvider";
import { useGetUserByIdQuery } from "@/redux/Feature/Admin/usersmanagement/userApi";
import { LanguageContext } from "@/context/LanguageContext";
import { toast } from "sonner";
import Cookies from "js-cookie";



const UserDashboard = ({ view, toggle }) => {
  const { currentLanguage} = useContext(LanguageContext);
  const [open, setOpen] = React.useState(0);
  const [activeItem, setActiveItem] = useState();
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { data, error, isLoading: userIsLoading } = useGetUserByIdQuery(userInfo?.Id);
  const router = useRouter();

  




  useEffect(() => {
    if (pathName === "/UserDashboard/UserHome") {
      setActiveItem("dashboard");
    } 
    else if (pathName === "/UserDashboard/Grievance" || pathName === "/UserDashboard/Grievance/EditViewGrievance") {
      setActiveItem("grievances");
    }
    
    else if (pathName === "/UserDashboard/Grievance/AddGrievance") {
      setActiveItem("addGrievances");
    }

    else if (pathName === "/UserDashboard/UserSetting") {
      setActiveItem("setting");
    }
    
    
    else {
      setActiveItem("");
    }
  }, [pathName]);



  const hidden = toggle ? "hidden" : "";


  

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getActiveClass = (item) =>
    activeItem === item && "!bg-[#6c5ce7] text-white";


  return (
    <div
      className={`fixed md:relative transition 
     ${
       hamburger ? "left-0" : "left-[-30rem]"
     } md:left-0 z-[30] transition-all duration-500`}
    >
      <Card className="h-screen no-scrollbar transition-all overflow-y-scroll py-2 shadow-xl shadow-blue-gray-900/5 bg-primary rounded-none">
        <div className="flex items-center justify-between">
          <div className="mb-2 mt-3 pl-5">
            <Typography variant="h5" color="white">
              {!toggle ? (
                <Image src={Logo} alt="Admin" className="w-[100px] h-[50px]" />
              ) : (
                <Image
                  src={Logo}
                  alt="Admin"
                  className="w-[40px] h-[25px] mt-1 object-cover"
                />
              )}
            </Typography>
          </div>
          {view === "mobile" && hamburger && (
            <div className="block lg:hidden">
              <button onClick={() => setHamburger(!hamburger)}>
                <RxCross1
                  size={24}
                  className="bg-cyan-800 py-1 px-1 rounded-md text-white"
                />
              </button>
            </div>
          )}
        </div>
        <List className="mt-2">
          <Link href={"/UserDashboard/UserHome"}>
            <ListItem
              className={`hover:bg-[#6c5ce7]   ${getActiveClass("dashboard")} `}
              selected={activeItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
            >
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 me-2 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
              {currentLanguage == "en" ? "Dashboard" : "ড্যাশবোর্ড"}
              </Typography>
            </ListItem>
          </Link>



          {data?.data?.status !== false ? ( <>
            <Link href={"/UserDashboard/Grievance/AddGrievance"}>
        <ListItem
      className={`hover:bg-[#6c5ce7] ${getActiveClass("addGrievances")}`}
      selected={activeItem === "addGrievances"}
      onClick={() => handleItemClick("addGrievances")}
    >
      <ListItemPrefix>
        <MdOutlineImportContacts className="h-5 w-5 me-2 text-white" />
      </ListItemPrefix>
      <Typography color="white" className={hidden}>
      {currentLanguage == "en" ? "Add Grievance" : "অভিযোগ দাখিল"}

      </Typography>
    </ListItem>
  </Link>
  <Link href={"/UserDashboard/Grievance"}>
    <ListItem
      className={`hover:bg-[#6c5ce7] ${getActiveClass("grievances")}`}
      selected={activeItem === "grievances"}
      onClick={() => handleItemClick("grievances")}
    >
      <ListItemPrefix>
        <MdOutlineImportContacts className="h-5 w-5 me-2 text-white" />
      </ListItemPrefix>
      <Typography color="white" className={hidden}>
      {currentLanguage == "en" ? "Grievances" : "অভিযোগ সমূহ"}

      </Typography>
    </ListItem>
  </Link>

  <Link href={"/UserDashboard/UserSetting"}>
    <ListItem
      className={`hover:bg-[#6c5ce7] ${getActiveClass("setting")}`}
      selected={activeItem === "setting"}
      onClick={() => handleItemClick("setting")}
    >
      <ListItemPrefix>
        <UserCircleIcon className="h-5 w-5 me-2 text-white" />
      </ListItemPrefix>
      <Typography color="white" className={hidden}>
      {currentLanguage == "en" ? "Profile" : "প্রোফাইল"}

      </Typography>
    </ListItem>
  </Link>

  </>
) : 
( <>
  <Tooltip content="You have been blocked for irrelevant grievance submission" placement="right">
  <ListItem
     className="text-gray-400 cursor-not-allowed"
    >
      <ListItemPrefix>
        <MdOutlineImportContacts className="h-5 w-5 text-white" />
      </ListItemPrefix>
      <Typography color="gray" className={hidden}>
      {currentLanguage == "en" ? "Add Grievance" : "অভিযোগ দাখিল"}

      </Typography>
    </ListItem>
    </Tooltip>
  <Tooltip content="You have been blocked for irrelevant grievance submission" placement="right">
  <ListItem className="text-gray-400 cursor-not-allowed">
    <ListItemPrefix>
      <MdOutlineImportContacts className="h-5 w-5 text-gray-400" />
    </ListItemPrefix>
    <Typography color="gray" className={hidden}>
    {currentLanguage == "en" ? "Grievances" : "অভিযোগ সমূহ"}
    </Typography>
  </ListItem>
</Tooltip>
  <Tooltip content="You have been blocked for for irrelevant grievance submission" placement="right">
  <ListItem className="text-gray-400 cursor-not-allowed">
    <ListItemPrefix>
    <UserCircleIcon className="h-5 w-5 me-2 text-white" />

    </ListItemPrefix>
    <Typography color="gray" className={hidden}>
    {currentLanguage == "en" ? "Profile" : "প্রোফাইল"}
    </Typography>
  </ListItem>
</Tooltip>
</>
)}




        </List>
      </Card>
    </div>
  );
};

export default UserDashboard;
