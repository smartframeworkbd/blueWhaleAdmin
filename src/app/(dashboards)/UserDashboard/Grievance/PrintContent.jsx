import { LanguageContext } from '@/context/LanguageContext';
import React, { useContext } from 'react';
import labels from "../../../../translationData/HomePage.json";
import getTranslation from '@/context/getTranslationUtility';

const GrievanceForm = labels.GrievanceForm;

const PrintContent = ({ type, subject, description, files, proofDetails, userName }) => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  // console.log(description)
  const toLabel = getTranslation("toLabel", currentLanguage, GrievanceForm);
  const officerTitle = getTranslation("officerTitle", currentLanguage, GrievanceForm);
  const officerLocation = getTranslation("officerLocation", currentLanguage, GrievanceForm);
  const subjectLabel = getTranslation("subjectLabel", currentLanguage, GrievanceForm);
  const salutation = getTranslation("salutation", currentLanguage, GrievanceForm);
  const faithfullyYours = getTranslation("faithfullyYours", currentLanguage, GrievanceForm);
  const attachmentsLabel = getTranslation("attachmentsLabel", currentLanguage, GrievanceForm);
  const fileLabel = getTranslation("fileLabel", currentLanguage, GrievanceForm);
  const descriptionLabel = getTranslation("descriptionLabel", currentLanguage, GrievanceForm);
  
  return (
    <div className="p-5  border border-blue-500">
     <div className='space-y-2'>
     <p>{toLabel}</p>
      <p>{officerTitle}</p>
      <p>{officerLocation}</p>
     </div>
   
      <p className="text-base mt-[20px] mb-[20px]">
        <strong>{subjectLabel}</strong> {subject}
      </p>

      <p className="">{salutation}</p>
      <p className="text-base mb-10"  
            dangerouslySetInnerHTML={{ __html: description}}>             
            </p>


      <div className='space-y-2'>
      <p>{faithfullyYours}</p>
      <p className="uppercase font-bold">{userName}</p>
      <p className="text-base">
        <strong>{attachmentsLabel}</strong>
      </p>
      </div>
      
      <div className="ml-4 space-y-3">
        {files.map((file, index) => (
          <div key={index} className="border border-gray-200 p-3 rounded-md bg-gray-50 space-y-1">
            <p className="font-semibold">{fileLabel} {file.name}</p>
            <p>{descriptionLabel} {proofDetails[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintContent;
