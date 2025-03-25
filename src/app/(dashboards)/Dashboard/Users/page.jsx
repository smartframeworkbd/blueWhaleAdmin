"use client";

import React, { useState, useContext } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Space, Tag, Tooltip } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import EditModal from "@/components/Modal/EditModal";
import AddModal from "@/components/Modal/AddModal";
import AddUser from "./AddUser/page";
import EditUser from "./EditUser/page";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/Feature/Admin/usersmanagement/userApi";
import { LanguageContext } from "@/context/LanguageContext";


const Users = () => {
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, error, isLoading: uLoading, isSuccess } = useGetUsersQuery();
  const [deleteUser, { isLoading: dCIsloading, isError, isSuccess: uIsSuccess, data: dUdata, error: dError }] = useDeleteUserMutation();

  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );

  const userData = data?.data?.map((user, index) => ({
    id: user.Id,
    key: index + 1,
    username: user?.userName,
    email: user?.userEmail,
    phone: user?.userPhone,
    status: user?.status,
  }));

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteUser = () => {
    deleteUser(selectedUser?.id);
  };



    // Translation mapping
    const translations = {
      en: {
        title: "User Management",
        serial: "Serial",
        username: "Username",
        email: "Email",
        phone: "Phone",
        status: "Status",
        action: "Action",
        active: "Active",
        inactive: "Inactive",
        edit: "Edit",
        delete: "Delete",
        addUser: "Add User",
        createUser: "Create User",
        editUser: "Edit User",
        deleteUser: "Delete User",
        deleteDescription: "Deleting this user will remove all associated data.",
      },
      bn: {
        title: "ব্যবহারকারী ব্যবস্থাপনা",
        serial: "সিরিয়াল",
        username: "ইউজারনেম",
        email: "ইমেইল",
        phone: "ফোন",
        status: "স্ট্যাটাস",
        action: "অ্যাকশন",
        active: "সক্রিয়",
        inactive: "নিষ্ক্রিয়",
        edit: "এডিট করুন",
        delete: "ডিলিট করুন",
        addUser: "ব্যবহারকারী যোগ করুন",
        createUser: "নতুন ব্যবহারকারী তৈরি করুন",
        editUser: "ব্যবহারকারী এডিট করুন",
        deleteUser: "ব্যবহারকারী ডিলিট করুন",
        deleteDescription: "এই ব্যবহারকারী ডিলিট করলে  সম্পর্কিত তথ্য মুছে যাবে।",
      },
    };

    const t = translations[currentLanguage];

  const columns = [
    {
      title: t.serial,
      dataIndex: "key",
      key: "key",
    },
    {
      title: t.username,
      dataIndex: "username",
      key: "username",
    },
    {
      title: t.email,
      dataIndex: "email",
      key: "email",
    },
    {
      title: t.phone,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t.status,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === true ? "green" : "red"}>
          <span className="font-bold">{status === true ? t.active : t.inactive}</span>
        </Tag>
      ),
    },
    {
      title: t.action,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => handleEditUser(record)}>
            <Tooltip title={t.edit} placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title={t.delete} placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      
      <h1 className="text-2xl font-bold mb-8 text-center">{t.title}</h1>
      <DashboardTable columns={columns} data={userData} loading={uLoading} />

      <AddModal isAddModalOpen={isAddModalOpen} title={t.createUser}>
        <AddUser />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title={t.editUser}>
        <EditUser selectedUser={selectedUser} />
      </EditModal>

      <DeleteModal
        data={dUdata}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={uIsSuccess}
        title={t.deleteUser}
        onDelete={handleDeleteUser}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={t.deleteDescription}
      />
    </>
  );
};

export default Users;
