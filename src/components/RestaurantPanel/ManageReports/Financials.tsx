import React, { useEffect, useRef, useState } from 'react'
import EmailModal from './EmailModal';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from "sweetalert2";
import html2pdf from 'html2pdf.js';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});


interface FinancialReport {
    FilterType_Value: string;
    FilterType_Value2: string;
    TotalSale_Count: number;
    TotalQuantity: number;
    TotalSale_Amount: number;
    Total_GST_Tax_Amount: number;
    TotalCashSales_Count: number;
    TotalCardSales_Count: number;
    TotalEFTPOSSales_Count: number;
    TotalCash_SaleAmount: number;
    TotalCard_SaleAmount: number;
    TotalEFTPOS_SaleAmount: number;
    AveragePerSale_Amount: number;
    TotalCost_Amount: number;
    TotalMargin_Amount: number;
    GrossProfit_Percentage: number;
    TotalAmount_AllSalesType: number;
    TotalSale_Amount_StringFormat: string;
    Total_GST_Tax_Amount_StringFormat: string;
    TotalCash_SaleAmount_StringFormat: string;
    TotalCard_SaleAmount_StringFormat: string;
    TotalEFTPOS_SaleAmount_StringFormat: string;
    AveragePerSale_Amount_StringFormat: string;
    TotalCost_Amount_StringFormat: string;
    TotalMargin_Amount_StringFormat: string;
    GrossProfit_Percentage_StringFormat: string;
    TotalAmount_AllSalesType_StringFormat: string;
    TotalAmount_GrossSale: number;
    TotalAmount_GrossSale_StringFormat: string;
    TotalSurcharges_Count: number;
    TotalSurcharges_Amount: number;
    TotalRefund_Count: number;
    TotalRefund_Amount: number;
    TotalNoSale_Count: number;
}

interface TendorTypeData {
    Id: number;
    TenderTypeName: string;
    Orders_TotalCount: number;
    Orders_TotalAmount: number;
    Orders_TotalAmount_Sum: number;
    Orders_TotalRefundCount: number;
    Orders_TotalRefundAmount: number;
}

interface SaleData {
    Id: number;
    Name: string;
    TotalQuantity: number;
    TotalSale_Amount: number;
    TotalSale_Amount_StringFormat: string;
}

interface FinancialCompressionData {
    monthNamesList: string[];
    currentYearValue: string;
    lastYearValue: string;
    secondLastYearValue: string;
    salesData_CurrentYear: number[];
    salesData_LastYear: number[];
    salesData_SecondLastYear: number[];
}

interface DiscountDetails {
    Id: number;
    DiscountId: number;
    DiscountTypeId: number;
    DiscountName: string;
    DiscountCount: number;
    DiscountValueSum: number;
}

interface PromotionData {
    TotalPromotionCount: number;
    TotalPromotionsAmountSum: number;
    PromotionDetail_StringFormat: string | null;
};


