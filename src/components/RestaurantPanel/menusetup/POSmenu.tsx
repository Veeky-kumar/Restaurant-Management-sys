import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Product {
  Id: number;
  Name: string;
  SellingPrice: number;
  ProductTypeId: number;
  ProductNumber: number;
}

interface ApiResponse {
  status: number;
  message: string;
  data: {
    products: Product[];
  };
}
type SubDepartment = {
    Id: number;
    Name: string;
  };
  interface DataResponse {
    status: number;
    message: string;
  }
const POSmenu: React.FC = () => {
  const UserToken_Global = localStorage.getItem("authToken");

  const [products, setProducts] = useState<Product[]>([]);
  const [subDepartmentProducts, setSubDepartmentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // State to hold sub-department data
const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
const [activeSubDepartment, setActiveSubDepartment] = useState<number | null>(null);
const [activeSubDepartmentName, setActiveSubDepartmentName] = useState<string | null>("");


  const fetchProducts = async () => {
    setLoading(true);
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }api/pos/products/list/by/subdepartment?restaurantLoginId=${0}&departmentId=${activeSubDepartment}`;
    try {
      const response = await axios.get<ApiResponse>(apiUrl, {
        //   params: { subDepartmentId },
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { data } = response.data;
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // Swal.fire({
          //   title: "Warning",
          //   text: "No products found for this department!",
          //   icon: "warning",
          // });
          setProducts([]);
        }
      } else {
        console.error("API Error:", response.data.message);
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);

    } finally {
      setLoading(false);
    }
  };

  const opneColorPickerModal = () => {
    const button = document.getElementById(
      "ShowingColorPickerPopup_POSMenuSetup"
    );
    if (button) {
      button.click();
    }
  };


// Fetch the sub-departments from the API
const fetchSubDepartments = async () => {
  const apiUrl = `${
    import.meta.env.VITE_API_URL
  }api/pos/departments/list?restaurantLoginId=${0}`;
  try {
    const response = await axios.get<{ subDepartments: SubDepartment[] }>(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const { subDepartments } = response.data.data;  // Destructure the subDepartments from response
      console.log("sub-departments", subDepartments)
      if (subDepartments && subDepartments.length > 0) {
        setSubDepartments(subDepartments);  // Set subDepartments state
        setActiveSubDepartment(subDepartments[0].Id);  // Set default active sub-department
        setActiveSubDepartmentName(subDepartments[0].Name);  // Set default active sub-department
console.log("SubDepartment", activeSubDepartment)
        // Fetch products for the default sub-department (if needed)
        // GetAndBindProductsListBySubdepartmentId(subDepartments[0].Id, subDepartments[0].Name);
      } else {
        Swal.fire({
          title: "Warning",
          text: "No sub-departments found!",
          icon: "warning",
        });
      }
    } else {
      console.error("API Error:", response.data.message);
      Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching sub-departments:", error);
  }
};
// Fetch products
const fetchMenuProducts = async () => {
  setLoading(true);
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/pos/menu/setup/products/list/by/subdepartment?restaurantLoginId=${0}&departmentId=${activeSubDepartment}`;
    const response = await axios.get<{ status: number; data: { products: Product[] } }>(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === 1) {
      setSubDepartmentProducts(response.data.data.products || []);
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch products.",
        icon: "error",
      });
    }
  } catch (error) {
    // Swal.fire({
    //   title: "Error",
    //   text: "There was an error fetching the products.",
    //   icon: "error",
    // });
  } finally {
    setLoading(false);
  }
};

