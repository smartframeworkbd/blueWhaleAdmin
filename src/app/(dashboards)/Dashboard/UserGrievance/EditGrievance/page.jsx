"use client";
import React, { useEffect, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateGrievanceMutation } from "@/redux/Feature/User/Grievance/grievanceApi";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";

const EditGrievance = ({ selectedGrievance }) => {
  const dispatch = useAppDispatch();
  const [updateGrievance, { isLoading, isError, error, isSuccess, data }] =
    useUpdateGrievanceMutation();

  // State for message
  const [message, setMessage] = useState("");

  const statusMessages = {
    Accepted: "আপনার অভিযোগ গ্রহণ করা হয়েছে এবং নিষ্পত্তির জন্য প্রক্রিয়াধীন রয়েছে",
    Rejected: "আপনার অভিযোগটি ভিত্তিহীন বা উপযুক্ত প্রমাণের অভাব",
    Completed: "আপনার অভিযোগটির  প্রক্রিয়া সম্পন্ন হয়েছে",
  };

  // Initialize message based on selectedGrievance status
  useEffect(() => {
    if (selectedGrievance?.grievanceStatus) {
      setMessage(statusMessages[selectedGrievance.grievanceStatus] || "");
    }
  }, [selectedGrievance]);

  const handleSubmit = (formData) => {
    console.log(formData);

    updateGrievance({ id: selectedGrievance?.id, data: { ...formData, message } });
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen(false));
  };

  const handleStatusChange = (status) => {
    setMessage(statusMessages[status] || ""); // Update the message based on the selected status
  };

  return (
    <div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="edit"
        data={data}
        buttonName="Update"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Status Dropdown */}
          <ZSelect
            name="grievanceStatus"
            label="Status"
            options={[
              { label: "Pending", value: "Pending", disabled: true},
              { label: "Accepted", value: "Accepted" },
              { label: "Rejected", value: "Rejected" },
              { label: "Completed", value: "Completed" },
            ]}
            value={selectedGrievance?.grievanceStatus}
            placeholder="Select status"
            onSelectChange={handleStatusChange}
          />

          {/* Message Input */}
        { message &&
          <ZInputTextArea
          name="message" 
          value={message}  
          onSelectChange={ setMessage}/>
        }
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditGrievance;
