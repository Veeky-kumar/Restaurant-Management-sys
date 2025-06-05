import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

interface ChartData {
  name: string;
  y: number;
  totalAmount: number;
}

const SaleByDeviceTypeChart: React.FC = () => {
  const [selectedTransactionPeriod, setSelectedTransactionPeriod] =
    useState<string>("daily");
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleDropdownSelect = (value: string) => {
    setSelectedTransactionPeriod(value);
  };


  const getDeviceSales = async () => {
    const token = localStorage.getItem("authToken");

    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/sale/by/service/device`;

      const requestData = {
        restaurantLoginId: 0,
        graphFilterDurationType: selectedTransactionPeriod,
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const salesData = response.data.data.salesData;

        const graphData: ChartData[] = [];
        for (let i = 0; i < salesData.serviceTypeList.length; i++) {
          graphData.push({
            name: salesData.serviceTypeList[i],
            y: salesData.DeviceTotalPercentagelist[i] ?? 80,
            totalAmount: salesData.deviceSalesData[i] ?? 20,
          });
        }
        // const graphData: ChartData[] = [
        //   { name: "POS", y: 80, totalAmount: 1000 },
        //   { name: "KIOSK", y: 20, totalAmount: 350 },
        // ];


        setChartData(graphData);
      } else {
        console.log("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error fetching device sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeviceSales();

  }, [selectedTransactionPeriod])

  const chartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      // text: "Sale By Device Type",
      text: "",
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<b>{point.name}:</b> {point.y}%<br><b>Total Amount:</b> ${point.totalAmount}',
    },
    plotOptions: {
      pie: {
        size: 150,
        innerSize: "50%",
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
      labelFormatter: function () {
        return '<div><span style="width:1px;display:flex;">' +
          this.y + '% (<b>$' + this.totalAmount + '</b>)' +
          '</span><span>' +
          '<span title="' + '(' + this.y + '%' + ') ' + this.name +
          '" style="max-width:180px;min-width:125px;display:block;word-wrap: break-word;white-space: normal;letter-spacing: 0.5px;">' +
          this.name + '</span>' +
          '</span></div>';
      },
    },
    series: [
      {
        name: "Device Sales",
        data: chartData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 260,
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: '12px',
                },
              },
            },
          },
        },
      ],
    },
  };

  return (

    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-12">
      {loading &&
        (<div
          className="LoaderDiv_DashboardRestaurantCommonClass"
        id="LoaderDiv_DashboardRestaurant_4"
        style={{
          opacity: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2147483647,
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999999999999999,
            opacity: 0.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="../../Content/Images/Loader.gif" alt="loading" style={{ width: '50px' }} />
        </div>
      </div>
        )}
      {/* Dropdown for time periods */}
      <div className="btn-group btn-group1 wrap_dropsdowns" style={{ zIndex: 4 }}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="transaction_graphfilter">
            <span className="selected-text">
              {selectedTransactionPeriod.charAt(0).toUpperCase() +
                selectedTransactionPeriod.slice(1)}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="daily"
              onClick={() => handleDropdownSelect("daily")}
              active={selectedTransactionPeriod === "daily"}
            >
              Daily
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="weekly"
              onClick={() => handleDropdownSelect("weekly")}
              active={selectedTransactionPeriod === "weekly"}
            >
              Weekly
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="monthly"
              onClick={() => handleDropdownSelect("monthly")}
              active={selectedTransactionPeriod === "monthly"}
            >
              Monthly
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="yearly"
              onClick={() => handleDropdownSelect("yearly")}
              active={selectedTransactionPeriod === "yearly"}
            >
              Yearly
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="wraps_dashbords graph_wrapsproduts" style={{ padding: "12px" }}>
        <div className="d-flex flex-column" style={{ height: "100%" }}>
          <div className="p-0" style={{ height: "26px" }}>
            <h3 className="graph_heading">Sale By Device Type</h3>
          </div>
          <div>
            <div
              id="graph_ServiceSale_card_Dashboard"
              style={{ minWidth: "100%", height: "240px", overflow: "hidden" }}
            >
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleByDeviceTypeChart;
