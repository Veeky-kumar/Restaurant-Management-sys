import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

// Define types for date handling and state
type DropdownOption = 'Today' | 'CustomDate';

const HourlySaleCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  // const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
  const [salesData, setSalesData] = useState<number[]>([120, 150, 180, 140, 110]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState("")

  const RestaurantLoginId_Global = 0;
  const UserToken_Global = localStorage.getItem("authToken");

  const handleDateSelection = (dateValue: string) => {
    setSelectedDate(dateValue);
    if (dateValue === 'CustomDate') {
    } else {

      fetchSalesData(dateValue === 'Today' ? 1 : 2);
    }
  };

  const fetchSalesData = async (filterType: number) => {
    setLoading(true);

    // Format the date in MM/DD/YYYY format
    const formattedDate = date ? format(new Date(date), "MM/dd/yyyy") : "";

    const params = {
      filtrationTypeId: filterType,
      restaurantLoginId: RestaurantLoginId_Global,
      customDate: formattedDate, // Pass the formatted date here
    };

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/reports/graph/hourlysale`;

      const response = await axios.post<any>(apiUrl, params, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 1 && response.data.data.saleData) {
        setSalesData(response.data.data.saleData);
      } else {
        // Handle the case where there is no sale data
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  // Highcharts options for the graph
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5'], // Example hours
    },
    yAxis: {
      title: {
        text: 'Sales Amount',
      },
    },
    series: [
      {
        name: 'Sales',
        data: salesData,
      },
    ],
  };

  useEffect(() => {
    if (selectedDate === 'Today') {
      fetchSalesData(1);
    } else {
      fetchSalesData(2)
    }

  }, [selectedDate]);

  return (
    <>
    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-12">
      {/* Loader */}
        {loading && (
          <div
            className="LoaderDiv_DashboardRestaurantCommonClass"
            id="LoaderDiv_DashboardRestaurant_8"
            style={{
              opacity: 1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2147483647,
              display: 'block',
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
              <img
                src="../../Content/Images/Loader.gif"
                alt="Loading"
                style={{
                  backgroundColor: '#ffffff',
                  width: '50px',
                }}
              />
            </div>
          </div>
        )}

      {/* Dropdown Menu for Date Selection */}
      <div className="btn-group btn-group1 wrap_dropsdowns" style={{ zIndex: 2 }}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="transaction_graphfilter">
            <span className="selected-text"> {selectedDate}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item eventKey="Today" onClick={() => handleDateSelection('Today')}>
              Today
            </Dropdown.Item>
              <Dropdown.Item eventKey="CustomDate" >
                <button data-toggle="modal" data-target="#CustomDate_HourlySalesGraph_ManageReports_Modal">Custom Date</button>

            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Hourly Sale Card */}
      <div className="wraps_dashbords graph_wrapsproduts" style={{ padding: '12px' }}>
        <div className="d-flex flex-column" style={{ height: '100%' }}>
          <div className="p-0" style={{ height: '26px' }}>
            <h3 className="graph_heading">Hourly Sale</h3>
            </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
      <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" id="CustomDate_HourlySalesGraph_ManageReports_Modal" data-backdrop="static" data-keyboard="false" aria-hidden="true" style={{ display: 'none' }}>
        <div className="modal-dialog cstm_modal_dialog" style={{ marginTop: '100px !important' }}>
          <div className="modal-content plus_modal_cont custm_date-wrappopup" style={{ width: '400px !important' }}>

            {/* Modal Header */}
            <div className="modal-header plus_modal_head" style={{ display: 'block', paddingBottom: '0px', textAlign: 'center', paddingTop: '0px', paddingBottom: '20px' }}>
              <h4 className="modal-title plus_head_popup" style={{ left: '0px' }}>
                Custom Date
              </h4>
            </div>

            {/* Modal Body */}
            <div className="modal-body new_modal_work">
              <div className="col-md-12 col-lg-12 col-12">
                <form>
                  <div className="dates_wraps">
                    <div className="form-group text_wrap-datepicker" style={{ display: 'block' }}>
                      <label style={{ width: '100%', fontSize: '16px', fontWeight: '600' }}>Select Date</label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="form-control bg-light mt-0"
                      />
                      <div id="date_error_HourlySalesGraph_ManageReports_Modal" className="errorsClass2"></div>
                    </div>
                  </div>

                  <div className="modal-bottom plus_modal_bottom" style={{ paddingBottom: '0px', paddingTop: '10px' }}>
                    <button
                      id="btnCancel_HourlySalesGraph_ManageReports_Modal"
                      type="button"
                      className="cstm_model_plusbtn_1 btn btn-danger"
                      data-dismiss="modal"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className="cstm_model_plusbtn_1 btn btn-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="cstm_model_plusbtn_1 btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => handleDateSelection('CustomDate')}
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
    </>
  );
};

export default HourlySaleCard;