const Financials: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('financial_report');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterationType, setFilterationType] = useState<string>('Weekly');
    const [filterTypeId, setFilterTypeId] = useState<number>(1);
    const [chartOptions, setChartOptions] = useState<any>({});
    const [saleData, setSaleData] = useState<FinancialReport | null>(null);
    const [tendorData, setTendorData] = useState<TendorTypeData[] | null>(null);
    const [departmentSaleData, setDepartmentSaleData] = useState<SaleData[]>([]);
    const [promotionData, setPromotionData] = useState<PromotionData[]>([]);
    const [flag, setFlag] = useState<boolean>(false);
    const [discountDetails, setDiscountDetails] = useState<DiscountDetails[]>([]);
    const [compressionChart, setCompressionChart] = useState<Highcharts.Options>({});
    const [promotionDetailStringFormat, setPromotionDetailStringFormat] = useState<string>('');
    const [promotionDetailStringFormat2, setPromotionDetailStringFormat2] = useState<string>('');

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const cancelRef = useRef<HTMLButtonElement | null>(null);

    const global_token = localStorage.getItem("authToken");

    const handleDateModal = () => {
        buttonRef.current?.click();
    };

    const handleCloseModal = () => {
        cancelRef.current?.click();

    };

    const handleSubmitCustomDAte = () => {
        setFilterTypeId(4);
        setFilterationType("CustomDates");
        setFlag(!flag);
        handleCloseModal();
    };

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

    const getFinancialReport = async (type: string, typeId: number) => {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/financialreport`;

        let fromDate = "";
        let toDate = "";

        if (startDate && endDate) {
            console.log("Updated Start and End Dates:", startDate, endDate);
            fromDate = formatDate(startDate);
            toDate = formatDate(endDate);
        }

        try {
            setLoading(true);
            const params = {
                filterationType: type,
                filterationTypeId: typeId,
                fromDate: fromDate,
                toDate: toDate,
                restaurantLoginId: 0,
            };

            const response = await axios.post(apiUrl, params, {
                headers: {
                    Authorization: `Bearer ${global_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                const data = response.data.data;
                const graphData = data.salesData_BarGraph;

                let categories_list: string[] = [];
                let current_value = '';
                let previous_value = '';
                let data_current: number[] = [];
                let data_previous: number[] = [];

                if (typeId === 1 && graphData) {
                    categories_list = graphData.dayNamesList;
                    current_value = graphData.currentWeekValue;
                    previous_value = graphData.lastWeekValue;
                    data_current = graphData.salesData_CurrentWeek;
                    data_previous = graphData.salesData_LastWeek;
                } else if (typeId === 2 && graphData) {
                    categories_list = graphData.dayNamesList;
                    current_value = graphData.currentMonthValue;
                    previous_value = graphData.lastMonthValue;
                    data_current = graphData.salesData_CurrentMonth;
                    data_previous = graphData.salesData_LastMonth;
                } else if (typeId === 3 && graphData) {
                    categories_list = graphData.monthNamesList;
                    current_value = `Current-Year (${graphData.currentYearValue})`;
                    previous_value = `Last-Year (${graphData.lastYearValue})`;
                    data_current = graphData.salesData_CurrentYear;
                    data_previous = graphData.salesData_LastYear;
                }
                else if (typeId === 4 && graphData) {
                    categories_list = graphData.monthNamesList;
                    current_value = `Current-Year (${graphData.currentYearValue})`;
                    previous_value = `Last-Year (${graphData.lastYearValue})`;
                    data_current = graphData.salesData_CurrentYear;
                    data_previous = graphData.salesData_LastYear;
                }

                setChartOptions({
                    chart: {
                        zoomType: 'xy',
                    },
                    title: {
                        text: '',
                        align: 'left',
                    },
                    colors: ['#554ebc', '#d9622a'],
                    xAxis: [{
                        categories: categories_list,
                        crosshair: true,
                    }],
                    yAxis: [{
                        labels: {
                            format: '{value}',
                            style: {
                                color: '#554ebc',
                            },
                        },
                        title: {
                            text: 'Income',
                            style: {
                                color: '#554ebc',
                            },
                        },
                    }],
                    tooltip: {
                        shared: true,
                    },
                    series: [
                        {
                            name: current_value,
                            type: 'column',
                            data: data_current,
                            tooltip: {
                                valuePrefix: '$',
                            },
                        },
                        {
                            name: previous_value,
                            type: 'spline',
                            data: data_previous,
                            tooltip: {
                                valuePrefix: '$',
                            },
                        },
                    ],
                });

                if (data.saleData_PDFReport.saleData) {
                    setSaleData(data.saleData_PDFReport.saleData);
                }
                if (data.saleData_PDFReport.saleDataByTenderType) {
                    const Tendordata = data.saleData_PDFReport.saleDataByTenderType
                    setTendorData(Tendordata);
                }
                if (data.saleData_PDFReport.departmentSaleData) {
                    const departmentData = data.saleData_PDFReport.departmentSaleData;
                    setDepartmentSaleData(departmentData);
                }
                if (data.saleData_PDFReport.discountDetail) {
                    const discountDetail = data.saleData_PDFReport.discountDetail;
                    setDiscountDetails(discountDetail);
                }
                if (data.saleData_PDFReport.promotionData) {
                    const promotionData = data.saleData_PDFReport.promotionData;
                    setPromotionData(promotionData);

                    let tempPromotionDetailStringFormat = '';
                    let tempPromotionDetailStringFormat2 = '';

                    if (promotionData.PromotionDetail_StringFormat == null) {
                        promotionData.PromotionDetail_StringFormat = '';
                    } else {
                        const tempData = promotionData.PromotionDetail_StringFormat.split(',');
                        tempData.forEach((val: string) => {
                            tempPromotionDetailStringFormat += `<div style='font-size:13px;font-style: italic;'>${val}</div>`;
                            tempPromotionDetailStringFormat2 += `<div style='font-size:11px;font-style: italic;padding-bottom:5px;'>${val}</div>`;
                        });
                    }

                    setPromotionDetailStringFormat(tempPromotionDetailStringFormat);
                    setPromotionDetailStringFormat2(tempPromotionDetailStringFormat2);
                }
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response) {

                    if (error.response.status === 401) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Unauthorized! Invalid Token!',

                        });
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: 'There is some technical error, please try again!',

                        });
                    }
                } else if (error.request) {
                    Toast.fire({
                        icon: 'error',
                        title: 'No response from server. Please check your network connection!',

                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: `Error: ${error.message}`,

                    });
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'An unexpected error occurred. Please try again!',

                });
            }
        }
        finally {
            setLoading(false);
            setEndDate(null);
            setStartDate(null);
        }
    };

    const getFinancialCompression = async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/financialcompression?restaurantLoginId=0`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${global_token}`, // Ensure `global_token` is defined
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                const data: FinancialCompressionData = response.data.data.salesData_FinancialCompression;

                const chartOptions: Highcharts.Options = {
                    chart: {
                        type: "column",
                    },
                    exporting: {
                        enabled: false,
                    },
                    title: {
                        text: "",
                    },
                    xAxis: {
                        categories: data.monthNamesList,
                        labels: {
                            useHTML: true,
                            align: "right",
                            style: {
                                paddingRight: "5px",
                            },
                        },
                    },
                    yAxis: [
                        {
                            min: 0,
                            title: {
                                text: "Income",
                            },
                        },
                    ],
                    legend: {
                        shadow: false,
                    },
                    tooltip: {
                        shared: true,
                    },
                    plotOptions: {
                        column: {
                            grouping: false,
                            shadow: false,
                            borderWidth: 0,
                        },
                    },
                    series: [
                        {
                            type: "column",
                            name: data.currentYearValue,
                            color: "rgba(85,78,188,1)",
                            data: data.salesData_CurrentYear,
                            pointPadding: 0.1,
                            pointPlacement: -0.2,
                            tooltip: {
                                valuePrefix: "$",
                            },
                        },
                        {
                            type: "column",
                            name: data.lastYearValue,
                            color: "rgba(119,187,226,.9)",
                            data: data.salesData_LastYear,
                            pointPadding: 0.2,
                            pointPlacement: -0.2,
                            tooltip: {
                                valuePrefix: "$",
                            },
                        },
                        {
                            type: "column",
                            name: data.secondLastYearValue,
                            color: "rgba(235,129,129,.8)",
                            data: data.salesData_SecondLastYear,
                            pointPadding: 0.3,
                            pointPlacement: -0.2,
                            tooltip: {
                                valuePrefix: "$",
                            },
                        },
                    ],
                };
                setCompressionChart(chartOptions);
            }
        } catch (error) {
            console.error("Error fetching financial compression data:", error);
        }
    };
    //downloadPDF
    const downloadPDF = () => {
        const element = document.getElementById('container_content');

        if (element) {
            const options = {
                margin: 10,
                filename: 'MainDepartmentReport.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf()
                .from(element)
                .set(options)
                .save();
        } else {
            alert('Report content element not found.');
        }
    };



    // Toggles the dropdown
    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        console.log('Dropdown toggled:', !isOpen);
    };

    useEffect(() => {
        getFinancialCompression();
        getFinancialReport(filterationType, filterTypeId);
    }, [filterationType, filterTypeId, flag]);


    const handleEmailModalOpen = () => {
        const button = document.getElementById("btn_SendPDFReportEmail_RestaurantReports_Modal") as HTMLButtonElement;
        button?.click();
        document.body.classList.add("modal-open");
        const modal = document.getElementById("SendPDFReportEmail_RestaurantReports_Modal") as HTMLElement;

        if (modal) {
            modal.style.display = "block";
        }
    };

    return (
        <>
            <div id="home" className="container-fluid">
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
                    <div className="tabs_wraps-div">
                        <ul className="tabs clearfix">
                            <li>
                                <a
                                    id="tab_FinancialReport_ManageRestaurantReports"
                                    href="#financial_report"
                                    className={`FinancialReportDataClassCommon ${activeTab === 'financial_report' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab('financial_report');
                                    }}
                                >
                                    FINANCIAL REPORT
                                </a>
                            </li>
                            <li>
                                <a
                                    id="tab_FinancialCompression_ManageRestaurantReports"
                                    href="#financial_compression"
                                    className={`FinancialReportDataClassCommon ${activeTab === 'financial_compression' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab('financial_compression');
                                    }}
                                >
                                    FINANCIAL COMPARISON
                                </a>
                            </li>
                        </ul>
                        <div className="dropdown-container" style={{ display: activeTab === 'financial_compression' ? 'none' : 'block' }}>
                            {/* Button to toggle dropdown */}
                            <span
                                id="FilterOptionsMenu_FinancialReport"
                                className="dropbtn FilterOptionsMenuCommonClass Vector_horizental"
                                style={{ background: 'rgb(246, 248, 252)' }}
                                onClick={toggleDropdown}
                            >
                                <img
                                    src="/Content/Restaurant/icons/Vector_horizental.png"
                                    alt="icon"
                                    className="dropbtn vertical-menus"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="cgt-content">
                        <div id="financial_report" className={`p-0 tab ${activeTab === 'financial_report' ? 'a' : ''}`} style={{ display: activeTab === 'financial_compression' ? 'none' : 'block' }}>
                            <div
                                id="dllFilterGraphOption_FinancialReports_ManageReports"
                                className={`dropdown-content dropdownContent_FinancialReports ${isOpen ? 'show' : ''}`}
                            // onClick={()}
                            >
                                <a
                                    id="optFilteration_Weekly_FinancialReports"
                                    href="javascript:;"
                                    className="optFilterationClass_FinancialReports"
                                    onClick={() => {
                                        setFilterationType("Weekly");
                                        setFilterTypeId(1);
                                        setFlag(!flag);
                                    }}

                                >
                                    Weekly
                                </a>
                                <a
                                    id="optFilteration_Monthly_FinancialReports"
                                    href="javascript:;"
                                    className="optFilterationClass_FinancialReports"
                                    onClick={() => {
                                        setFilterationType("Monthly");
                                        setFilterTypeId(2);
                                        setIsOpen(false);
                                        setFlag(!flag);
                                    }}
                                >
                                    Monthly
                                </a>
                                <a
                                    id="optFilteration_Yearly_FinancialReports"
                                    href="javascript:;"
                                    className="optFilterationClass_FinancialReports"
                                    onClick={() => {
                                        setFilterationType("Yearly");
                                        setFilterTypeId(3);
                                        setIsOpen(false);
                                        setFlag(!flag);
                                    }}
                                >
                                    Yearly
                                </a>
                                <a
                                    id="optFilteration_CustomDates_FinancialReports"
                                    className="optFilterationClass_FinancialReports"
                                    onClick={handleDateModal}
                                >
                                    Custom Dates
                                </a>
                            </div>
                            <div
                                className="col-md-12 col-lg-12"
                                id="lblSelectedFilterOption_FinancialReports_ManageReports"
                                style={{ paddingTop: '8px', paddingLeft: '55px', fontSize: '20px' }}
                            >
                                {/* {selectedFilter} */}
                            </div>
                            <div className="graph">
                                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                            </div>
                            <hr className="space_wraps" />
                            <div className="pdf_reports">
                                <div className="wrap_pdf">
                                    <p
                                        id="link_Send_FinancialReportPDF"
                                        className="Email_wraps-right"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleEmailModalOpen}
                                    >
                                        Email
                                    </p>
                                    <div className="container_content" id="container_content">
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
                                                Financial Report
                                            </h3>
                                            <p
                                                id="lblFilterValue_Financial_PDFReport_RestaurantReports"
                                                style={{ textAlign: 'center' }}
                                            >
                                                {saleData?.FilterType_Value2}
                                            </p>
                                            <div
                                                className="finacial_reprt-wraps"
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'space-between',
                                                    width: '92%',
                                                    border: '1px solid',
                                                    borderRadius: '5px',
                                                    padding: '10px 30px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                <div className="table-responsive wrap_left_table" style={{ width: '49%' }}>
                                                    <table style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}>
                                                        <tbody>
                                                            <tr className="heading">
                                                                <td style={{ background: 'transparent', borderBottom: '0px', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '13px', color: '#000', textAlign: 'right' }}></td>
                                                                <td style={{ background: 'transparent', borderBottom: '0px', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '13px', color: '#000', textAlign: 'right' }}>Quantity</td>
                                                                <td style={{ background: 'transparent', borderBottom: '0px', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '13px', color: '#000', textAlign: 'right' }}>Amount</td>
                                                            </tr>

                                                            <tr id="gross_sale_tr" className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Gross Sales</td>
                                                                <td id="lblGrossSales_Quantity_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalQuantity}</td>
                                                                <td id="lblGrossSales_Amount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalAmount_GrossSale_StringFormat}</td>
                                                            </tr>
                                                            {discountDetails?.map((item) => (
                                                                item.DiscountTypeId === 1 && (
                                                                    <tr className="details st_discount" id={`st_discount5${item.Id}`}>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountName}</td>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountCount}</td>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountValueSum}</td>
                                                                    </tr>)
                                                            ))}

                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Surcharges</td>
                                                                <td id="Order_Surcharges_Count_FinancialPDFReport_RestaurantReports" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalSurcharges_Count}</td>
                                                                <td id="Order_Surcharges_Amount_FinancialPDFReport_RestaurantReports" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalSurcharges_Amount}</td>
                                                            </tr>


                                                            <tr id="promotions_tr" className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>
                                                                    <p style={{ marginBottom: '0px' }} className="promotions_td_text">Promotions</p>

                                                                    <div style={{ fontSize: '13px', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: promotionDetailStringFormat }} />
                                                                </td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>
                                                                    {promotionData?.TotalPromotionCount}
                                                                </td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>
                                                                    {parseFloat(promotionData?.TotalPromotionsAmountSum).toFixed(2)}
                                                                </td>
                                                            </tr>

                                                            {discountDetails?.map((item) => (
                                                                item.DiscountTypeId === 2 && (
                                                                    <tr className="details st_discount" id={`st_discount5${item.Id}`}>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountName}</td>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountCount}</td>
                                                                        <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.DiscountValueSum}</td>
                                                                    </tr>)
                                                            ))}

                                                            <tr className="total_financial_sale">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>NETT Sales (incl. tax)</td>
                                                                <td></td>
                                                                <td id="lblNettSales_IncludeTax_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', borderTop: '2px solid #000', fontWeight: 'bold' }}>{saleData?.TotalSale_Amount_StringFormat}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="table-responsive wrap_right_table" style={{ width: '49%' }}>
                                                    <table cellPadding="0" cellSpacing="0" style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}>
                                                        <tbody>
                                                            <tr className="heading">
                                                                <td></td>
                                                                <td style={{ background: 'transparent', borderBottom: '0px', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '13px', color: '#000', textAlign: 'right' }}>Quantity</td>
                                                                <td style={{ background: 'transparent', borderBottom: '0px', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '13px', color: '#000', textAlign: 'right' }}>Amount</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Transactions</td>
                                                                <td id="lblTransactions_Count_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalSale_Count}</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Sales</td>
                                                                <td id="lblSales_Count_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{parseFloat(saleData?.TotalSale_Count) - parseFloat(saleData?.TotalRefund_Count)}</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>No-Sales</td>
                                                                <td id="lblNoSale_Count_FinancialPDFReport_RestaurantReports" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalNoSale_Count}</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                            </tr>
                                                            <tr className="details wrap_avrgae_sales">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Average $ per Sale</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                                <td id="lblAveragePerSale_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>${saleData?.AveragePerSale_Amount_StringFormat}</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Refunds</td>
                                                                <td id="lblTotalRefundCount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.TotalRefund_Count}</td>
                                                                <td id="lblTotalRefundAmount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>${(saleData?.TotalRefund_Amount)?.toFixed(2)}</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Voids</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>0</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>0.00</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Void Entire Sales</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>0.00</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Cost of Sales (Excl. GST)</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                                <td id="lblCostOfSales_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>${saleData?.TotalCost_Amount_StringFormat}</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>$ Margin</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                                <td id="lblMarginAmount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>${saleData?.TotalMargin_Amount_StringFormat}</td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>Gross Profit (%)</td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}></td>
                                                                <td id="lblGrossProfitPercentage_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.GrossProfit_Percentage_StringFormat}</td>
                                                            </tr>
                                                            <tr className="details wrap_tax-amounts">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', paddingTop: '30px', textDecoration: 'underline' }}>
                                                                    <span className="wrap_underline">Tax Amounts</span>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td></td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}><strong>Amount</strong></td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}><strong>Sales (Excl. tax)</strong></td>
                                                            </tr>
                                                            <tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>GST</td>
                                                                <td id="lblGST_TaxAmount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{saleData?.Total_GST_Tax_Amount_StringFormat}</td>
                                                                <td id="lblGST_SalesAmount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}> {parseFloat(saleData?.TotalSale_Amount - saleData?.Total_GST_Tax_Amount).toFixed(2)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                            <div className="amountes_trends_wraps" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '92%', border: '1px solid', borderRadius: '5px', padding: '20px 30px', marginBottom: '10px' }}>
                                                <div className="amounts_left_wrasp" style={{ width: '40%' }}>
                                                    <p style={{ textAlign: 'right' }}>
                                                        <span style={{ textDecoration: 'underline', fontSize: '13px' }}>AMOUNTS TENDERED FOR SALES</span>
                                                    </p>
                                                    <table id="saleDataByTenderType" cellPadding="0" cellSpacing="0" style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}>
                                                        <tbody>
                                                            {tendorData?.map((typeData) => (<tr className="details">
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.TenderTypeName}</td>
                                                                <td id="lblSales_Count_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.Orders_TotalCount}</td>
                                                                <td id="lblSales_Amount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.Orders_TotalAmount}</td>
                                                            </tr>))}
                                                            <tr className="details amount_finalsales">
                                                                <td></td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', borderTop: '2px solid', fontWeight: 'bold' }}></td>
                                                                <td id="lblTotalSales_Amount_2_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', borderTop: '2px solid', fontWeight: 'bold' }}>{tendorData && tendorData[tendorData?.length - 1].Orders_TotalAmount_Sum}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="amounts_right_wrasp !w-full sm:!w-[40%]" style={{ width: '40%' }}>
                                                    <p style={{ textAlign: 'right' }}>
                                                        <span style={{ textDecoration: 'underline', fontSize: '13px' }}>AMOUNTS TENDERED FOR REFUND</span>
                                                    </p>
                                                    <table id="refundDataByTenderType" cellPadding="0" cellSpacing="0" style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}>
                                                        <tbody>
                                                            {tendorData?.map((typeData) => (
                                                                <tr className="details">
                                                                    <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.TenderTypeName}</td>
                                                                    <td id="lblSales_RefundCount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.Orders_TotalRefundCount}</td>
                                                                    <td id="lblSales_RefundAmount_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{typeData.Orders_TotalRefundAmount}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="details refund_amount_finalsales">
                                                                <td></td>
                                                                <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', borderTop: '2px solid', fontWeight: 'bold' }}></td>
                                                                <td id="lblTotalSales_RefundAmount_2_FinancialPDFReport_RestaurantReports" className="FinancialPDFReportFieldCommonClass" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right', borderTop: '2px solid', fontWeight: 'bold' }}>{tendorData && tendorData[tendorData?.length - 1].Orders_TotalAmount_Sum}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="amountes_trends_wraps" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '92%', border: '1px solid', borderRadius: '5px', padding: '20px 30px', marginBottom: '10px' }}>
                                                <div className="amounts_left_wrasp" style={{ width: '40%' }}>
                                                    <table id="tblMainDepartments_FinancialPDFReport_RestaurantReports" cellPadding="0" cellSpacing="0" style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}>
                                                        <tbody>
                                                            <tr className="details">
                                                                <td className="wrap_sales_category" style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>
                                                                    <span style={{ textDecoration: 'underline' }}>SALES CATEGORIES</span>
                                                                </td>
                                                            </tr>
                                                            {departmentSaleData?.map((item) => (
                                                            <tr className="rowsDepartmentFinancialPDFReportCommonClass">
                                                                    <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.Name}</td>
                                                                    <td style={{ padding: '5px', verticalAlign: 'top', paddingBottom: '2px', fontSize: '13px', textAlign: 'right' }}>{item.TotalSale_Amount_StringFormat}</td>
                                                                </tr>    
                                                            ))}

                                                            <td style={{
                                                                padding: '5px',
                                                                verticalAlign: 'top',
                                                                paddingBottom: '2px',
                                                                fontSize: '13px',
                                                                textAlign: 'right',
                                                                borderTop: '1px solid',
                                                                fontWeight: 'bold'
                                                            }}>440.00</td>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="dv_Download_FinancialReport_Section" className="text-center" style={{ padding: '20px' }}>
                                        <form method="post">
                                            <button type="button" onClick={downloadPDF} id="btnDownload_FinancialReportPDF_RestaurantReports" className="btn btn-info btn_print">
                                                PDF Download
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="financial_compression" className={`tab ${activeTab === 'financial_compression' ? 'a' : ''}`} style={{ display: activeTab === 'financial_compression' ? 'block' : 'none' }}>
                            <div className="graph">
                                <figure className="highcharts-figure">
                                    <HighchartsReact highcharts={Highcharts} options={compressionChart} />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="btn_CustomDates_Selection_ManageReports_Modal" type="button" ref={buttonRef} onClick={() => console.log("Button clicked")} className="btn btn-info btn-lg" data-toggle="modal" data-target="#CustomDates_Selection_ManageReports_Modal" style={{ display: "none" }}></button>
            <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " id="CustomDates_Selection_ManageReports_Modal" data-backdrop="static" data-keyboard="false">
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
                                                        className="form-control datetimepickerClass datetimepicker-input"
                                                        timeInputLabel="Time:"
                                                        placeholderText="From"
                                                        dateFormat="MM/dd/yyyy h:mm aa"
                                                        showTimeInput
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                <div className="form-group text_wrap-datepicker" style={{ marginBottom: "5px" }}>
                                                    <label style={{ width: "auto", marginRight: "8px" }}>To</label>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        placeholderText="To"
                                                        timeInputLabel="Time:"
                                                        dateFormat="MM/dd/yyyy h:mm aa"
                                                        showTimeInput
                                                        className="form-control datetimepickerClass datetimepicker-input"

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
                                        <button id="btnCancel_CustomDatesSelection_ManageReports_Modal" ref={cancelRef} onClick={() => console.log("closebutton")} type="button" className="cstm_model_plusbtn_1 btn btn-danger" data-dismiss="modal" style={{ display: "none" }}></button>
                                        <button type="button" className="cstm_model_plusbtn_1 btn btn-danger" onClick={handleCloseModal}>Cancel</button>
                                        <button id="btnSubmit_GraphsData_By_CustomDates_ManageReports" onClick={handleSubmitCustomDAte} type="button" className="cstm_model_plusbtn_1 btn btn-danger">Apply</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <EmailModal />
        </>
    )
}

export default Financials