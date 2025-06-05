import React, { useRef, useState, useEffect } from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import EmailModal from './EmailModal'
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';

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

interface SaleData {
    Row_Num: number;
    ProductId: number;
    ProductName: string;
    TotalQuantity: number;
    SubDepartmentId: number;
    SubDepartmentName: string;
    TotalSale_Amount: number;
    TotalProfit_Amount: number;
    TotalDiscount_Amount: number;
    GST_Included_Amount: number;
    Total_GST_Tax_Amount: number;
    GST_Excluded_Amount: number;
    TotalSale_Amount_StringFormat: string;
    TotalProfit_Amount_StringFormat: string;
    TotalDiscount_Amount_StringFormat: string;
    GST_Included_Amount_StringFormat: string;
    Total_GST_Tax_Amount_StringFormat: string;
    GST_Excluded_Amount_StringFormat: string;
    FilterType_Value: string | null;
    FilterType_Value2: string | null;
    TotalGrossSale_Amount_StringFormat: string;
}
interface DepartmentData {
    SubDepartmentId: number;
    SubDepartmentName: string;
    TotalQuantity_Department: number;
    TotalSale_Amount_Department_StringFormat: string;
    TotalProfit_Amount_Department_StringFormat: string;
    TotalDiscount_Amount_Department_StringFormat: string;
    TotalGST_Included_Amount_Department_StringFormat: string;
    Total_GST_Tax_Amount_Department_StringFormat: string;
    Total_GST_Excluded_Amount_Department_StringFormat: string;
    Total_GrossSale_Amount_Department_StringFormat: string;
    FilterType_Value: string | null;
    FilterType_Value2: string | null;
    sale_data: SaleData[];
}
interface TotalGrossData {
    filterValue: string;
    filterValue2: string;
    grandTotal_Quantity: number;
    grandTotal_SaleAmount_StringFormat: string;
    grandTotal_GST_ExcludedAmount_StringFormat: string;
    grandTotal_GST_TaxAmount_StringFormat: string;
    grandTotal_GST_IncludedAmount_StringFormat: string;
    grandTotal_DiscountAmount_StringFormat: string;
    grandTotal_GrossSale_StringFormat: string;
}

interface SalesDataState {
    salesData_ProductSales_PDFReport: DepartmentData[];
}

interface GraphData {
    Id: number;
    Name: string;
    ProductData: number;
    Total_Percentage: number;
    FilterType_Value: string;
}
interface formData {
    filterProductSalesMaxRecords: number;
    filterProductSalesType: string;
    fromDate: string;
    graphFilterDurationType: string;
    productFilterType: string;
    restaurantLoginId: 0;
    toDate: string;
}

interface productList {
    Id: number;
    Name: string;
    ProductTypeId: number;
}

interface FilterData {
    filterationType: string;
    productId: number;
    productTypeId: number;
    restaurantLoginId: number;
}

interface SalesDataBarGraph {
    currentWeekValue: string;
    lastWeekValue: string;
    dayNamesList: string[];
    salesData_CurrentWeek: number[];
    salesData_LastWeek: number[];
    totalSales_CurrentWeek: number;
    totalSales_CurrentWeek_ChangePercentage: number;
    totalSales_LastWeek: number;
}

