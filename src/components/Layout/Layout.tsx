import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [navbarTitle, setNavbarTitle] = useState<string>('Dashboard'); 
  const location = useLocation();
  useEffect(() => {
    const pathTitleMap: Record<string, string> = {
      '/Restaurant/Dashboard': 'Dashboard',
      '/Restaurant/ManageProfile': 'Profile',
      '/Restaurant/ManageReports': 'Reports',
      '/Restaurant/ManageProducts': 'Products',
      "/Restaurant/MainDepartment": "Products",
      "/Restaurant/AddDepartment": "Products",
      "/Restaurant/PrintGroup": "Products",
      "/Restaurant/Product": "Products",
      "/Restaurant/ComboProduct": "Products",
      "/Restaurant/MultiItemProgramming": "Products",
      "/Restaurant/UpsellByProduct": "Products",
      "/Restaurant/ImportProducts": "Products",

      '/Restaurant/MenuSetup': 'Menu-Setup',
      '/Restaurant/POSMenuSetup': 'Menu-Setup',
      '/Restaurant/ManageSoftwareSettings': 'Software Setting',
      '/Restaurant/KIOSKMenuSetup': 'Kiosk',
      '/Restaurant/TableQr': 'Manage Tables',
      '/Restaurant/StoreQRCode': 'Store QR',
      '/Restaurant/ManageOrders': 'Manage Orders',
      '/Restaurant/StripeSetup': 'Stripe Setup',
      '/Restaurant/ManageReasons': 'Manage Reasons',
    };

    const newTitle = pathTitleMap[location.pathname] || '';
    setNavbarTitle(newTitle);
  }, [location]);

  const toggleSidebarOption = () => setSidebarOpen(!sidebarOpen);

  const handleTitleChange = (title: string) => {
    // setNavbarTitle(title);
  };
  console.log(`toggle`, sidebarOpen)
  return (
    <div className={`page-body-wrapper flex ${sidebarOpen? 'sidebar-icon-only':''}`}>
      <div className={`absolute ${sidebarOpen?'z-[1]':'z-[3]'}`}>

      <Sidebar isOpen={!sidebarOpen} onTitleChange={handleTitleChange} /> 
      </div>
      <div className={`main-panel min-h-screen `} style={{ marginLeft: 'auto' }}>
      {/* {!sidebarOpen&&<div className=" fade offcanvas-backdrop show"></div>} */}
        <div className="sticky !z-10">
          <Navbar title={navbarTitle} toggleSidebar={toggleSidebarOption} />
        </div>
        <Outlet />
      </div>
    </div>

// 

  );
};

export default Layout;
