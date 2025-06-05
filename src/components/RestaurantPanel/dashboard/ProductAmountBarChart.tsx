import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Swal from 'sweetalert2';

const ProductAmountBarChart: React.FC = () => {
  // State for time period and product filter selection
  type TimePeriod = 'Yearly' | 'Monthly' | 'Weekly' | 'Daily';
  type ProductFilter = 'quantity' | 'amount' | 'profit';

  const [timePeriod, setTimePeriod] = useState<string>('Weekly');
  const [productFilter, setProductFilter] = useState<string>('amount');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to fetch data
  const fetchData = async () => {
    setIsLoading(true);
    const _filter_type_val = productFilter;
    const _time_period = timePeriod;

    try {
      const token = localStorage.getItem("authToken");
      const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/dashboard/graph/filter/product`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantLoginId: 0,
          graphFilterDurationType: _time_period,
          productFilterType: _filter_type_val,
        }),
      });

      const data = await response.json();

      if (data.status === 1 && data.data) {
        const transformedData = data.data.salesData_ProductSalesGraph.map((item: any) => ({
          name: item.Name,
          y: item.ProductData,
        }));
        setChartData(transformedData);
      } else {
        Swal.fire({
          title: '',
          icon: 'error',
          text: data.message || 'There was an error fetching the data.',
        });
      }
    } catch (error) {
      Swal.fire({
        title: '',
        icon: 'error',
        text: 'There was an error fetching the data. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timePeriod, productFilter]);

  // Highcharts chart options
  const chartOptions: Options = {
    chart: {
      type: 'bar',
      height: '100%',
      width: null,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: chartData.length > 0 ? chartData.map(item => item.name) : ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6','Product 7','Product 8','Product 9','Product 10',],
      labels: {
        style: {
          fontSize: '14px',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Value',
      },
      min: 0,
    },
    series: [
      {
        type: 'bar',
        name: 'Sales',
        data: chartData.length > 0 ? chartData.map(item => item.y) : [1, 2, 3, 4, 5,6,7,8,9,10],
        pointWidth: 30,

      },
    ],
    plotOptions: {
      bar: {
        pointPadding: 0,
        groupPadding: 0.05,
      },
    },
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

  // Handle time period change
  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  // Handle product filter change
  const handleProductFilterChange = (value: string) => {
    setProductFilter(value);
  };

  return (
    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-12">
      {isLoading &&
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
      {/* Product Analysis Graph Card */}
      <div className="wraps_dashbords graph_wrapsproduts" style={{ padding: '12px' }}>
        {/* Time Period Dropdown */}

        <div className='grid grid-cols-4 sm:grid-cols-2 '>
        <div className="w-fit col-span-3 sm:col-span-1 pt-1 sm:p-1 wrap_dropsdownq">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="product-filter-dropdown" style={{ width: 'auto' }}>
                  {productFilter === 'quantity'
                    ? 'Product by Amount'
                    : productFilter === 'amount'
                    ? 'Product by Amount'
                    : 'Product by Profit'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {['quantity', 'amount', 'profit'].map((filter) => (
                    <Dropdown.Item
                      key={filter}
                      active={productFilter === filter}
                      onClick={() => handleProductFilterChange(filter)}
                    >
                      {`Product by ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
        <div className="w-fit translate-x-3 sm:translate-x-0 sm:p-1 col-span-1 wrap_dropsdowns" id="productCard2_graphfilter" style={{ zIndex: 2 }}>
          <Dropdown style={{ marginBottom: '10px' }}>
            <Dropdown.Toggle variant="secondary" id="time-period-dropdown">
              {timePeriod}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {['Yearly', 'Monthly', 'Weekly', 'Daily'].map((period) => (
                <Dropdown.Item
                  key={period}
                  active={timePeriod === period}
                  onClick={() => handleTimePeriodChange(period)}
                >
                  {period}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        </div>

        {/* Product Filter Dropdown */}
        <div className="d-flex flex-column" style={{ height: '100%' }}>

          {/* Highcharts Graph */}
          <div
          className='overflow-hidden'
            id="graph_product_card2_Dashboard"
            style={{
              minWidth: '100%',
              height: '240px',
              overflow: 'scroll',
            }}
            aria-hidden="false"
            role="region"
            aria-label="Chart. Highcharts interactive chart."
          >
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAmountBarChart;
