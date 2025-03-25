"use client"
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import DashboardTable from "@/components/Table/DashboardTable";
import { useGetAllAdminQuery } from "@/redux/Feature/Admin/AdminApi/AdminApi";
import { Tag, Spin, Space, Tooltip } from "antd";
import { useContext, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditModal from "@/components/Modal/EditModal";
import EditAdmin from "./EditAdmin/page";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteAdminMutation } from "@/redux/Feature/Admin/AdminApi/AdminApi"; // Import delete mutation
import DeleteModal from "@/components/Modal/DeleteModal"; // Import DeleteModal
import AddModal from "@/components/Modal/AddModal";
import AdminRegister from "../admin-register/page";

const Admin = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const { data: adminData, isLoading } = useGetAllAdminQuery();
  const [deleteAdmin, { isLoading: dFIsLoading, isError : deleteError, isSuccess: dIsSuccess, data: dFData, error: dError }] = useDeleteAdminMutation();
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  const translations = {
    en: {
      title: "Admin Management",
      adminName: "Admin Name",
      adminEmail: "Admin Email",
      phoneNumber: "Phone Number",
      role: "Role",
      permissions: "Permissions",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      createAdmin: "Create Admin",  // Button text
      deleteAdminTitle: "Delete Admin", // Modal title
      deleteDescription: "Under the Admin, corresponding data will be removed" // Modal description
    },
    bn: {
      title: "অ্যাডমিন ব্যবস্থাপনা",
      adminName: "অ্যাডমিনের নাম",
      adminEmail: "অ্যাডমিন ইমেইল",
      phoneNumber: "ফোন নম্বর",
      role: "ভূমিকা",
      permissions: "অনুমতিসমূহ",
      status: "স্থিতি",
      active: "সক্রিয়",
      inactive: "নিষ্ক্রিয়",
      createAdmin: "অ্যাডমিন তৈরি করুন",  // Button text in Bengali
      deleteAdminTitle: "অ্যাডমিন মুছে ফেলুন", // Modal title in Bengali
      deleteDescription: "অ্যাডমিনের সাথে সম্পর্কিত তথ্য মুছে ফেলা হবে" // Modal description in Bengali
    },
  };

  const lang = translations[currentLanguage];

  // Map API data to match table column keys
  const formattedData = adminData?.data.map((admin) => ({
    key: admin.Id,
    id: admin.Id, // Unique key for each row
    adminFullName: admin.adminFullName,
    adminEmail: admin.adminEmail,
    adminPhone: admin.adminPhone,
    adminRole: admin.adminRole,
    adminPermissions: JSON.parse(admin.adminPermissions), // Parse permissions array
    status: admin.adminStatus,
  }));

  const handleEditAdmin = (formattedData) => {
    setSelectedAdmin(formattedData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (formattedData) => {
    setSelectedAdmin(formattedData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteAdmin = () => {

 deleteAdmin(selectedAdmin?.id);
  };

  const columns = [
    {
      title: lang.adminName,
      dataIndex: "adminFullName",
      key: "adminFullName",
    },
    {
      title: lang.adminEmail,
      dataIndex: "adminEmail",
      key: "adminEmail",
    },
    {
      title: lang.phoneNumber,
      dataIndex: "adminPhone",
      key: "adminPhone",
    },
    {
      title: lang.role,
      dataIndex: "adminRole",
      key: "adminRole",
    },
    {
      title: lang.permissions,
      dataIndex: "adminPermissions",
      key: "adminPermissions",
      render: (permissions) => (
        <div>
          {permissions?.map((perm, index) => (
            <Tag color="blue" key={index}>
              {perm}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: lang.status,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditAdmin(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">{lang.title}</h1>

      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title={lang.createAdmin}  />
      </div>

      <AddModal isAddModalOpen={isAddModalOpen}>
        <AdminRegister />
      </AddModal>

      {/* Show spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <DashboardTable
          columns={columns}
          data={formattedData || []} // Pass formatted data
          loading={isLoading}
        />
      )}

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Admin">
        <EditAdmin selectedAdmin={selectedAdmin} />
      </EditModal>

      {/* Delete Modal Component */}
      <DeleteModal
        data={dFData}
        error={dError}
        isLoading={dFIsLoading}
        isSuccess={dIsSuccess}
        title={lang.deleteAdminTitle}
        onDelete={handleDeleteAdmin}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={deleteError}
        description={lang.deleteDescription}
      />
    </div>
  );
};

export default Admin;
