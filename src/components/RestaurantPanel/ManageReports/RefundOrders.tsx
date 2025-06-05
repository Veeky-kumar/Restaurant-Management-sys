import React, { useState } from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const RefundOrders: React.FC = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const options = {
        chart: {
            type: 'pie',
            backgroundColor: '#e6f0ff'
        },
        title: {
            text: 'Current-Year <br> Refund-Order-Reasons',
            // align: 'center',
            // verticalAlign: 'middle',
            y: -60,
            style: {
                fontWeight: 'bold',
                fontSize: '16px'
            }
        },
        tooltip: {
            pointFormat: '{point.percentage:.2f}% (${point.y})<br>{point.name}'
        },
        plotOptions: {
            pie: {
                innerSize: '60%', // Creates the donut effect
                // dataLabels: {
                //     enabled: true,
                //     format: '{point.percentage:.2f}% (${point.y})<br>{point.name}',
                //     distance: -50,
                //     style: {
                //         color: 'black',
                //         fontSize: '12px'
                //     }
                // }
            }
        },
        legend: {
            enabled: true
        },
        series: [
            {
                name: 'Refund Reasons',
                colorByPoint: true,
                data: [
                    { name: 'Refund reason 3', y: 253, color: '#4aa3f0' }, // Light blue color
                    { name: 'Refund reason 4', y: 40, color: '#6a0dad' } // Purple color
                ]
            }
        ]
    };

    return (
        <div id="viewrecord" className="container-fluid tab-pane px-0 active">
            <ul className="tabs clearfix d-none">
                <li><a id="tab_ViewRecords_ManageRestaurantReports" href="#viewrecord" className="ViewRecordReportDataClassCommon active" onClick="SearchViewRecords_ManageReoprts();"></a></li>
            </ul>
            <div className="container-fluid col-box px-0">
                <div className="row align-items-center bg-light select-icon marg-box">
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="form-group">
                            <label htmlFor="ddlTimePeriodSearchTypeValue"></label>
                            <select
                                className="form-control commonClass_ManageReports"
                                id="ddlTimePeriodSearchTypeValue"

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
                            />
                        </div>
                    </div>
                    <div className="col-9 col-md-6 col-lg-3">
                        <div className="form-group tender-bx">
                            <label htmlFor="ddlTenderTypeId">Tender Type</label>
                            <select
                                className="form-control"
                                id="ddlTenderTypeId"

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
                            <div className="table-responsive searchedCompletedOrdersDataOfRestaurant" style={{ position: 'relative' }}>
                                <div
                                    id="LoaderDiv_ViewRecord_ManageReports"
                                    style={{
                                        opacity: 1,
                                        bottom: 0,
                                        background: 'rgba(254, 253, 253, 0.68)',
                                        width: '100%',
                                        zIndex: 2147483647,
                                        position: 'absolute',
                                        display: 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src="./Content/Images/Loader.gif" alt="Loading..." style={{ maxWidth: '6%' }} />
                                    </div>
                                </div>
                                <table id="BindSearchedCompletedOrdersDataOfRestaurant" className="table table-bordered text-center bg-white mb-0">
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
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38896" style={{ cursor: 'pointer' }} className="selectedRow">
                                            <td>38896</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:11 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                        <tr data-oid="38897" style={{ cursor: 'pointer' }}>
                                            <td>38897</td>
                                            <td>MSTMM</td>
                                            <td>30-Oct-2024 01:20 PM</td>
                                            <td>Crust Pizza &amp; More</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="ShowMoreSearchViewRecords_ManageReoprts" className="p-2 text-center">
                                <button
                                    className="btn btn-primary commonClass_ManageReports"
                                // onClick={ShowMoreSearchViewRecords_ManageReoprts}
                                >
                                    View more
                                </button>
                            </div>
                        </div>
                        <div className=" col-sm-12 col-md-5 col-lg-5 pr-0">
                            <div className="bg-white border" style={{ maxHeight: "56vh", overflowY: "auto", overflowX: "hidden" }}>
                                <div id="LoaderDiv_RefundOrder_SingleOrder_ManageReports" style={{
                                    opacity: "1",
                                    zIndex: "9999999999",
                                    position: "absolute",
                                    width: "96%",
                                    transform: "translate(0%, 100%)"
                                }}>

                                </div>
                                <div id="cssFadeSection_ManageReoprts_LoaderDiv_RefundOrder_SingleOrder_ManageReports" className="">
                                    <h6 className="mb-0 text-center" id="BindedRefundType_refundOrder">Fast Refund</h6>
                                    <ul className="item-quntity" id="BindProductListSelectedOrder_RefundOrderTab"><li>
                                        <span className="recipe-name">Lichi Juice(1)</span>
                                        <span className="text-right">$2</span>
                                    </li>


                                        <p className="pr-0">Refund-Reason: </p>
                                    </ul>
                                    <div className="row  px-3 ">
                                        <div className="col-12">

                                            <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                <span>Total</span>
                                                <span className="float-end" id="SingleOrderTotalAmount_RefundOrder">$2</span>
                                            </h6>
                                            <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                <span>Discount<span id="orderDiscountName_RefundOrder"></span></span>
                                                <span className="float-end" id="SingleOrderDiscount_RefundOrder">$0.00</span>
                                            </h6>
                                            <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                <span>GST</span>
                                                <span className="float-end" id="SingleOrderGST_RefundOrder">$17.35</span>
                                            </h6>
                                            <h6 id="SingleOrderPaymentType_RefundOrder" className="mb-0 mt-2 total2 font-weight-bold row pb-2">
                                                <span className="col-12 mb-1"><span>Payment Type</span>
                                                    <span className="float-end">EFTPOS</span></span>

                                            </h6>
                                            <h6 className="mb-0 mt-2 total2 font-weight-bold">
                                                <span>Balance Change</span>
                                                <span className="float-end" id="SingleOrderBalanceChange_RefundOrder">-$NaN</span>
                                            </h6>
                                            <h6 className="mb-0 mt-2 total2 font-weight-bold" id="showingRefund_SingleProduct">
                                                <span>Refund<span id="total_RefundCount">(1)</span></span>
                                                <span className="float-end" id="SingleOrderRefund_RefundOrder">-$2</span>
                                            </h6>
                                            <h6 id="RefundReason_SingleOrder" className="mt-1"></h6>
                                        </div>
                                    </div>

                                    <div className="row my-3  pb-0 d-none">
                                        <div className="col text-center">
                                            <button className="btn btn-primary commonClass_ManageReports" onclick="Show_SendInvoiceEmailPopup_RestaurantSingleOrder();">
                                                Send
                                                Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                    <div className="graph bg-white">
                        <HighchartsReact highcharts={Highcharts} options={options} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefundOrders