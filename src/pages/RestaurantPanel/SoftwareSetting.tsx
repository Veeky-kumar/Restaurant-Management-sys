import React, { useState } from "react";

import "../../assets/CSS/softwaresetting.css";
import GeneralSetting from "../../components/RestaurantPanel/SoftwareSettings/GeneralSetting";
import KitchenSetting from "../../components/RestaurantPanel/SoftwareSettings/KitchenSetting";
import DiscountSetting from "../../components/RestaurantPanel/SoftwareSettings/DiscountSetting";
import TendorPayment from "../../components/RestaurantPanel/SoftwareSettings/TendorPayment";
import Taxes from "../../components/RestaurantPanel/SoftwareSettings/Taxes";
import Promotion from "../../components/RestaurantPanel/SoftwareSettings/Promotion";
import StaffSetting from "../../components/RestaurantPanel/SoftwareSettings/StaffSetting";


const SoftwareSetting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("v-pills-home-tab");

  return (
    <div className="software-bx">
      <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
        <div className="wrapper-navs_wraps">
          <div className="search-bx">
            <div className="container-fluid bg-white">
              <div className="row py-3 align-items-center">
                <div className="col-md-6 search-bx-left">
                  {/* Left content goes here */}
                </div>
                <div className="col-md-6 search-bx-right">
                  <form className="form-inline my-2 my-lg-0 float-right">
                    <div className="input-group input_searchh">
                      <input
                        type="text"
                        className="form-control searchTextbox"
                        id="txtSearch_ManageProduct"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.001"
                          height="16"
                          viewBox="0 0 16.001 16"
                        >
                          <g id="__TEMP__SVG__" opacity="0.45">
                            <path
                              id="Path_12695"
                              data-name="Path 12695"
                              d="M23.13,23.128a1,1,0,0,1,1.415,0l3.85,3.85a1,1,0,1,1-1.414,1.415l-3.85-3.85a1,1,0,0,1,0-1.415Z"
                              transform="translate(-12.688 -12.686)"
                              fill="#1c2126"
                              fillRule="evenodd"
                            ></path>
                            <path
                              id="Path_12696"
                              data-name="Path 12696"
                              d="M6.5,12A5.5,5.5,0,1,0,1,6.5,5.5,5.5,0,0,0,6.5,12ZM13,6.5A6.5,6.5,0,1,1,6.5,0,6.5,6.5,0,0,1,13,6.5Z"
                              transform="translate(0 0)"
                              fill="#1c2126"
                              fillRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div id="exTab1" className="container-fluid mt-3">
            <div className="tab-content clearfix">
              <div className="tab-pane active" id="1a">
                <div className="row auto-log">
                  <div className="col-md-4">
                    <input
                      type="hidden"
                      id="hdn_T_SoftwareSetting_Restaurant"
                      value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZTFiMTMwNS1lNzkzLTQ1OTEtODA4OC02ZDhlMGJjOTY1MzYiLCJsb2dpbmlkIjoiNiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlJlc3RhdXJhbnQiLCJleHAiOjE3MzA0MzYzMjcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjE3NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjYxNzQzIn0.cV_CRGCncqx68ClhPapGZPVxJbNbIzh9jMNPk0G3p9k"
                    />
                    <input
                      type="hidden"
                      id="hdn_RLID_SoftwareSetting_Restaurant"
                      value="0"
                    />

                    <div
                      className="nav flex-column nav-pills software-set"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {/* Nav Links */}
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-home-tab" ? "active" : ""
                        }`}
                        id="v-pills-home-tab"
                        onClick={() => setActiveTab("v-pills-home-tab")}
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected={activeTab === "v-pills-home-tab"}
                      >
                        Staff Setting
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-profile-tab" ? "active" : ""
                        }`}
                        id="v-pills-profile-tab"
                        onClick={() => setActiveTab("v-pills-profile-tab")}
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected={activeTab === "v-pills-profile-tab"}
                      >
                        General Setting
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-messages-tab" ? "active" : ""
                        }`}
                        id="v-pills-messages-tab"
                        onClick={() => setActiveTab("v-pills-messages-tab")}
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected={activeTab === "v-pills-messages-tab"}
                      >
                        Receipt/Kitchen Setting
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-discount-tab" ? "active" : ""
                        }`}
                        id="v-pills-discount-tab"
                        onClick={() => setActiveTab("v-pills-discount-tab")}
                        role="tab"
                        aria-controls="v-pills-discount"
                        aria-selected={activeTab === "v-pills-discount-tab"}
                      >
                        Discount Setting
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-tendor-tab" ? "active" : ""
                        }`}
                        id="v-pills-tendor-tab"
                        onClick={() => setActiveTab("v-pills-tendor-tab")}
                        role="tab"
                        aria-controls="v-pills-tendor"
                        aria-selected={activeTab === "v-pills-tendor-tab"}
                      >
                        Tender Payment
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-taxes-tab" ? "active" : ""
                        }`}
                        id="v-pills-taxes-tab"
                        onClick={() => setActiveTab("v-pills-taxes-tab")}
                        role="tab"
                        aria-controls="v-pills-taxes"
                        aria-selected={activeTab === "v-pills-taxes-tab"}
                      >
                        Taxes
                      </a>
                      <a
                        className={`nav-link ${
                          activeTab === "v-pills-promotion-tab" ? "active" : ""
                        }`}
                        id="v-pills-promotion-tab"
                        onClick={() => setActiveTab("v-pills-promotion-tab")}
                        role="tab"
                        aria-controls="v-pills-promotion"
                        aria-selected={activeTab === "v-pills-promotion-tab"}
                      >
                        Promotion
                      </a>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="tab-content" id="v-pills-tabContent">
                      {activeTab === "v-pills-home-tab" && <StaffSetting />}
                      {activeTab === "v-pills-profile-tab" && (
                        <GeneralSetting />
                      )}
                      {activeTab === "v-pills-messages-tab" && (
                        <KitchenSetting />
                      )}
                      {activeTab === "v-pills-discount-tab" && (
                        <DiscountSetting />
                      )}
                      {activeTab === "v-pills-tendor-tab" && <TendorPayment />}
                      {activeTab === "v-pills-taxes-tab" && <Taxes />}
                      {activeTab === "v-pills-promotion-tab" && <Promotion />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareSetting;
