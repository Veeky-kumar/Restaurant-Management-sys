import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const IncomeLineChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('weekly');
  const [salesData, setSalesData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);

  const handleDropdownSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  // Function to call the API
  const GetFinancialReportDataOfRestaurant = async (_val_FilterationType: number) => {
    setLoading(true);

    const filterType = _val_FilterationType === 1 ? 'Weekly' : _val_FilterationType === 2 ? 'Monthly' : 'Yearly';

    const _Params = {
      restaurantLoginId: 'RestaurantLoginId_Global',
      filterationType: filterType,
      reportTypeId: 1,
    };

    try {
      const token = localStorage.getItem("authToken");

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/financialreport`;
      const response = await axios.post(apiUrl, _Params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const dataFinancialReportGraph = response.data;

      if (dataFinancialReportGraph.status === 1 && dataFinancialReportGraph.data) {
        setLoading(false);
        const salesData = dataFinancialReportGraph.data.salesData_BarGraph;
        if (salesData) {
          setSalesData(salesData);
        }
      } else {
        Swal.fire({
          title: '',
          imageUrl: '/Content/svg/error.svg',
          text: dataFinancialReportGraph.message,
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: '',
        imageUrl: '/Content/svg/error.svg',
        text: 'There was an error fetching the data. Please try again.',
      });
    }
  };

  const bindGraph_RestaurantIncomeCard = (salesData_BarGraph: any) => {
    let filterType = selectedPeriod;
    let xAxis_CategoriesList = [];
    let yAxis_series1_Data = [];
    let yAxis_series1_Name = "";
    let yAxis_series2_Data = [];
    let yAxis_series2_Name = "";

    if (filterType === 'weekly') {
      xAxis_CategoriesList = salesData_BarGraph.dayNamesList;
      yAxis_series1_Data = salesData_BarGraph.salesData_CurrentWeek;
      yAxis_series1_Name = 'Current-Week';
      yAxis_series2_Data = salesData_BarGraph.salesData_LastWeek;
      yAxis_series2_Name = 'Last-Week';
    } else if (filterType === 'monthly') {
      xAxis_CategoriesList = salesData_BarGraph.monthNamesList || [];
      yAxis_series1_Data = salesData_BarGraph.salesData_CurrentMonth;
      yAxis_series1_Name = `Current-Month (${salesData_BarGraph.currentMonthValue})`;
      yAxis_series2_Data = salesData_BarGraph.salesData_LastMonth;
      yAxis_series2_Name = `Last-Month (${salesData_BarGraph.lastMonthValue})`;
    } else {
      xAxis_CategoriesList = salesData_BarGraph.yearNamesList || [];
      yAxis_series1_Data = salesData_BarGraph.salesData_CurrentYear;
      yAxis_series1_Name = `Current-Year (${salesData_BarGraph.currentYearValue})`;
      yAxis_series2_Data = salesData_BarGraph.salesData_LastYear;
      yAxis_series2_Name = `Last-Year (${salesData_BarGraph.lastYearValue})`;
    }

    const options: Highcharts.Options = {
      chart: {
        type: 'line',
        height: 195,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: xAxis_CategoriesList,
      },
      yAxis: {
        title: {
          text: 'Amount ($)',
        },
      },
      series: [
        {
          name: yAxis_series1_Name,
          data: yAxis_series1_Data,
          tooltip: {
            valuePrefix: '$',
          },
        },
        {
          name: yAxis_series2_Name,
          type: 'spline',
          data: yAxis_series2_Data,
          tooltip: {
            valuePrefix: '$',
          },
        },
      ] as Highcharts.SeriesOptionsType[],
    };

    setChartOptions(options);
  };

  useEffect(() => {
    GetFinancialReportDataOfRestaurant(selectedPeriod === 'weekly' ? 1 : selectedPeriod === 'monthly' ? 2 : 3);

  }, [selectedPeriod]);

  useEffect(() => {
    if (salesData) {
      bindGraph_RestaurantIncomeCard(salesData);
    }
  }, [salesData]);

  return (
    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-sm-12">
      {/* Loader */}
      {loading && (
        <div
          className="LoaderDiv_DashboardRestaurantCommonClass"
          style={{
            opacity: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2147483647,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 999999999999999,
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="../../Content/Images/Loader.gif"
              style={{ backgroundColor: "#ffffff", width: "50px" }}
              alt="Loading..."
            />
          </div>
        </div>
      )}

      {/* Graph Income */}
      <div className="wraps_dashbords graphss h-auto" style={{ height: '' }}>
        <div className="d-flex flex-column gap-2 my-1 pb-1" style={{ height: '' }}>
          <div className="pl-2  income-bx">
            Income
            <Dropdown className="btn-group btn-group1 wrap_dropsdowns" style={{ zIndex: 2 }}>
              <Dropdown.Toggle variant="secondary" id="incomeLineChart_graphfilter" className="dropdown-toggle">
                <span className="selected-text">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item eventKey="yearly" onClick={() => handleDropdownSelect('yearly')} active={selectedPeriod === 'yearly'}>
                  Yearly
                </Dropdown.Item>
                <Dropdown.Item eventKey="monthly" onClick={() => handleDropdownSelect('monthly')} active={selectedPeriod === 'monthly'}>
                  Monthly
                </Dropdown.Item>
                <Dropdown.Item eventKey="weekly" onClick={() => handleDropdownSelect('weekly')} active={selectedPeriod === 'weekly'}>
                  Weekly
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div id="income_data_incomeLineChart" className="text-right mr-5 my-1 ">
            {/* Dynamic Income and Change Percentage */}
            <span id="income_value_incomeLineChart">${salesData?.totalSales_CurrentWeek || 0}</span>
            <span id="income_change_percentage_incomeLineChart" className="text-red-custom">
              {salesData?.totalSales_CurrentWeek_ChangePercentage}%
              <span className="material-symbols-outlined" style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                arrow_downward
              </span>
            </span>
          </div>
          <div id="graph_income_dashboard" style={{ width: '100%', height: '195px', overflow: 'hidden' }}>
            {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeLineChart;
