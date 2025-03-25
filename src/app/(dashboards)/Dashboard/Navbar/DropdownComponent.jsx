import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

const profileMenuItems = [
  {
    label: "Profile",
    icon: <UserOutlined />,
    link: "/Dashboard/setting",
  },
  {
    label: "Sign Out",
    icon: <PoweroffOutlined />,
  },
];

const DropdownComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminInfo');
    Cookies.remove('authToken', { path: '/' });
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
      {profileMenuItems.map(({ label, icon, link }, key) => {
        const isLastItem = key === profileMenuItems.length - 1;
        return (
          <Menu.Item
            key={label}
            onClick={isLastItem ? handleLogout : null}
            className={pathName === link ? "bg-blue-500 text-white rounded-md" : ""}
          >
            {link ? (
              <Link href={link}>
                <Typography.Text>
                  {icon} {label}
                </Typography.Text>
              </Link>
            ) : (
              <Typography.Text type={isLastItem ? "danger" : "default"}>
                {icon} {label}
              </Typography.Text>
            )}
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
          <span className="text-white">{admin?.adminFullName}</span>
          <DownOutlined className="text-white" />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
