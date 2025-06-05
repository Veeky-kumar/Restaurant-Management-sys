import React, { useEffect, useState } from "react";
import "../../../assets/CSS/manageProducts/addProduct.css";
import AddProductForm from "./AddProductForm";
import ModifierSetup from "./ModifierSetup";
import PrinterAllocationTab from "./PrinterAllocationTab";
import ItemVisibilitySetup from "./ItemVisibilitySetup";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
// import AddProductForm from "./AddProductForm";
// import ItemVisibilitySetup from "./ItemVisibilitySetup";
// import PrinterAllocationTab from "./PrinterAllocationTab";
// import ModifierSetup from "./ModifierSetup";

const AddProduct: React.FC = () => {
  const [activeTab, setActiveTab] = useState("AddUpdateProduct_tab");
  const [editProductPage, setEditProductPage] = useState<boolean>(false)

  const UserToken_Global = localStorage.getItem("authToken")
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  // Function to handle tab change
  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  const getNewProductNumber = async () => {

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/product/newproductnumber?restaurantLoginId=0`
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      }
    });
    if (response.status === 200) {
      console.log(response.data);
      setNewProductNumber(response.data.data.newproductnumber);
    }

  }

  //Get Main Department List
  const fetchMainDepartmentList = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/active/maindepartment/list?restaurantLoginId=${0}`
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json"
        }

      })
      if (response.data.status === 1 || response.status === 200) {
        const data = response.data.data.mainDepartments;
        const depData = data.map((dept: any) => ({
          Id: dept.Id,
          Name: dept.Name,
        }));
        setMainDepartmentList(depData);
      }
    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.state && location.state.productId) {
      setEditProductPage(true);
    } else {
      setEditProductPage(false);
    }
    getNewProductNumber();
    fetchMainDepartmentList();
  }, [location]);

  return (
    <div className="product-body">
      <div className="container-scroller">
        <div className="page-body-wrapper">
          <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
            <div className="top_area_row pb-0">
              <div className="row align-items-center">
                {/* Breadcrumb Section */}

                <div className="col-12 col-md-4 col-lg-4">
                  <nav>
                    <div className="main_nav_bread">
                      <ol className="sm:translate-x-2 breadcrumb pl-4 mb-0">
                        <li className="breadcrumb-item nav_bread_one">
                          <Link
                            className="fs-6 fw-bold "
                            to="/Restaurant/ManageProducts"
                            // onClick={backToProducts}
                          >
                            Products
                          </Link>
                        </li>
                        <li className="breadcrumb-icon">
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                          ></i>
                        </li>
                        <li className="breadcrumb-item nav_bread_two">
                          <Link to=""
                            className="fs-6 fw-bold"
                            id="ProductFormName_ProductForm"
                          >
                            {editProductPage ? 'Edit' : 'Add'} Product
                          </Link>
                        </li>
                      </ol>
                    </div>
                  </nav>
                </div>

                {/* Add New Product Button */}
                {editProductPage && (<div
                  className="col-12 col-md-4 col-lg-4"
                  style={{ textAlign: "right" }}
                >
                  <div
                    id="dv_AddNewProductSection_AddUpdateProduct"
                    style={{ textAlign: "right" }}
                  >
                    <button
                      type="button"
                      className="btn-primary ProductPageBtnCommanClass"
                      style={{ backgroundColor: "#1b5703" }}
                      // onClick={goToAddProductScreen}
                    >
                      + Add New Product
                    </button>
                  </div>
                </div>
                )}
                {editProductPage && (
                <div
                  className="col-12 col-md-4 col-lg-4"
                  style={{ textAlign: "right" }}
                >
                  <a
                    href="#"
                    id="dv_PreviousProductSection_AddUpdateProduct"
                    className="btn-primary productbx anchorButtonProductCommonClass"
                      // onClick={previousProduct}
                    style={{ backgroundColor: "#5650BD" }}
                  >
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    Previous Product
                  </a>
                  <a
                    href="#"
                    id="dv_NextProductSection_AddUpdateProduct"
                    className="btn-primary productbx anchorButtonProductCommonClass"
                      // onClick={nextProduct}
                    style={{ backgroundColor: "#5650BD" }}
                  >
                    Next Product{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                  </div>)}

              </div>
            </div>

            <div className="wrap_tabs-products sidebar_ul-nav_tabs wrao_sidebrs mt-0">
              <ul className="nav nav-pills footer_nav-tabs !flex flex-col sm:!flex-row !flex-wrap" role="tablist">
                <li className="nav-item  sm:!w-[25%] !w-full ">
                  <a
                    id="a_GeneralTab_AddUpdateProduct"
                    className={`nav-link anchorButtonProductCommonClass ${
                      activeTab === "AddUpdateProduct_tab" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("AddUpdateProduct_tab")}
                    href="#AddUpdateProduct_tab"
                  >
                    General
                  </a>
                </li>
                <li className="nav-item  sm:!w-[25%] !w-full">
                  <a
                    id="a_tab_ModifierSetup_AddUpdateProduct"
                    className={`nav-link px-0 anchorButtonProductCommonClass ${
                      activeTab === "ModifierSetup_tab" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("ModifierSetup_tab")}
                    href="#ModifierSetup_tab"
                  >
                    Modifier Setup
                  </a>
                </li>
                <li className="nav-item  sm:!w-[25%] !w-full">
                  <a
                    id="a_tab_PrintersAllocation_AddUpdateProduct"
                    className={`nav-link px-0 anchorButtonProductCommonClass ${
                      activeTab === "PrinterSetup_tab" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("PrinterSetup_tab")}
                    href="#PrinterSetup_tab"
                  >
                    Printers Allocation
                  </a>
                </li>
                <li className="nav-item  sm:!w-[25%] !w-full">
                  <a
                    id="a_tab_ItemVisibility_AddUpdateProduct"
                    className={`nav-link px-0 anchorButtonProductCommonClass ${
                      activeTab === "ItemVisibilitySetup_tab" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("ItemVisibilitySetup_tab")}
                    href="#ItemVisibilitySetup_tab"
                  >
                    Item Visibility
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  id="AddUpdateProduct_tab"
                  className={`tab-pane ${
                    activeTab === "AddUpdateProduct_tab" ? "active" : ""
                  }`}
                >
                  {/* Form will be placed here */}
                  <AddProductForm
                  />
                </div>
                {/* You can add other tab contents here as per your requirement */}
                <div
                  id="ModifierSetup_tab"
                  className={`tab-pane ${
                    activeTab === "ModifierSetup_tab" ? "active" : ""
                  }`}
                >
                  <ModifierSetup />
                </div>
                <div
                  id="PrinterSetup_tab"
                  className={`tab-pane ${
                    activeTab === "PrinterSetup_tab" ? "active" : ""
                  }`}
                >
                  <PrinterAllocationTab />
                </div>
                <div
                  id="ItemVisibilitySetup_tab"
                  className={`tab-pane ${
                    activeTab === "ItemVisibilitySetup_tab" ? "active" : ""
                  }`}
                >
                  <ItemVisibilitySetup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AddProduct;
