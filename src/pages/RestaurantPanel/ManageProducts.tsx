import { useState, useEffect, useRef, MouseEvent } from "react";
import axios from "axios";
import { Button, Dropdown, Overlay, Popover } from "react-bootstrap";
import "../../assets/CSS/manageProducts/manageProducts.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Bounce, toast, ToastContainer } from 'react-toastify';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

interface Department {
  Id: number;
  Name: string;
};
interface Product {
  Id: number;
  Name: string;
  Description: string;
  SubDepartmentId: number;
  Cost: number;
  SellingPrice: number;
  IsModifierItem: number;
  ProductImage: string | null;
  Status: number;
  ProductNumber: number;
  ProductBarcode: string;
  ProductBarcodeImage: string | null;
  MainDepartmentId: number;
  MainDepartmentName: string;
  SubDepartmentName: string;
  ProductImageName: string | null;
  ProductBarcodeImageName: string | null;
  ModifiersList: any | null;
  ShortDescription: string;
  App_Base_URL: string | null;
  ProductImage_LiveURL: string | null;
  ProductBarcodeImage_LiveURL: string | null;
  Last_UpdatedOn_IncludingRelatedData: string;
  Last_UpdatedOn_IncludingRelatedData_FormatedDateTime: string | null;
  IsRecommended: number;
  IsFeaturedProduct: number;
  IsForceSelling: number;
  ProductTypeId: number;
  PrintGroupData: any | null;
  PrintersLists: any | null;
  ProductVisibilityDetail: any | null;
}



