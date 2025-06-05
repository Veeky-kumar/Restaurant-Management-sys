import React, { useEffect, useState } from "react";
import ComboOptionDepartment from "./ComboProduct/ComboOptionDepartment";
import ComboOptionProduct from "./ComboProduct/ComboOptionProduct";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import AddedComboProduct from "./ComboProduct/AddedComboProduct";
import { Bounce, toast } from "react-toastify";

interface SubDepartment {
  Id: number;
  Name: string;
}
interface Product {
  Id: number;
  Name: string;
  SubDepartmentName: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: {
    subDepartments: SubDepartment[];
  };
}

type IncludedItem = {
  Id: any;
  Name: string | undefined;
};

interface FormData {
  productId: string;
  optionName: string;
  isMandatory: number;
  minSelectionValue: number;
  maxSelectionValue: number;
  defaultProductId: string;
  includedItemsData: IncludedItemData[];
  restaurantLoginId: number;
  mode: number;
}

interface ComboOptionsResponse {
  status: number;
  message: string;
  data: {
    comboProductOptions: ComboOption[];
  };
}

const ComboProductComboOption: React.FC = () => {
  const [productId, setProductId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      includedItemsData: [],
      mode: 1,
      minSelectionValue: 0,
      isMandatory: 0,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("Id");
    if (id) {
      setProductId(id);
    }
  }, [location.search]);

  const UserToken_Global = localStorage.getItem("authToken");
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDataBound, setIsDataBound] = useState(false);

  const fetchSubDepartments = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${
          import.meta.env.VITE_API_URL
        }/api/active/subdepartment/list?restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 1) {
        setSubDepartments(response.data.data.subDepartments);
      }
    } catch (error) {
      console.error("Error fetching sub-departments:", error);
    }
  };

  const GetAllActiveProductsListOfRestaurant = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/api/active/product/list?restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 && response.data.status === 1) {
        setProducts(response.data.data.products);
        setIsDataBound(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
   const [comboProductId, setComboProductId] = useState<string | number>("");
  const [includedItems, setIncludedItems] = useState<
    {
      SubDepartmentName: string;
      comboProductId: number;
      productsList: IncludedItem[];
    }[]
  >([]);

  const handleDepartmentChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const departmentId = event.target.value;

    if (departmentId === "0") {
      setSelectedDepartment(null);
      setIncludedItems([]);
      return;
    }

    setSelectedDepartment(departmentId);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/api/product/active/bysubdepartment?restaurantLoginId=0&subDepartmentId=${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.status === 1) {
        const productsList = response.data.data.productsList || [];
        const subDepartmentName =
          productsList[0]?.SubDepartmentName || "Unknown Department";
        if (subDepartmentName != "Unknown Department") {
          const departmentData = {
            SubDepartmentName: subDepartmentName,
            SubDepartmentId:departmentId,
            comboProductId: null,
            productsList: productsList,
          };

          console.log(
            "SubDepartment:",
            departmentData.SubDepartmentName,
            departmentData.productsList
          );

          setIncludedItems((prevItems) => {
            const updatedItems = [...prevItems, departmentData];

            // Ensure unique `SubDepartmentName` entries
            const uniqueItems = updatedItems.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.SubDepartmentName === value.SubDepartmentName
                )
            );

            console.log("Updated includedItems:", uniqueItems);
            return uniqueItems;
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Sorry, department does not have any product!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        console.error("Error: Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [addedCombo, setAddedCombo] = useState<ComboOption[]>([]);

  const getAllComboOptionsList = async () => {
    try {
      const response = await axios.get<ComboOptionsResponse>(
        `${import.meta.env.VITE_API_URL
        }/api/combo/product/options/list?comboProductId=${productId}&restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.status === 1 &&
        response.data.data.comboProductOptions.length > 0
      ) {
        setAddedCombo(response.data.data.comboProductOptions);
      }
    } catch (error) {
      console.error("Error fetching combo options:", error);
    }
  };

  const handleComboDelete = async (comboOptionId: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL
          }/api/combo/product/option/delete?comboOptionId=${comboOptionId}&restaurantLoginId=0`,
          {
            headers: {
              Authorization: `Bearer ${UserToken_Global}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.status === 1) {
          toast.success("Combo option deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          setAddedCombo((prevCombo) =>
            prevCombo.filter((option) => option.Id !== comboOptionId)
          );
        } else {
          toast.error(
            response.data.message || "Failed to delete combo option.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("A network error occurred while trying to delete.", {
          position: "top-right",
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
      finally {
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    getAllComboOptionsList();
    fetchSubDepartments();
    GetAllActiveProductsListOfRestaurant();
  }, [productId, loading]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const updatedIncludedItemsData = [
      ...(data.includedItemsData || []),
      ...transformedData,
      ...departmentData,
    ];

    const payload = {
      ...data,
      includedItemsData: updatedIncludedItemsData,
      productId: productId,
    };

    try {
      setLoading(true);
      const postResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/combo/product/addupdate/option`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (postResponse.data.status === 1) {
        Swal.fire({
          title: "Success",
          text: postResponse.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        await getAllComboOptionsList();
      } else {
        Swal.fire({
          title: "Error",
          text: postResponse.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There is some technical error, please try again!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    finally {
      setLoading(false);
    }
  };

  const [isMandatoryChecked, setIsMandatoryChecked] = useState(true);

  const handleMandatoryToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMandatoryChecked(!e.target.checked);
  };
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [includedProductItems, setIncludedProductItems] = useState<
    IncludedItem[]
  >([]);
  const handleProductChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const productId = event.target.value;
    setSelectedProduct(productId);

    try {

      const apiUrl = `${import.meta.env.VITE_API_URL
        }/api/single/product?Id=${productId}&restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const IncludedProducts: IncludedItem[] = response.data.data.products;
        setIncludedProductItems((prevItems) => {
          const updatedItems = [...prevItems, ...IncludedProducts];

          const uniqueItems = updatedItems.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.Id === value.Id)
          );

          return uniqueItems;
        });

        // console.log("handlechanged", includedProductItems);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
    }
  };
  const [departmentData, setDepartmentData] = useState<any>(null);
  const handleFormData = (data: any) => {
    setDepartmentData(data);
    // console.log("Received form data ddd:", data);
  };

  const [transformedData, setTransformedData] = useState<any[]>([]); 

  const handleTransformedData = (data: any[]) => {
    setTransformedData(data);
  };

  // getAllComboOptionsList();

  return (
    <div
      id="ComboOption_tab"
      className="tab-pane fade active show"
      style={{ marginTop: "25px" }}
    >
      <div
        className="product_main-wrap"
        style={{ paddingTop: "12px", minHeight: "400px" }}
      >
        <div
          className="wrap-product_main !p-2 sm:!p-5 mt-3"
          // style={{ marginTop: "12px", paddingTop: "10px", paddingBottom: "0px" }}
        >
          {/* <ul id="ComboOptionsData_ManageComboOptions" className="timeline"> */}
          <ul
            id="ComboOptionsData_ManageComboOptions"
            className="pl-0 mt-2 space-y-4 "
          >
            {/* here add ned to add added combo prod. */}
            {addedCombo.length > 0 && (
              <AddedComboProduct
                onDelete={handleComboDelete}
                addedCombo={addedCombo}
                loading={loading}
              />
            )}

            <li className="timeline-inverted">
              <div className="timeline-panel">
                <div>
                  <div className="timeline-heading">
                    <div className="faq " data-component="Faq ">
                      <div className="faq__grid__faqs ">
                        <details
                          id="dvDetailSection_AddComboOption"
                          data-bind={0}
                          className="faq__grid__faqs__faq "
                        >
                          <summary
                            className="faq__grid__faqs__faq__button flex-none "
                            data-category="faq "
                            data-label="¿Cuánto tiempo dura la sesión? "
                          >
                            <div className="p-2.5 faq__grid__faqs__faq__button__content ">
                              <div className="heading_text-wraps ">
                                <div
                                  className="title_faq_wrap"
                                  style={{
                                    minWidth: "330px",
                                    maxWidth: "330px",
                                  }}
                                >
                                  <div className="head_title">
                                    Add Combo Option
                                  </div>
                                </div>
                              </div>
                            </div>
                          </summary>
                          <div className="faq__grid__faqs__faq__body ">
                            <div className="wraps_content-etc">
                              {/* <div className="item-type_wrap"> */}
                              <div className="bg-[#fff]">
                                <div className="type_wrapper-item">
                                  <div className="row">
                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                      <div
                                        className="row pt-4 p-3"
                                        style={{
                                          padding:
                                            "25px 25px 25px 25px !important",
                                          display: "flex",
                                        }}
                                      >
                                        <div className="pb-2 border-b-[1px] sm:border-b-[0px] border-gray-300 sm:border-r-[1px] sm:border-gray-300 col-md-6 col-lg-6 col-sm-6 !px-0 sm:!px-2">
                                          <form
                                            onSubmit={handleSubmit(onSubmit)}
                                          >
                                            <div
                                              className="form-group plus_from_group"
                                              style={{
                                                marginTop: "0px",
                                                marginRight: "0px",
                                              }}
                                            >
                                              <label className="lblModifiersSettingClass lblComboOptionStyle">
                                                Name
                                              </label>
                                              <input
                                                type="text"
                                                className="h-7 sm:h-auto form-control custom-input-field "
                                                id="txtComboOptionName_AddComboOption_ManageComboProduct"
                                                placeholder="Combo Option Name"
                                                style={{
                                                  borderRadius:
                                                    "25px !important",
                                                  border: "1px solid #ced4da",
                                                  fontSize: "initial",
                                                }}
                                                {...register("optionName", {
                                                  required:
                                                    "Please enter combo-option name!",
                                                })}
                                              />
                                              {errors.optionName && (
                                                <div className="errorsClass2 errClass_ComboOption">
                                                  {errors.optionName.message}
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              className="form-group plus_from_group"
                                              style={{
                                                marginTop: "0px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <label className="lblModifiersSettingClass lblComboOptionStyle">
                                                Mandatory
                                              </label>
                                              <p
                                                style={{
                                                  textAlign: "left",
                                                  padding: "0px",
                                                  display: "block",
                                                  height: "initial",
                                                }}
                                              >
                                                <label className="switch round_wraps">
                                                  <input
                                                    className=""
                                                    id="chkComboOptionMandatory_AddComboOption_ManageComboProduct"
                                                    type="checkbox"
                                                    onChange={
                                                      handleMandatoryToggle
                                                    }
                                                  />
                                                  <span className="slider round" />
                                                </label>
                                              </p>
                                            </div>
                                            <div className="flex">
                                              <div
                                                className="form-group plus_from_group"
                                                style={{
                                                  display: "inline-block",
                                                  width: "46%",
                                                  marginRight: "0px",
                                                  marginTop: "0px",
                                                }}
                                              >
                                                <label className="lblModifiersSettingClass lblComboOptionStyle">
                                                  Min
                                                </label>
                                                <input
                                                  type="number"
                                                  className="h-7 sm:h-auto form-control custom-input-field"
                                                  id="txtMinSelection_AddComboOption_ManageComboProduct"
                                                  placeholder="0"
                                                  defaultValue={0}
                                                  disabled={isMandatoryChecked}
                                                  style={{
                                                    borderRadius:
                                                      "25px !important",
                                                    border: "1px solid #ced4da",
                                                    fontSize: "initial",
                                                  }}
                                                  {...register(
                                                    "minSelectionValue"
                                                  )}
                                                />
                                              </div>
                                              <div
                                                className="form-group plus_from_group"
                                                style={{
                                                  display: "inline-block",
                                                  width: "46%",
                                                  marginTop: "0px",
                                                  marginLeft: "6%",
                                                  marginRight: "0px",
                                                }}
                                              >
                                                <label className="lblModifiersSettingClass lblComboOptionStyle">
                                                  Max
                                                </label>
                                                <input
                                                  type="number"
                                                  className="h-7 sm:h-auto form-control custom-input-field"
                                                  id="txtMaxSelection_AddComboOption_ManageComboProduct"
                                                  placeholder=""
                                                  style={{
                                                    borderRadius:
                                                      "25px !important",
                                                    border: "1px solid #ced4da",
                                                    fontSize: "initial",
                                                  }}
                                                  {...register(
                                                    "maxSelectionValue",
                                                    {
                                                      required:
                                                        "Please enter max-value!",
                                                    }
                                                  )}
                                                />
                                                {errors.maxSelectionValue && (
                                                  <div className="errorsClass2 errClass_ComboOption">
                                                    {
                                                      errors.maxSelectionValue
                                                        .message
                                                    }
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div
                                              className="form-group pop-up_drop pl-3"
                                              style={{
                                                padding: "0px",
                                                marginBottom: "20px",
                                              }}
                                            >
                                              <label className="Combo_defaultItem lblComboOptionStyle">
                                                Default Product
                                              </label>
                                              <div className="select_box z-1">
                                                <select
                                                  className="form-control"
                                                  id={`ddlDefaultProduct_AddComboOption_ManageComboProduct`}
                                                  {...register(
                                                    "defaultProductId",
                                                    { required: true }
                                                  )}
                                                >
                                                  <option value={0}>
                                                    Select Products
                                                  </option>
                                                  {includedItems?.map(
                                                    (item) => (
                                                      <option
                                                        key={item.Id}
                                                        value={item.Id}
                                                      >
                                                        {item.Name}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>

                                            <div className="pl-3 lg:flex">
                                              <div
                                                className="form-group pop-up_drop w-full lg:pr-2"
                                              // style={{
                                              //   paddingRight: "10px",
                                              //   width: "100%",
                                              // }}
                                              >
                                                <label className="Combo_defaultItem lblComboOptionStyle">
                                                  Import Department
                                                </label>
                                                <div className="select_box">
                                                  <select
                                                    className="form-control"
                                                    id="ddlImportDepartment_AddComboOption_ManageComboProduct"
                                                    {...register(
                                                      "ImportDepartment",
                                                      { required: true }
                                                    )}
                                                    onChange={
                                                      handleDepartmentChange
                                                    }
                                                  >
                                                    <option value={0}>
                                                      Select
                                                    </option>
                                                    {subDepartments.map(
                                                      (subDepartment) => (
                                                        <option
                                                          key={subDepartment.Id}
                                                          value={
                                                            subDepartment.Id
                                                          }
                                                        >
                                                          {subDepartment.Name}
                                                        </option>
                                                      )
                                                    )}
                                                  </select>
                                                </div>
                                                <div
                                                  id="errorImportDepartment_AddComboOption_ManageComboProduct"
                                                  className="errorsClass2 errorsClass2_ImportModifiers"
                                                />
                                              </div>
                                              <div
                                                className="form-group pop-up_drop w-full"
                                                // style={{
                                                //   padding: "0px",
                                                //   width: "100%",
                                                // }}
                                              >
                                                <label className="Combo_defaultItem lblComboOptionStyle">
                                                  Import Product
                                                </label>
                                                <div className="select_box">
                                                  <div
                                                    data-bind={
                                                      isDataBound ? "1" : "0"
                                                    }
                                                  >
                                                    <select
                                                      className="form-control"
                                                      id="ddlImportProduct_AddComboOption_ManageComboProduct"
                                                      {...register(
                                                        "ImportProduct",
                                                        { required: true }
                                                      )}
                                                      onChange={
                                                        handleProductChange
                                                      }
                                                    >
                                                      <option value="0">
                                                        Select
                                                      </option>
                                                      {products.map(
                                                        (product) => (
                                                          <option
                                                            key={product.Id}
                                                            value={product.Id}
                                                            data-pro-name={
                                                              product.Name
                                                            }
                                                          >
                                                            {
                                                              product.SubDepartmentName
                                                            }{" "}
                                                            - {product.Name}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </div>
                                                </div>

                                                <div
                                                  id="errorImportProduct_AddComboOption_ManageComboProduct"
                                                  className="errorsClass2 errorsClass2_ImportModifiers"
                                                />
                                              </div>
                                            </div>

                                            <div
                                              className="modal-bottom plus_modal_bottom mx-auto"
                                              style={{
                                                paddingBottom: "0px",
                                                marginTop: "10px",
                                              }}
                                            >
                                              <button
                                                id="btnSubmit_AddComboOption_ManageComboProduct"
                                                type="submit"
                                                className="cstm_model_plusbtn_2 btn btn-danger !py-1 !w-24 !h-10"
                                                // style={{
                                                //   fontSize: "16px",
                                                //   width: "145px",
                                                //   height: "45px",
                                                // }}
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                          <div id="IncludedItems_Section_AddComboOption_ManageComboProduct">
                                            <label
                                              className="lblComboOptionStyle"
                                              style={{ marginBottom: "0.5rem" }}
                                            >
                                              Included Items
                                            </label>
                                            <div
                                              id="dvArea_IncludedItems_AddComboOption_ManageComboProduct"
                                              className="Included_Items_Sortable"
                                              style={{
                                                maxHeight: "500px",
                                                overflowY: "auto",
                                              }}
                                            >
                                              {/* Render the included items here */}
                                              <ComboOptionDepartment
                                                departmentProduct={
                                                  includedItems
                                                }
                                                mode={1}
                                                onFormData={handleFormData}
                                              />

                                              <ComboOptionProduct
                                                productListing={
                                                  includedProductItems
                                                }
                                                onTransformedData={
                                                  handleTransformedData
                                                }
                                                transformedFormData={transformedData}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComboProductComboOption;
