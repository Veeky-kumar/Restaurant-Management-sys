import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

interface SidebarProps {
  isOpen: boolean;
  onTitleChange: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onTitleChange }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const [isActive, setIsActive] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const pathTitleMap: Record<string, string> = {
      "/Restaurant/Dashboard": "Dashboard",
      "/Restaurant/ManageProfile": "Profile",
      "/Restaurant/ManageReports": "Reports",
      "/Restaurant/ManageProducts": "Products",
      "/Restaurant/MainDepartment": "Products",
      "/Restaurant/AddDepartment": "Products",
      "/Restaurant/PrintGroup": "Products",
      "/Restaurant/Product": "Products",
      "/Restaurant/ComboProduct": "Products",
      "/Restaurant/MultiItemProgramming": "Products",
      "/Restaurant/UpsellByProduct": "Products",


      "/Restaurant/MenuSetup": "Menu-Setup",
      "/Restaurant/ManageSoftwareSettings": "Software Setting",
      "/Restaurant/KIOSKMenuSetup": "Kiosk",
      "/Restaurant/TableQr": "Manage Tables",
      "/Restaurant/StoreQRCode": "Store QR",
      "/Restaurant/ManageOrders": "Manage Orders",
      "/Restaurant/StripeSetup": "Stripe Setup",
      "/Restaurant/ManageReasons": "Manage Reasons",
    };

    const newTitle = pathTitleMap[location.pathname];
    console.log(newTitle);
    setIsActive(newTitle);
  }, [location]);

  const handleItemClick = (title: string) => {
    onTitleChange(title);
    setIsActive(title);
  };

  const handleCollapse = () => {
    setIsCollapse((prev) => !prev);
    console.log("collapse", !isCollapse);
  };

  const checkLoginStatus = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/Restaurant/Login");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/Restaurant/Login");
  };

  return (
    <div
      className={` sidebar fixed top-0 left-0 z-40 h-full bg-white shadow-lg transform transition-all duration-300 ${
        isOpen ? "sidebar-open" : "sidebar-closed"
      } transition-all`}
      // style={{ }}
    >
      {/* <div className="fade offcanvas-backdrop show"></div> */}
      <div className="page-body-wrapper">
      <nav
          className={`sidebar sidebar-offcanvas ${isOpen ? "open" : "closed"}`}
          id="sidebar"
          style={{
            position: "fixed",
            height: "100vh",
            overflowY: isOpen ? "auto" : "hidden",
            width: isOpen ? "260px" : "70px", // adjust as per your design
            transition: "width 0.3s"
          }}
        >
          <div className="text-center navbar-brand-wrapper align-items-center justify-content-start">
            <div className="logo_nvbar">
              <a className="navbar-brand brand-logo" href="#">
                <img
                  src="../Content/BrandImages/new-logo.jpg"
                  alt="Brand Logo"
                  id="imgRestaurantBrandLogo_LoggedIn_RestaurantLayout"
                  className="mr-4"
                  style={{ width: "100%", maxWidth: "128px" }}
                />
              </a>
            </div>
          </div>
          <ul className={`nav ${isOpen ? "pb-5" : "pb-1"}`}>
            <li className="nav-item nav-category mt-0"></li>
            <li
              id="li_nav_Pofile_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Profile" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                className="nav-link px-0"
                to="/Restaurant/ManageProfile"
                onClick={() => handleItemClick("Profile")}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    id="person"
                  >
                    <g data-name="Layer 2">
                      <path
                        d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z"
                        data-name="person"
                      ></path>
                    </g>
                  </svg>
                  <span className="menu-title">Profile</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>
            <li
              id="li_nav_Dashboad_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Dashboard" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                className="nav-link px-0"
                to="/Restaurant/Dashboard"
                onClick={() => handleItemClick("Dashboard")}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                  >
                    <path
                      id="Vector"
                      d="M6.429,18H16.714A1.289,1.289,0,0,0,18,16.714V6.429H6.429ZM16.714,0H1.286A1.289,1.289,0,0,0,0,1.286V5.143H18V1.286A1.289,1.289,0,0,0,16.714,0ZM0,16.714A1.289,1.289,0,0,0,1.286,18H5.143V6.429H0Z"
                      fill="#5a58c0"
                    ></path>
                  </svg>
                  <span className="menu-title">Dashboard</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>
            <li
              id="li_nav_Reports_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Reports" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                to="/Restaurant/ManageReports"
                className="nav-link px-0"
                onClick={() => handleItemClick("Reports")}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.423"
                    height="14.506"
                    viewBox="0 0 12.423 14.506"
                  >
                    <path
                      d="M12.423,11.344V.757A.76.76,0,0,0,11.665,0H.757A.76.76,0,0,0,0,.757V13.749a.76.76,0,0,0,.757.757H9.279ZM5.246,2.557h4.3a.436.436,0,0,1,0,.871h-4.3a.44.44,0,0,1-.436-.436A.418.418,0,0,1,5.246,2.557Zm0,2.822h4.3a.436.436,0,0,1,0,.871h-4.3a.44.44,0,0,1-.436-.436A.428.428,0,0,1,5.246,5.378Zm0,2.86h4.3a.436.436,0,0,1,0,.871h-4.3a.44.44,0,0,1-.436-.436A.418.418,0,0,1,5.246,8.238ZM3.2,11.968H2.878a.436.436,0,1,1,0-.871H3.2a.44.44,0,0,1,.436.436A.428.428,0,0,1,3.2,11.968Zm0-2.86H2.878a.436.436,0,1,1,0-.871H3.2a.44.44,0,0,1,.436.436A.418.418,0,0,1,3.2,9.109Zm0-2.841H2.878a.436.436,0,1,1,0-.871H3.2a.44.44,0,0,1,.436.436A.418.418,0,0,1,3.2,6.268Zm0-2.822H2.878a.436.436,0,1,1,0-.871H3.2a.44.44,0,0,1,.436.436A.428.428,0,0,1,3.2,3.447Zm1.591,8.067a.44.44,0,0,1,.436-.436h4.3a.436.436,0,1,1,0,.871H5.246A.433.433,0,0,1,4.791,11.514Z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <span className="menu-title">Reports</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>

            <li
              id="li_nav_Products_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Products" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                className="nav-link px-0"
                to="/Restaurant/ManageProducts"
                onClick={() => handleItemClick("Products")}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.998"
                    height="18"
                    viewBox="0 0 18.998 18"
                  >
                    <g id="Product" transform="translate(11671 -17496)">
                      <rect
                        id="Rectangle_17830"
                        data-name="Rectangle 17830"
                        width="18"
                        height="18"
                        transform="translate(-11671 17496)"
                        fill="#fff"
                        opacity="0"
                      ></rect>
                      <g
                        id="fast-food-sharp"
                        transform="translate(-11671.125 17494.875)"
                      >
                        <path
                          id="Path_12868"
                          data-name="Path 12868"
                          d="M14.923,24.75H7.438L5.9,26.062,4.363,24.75H1.125v.9A1.977,1.977,0,0,0,2.9,27.75a3.072,3.072,0,0,0,.644,1.48,2.555,2.555,0,0,0,2.009.919H10.5a2.553,2.553,0,0,0,2.009-.92,3.08,3.08,0,0,0,.644-1.48,1.7,1.7,0,0,0,1.312-.7,2.3,2.3,0,0,0,.46-1.4Z"
                          transform="translate(0 -11.026)"
                          fill="#fff"
                        ></path>
                        <path
                          id="Path_12869"
                          data-name="Path 12869"
                          d="M4.462,17.774,5.9,18.831l1.45-1.057h7.574v-.3a1.5,1.5,0,0,0-1.2-1.47,3.415,3.415,0,0,0-1.332-2.7,4.847,4.847,0,0,0-3.018-.929h-2.7c-2.558,0-4.291,1.454-4.349,3.629a1.5,1.5,0,0,0-1.2,1.47v.3H4.462Z"
                          transform="translate(0 -5.251)"
                          fill="#fff"
                        ></path>
                        <path
                          id="Path_12870"
                          data-name="Path 12870"
                          d="M24.189,4.125h-2.8l.334-1.337L23.4,2.212l-.375-1.087-2.325.75-.543,2.25H14.625v1.2h.7l.07.6h.277a6.032,6.032,0,0,1,3.754,1.182,4.571,4.571,0,0,1,1.308,1.6,4.655,4.655,0,0,1,.4,1.224,2.7,2.7,0,0,1,1.046,3.408,3.6,3.6,0,0,1,.239,1.289,3.474,3.474,0,0,1-.8,2.248,3,3,0,0,1-1.193.861,4.1,4.1,0,0,1-.695,1.237c-.044.053-.09.106-.136.156h2.827a.848.848,0,0,0,.937-.862L24.726,5.327h.7v-1.2Z"
                          transform="translate(-6.301)"
                          fill="#fff"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span className="menu-title">Products</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>

            <li
              id="li_nav_Menu_Setup_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Menu-Setup" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                to="/Restaurant/MenuSetup"
                className="nav-link px-0"
                onClick={() => handleItemClick("Menu Setup")}
              >
                <div className="nav-box">
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 9H20V7H4V9ZM4 13H20V11H4V13ZM4 17H20V15H4V17Z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <span className="menu-title">Menu-Setup</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>
            <li
              id="li_nav_SoftwareSetting_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Software Setting" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                to="/Restaurant/ManageSoftwareSettings"
                className="nav-link px-0"
                onClick={() => handleItemClick("Software setup")}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.083"
                    height="18.084"
                    viewBox="0 0 18.083 18.084"
                  >
                    <g
                      id="Menu_Setup"
                      data-name="Menu Setup"
                      transform="translate(11656.083 -17505.916)"
                    >
                      <rect
                        id="Rectangle_17831"
                        data-name="Rectangle 17831"
                        width="18"
                        height="18"
                        transform="translate(-11656 17506)"
                        fill="#fff"
                        opacity="0"
                      ></rect>
                      <path
                        id="Vector"
                        d="M8.01,0a.908.908,0,0,0-.665.3A1.235,1.235,0,0,0,7.06.906s0,0,0,0L6.794,2.314a7.055,7.055,0,0,0-.96.4L4.648,1.9a1.235,1.235,0,0,0-.63-.227.908.908,0,0,0-.682.259l-1.4,1.4a.909.909,0,0,0-.259.682,1.235,1.235,0,0,0,.227.631l.8,1.18a7.055,7.055,0,0,0-.4.965L.906,7.06A1.236,1.236,0,0,0,.3,7.345.909.909,0,0,0,0,8.01V9.99a.908.908,0,0,0,.3.665,1.236,1.236,0,0,0,.607.285l1.409.267a7.054,7.054,0,0,0,.4.959L1.9,13.352a1.235,1.235,0,0,0-.227.631.909.909,0,0,0,.259.682l1.4,1.4a.908.908,0,0,0,.682.259,1.235,1.235,0,0,0,.63-.227l1.18-.8a7.056,7.056,0,0,0,.965.4l.266,1.406a1.236,1.236,0,0,0,.285.607.908.908,0,0,0,.665.3H9.99a.908.908,0,0,0,.665-.3,1.236,1.236,0,0,0,.285-.606h0l.267-1.408a7.054,7.054,0,0,0,.96-.4l1.185.808a1.235,1.235,0,0,0,.63.227.909.909,0,0,0,.682-.259l1.4-1.4a.909.909,0,0,0,.259-.682,1.235,1.235,0,0,0-.227-.63l-.8-1.18a7.054,7.054,0,0,0,.4-.965l1.406-.266a1.237,1.237,0,0,0,.607-.285A.908.908,0,0,0,18,9.99V8.01a.909.909,0,0,0-.3-.665,1.236,1.236,0,0,0-.606-.285l-1.408-.267a7.055,7.055,0,0,0-.4-.959L16.1,4.648a1.236,1.236,0,0,0,.227-.63.908.908,0,0,0-.259-.682l-1.4-1.4a.909.909,0,0,0-.682-.259,1.236,1.236,0,0,0-.63.227l-1.18.8a7.056,7.056,0,0,0-.965-.4L10.941.905A1.235,1.235,0,0,0,10.656.3.908.908,0,0,0,9.991,0ZM9,5.59A3.409,3.409,0,1,1,5.591,9,3.4,3.4,0,0,1,9,5.59Z"
                        transform="translate(-11656.083 17505.916)"
                        fill="#fff"
                      ></path>
                    </g>
                  </svg>
                  <span className="menu-title">Software setup</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>
            <li
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Peripherals" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <a
                href=""
                className={`nav-link dropdown-toggle  `}
                data-toggle="collapse"
                aria-expanded={`${isCollapse ? "true" : "false"}`}
                onClick={() => {
                  handleCollapse();
                }}
              >
                <div className="nav-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18.083"
                    viewBox="0 0 18 18.083"
                  >
                    <g
                      id="Menu_Setup"
                      data-name="Menu Setup"
                      transform="translate(11656 -17505.916)"
                    >
                      <rect
                        id="Rectangle_17831"
                        data-name="Rectangle 17831"
                        width="18"
                        height="18"
                        transform="translate(-11656 17506)"
                        fill="#fff"
                        opacity="0"
                      ></rect>
                      <g
                        id="typcn:printer"
                        transform="translate(-11659.25 17503)"
                      >
                        <path
                          id="Vector"
                          d="M13.263,2.842V.947A.947.947,0,0,0,12.316,0H3.789a.947.947,0,0,0-.947.947V2.842A2.846,2.846,0,0,0,0,5.684v9.474A2.846,2.846,0,0,0,2.842,18H13.263a2.846,2.846,0,0,0,2.842-2.842V5.684A2.846,2.846,0,0,0,13.263,2.842ZM4.737,1.895h6.632V6.632H4.737ZM2.842,4.737V7.579a.947.947,0,0,0,.947.947h8.526a.947.947,0,0,0,.947-.947V4.737a.949.949,0,0,1,.947.947V8.053a1.423,1.423,0,0,1-1.421,1.421H3.316A1.423,1.423,0,0,1,1.895,8.053V5.684A.949.949,0,0,1,2.842,4.737ZM13.263,16.105H2.842a.949.949,0,0,1-.947-.947V9.935a2.341,2.341,0,0,0,1.421.486h9.474a2.341,2.341,0,0,0,1.421-.486v5.223A.949.949,0,0,1,13.263,16.105ZM9.947,4.737H6.158a.474.474,0,1,0,0,.947H9.947a.474.474,0,1,0,0-.947Zm1.421,8.526H4.737a.474.474,0,0,0,0,.947h6.632a.474.474,0,1,0,0-.947ZM9.947,2.842H6.158a.474.474,0,1,0,0,.947H9.947a.474.474,0,1,0,0-.947Z"
                          transform="translate(4.375 2.917)"
                          fill="#fff"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span className="menu-title">Peripherals</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </a>
              <ul
                className={` nav ${!isCollapse ? "collapse" : ""}`}
                id="Peripherals_SubMenu"
                style={{
                  marginLeft: "10px",
                  marginBottom: "0px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <li
                  className={`nav-item nav-item-commonClass_RestaurantLayout ${
                    isActive === "Kiosk" ? "active" : ""
                  }`}
                  id="li_nav_ManageKIOSK_RestaurantLayout"
                  onClick={() => {
                    handleItemClick("Peripherals");
                  }}
                >
                  <Link
                    to="/Restaurant/KIOSKMenuSetup"
                    className="nav-link px-0"
                    style={{ fontWeight: 600, marginLeft: "0px !important" }}
                  >
                    <div className="nav-box sub_menu_peripherals">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 700 700"
                      >
                        <g>
                          <path d="m463.34 190.41v-35.043h104v-16.277l-52.621-97.09h-329.45l-52.617 97.086v16.277h104.02v35.043h46.625v252.73h-52.848l-32.879 60.77 0.003907 14.09h304.93v-14.09l-32.941-60.766h-52.852v-252.73zm-272.73-141.99h318.86l45.664 84.246h-410.26z"></path>
                        </g>
                      </svg>
                      <span className="menu-title">Kiosk</span>
                    </div>
                  </Link>
                </li>

                <li
                  className={`nav-item nav-item-commonClass_RestaurantLayout ${
                    isActive === "Manage Tables" ? "active" : ""
                  }`}
                  id="li_nav_Table_RestaurantLayout"
                  onClick={() => {
                    handleItemClick("Peripherals");
                  }}
                >
                  <Link to="/Restaurant/TableQr" className="nav-link px-0">
                    <div className="nav-box sub_menu_peripherals">
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 7C4 5.34315 5.34315 4 7 4H12H17C18.6569 4 20 5.34315 20 7V12V17C20 18.6569 18.6569 20 17 20H12H7C5.34315 20 4 18.6569 4 17V12V7ZM7 6C6.44772 6 6 6.44772 6 7V11H11V6H7ZM13 6V11H18V7C18 6.44772 17.5523 6 17 6H13ZM18 13H13V18H17C17.5523 18 18 17.5523 18 17V13ZM11 18V13H6V17C6 17.5523 6.44772 18 7 18H11Z"
                          fill="#000000"
                        ></path>
                      </svg>
                      <span className="menu-title">Table QR</span>
                    </div>
                  </Link>
                </li>

                <li
                  className={`nav-item nav-item-commonClass_RestaurantLayout ${
                    isActive === "Store QR" ? "active" : ""
                  }`}
                  id="li_nav_StoreQR_RestaurantLayout"
                  onClick={() => {
                    handleItemClick("Peripherals");
                  }}
                >
                  <Link to="/Restaurant/StoreQRCode" className="nav-link px-0">
                    <div className="nav-box sub_menu_peripherals">
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5 3C3.89543 3 3 3.89543 3 5V6.83772L1.49006 11.3675C1.10052 12.5362 1.8474 13.7393 3 13.963V20C3 21.1046 3.89543 22 5 22H9H10H14H15H19C20.1046 22 21 21.1046 21 20V13.963C22.1526 13.7393 22.8995 12.5362 22.5099 11.3675L21 6.83772V5C21 3.89543 20.1046 3 19 3H5ZM15 20H19V14H17.5H12H6.5H5V20H9V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V20ZM11 20H13V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V20ZM3.38743 12L4.72076 8H6.31954L5.65287 12H4H3.38743ZM7.68046 12L8.34713 8H11V12H7.68046ZM13 12V8H15.6529L16.3195 12H13ZM18.3471 12L17.6805 8H19.2792L20.6126 12H20H18.3471ZM19 5V6H16.5H12H7.5H5V5H19Z"
                          fill="#000000"
                        ></path>
                      </svg>
                      <span className="menu-title">Store QR</span>
                    </div>
                  </Link>
                </li>

                <li
                  className={`nav-item nav-item-commonClass_RestaurantLayout ${
                    isActive === "Stripe Setup" ? "active" : ""
                  }`}
                  id="li_nav_StripeSetup_RestaurantLayout"
                  onClick={() => {
                    handleItemClick("Peripherals");
                  }}
                >
                  <Link to="/Restaurant/StripeSetup" className="nav-link px-0">
                    <div className="nav-box sub_menu_peripherals">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19">
                                            <g id="Stripe_Setup" data-name="Stripe Setup" transform="translate(11656 -17506)">
                                                <rect id="Rectangle_17831" data-name="Rectangle 17831" width="18" height="18" transform="translate(-11656 17506)" fill="#fff" opacity="0"></rect>
                                                <g id="fluent:app-store-24-regular" transform="translate(-11661 17502)">
                                                    <path id="Vector" d="M14.75,0A3.25,3.25,0,0,1,18,3.25v11.5A3.25,3.25,0,0,1,14.75,18H3.25A3.25,3.25,0,0,1,0,14.75V3.25A3.25,3.25,0,0,1,3.25,0Zm0,1.5H3.25A1.75,1.75,0,0,0,1.5,3.25v11.5A1.751,1.751,0,0,0,3.25,16.5h11.5a1.75,1.75,0,0,0,1.75-1.75V3.25A1.75,1.75,0,0,0,14.75,1.5ZM6.369,12.254l-.51.872a.75.75,0,0,1-1.34-.665l.045-.091.067-.116Zm3.924-5.23L12.012,10h1.74a.75.75,0,0,1,.743.65l.007.1a.75.75,0,0,1-.648.744l-.1.007h-.875l.5.87a.75.75,0,0,1-1.243.834l-.056-.085L9.422,8.516l.87-1.492ZM10.263,4.1a.75.75,0,0,1,.315.935l-.046.091L7.682,10H9.414l.865,1.5H4.252a.75.75,0,0,1-.1-1.492l.1-.007H5.946l2.18-3.734L7.464,5.124a.75.75,0,0,1,.19-.968L7.739,4.1a.75.75,0,0,1,.968.19l.056.085L9,4.78l.241-.41A.75.75,0,0,1,10.263,4.1Z" transform="translate(5 5)" fill="#fff"></path>
                                                </g>
                                            </g>
                                        </svg>
                      <span className="menu-title">Stripe Setup</span>
                    </div>
                  </Link>
                </li>

                <li
                  className={`nav-item nav-item-commonClass_RestaurantLayout ${
                    isActive === "Manage Orders" ? "active" : ""
                  }`}
                  id="li_nav_ManageOrders_RestaurantLayout"
                  onClick={() => {
                    handleItemClick("Peripherals");
                  }}
                >
                  <Link to="/Restaurant/ManageOrders" className="nav-link px-0">
                    <div className="nav-box sub_menu_peripherals">
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5 3C3.89543 3 3 3.89543 3 5V6.83772L1.49006 11.3675C1.10052 12.5362 1.8474 13.7393 3 13.963V20C3 21.1046 3.89543 22 5 22H9H10H14H15H19C20.1046 22 21 21.1046 21 20V13.963C22.1526 13.7393 22.8995 12.5362 22.5099 11.3675L21 6.83772V5C21 3.89543 20.1046 3 19 3H5ZM19 6L20.3061 9.68425L19.8157 11.2639C19.5906 11.5745 19.1021 11.6005 18.7915 11.3754L17.8579 10.5C17.5482 10.275 17.5223 9.78654 17.7474 9.47594L18.7365 7.99999L5.2635 7.99999L6.2526 9.47594C6.4777 9.78654 6.45181 10.275 6.14214 10.5L5.20854 11.3754C4.89789 11.6005 4.40943 11.5745 4.1843 11.2639L3.69394 9.68425L5 6V5H19V6Z"
                          fill="#000000"
                        ></path>
                      </svg>
                      <span className="menu-title">Manage Orders</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              id="li_nav_ManageOrders_RestaurantLayout"
              className={`nav-item nav-item-commonClass_RestaurantLayout ${
                isActive === "Manage Reasons" ? "active" : ""
              } hover:active hover:hover-open`}
            >
              <Link
                to="/Restaurant/ManageReasons"
                className="nav-link px-0"
                onClick={() => handleItemClick("Manage Reason")}
              >
                <div className="nav-box sub_menu_peripherals">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.665"
                    height="18"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M2480 4800 l0 -160 80 0 80 0 0 160 0 160 -80 0 -80 0 0 -160z" />
                      <path d="M1257 4422 l-57 -57 115 -115 115 -115 57 58 58 57 -115 115 -115 115 -58 -58z" />
                      <path d="M2390 4470 c-529 -74 -961 -432 -1124 -933 -47 -144 -61 -239 -60 -417 0 -189 15 -283 70 -442 99 -285 250 -483 524 -685 101 -75 114 -105 120 -286 5 -141 6 -150 29 -168 22 -18 47 -19 611 -19 564 0 589 1 611 19 23 18 24 27 29 168 7 191 15 207 155 312 284 212 462 488 538 831 28 131 30 394 3 525 -57 274 -184 513 -375 704 -186 186 -404 308 -661 367 -118 28 -356 40 -470 24z m350 -164 c495 -75 882 -443 997 -948 23 -102 23 -374 0 -476 -71 -310 -223 -543 -482 -737 -60 -45 -119 -95 -131 -111 -58 -80 -84 -165 -84 -276 l0 -78 -480 0 -480 0 0 79 c0 170 -53 265 -215 386 -124 93 -223 193 -295 300 -317 469 -269 1085 116 1495 272 288 664 424 1054 366z" />
                      <path d="M2345 4055 c-22 -21 -25 -33 -25 -98 l0 -74 -67 -26 -67 -27 -53 52 c-81 80 -88 77 -250 -84 -120 -120 -133 -136 -133 -168 0 -28 10 -47 48 -89 l49 -55 -25 -63 -25 -63 -74 0 c-65 0 -77 -3 -98 -25 -25 -24 -25 -26 -25 -215 0 -189 0 -191 25 -215 21 -22 33 -25 98 -25 l74 0 26 -67 27 -67 -50 -51 c-41 -41 -50 -57 -50 -85 0 -31 14 -48 132 -167 121 -121 136 -133 168 -133 29 0 47 10 90 48 l54 49 63 -25 63 -25 0 -74 c0 -65 3 -77 25 -98 24 -25 26 -25 215 -25 189 0 191 0 215 25 22 21 25 33 25 99 0 69 2 75 23 82 12 3 41 16 65 27 l43 20 53 -52 c42 -42 58 -51 86 -51 32 0 48 13 168 133 159 159 162 168 84 256 l-49 55 25 63 25 63 74 0 c65 0 77 3 98 25 25 24 25 26 25 215 0 189 0 191 -25 215 -21 22 -33 25 -99 25 -69 0 -75 2 -82 23 -3 12 -16 41 -27 65 l-20 43 52 53 c42 42 51 58 51 86 0 32 -13 48 -133 168 -161 160 -166 162 -254 85 l-58 -49 -62 24 -63 25 0 74 c0 65 -3 77 -25 98 -24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z m295 -170 c0 -37 28 -103 52 -123 27 -22 208 -92 237 -92 41 0 81 17 114 48 l28 26 56 -57 57 -56 -26 -28 c-31 -33 -48 -73 -48 -114 0 -29 70 -210 92 -237 20 -24 86 -52 123 -52 l35 0 0 -80 0 -80 -35 0 c-37 0 -103 -28 -123 -52 -22 -27 -92 -208 -92 -237 0 -41 17 -81 48 -114 l26 -28 -57 -56 -56 -57 -28 26 c-33 31 -73 48 -114 48 -29 0 -210 -70 -237 -92 -24 -20 -52 -86 -52 -123 l0 -35 -80 0 -80 0 0 35 c0 37 -28 103 -52 123 -27 22 -208 92 -237 92 -41 0 -81 -17 -114 -48 l-28 -26 -56 57 -57 56 26 28 c31 33 48 73 48 114 0 29 -70 210 -92 237 -20 24 -86 52 -123 52 l-35 0 0 80 0 80 35 0 c37 0 103 28 123 52 22 27 92 208 92 237 0 41 -17 81 -48 114 l-26 28 57 56 56 57 28 -26 c33 -31 73 -48 114 -48 29 0 210 70 237 92 24 20 52 86 52 123 l0 35 80 0 80 0 0 -35z" />
                      <path d="M2441 3584 c-253 -68 -410 -331 -346 -579 67 -256 329 -415 580 -350 256 67 415 329 350 578 -67 259 -333 419 -584 351z m270 -185 c67 -36 98 -68 137 -143 22 -43 26 -64 26 -136 1 -78 -2 -90 -33 -148 -38 -70 -70 -100 -145 -140 -43 -22 -64 -26 -136 -26 -72 0 -93 4 -136 26 -75 40 -107 70 -145 140 -31 58 -34 70 -33 148 0 100 24 160 89 225 100 100 249 121 376 54z" />
                      <path d="M3685 4360 l-110 -110 58 -57 57 -58 110 110 c60 60 110 114 110 120 0 13 -92 105 -106 105 -5 0 -59 -50 -119 -110z" />
                      <path d="M720 3120 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" />
                      <path d="M4080 3120 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" />
                      <path d="M626 1670 c-63 -16 -153 -70 -197 -117 -22 -24 -55 -74 -72 -111 -29 -61 -32 -76 -32 -162 0 -82 4 -103 27 -153 15 -32 37 -70 48 -85 l21 -26 -47 -24 c-68 -35 -140 -112 -177 -190 l-32 -67 -3 -302 -3 -303 25 -25 25 -25 511 0 511 0 25 25 25 25 -3 303 -3 302 -32 67 c-37 78 -109 155 -177 190 -47 24 -68 46 -48 49 22 13 37 52 23 102 -22 68 -96 128 -182 154 l-42 17 -505 0 -505 0 0 -80z" />
                    </g>
                  </svg>
                  <span className="menu-title">Manage Reason</span>
                </div>
                {isOpen ? (
                  <svg
                    className="svg-right"
                    fill="#000000"
                    viewBox="-8.5 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>right</title>
                    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
                  </svg>
                ) : (
                  <div></div>
                )}
              </Link>
            </li>
          </ul>
          {isOpen ? (
            <div className="footer-ul">
              <a href="javascript:;" style={{ cursor: "default" }}>
                <div
                  className="fo-profile"
                  style={{
                    opacity: 1,
                    marginLeft: "0px",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  <h6
                    id="lblRestaurantAdmin_LoggedIn_RestaurantLayout"
                    style={{ marginLeft: "0px" }}
                  >
                    Manpreet
                    <br />
                    (Crust Pizza &amp; More)
                  </h6>
                </div>
              </a>
              <div className="fo-icon">
                <a
                  href="javascript:;"
                  className="icon-1"
                  style={{
                    opacity: 0.2,
                    pointerEvents: "none",
                    cursor: "default",
                  }}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#ffffff"
                        d="M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 0 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z"
                      ></path>
                    </g>
                  </svg>
                </a>

                <a
                  href="javascript:;"
                  className="icon-1"
                  style={{
                    opacity: 0.2,
                    pointerEvents: "none",
                    cursor: "default",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="12" cy="6" r="4" fill="#ffffff"></circle>
                      <path
                        d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </svg>
                </a>

                <a
                  className="icon-1 hover:cursor-pointer"
                  onClick={handleLogOut}
                >
                  <svg
                    height="200px"
                    width="200px"
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <style type="text/css">{`.st0 { fill: #ffffff; }`}</style>
                      <g>
                        <path
                          className="st0"
                          d="M155.81,0v173.889h33.417V33.417h235.592l-74.87,50.656c-8.469,5.727-13.535,15.289-13.535,25.503v286.24 H189.227V282.079H155.81v147.154h180.604v70.93c0,4.382,2.423,8.404,6.29,10.451c3.867,2.056,8.558,1.811,12.189-0.644 l119.318-80.736V0H155.81z"
                        ></path>
                        <path
                          className="st0"
                          d="M228.657,290.4c0,1.844,1.068,3.524,2.75,4.3c1.664,0.775,3.638,0.514,5.042-0.685l78.044-66.035 l-78.044-66.034c-1.404-1.2-3.378-1.46-5.042-0.686c-1.681,0.775-2.75,2.456-2.75,4.3v33.392H37.79v58.064h190.868V290.4z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
