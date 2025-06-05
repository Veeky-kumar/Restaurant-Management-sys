import React, { useState } from 'react';

const ItemVisibilitySetup: React.FC = () => {
  // State to manage visibility for each item
  const [kioskVisible, setKioskVisible] = useState(false);
  const [posVisible, setPosVisible] = useState(false);
  const [tableQrVisible, setTableQrVisible] = useState(false);
  const [storeQrVisible, setStoreQrVisible] = useState(false);

  // Handler for toggling visibility
  const handleVisibilityChange = (id) => {
    switch (id) {
      case 1:
        setKioskVisible((prev) => !prev);
        break;
      case 2:
        setPosVisible((prev) => !prev);
        break;
      case 5:
        setTableQrVisible((prev) => !prev);
        break;
      case 6:
        setStoreQrVisible((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div id="ItemVisibilitySetup_tab" className="tab-pane fade active show">
      <div className="product_main-wrap" style={{ paddingTop: '30px', minHeight: '400px' }}>
        <div className="items_chckbox-wraps wrap_product-availability p-4" style={{ height: '410px', overflowY: 'auto' }}>
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
                    onChange={() => handleVisibilityChange(1)}
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
                    onChange={() => handleVisibilityChange(2)}
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
                    onChange={() => handleVisibilityChange(5)}
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
                    onChange={() => handleVisibilityChange(6)}
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

export default ItemVisibilitySetup;