const Product = () => {
    const [activeTab, setActiveTab] = useState<string>('product_sales');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dateModal, setDateModal] = useState<boolean>(false);
    const [graphData, setGraphData] = useState<GraphData[]>([]);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [salesData, setSalesData] = useState<SalesDataState[] | null>([]);
    const [totalGrossData, setTotalGross] = useState<TotalGrossData | null>(null);
    const [isproductModal, setIsProductModal] = useState<boolean>(false);
    const [productList, setProductList] = useState<productList[]>([]);
    const [options, setOptions] = useState<any>(null);
    const [salesDataBarGraph, setSalesDataBarGraph] = useState<SalesDataBarGraph>([])
    const [formData, setFormData] = useState<formData>({
        filterProductSalesMaxRecords: 20,
        filterProductSalesType: "top",
        fromDate: "",
        graphFilterDurationType: "Weekly",
        productFilterType: "amount",
        restaurantLoginId: 0,
        toDate: ""
    });

    const [filterData, setFilterData] = useState<FilterData>({
        filterationType: 'Weekly',
        productId: 8,
        productTypeId: 2,
        restaurantLoginId: 0
    });


    const toggleDropdown = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
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

    const getProductsData = async () => {
        const token = localStorage.getItem("authToken");
        const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/reports/graph/filter/product`;
        try {

            setLoading(true);
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                const data = response.data.data;
                setTotalGross({
                    filterValue: data.filterValue,
                    filterValue2: data.filterValue2,
                    grandTotal_Quantity: data.grandTotal_Quantity,
                    grandTotal_SaleAmount_StringFormat: data.grandTotal_SaleAmount_StringFormat,
                    grandTotal_GST_ExcludedAmount_StringFormat: data.grandTotal_GST_ExcludedAmount_StringFormat,
                    grandTotal_GST_TaxAmount_StringFormat: data.grandTotal_GST_TaxAmount_StringFormat,
                    grandTotal_GST_IncludedAmount_StringFormat: data.grandTotal_GST_IncludedAmount_StringFormat,
                    grandTotal_DiscountAmount_StringFormat: data.grandTotal_DiscountAmount_StringFormat,
                    grandTotal_GrossSale_StringFormat: data.grandTotal_GrossSale_StringFormat,
                });
                if (response.data.data.salesData_ProductSalesGraph) {
                    const graphData = response.data.data.salesData_ProductSalesGraph;
                    setGraphData(graphData);
                }
                if (response.data.data.salesData_ProductSales_PDFReport) {
                    const pdfReport = response.data.data.salesData_ProductSales_PDFReport;
                    setSalesData(pdfReport);
                }

            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message,
                })
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Unauthorized! Invalid Token!',
                        });

                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: 'There is some technical error, please try again!'
                        });
                    }
                }
            }
        }
        finally {
            setLoading(false);
            setIsOpen(false);
            setDateModal(false);
        }
    }

    const productData = async () => {
        const token = localStorage.getItem("authToken");
        const apiUrl = `${import.meta.env.VITE_API_URL}api/all/product/list?restaurantLoginId=0`
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                const data = response.data.data.products;
                setProductList(
                    data.map((item: any) => ({
                        Name: item.Name,
                        Id: item.Id,
                        ProductTypeId: item.ProductTypeId,
                    }))
                );
            }

        } catch (error) {

        }
    }

    const handleProductModal = () => {
        setIsProductModal(true);
        productData();
    };

    const handleCloseModal = () => {
        // setFilterData({ ...filterData, productId: 0 });
        setIsProductModal(false);
    };

    const handleEmailModalOpen = () => {
        const emailModalButton = document.getElementById("btn_SendPDFReportEmail_RestaurantReports_Modal") as HTMLButtonElement;
        emailModalButton?.click();
    };

    const handleProductSubmit = async () => {

        const token = localStorage.getItem("authToken");
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/productforecast`;

        try {
            setLoading(true);
            const dataGraph = await axios.post(apiUrl, filterData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (dataGraph.status === 200 && dataGraph.data.status === 1) {
                if (dataGraph.data.data) {
                    let productName = dataGraph.data.data.productName;
                    let categories_list = [];
                    let current_value = '';
                    let previous_value = '';
                    let data_current = [];
                    let data_previous = [];

                    if (dataGraph.data.data.salesData_BarGraph) {
                        if (dataGraph.data.data.filterType === "Weekly") {
                            categories_list = dataGraph.data.data.salesData_BarGraph.dayNamesList;
                            current_value = dataGraph.data.data.salesData_BarGraph.currentWeekValue;
                            previous_value = dataGraph.data.data.salesData_BarGraph.lastWeekValue;
                            data_current = dataGraph.data.data.salesData_BarGraph.salesData_CurrentWeek;
                            data_previous = dataGraph.data.data.salesData_BarGraph.salesData_LastWeek;

                        } else if (dataGraph.data.data.filterType === "Monthly") {
                            categories_list = dataGraph.data.data.salesData_BarGraph.dayNamesList;
                            current_value = dataGraph.data.data.salesData_BarGraph.currentMonthValue;
                            previous_value = dataGraph.data.data.salesData_BarGraph.lastMonthValue;
                            data_current = dataGraph.data.data.salesData_BarGraph.salesData_CurrentMonth;
                            data_previous = dataGraph.data.data.salesData_BarGraph.salesData_LastMonth;
                        } else if (dataGraph.data.data.filterType === "Yearly") {
                            categories_list = dataGraph.data.data.salesData_BarGraph.monthNamesList;
                            current_value = `Current-Year (${dataGraph.data.data.salesData_BarGraph.currentYearValue})`;
                            previous_value = `Last-Year (${dataGraph.data.data.salesData_BarGraph.lastYearValue})`;
                            data_current = dataGraph.data.data.salesData_BarGraph.salesData_CurrentYear;
                            data_previous = dataGraph.data.data.salesData_BarGraph.salesData_LastYear;
                        }
                    }
                    setOptions({
                        chart: {
                            type: 'area',
                        },
                        title: {
                            text: productName,
                        },
                        colors: ['#8098fb', '#f8b4bc'],
                        xAxis: {
                            categories: categories_list,
                        },
                        yAxis: {
                            labels: {
                                format: '{value}',
                                style: {
                                    color: "#8098fb",
                                },
                            },
                            title: {
                                text: 'Income',
                                style: {
                                    color: "#8098fb",
                                },
                        },
                        },
                        tooltip: {
                            shared: true,
                        },
                        series: [
                            {
                                name: current_value,
                                data: data_current,
                                tooltip: {
                                    valuePrefix: '$',
                                },
                            },
                            {
                                name: previous_value,
                                data: data_previous,
                                tooltip: {
                                    valuePrefix: '$',
                                },
                            },
                        ],
                    });
                }
            }


        } catch (error) {

        }
        finally {
            handleCloseModal();
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductsData();
        handleProductSubmit();
        console.log("salesData:", salesData);
    }, [formData, filterData.filterationType]);
    return (
        <>
            <div className="cgt-desc">
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
                {activeTab === 'product_sales' && (
                    <div id="FieldsSection_ProductSalesGraph_ManageReports" className="select_warppers">
                        <div className="select_warps-box">
                            <div className="select_box">
                                <select
                                    className="form-control"
                                    id="productSalesType_ProductSalesRecordsFilter"
                                    value={formData.filterProductSalesType}
                                    onChange={(e) => setFormData({ ...formData, filterProductSalesType: e.target.value })}
                                >
                                    <option value="top">Top</option>
                                    <option value="worst">Worst</option>
                                </select>
                            </div>

                            <div className="select_box">
                                <select
                                    className="form-control"
                                    id="maxRecords_ProductSalesRecordsFilter"
                                    value={formData.filterProductSalesMaxRecords}
                                    onChange={(e) => setFormData({ ...formData, filterProductSalesMaxRecords: Number(e.target.value) })}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>)}
                <div className="tabs_wraps-div">
                    <ul className="tabs clearfix">
                        <li>
                            <a id="tab_ProductSalesReport_ManageRestaurantReports" onClick={() => setActiveTab('product_sales')} className={`FinancialReportDataClassCommon ${activeTab === 'product_sales' ? 'active' : ''}`} >
                                PRODUCT SALES
                            </a>
                        </li>
                        <li>
                            <a id="tab_ProductForecastReport_ManageRestaurantReports" onClick={() => setActiveTab('product_forecast')} className={`FinancialReportDataClassCommon ${activeTab === 'product_forecast' ? 'active' : ''}`}>
                                PRODUCT SALES COMPARISON
                            </a>
                        </li>
                    </ul>
                    <span id="FilterOptionsMenu_ProductSalesReport" className="dropbtn FilterOptionsMenuCommonClass Vector_horizental" onClick={toggleDropdown} style={{ background: "rgb(246, 248, 252)", marginTop: activeTab === 'product_sales' ? "61px" : "" }} >
                        <img src="/Content/Restaurant/icons/Vector_horizental.png" alt="icon" className="dropbtn vertical-menus" />
                    </span>
                </div>
                <div
                    id="productSales_graphFilter"
                    className={`dropdown-content dropdownContent_ProductSalestReports ${isOpen ? 'show' : ''}`}
                    style={{ zIndex: 100 }}
                >
                    <a data-value="1" onClick={() => { activeTab === 'product_sales' ? setFormData({ ...formData, graphFilterDurationType: 'Weekly' }) : setFilterData({ ...filterData, filterationType: 'Weekly' }) }}>
                        Weekly
                    </a>
                    <a data-value="2" onClick={() => { activeTab === 'product_sales' ? setFormData({ ...formData, graphFilterDurationType: 'Monthly' }) : setFilterData({ ...filterData, filterationType: 'Monthly' }) }}>
                        Monthly
                    </a>
                    <a data-value="3" onClick={() => { activeTab === 'product_sales' ? setFormData({ ...formData, graphFilterDurationType: 'Yearly' }) : setFilterData({ ...filterData, filterationType: 'Yearly' }) }}>
                        Yearly
                    </a>
                    {activeTab === 'product_sales' && (<a data-value="4" onClick={openCustomDateModal}>
                        Custom date
                    </a>)}

                </div>
                <div className="cgt-content">
                    <div id="product_sales" className={`tab ${activeTab === 'product_sales' ? 'a' : ''}`} style={{ display: activeTab === 'product_sales' ? 'block' : 'none' }}>
                        <div className="graph">
                            <div className="set-graph px-0">
                                <div
                                    id="lblSelectedFilterOption_ProductSaleReports_ManageReports"
                                    className="lblHeading_HourlySales_Style"
                                >
                                    {graphData.length > 0 ? graphData[graphData.length - 1].FilterType_Value : "No Filter Applied"}
                                </div>                                <div id="dv_ProductSalesGraphData_Section_ManageReports" className="product_sale-bars">
                                    {/* Example product sale progress bars */}

                                    {graphData?.map((item) => (
                                        <div className="wrap_bar-prgress flex flex-col sm:flex-row">
                                            <p>{item.Name}</p>
                                            <div className="progress mx-auto sm:ml-[30px] w-full sm:w-[66%]">
                                                <div
                                                    className="progress-bar orange"
                                                    style={{ backgroundColor: '#5751BD', width: `${item.Total_Percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="value-progress">${item.ProductData.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="amount_quantity-wraps">
                                <div className="select_box">
                                    <select className="form-control" id="amount_quanitity"
                                        value={formData.productFilterType}
                                        onChange={(e) => setFormData({ ...formData, productFilterType: e.target.value })}
                                    >
                                        <option value="amount">BY AMOUNT</option>
                                        <option value="quantity">BY QUANTITY</option>
                                        <option value="profit">BY PROFIT</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <hr className="space_wraps"></hr>
                        <div className="pdf_reports">
                            <div className="wrap_pdf">
                                <p
                                    id="link_Send_ProductSaleReportPDF"
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
                                            color: '#555'
                                        }}
                                    >
                                        <h3 style={{ textAlign: 'center', color: '#5651BD', fontStyle: 'italic' }}>
                                            Stock Item Sales Report
                                        </h3>
                                        <p id="lblFilterValue_ProductSales_PDFReport_RestaurantReports" style={{ textAlign: 'center' }}>
                                            {totalGrossData?.filterValue2}
                                        </p>
                                        <div className="table-responsive">
                                            <div className="sales_wrap_profits" style={{ textAlign: 'right' }}>
                                                <span
                                                    style={{
                                                        borderBottom: '2px solid #000',
                                                        padding: '0px 200px',
                                                        fontWeight: 'bold',
                                                        fontSize: '13px'
                                                    }}
                                                >
                                                    Sales
                                                </span>
                                            </div>
                                            <table
                                                id="tblProductSales_PDFReport_RestaurantReports"
                                                // cellpadding="0"
                                                // cellspacing="0"
                                                style={{
                                                    width: '100%',
                                                    lineHeight: 'inherit',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <thead>
                                                    <tr className="heading">
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '4%' }}></td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '45%' }}></td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '3%', textAlign: 'center' }}></td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '3%', textAlign: 'center' }}></td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '8%', textAlign: 'center' }}>Quantity</td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '10%', textAlign: 'center' }}>Nett ex</td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '6%', textAlign: 'center' }}>Tax</td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '7%', textAlign: 'center' }}>Nett inc</td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '7%', textAlign: 'center' }}>Discounts</td>
                                                        <td style={{ background: 'transparent', borderBottom: '1px solid #000', fontWeight: 'bold', padding: '5px', verticalAlign: 'top', fontSize: '12px', color: '#000', width: '7%', textAlign: 'center' }}>Gross inc</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salesData?.map((item, index) => (
                                                        <React.Fragment key={`subDepartment-${index}`}>
                                                            <tr className="item_heading rowsProductSalesPDFReportCommonClass">
                                                                <td
                                                                    colSpan={10}
                                                                    style={{
                                                                        fontWeight: "bold",
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                    }}
                                                                >
                                                                    {item.SubDepartmentName}
                                                                </td>
                                                            </tr>
                                                            {item.sale_data?.map((listData: any, subIndex: number) => (
                                                                <tr
                                                                    className="details rowsProductSalesPDFReportCommonClass"
                                                                    key={`saleData-${index}-${subIndex}`}
                                                                >
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "4%",
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #000",
                                                                            width: "38%",
                                                                        }}
                                                                    >
                                                                        {listData.ProductName}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "3%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "3%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    ></td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "8%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.TotalQuantity}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "10%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.GST_Excluded_Amount_StringFormat}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "6%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.Total_GST_Tax_Amount_StringFormat}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "7%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.GST_Included_Amount_StringFormat}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "7%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.TotalDiscount_Amount_StringFormat}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: "#000",
                                                                            padding: "5px",
                                                                            verticalAlign: "top",
                                                                            fontSize: "13px",
                                                                            borderBottom: "1px solid #808080b5",
                                                                            width: "7%",
                                                                            textAlign: "center",
                                                                        }}
                                                                    >
                                                                        {listData.TotalGrossSale_Amount_StringFormat}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr className="total_final stock_item_sale rowsProductSalesPDFReportCommonClass">
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "1px solid #808080b5",
                                                                        width: "4%",
                                                                    }}
                                                                ></td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "1px solid #808080b5",
                                                                        width: "45%",
                                                                    }}
                                                                ></td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "1px solid #808080b5",
                                                                        width: "45%",
                                                                    }}
                                                                ></td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "1px solid #808080b5",
                                                                        width: "3%",
                                                                    }}
                                                                ></td>
                                                                {/* Add specific columns with dynamic data */}
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "8%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.TotalQuantity_Department}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "10%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.Total_GST_Excluded_Amount_Department_StringFormat}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "6%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.Total_GST_Tax_Amount_Department_StringFormat}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "7%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.TotalGST_Included_Amount_Department_StringFormat}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "7%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.TotalDiscount_Amount_Department_StringFormat}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        color: "#000",
                                                                        padding: "5px",
                                                                        verticalAlign: "top",
                                                                        fontSize: "13px",
                                                                        borderBottom: "2px solid #000 !important",
                                                                        borderTop: "2px solid #000 !important",
                                                                        fontWeight: "bold",
                                                                        width: "7%",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    {item.Total_GrossSale_Amount_Department_StringFormat}
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ))}
                                                    <tr className="total_final stock_item_sale rowsProductSalesPDFReportCommonClass">
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "1px solid #808080b5",
                                                                width: "4%",
                                                            }}
                                                        ></td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "1px solid #808080b5",
                                                                width: "45%",
                                                            }}
                                                        ></td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "1px solid #808080b5",
                                                                width: "45%",
                                                            }}
                                                        ></td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "1px solid #808080b5",
                                                                width: "3%",
                                                            }}
                                                        ></td>
                                                        {/* Add specific columns with dynamic data */}
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "8%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_Quantity}
                                                        </td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "10%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_GST_ExcludedAmount_StringFormat}
                                                        </td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "6%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_GST_TaxAmount_StringFormat}
                                                        </td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "7%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_GST_IncludedAmount_StringFormat}
                                                        </td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "7%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_DiscountAmount_StringFormat}
                                                        </td>
                                                        <td
                                                            style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                                verticalAlign: "top",
                                                                fontSize: "13px",
                                                                borderBottom: "2px solid #000 !important",
                                                                borderTop: "2px solid #000 !important",
                                                                fontWeight: "bold",
                                                                width: "7%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {totalGrossData?.grandTotal_GrossSale_StringFormat}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="dv_Download_ProductSalesReport_Section" className="text-center" style={{ padding: '20px' }}>
                                    <form action="/Reports/Download_ProductSales_ReportasPDF" method="post">
                                        {/* Hidden input to hold the report HTML content */}
                                        <input type="hidden" name="hdn_ProductSalesReport_Html" />

                                        {/* Button to trigger the form submission */}
                                        <button type="submit" id="btnDownload_ProductSalesReportPDF_RestaurantReports" className="btn btn-info btn_print">
                                            PDF Download
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="product_forecast" className={`tab ${activeTab === 'product_forecast' ? 'a' : ''}`} style={{ display: activeTab === 'product_forecast' ? 'block' : 'none' }}>
                        <div className="row selectProductForForecast">
                            <div className="col-md-6 col-lg-6 col-sm-12 col-12">

                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12 col-12 ProductSelection">
                                <a style={{ cursor: "pointer" }}
                                    onClick={handleProductModal}>
                                    Select Product Here
                                </a>
                            </div>
                        </div>

                        <div className="graph">
                            <div className="highcharts-a11y-proxy-group highcharts-a11y-proxy-group-chartMenu">
                                <button
                                    className="highcharts-a11y-proxy-element highcharts-no-tooltip"
                                    aria-label="View chart menu, Lichi Juice"
                                    aria-expanded="false"
                                    title="Chart context menu"
                                    style={{
                                        borderWidth: '0px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        opacity: '0.001',
                                        zIndex: 999,
                                        overflow: 'hidden',
                                        padding: '0px',
                                        margin: '0px',
                                        display: 'block',
                                        position: 'absolute',
                                        width: '28px',
                                        height: '28px',
                                        left: '956px',
                                        top: '11px',
                                    }}
                                ></button>
                                <HighchartsReact highcharts={Highcharts} options={options} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <button id="btn_SelectProduct_ProductForecast_ManageReports_Modal" type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#SelectProduct_ProductForecast_ManageReports_Modal" style={{ display: "none" }}></button>

            <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity show" id="SelectProduct_ProductForecast_ManageReports_Modal" data-backdrop="static" data-keyboard="false" style={{ display: isproductModal ? 'block' : 'none' }}>
                <div className="modal-dialog cstm_modal_dialog" style={{ marginTop: '135px!important' }}>
                    <div className="modal-content plus_modal_cont">

                        {/* Modal Header */}
                        <div className="modal-header plus_modal_head" style={{ display: 'block', paddingBottom: '0px', textAlign: 'center' }}>
                            <h4 className="modal-title plus_head_popup" style={{ left: '0px' }}>
                                Select Product
                            </h4>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body new_modal_work">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <ul id="ul_ProductListSection_ProductForecast" className="list-group productSelectionList_ProductForecast">
                                        {productList?.map((item) => (
                                            <li key={item.Id}
                                                id={`lblProduct_ProductForecast_ManageReports_${item.Id}`}
                                                className={`list-group-item ProListProductForecastClassCommon ${filterData.productId === item.Id ? 'active' : ''}`}
                                                onClick={() => {
                                                    setFilterData({
                                                        ...filterData,
                                                        productId: item.Id,
                                                        productTypeId: item.ProductTypeId
                                                    })
                                                }}
                                            >
                                                {item.Name}
                                            </li> 
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Modal Bottom */}
                            <div className="modal-bottom plus_modal_bottom">
                                <button id="btnCancel_ProductForecast_ManageReports_Modal" type="button" className="cstm_model_plusbtn_1 btn btn-danger" data-dismiss="modal" style={{ display: 'none' }}></button>
                                <button type="button" className="cstm_model_plusbtn_1 btn btn-danger" onClick={() => handleCloseModal()}>
                                    Cancel
                                </button>
                                <button id="btnSubmit_ProductForecast_ManageReports_Modal" type="button" onClick={handleProductSubmit} className="cstm_model_plusbtn_1 btn btn-success">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dateModal && (
                <div
                    className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity show"
                    id="CustomDates_Selection_ManageReports_Modal"
                    style={{ display: "block", paddingRight: "17px" }}
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog cstm_modal_dialog">
                        <div className="modal-content plus_modal_cont custm_date-wrappopup">
                            {/* Modal Header */}
                            <div
                                className="modal-header plus_modal_head"
                                style={{
                                    display: "block",
                                    paddingBottom: "30px",
                                    textAlign: "center",
                                    paddingTop: "0px",
                                }}
                            >
                                <h4
                                    className="modal-title plus_head_popup"
                                    style={{ left: "0px" }}
                                >
                                    Custom Date
                                </h4>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body new_modal_work show">
                                <div className="col-md-12 col-lg-12 col-12 p-0">
                                    <form>
                                        <div className="dates_wraps">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <div
                                                        className="form-group text_wrap-datepicker"
                                                        style={{ marginBottom: "5px" }}
                                                    >
                                                        <label style={{ width: "auto", marginRight: "8px" }}>
                                                            From
                                                        </label>
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
                                                    <div
                                                        className="form-group text_wrap-datepicker"
                                                        style={{ marginBottom: "5px" }}
                                                    >
                                                        <label style={{ width: "auto", marginRight: "8px" }}>
                                                            To
                                                        </label>
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
                                                    <div
                                                        id="fromDate_error_CustomDatesSelection_ManageReports_Modal"
                                                        className="errorsClass2"
                                                        style={{ paddingLeft: "55px" }}
                                                    ></div>
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <div
                                                        id="toDate_error_CustomDatesSelection_ManageReports_Modal"
                                                        className="errorsClass2"
                                                        style={{ paddingLeft: "32px" }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="modal-bottom plus_modal_bottom"
                                            style={{
                                                paddingBottom: "0px",
                                                paddingTop: "25px",
                                            }}
                                        >
                                            <button
                                                id="btnCancel_CustomDatesSelection_ManageReports_Modal"
                                                type="button"
                                                className="cstm_model_plusbtn_1 btn btn-danger"
                                                onClick={() => setDateModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                id="btnSubmit_GraphsData_By_CustomDates_ManageReports"
                                                type="button"
                                                className="cstm_model_plusbtn_1 btn btn-danger"
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
            <EmailModal />
        </>
    )
}

export default Product