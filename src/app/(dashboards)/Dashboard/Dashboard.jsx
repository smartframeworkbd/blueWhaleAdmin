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
} from "@material-tailwind/react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageContext } from "@/context/LanguageContext";
import { HomeContextProvider } from "@/components/HomeProvider/HomeProvider";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../../../../public/logo.jpeg"
import { Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { InboxIcon, PresentationChartBarIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { RiHotspotFill } from "react-icons/ri";
import { FaHeading, FaQuoteLeft } from "react-icons/fa";
import { MdContentPaste, MdSpaceDashboard } from "react-icons/md";
import { HiNewspaper, HiReceiptTax } from "react-icons/hi";
import { BiLogoGmail } from "react-icons/bi";


const Dashboard = ({ view, toggle }) => {
  const [open, setOpen] = useState(null);
  const [activeItem, setActiveItem] = useState();
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();
  const { currentLanguage } = useContext(LanguageContext);

  const adminData = JSON.parse(localStorage.getItem("adminInfo"));
  const adminPermissions = JSON.parse(adminData?.adminPermissions || "[]");

  useEffect(() => {
    const pathToIdMapping = {
      "/Dashboard/AdminHome": "dashboard",
      "/Dashboard/Header": "header",
      "/Dashboard/Faq": "faq",
      "/Dashboard/HotSpot": "hotSpot",
      "/Dashboard/HotSpotTwo": "hotSpotTwo",
      "/Dashboard/BreakingNews": "breakingnews",
      "/Dashboard/WelcomeSection": "welcomesection",
      "/Dashboard/FooterSection": "footersection",
      "/Dashboard/UserGrievance": "userGrievance",
      "/Dashboard/Content": "content",
      "/Dashboard/Users": "user",
      "/Dashboard/admin": "admins",
      "/Dashboard/UserGrievance/Pending" : "userGrievancePending",
      "/Dashboard/UserGrievance/Accept" : "userGrievanceAccept",
      "/Dashboard/UserGrievance/Complete" : "userGrievanceComplete",
      "/Dashboard/UserGrievance/Reject" : "userGrievanceReject",
      "/Dashboard/Email" : "email"

    };
    setActiveItem(pathToIdMapping[pathName] || "");
  }, [pathName]);


  useEffect(() => {
    const savedOpenState = localStorage.getItem("accordionOpenState");
    if (savedOpenState) {
      setOpen(Number(savedOpenState));
    }
  }, []);

  const handleAccordionToggle = (value) => {
    const newValue = open === value ? null : value
    setOpen(newValue);
    localStorage.setItem("accordionOpenState", newValue);

  };



  const getActiveClass = (item) =>
    activeItem === item && "!bg-[#6c5ce7] text-white border-green-400 border-l-8 !rounded-none";

  const hidden = toggle ? "hidden" : "";
  const customMenuStyle = {
    backgroundColor: "#1E466A", 
  };
  const customItemStyle = {
    color: "#FFFFFF",
    marginTop: "16px", // Adjust the value as needed
    marginBottom: "16px", // Adjust the value as needed
  };
  

  const menuItems = [
    {
      id: "dashboard",
      path: "/Dashboard/AdminHome",
      icon: <MdSpaceDashboard className="h-5 w-5 text-white" />,
      labels: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
    },
    {
      id: "product",
      path: "",
      icon: <HiReceiptTax className="h-5 w-5 text-white" />,
      labels: { en: "Product ", bn: "Product" },
      children: [
        {
          id: "create product",
          path: "/Dashboard/product/create",
          icon: <HiReceiptTax className="h-5 w-5 text-white" />,
          labels: { en: "create product", bn: "create product" },
        },
        {
          id: "product list",
          path: "/Dashboard/product",
          icon: <HiReceiptTax className="h-5 w-5 text-white" />,
          labels: { en: "Product List", bn: "product List" },
        },
      
      ],
    },

    {
      id: "category",
      path: "",
      icon: <HiReceiptTax className="h-5 w-5 text-white" />,
      labels: { en: "Product Category", bn: "Product Category" },
      children: [
        {
          id: "create product category",
          path: "/Dashboard/product-category/create",
          icon: <HiReceiptTax className="h-5 w-5 text-white" />,
          labels: { en: "create", bn: "create" },
        },
        {
          id: "list",
          path: "/Dashboard/product-category",
          icon: <HiReceiptTax className="h-5 w-5 text-white" />,
          labels: { en: "category List", bn: "category List" },
        },
      
      ],
    },
    {
      id: "user",
      path: "/Dashboard/Users",
      icon: <UserCircleIcon className="h-5 w-5 text-white" />,
      labels: { en: "User List", bn: "ইউজার তালিকা" },
    },
    {
      id: "admins",
      path: "/Dashboard/admin",
      icon: <UserCircleIcon className="h-5 w-5 text-white" />,
      labels: { en: "Admin List", bn: "এডমিন তালিকা" },
    },
  
    {
      id: "breakingnews",
      path: "/Dashboard/BreakingNews",
      icon: <HiNewspaper className="h-5 w-5 text-white" />,
      labels: { en: "Breaking News", bn: "ব্রেকিং নিউজ" },
    },
    {
      id: "welcomesection",
      path: "/Dashboard/WelcomeSection",
      icon: <PresentationChartBarIcon className="h-5 w-5 text-white" />,
      labels: { en: "Welcome Section", bn: "ওয়েলকাম সেকশন" },
    },
    {
      id: "content",
      path: "/Dashboard/Content",
      icon: <MdContentPaste className="h-5 w-5 text-white" />,
      labels: { en: "Manage Contents", bn: "কনটেন্ট" },
    },
    {
      id: "faq",
      path: "/Dashboard/Faq",
      icon: <FaQuoteLeft className="h-5 w-5 text-white" />,
      labels: { en: "Manage FAQs", bn: "প্রশ্নোত্তর" },
    },
    {
      id: "header",
      path: "/Dashboard/Header",
      icon: <FaHeading className="h-5 w-5 text-white" />,
      labels: { en: "Header", bn: "হেডার" },
    },
    {
      id: "hotSpot",
      path: "/Dashboard/HotSpot",
      icon: <RiHotspotFill className="h-5 w-5 text-white" />,
      labels: { en: "HotSpot One", bn: "হটস্পট ওয়ান" },
    },
    {
      id: "hotSpotTwo",
      path: "/Dashboard/HotSpotTwo",
      icon: <RiHotspotFill className="h-5 w-5 text-white" />,
      labels: { en: "HotSpot Two", bn: "হটস্পট টু" },
    },
    {
      id: "email",
      path: "/Dashboard/Email",
      icon: <BiLogoGmail className="h-5 w-5 text-white" />,
      labels: { en: "Email", bn: "ই-মেইল" },
    },
    {
      id: "footersection",
      path: "/Dashboard/FooterSection",
      icon: <InboxIcon className="h-5 w-5 text-white" />,
      labels: { en: "Footer Section", bn: "ফুটার সেকশন" },
    },
  ];
  

  return (
    <div
      className={`fixed md:relative transition ${
        hamburger ? "left-0" : "left-[-30rem]"
      } md:left-0 z-[30] transition-all duration-500`}
    >
    <Card className="h-screen no-scrollbar overflow-y-scroll py-2 shadow-xl shadow-blue-gray-900/5 bg-primary rounded-none">
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

        {/* Replace Dropdown with Menu here */}
        <Menu
         className="custom-menu"
          style={customMenuStyle}
          mode="inline"
          selectedKeys={[activeItem]}
          onClick={(e) => setActiveItem(e.key)}
          items={ menuItems.map(item =>
            adminPermissions.includes(item.id) ?
            ({
            key: item.id,
            label: <Link href={item.path}>
             <span style={customItemStyle}> {currentLanguage === "en" ? item.labels.en : item.labels.bn}</span>
              </Link>,
            icon: <span style={customItemStyle}>
              {item.icon}
            </span>,
            children: item.children?.map(child => ({
              key: child.id,
              label: <Link href={child.path}>
              <span style={customItemStyle}>  {currentLanguage === "en" ? child.labels.en : child.labels.bn}</span>
                </Link>,
              icon: <span style={customItemStyle}>
              {child.icon}
            </span>,
            })),
          }) : null)}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
