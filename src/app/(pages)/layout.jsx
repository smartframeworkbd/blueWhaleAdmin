"use client";
import React from "react";
import "../globals.css";
import { HomeNavbar } from "@/components/Navbar/HomeNavbar";
import Footer from "@/components/Footer/Footer";
import MarqueeN from "@/components/MarqueeN/MarqueeN";
import { LanguageContextProvider } from "@/context/LanguageContext";

const HomeLayout = ({ children }) => {
  return (
    <>
      <LanguageContextProvider>

        <MarqueeN/>
      <HomeNavbar />
      <div className="">{children}</div>
      <Footer />
      </LanguageContextProvider>
    </>
  );
};

export default HomeLayout;
