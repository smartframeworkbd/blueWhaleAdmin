"use client"
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen, setIsCustomerModalOpen, setIsProductModalOpen } from "@/redux/Modal/ModalSlice";
import { Modal } from "antd";


const AddModal = ({ children, isAddModalOpen, title, width }) => {
  
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <>
      <Modal
        className="m-5"
        title={title}
        centered
        open={isAddModalOpen}
        width={width ? width : 600}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        {children}
        </div>
      </Modal>
    </>
  );
};

export default AddModal;