const ManageProducts: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("Name");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCostTooltip, setShowCostTooltip] = useState<{ [key: number]: boolean }>({});
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [tooltipVisibility, setTooltipVisibility] = useState<{ [key: number]: boolean }>({});
  const [demapertmentTooltip, setDepartmentTooltip] = useState<{ [key: number]: boolean }>({});
  const [mainDepartment, setmainDepartment] = useState<Department[]>([]);
  const [subDepartment, setsubDepartment] = useState<Department[]>([]);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState<string>('');
  const [selectedMainDepartment, setSelectedMainDepartment] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('Name');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDeleteId, setSelectedDeleteId] = useState<number>(0);
  const [selectedDeleteTypeId, setSelectedDeleteTypeId] = useState<number>(0);
  const UserToken_Global = localStorage.getItem("authToken");
  const RestaurantLoginId_Global = 0;
  const navigate = useNavigate();

  const toggleTooltip = (productId: number) => {
    setTooltipVisibility((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    products.forEach((product) => {
      if (product.Id === productId) {
        setSellingPrice(String(product.SellingPrice));
      }
    });
  };

  const toggleCostTooltip = (productId: number) => {
    setShowCostTooltip((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    products.forEach((product) => {
      if (product.Id === productId) {
        setCostPrice(String(product.Cost));
      }
    });
  };
  // const [showTooltip, setShowTooltip] = useState<{ [key: number]: boolean }>({});
  // const [target, setTarget] = useState<{ [key: number]: EventTarget | null }>({});
  // const ref = useRef<HTMLTableCellElement>(null);

  // const toggleDepartmentTooltip = (
  //   productId: number,
  //   event: MouseEvent<HTMLElement> | null
  // ) => {
  //   setShowTooltip((prev) => ({
  //     ...prev,
  //     [productId]: !prev[productId],
  //   }));
  
  //   setTarget((prev) => ({
  //     ...prev,
  //     [productId]: event ? event.target : null, 
  //   }));
  
  //   if (event) {
  //     getActiveMainDepartmentList();
  //   }
  // };
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [target, setTarget] = useState<EventTarget | null>(null);
  const ref = useRef<HTMLTableCellElement>(null);
  
  const toggleDepartmentTooltip = (productId: number, event: MouseEvent<HTMLElement> | null) => {
    if (showTooltip === productId) {
      setShowTooltip(null);
      setTarget(null);
    } else {
      setShowTooltip(productId);
      setTarget(event ? event.target : null);
      getActiveMainDepartmentList();
    }
  };
  


  const handleFilterSelect = (eventKey: any) => {
    setSelectedFilter(eventKey);
    setSearchTerm(eventKey)
    setSearchValue('');
    setLoading(true);
  };

  const handleSearchValueChange = (value: string) => {
    if (value === '') {
      setLoading(true);
    }
    setSearchValue(value);
  }

  const handleSearch = async () => {
    try {

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/all/product/list/search?restaurantLoginId=${0}&searchTerm=${searchTerm}&searchValue=${searchValue}`

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200 || response.data.status) {
        setProducts(response.data.data.products);
      }
      else {
        Toast.fire({
          icon: "error",
          title: response.data.message || "Something went wrong.",
        });
      }
    }

    catch (error: any) {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        Toast.fire({
          icon: "error",
          title: "Unauthorized! Invalid Token!",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "An unexpected error occurred. Please try again!",
        });
      }
    }
    finally {

    }
  };

  const handleImport = () => {
    console.log("Import products");
  };

  const handleExport = () => {
    Swal.fire({
      title: "Export Products",
      text: "Are you sure you want to export the products data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
      preConfirm: () => {
        console.log("Products exported!");
      },
    });
  };

  // Fetch products list on component mount
  const getProductsList = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/all/product/list?restaurantLoginId=${RestaurantLoginId_Global}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === 1) {

        setProducts(response.data.data.products);
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
        text: "There was an error fetching the products list. Please try again.",
        icon: "error",
      });
    }
    finally {
      setLoading(false);
    }

  };

  //get active main department Lists
  const getActiveMainDepartmentList = async () => {

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/active/maindepartment/list?restaurantLoginId=0`;
    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        }
      });
      if (response.data.status === 1) {
        const data = response.data.data.mainDepartments;

        if (data && data.length > 0) {
          setmainDepartment(data.map((item: any) => ({ Id: item.Id, Name: item.Name })));
        }
      }
    } catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  const handleMainDepartmentChange = async (mainDepartmentId: any) => {

    setSelectedMainDepartment(String(mainDepartmentId));

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/active/subdepartment/listByMainDepartment?restaurantLoginId=${0}&mainDepartmentId=${mainDepartmentId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json"
      }
    });
    if (response.data.status === 1 && response.status === 200) {
      const data = response.data.data.subDepartments;
      setsubDepartment(data.map((item: any) => ({ Id: item.Id, Name: item.Name })));

    }
  }



  const handleEditProductPage = async (productId: number, productType: number) => {
    try {
      // Validate productId and productType
      // if (!productId || (productType !== 1 && productType !== 2)) {
      //   Toast.fire({
      //     icon: "error",
      //     title: "Invalid product ID or type!",
      //   });
      //   return;
      // }
  
      // // Construct API URL
      // const apiUrl = `${import.meta.env.VITE_API_URL}Restaurant/SetDataForEditProduct?productId=${productId}`;
  
      // // API call
      // const response = await axios.get(apiUrl,
      //   { params: { productId } } // Pass productId as query parameter
      // );
      // const dataResponse = response.data;
  
      // if (dataResponse && dataResponse.productId) {
      //   // Navigate based on productType
        if (productType === 1) {
          navigate(`/Restaurant/Product?productId=${productId}`);
        } else if (productType === 2) {
          navigate(`/Restaurant/ComboProduct?Id=${productId}`);
        }
      // else {
      //   // Handle non-200 status
      //   Toast.fire({
      //     icon: "error",
      //     title: "Failed to fetch product data!",
      //   });
      // }
    } catch (error) {
      console.error("Error fetching product data:", error);
  
      // Handle network or unexpected errors
      Toast.fire({
        icon: "error",
        title: "An unexpected error occurred. Please try again!",
      });
    }
  };
  


  const handleUpdateProductStatus = async (productId: number, productType: number) => {

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/update/product/status`
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Id", String(productId));
      formData.append("restaurantLoginId", "0");
      formData.append("productTypeId", String(productType));

      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`
        }
      });
      if (response.data.status === 1 && response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Product Status Updated Successfully",
        })
      }

    } catch (error) {

    }
    finally {
      setLoading(false);
    }

  };


  
  const handleProductUpdate = async (productId: number, mode: number) => {
    try {
      setLoading(true);
      const product = products.find((p) => p.Id === productId);
  
      if (!product) {
        Toast.fire({
          icon: "error",
          title: "Product not found.",
        });
        setLoading(false);
        return;
      }
  
      if (mode === 2 && (selectedSubDepartment === "" || selectedMainDepartment === "")) {
        Swal.fire("Please select the sub-department!");
        setLoading(false);
        return;
      }
  
      let apiUrl = product.ProductTypeId === 1
        ? `${import.meta.env.VITE_API_URL}api/update/product/details`
        : `${import.meta.env.VITE_API_URL}api/update/combo/product/details`;
  
      const formData = new FormData();
      formData.append("id", product.Id.toString());
      formData.append("name", "");
      formData.append("productTypeId", product.ProductTypeId.toString());
      formData.append("mainDepartmentId", mode === 2 ? selectedMainDepartment : "0");
      formData.append("subDepartmentId", mode === 2 ? selectedSubDepartment : "0");
      formData.append("sellingPrice", sellingPrice);
      formData.append("cost", costPrice);
      formData.append("mode", mode.toString());
      formData.append("restaurantLoginId", "0");
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.status === 1 && response.status === 200) {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: response.data.message || "Something went wrong.",
        });
      }
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      if (mode === 1) {
        toggleTooltip(productId, null);
      } else if (mode === 3) {
        toggleCostTooltip(productId, null);
      } else {
        toggleDepartmentTooltip(productId, null); // Ensure proper cleanup
      }
      setLoading(false);
      setSelectedMainDepartment("");
      setSelectedSubDepartment("");
    }
  };
  

  const confirmDeleteProduct = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const apiUrl = `${import.meta.env.VITE_API_URL}api/delete/${selectedDeleteTypeId === 2 ? 'combo/' : ''}product?Id=${selectedDeleteId}&restaurantLoginId=0`;
          var data = new FormData();
          data.append('Id', String(selectedDeleteId));
          const response = await axios.post(apiUrl, data,{
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${UserToken_Global}`
            }
          });
  
          if (response.status === 200) {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.status === 401) {
                toast.error("Unauthorized! Invalid Token!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                });
              } else {
                toast.error("There is some technical error, please try again!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                });
              }
            }
          } else {
            toast.error("An unexpected error occurred!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        }
        finally {
          setLoading(false);
        }
      }
    });
  };

  
  useEffect(() => {
    getProductsList()
  },[loading])
  return (
    <div className="Manage-prod-bx overflow-auto">
      <ToastContainer/>
      {loading && (<div
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
      </div>)}
      <div
        id="contentWrapper_RestaurantLayout "
        className="!pt-0 content-wrapper overflow-auto"
      >
        <div className="row">
          <div className="product-manage-br">
            <div className="row">
              <input type="hidden" id="hdn_ProNumber" value="0" />

              <div className="col-12 col-md-8 col-lg-8 text-center">
                <div className="pro_dropd0wn">
                  <div
                    className="searchDropdown"
                    id="customDDLSearch_ManageProduct"
                  >
                    <Dropdown onSelect={handleFilterSelect}>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        className="pt-1 m-1  dropdown-custom"
                      >
                        {selectedFilter}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="text-center">
                        <Dropdown.Item eventKey="ProductNumber">
                          Product No.
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Name"
                          active={selectedFilter === "Name"}
                        >
                          Name
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Description">
                          Description
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="SellingPrice">
                          Price
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="MainDepartment">
                          Main Dept.
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="SubDepartment">
                          Sub Dept.
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="ProductBarcode">
                          Barcode
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="input-group input_searchh">
                    <input
                      type="text"
                      className="form-control searchTextbox "
                      id="txtSearch_ManageProduct"
                      value={searchValue}
                      onChange={(e) => {
                        handleSearchValueChange(e.target.value);
                      }}
                      placeholder="Search"
                      style={{ height: "40px" }}
                    />
                    <div
                      className="z-4 input-group-append pt-2"
                      onClick={handleSearch}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.001"
                        height="16"
                        viewBox="0 0 16.001 16"
                      >
                        <g id="__TEMP__SVG__" opacity="1">
                          <path
                            id="Path_12695"
                            data-name="Path 12695"
                            d="M23.13,23.128a1,1,0,0,1,1.415,0l3.85,3.85a1,1,0,1,1-1.414,1.415l-3.85-3.85a1,1,0,0,1,0-1.415Z"
                            transform="translate(-12.688 -12.686)"
                            fill="#1c2126"
                            fillRule="evenodd"
                          />
                          <path
                            id="Path_12696"
                            data-name="Path 12696"
                            d="M6.5,12A5.5,5.5,0,1,0,1,6.5,5.5,5.5,0,0,0,6.5,12ZM13,6.5A6.5,6.5,0,1,1,6.5,0,6.5,6.5,0,0,1,13,6.5Z"
                            transform="translate(0 0)"
                            fill="#1c2126"
                            fillRule="evenodd"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 text-end">
                <Link to="/Restaurant/ImportProducts">
                  <button
                    variant="success"
                    className="btn btn-success p-2 !bg-[#1a8101] "
                    onClick={handleImport}
                  >
                    Import
                  </button>
                </Link>

                <Button
                  variant="primary"
                  className="p-2 ml-2 btn btn-primary btnExportProductsStyle"
                  onClick={handleExport}
                >
                  Export
                </Button>

                <form
                  id="form_ExportProductsToExcel_AddUpdateProduct"
                  method="post"
                  action="/Restaurant/ExportProductsToExcel"
                  style={{ display: "none" }}
                >
                  <input
                    type="hidden"
                    id="hdn_SelectedExportType_AddUpdateProduct"
                    name="hdn_SelectedExportType_AddUpdateProduct"
                    value="1"
                  />
                  <input
                    type="hidden"
                    id="hdn_AccessToken_AddUpdateProduct"
                    name="hdn_AccessToken_AddUpdateProduct"
                    value="your_access_token"
                  />
                  <input
                    type="hidden"
                    id="hdn_RestaurantLoginId_AddUpdateProduct"
                    name="hdn_RestaurantLoginId_AddUpdateProduct"
                    value="0"
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="table-check ">
            <div className="table-responsive">
              <table
                className=" table table-bordered"
                id="tblProductList_ManageProduct"
                style={{width:"100%"}}
              >
                <thead>
                  <tr>
                    <th scope="col">Action</th>
                    <th scope="col">No.</th>
                    <th scope="col">Images</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Main Dept</th>
                    <th scope="col">Sub Dept</th>
                    <th scope="col">Barcode</th>
                    <th scope="col">Out of Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      data-pid={product.Id}
                      data-ptype={product.ProductTypeId}
                      className={selectedDeleteId === product.Id ? 'selectedRow' : ''}
                      data-costprice={product.Cost}  
                      onClick={() => {
                        setSelectedDeleteId(product.Id) 
                        setSelectedDeleteTypeId(product.ProductTypeId)
                      }}
                  >
                    <td>
                      <div
                        className="td-icon"
                          onClick={() => handleEditProductPage(product.Id, product.ProductTypeId)}
                      >
                        <span>
                          <svg
                            fill="#5650BD"
                            viewBox="0 0 32 32"
                            style={{
                              fillRule: "evenodd",
                              clipRule: "evenodd",
                              strokeLinejoin: "round",
                              strokeMiterlimit: 2,
                            }}
                            version="1.1"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnserif="http://www.serif.com/"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M12.965,5.462c0,-0 -2.584,0.004 -4.979,0.008c-3.034,0.006 -5.49,2.467 -5.49,5.5l0,13.03c0,1.459 0.579,2.858 1.611,3.889c1.031,1.032 2.43,1.611 3.889,1.611l13.003,0c3.038,-0 5.5,-2.462 5.5,-5.5c0,-2.405 0,-5.004 0,-5.004c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.827,-0 -1.5,0.672 -1.5,1.5l0,5.004c0,1.381 -1.119,2.5 -2.5,2.5l-13.003,0c-0.663,-0 -1.299,-0.263 -1.768,-0.732c-0.469,-0.469 -0.732,-1.105 -0.732,-1.768l0,-13.03c0,-1.379 1.117,-2.497 2.496,-2.5c2.394,-0.004 4.979,-0.008 4.979,-0.008c0.828,-0.002 1.498,-0.675 1.497,-1.503c-0.001,-0.828 -0.675,-1.499 -1.503,-1.497Z"></path>
                              <path d="M20.046,6.411l-6.845,6.846c-0.137,0.137 -0.232,0.311 -0.271,0.501l-1.081,5.152c-0.069,0.329 0.032,0.671 0.268,0.909c0.237,0.239 0.577,0.343 0.907,0.277l5.194,-1.038c0.193,-0.039 0.371,-0.134 0.511,-0.274l6.845,-6.845l-5.528,-5.528Zm1.415,-1.414l5.527,5.528l1.112,-1.111c1.526,-1.527 1.526,-4.001 -0,-5.527c-0.001,-0 -0.001,-0.001 -0.001,-0.001c-1.527,-1.526 -4.001,-1.526 -5.527,-0l-1.111,1.111Z"></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </td>
                      <td>{product.ProductNumber}</td>
                    <td className="img-svg">
                      {/* SVG icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                          className=""
                      >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                            d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                            fill="#0F0F0F"
                          ></path>
                          <path
                            d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                            fill="#0F0F0F"
                          ></path>
                          <path
                            d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
                            fill="#0F0F0F"
                          ></path>
                        </g>
                      </svg>
                    </td>
                      <td>{product.Name}</td>
                      <td title={product.Description}>
                        {product.ShortDescription}
                    </td>
                    <td className="price-pop tdManageProductCommonClassStyle">
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="productSellingPrice_ManageProductCommonClass">
                            ${product.SellingPrice}
                        </span>
                        <i
                          className="fa fa-pencil"
                            onClick={() => toggleTooltip(product.Id)}
                          style={{ marginLeft: "5px" }}
                        ></i>
                      </span>
                        {tooltipVisibility[product.Id] && (
                          <div className="toltip1 tooltipManageProductCommonClass"  >
                            <span>
                              <i
                                className="fa fa-times"
                                onClick={() => toggleTooltip(product.Id)}
                              ></i>
                            </span>
                            <span>
                              <i
                                className="fa fa-check"
                                style={{ color: "green" }}
                                onClick={() => handleProductUpdate(product.Id, 1)}
                              ></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={sellingPrice}
                              onChange={(e) => setSellingPrice(e.target.value)}
                            />
                          </div>)}
                    </td>
                    <td className="price-pop tdManageProductCommonClassStyle">
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="productCostPrice_ManageProductCommonClass">
                            ${product.Cost}
                        </span>
                        <i
                          className="fa fa-pencil"
                            onClick={() => toggleCostTooltip(product.Id)}
                          style={{ marginLeft: "5px" }}
                        ></i>
                      </span>
                        {showCostTooltip[product.Id] && (
                        <div className="toltip1 tooltipManageProductCommonClass">
                          <span>
                            <i
                              className="fa fa-times"
                                onClick={() => toggleCostTooltip(product.Id)}
                            ></i>
                          </span>
                          <span>
                            <i
                              className="fa fa-check"
                                style={{ color: "green" }}
                                onClick={() => handleProductUpdate(product.Id, 3)}
                            ></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                              value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                          />
                        </div>
                      )}
                    </td>
                      <td>{product.MainDepartmentName}</td>
                      <td ref={ref} id={`tdProductSubDepartment_ManageProduct_${product.Id}_2`} className="relative">
  <span
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span className="productSubDepartment_ManageProductCommonClass">
      {product.SubDepartmentName}
    </span>
    <i
      className="fa fa-pencil"
      style={{ marginLeft: "5px", cursor: "pointer" }}
      onClick={(e) => toggleDepartmentTooltip(product.Id, e)}
    ></i>
  </span>

  <Overlay
    show={showTooltip === product.Id} 
    target={target}
    placement="bottom"
    container={ref.current}
    containerPadding={20}
  >
    <Popover id={`popoverProductMainDepartment_${product.Id}`} className="absolute py-0 mt-0 border border-gray-950">
      <Popover.Body className="p-3  flex">
        <div className="flex items-center tooltipManageProductCommonClass">
          <div className=" tooltip-header">
            <i
              className="fa fa-times"
              aria-hidden="true"
              style={{ cursor: "pointer", color: "red", marginRight: "10px" }}
              onClick={() => toggleDepartmentTooltip(product.Id, null)}
            ></i>
            <i
              className="fa fa-check"
              aria-hidden="true"
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => handleProductUpdate(product.Id, 2)}
            ></i>
          </div>
          <div className="tooltip-content ">
            <label htmlFor={`ddlMainDepartment_${product.Id}`}>Main Department</label>
            <select
              className="form-control pt-0"
              id={`ddlMainDepartment_${product.Id}`}
              onChange={(e) => handleMainDepartmentChange(e.target.value)}
            >
              <option value="0">Select Main Department</option>
              {mainDepartment?.map((main) => (
                <option key={main.Id} value={main.Id}>
                  {main.Name}
                </option>
              ))}
            </select>

            <label htmlFor={`ddlSubDepartment_${product.Id}`} className="mt-2">
              Sub-Department
            </label>
            <select
              className="form-control pt-0"
              id={`ddlSubDepartment_${product.Id}`}
              onChange={(e) => setSelectedSubDepartment(e.target.value)}
            >
              <option value="0">Select</option>
              {subDepartment?.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  </Overlay>
</td>

                      <td>{product.Status}</td>
                    <td>
                      <div className="toggle-box text-center">
                        <label className="switch">
                          <input
                              type="checkbox"
                              onClick={() => handleUpdateProductStatus(product.Id, product.ProductTypeId)}
                              checked={product.Status !== 1}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  ))}

                </tbody>
              </table>

            </div>
          </div>

          <div className="!h-fit cstm_btns_btms p-1 w-full">
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-1 w-full">
    <Link
      to="/Restaurant/MainDepartment"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Add Main Department
    </Link>
    <Link
      to="/Restaurant/AddDepartment"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Add Department
    </Link>
    <Link
      to="/Restaurant/PrintGroup"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Add Print Group
    </Link>
    <Link
      to="/Restaurant/Product"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Add Product
    </Link>
    <Link
      to="/Restaurant/ComboProduct"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Add Combo-Product
    </Link>
    <a
      href="#"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
      onClick={confirmDeleteProduct}
    >
      Delete Product
    </a>
    <Link
      to="/Restaurant/MultiItemProgramming"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Speed Tool
    </Link>
    <Link
      to="/Restaurant/UpsellByProduct"
      className="btn btn-primary back-blue text-center py-3 px-1
       w-full"
      role="button"
    >
      Upsell By Product
    </Link>
  </div>
</div>




        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
