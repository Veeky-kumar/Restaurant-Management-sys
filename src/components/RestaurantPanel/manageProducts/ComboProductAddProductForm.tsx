import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import MainDepartmentModal from "./Models/MainDepartmentModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

interface DepartmentResponse {
  Id: number;
  Name: string;
}

const ComboProductAddProductForm: React.FC = () => {
  const [newproductnumber, setNewProductNumber] = useState<number>(0);
  const [defaultFormData, setDefaultFormData] = useState([]);

  const [productData, setProductData] = useState({
    productNumber: "",
    sellingPrice: "",
    productName: "",
    cost: "",
    description: "",
    mainDepartment: "",
    mainDepartmentId: "",
    subDepartment: "",
    barcode: "",
    productImage: null,
    barcodeImage: null,
    forceSelling: false,
  });
  const fetchFormData = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }api/single/combo/product?Id=${productId}&restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 1 || response.status === 200) {
        const data = response.data.data.product;

        // Set default form data
        setDefaultFormData(data);
        console.log("ccc", data);
        // Set product data with fetched data
        setProductData({
          productNumber: "",
          sellingPrice: data.SellingPrice || "",
          productName: data.Name || "",
          cost: data.Cost || "",
          description: data.Description || "",
          mainDepartment: data.MainDepartmentName || "",
          mainDepartmentId: data.MainDepartmentId || "",
          subDepartment: data.SubDepartmentId || "",
          barcode: data.ProductBarcode || "",
          productImage: data.ProductImage || null,
          barcodeImage: data.ProductBarcodeImage || null,
          forceSelling: false,
        });

        console.log("ProductId", newproductnumber, " ", productId);
        if (productId) setNewProductNumber(productId);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const UserToken_Global = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      [fieldName]: file,
    });
  };

  const showBarcodeImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({
          ...productData,
          barcodeImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const showProductImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({
          ...productData,
          productImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const [description, setDescription] = useState("");
  const [mainDepartment, setMainDepartment] = useState("0");
  const [barcode, setBarcode] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [barcodeImage, setBarcodeImage] = useState(null);
  const [mainDepartmentList, setMainDepartmentList] = useState<
    DepartmentResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subDepartment, setSubDepartment] = useState<DepartmentResponse[]>([]);
  const [isMainDepartmentModal, setIsMainDepartmentModal] =
    useState<boolean>(false);
  const [isSubDepartmentModal, setIsSubDepartmentModal] =
    useState<boolean>(false);
  const [subDepartmentName, setSubDepartmentName] = useState<string>("");
  const buttonRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    mainDepartment: "",
    departmentName: "",
  });
  const [productFromError, setProductFormError] = useState({
    productName: "",
    // productDescription: '',
    mainDepartment: "",
    subDepartment: "",
  });
  const [productId, setProductId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("Id");

    if (id) {
      setProductId(id);
    }
  }, [location.search]);

  const getNewProductNumber = async () => {
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }/api/get/product/newproductnumber?restaurantLoginId=0`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      // console.log(response.data);
      setNewProductNumber(response.data.data.productNumber);
    }
  };
  const handleMainDepartmentChange = async (mainDepartmentId: string) => {
    setProductData((prevData) => ({
      ...prevData,
      mainDepartment: mainDepartmentId,
    }));
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }/api/active/subdepartment/listByMainDepartment?restaurantLoginId=${0}&mainDepartmentId=${mainDepartmentId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data.status === 1 && response.status === 200) {
      const data = response.data.data.subDepartments;
      setSubDepartment(
        data.map((item: any) => ({ Id: item.Id, Name: item.Name }))
      );
    }
  };

  //get main department List
  const fetchMainDepartmentList = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/active/maindepartment/list?restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === 1 || response.status === 200) {
        const data = response.data.data.mainDepartments;
        const depData = data.map((dept: any) => ({
          Id: dept.Id,
          Name: dept.Name,
        }));
        setMainDepartmentList(depData);
        // console.log("inside the combo", mainDepartmentList)
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMaindepartmentData = async (
    action: number,
    department: string
  ) => {
    const token = localStorage.getItem("authToken");
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }api/addupdate/maindepartment`;

    try {
      // setIsLoading(true);
      const formData = new FormData();
      formData.append("id", String(0));
      formData.append("restaurantLoginId", "0");
      formData.append("name", department);
      formData.append("mode", String(action));

      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          mimeType: "multipart/form-data",
        },
      });
      if (response.status === 200 && response.data.status === 1) {
        // setIsLoading(false);
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      } else if (response.data.status === -2) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "failed to update main department Data",
      });
    } finally {
      setIsMainDepartmentModal(false);
    }
  };
  // const [loading, setLoading] = useState(false);
  // const [mainDepartment, setMainDepartment] = useState('');
  // const [subDepartmentName, setSubDepartmentName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors: err },
    setValue,
  } = useForm();

  // Handle Add/Update Department
  const handleAddUpdateDepartment = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mode", "1");
      formData.append("mainDepartmentId", data.mainDepartment);
      formData.append("name", data.subDepartmentName);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/addupdate/subdepartment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchMainDepartmentList();
      if (response?.data?.status === 1 && response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        setIsSubDepartmentModal(false);
      } else {
        Swal.fire({
          title: "Warning",
          text: response?.data?.message || "Something went wrong!",
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error processing your request. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Modal Submit Handler
  const onSubmit = (data) => {
    handleAddUpdateDepartment(data);
  };
  const closeCreateMainDepartmentPopup = () => {
    setIsMainDepartmentModal(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("handle ",e)
  //   // Handle form submission here (e.g., send productData to the server)
  //   handleInsertUpdateProduct()
  //   console.log('Product data submitted:', productData);
  // };

  const validateProductFrom = () => {
    let isValid = true;
    const productFromErrors = {
      // productNumber: '',
      productName: "",
      // productDescription: '',
      mainDepartment: "",
      subDepartment: "",
      // sellinPrice: '',
      // costPrice: '',
    };

    console.log(productData.mainDepartment);
    if (productData.productName === "") {
      productFromErrors.productName = "Please enter product name";
      isValid = false;
    }
    if (productData.mainDepartment === "") {
      productFromErrors.mainDepartment = "Please select a main department.";
      isValid = false;
    }
    if (productData.subDepartment === "") {
      productFromErrors.subDepartment = "Please select a sub department.";
      isValid = false;
    }
    setProductFormError(productFromErrors);
    return isValid;
  };
  //Add and Update Product
  const handleInsertUpdateProduct = async () => {
    if (!validateProductFrom()) return;

    const apiUrl = `${import.meta.env.VITE_API_URL}api/addupdate/combo/product`;
    const formData = new FormData();
    const mode = productId ? "2" : "1";
    formData.append("Id", productId || 0 );
    formData.append("Name", productData.productName?.trim() || "");
    formData.append("Description", description?.trim() || "");
    formData.append(
      "MainDepartmentId",
      productData.mainDepartment?.toString() || "0"
    );
    formData.append(
      "SubDepartmentId",
      productData.subDepartment?.toString() || "0"
    );
    formData.append("Cost", productData.cost?.toString() || "0");
    formData.append("Barcode", barcode?.trim() || "");
    formData.append(
      "SellingPrice",
      productData.sellingPrice?.toString() || "0"
    );
    formData.append("IsModifierItem", "0");
    formData.append("Mode", mode);
    formData.append("IsProductImageUpdate", "0");
    formData.append("IsBarcodeImageUpdate", "0");
    formData.append("restaurantLoginId", "0");

    // // Add BarcodeImage if file exists
    // const barcodeImageFile = document.getElementById('fileBarcodeImage_ProductForm').files[0];
    // if (barcodeImageFile) {
    //   formData.append("BarcodeImage", barcodeImageFile);
    // }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "multipart/form-data",
        },
      });
console.log(response);
      if (response.status === 200 && response.data.status === 1) {
        // Success Toast

        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        console.log("uuu", response);
        navigate(`/Restaurant/ComboProduct?Id=${response.data.productId}`);
      }else if(response.status === 200 && response.data.status === 2){
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      } else {
        // Application-level error Toast
        Toast.fire({
          icon: "error",
          title: response.data.message || "An unexpected error occurred",
        });
      }
    } catch (error) {
      // Handle HTTP errors
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An error occurred while processing the request",
      });
      console.error("Error:", error);
    }
  };

  const InputBarcodeimage = () => {
    console.log("inputCLicked");
    if (barcode === "" && buttonRef.current) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    fetchFormData();
    getNewProductNumber();
    fetchMainDepartmentList();
    console.log("ProductId", newproductnumber, " ", productId);
  }, [loading]);
  console.log("dd", productData);
  return (
    <div className="tab-pane active" id="AddUpdateProduct_tab">
      <div
        className="main_deapt"
        style={{ margin: "20px 5px 0px", borderRadius: "10px" }}
      >
        <form
          onSubmit={handleInsertUpdateProduct}
          className="new_customer-wrap"
        >
          <input type="hidden" id="hdn_PId" value="332" />
          <input
            type="hidden"
            id="hdn_DefaultOpenSection_AddUpdateProduct"
            value="0"
          />

          {/* Product Number */}
          <div className="row custom_add_pro_rpw">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0">
                <label htmlFor="txtProductNumber_ProductForm">
                  PRODUCT NO.
                </label>
                <input
                  type="text"
                  className="form-control IsNumeric"
                  id="txtProductNumber_ProductForm"
                  name="productNumber"
                  value={productId ? productId : newproductnumber}
                  readOnly
                />
              </div>
            </div>

            {/* Selling Price */}
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0">
                <label htmlFor="txtSellingPrice_ProductForm">
                  SELLING PRICE
                </label>
                <input
                  type="text"
                  className="form-control IsDecimal"
                  id="txtSellingPrice_ProductForm"
                  name="sellingPrice"
                  value={productData.sellingPrice}
                  onChange={handleChange}
                />
                <div
                  id="sellingPrice_error_ProductForm"
                  className="errorsClass2"
                ></div>
              </div>
            </div>
          </div>

          {/* Product Name and Cost */}
          <div className="row custom_add_pro_rpw">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0 flex flex-col">
                <label htmlFor="txtProductName_ProductForm">
                  NAME <span className="requiredFieldClass">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="txtProductName_ProductForm"
                    name="productName"
                    value={productData.productName}
                    onChange={handleChange}
                  />
                  {productFromError && (
                    <div
                      id="txtProductName_error_ProductForm"
                      className="errorsClass2"
                    >
                      {productFromError.productName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cost */}
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0">
                <label htmlFor="txtCost_ProductForm">COST</label>
                <input
                  type="text"
                  className="form-control IsDecimal"
                  id="txtCost_ProductForm"
                  name="cost"
                  value={productData.cost}
                  onChange={handleChange}
                />
                <div
                  id="txtCost_error_ProductForm"
                  className="errorsClass2"
                ></div>
              </div>
            </div>
          </div>

          {/* Description and Departments */}
          <div className="row custom_add_pro_rpw">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="row row-gap">
                <div className="col-12">
                  <div className="form-group aline_input mb-0">
                    <label htmlFor="txtDescription_ProductForm">
                      DESCRIPTION
                    </label>
                    <div className="d-flex flex-column">
                      <textarea
                        className="form-control textareaFieldStyle"
                        id="txtDescription_ProductForm"
                        name="txtDescription_ProductForm"
                        style={{ height: "85px" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <div
                        id="txtDescription_error_ProductForm"
                        className="errorsClass2"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group aline_input mb-0">
                    <label htmlFor="ddlMainDepartment_ProductForm">
                      MAIN DEPARTMENT{" "}
                      <span className="requiredFieldClass">*</span>
                    </label>
                    <div className="d-flex flex-column">
                      <div className="select_box add_pro_sel">
                        <select
                          className="form-control"
                          id="ddlMainDepartment_ProductForm"
                          name="ddlMainDepartment_ProductForm"
                          defaultValue={productData.mainDepartmentId}
                          onChange={(e) =>
                            handleMainDepartmentChange(e.target.value)
                          }
                        >
                          <option value="0">Select Main Department</option>
                          {mainDepartmentList.length > 0 &&
                            mainDepartmentList.map((depdata, index) => (
                              <option key={index} value={depdata.Id}>
                                {depdata.Name}
                              </option>
                            ))}
                        </select>
                      </div>
                      {productFromError && (
                        <div
                          id="ddlMainDepartment__error_ProductForm"
                          className="errorsClass2"
                        >
                          {productFromError.mainDepartment}
                        </div>
                      )}
                    </div>
                    <a
                      onClick={() => setIsMainDepartmentModal(true)}
                      className="cursor-pointer"
                    >
                      ADD NEW
                    </a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group aline_input mb-0">
                    <label htmlFor="ddlSubDepartment_ProductForm">
                      SUB DEPARTMENT{" "}
                      <span className="requiredFieldClass">*</span>
                    </label>
                    <div className="d-flex flex-column">
                      <div className="select_box add_pro_sel">
                        <select
                          className="form-control"
                          id="ddlSubDepartment_ProductForm"
                          name="ddlSubDepartment_ProductForm"
                          value={productData.subDepartment}
                          onChange={(e) =>
                            setProductData((prevData) => ({
                              ...prevData,
                              subDepartment: e.target.value, // Update the subDepartment value
                            }))
                          }
                        >
                          <option value="0">Select</option>
                          {subDepartment?.length > 0 &&
                            subDepartment.map((subDep) => (
                              <option key={subDep.Id} value={subDep.Id}>
                                {subDep.Name}
                              </option>
                            ))}
                        </select>
                      </div>
                      {productFromError && (
                        <div
                          id="ddlSubDepartment_error_ProductForm"
                          className="errorsClass2"
                        >
                          {productFromError.subDepartment}
                        </div>
                      )}
                    </div>
                    <a
                      onClick={() => setIsSubDepartmentModal(true)}
                      className="cursor-pointer"
                    >
                      ADD NEW
                    </a>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="form-group aline_input wrap_costs mb-0"
                    style={{ width: "101%" }}
                  >
                    <label htmlFor="txtBarcode_ProductForm">BARCODE</label>
                    <div className="d-flex flex-column">
                      <input
                        type="text"
                        className="form-control mb-1"
                        id="txtBarcode_ProductForm"
                        name="txtBarcode_ProductForm"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                      />
                      <div
                        id="txtBarcode_error_ProductForm"
                        className="errorsClass2"
                      ></div>
                      <div>
                        {barcodeImage && (
                          <img
                            src={barcodeImage}
                            style={{ width: "100%" }}
                            alt="Barcode Preview"
                          />
                        )}
                        <input
                          className="d-none"
                          ref={buttonRef}
                          type="file"
                          accept="image/*"
                          id="fileBarcodeImage_ProductForm"
                          onClick={() => {
                            console.log("clicked");
                          }}
                          onChange={(e) =>
                            handleImageChange(e, setBarcodeImage)
                          }
                        />
                      </div>
                    </div>
                    {barcodeImage ? (
                      <a
                        onClick={() => setBarcodeImage(null)}
                        className="cursor-pointer"
                      >
                        {" "}
                        REMOVE{" "}
                      </a>
                    ) : (
                      <a
                        onClick={() => InputBarcodeimage()}
                        className="cursor-pointer"
                      >
                        {" "}
                        ADD-IMAGE{" "}
                      </a>
                    )}

                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <div className="row row-gap">
                <div className="col-12">
                  <div className="upload_files-warps">
                    <div className="upload-btn-wrapper">
                      <button className="btn p-1">
                        {productImage && (
                          <img
                            src={productImage}
                            style={{ width: "100%" }}
                            alt="Product Preview"
                          />
                        )}
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        id="fileProductImage_ProductForm"
                        onChange={(e) => handleImageChange(e, setProductImage)}
                      />
                    </div>
                    <div
                      className="add_delete-warsp"
                      style={{ paddingLeft: "26px" }}
                    >
                      <p className="buttons_wraps_add">
                        <button
                          type="button"
                          className="add_button_pro ProductPageBtnCommanClass"
                          onClick={() => setProductImage(null)}
                        >
                          ADD
                        </button>
                      </p>
                      <p className="buttons_wraps_delete">
                        <button
                          type="button"
                          className="add_button_pro ProductPageBtnCommanClass"
                          onClick={() => setProductImage(null)}
                        >
                          DELETE
                        </button>
                      </p>
                    </div>
                  </div>
                  <div
                    id="fileProductImage_error_ProductForm"
                    className="errorsClass2"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <div className="text-end flex">
              <a href="/Restaurant/ManageProducts/">
                <button
                  type="button"
                  className="ml-2 btm_button_pro btm_button_pro_sm ProductPageBtnCommanClass"
                >
                  BACK
                </button>
              </a>
              <button
                type="button"
                className="btm_button_pro btm_button_pro_sm ProductPageBtnCommanClass"
                onClick={handleInsertUpdateProduct}
                style={{ marginRight: "20px" }}
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
      {isMainDepartmentModal && (
        <MainDepartmentModal
          onClose={closeCreateMainDepartmentPopup}
          editModal={false}
          onCreateMainDepartment={(action, departmentValue) => {
            console.log("mode:", action);
            updateMaindepartmentData(action, departmentValue);
          }}
        />
      )}

      {isSubDepartmentModal && (
        <div
          className="modal show fixed inset-0 z-1000 bg-black bg-opacity-50 flex items-center justify-center"
          id="CreateSubDepartment_Modal"
          aria-modal="true"
          role="dialog"
          style={{ display: "block", paddingLeft: "0px" }}
        >
          <div className="modal-dialog cstm_modal_dialog">
            <div className="modal-content plus_modal_cont">
              {/* Modal Header */}
              <div className="modal-header plus_modal_head">
                <h4
                  id="heading_Title_SubDepartmentModal"
                  className="modal-title plus_head_popup"
                >
                  Add Department
                </h4>
              </div>

              {/* Modal Body */}
              <div className="modal-body new_modal_work">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Main Department Dropdown */}
                  <div className="form-group pop-up_drop">
                    <div className="select_box">
                      <select
                        className="form-control"
                        {...register("mainDepartment", {
                          required: "Please select main-department!",
                        })}
                      >
                        <option value="0">Select Main Department</option>
                        {mainDepartmentList &&
                          mainDepartmentList.length > 0 &&
                          mainDepartmentList.map((depdata, index) => (
                            <option key={index} value={depdata.Id}>
                              {depdata.Name}
                            </option>
                          ))}
                      </select>
                      {err.mainDepartment && (
                        <span className="errorsClass2">
                          {err.mainDepartment.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sub Department Name */}
                  <div className="form-group plus_from_group">
                    <input
                      type="text"
                      className="form-control plus_imput_feild"
                      placeholder="Enter Department Name"
                      {...register("subDepartmentName", {
                        required: "Please enter sub-department!",
                      })}
                    />
                    {err?.subDepartmentName && (
                      <span className="errorsClass2">
                        {err.subDepartmentName.message}
                      </span>
                    )}
                  </div>

                  {/* Modal Bottom Buttons */}
                  <div className="modal-bottom plus_modal_bottom">
                    <button
                      type="button"
                      className="cstm_model_plusbtn_1 btn btn-danger"
                      onClick={() => setIsSubDepartmentModal(false)} // Close modal
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="cstm_model_plusbtn_2 btn btn-danger"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? "Processing..." : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboProductAddProductForm;
