"use client";
import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useGetGrievanceByIdQuery } from '@/redux/Feature/User/Grievance/grievanceApi'; 
import { Spin, Tag, Tooltip } from 'antd'; 
import labels from "../../../../../translationData/HomePage.json";
import getTranslation from '@/context/getTranslationUtility';
import { IoPrint } from "react-icons/io5";
// import { PDFDownloadLink} from "@react-pdf/renderer";
import { LanguageContext } from '@/context/LanguageContext';
// import PDFDocument from './PDFDocument';
import jsPDF from "jspdf";
// import "jspdf-autotable";
// import bengaliFont from "../../../../../../public/fonts/kalpurush.ttf";

import { FaDownload } from 'react-icons/fa';

// const bengaliFont = dynamic(() => import('../../../../../../public/fonts/kalpurush.ttf'), { ssr: false });

  
const GrievanceForm = labels.GrievanceForm;


const getBase64Image = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

const stripHtmlTags = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};


const loadFont = async () => {
try {
  const response = await fetch('/fonts/kalpurush.ttf');

  if (!response.ok) {
    throw new Error('Failed to fetch font');
  }

  const fontData = await response.arrayBuffer();

  // Safely encode ArrayBuffer to Base64
  const base64String = btoa(
    Array.from(new Uint8Array(fontData))
      .map((byte) => String.fromCharCode(byte))
      .join('')
  );

  return base64String;
} catch (error) {
  console.error('Error loading font:', error);
  return null; // Ensure safe fallback
}
};





