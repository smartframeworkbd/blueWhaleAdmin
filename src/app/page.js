"use client";
import DashboardTitle from "@/components/DashboardTitle/DashboardTitle";
import HomePage from "./(pages)/HomePage/page";
import { redirect } from "next/navigation";


// export default function Home() {
//   return (
//     <>
//        <DashboardTitle windowTitle={"হোম"}/>
//        <HomePage/>
//     </>
//   );
// }

export default function Home() {
  redirect("/Dashboard/AdminHome"); // Replace with your desired path
  return null;
}
