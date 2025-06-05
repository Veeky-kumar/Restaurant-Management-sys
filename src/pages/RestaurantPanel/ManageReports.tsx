import React, { useState } from 'react'
import ViewRecords from '../../components/RestaurantPanel/ManageReports/ViewRecords';
import RefundOrders from '../../components/RestaurantPanel/ManageReports/RefundOrders';
import Financials from '../../components/RestaurantPanel/ManageReports/Financials';
import Department from '../../components/RestaurantPanel/ManageReports/Department';
import Product from '../../components/RestaurantPanel/ManageReports/Product';
import Modifiers from '../../components/RestaurantPanel/ManageReports/Modifiers';
import Hourlysale from '../../components/RestaurantPanel/ManageReports/Hourlysale';
import "../../assets/CSS/report.css"

const ManageReports = () => {

    const [activeTab, setActiveTab] = useState<string>('viewrecord');

    const handleTabSelection = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
        e.preventDefault();
        setActiveTab(tabId);
    };

    return (
        <>
            <div className='report'>
                <div className="" >
                    <div id="contentWrapper_RestaurantLayout" className="content-wrapper pr-3">
                        <div className="col-11 mb-3">
                            <ul className="nav nav-tabs mob-tab" role="tablist">
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_viewrecord_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'viewrecord' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'viewrecord')}
                                    >
                                        VIEW RECORD
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_RefundOrderReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'refundOrderReport' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'refundOrderReport')}
                                    >
                                        REFUND ORDERS
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_FinancialReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'financial')}
                                    >
                                        FINANCIAL
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_DepartmentReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'department' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'department')}
                                    >
                                        DEPARTMENT
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_ProductReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'products')}
                                    >
                                        PRODUCTS
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_ModifierReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'modifiers' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'modifiers')}
                                    >
                                        MODIFIERS
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        id="tab_HourlySaleReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'hourly_sale' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'hourly_sale')}
                                    >
                                        HOURLY SALE
                                    </a>
                                </li>
                                <li className="nav-item d-none">
                                    <a
                                        href="#"
                                        id="tab_StaffReport_MainTab_ManageRestaurantReports"
                                        className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`}
                                        onClick={(e) => handleTabSelection(e, 'staff')}
                                    >
                                        STAFF
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="wrapper-navs_wraps">
                            <div className="col-md-12 col-lg-12 col-sm-12" style={{ padding: '0px' }}>
                                <div className="tab-content">
                                    {activeTab === 'viewrecord' && <ViewRecords />}
                                    {activeTab === 'refundOrderReport' && <RefundOrders />}
                                    {activeTab === 'financial' && <Financials />}
                                    {activeTab === 'department' && <Department />}
                                    {activeTab === 'products' && <Product />}
                                    {activeTab === 'modifiers' && <Modifiers />}
                                    {activeTab === 'hourly_sale' && <Hourlysale />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageReports