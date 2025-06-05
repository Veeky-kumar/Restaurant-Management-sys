import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from "sweetalert2";
import MainDepartmentModal from './Models/MainDepartmentModal';
import { useNavigate } from 'react-router-dom';
import CropImageModal from './Models/CropImageModal';

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

interface DepartmentResponse {
  Id: number;
  Name: string;
}

type Props = {
  productId: number;
};

const AddProductForm: React.FC<Props> = ({ productId }) => {
  const [productData, setProductData] = useState({
    productNumber: '',
    sellingPrice: '',
    productName: '',
    cost: '',
    description: '',
    mainDepartment: '',
    subDepartment: '',
    barcode: '',
    productImage: "0",
    barcodeImage: null,
    recommended: "0",
    featuredProduct: "0",
    forceSelling: "0",
    ProductImage_LiveURL: ''
  });
  const [newproductnumber, setNewProductNumber] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [mainDepartment, setMainDepartment] = useState('0');
  const [barcode, setBarcode] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [barcodeImage, setBarcodeImage] = useState<File | null>(null);
  const [recommended, setRecommended] = useState("0");
  const [featuredProduct, setFeaturedProduct] = useState("0");
  const [forceSelling, setForceSelling] = useState("0");
  const [mainDepartmentList, setMainDepartmentList] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subDepartment, setSubDepartment] = useState<DepartmentResponse[]>([]);
  const [isMainDepartmentModal, setIsMainDepartmentModal] = useState<boolean>(false);
  const [isSubDepartmentModal, setIsSubDepartmentModal] = useState<boolean>(false);
  const [subDepartmentName, setSubDepartmentName] = useState<string>("")
  const [barcodeImageUrl, setBarcodeImageUrl] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const buttonRef = useRef<HTMLInputElement>(null);
  const productButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    console.log("Modal canceled");
    setIsModalOpen(false);
  };
  const [errors, setErrors] = useState({
    mainDepartment: "",
    departmentName: "",
  });
  const [productFromError, setProductFormError] = useState({
    productName: '',

    mainDepartment: '',
    subDepartment: '',
  })

  const UserToken_Global = localStorage.getItem("authToken");


  const getProductById = async (productId: number) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/single/product?Id=${productId}&restaurantLoginId=0`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const data = response.data.data.products[0];

        setProductData({
          productNumber: data.ProductNumber.toString(),
          sellingPrice: data.SellingPrice.toString(),
          productName: data.Name || "",
          cost: data.Cost.toString(),
          description: data.Description || "",
          mainDepartment: data.MainDepartmentId.toString(),
          subDepartment: data.SubDepartmentId.toString(),
          barcode: data.ProductBarcode?.toString() || "",
          productImage: data.ProductImageName || "0",
          barcodeImage: null,
          recommended: data.IsRecommended.toString(),
          featuredProduct: data.IsFeaturedProduct.toString(),
          forceSelling: data.IsForceSelling.toString(),
          ProductImage_LiveURL: data.ProductImage_LiveURL,
        });
        setCroppedImageUrl(data.ProductImage_LiveURL);
        data.ProductBarcodeImage === "" ? setBarcodeImageUrl(null) : setBarcodeImageUrl(`http://posofficialnew.protoshopp.in/${data.ProductBarcodeImage}`)
        handleMainDepartmentChange(data.MainDepartmentId);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? (checked ? "1" : "0") : value,
    });
  };
  const closeCreateMainDepartmentPopup = () => {
    setIsMainDepartmentModal(false);
  };

  const validateFields = (): boolean => {
    let isValid = true;
    const newErrors = {
      mainDepartment: "",
      departmentName: "",
      printGroup: "",
      image: "",
    };

    if (mainDepartment === '') {
      newErrors.mainDepartment = "Please select a main department.";
      isValid = false;
    }

    if (!subDepartmentName.trim()) {
      newErrors.departmentName = "Please enter a department name.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleMainDepartmentChange = async (mainDepartmentId: string) => {

    setProductData((prevData) => ({
      ...prevData,
      mainDepartment: mainDepartmentId,
    }))
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/active/subdepartment/listByMainDepartment?restaurantLoginId=${0}&mainDepartmentId=${mainDepartmentId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json"
      }
    });
    if (response.data.status === 1 && response.status === 200) {
      const data = response.data.data.subDepartments;
      setSubDepartment(data.map((item: any) => ({ Id: item.Id, Name: item.Name })));

    }
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setBarcodeImageUrl(URL.createObjectURL(file)); 
    }
  };

  const handleProductImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setProductImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setProductImageUrl(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  }

  //Get The new Product Number
  const getNewProductNumber = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/product/newproductnumber?restaurantLoginId=0`
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${UserToken_Global}`,
        "Content-Type": "application/json",
      }
    });
    if (response.status === 200) {
      setNewProductNumber(response.data.data.productNumber);
    }

  }

  //get main department List
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

  const validateProductFrom = () => {
    let isValid = true;
    const productFromErrors = {
      // productNumber: '',
      productName: '',
      // productDescription: '',
      mainDepartment: '',
      subDepartment: '',
      // sellinPrice: '',
      // costPrice: '',
    }
    if (productData.productName === '') {
      productFromErrors.productName = "Please enter product name";
      isValid = false;
    }
    if (productData.mainDepartment === '') {
      productFromErrors.mainDepartment = "Please select a main department.";
      isValid = false;
    }
    if (productData.subDepartment === '') {
      productFromErrors.subDepartment = "Please select a sub department.";
      isValid = false
    }
    setProductFormError(productFromErrors);
    return isValid;

  }
  //Add and Update Product

  const submitForm = async () => {
    handleInsertUpdateProduct();
    updateProductImage(productId);
  }



  const updateProductImage = async (Id: number) => {
    const data = {
      productId: Id,
      image: croppedImageUrl,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/product/upload/image`, data, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

    } catch (error) {
      console.error("Error uploading the product image:", error);
    }
  };


  const handleInsertUpdateProduct = async () => {

    if (!validateProductFrom()) return;
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/addupdate/product`;
    const formData = new FormData();
    const mode = productId !== 0 ? 2 : 1;
    formData.append("Id", String(productId));
    formData.append("Name", productData.productName);
    formData.append("Description", description);
    formData.append("MainDepartmentId", productData.mainDepartment);
    formData.append("SubDepartmentId", productData.subDepartment);
    formData.append("Cost", productData.cost);
    formData.append("Barcode", barcode);
    formData.append("SellingPrice", productData.sellingPrice);
    formData.append("IsModifierItem", "0");
    formData.append("Mode", String(mode));
    // formData.append("IsProductImageUpdate", IsProductImageUpdate_Global);
    formData.append("IsProductImageUpdate", "0");
    formData.append("IsBarcodeImageUpdate", barcodeImage ? 1 : 0);
    formData.append("restaurantLoginId", "0");
    formData.append('BarcodeImage', barcodeImage)
    formData.append("Recommended", String(recommended));
    formData.append("FeaturedProduct", String(featuredProduct));
    formData.append("ForceSelling", String(forceSelling));
    try {

      setLoading(true);
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "multipart/form-data",
        }
      });
      if (response.status === 200 || response.data.status === 1) {
        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
        navigate(`/Restaurant/Product?productId=${response.data.productId}`);
      }
      else {
        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
      }
    }
    catch {

    }
    finally {
      setLoading(false);
    }
  }

  const updateMaindepartmentData = async (action: number, department: string) => {
    const token = localStorage.getItem("authToken")
    const apiUrl = `${import.meta.env.VITE_API_URL}api/addupdate/maindepartment`

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
          mimeType: 'multipart/form-data',

        }
      })
      if (response.status === 200 && response.data.status === 1) {
        // setIsLoading(false);
        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
      }
      else if (response.data.status === -2) {
        Toast.fire({
          icon: 'error',
          title: response.data.message,
        });
      }

    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: "failed to update main department Data",
      });
    }
    finally {
      setIsMainDepartmentModal(false);
      fetchMainDepartmentList();

    }
  }

  const handleAddUpdateDepartment = async () => {

    if (!validateFields()) return;
    try {
      let response;
      const formData = new FormData();
      formData.append("mode", "1");
      formData.append("mainDepartmentId", mainDepartment);
      formData.append("name", subDepartmentName);
      response = await axios.post(`${import.meta.env.VITE_API_URL}/api/addupdate/subdepartment`, formData, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "multipart/form-data",
        },
      });


      if (response?.data?.status === 1 && response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });

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
    }
    finally {
      setLoading(false);
      setIsSubDepartmentModal(false);
    }
  };

  const InputBarcodeimage = () => {
    if (barcode === "" && buttonRef.current) {
      buttonRef.current.click();
    }
  };
  const InputProductimage = () => {
    if (barcode === "" && productButtonRef.current) {
      productButtonRef.current.click();
    }
  };

  useEffect(() => {
    if (productId) {
      getProductById(productId);
      setNewProductNumber(productId);
    }
    else {
      getNewProductNumber();
    }
    fetchMainDepartmentList();

  }, [loading, mainDepartment])

  return (
    <>
      <div className="tab-pane active" id="AddUpdateProduct_tab">
        {loading && (<div style={{
          backgroundColor: "#f0f5f0",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "300%",
          zIndex: 999999999999999,
          MozOpacity: 0.2,
          opacity: 0.2,
        }}>
          <img src="/Content/Images/Loader.gif" style={{
            backgroundColor: "#9af58c",
            alignItems: "center",
            position: "fixed",
            top: "40%",
            width: "10%",
            left: "50%",
          }} />
        </div>)}
      <div className="main_deapt !p-0 py-3 sm:py-0 sm:!p-5 " style={{ margin: '20px 5px 0px', borderRadius: '10px' }}>
          <form className="new_customer-wrap">
          <input type="hidden" id="hdn_PId" value="332" />
          <input type="hidden" id="hdn_DefaultOpenSection_AddUpdateProduct" value="0" />

          {/* Product Number */}
          <div className="row custom_add_pro_rpw">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0">
                <label htmlFor="txtProductNumber_ProductForm">PRODUCT NO.</label>
                <input
                  type="text"
                  className="form-control IsNumeric"
                  id="txtProductNumber_ProductForm"
                  name="productNumber"
                    value={productId !== 0 ? productData.productNumber : newproductnumber}
                  readOnly
                />
              </div>
            </div>

            {/* Selling Price */}
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group aline_input mb-0">
                <label htmlFor="txtSellingPrice_ProductForm">SELLING PRICE</label>
                <input
                  type="text"
                  className="form-control IsDecimal"
                  id="txtSellingPrice_ProductForm"
                  name="sellingPrice"
                  value={productData.sellingPrice}
                  onChange={handleChange}
                />
                <div id="sellingPrice_error_ProductForm" className="errorsClass2"></div>
              </div>
            </div>
          </div>

          {/* Product Name and Cost */}
          <div className="row custom_add_pro_rpw">
            <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group aline_input mb-0 flex flex-col">
                <label htmlFor="txtProductName_ProductForm">NAME <span className="requiredFieldClass">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="txtProductName_ProductForm"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  />
              </div>
                {productFromError && (
                  <div id="txtProductName_error_ProductForm" className="errorsClass2">{productFromError.productName}</div>)}
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
                <div id="txtCost_error_ProductForm" className="errorsClass2"></div>
              </div>
            </div>
            </div>
 {/* Description and Departments */}
          <div className="row custom_add_pro_rpw">
      <div className="col-12 col-md-6 col-lg-6">
        <div className="row row-gap">
          <div className="col-12">
            <div className="form-group aline_input mb-0">
              <label htmlFor="txtDescription_ProductForm">DESCRIPTION</label>
              <div className="d-flex flex-column">
                <textarea
                  className="form-control textareaFieldStyle"
                  id="txtDescription_ProductForm"
                  name="txtDescription_ProductForm"
                  style={{ height: '85px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div id="txtDescription_error_ProductForm" className="errorsClass2"></div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group aline_input mb-0">
              <label htmlFor="ddlMainDepartment_ProductForm">
                MAIN DEPARTMENT <span className="requiredFieldClass">*</span>
              </label>
              <div className="d-flex flex-column">
                <div className="select_box add_pro_sel">
                  <select
                    className="form-control"
                    id="ddlMainDepartment_ProductForm"
                    name="ddlMainDepartment_ProductForm"
                            value={productData.mainDepartment}
                            onChange={(e) => handleMainDepartmentChange(e.target.value)}
                          >
                            <option value="0">Select Main Department</option>
                            {mainDepartmentList.length > 0 && mainDepartmentList.map((depdata, index) => (
                              <option key={index} value={depdata.Id}>{depdata.Name}</option>)
                            )}
                    {/* Additional options */}
                  </select>
                        </div>
                      </div>
                      {productFromError && (
                        <div id="ddlMainDepartment__error_ProductForm" className="errorsClass2">{productFromError.mainDepartment}</div>)}
                      <a onClick={() => setIsMainDepartmentModal(true)} className='cursor-pointer'>ADD NEW</a>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group aline_input mb-0">
              <label htmlFor="ddlSubDepartment_ProductForm">
                SUB DEPARTMENT <span className="requiredFieldClass">*</span>
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
                            {subDepartment?.length > 0 && subDepartment.map((subDep) => (
                              <option value={subDep.Id}>{subDep.Name}</option>
                            ))}
                  </select>
                        </div>
                        {productFromError && (<div id="ddlSubDepartment_error_ProductForm" className="errorsClass2">{productFromError.subDepartment}</div>)}
                <div id="ddlSubDepartment_error_ProductForm" className="errorsClass2"></div>
              </div>
                      <a onClick={() => setIsSubDepartmentModal(true)} className='cursor-pointer' >ADD NEW</a>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group aline_input wrap_costs mb-0" style={{ width: '101%' }}>
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
                <div id="txtBarcode_error_ProductForm" className="errorsClass2"></div>
                <div>
                          {barcodeImageUrl && <img src={barcodeImageUrl} style={{ width: '100%' }} alt="Barcode Preview" />}
                  <input
                            className="d-none"
                            ref={buttonRef}
                    type="file"
                    accept="image/*"
                            id="fileBarcodeImage_ProductForm"
                            onChange={(e) => handleImageChange(e, setBarcodeImage)}
                  />
                </div>
                      </div>
                      {barcodeImageUrl ? (<a onClick={() => setBarcodeImageUrl(null)} className='cursor-pointer'> REMOVE </a>) : (<a onClick={() => InputBarcodeimage()} className='cursor-pointer'> ADD-IMAGE </a>)}

            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-6">
        <div className="row row-gap">
          <div className="col-12">
            <div className="checkform !p-0 sm:pl-2">
              <div className='grid grid-cols-3'>
              <label className="switch round_wraps product_option_style">
                <input
                  type="checkbox"
                          checked={recommended === '1'}
                          onChange={(e) => setRecommended(e.target.checked ? '1' : '0')}
                />
                <span className="slider round" style={{ top: '-5px' }}></span>
              </label>
              <label>Recommended</label>
              <div></div>
              </div>
              {/* <br /> */}
              <div className='grid grid-cols-3'>
                <label className="switch round_wraps product_option_style">
                  <input
                    type="checkbox"
                            checked={featuredProduct === "1"}
                            onChange={(e) => setFeaturedProduct(e.target.checked ? '1' : '0')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
                <label> Featured Product</label>
              </div>
              {/* <br /> */}
              <div className='grid grid-cols-3'>
                <label className="switch round_wraps product_option_style">
                  <input
                    type="checkbox"
                            checked={forceSelling === "1"}
                            onChange={(e) => setForceSelling(e.target.checked ? '1' : '0')}
                  />
                  <span className="slider round" style={{ top: '-5px' }}></span>
                </label>
                <label className='pt-1'>Force Selling</label>

              </div>
              <br />
            </div>
          </div>
          <div className="col-12">
            <div className="upload_files-warps f">
              <div className="upload-btn-wrapper">
                <button className="btn p-1">
                          {croppedImageUrl && <img src={croppedImageUrl} style={{ width: '100%' }} alt="Product Preview" />}
                </button>
                        <input
                          ref={productButtonRef}
                  type="file"
                  accept="image/*"
                  id="fileProductImage_ProductForm"
                          onChange={(e) => handleProductImageChange(e, setProductImage)}
                />
              </div>
              <div className="add_delete-warsp pl-2 sm:!pl-[26px]  translate-y-2">
                <p className="buttons_wraps_add">
                          <button type="button" className="add_button_pro ProductPageBtnCommanClass" onClick={InputProductimage}>
                    ADD
                  </button>
                </p>
                <p className="buttons_wraps_delete">
                  <button type="button" className="add_button_pro ProductPageBtnCommanClass" onClick={() => setProductImage(null)}>
                    DELETE
                  </button>
                </p>
              </div>
            </div>
            <div id="fileProductImage_error_ProductForm" className="errorsClass2"></div>
          </div>
        </div>
      </div>
    </div>

        
          {/* Submit Button */}
          <div className="col-12">
      <div className="text-end flex">
        <a href="/Restaurant/ManageProducts/">
          <button type="button" className="ml-2 btm_button_pro btm_button_pro_sm ProductPageBtnCommanClass">
            BACK
          </button>
        </a>
        <button
          type="button"
          className="btm_button_pro btm_button_pro_sm ProductPageBtnCommanClass"
                  onClick={submitForm}
          style={{ marginRight: '20px' }}
        >
          SAVE
        </button>
      </div>
    </div>
        </form>
      </div>
      </div>
      {isMainDepartmentModal && (
        <MainDepartmentModal
          onClose={closeCreateMainDepartmentPopup}
          editModal={false}
          onCreateMainDepartment={(action, departmentValue) => {
            updateMaindepartmentData(action, departmentValue);
          }}
        />
      )}

      {isSubDepartmentModal &&
        (<div
          className="modal show"
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
                <div className="form-group pop-up_drop">
                  <div className="select_box">
                    <select
                      className="form-control"
                      id="ddlMainDepartment_ManageSubDepartment"
                      value={mainDepartment}
                      onChange={(e) => setMainDepartment(e.target.value)}
                    >
                      <option value="0">Select Main Department</option>
                      {mainDepartmentList.length > 0 && mainDepartmentList.map((depdata, index) => (
                        <option key={index} value={depdata.Id}>{depdata.Name}</option>)
                      )}
                    </select>
                  </div>
                  <div
                    id="mainDepartment_error_ManageSubDepartment"
                    className="errorsClass2"
                  ></div>
                </div>
                <div className="form-group plus_from_group">
                  <input
                    type="text"
                    className="form-control plus_imput_feild"
                    id="txtSubDepartmentName_ManageSubDepartment"
                    placeholder="Enter Department Name"
                    value={subDepartmentName}
                    onChange={(e) => setSubDepartmentName(e.target.value)}
                  />
                  <div
                    id="subDepartmentName_error_ManageSubDepartment"
                    className="errorsClass2"
                  ></div>
                </div>
                <div className="modal-bottom plus_modal_bottom">
                  <button
                    id="btnCancel_CreateSubDepartment_Modal"
                    type="button"
                    className="cstm_model_plusbtn_1 btn btn-danger"
                    style={{ display: "none" }}
                  >
                    {/* Hidden Cancel Button */}
                  </button>
                  <button
                    type="button"
                    className="cstm_model_plusbtn_1 btn btn-danger"
                    onClick={() => setIsSubDepartmentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    id="btnSubmit_SubDepartment"
                    type="button"
                    className="cstm_model_plusbtn_2 btn btn-danger"
                    onClick={handleAddUpdateDepartment}
                  >
                    Add
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>)
      }
      <CropImageModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        setCroppedImageUrl={setCroppedImageUrl}
        productImageUrl={productImageUrl}
      />
    </>
  );
};

export default AddProductForm;
