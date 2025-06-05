import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

interface SalesDataItem {
  subDepartmentName: string;
  totalSaleAmount: number;
}

interface TransactionChartOptions {
  chart: {
    type: string;
    height: number;
  };
  title: {
    text: string;
  };
  series: {
    name: string;
    colorByPoint: boolean;
    data: {
      name: string;
      y: number;
    }[];
  }[];
}


const DepartmentPieChart: React.FC = () => {
  const [selectedTransactionPeriod, setSelectedTransactionPeriod] = useState<string>("weekly");
  const [isTransactionChartLoading, setIsTransactionChartLoading] = useState<boolean>(false);
  const [productFilter, setProductFilter] = useState<string>("department");
  const [filterType, setFilterType] = useState<number>(1);
  const [transactionChartOptions, setTransactionChartOptions] = useState<TransactionChartOptions>({
    chart: {
      type: "pie",
      height: 240,
    },
    title: {
      text: "Sales Data",
    },
    series: [
      {
        name: "Sales",
        colorByPoint: true,
        data: [],
      },
    ],
  });


  const handleTransactionDropdownSelect = (selectedPeriod: string): void => {
    setIsTransactionChartLoading(true);
    setSelectedTransactionPeriod(selectedPeriod);

    switch (selectedPeriod) {
      case "daily":
        setFilterType(1);
        break;
      case "weekly":
        setFilterType(2);
        break;
      case "monthly":
        setFilterType(3);
        break;
      case "yearly":
        setFilterType(4);
        break;
      default:
        setFilterType(1);
    }

    setTimeout(() => {
      setIsTransactionChartLoading(false);
      getDepartmentData();
    }, 500);
  };

  const handleProductFilterChange = (filter: string): void => {
    setProductFilter(filter);
  };

  const getDepartmentData = async () => {
    const token = localStorage.getItem("authToken");
    var apiUrl = null
    if (productFilter === "department") {
      apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/subdepartment`;
    }
    else {
      apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/maindepartment`;
    }

    const data = {
      restaurantLoginId: 0,
      filterationType: filterType,
      fromDate: "",
      toDate: "",
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        let salesData: SalesDataItem[] = [];
        let chartData = null;

        if (productFilter === "department") {

          salesData = response.data.data.salesData_SubDepartment || [];

          chartData = salesData.map((item: SalesDataItem) => {

            return {
              name: item.Name,
              y: item.TotalSale_Percentage,
            };
          });

        }
        else {
          salesData = response.data.data.salesData_MainDepartment || [];
          console.log("main", response.data.data);

          chartData = salesData.map((item: SalesDataItem) => {
            return {
              name: item.Name,
              y: item.TotalSale_Percentage,
            };
          });
        }

        // Update chart options dynamically
        setTransactionChartOptions((prevOptions) => ({
          ...prevOptions,
          title: {
            text: productFilter === "department" ? "Sales by Department" : "Sales by Main Department",
          },
          series: [
            {
              name: "Sales",
              colorByPoint: true,
              data: chartData,
            },
          ],
        }));
      }

    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, [filterType, productFilter]);

  return (
    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-12">
      {/* Loader */}
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

      <div className="wraps_dashbords graph_wrapsproduts" style={{ padding: "12px" }}>
        <div className="grid grid-cols-2">
          <div className="w-fit col-span-1 wrap_dropsdownq">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="product-filter-dropdown" style={{ width: "auto" }}>
                {productFilter.charAt(0).toUpperCase() + productFilter.slice(1)}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {["department", "main department"].map((filter) => (
                  <Dropdown.Item
                    key={filter}
                    active={productFilter === filter}
                    onClick={() => handleProductFilterChange(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="w-fit col-span-1 btn-group btn-group1 wrap_dropsdowns" style={{ zIndex: 2 }}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="transaction_graphfilter">
                <span className="selected-text">
                  {selectedTransactionPeriod.charAt(0).toUpperCase() + selectedTransactionPeriod.slice(1)}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {["daily", "weekly", "monthly", "yearly"].map((period) => (
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
        </div>

        <div className="d-flex flex-column" style={{ height: "100%" }}>
          <div id="graph_transactions_card_Dashboard" style={{ minWidth: "100%", height: "240px" }}>
            <HighchartsReact highcharts={Highcharts} options={transactionChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPieChart;