// Delete product
const deleteProduct = async (Id: number) => {
  setLoading(true);
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/pos/delete/product/pos/menu/setup?restaurantLoginId=${0}&Id=${Id}`;
    const response = await axios.get<{ status: number; message: string }>(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === 1) {
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
      });
      fetchMenuProducts();
    } else {
      Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "There was an error deleting the product.",
      icon: "error",
    });
  } finally {
    setLoading(false);
  }
};


// Handle sub-department selection
const handleSubDepartmentClick = (id: number, name: string) => {
  setActiveSubDepartment(id);
  setActiveSubDepartmentName(name);
  // GetAndBindProductsListBySubdepartmentId(id, name); // Fetch products for the selected sub-department (if needed)
};


useEffect(() => {
    fetchSubDepartments();
    fetchProducts();
  }, []);

useEffect(() => {
    fetchProducts();
    fetchMenuProducts();
  }, [activeSubDepartment]);

  return (
    <>
      <div className="pos-menu-main shadow-none">
        <div className="row">
          <div className="col-md-4 sm:pr-0">
            <div className="pos-left">
              <div className="pos-cate-butns">
                <button> Dine In</button>
                <button>Take Away</button>
                <button>Tables</button>
                <button>Order no</button>
                <button>Park Sale</button>
                <button>Banking Report</button>
                <button>Customer Name</button>
                <button>No Sale</button>
                <button>Surcharge + 15%</button>
              </div>
              <div className="pos-table1">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" id="BindSubdepartmentName">
                        {activeSubDepartmentName}
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="BindProductListBySubdepartmentId_POSMenuSetup">
                    {products.length >0? (
                      products.map((product) => (
                        <tr
                          key={product.Id}
                          className="itemClass_POSMenuSetup trCommonClass"
                          id={`LeftSideProductId_${product.Id}`}
                          data-val="34"
                          // onClick="SelectProductFromProductList(34,9,1,29)"
                        >
                          <td>{product.Name}</td>
                          <td className="text-right">
                            ${product.SellingPrice}
                          </td>
                        </tr>
                      ))):(
                        <div className="items-center text-center font-bold text-red-600" >No Products to add</div>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="pos-nav">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link buttonTabClickCommonClass"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      data-id="1"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="false"
                    >
                      Button settings
                    </a>
                    <a
                      className="nav-item nav-link buttonTabClickCommonClass"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      data-id="2"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Color &amp; Image
                    </a>
                    <a
                      className="nav-item nav-link buttonTabClickCommonClass active"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      data-id="3"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="true"
                    >
                      Fonts
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="switch-1">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Setup Button</p>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label className="switch round_wraps">
                              <input
                                className="buttonSettingCommonClass"
                                type="checkbox"
                                id="SetupButton_POSMenuSetup_1"
                                name="modifiyProductsRadioBtn"
                                value="1"
                                onchange="SelectButton_POSMenuSetup(1);"
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="switch-1">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Move Button</p>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label className="switch round_wraps">
                              <input
                                className="buttonSettingCommonClass"
                                type="checkbox"
                                id="SetupButton_POSMenuSetup_2"
                                name="modifiyProductsRadioBtn"
                                value="2"
                                onchange="SelectButton_POSMenuSetup(2);"
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="switch-1">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Copy Button</p>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label className="switch round_wraps">
                              <input
                                className="buttonSettingCommonClass"
                                type="checkbox"
                                id="SetupButton_POSMenuSetup_3"
                                name="modifiyProductsRadioBtn"
                                value="3"
                                onchange="SelectButton_POSMenuSetup(3);"
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="switch-1">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Copy Style</p>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label className="switch round_wraps">
                              <input
                                className="buttonSettingCommonClass"
                                type="checkbox"
                                id="SetupButton_POSMenuSetup_4"
                                name="modifiyProductsRadioBtn"
                                value="4"
                                onchange="SelectButton_POSMenuSetup(4);"
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="color-radio">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          data-option="#default-color"
                          type="radio"
                          checked=""
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Menu Color<i className="input-helper"></i>
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-none">
                        <input
                          className="form-check-input"
                          data-option="#color-option"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Auto color<i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                    <div className="color-wrapper">
                      <div className="color-flex">
                        <div
                          className="menu-btn-radio d-none"
                          id="color-option"
                        >
                          <button
                            style={{ backgroundColor: "#5650BC" }}
                          ></button>
                          <button
                            style={{ backgroundColor: "#fd8d21" }}
                          ></button>
                          <button
                            style={{ backgroundColor: "#222222" }}
                          ></button>
                          <button
                            style={{ backgroundColor: "#e45827" }}
                          ></button>
                        </div>
                        <div
                          className="choose-btn-radio text-center"
                          id="default-color"
                        >
                          <img
                            src="../../Content/Images/colorPickerImage.png"
                            height="90px"
                            width="90px"
                            style={{ cursor: "pointer" }}
                            onClick={opneColorPickerModal}
                          />
                          <p>Select Colour</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade active show"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div className="font-up">
                      <div className="color-flex">
                        <a
                          href="javascript:;"
                          id="DecreaseFontSizeButton_POSMenuSetup"
                          onClick="DecreaseFontSizeButton();"
                        >
                          -
                        </a>{" "}
                        <span>A</span>
                        <a
                          href="javascript:;"
                          id="IncreaseFontSizeButton_POSMenuSetup"
                          className=" font-active"
                          onClick="IncreaseFontSizeButton();"
                        >
                          +
                        </a>
                      </div>
                    </div>
                  </div>
                  <a href="/Restaurant/MenuSetup">
                    <button className="tab-save">Save &amp; Exit</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="pos-right">
              <div className="tab-content ui-droppable" id="pills-tabContent">
                <div
                  className="tab-pane fade show active flex-wrap"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row ">
                    <span className="" style={{width: "120px"}}>
                      <div
                        className="col "
                        style={{
                          width: "100px", // Fixed width for each product
                          // border: "1px solid #ddd",
                          padding: "15px 0px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div
                          className="modify-inner d-flex disabled-div mx-0"
                          data-val="0"
                          id="ParentIdProduct_0"
                        >
                          <a href="" className="">
                            +
                          </a>
                        </div>
                      </div>
                    </span>

                    {subDepartmentProducts.map((product) => (
                      <div
                        key={product.Id}
                        className="product-item"
                        style={{
                          width: "120px", // Fixed width for each product
                          // border: "1px solid #ddd",
                          padding: "15px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div
                          className="modify-inner filled"
                          data-val={product.Id}
                          id={`ParentIdProduct_${product.Id}`}
                          pro-id={`${product.Id}`}
                          style={{
                            textAlign: "center", 
                          }}
                        >
                          <span
                            title="Delete"
                            onClick={() =>
                            //   console.log(`Delete Product ${product.Id}`)
                             { deleteProduct(product.Id)}
                            }
                            className="z-1"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontWeight: "bold",
                            }}
                          >
                            -
                          </span>
                          <div className="modify-position">
                            <p
                              className="m-0 pb-1"
                              style={{
                                fontSize: "14px",
                                marginTop: "8px",
                                fontWeight: "bold",
                              }}
                            >
                              {product.Name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  ...
                </div>

                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  ...
                </div>

                <div
                  className="tab-pane fade"
                  id="pills-bawerages"
                  role="tabpanel"
                  aria-labelledby="pills-bawerages-tab"
                >
                  ...
                </div>

                <div
                  className="tab-pane fade"
                  id="pills-test"
                  role="tabpanel"
                  aria-labelledby="pills-test-tab"
                >
                  ...
                </div>
              </div>
              <div className="scrollable-container mt-2 overflow-x-scroll">
                <ul
                  className="nav nav-pills"
                  id="ListEvenSubdepartment_POSMenuSetup"
                  role="tablist"
                >
                    
{subDepartments.length > 0 &&
                      subDepartments.map((department) => (
            
                  <li className="nav-item" key={department.Id}>
                    <a
                      className={`nav-link subdepartmentCommonClass ${activeSubDepartment===department.Id?'active':''} `}
                      id={`pills-home-tab_${department.Id}`}
                      data-toggle="pill"
                      href="javascript:;"
                      onClick={()=>handleSubDepartmentClick(department.Id, department.Name)}
                      role="tab"
                      aria-controls="pills-home"
                      title={department.Name}
                      aria-selected="true"
                    >
                      {department.Name}
                    </a>
                  </li>

                      ))}

                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade dine-in-pop"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered mt-0"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header justify-content-center p-2">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Replace Width
              </h5>
            </div>
            <div className="modal-body">
              <div className="replace-width-sec">
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Dine In"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Dine In)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Take Away"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Take Away)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Tables"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Tables)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Order no"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Ordr no)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Park Sale"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Park Sale)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Banking Report"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Banking Report)
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <div className="form-group row">
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Customer Name"
                        />
                      </div>
                      <label
                        for="inputPassword"
                        className="col-6 col-form-label"
                      >
                        (Customer Name )
                      </label>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <div>
                      <label className="switch round_wraps">
                        <input
                          id="chkSunday_RestaurantTiming_SoftwareSetting"
                          type="checkbox"
                          onchange="RestaurantDayStatus_Change(1);"
                          checked=""
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="ShowingColorPickerPopup_POSMenuSetup"
        className="btn d-none"
        data-toggle="modal"
        data-target="#exampleModalCenter1"
      ></button>
      <div
        className="modal fade color-pick-model"
        id="exampleModalCenter1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p style={{ marginTop: "-29px" }}>Choose color</p>
              <div className="color-pick-center">
                <input
                  type="text"
                  id="txtColorName_colorPicker"
                  className="form-control colorpicker-element"
                  style={{ marginTop: "9px" }}
                  data-colorpicker-id="1"
                  data-bs-original-title=""
                  title=""
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                id="CancelBtnColorPickerPopup_POSMenuSetup"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick="AddUpdateBackgroundColor_POSMenuSetup();"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default POSmenu;
