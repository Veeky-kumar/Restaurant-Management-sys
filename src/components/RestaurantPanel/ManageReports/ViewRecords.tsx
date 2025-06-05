import React, { useState } from 'react'
import EmailModal from './EmailModal'
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const handleEmailModalOpen = () => {
    const button = document.getElementById("btn_SendPDFReportEmail_RestaurantReports_Modal") as HTMLButtonElement;
    if (button) {
        button.click();
    }
};

type Order = {
    Id: string;
    OrderPlatform_DeviceName: string;
    OrderCompletedOn_DateString: string;
    OrderSubmittedBy_UserName: string;
    CustomerName: string | null;
    OrderTotalAmount: number;
    OrderStatusName: string;
    OrderTypeName: string;
    OrderPaymentTypeName: string;
    OrderRefundedOn_DateString: string;
    OrderDetailData: any;
    OrderPaymentTypeId: number;
    OrderNote: string;
    OrderPaymentTypeDetails: PaymentItem[];
};

interface PaymentItem {
    type: string;
    amount: number;
}

const ViewRecords: React.FC = () => {
    const [timePeriodSearchType, setTimePeriodSearchType] = useState<number>(1);
    const [tenderTypeId, setTenderTypeId] = useState<number>(0);
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const UserToken_Global = localStorage.getItem("authToken");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleRowClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const fetchOrders = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        let fromDateTime = "";
        let toDateTime = "";
        let timePeriodValue = "";

        if (timePeriodSearchType === 1) timePeriodValue = "Today";
        else if (timePeriodSearchType === 2) timePeriodValue = "Yesterday";
        else if (timePeriodSearchType === 3) timePeriodValue = "Weekly";
        else if (timePeriodSearchType === 4) timePeriodValue = "Monthly";
        else if (timePeriodSearchType === 5) timePeriodValue = "Yearly";
        else if (timePeriodSearchType === 6) {
            timePeriodValue = "CustomDate";
            if (!startDate || !endDate) {
                setError("Please select both from and to dates.");
                setLoading(false);
                return;
            }
            fromDateTime = `${startDate.toISOString()}`;
            toDateTime = `${endDate.toISOString()}`;
        }

        const params = {
            fromDateTime,
            toDateTime,
            timePeriodSearchTypeValue: timePeriodValue,
            tenderTypeId: tenderTypeId.toString(),
            startIndexValue: 1,
            endIndexValue: 15,
            restaurantLoginId: 0,
        };

        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/orders/history/search/with/pagination`;
            const response = await axios.post(apiUrl, params, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.data.status === 1 || response.data.status === 2) {
                setOrders(response.data.data.orders);
            } else {
                setError(response.data.message || "Failed to fetch orders.");
            }
        } catch (error) {
            setError("There was an error fetching orders.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id="viewrecord" className="container-fluid tab-pane px-0 active">
                <ul className="tabs clearfix d-none">
                    <li>
                        <a
                            id="tab_ViewRecords_ManageRestaurantReports"
                            href="#viewrecord"
                            className="ViewRecordReportDataClassCommon active"
                        //   onclick="SearchViewRecords_ManageReoprts();"
                        ></a>
                    </li>
                </ul>
                <div className="container-fluid col-box px-0">
                    <div className="row align-items-center bg-light select-icon marg-box">
                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="form-group -translate-y-1">
                                <label htmlFor="ddlTimePeriodSearchTypeValue"></label>
                                <select
                                    className="form-control commonClass_ManageReports"
                                    id="ddlTimePeriodSearchTypeValue"
                                    value={timePeriodSearchType}
                                    onChange={(e) => setTimePeriodSearchType(Number(e.target.value))}
                                >
                                    <option value="1">Today</option>
                                    <option value="2">Yesterday</option>
                                    <option value="3">Weekly</option>
                                    <option value="4">Monthly</option>
                                    <option value="5">Yearly</option>
                                    <option value="6">Custom Dates</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3">
                            <div className="form-group text_wrap-datepicker mb-0">
                                <label
                                    className="mb-0"
                                    style={{ width: "auto", marginRight: "8px" }}
                                >
                                    From
                                </label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="form-control bg-light mt-0"
                                    disabled={timePeriodSearchType !== 6}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 date-pick-col">
                            <div className="form-group text_wrap-datepicker mb-0">
                                <label
                                    className="mb-0"
                                    style={{ width: "auto", marginRight: "8px" }}
                                >
                                    To
                                </label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    className="form-control bg-light mt-0"
                                    disabled={timePeriodSearchType !== 6}
                                />
                            </div>
                        </div>

                        <div className="col-9 col-md-6 col-lg-3">
                            <div className="form-group tender-bx">
                                <label htmlFor="ddlTenderTypeId">Tender Type</label>
                                <select
                                    className="form-control"
                                    id="ddlTenderTypeId"
                                    value={tenderTypeId}
                                    onChange={(e) => setTenderTypeId(Number(e.target.value))}
                                >
                                    <option value="0">All</option>
                                    <option value="1">Cash</option>
                                    <option value="3">EFTPOS</option>
                                    <option value="7">mPOSs</option>
                                    <option value="8">American Express</option>
                                    <option value="9">MasterCard</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-3 col-md-4 col-lg-1 pl-0">
                            <button
                                className="select-bx btn btn-primary text-white font-weight-normal commonClass_ManageReports"
                                onClick={fetchOrders}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="table-section px-0">
                    <div className="container-fluid px-0">
                        <div className="row row-box">
                            <div className="col-sm-12 col-md-7 col-lg-7 manage-report-table p-0">
                                <div
                                    className="table-responsive searchedCompletedOrdersDataOfRestaurant"
                                    style={{ position: "relative" }}
                                >
                                    <div
                                        id="LoaderDiv_ViewRecord_ManageReports"
                                        style={{
                                            opacity: 1,
                                            bottom: 0,
                                            background: "rgba(254, 253, 253, 0.68)",
                                            width: "100%",
                                            zIndex: 2147483647,
                                            position: "absolute",
                                            display: "none",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src="./Content/Images/Loader.gif"
                                                alt="Loading..."
                                                style={{ maxWidth: "6%" }}
                                            />
                                        </div>
                                    </div>
                                    <table
                                        id="BindSearchedCompletedOrdersDataOfRestaurant"
                                        className="table table-bordered text-center mb-0"
                                    >
                                        <thead>
                                            <tr className="bluelight">
                                                <th scope="col">Code</th>
                                                <th scope="col">Machine Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Clerk</th>
                                                <th scope="col">Customer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.length > 0 ? (
                                                orders.map((order) => (
                                                    <tr key={order.Id}
                                                    onClick={() => handleRowClick(order)}
                                                    className={`${selectedOrder?.Id==order.Id?'selectedRow':''}`}
                                                        style={{ cursor: 'pointer' }} >
                                                        <td>{order.Id}</td>
                                                        <td>{order.OrderPlatform_DeviceName}</td>
                                                        <td>{order.OrderCompletedOn_DateString}</td>
                                                        <td>{order.OrderSubmittedBy_UserName}</td>
                                                        <td>{order.CustomerName}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5}>No orders found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    id="ShowMoreSearchViewRecords_ManageReoprts"
                                    className="p-2 text-center"
                                >
                                    <button
                                        className="btn btn-primary commonClass_ManageReports"
                                    // onClick={ShowMoreSearchViewRecords_ManageReoprts}
                                    >
                                        View more
                                    </button>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-5 col-lg-5 pr-0">
                                <div className="bg-white border">
                                    <div
                                        id="LoaderDiv_ViewRecord_SingleOrder_ManageReports"
                                        style={{
                                            opacity: 1,
                                            zIndex: 9999999999,
                                            position: "absolute",
                                            width: "96%",
                                            transform: "translate(0%, 100%)",
                                        }}
                                    >
                                    </div>

                                    <div id="cssFadeSection_ManageReoprts">
                                        {selectedOrder ? (
                                            <div key={selectedOrder.Id}>
                                                <ul className="item-quntity" id="BindProductListSelectedOrder">
                                                    <li className="mb-0">
                                                        {/* <span className="recipe-name">{selectedOrder.CustomerName ? selectedOrder.CustomerName : 'N/A'}</span> */}
                                                        {/* <span className="text-right">${selectedOrder.OrderTotalAmount}</span> */}
                                                    </li>
                                                </ul>

                                                {/* Order Details */}
                                                <div className="row px-3">
                                                    <div className="col-12">
                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Total</span>
                                                            <span className="float-end">{selectedOrder.OrderTotalAmount}</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Status</span>
                                                            <span className="float-end">{selectedOrder.OrderStatusName}</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Order Type</span>
                                                            <span className="float-end">{selectedOrder.OrderTypeName}</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Completed On</span>
                                                            <span className="float-end">{selectedOrder.OrderCompletedOn_DateString}</span>
                                                        </h6>

                                                        {/* Payment Types and Amounts */}
                                                        {selectedOrder.OrderPaymentTypeDetails && selectedOrder.OrderPaymentTypeDetails.length > 0 && selectedOrder.OrderPaymentTypeDetails.map((payment, index) => (
                                                            <h6 key={index} className="mb-0 mt-2 total2 font-weight-bold row">
                                                                <span className="col-12 mb-1">
                                                                    <span>Payment Type - {payment.type}</span>
                                                                    <span className="float-end">${payment.amount}</span>
                                                                </span>
                                                            </h6>
                                                        ))}

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Order Platform</span>
                                                            <span className="float-end">{selectedOrder.OrderPlatform_DeviceName}</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Refunded On</span>
                                                            <span className="float-end">{selectedOrder.OrderRefundedOn_DateString}</span>
                                                        </h6>

                                                        {/* Additional Details */}
                                                        {selectedOrder.OrderNote && (
                                                            <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                                <span>Order Note</span>
                                                                <span className="float-end">{selectedOrder.OrderNote}</span>
                                                            </h6>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Send Invoice Button */}
                                                <div className="row my-3 pb-0">
                                                    <div className="col text-center">
                                                        <button className="btn btn-primary commonClass_ManageReports" onClick={() => handleEmailModalOpen(selectedOrder.Id)}>
                                                            Send Invoice
                                                        </button>
                                                    </div>
                                                </div>

                                                <hr />
                                            </div>
                                        ) : (
                                            // <p>Select an order to view the receipt</p>
                                            <div id="cssFadeSection_ManageReoprts">
                                                <ul className="item-quntity" id="BindProductListSelectedOrder"></ul>
                                                <div className="row px-3">
                                                    <div className="col-12">
                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Total</span>
                                                            <span className="float-end">$0.00</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold" id="orderDiscountDetailsTab">
                                                            {/* Static discount details */}
                                                        </h6>
                                                        <h6 id="SingleOrderPromoCode_ViewRecord" className="mb-0 mt-2 total2 font-weight-bold row">
                                                            {/* Static promo code */}
                                                        </h6>
                                                        <h6 id="SingleOrderThreshold_ViewRecord" className="mb-0 mt-2 total2 font-weight-bold row">
                                                            {/* Static threshold */}
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>GST</span>
                                                            <span className="float-end">$0.00</span>
                                                        </h6>

                                                        <h6 id="SingleOrderPaymentType_ViewRecord" className="mb-0 mt-2 total2 font-weight-bold row pb-2">
                                                            <span className="col-12">
                                                                <span>Payment Type</span>
                                                                <span className="float-end">$0.00</span>
                                                            </span>
                                                        </h6>

                                                        <h6 className="mb-0 total2 font-weight-bold">
                                                            <span>Balance Change</span>
                                                            <span className="float-end">$0.00</span>
                                                        </h6>

                                                        <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                            <span>Refund</span>
                                                            <span className="float-end">$0.00</span>
                                                        </h6>
                                                    </div>
                                                </div>

                                                <div className="row my-3 pb-0">
                                                    <div className="col text-center">
                                                        <button className="btn btn-primary commonClass_ManageReports">
                                                            Send Invoice
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EmailModal />
        </>
    )
}

export default ViewRecords