const ViewGrievance = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const searchParams = useSearchParams();
  const grievanceId = searchParams.get('id');
  const { data, isLoading, error } = useGetGrievanceByIdQuery(grievanceId);
  const toLabel = getTranslation("toLabel", currentLanguage, GrievanceForm);
  const officerTitle = getTranslation("officerTitle", currentLanguage, GrievanceForm);
  const officerLocation = getTranslation("officerLocation", currentLanguage, GrievanceForm);
  const subjectLabel = getTranslation("subjectLabel", currentLanguage, GrievanceForm);
  const salutation = getTranslation("salutation", currentLanguage, GrievanceForm);
  const faithfullyYours = getTranslation("faithfullyYours", currentLanguage, GrievanceForm);
  const track = getTranslation("track", currentLanguage, GrievanceForm);
  const status = getTranslation("status", currentLanguage, GrievanceForm);
  const attachmentsLabel = getTranslation("attachmentsLabel", currentLanguage, GrievanceForm);
  const mobileLabel = getTranslation("mobileLabel", currentLanguage, GrievanceForm);
  const date = getTranslation("date", currentLanguage, GrievanceForm);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading grievance details.</div>;
  }

  const grievance = data?.data;
  // console.log(grievance)
  const styledGrievanceDetails = grievance?.grievanceDetails.replace(
  '<p>',
  '<p style="width: 700px; text-align: justify; font-size: 22px; word-wrap: break-word;  overflow-wrap: break-word;">'
);


  const parsedProofs = typeof grievance?.relatedProofs === "string" ? JSON.parse(grievance?.relatedProofs) : grievance?.relatedProofs;
  // console.log(parsedProofs)


  const handlePrint = () => {
 
    const imagesHtml =  parsedProofs.length > 0
    ? parsedProofs
        .map((proof ,index) => {
          const fileExtension = proof.file.split('.').pop().toLowerCase();
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(fileExtension);
  
          const detailsHtml = `<p>${proof?.details}</p>`;
  
          if (isImage) {
            return `
              <div style="margin-bottom: 120px;">
          
                <div style="display: flex;">
              <p><strong>${index + 1}. </strong> </p>
              <div>
              <p>Attachment-${index + 1}</p>
              <p>${detailsHtml}</p>
                <img 
                  src="${process.env.NEXT_PUBLIC_IMAGE_URL}${proof.file}" 
                  alt="Proof" 
                  style="width: 500px; height: auto; margin: 10px; display: inline-block;" 
                />
                </div>
              </div>
              </div>
            `;
          } else {
            return `
              <div>
              <div style="display: flex;">
              <p><strong>${index + 1}.</strong> </p>
              <div>
              <p>Attachment-${index + 1}</p>
              <p>${detailsHtml}</p>
              <p> This file is not an image type. You need to print it separately from the view page.</p>
              </div>
              </div>
              </div>
            `;
          }
        }) : ""
  

  
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  
    const content = `
    <div style="
      padding-left: 20px; 
      padding-right: 20px; 
      padding-top: 20px; 
      font-family: Arial, sans-serif; 
      width: 100%; 
      box-sizing: border-box;
    ">
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          font-size: 22px; 
        }
        
        .content-container {
          width: 100%;
          text-align: left;
   
        }
  
        .content-container p {
          font-size: 22px; 
          margin-left:30px;
        }
  
        .large-text {
          font-size: 22px; 
          font-weight: bold;
          margin: 40px 0;
        }
  
        .description {
          margin-top: 70px;
          text-align: justify;
        }
      </style>
  
      <div class="content-container">
        <p style="margin-top:20px;">${new Date(grievance.createdAt).toLocaleDateString()}</p>
        <p  ><strong></strong> ${toLabel}</p>
        <p><strong></strong> ${officerTitle}</p>
        <p><strong></strong> ${officerLocation}</p>
        <p style="margin-bottom:65px; margin-top:50px; font-size: 22px;"><strong>${subjectLabel}</strong> ${grievance?.grievanceSubject}</p>
        <p><strong>${salutation}</strong></p>
        <p>
  ${styledGrievanceDetails}
</p>
        <p class="description"><strong>${faithfullyYours}</strong></p>
        <p style="font-size: 22px;">${grievance?.user?.userName}</p>
        <p style="font-size: 22px; margin-bottom:350px;">${grievance?.user?.userPhone}</p>
        ${
          parsedProofs.length > 0
            ? `<p style="padding-top:150px;"><strong>${currentLanguage === 'en' ? 'Proofs:' : 'সংযুক্তি সমূহ:'}</strong></p>
               <p>${imagesHtml}</p>`
            : ''
        }

      </div>
    </div>
  `;
  
  
  
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Grievance Submission</title>
        </head>
        <body>${content}</body>
      </html>
    `);
    doc.close();
  
    // Ensure images are fully loaded before printing
  const images = iframe.contentWindow.document.querySelectorAll("img");
  let loadedCount = 0;

  images.forEach(img => {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      }
    };
    img.onerror = () => {
      // Handle image load error if necessary
      loadedCount++;
      if (loadedCount === images.length) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      }
    };
  });

  // Fallback for cases with no images
  if (images.length === 0) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  }
};

const generatePDF = async () => {

  const doc = new jsPDF();
  // const fontBase64 = await loadFont();
    // doc.addFileToVFS('kalpurush.ttf', fontBase64);
    doc.addFont("/fonts/kalpurush.ttf", "kalpurush", "normal");
    doc.setFont("kalpurush");

  const marginLeft = 10;
  let currentY = 10; 

  // Add header and details
  doc.setFontSize(12);
  currentY += 10;
  doc.text(`Date: ${new Date(grievance.createdAt).toLocaleDateString()}`, marginLeft, currentY);
  currentY += 10;
  doc.text(`${toLabel}`, marginLeft, currentY);
  currentY += 10;
  doc.text(`${officerTitle}`, marginLeft, currentY);
  currentY += 10;
  doc.text(`${officerLocation}`, marginLeft, currentY);
  currentY += 10;
  doc.text(`${subjectLabel} ${grievance?.grievanceSubject}`, marginLeft, currentY);
  currentY += 20;
  doc.text(`${salutation}`, marginLeft, currentY);
  currentY += 10;

// Add cleaned-up grievance details
const cleanedGrievanceDetails = stripHtmlTags(grievance?.grievanceDetails || "");
// const grievanceText = doc.splitTextToSize(cleanedGrievanceDetails, 180);
doc.text(cleanedGrievanceDetails, marginLeft, currentY);
currentY += 20;

  doc.text(`${faithfullyYours}`, marginLeft, currentY);
  currentY += 10;
  doc.text(`${grievance?.user?.userName}`, marginLeft, currentY);
  currentY += 20;

  // Add proofs with spacing
  doc.text(`${attachmentsLabel}`, marginLeft, currentY);
  currentY += 10;

  if (parsedProofs && parsedProofs.length > 0) {
    for (let i = 0; i < parsedProofs.length; i++) {
      const proof = parsedProofs[i];
      const fileExtension = proof.file.split('.').pop().toLowerCase();
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(fileExtension);

      if (isImage) {
        const base64Image = await getBase64Image(`${process.env.NEXT_PUBLIC_IMAGE_URL}${proof.file}`);
        doc.text(`Proof ${i + 1}:`, marginLeft, currentY);
        currentY += 10; 
        doc.addImage(base64Image, 'JPEG', marginLeft, currentY, 50, 50); // Add image
        currentY += 60; // Add spacing after the image
        doc.text(`Details: ${proof.details || 'No details given'}`, marginLeft, currentY);
      } else {
        doc.text(`Proof ${i + 1}:`, marginLeft, currentY);
        currentY += 10; 
        doc.text(`Not an image you need to download it seperately.`, marginLeft, currentY);
        currentY += 10; 
        doc.text(`Details: ${proof.details || 'No details given'}`, marginLeft, currentY);
        currentY += 20; 
      }

      // Add additional margin between proofs
      currentY += 10;
    }
  } else {
    doc.text("No proofs available", marginLeft, currentY);
  }

  // Save the PDF
  doc.save("grievance-details.pdf");
};

  return (
    <div className="p-6 border border-blue-500 rounded-md">
    
      <div className="space-y-2">
        <div><strong>{track}:</strong> {grievance?.trackingNo}</div>
        <div>
          <strong>{status}:</strong>
          <Tag color={grievance?.grievanceStatus === "Pending" || grievance?.grievanceStatus === "Rejected" ? "red" : "green"}>
            {grievance?.grievanceStatus}
          </Tag>
        </div>
        <p>{toLabel}</p>
      <p>{officerTitle}</p>
      <p>{officerLocation}</p>
        <div><strong> {subjectLabel}</strong> {grievance?.grievanceSubject}</div>
        <br/>
        <br/>
        <p className=''>{salutation}</p>
        <div dangerouslySetInnerHTML={{ __html: grievance?.grievanceDetails }}
        className="text-justify max-w-full text-gray-700 p-4 border border-gray-300 rounded-md bg-gray-50"
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          width: "100%",
          boxSizing: "border-box",
        }}
        ></div>
        <br/>
        <br/>
        <p>{faithfullyYours},</p>
        <p className='font-bold'>{grievance?.user?.userName}</p>
        <p className='font-bold'>{grievance?.user?.userPhone}</p>
        <div>
        <p className='mb-5'> <strong> {currentLanguage === 'en' ? "Proofs:" : "সংযুক্তি সমূহ:"}</strong></p>
          <div>
            {parsedProofs && parsedProofs.length > 0 ? (
              <ul className="list-none pl-5 space-y-3">
                {parsedProofs.map((proof, index) => (
                  <li key={index} className="items-center gap-2 border border-gray-200 p-3 rounded-md bg-gray-50">
                    <a
                      href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${proof.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip title="Click to view">
                        <span className="text-blue-500 mt-5">{`${index + 1}. View Proof `}</span>
                      </Tooltip>
                    </a>
                    <p className=''> Details : {proof?.details? proof?.details : "No details given"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-red-500 bg-yellow-200 border border-black px-2 py-1 font-bold">
                No proofs available
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
      <div className='flex gap-4 items-center'>
      {/* <div>
        <button
        onClick={generatePDF}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <FaDownload/> {currentLanguage === 'en' ? "PDF" : "পিডিএফ"}
      </button>

      </div> */}

      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <IoPrint className="text-lg" />
          <span> {currentLanguage === 'en' ? "Print" : "প্রিন্ট"}</span>
        </button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ViewGrievance;