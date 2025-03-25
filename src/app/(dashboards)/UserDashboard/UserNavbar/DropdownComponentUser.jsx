import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Button, Typography } from 'antd';
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

const profileMenuItems = [
  {
    label: "Sign Out",
    icon: <PoweroffOutlined />,
  },
];

const DropdownComponentUser = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const pathName = usePathname();

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    Cookies.remove('userToken', { path: '/' });
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged out successfully');
      router.push('/');
    }, 1000);
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: 1 });
    }
  }, [loading]);

  useEffect(() => {
    toast.dismiss(1);
  }, []);

  const menu = (
    <Menu>
      {profileMenuItems.map(({ label, icon }, key) => {
        const isLastItem = key === profileMenuItems.length - 1;
        return (
          <Menu.Item
            key={label}
            onClick={isLastItem ? handleLogout : null}
            className={`flex items-center gap-2 ${
              isLastItem ? "text-red-500" : ""
            }`}
          >
            <span className="flex items-center gap-2">
              {icon}
              <Typography.Text>{label}</Typography.Text>
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Toaster />
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
        <Button type="text" className="flex items-center gap-2">
          <FaUserCircle className='text-white' size={25} />
          <span className="text-white">{userInfo?.userName || 'User'}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownComponentUser;
