import React, { useState, useEffect } from 'react';
import Highcharts, { Options, SeriesPieOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

type ChartDataItem = {
  name: string;
  y: number;
  totalAmount: number;
};

type ChartData = {
  title: string;
  data: ChartDataItem[];
};

type TransactionPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

const chartDataForTransactionPeriod: Record<TransactionPeriod, ChartData> = {
  daily: {
    title: 'Daily ',
    data: [],
  },
  weekly: {
    title: 'Weekly ',
    data: [],
  },
  monthly: {
    title: 'Monthly ',
    data: [],
  },
  yearly: {
    title: 'Yearly ',
    data: [],
  },
};

const TransactionPieChartComponent: React.FC = () => {
  const [selectedTransactionPeriod, setSelectedTransactionPeriod] = useState<TransactionPeriod>('weekly');
  const [isTransactionChartLoading, setIsTransactionChartLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const fetchTransactionData = async (period: TransactionPeriod) => {
    setIsTransactionChartLoading(true);
    const filterType = period.charAt(0).toUpperCase() + period.slice(1);
    const params = {
      restaurantLoginId: 0,
      graphFilterDurationType: filterType,
    };

    try {
      const token = localStorage.getItem("authToken");

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/dashboard/graph/filter/paymenttransactions`;

      const response = await axios.post(apiUrl, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      );

      if (response.data.status === 1) {
        const salesData = response.data.data.salesData_TransactionsGraph;

        if (salesData && salesData.length > 0) {
          const formattedData = salesData.map((item: any) => ({
            name: item.PaymentTypeName,
            y: item.Total_Percentage,
            totalAmount: item.Orders_TotalAmount,
          }));

          setChartData(formattedData);
        }
      } else {
        Swal.fire({
          title: '',
          imageUrl: '/Content/svg/error.svg',
          text: response.data.message,
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: '',
        imageUrl: '/Content/svg/error.svg',
        text: 'There was an error fetching the data. Please try again.',
        icon: 'error',
      });
    } finally {
      setIsTransactionChartLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionData(selectedTransactionPeriod);
  }, [selectedTransactionPeriod]);

  const handleTransactionDropdownSelect = (selectedPeriod: TransactionPeriod) => {
    setSelectedTransactionPeriod(selectedPeriod);
  };

  const transactionChartOptions: Options = {
    chart: {
      type: 'pie',
      height: 240,
    },
    title: {
      text: chartDataForTransactionPeriod[selectedTransactionPeriod].title,
    },
    series: [
      {
        type: 'pie',
        name: 'Transactions',
        colorByPoint: true,
        data: chartData,
      } as SeriesPieOptions,
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function () {
        return `<b>${this.name}</b>: ${this.y}% [$${this.totalAmount}]`;
      },
    },
    plotOptions: {
      pie: {
        size: 100,
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
    },
    legend: {
      enabled: true,
      symbolWidth: 16,
      symbolRadius: 0,
      squareSymbol: true,
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 10,
      useHTML: true,
      labelFormatter: function () {
        return `<div><span style="width:1px;display:flex;">${this.y}% ($${this.totalAmount})</span><span>${this.name}</span></div>`;
      },
      borderWidth: null,
    },
  };

  return (
    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-12">
      {isTransactionChartLoading && (
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

      <div className="wraps_dashbords graph_wrapsproduts" style={{ padding: '12px' }}>
        <div className="btn-group btn-group1 wrap_dropsdowns" style={{ zIndex: 4 }}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="transaction_graphfilter">
              <span className="selected-text">
                {selectedTransactionPeriod.charAt(0).toUpperCase() + selectedTransactionPeriod.slice(1)}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {(['daily', 'weekly', 'monthly', 'yearly'] as TransactionPeriod[]).map((period) => (
                <Dropdown.Item
                  key={period}
                  eventKey={period}
                  onClick={() => handleTransactionDropdownSelect(period)}
                  active={selectedTransactionPeriod === period}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="d-flex flex-column" style={{ height: '100%' }}>
          <div className="p-0" style={{ height: '26px' }}>
            <h3 className="graph_heading">Transactions</h3>
          </div>
          <div id="graph_transactions_card_Dashboard" style={{ minWidth: '100%', height: '240px' }}>
            <HighchartsReact highcharts={Highcharts} options={transactionChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPieChartComponent;
