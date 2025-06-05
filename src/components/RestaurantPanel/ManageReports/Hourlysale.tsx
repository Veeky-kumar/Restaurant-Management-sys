
import React, { useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import EmailModal from './EmailModal';
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Bounce, toast } from 'react-toastify';

interface SaleData {
    SaleAmount_Breakfast: number;
    SalePercentage_Breakfast: number;
    SaleAmount_Lunch: number;
    SalePercentage_Lunch: number;
    SaleAmount_Dinner: number;
    SalePercentage_Dinner: number;
    FilterType_Value: string;
}


const Hourlysale: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('hourlySale1');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [salesData, setSalesData] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [flag, setFlag] = useState<boolean>(false);
    const [filterationType, setFilterationType] = useState<number>(1);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pdfReportData, setPdfReportData] = useState<any>(null);
    const [dateModal, setDateModal] = useState<boolean>(false);
    const [customDateModal, setCustomDateModal] = useState<boolean>(false);
    const [BDLSalesData, setBDLSalesData] = useState<SaleData>();
    const [bldFiltertype, setBldFilterType] = useState<number>(1);
    const UserToken_Global = localStorage.getItem("authToken");
    const restaurantLoginId = 0;

    const toggleDropdown = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
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


    // fetch sales data
    const fetchSalesData = async () => {
        setLoading(true);
        setError(null);
        const formattedDate = selectedDate ? formatDate(selectedDate) : '';
        const requestPayload = {
            restaurantLoginId: restaurantLoginId,
            filterationType: filterationType,
            customDate: formattedDate,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/hourlysale`,
                requestPayload,
                {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setSalesData(response.data.data);
        } catch (error) {
            setError('Failed to fetch sales data. Please try again.');
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const fetchPDFReportData = async () => {
        setLoading(true);
        setError(null);

        const formattedDate = selectedDate ? formatDate(selectedDate) : '';
        const requestPayload = {
            restaurantLoginId: restaurantLoginId,
            filterationType: filterationType,
            customDate: formattedDate,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}api/restaurant/reports/pdf/hourlysale`,
                requestPayload,
                {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setPdfReportData(response.data.data);
        } catch (error) {
            setError('Failed to fetch PDF report data. Please try again.');
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const fetchBreakfastLunchDinnerGraphData = async () => {

        const fromDate = startDate ? formatDate(startDate) : '';
        const toDate = endDate ? formatDate(endDate) : '';
        const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/breakfastlunchdinner`;

        const requestPayload = {
            filterationType: bldFiltertype,
            fromDate: fromDate,
            restaurantLoginId: 0,
            toDate: toDate
        }
        try {
            setLoading(true);
            const response = await axios.post(apiUrl,
                requestPayload,
                {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.status === 200 && response.data.status === 1) {
                const BreakfastLunchDinnerGraphData = response.data.data.salesData_BreakfastLunchDinnerGraph;
                if (BreakfastLunchDinnerGraphData) {
                    setBDLSalesData(BreakfastLunchDinnerGraphData);
                }
            }
            else {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
        catch {

        }
        finally {
            setLoading(false);
            setStartDate(null);
            setStartDate(null);
            handleCloseModal();
            setIsOpen(false);
        }
    }

    const chartOptions = BDLSalesData
        ? {
        chart: {
                backgroundColor: "#00afff00",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie",
        },
        title: {
            text: "",
        },
            colors: ["#5753be", "#fdca40", "#ff5c5a"],
            tooltip: {
                headerFormat: "",
                pointFormat: "{point.name}: <b>{point.y}%</b>",
        },
            plotOptions: {
                pie: {
                    size: 200,
                    innerSize: "60%",
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                },
            },
            exporting: {
                enabled: false,
            },
            legend: {
                enabled: true,
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
                itemMarginTop: 15,
                itemMarginBottom: 8,
                useHTML: true,
                labelFormatter: function () {
                    // return `${this.name} (${this.y}%)`;
                },
                borderWidth: null,
        },
        series: [
            {
                    name: "BreakfastLunchDinner",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Breakfast",
                            y: BDLSalesData?.SalePercentage_Breakfast,
                        },
                        {
                            name: "Lunch",
                            y: BDLSalesData?.SalePercentage_Lunch,
                        },
                        {
                            name: "Dinner",
                            y: BDLSalesData?.SalePercentage_Dinner,
                        },
                    ],
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 300,
                        },
                        chartOptions: {
                            legend: {
                                enabled: true,
                                align: "center",
                                verticalAlign: "bottom",
                                layout: "horizontal",
                                useHTML: true,
                                labelFormatter: function () {
                                    // return `${this.name} (${this.y}%)`;
                                },
                                borderWidth: null,
                            },
                            plotOptions: {
                                pie: {
                                    size: 150,
                                },
                            },
                        },
                    },
                ],
            },
        }
        : null;

    const closeModal = () => {
        setDateModal(false);
        setSelectedDate(null);
    }

    const handleCustomDate = () => {
        setFilterationType(2);
        setFlag(prevflag => !prevflag);
    }

    // Call fetchSalesData
    useEffect(() => {
        fetchBreakfastLunchDinnerGraphData();
        fetchSalesData();
        fetchPDFReportData();
    }, [filterationType, bldFiltertype, flag]);


    const handleCloseModal = () => {
        setDateModal(false);
        setCustomDateModal(false);
    };

    // Render Progress Bars dynamically
    const renderProgressBars = () => {
        if (loading) return <p>Loading...</p>;
        if (!salesData || !salesData.salesData_HourlySalesGraph || salesData.salesData_HourlySalesGraph.length === 0) {
            return <p>No sales data available</p>;
        }

        const maxSaleAmount = 1000;
        return salesData.salesData_HourlySalesGraph.map((data: { startTimeValue: string, SaleData: number }, index: number) => {
            const { startTimeValue, SaleData } = data;
            const width = Math.max(Math.min((SaleData / maxSaleAmount) * 100, 100), 1);

            return (
                <div className="wrap_bar-prgress !flex !flex-col sm:!flex-row" style={{ marginBottom: '12px' }} key={index}>
                    <p className='text-center'>{startTimeValue}</p>
                    <div className="progress ml-0 sm:ml-[30px] w-full sm:w-[66%]" style={{ marginBottom: '14px' }}>
                        <div
                            className="progress-bar orange"
                            style={{
                                width: `${width}%`,
                                background: 'rgb(87, 83, 190)',
                            }}
                        />
                    </div>
                    <span className="value_progress text-center" style={{ marginTop: '-12px' }}>
                        ${SaleData.toFixed(2)}
                    </span>
                </div>
            );
        });
    };

    return (
        <>
            <div id="hourly_sale" className=" container-fluid">
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
                                    id="tab_HourlySalesReport_ManageRestaurantReports"
                                    className={`FinancialReportDataClassCommon ${activeTab === 'hourlySale1' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('hourlySale1')}
                                >
                                    HOURLY SALE
                                </a>
                            </li>
                            <li>
                                <a
                                    id="tab_BreakfastLunchDinnerReport_ManageRestaurantReports"
                                    className={`FinancialReportDataClassCommon ${activeTab === 'hourlySale2' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('hourlySale2')}
                                // onClick={() => GetBreakfastLunchDinnerGraphDataOfRestaurant(1)}
                                >
                                    BREAKFAST, LUNCH, DINNER
                                </a>
                            </li>
                        </ul>
                        <span
                            id="FilterOptionsMenu_HourlySalesReport"
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
                        <span
                            id="FilterOptionsMenu_BreakfastLunchDinnerReport"
                            className="dropbtn FilterOptionsMenuCommonClass Vector_horizental"
                            style={{ background: 'rgb(246, 248, 252)', display: 'none' }}
                        // onClick={() => ShowFilterGraphOption_BreakfastLunchDinnerReports_ManageReports()}
                        >
                            <img
                                src="../../Content/Restaurant/icons/Vector_horizental.png"
                                alt="icon"
                                className="dropbtn vertical-menus"
                            />
                        </span>
                    </div>
                    <div className="cgt-content">
                        <div id="hourly_sale1" style={{ display: activeTab === 'hourlySale1' ? 'block' : 'none' }}  >
                            <div
                                id="dllFilterGraphOption_HourlySalesReports_ManageReports"
                                className={`dropdown-content dropdownContent_HourlySalesReports ${isOpen ? 'show' : ''}`}
                            >
                                <a
                                    id="optFilteration_Today_HourlySalesReports"
                                    href="javascript:;"
                                    className="optFilterationClass_HourlySalesReports "
                                    onClick={() => {
                                        setFilterationType(1);
                                        setFlag(prevflag => !prevflag);
                                    }}
                                >
                                    Today
                                </a>
                                <a
                                    id="optFilteration_CustomDate_HourlySalesReports"
                                    href="javascript:;"
                                    className="optFilterationClass_HourlySalesReports"
                                    onClick={() => setDateModal(true)}
                                >
                                    Custom Date
                                </a>
                            </div>

                            <div className="set-graph">
                                <div className="graph p-0 sm:p-[15px]">
                                    <div
                                        id="lblSelectedFilterOption_HourlySaleReports_ManageReports"
                                        className="lblHeading_HourlySales_Style"
                                    >
                                        {/* {salesData.salesData_HourlySalesGraph.length > 0 ? salesData.salesData_HourlySalesGraph[salesData.salesData_HourlySalesGraph.length - 1].FilterValue : "No Filter Applied"} */}
                                    </div>

                                    <div className="product_sale-bars" style={{ float: 'left', width: '93%' }}>
                                        {renderProgressBars()}
                                    </div>

                                    <div className="clear"></div>
                                </div>
                            </div>

                            <hr className="space_wraps" />

                            <div className="pdf_reports">
                                <div className="wrap_pdf">
                                    <p
                                        className="Email_wraps-right"
                                        style={{ cursor: 'pointer' }}
                                        // onClick={handleEmailModalOpen}
                                    >
                                        Email
                                    </p>

                                    <div className="container_content">
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
                                                Hourly Sales - Stock Item
                                            </h3>
                                            <p
                                                id="lblFilterValue_HourlySales_PDFReport_RestaurantReports"
                                                style={{ textAlign: 'center' }}
                                            >
                                                {salesData?.filterValue || "Loading..."}
                                            </p>

                                            <div className="table-responsive">
                                                <table
                                                    id="tblHourlySales_PDFReport_RestaurantReports"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        width: '100%',
                                                        lineHeight: 'inherit',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr className="heading">
                                                            <td
                                                                colSpan={3}
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '60%',
                                                                }}
                                                            ></td>

                                                            <td
                                                                colSpan={2}
                                                                style={{
                                                                    textAlign: 'center',
                                                                    padding: '2px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    color: '#555',
                                                                    fontSize: '16px',
                                                                    width: '20%',
                                                                }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        borderBottom: '2px solid #000',
                                                                        textAlign: 'center',
                                                                        color: '#555',
                                                                        fontSize: '16px',
                                                                        marginBottom: '0px',
                                                                        paddingBottom: '0px',
                                                                    }}
                                                                >
                                                                    Sales
                                                                </p>
                                                            </td>

                                                            <td
                                                                colSpan={2}
                                                                style={{
                                                                    textAlign: 'center',
                                                                    padding: '2px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    color: '#555',
                                                                    fontSize: '16px',
                                                                    width: '20%',
                                                                }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        borderBottom: '2px solid #000',
                                                                        textAlign: 'center',
                                                                        color: '#555',
                                                                        fontSize: '16px',
                                                                        marginBottom: '0px',
                                                                        paddingBottom: '0px',
                                                                    }}
                                                                >
                                                                    Profit
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr className="heading">
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '15%',
                                                                }}
                                                            >
                                                                Product-Number
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '35%',
                                                                }}
                                                            >
                                                                Name
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Quantity
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Amount
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                %
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                Amount
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: '5px',
                                                                    verticalAlign: 'top',
                                                                    background: 'transparent',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    width: '10%',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                %
                                                            </td>
                                                        </tr>

                                                        {/* Map through the data and create table rows */}
                                                        {pdfReportData?.hourlySalesPDFReportData?.length > 0 ? (
                                                            pdfReportData.hourlySalesPDFReportData.map((product: any, index: number) => (
                                                                <tr key={index}>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '15%',
                                                                        }}
                                                                    >
                                                                        {product.productNumber}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '35%',
                                                                        }}
                                                                    >
                                                                        {product.productName}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {product.quantity}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {product.amount}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {product.salesPercentage} %
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {product.profitAmount}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding: '5px',
                                                                            verticalAlign: 'top',
                                                                            background: 'transparent',
                                                                            fontSize: '13px',
                                                                            width: '10%',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {product.profitPercentage} %
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={7} style={{ textAlign: "center" }}>
                                                                    No data available
                                                                </td>
                                                            </tr>
                                                        )}

                                                        <tr className="total_final rowsHourlySalePDFReportCommonClass">
                                                            <td style={{ width: '15%' }}></td>
                                                            <td style={{ width: '35%' }}></td>
                                                            <td
                                                                id="lbl_GrandTotalQuantity_HourlySalePDFReport_RestaurantReports"
                                                                style={{
                                                                    borderTop: '1px solid #000',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    width: '10%',
                                                                }}
                                                            >
                                                                {pdfReportData?.totalQuantity || 0}
                                                            </td>
                                                            <td
                                                                id="lbl_GrandTotalProductsSaleAmount_HourlySalePDFReport_RestaurantReports"
                                                                style={{
                                                                    borderTop: '1px solid #000',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    width: '10%',
                                                                }}
                                                            >
                                                                {pdfReportData?.totalSaleAmount_StringFormat || '0.00'}
                                                            </td>
                                                            <td
                                                                id="lbl_GrandTotalProductsSalePercentage_HourlySalePDFReport_RestaurantReports"
                                                                style={{
                                                                    borderTop: '1px solid #000',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    width: '10%',
                                                                }}
                                                            >
                                                                {pdfReportData?.totalSalePercentage_StringFormat || '0.00'}
                                                            </td>
                                                            <td
                                                                id="lbl_GrandTotalProductsProfitAmount_HourlySalePDFReport_RestaurantReports"
                                                                style={{
                                                                    borderTop: '1px solid #000',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    width: '10%',
                                                                }}
                                                            >
                                                                {pdfReportData?.totalProfitAmount_StringFormat || '0.00'}
                                                            </td>
                                                            <td
                                                                id="lbl_GrandTotalProductsProfitPercentage_HourlySalePDFReport_RestaurantReports"
                                                                style={{
                                                                    borderTop: '1px solid #000',
                                                                    borderBottom: '1px solid #000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    width: '10%',
                                                                }}
                                                            >
                                                                {pdfReportData?.totalProfitPercentage_StringFormat || '0.00'}
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="hourly_sale2" style={{ display: activeTab === 'hourlySale2' ? 'block' : 'none' }}>
                            <div id="dllFilterGraphOption_BreakfastLunchDinnerReports_ManageReports" className={`dropdown-content dropdownContent_BreakfastLunchDinnerReports ${isOpen ? 'show' : ''}`}>
                                <a id="optFilteration_Weekly_BreakfastLunchDinnerReports" className="optFilterationClass_BreakfastLunchDinnerReports" onClick={() => {
                                    setBldFilterType(1);
                                    setFlag(prevflag => !prevflag);
                                }}>Weekly</a>
                                <a id="optFilteration_Monthly_BreakfastLunchDinnerReports" className="optFilterationClass_BreakfastLunchDinnerReports" onClick={() => {
                                    setBldFilterType(2);
                                    setFlag(prevflag => !prevflag);
                                }}>Monthly</a>
                                <a id="optFilteration_Yearly_BreakfastLunchDinnerReports" className="optFilterationClass_BreakfastLunchDinnerReports" onClick={() => {
                                    setBldFilterType(3);
                                    setFlag(prevflag => !prevflag);
                                }}>Yearly</a>
                                <a id="optFilteration_CustomDates_BreakfastLunchDinnerReports" className="optFilterationClass_BreakfastLunchDinnerReports" onClick={() => setCustomDateModal(true)} >Custom Dates</a>
                            </div>
                            <div className="graph">
                                <div className='value_wraps-etc'>
                                    <div className='row wrap_chart'>
                                        <div className='charts'>
                                            <div className="row">
                                                <div className="col-md-12 col-lg-12" id="lblSelectedFilterOption_BreakfastLunchDinnerReports_ManageReports" style={{ paddingTop: "10px", textAlign: "center", fontSize: "20px" }}>{BDLSalesData?.FilterType_Value}</div>
                                            </div>
                                            <div className="row">
                                                <div className='col-md-6 col-lg-6'>
                                                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                                                </div>
                                                <div className="col-md-6 col-lg-6 product_sales_ManageReports">
                                                    <div id="product_sales" className="tab ">
                                                        <div className="graph">
                                                            <div className="product_sale-bars " style={{ float: "left", width: "93%" }}>
                                                                {/* Breakfast Progress */}
                                                                <div className="wrap_bar-prgress " style={{ marginBottom: "12px" }}>
                                                                    <div className="progress" style={{ marginBottom: "14px" }}>
                                                                        <div
                                                                            id="dv_BreakfastProgress_ManageReports"
                                                                            className="progress-bar orange"
                                                                            style={{
                                                                                width: `${BDLSalesData?.SalePercentage_Breakfast}%`,
                                                                                background: "rgb(87, 83, 190)",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span
                                                                        id="lbl_BreakfastAmount_ManageReports"
                                                                        className="value_progress"
                                                                        style={{ marginTop: "-12px" }}
                                                                    >
                                                                        ${BDLSalesData?.SaleAmount_Breakfast.toFixed(2)}
                                                                    </span>
                                                                </div>

                                                                {/* Lunch Progress */}
                                                                <div className="wrap_bar-prgress " style={{ marginBottom: "9px" }}>
                                                                    <div className="progress" style={{ marginBottom: "14px" }}>
                                                                        <div
                                                                            id="dv_LunchProgress_ManageReports"
                                                                            className="progress-bar orange"
                                                                            style={{
                                                                                width: `${BDLSalesData?.SalePercentage_Lunch}%`,
                                                                                background: "rgb(253, 202, 64)",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span
                                                                        id="lbl_LunchAmount_ManageReports"
                                                                        className="value_progress"
                                                                        style={{ marginTop: "-12px" }}
                                                                    >
                                                                        ${BDLSalesData?.SaleAmount_Lunch.toFixed(2)}
                                                                    </span>
                                                                </div>

                                                                {/* Dinner Progress */}
                                                                <div className="wrap_bar-prgress ">
                                                                    <div className="progress">
                                                                        <div
                                                                            id="dv_DinnerProgress_ManageReports"
                                                                            className="progress-bar orange"
                                                                            style={{
                                                                                width: `${BDLSalesData?.SalePercentage_Dinner}%`,
                                                                                background: "rgb(255, 92, 90)",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span id="lbl_DinnerAmount_ManageReports" className="value_progress">
                                                                        ${BDLSalesData?.SaleAmount_Dinner.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EmailModal />
            {customDateModal && (
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
                                            <button id="btnSubmit_GraphsData_By_CustomDates_ManageReports" type="button" onClick={() => {
                                                setBldFilterType(4);
                                                setFlag(prevflag => !prevflag);
                                            }} className="cstm_model_plusbtn_1 btn btn-danger">Apply</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {dateModal && (
            <div
                    className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity show "
                    style={{ display: "block" }}
                id="CustomDate_HourlySalesGraph_ManageReports_Modal"
                data-backdrop="static"
                data-keyboard="false"
            >
                <div className="modal-dialog cstm_modal_dialog" style={{ marginTop: '100px' }}>
                    <div
                        className="modal-content plus_modal_cont custm_date-wrappopup"
                        style={{ width: '400px' }}
                    >
                        {/* Modal Header */}
                        <div
                            className="modal-header plus_modal_head"
                            style={{
                                display: 'block',
                                paddingBottom: '20px',
                                textAlign: 'center',
                                paddingTop: '0px',
                            }}
                        >
                            <h4 className="modal-title plus_head_popup" style={{ left: '0px' }}>
                                Custom Date
                            </h4>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body new_modal_work">
                            <div className="col-md-12 col-lg-12 col-12">
                                <form>
                                    <div className="dates_wraps">
                                        <div className="form-group w-full block">
                                            <label className="block text-lg font-semibold mb-2">
                                                Select Date
                                            </label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                className="block w-full py-2 px-4 text-base font-normal leading-6 text-gray-700 bg-sky-100 appearance-none border border-gray-300 rounded-md transition-all duration-150 ease-in-out !h-10"
                                                placeholderText=""
                                            />
                                            <div id="date_error_HourlySalesGraph_ManageReports_Modal" className="errorsClass2 mt-1 text-red-500"></div>
                                        </div>
                                    </div>

                                    {/* Modal Bottom Buttons */}
                                    <div className="modal-bottom plus_modal_bottom flex justify-between space-x-4 mt-4">
                                        <button
                                            type="button"
                                            className="cstm_model_plusbtn_1 btn btn-danger py-2 px-6 rounded-md"
                                                onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="cstm_model_plusbtn_1 btn btn-danger py-2 px-6 rounded-md"
                                                onClick={handleCustomDate}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Hourlysale