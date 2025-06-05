import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Params {
  productId: string;  // productId is a string now
  serviceType: string;
  restaurantLoginId: number;
}

interface ApiResponse {
  status: number;
  message: string;
}

const ComboProductItemVisibilitySetup: React.FC = () => {
  // State to manage visibility for each item
  const [kioskVisible, setKioskVisible] = useState(false);
  const [posVisible, setPosVisible] = useState(false);
  const [tableQrVisible, setTableQrVisible] = useState(false);
  const [storeQrVisible, setStoreQrVisible] = useState(false);

  // Handler for toggling visibility
  const handleVisibilityChange = async (id: number, serviceType: string) => {
    // Prepare payload
    const payload: Params = {
      productId: String(id), // Ensure productId is a string
      serviceType: serviceType,
      restaurantLoginId: 0,  // Adjust based on your actual value or logic
    };

    // Toggle the visibility based on the serviceType
    switch (serviceType) {
      case 'Kiosk':
        setKioskVisible((prev) => !prev);
        break;
      case 'POS':
        setPosVisible((prev) => !prev);
        break;
      case 'Table-QR':
        setTableQrVisible((prev) => !prev);
        break;
      case 'Store-QR':
        setStoreQrVisible((prev) => !prev);
        break;
      default:
        break;
    }

    // Call API with the prepared payload
    await SetComboProductItemVisibility_ProductForm(payload);
  };

  const UserToken_Global = localStorage.getItem('authToken');

  const SetComboProductItemVisibility_ProductForm = async (_Params: Params) => {
    if (!UserToken_Global) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized!',
        text: 'Invalid Token!',
      });
      return;
    }

    try {
      // Make API request using Axios
      const response = await axios.post<ApiResponse>(
        `${
          import.meta.env.VITE_API_URL
        }//api/set/combo/product/visibility`,
        JSON.stringify(_Params),
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Stop loading spinner or similar action
      StopLoading();

      // Check if the response status is 1 (success)
      if (response.data.status === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });

        // Get Item-Visibility Detail of Product of Restaurant
        GetItemVisibilityDetail_AddUpdateProduct();
      }
    } catch (error) {
      StopLoading();

      // Handle error response
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized!',
          text: 'Invalid Token!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There is some technical error, please try again!',
        });
      }
    }
  };

  // This is a placeholder for StopLoading function, adjust as needed
  const StopLoading = () => {
    // Logic to stop any loading indicators
  };

  // This is a placeholder for GetItemVisibilityDetail_AddUpdateProduct function, adjust as needed
  const GetItemVisibilityDetail_AddUpdateProduct = () => {
    // Logic to fetch or update item visibility details
  };

  return (
    <div id="ItemVisibilitySetup_tab" className="tab-pane fade active show">
      <div className="product_main-wrap" style={{ paddingTop: '30px', minHeight: '400px' }}>
        <div className="items_chckbox-wraps wrap_product-availability" style={{ height: '410px', overflowY: 'auto' }}>
          <div className="col-md-12 col-lg-12 col-sm-12 product_availability-wrap">
            {/* Kiosk Visibility */}
            <div className="row mb_bottom_25 mrgn_top_20">
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <p className="product_item-name">
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>Kiosk</span>
                </p>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <label className="switch round_wraps product_option_style">
                  <input
                    id="chk_KioskVisibility_ProductForm"
                    type="checkbox"
                    checked={kioskVisible}
                    onChange={() => handleVisibilityChange(3, 'Kiosk')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
              </div>
            </div>

            {/* POS Visibility */}
            <div className="row mb_bottom_25">
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <p className="product_item-name">
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>POS</span>
                </p>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <label className="switch round_wraps product_option_style">
                  <input
                    id="chk_POSVisibility_ProductForm"
                    type="checkbox"
                    checked={posVisible}
                    onChange={() => handleVisibilityChange(2, 'POS')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
              </div>
            </div>

            {/* Table-QR Visibility */}
            <div className="row mb_bottom_25">
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <p className="product_item-name">
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>Table-QR</span>
                </p>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <label className="switch round_wraps product_option_style">
                  <input
                    id="chk_WebMenuVisibility_ProductForm"
                    type="checkbox"
                    checked={tableQrVisible}
                    onChange={() => handleVisibilityChange(5, 'Table-QR')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
              </div>
            </div>

            {/* Store-QR Visibility */}
            <div className="row mb_bottom_25">
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <p className="product_item-name">
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>Store-QR</span>
                </p>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                <label className="switch round_wraps product_option_style">
                  <input
                    id="chk_CustomerVisibility_ProductForm"
                    type="checkbox"
                    checked={storeQrVisible}
                    onChange={() => handleVisibilityChange(6, 'Store-QR')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboProductItemVisibilitySetup;
