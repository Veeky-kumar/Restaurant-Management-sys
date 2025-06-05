import React, { useState } from 'react'
import "../../../assets/CSS/peripheral.css";
import WTorderModal from './ManageOrderModals/WTorderModal';
import WTacceptOrderModal from './ManageOrderModals/WTacceptOrderModal';
import WTpaymentOrderModal from './ManageOrderModals/WTpaymentOrderModal';
import WTserveModal from './ManageOrderModals/WTserveModal';

type Props = {}

const ManageOrders: React.FC = (props: Props) => {
    const [activeTab, setActiveTab] = useState('webOrder');

    return (
        <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
            <div className="top_area_row">

                <div className="manage_Orders_section">

                    <main className="content">
                        <div className="card" style={{ borderRadius: "6px" }}>
                            <div className="row g-0">
                                <div className="col-12 col-lg-12 col-xl-12">
                                    <div className="position-relative">
                                        <div className="tab-bar">
                                            <div className={`tab ${activeTab === 'webOrder' ? 'active' : ''}`} onClick={() => setActiveTab('webOrder')}>Web Order</div>
                                            <div className={`tab ${activeTab === 'qrOrder' ? 'active' : ''}`} onClick={() => setActiveTab('qrOrder')}>QR Table Order</div>
                                        </div>

                                        {/* <!-- Order Grids --> */}
                                        <div id="webOrder" className={`tab-content order-grid grid-container ${activeTab == 'webOrder' ? 'active' : ''} `}><div className="order-card">
                                            <div className="order-status">Un-Paid</div>
                                            <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                            <div className="customer-name">Manoj</div>
                                            <div className="order-details">
                                                <p>Order No: W-502</p>
                                                <p>Delivery</p>
                                                <p>$121.00</p>
                                            </div>
                                        </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Menoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-500</p>
                                                    <p>Pickup</p>
                                                    <p>$128.10</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WT_Auto_Accepted_OrdersModal" id="btn_OpenWT_Auto_Accepted_Order_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>✓</a></div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-502</p>
                                                    <p>Delivery</p>
                                                    <p>$121.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Menoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-500</p>
                                                    <p>Pickup</p>
                                                    <p>$128.10</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-502</p>
                                                    <p>Delivery</p>
                                                    <p>$121.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Menoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-500</p>
                                                    <p>Pickup</p>
                                                    <p>$128.10</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-502</p>
                                                    <p>Delivery</p>
                                                    <p>$121.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Menoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-500</p>
                                                    <p>Pickup</p>
                                                    <p>$128.10</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-502</p>
                                                    <p>Delivery</p>
                                                    <p>$121.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Un-Paid</div>
                                                <div className="icon" onclick="GetAcceptedWTorders()"><a data-toggle="modal" data-target="#WTOrdersModal" id="btn_OpenWTOrder_Modal" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>?</a></div>
                                                <div className="customer-name">Menoj</div>
                                                <div className="order-details">
                                                    <p>Order No: W-500</p>
                                                    <p>Pickup</p>
                                                    <p>$128.10</p>
                                                </div>
                                            </div></div>
                                        <div id="qrOrder" className={`tab-content order-grid grid-container ${activeTab == 'qrOrder' ? 'active' : ''} `}><div className="order-card">
                                            <div className="order-status">Online Payment</div>

                                            <div className="icon">  ✓</div>
                                            <div className="customer-name">Manoj</div>
                                            <div className="order-details">
                                                <p>Table No: 5</p>
                                                <p>Dine In</p>
                                                <p>$11.00</p>
                                            </div>
                                        </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Online Payment</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$11.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Online Payment</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$11.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Online Payment</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$11.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Online Payment</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$11.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Online Payment</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$11.00</p>
                                                </div>
                                            </div><div className="order-card">
                                                <div className="order-status">Cash</div>

                                                <div className="icon">  ✓</div>
                                                <div className="customer-name">Manoj</div>
                                                <div className="order-details">
                                                    <p>Table No: 5</p>
                                                    <p>Dine In</p>
                                                    <p>$9.98</p>
                                                </div>
                                            </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <WTorderModal />
            <WTacceptOrderModal />
            <WTpaymentOrderModal />
            <WTserveModal />
        </div>
    )
}

export default ManageOrders