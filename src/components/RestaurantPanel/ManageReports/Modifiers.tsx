import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import EmailModal from './EmailModal'
import axios from 'axios';
// import html2pdf from 'html2pdf.js';

interface ModifierSalesData {
    Name: string;
    Total_Percentage: number;
    ModifierData: number;
}

interface formData {
    filterModifierSalesMaxRecords: number;
    filterModifierSalesType: string;
    fromDate: string;
    graphFilterDurationType: string;
    modifierFilterType: string;
    restaurantLoginId: 0;
    toDate: string;
}
interface ResponseDataType {
    salesData_ModifierSalesGraph?: ModifierSalesData[];
    filterValue2?: string;
    // Add other properties as needed
}

const Modifiers = () => {

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateModal, setDateModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [modifierSalesData, setModifierSalesData] = useState<ModifierSalesData[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<ResponseDataType>({});
    const UserToken_Global = localStorage.getItem("authToken");
    const RestaurantLoginId_Global = 0;
    const [formData, setFormData] = useState<formData>({
        restaurantLoginId: RestaurantLoginId_Global,
        modifierFilterType: 'amount',
        graphFilterDurationType: "Weekly",
        filterModifierSalesType: "top",
        filterModifierSalesMaxRecords: 20,
        fromDate: "",
        toDate: "",
    });

    const StartLoading = () => setLoading(true);
    const StopLoading = () => setLoading(false);
    const toggleDropdown = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const fetchGraphData = async () => {
        StartLoading();
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/filter/modifier`;

            const response = await axios.post(
                apiUrl,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            const data = response.data;
            StopLoading();

            if (data.status === 1) {
                setModifierSalesData(data.data.salesData_ModifierSalesGraph || []);
                setResponseData(data.data);
            } else {
                console.error(data.message);
            }

        } catch (error) {
            StopLoading();
            alert('There was an error fetching the data. Please try again later.');
        }

    };

    const openCustomDateModal = () => {
        setDateModal(true)
    }
    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return new Intl.DateTimeFormat("en-US", options)
            .format(date)
            .replace(", ", " ");
    };

    const handleCustomDate = () => {
        let fromDate = "";
        let toDate = "";

        if (startDate && endDate) {
            fromDate = formatDate(startDate);
            toDate = formatDate(endDate);
        }
        setFormData({
            ...formData,
            fromDate,
            toDate,
            graphFilterDurationType: 'CustomDate'

        });
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCloseModal = () => {
        setDateModal(false);
    };

    const handleEmailModalOpen = () => {
        const emailModalButton = document.getElementById("btn_SendPDFReportEmail_RestaurantReports_Modal") as HTMLButtonElement;
        emailModalButton?.click();
    };

    const downloadPDFModifier = () => {
        const element = document.getElementById('container_content_modifier');

        if (element) {
            const options = {
                margin: 10,
                filename: 'ModifierReport.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // html2pdf()
            //     .from(element)
            //     .set(options)
            //     .save();
        } else {
            console.error('Report content element not found.');
        }
    };

    // Fetch data
    useEffect(() => {
        fetchGraphData();
    }, [formData]);


    return (
        <>
            <div id="modifiers" className="container-fluid">
                {loading && (<div style={{
                    backgroundColor: "#f0f5f0",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "300%",
                    zIndex: 999999999999999,
                    MozOpacity: 0.2,
                    opacity: 0.2,
                }}>
                    <img src="/Content/Images/Loader.gif" style={{
                        backgroundColor: "#9af58c",
                        alignItems: "center",
                        position: "fixed",
                        top: "40%",
                        width: "10%",
                        left: "50%",
                    }} />
                </div>)}
                <div className="cgt-desc">
                    <div id="FieldsSection_ModifierSalesGraph_ManageReports" className="select_warppers">
                        <div className="select_warps-box">

                            <div className="select_box">
                                <select
                                    className="form-control"
                                    id="modifierSalesType_ModifierSalesRecordsFilter"
                                    value={formData.filterModifierSalesType}
                                    onChange={(e) => setFormData({ ...formData, filterModifierSalesType: e.target.value })}
                                >
                                    <option value="top">Top</option>
                                    <option value="worst">Worst</option>
                                </select>
                            </div>

                            <div className="select_box">
                                <select
                                    className="form-control"
                                    id="maxRecords_ModifierSalesRecordsFilter"
                                    value={formData.filterModifierSalesMaxRecords}
                                    onChange={(e) => setFormData({ ...formData, filterModifierSalesMaxRecords: Number(e.target.value) })}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="tabs_wraps-div">
                        <ul className="tabs clearfix fit_data">
                            <li>
                                <a
                                    id="tab_ModifierSalesReport_ManageRestaurantReports"
                                    href="#modifier_sales"
                                    className="FinancialReportDataClassCommon active"
                                >
                                    MODIFIER SALES
                                </a>
                            </li>
                        </ul>

                        {/* Filter options */}
                        <span
                            id="FilterOptionsMenu_ModifierSalesReport"
                            ref={buttonRef}
                            className="dropbtn FilterOptionsMenuCommonClass Vector_horizental"
                            style={{ background: 'rgb(246, 248, 252)' }}
                            onClick={toggleDropdown}
                        >
                            <img
                                src="../../Content/Restaurant/icons/Vector_horizental.png"
                                alt="icon"
                                className="dropbtn vertical-menus"
                            />
                        </span>

                        {/* selecting filter options */}
                        <div
                            id="modifierSales_graphFilter"
                            className={`dropdown-content dropdownContent_ModfierSalestReports ${isOpen ? 'show' : ''}`}
                        >
                            <a
                                data-value="1"
                                onClick={() => setFormData({ ...formData, graphFilterDurationType: 'Weekly' })}
                            >
                                Weekly
                            </a>
                            <a
                                data-value="2"
                                onClick={() => setFormData({ ...formData, graphFilterDurationType: 'Monthly' })}
                            >
                                Monthly
                            </a>
                            <a
                                data-value="3"
                                onClick={() => setFormData({ ...formData, graphFilterDurationType: 'Yearly' })}
                            >
                                Yearly
                            </a>
                            <a data-value="4" onClick={openCustomDateModal}>Custom date</a>
                        </div>

                    </div>

                    <div className="cgt-content">
                        <div id="modifier_sales" className="tab " style={{}}>
                            <div className="graph">
                                <div className="set-graph">
                                    <div id="lblSelectedFilterOption_ModifierSaleReports_ManageReports" className="lblHeading_HourlySales_Style">
                                        {/* {modifierSalesData.length > 0 ? modifierSalesData[modifierSalesData.length - 1].FilterType_Value : "No Filter Applied"} */}
                                    </div>
                                    <div id="dv_ProductSalesGraphData_Section_ManageReports" className="product_sale-bars">

                                        {modifierSalesData.length === 0 ? (
                                            <p>No data available</p>
                                        ) : (
                                            modifierSalesData.map((item, index) => (
                                                <div key={index} className="wrap_bar-prgress flex flex-col sm:flex-row">
                                                    <p className="product-name">{item.Name}</p>
                                                    <div className="progress ml-0 w-full sm:w-[66%] sm:ml-[30px] mx-2">
                                                        <div className="progress-bar orange" style={{ backgroundColor: '#5751BD', width: `${item.Total_Percentage}%` }}></div>
                                                    </div>
                                                    <span className="value-progress">${item.ModifierData}</span>
                                                </div>
                                            ))
                                        )}

                                    </div>
                                </div>
                            </div>
                            <hr className="space_wraps" />

                            <div className="pdf_reports">
                                <div className="wrap_pdf">
                                    <p
                                        id="link_Send_ModifierSaleReportPDF"
                                        className="Email_wraps-right"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleEmailModalOpen}
                                    >
                                        Email
                                    </p>

                                    <div className="container_content" id="container_content_modifier">
                                        <div
                                            className="invoice-box"
                                            style={{
                                                maxWidth: '1000px',
                                                margin: 'auto',
                                                padding: '10px',
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                color: '#555',
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    textAlign: 'center',
                                                    color: '#5651BD',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                Modifier Sales Report
                                            </h3>
                                            <p
                                                id="lblFilterValue_ModifierSales_PDFReport_RestaurantReports"
                                                style={{ textAlign: 'center' }}
                                            >
                                                {/* {responseData.filterValue2} */}
                                            </p>
                                            <div className="table-responsive">
                                                <div className="sales_wrap_profits" style={{ textAlign: 'right' }}>
                                                    <span
                                                        style={{
                                                            borderBottom: '2px solid #000',
                                                            padding: '0px 200px',
                                                            fontWeight: 'bold',
                                                            fontSize: '13px',
                                                        }}
                                                    >
                                                        Sales
                                                    </span>
                                                </div>
                                                <table
                                                    id="tblModifierSales_PDFReport_RestaurantReports"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
                                                >
                                                    <tbody>
                                                        <tr className="heading">
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '4%',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '45%',
                                                                }}
                                                            >
                                                                Modifier Option Name
                                                            </td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '3%',
                                                                    textAlign: 'center',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '3%',
                                                                    textAlign: 'center',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '8%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Quantity
                                                            </td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Nett ex
                                                            </td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '6%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Tax
                                                            </td>
                                                            <td
                                                                style={{
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '12px',
                                                                    color: '#000',
                                                                    width: '7%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Nett inc
                                                            </td>
                                                        </tr>

                                                        {responseData?.salesData_ModifierSalesGraph && responseData.salesData_ModifierSalesGraph.length > 0 ? (
                                                            responseData.salesData_ModifierSalesGraph.map((item:any, index:any) => (
                                                                <tr key={index} className="details rowsModifierSalesPDFReportCommonClass">
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '4%',
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #000',
                                                                            width: '38%',
                                                                        }}
                                                                    >
                                                                        {item.Name}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '3%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '3%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '8%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {item.ModifierData}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {item.Total_Percentage}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '6%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {item.ModifierData * 0.1}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: '#000',
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            fontSize: '13px',
                                                                            borderBottom: '1px solid #808080b5',
                                                                            width: '7%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {item.Total_Percentage * 0.5}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={8} style={{ textAlign: 'center' }}>
                                                                    No data available
                                                                </td>
                                                            </tr>
                                                        )}

                                                        <tr className="total_final stock_item_sale rowsModifierSalesPDFReportCommonClass">
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    width: '4%',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    width: '45%',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    width: '3%',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    width: '3%',
                                                                }}
                                                            ></td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    borderBottom: '2px solid #000',
                                                                    borderTop: '2px solid #000',
                                                                    fontWeight: 'bold',
                                                                    width: '8%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {responseData?.salesData_ModifierSalesGraph?.reduce(
                                                                    (total:any, item:any) => total + item.ModifierData,
                                                                    0
                                                                )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    borderBottom: '2px solid #000',
                                                                    borderTop: '2px solid #000',
                                                                    fontWeight: 'bold',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {responseData?.salesData_ModifierSalesGraph?.reduce(
                                                                    (total:any, item:any) => total + item.Total_Percentage,
                                                                    0
                                                                )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    borderBottom: '2px solid #000',
                                                                    borderTop: '2px solid #000',
                                                                    fontWeight: 'bold',
                                                                    width: '6%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {responseData?.salesData_ModifierSalesGraph?.reduce(
                                                                    (total:any, item:any) => total + (item.ModifierData * 0.1),
                                                                    0
                                                                )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    color: '#000',
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    fontSize: '13px',
                                                                    borderBottom: '2px solid #000',
                                                                    borderTop: '2px solid #000',
                                                                    fontWeight: 'bold',
                                                                    width: '7%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {responseData?.salesData_ModifierSalesGraph?.reduce(
                                                                    (total:any, item:any) => total + (item.Total_Percentage * 0.5),
                                                                    0
                                                                )}
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id="dv_Download_ModifierSalesReport_Section"
                                        className="text-center"
                                        style={{ padding: '20px' }}
                                    >
                                        <form method="post">
                                            <input type="hidden" name="hdn_ModifierSalesReport_Html" />
                                            <button
                                                type="submit"
                                                id="btnDownload_ModifierSalesReportPDF_RestaurantReports"
                                                className="btn btn-info btn_print"
                                                onClick={downloadPDFModifier}
                                            >
                                                PDF Download
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {dateModal && (
                    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  show" style={{ display: "block" }} id="CustomDates_Selection_ManageReports_Modal" data-backdrop="static" data-keyboard="false">
                        <div className="modal-dialog cstm_modal_dialog">
                            <div className="modal-content plus_modal_cont custm_date-wrappopup">
                                <div className="modal-header plus_modal_head" style={{
                                    display: 'block',
                                    paddingBottom: '30px',
                                    textAlign: 'center',
                                    paddingTop: '0px'
                                }}>
                                    <h4 className="modal-title plus_head_popup" style={{ left: "0px" }}>
                                        Custom Date
                                    </h4>
                                </div>
                                <div className="modal-body new_modal_work">
                                    <div className="col-md-12 col-lg-12 col-12 p-0">
                                        <form>
                                            <div className="dates_wraps">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group text_wrap-datepicker" style={{ marginBottom: "5px" }}>
                                                            <label style={{ width: "auto", marginRight: "8px" }}>From</label>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                                placeholderText="Select Start Date"
                                                                className="form-control datetimepickerClass"
                                                                dateFormat="MM/dd/yyyy"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group text_wrap-datepicker" style={{ marginBottom: "5px" }}>
                                                            <label style={{ width: "auto", marginRight: "8px" }}>To</label>
                                                            <DatePicker
                                                                selected={endDate}
                                                                onChange={(date) => setEndDate(date)}
                                                                placeholderText="Select End Date"
                                                                className="form-control datetimepickerClass"
                                                                dateFormat="MM/dd/yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div id="fromDate_error_CustomDatesSelection_ManageReports_Modal" className="errorsClass2" style={{ paddingLeft: "55px" }}></div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div id="toDate_error_CustomDatesSelection_ManageReports_Modal" className="errorsClass2" style={{ paddingLeft: "32px" }}></div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="modal-bottom plus_modal_bottom" style={{ paddingBottom: "0px", paddingTop: "25px" }}>
                                                <button type="button" className="cstm_model_plusbtn_1 btn btn-danger" onClick={handleCloseModal}>Cancel</button>
                                                <button id="btnSubmit_GraphsData_By_CustomDates_ManageReports" type="button" onClick={handleCustomDate} className="cstm_model_plusbtn_1 btn btn-danger">Apply</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <EmailModal />

        </>
    )
}

export default Modifiers