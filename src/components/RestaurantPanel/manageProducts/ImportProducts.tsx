import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ImportProducts: React.FC = () => {
  const [fileError, setFileError] = useState<string>('');
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Call a validation function here
      // ValidateFile_ImportProducts(file); // You can replace this with actual validation logic
    }
  };

  const handleSubmit = () => {
    // Replace this with your actual import functionality
    console.log('Importing products...');
  };

  return (
    <div className="content-wrapper min-h-[620px] pt-5">
      <div className="top_area_row ">
      <div className="row">
          <div className="col-sm-8">
            <nav>
              <div className="translate-x-1 main_nav_bread">
                <ol className="breadcrumb pl-3">
                  <li className="breadcrumb-item nav_bread_one ">
                    <Link className="fs-6 fw-bold" to="/Restaurant/ManageProducts">
                      Products
                    </Link>
                  </li>
                  <li className="breadcrumb-item nav_right pl-1 px-2">
                    <a
                      href="javascript:;"
                      className="fs-6 fw-bold"
                      style={{ textDecoration: "none", cursor: "text" }}
                    >
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item nav_bread_two pl-0">
                    <Link
                      to=""
                      className="fs-6 fw-bold"
                      style={{ textDecoration: "none", cursor: "text" }}
                    >
                      Import Products
                    </Link>
                  </li>
                </ol>
              </div>
            </nav>
          </div>
        </div>

        <div className="wrap_tabs-products sidebar_ul-nav_tabs">
          <div className="main_deapt  my-4 p-8 rounded-lg">
            <form action="javascript:void(0)" className="new_customer-wrap">
              <div className="row custom_add_pro_rpw mb-0">
                <div className="col-sm-6">
                  <div className="form-group aline_input">
                    <label className="w-full pl-0 pb-0">Select Excel File</label>
                    <div className="flex flex-col w-full">
                      <input
                        type="file"
                        accept=".xls,.xlsx,.csv"
                        name="txtExcelSheet_ProductsData_ImportProducts"
                        id="txtExcelSheet_ProductsData_ImportProducts"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="row dv_Note_Section mt-4">
                    <div className="col-sm-12">
                      <span className="font-semibold">Note:</span>
                      <span>Please select the valid excel-file containing the product data to import.</span>
                      <br />
                      <span>Only .xls, .xlsx, and .csv formats are allowed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row custom_add_pro_rpw button_botm mt-4">
                <div className="col-sm-6 text-left">
                  {fileError && <div id="excelFile_error_ImportProducts" className="errorsClass2">{fileError}</div>}
                </div>
                <div className="flex col-sm-6">
                  <button
                    type="button"
                    className="ml-2 btm_button_pro btm_button_pro_sm"
                    onClick={() => navigate('/manage-products')}
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    className="btm_button_pro btm_button_pro_sm mr-5"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ImportProducts;
