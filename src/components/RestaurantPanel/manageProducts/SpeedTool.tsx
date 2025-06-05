import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select, { MultiValue } from 'react-select';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

interface productList {
  ProductNumber: number;
  Name: string;
  SubDepartmentName: string,
}
interface DepartmentList {
  Id: number;
  Name: string;
  // SubDepartmentName:string,
}

interface OptionType {
  value: string;
  label: string;
}

interface printersList {
  Id: number;
  PrinterName: string;
  Printer_HardwareDeviceId: number;
  IsKitchenPrinter: number
}

interface FormData {
  actionTypeIds: string[];
  rangeId: number;
  departmentFromId: string | null;
  departmentToId: string | null;
  productFromNumber: string | null;
  productToNumber: string | null;
  printerIds: string;
  modifierProductId: string;
  webmenuVisibilityStatus: number;
  posVisibilityStatus: number;
  kioskVisibilityStatus: number;
  tableqrVisibilityStatus: number;
  storeqrVisibilityStatus: number;
  customerVisibilityStatus: number;
  status: number;
  restaurantLoginId: number;
}


const SpeedTool: React.FC = () => {

  const [productList, setProductList] = React.useState<productList[]>([]);
  const [departmentList, setDepartmentList] = React.useState<DepartmentList[]>([]);
  const [modifiersList, setModifiersList] = React.useState<DepartmentList[]>([]);
  const [printers, setPrinters] = React.useState<printersList[]>([]);
  const [selectedPrinters, setSelectedPrinters] = useState<string[]>([]);
  const UserToken_Global = localStorage.getItem("authToken");

  const options: OptionType[] = [
    { value: '1', label: 'Setup Printer' },
    { value: '2', label: 'Setup Modifier' },
    { value: '3', label: 'Setup Visibility' },
  ];
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      actionTypeIds: [],
      customerVisibilityStatus: 0,
      printerIds: "",
      restaurantLoginId: 0,
      webmenuVisibilityStatus: 0,
      posVisibilityStatus: 0,
      kioskVisibilityStatus: 0,
      tableqrVisibilityStatus: 0,
      storeqrVisibilityStatus: 0,
      modifierProductId: "0",
      rangeId: 0,
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Update visibility statuses based on actionTypeIds
    if (data.actionTypeIds.includes('3')) {
      if (data.kioskVisibilityStatus) {
        setValue('kioskVisibilityStatus', 1);
      }
      if (data.posVisibilityStatus) {
        setValue('posVisibilityStatus', 1);
      }
      if (data.tableqrVisibilityStatus) {
        setValue('tableqrVisibilityStatus', 1);
      }
      if (data.storeqrVisibilityStatus) {
        setValue('storeqrVisibilityStatus', 1);
      }
    } else {
      setValue('storeqrVisibilityStatus', 0);
      setValue('tableqrVisibilityStatus', 0);
      setValue('posVisibilityStatus', 0);
      setValue('kioskVisibilityStatus', 0);
    }

    if (data.rangeId <= 0) {
      toast.error('Please select a Range!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;

    } else if (data.productFromNumber && data.productToNumber && parseInt(data.productFromNumber) > parseInt(data.productToNumber)) {
      toast.error('Invalid product range!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    } else if (data.departmentFromId && data.departmentToId && parseInt(data.departmentFromId) > parseInt(data.departmentToId)) {
      toast.error('Invalid department range!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    } else if (data.actionTypeIds.length <= 0) {
      toast.error('Please Select action Type!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    } else if (data.actionTypeIds.includes('2') && data?.modifierProductId === "0") {
      toast.error('Please select modifier product from list!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    else if (!data.actionTypeIds.includes('2')) {
      setValue('modifierProductId', "0");
    }
    const updatedValues = getValues();

    const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/submit/multiitemsprogramming`
    try {
      const response = await axios.post(apiUrl, updatedValues, {
        headers: {
          'Authorization': `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200 && response.data.status === 1) {

        toast.success(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      else {
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
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
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
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
      }
    }

  };


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, printerId: string) => {

    if (event.target.checked) {
      setSelectedPrinters((prev) => {
        const newSelectedPrinters = [...prev, printerId];
        setValue('printerIds', newSelectedPrinters.join(','));
        return newSelectedPrinters;
      });
    } else {
      setSelectedPrinters((prev) => {
        const newSelectedPrinters = prev.filter((id) => id !== printerId);
        setValue('printerIds', newSelectedPrinters.join(','));
        return newSelectedPrinters;
      });
    }
  };
  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedOptions(selectedOptions);
    const selectedValues = selectedOptions.map(option => option.value);
    setValue('actionTypeIds', selectedValues);
  };

  const isSetupPrinterVisible = selectedOptions.some((option) => option.value === '1');
  const isSetupModifierVisible = selectedOptions.some((option) => option.value === '2');
  const isSetupVisibilityVisible = selectedOptions.some((option) => option.value === '3');

  const getProductList = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/active/product/list/ascendingby/productnumber?restaurantLoginId=0`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${UserToken_Global}`
        }
      });

      if (response.status === 200 && response.data.status === 1) {
        const products = response.data.data.products;
        if (Array.isArray(products) && products.length > 0) {
          const productList = products.map(product => ({
            ProductNumber: product.ProductNumber,
            Name: product.Name,
            SubDepartmentName: product.SubDepartmentName
          }));
          setProductList(productList);
        }
      }
      else {
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
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
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
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
      }
    }
  };

  const getSubDepartmentList = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/active/subdepartment/list/ascendingby/id?restaurantLoginId=0`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${UserToken_Global}`
        }
      });

      if (response.status === 200 && response.data.status === 1) {
        const department = response.data.data.subDepartments;
        if (Array.isArray(department) && department.length > 0) {
          const departmentList = department.map(product => ({
            Id: product.Id,
            Name: product.Name
          }));
          setDepartmentList(departmentList);
        }
      }
      else {
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
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
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
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
      }
    }
  };

  const getPrintList = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/active/printers/list/all?restaurantLoginId=0`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${UserToken_Global}`
        }
      });

      if (response.status === 200 && response.data.status === 1) {
        const printers = response.data.data.printersList;
        if (Array.isArray(printers) && printers.length > 0) {
          const printersList = printers.map(product => ({
            Id: product.Id,
            PrinterName: product.PrinterName,
            Printer_HardwareDeviceId: product.Printer_HardwareDeviceId,
            IsKitchenPrinter: product.IsKitchenPrinter
          }));
          setPrinters(printersList);
        }
      }

      else {
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
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
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
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
      }
    }
  };

  const getAllModifierList = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}api/get/products/havingmodifiers?restaurantLoginId=0`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${UserToken_Global}`
        }
      });
      if (response.status === 200 && response.data.status === 1) {
        const modifiers = response.data.data.productsList
        if (Array.isArray(modifiers) && modifiers.length > 0) {
          const departmentList = modifiers.map(product => ({
            Id: product.Id,
            Name: product.Name
          }));
          setModifiersList(departmentList);
        }

      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
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
      }
    }
  }

  const handleRangeChange = (feildName: keyof FormData, value: string) => {

    if (feildName == "departmentFromId" || feildName === "departmentToId") {
      setValue(feildName, value);
      setValue('productFromNumber', "0");
      setValue('productToNumber', "0");
      setValue('rangeId', 2);
    }
    else if (feildName == "productFromNumber" || feildName === "productToNumber") {
      setValue(feildName, value);
      setValue('departmentFromId', "0");
      setValue('departmentToId', "0");
      setValue('rangeId', 1);
    }
  }

  useEffect(() => {
    getProductList();
    getSubDepartmentList();
    getPrintList();
    getAllModifierList();

  }, [])

  return (
    <div id="contentWrapper_RestaurantLayout" className="content-wrapper min-h-full !pt-[64px] -translate-y-14">
      <ToastContainer />
      <div className="top_area_row ">
        <div className="row pt-1">
          <div className="col-sm-8">
            <nav>
              <div className="pl-1 main_nav_bread pt-5">
                <ol className="sm:translate-x-2  breadcrumb pl-3 my-0 sm:my-2">
                  <li className="breadcrumb-item nav_bread_one ">
                    <Link className="fs-6 fw-bold" to="/Restaurant/ManageProducts">
                      Products
                    </Link>
                  </li>
                  <li className="breadcrumb-item nav_right pl-2 ">
                    <a href=""
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
                      Speed Tool
                    </Link>
                  </li>
                </ol>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-0 wrap_tabs-products sidebar_ul-nav_tabs wrao_sidebrs">
          <div className="tab-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div id="AddUpdateProduct_tab" className="tab-pane active">
                <div className="main_deapt !p-2 py-4" style={{ borderRadius: '10px' }}>
                  <div className="pro-range">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label htmlFor="ddlProduct" className="p-0 col-sm-3 col-form-label">
                            Product Range
                          </label>
                          <div className="col-sm-9">
                            <select
                              id="ddlProduct"
                              className="form-control ddlProduct"
                              {...register('productFromNumber')}
                              onChange={(e) => handleRangeChange('productFromNumber', e.target.value)}
                            >
                              <option value="0">Select</option>
                              {productList?.map((item) => (
                                <option key={item.ProductNumber} value={item.ProductNumber}>
                                  {item.ProductNumber}-{item.Name} ({item.SubDepartmentName})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label htmlFor="ddlProduct_2" className="p-0 col-sm-3 col-form-label pro-right">
                            To
                          </label>
                          <div className="col-sm-9">
                            <select
                              id="ddlProduct_2"
                              className="form-control ddlProduct"
                              {...register('productToNumber')}
                              onChange={(e) => handleRangeChange('productToNumber', e.target.value)}
                            >
                              <option value="0">Select</option>
                              {productList?.map((item) => (
                                <option key={item.ProductNumber} value={item.ProductNumber}>
                                  {item.ProductNumber}-{item.Name} ({item.SubDepartmentName})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label htmlFor="ddlDepartment" className="p-0 col-sm-3 col-form-label">
                            Department Range
                          </label>
                          <div className="col-sm-9">
                            <select
                              id="ddlDepartment"
                              className="form-control ddlDepartment"
                              {...register('departmentFromId')}
                              onChange={(e) => handleRangeChange('departmentFromId', e.target.value)}
                            >
                              <option value="0">Select</option>
                              {departmentList?.map((item) => (
                                <option key={item.Id} value={item.Id}>
                                  {item.Id} -{item.Name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label htmlFor="ddlDepartment_2" className="p-0 col-sm-3 col-form-label pro-right">
                            To
                          </label>
                          <div className="col-sm-9">
                            <select
                              id="ddlDepartment_2"
                              className="form-control ddlDepartment"
                              {...register('departmentToId')}
                              onChange={(e) => handleRangeChange('departmentToId', e.target.value)}
                            >
                              <option value="0">Select</option>
                              {departmentList?.map((item) => (
                                <option key={item.Id} value={item.Id}>
                                  {item.Id}-{item.Name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label htmlFor="select-action-type" className="p-0 col-sm-3 col-form-label">
                            Action-Type
                          </label>
                          <div className="col-sm-9">
                            <Select
                              isMulti
                              value={selectedOptions}
                              onChange={handleChange}
                              options={options}
                              placeholder="Select"
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Setup Printer */}
                    {isSetupPrinterVisible && (
                      <div id="setup-printer" className="p-2 setup-layer">
                        {printers?.map((item) => (
                          <div key={item.Id} className="col-md-12 col-lg-12 col-sm-12 product_availability-wrap my-2 ps-2 p-0">
                            <div className="row">
                              <div className="col-md-10 col-lg-10 col-sm-10 col-10">
                                <p className="product_item-name">
                                  <span style={{ fontSize: '18px', fontWeight: 500 }}>
                                    {item.PrinterName} ({item.Printer_HardwareDeviceId})
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-2 col-lg-2 col-sm-2">
                                <div style={{ textAlign: 'left', marginRight: '10px', marginTop: '9px' }}>
                                  <input
                                    id={`chkPrinter_${item.Id}_PrinterAllocation_AddUpdateProduct`}
                                    type="checkbox"
                                    value={item.Id}
                                    className="chkPrinterAllocationCommonClass"
                                    style={{
                                      cursor: item.IsKitchenPrinter === 1 ? 'no-drop' : '',
                                      height: '20px',
                                      width: '20px',
                                      marginLeft: '20px',
                                      opacity: item.IsKitchenPrinter === 1 ? '0.5' : '',
                                    }}
                                    disabled={item.IsKitchenPrinter === 1}
                                    onChange={(e) => handleCheckboxChange(e, String(item.Id))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Setup Modifier */}
                    {isSetupModifierVisible && (
                      <div className="setup-layer" id="setup-modifier">
                        <div className="form-group row">
                          <label htmlFor="ddlModifier" className="col-sm-3 col-form-label">
                            Select Product
                          </label>
                          <div className="col-sm-9">
                            <select
                              id="ddlModifier"
                              className="form-control"
                              {...register('modifierProductId')}
                            >
                              <option value="0">Select</option>
                              {modifiersList?.map((item) => (
                                <option key={item.Id} value={item.Id}>
                                  {item.Name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Setup Visibility */}
                    {isSetupVisibilityVisible && (
                      <div id="setup-visibility">
                        <div className="switch-1">
                          <div className="row">
                            <div className="col-8 col-md-6">
                              <p>Kiosk</p>
                            </div>
                            <div className="col-4 col-md-6">
                              <div>
                                <label className="switch round_wraps">
                                  <input
                                    type="checkbox"
                                    // value="2"
                                    defaultChecked
                                    {...register('kioskVisibilityStatus')}
                                  // onChange={(e) => handleVisibilityChange('kioskVisibilityStatus', e.target.checked)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="switch-1">
                          <div className="row">
                            <div className="col-8 col-md-6">
                              <p>POS</p>
                            </div>
                            <div className="col-4 col-md-6">
                              <div>
                                <label className="switch round_wraps">
                                  <input
                                    type="checkbox"
                                    // value="1"
                                    defaultChecked
                                    {...register('posVisibilityStatus')}
                                  // onChange={(e) => handleVisibilityChange('posVisibilityStatus', e.target.checked)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="switch-1">
                          <div className="row">
                            <div className="col-8 col-md-6">
                              <p>Table-QR</p>
                            </div>
                            <div className="col-4 col-md-6">
                              <div>
                                <label className="switch round_wraps">
                                  <input
                                    type="checkbox"
                                    // value="5"
                                    defaultChecked
                                    {...register('tableqrVisibilityStatus')}
                                  // onChange={(e) => handleVisibilityChange('tableqrVisibilityStatus', e.target.checked)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="switch-1">
                          <div className="row">
                            <div className="col-8 col-md-6">
                              <p>Store-QR</p>
                            </div>
                            <div className="col-4 col-md-6">
                              <div>
                                <label className="switch round_wraps">
                                  <input
                                    type="checkbox"
                                    // value="6"
                                    defaultChecked
                                    {...register('storeqrVisibilityStatus')}
                                  // onChange={(e) => handleVisibilityChange('storeqrVisibilityStatus', e.target.checked)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Submit Button */}
                    <div className="pro-btns flex gap-4">
                      <button type="submit" className="pro-save save-multi-items">
                        Submit
                      </button>
                      <button type="reset" className="pro-cancel">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SpeedTool;
