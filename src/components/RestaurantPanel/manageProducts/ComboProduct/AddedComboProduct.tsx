import React, { useEffect, useState } from "react";
import ComboOptionDepartment from "./ComboOptionDepartment";
import ComboOptionProduct from "./ComboOptionProduct";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

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
interface ComboOption {
  Id: string | number;
  ComboOptionName: string;
  IsMandatory: boolean;
  minSelection?: number;
  maxSelection?: number;
  defaultProductId?: string | number;
  subDepartments?: { Id: string | number; Name: string }[];
  products?: {
    Id: string | number;
    Name: string;
    SubDepartmentName?: string;
  }[];
  
}

interface AddedComboProductProps {
  addedCombo: ComboOption[];
  onDelete: (id: string | number) => void;
  loading: boolean;
}

interface FormData {
  id: string | number;
  productId: string;
  comboOptionName: string;
  isMandatory: number;
  minSelectionValue: number;
  maxSelectionValue: number;
  defaultProductId: string;
  includedItemsData: IncludedItemData[];
  restaurantLoginId: number;
  mode: number;
}
const AddedComboProduct: React.FC<AddedComboProductProps> = ({
  addedCombo,
  onDelete,
  loading,
}) => {
  const [addedComboData, setAddedComboData] = useState<ComboOption[]>([]);
  // console.log("addedCombo: ",addedCombo);
  const [productId, setProductId] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      includedItemsData: [],
      mode: 2,
      minSelectionValue: 0,
      isMandatory: 0,
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const fetchComboOptions = async (comboOptionId: any) => {
    try {
      const response = await axios.get<ApiResponse>(
        `${
          import.meta.env.VITE_API_URL
        }api/combo/product/options/list?comboProductId=${comboOptionId}&restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 1) {
        setAddedComboData(response.data.data.comboProductOptions);
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching combo options: ", error);
    }
  };
  // const [includedItemsList, setIncludedItemsList] = useState([]);

  useEffect(() => {
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      const id = params.get("Id");
      if (id) {
        setProductId(id);
        // fetchComboOptionDetails(id);
        fetchComboOptions(id);
        // console.log("added product: combor::", id, addedComboData);
        // console.log("dcccccc-----", includedItemsList);
      }
    }
  }, [location]);

  const UserToken_Global = localStorage.getItem("authToken");

  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);

  // const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
  const [isMandatoryChecked, setIsMandatoryChecked] = useState(true);

  const handleMandatoryToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMandatoryChecked(!e.target.checked);
  };

  const fetchSubDepartments = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${
          import.meta.env.VITE_API_URL
        }/api/active/subdepartment/list?restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        setSubDepartments(response.data.data.subDepartments);
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching sub-departments:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch sub-departments",
        icon: "error",
      });
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [isDataBound, setIsDataBound] = useState(false);

  const GetAllActiveProductsListOfRestaurant = async (
    comboOptionId: string | null
  ) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/active/product/list?restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const fetchedProducts: Product[] = response.data.data.products;
        setProducts(fetchedProducts);

        setIsDataBound(true);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);

      if (error.response?.status === 401) {
        // alert("Unauthorized! Invalid Token!");
      } else {
        // alert("There is some technical error, please try again!");
      }
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
      // Reset state when no valid department is selected
      setSelectedDepartment(null);
      setIncludedItems([]);
      return;
    }

    setSelectedDepartment(departmentId);
    console.log("Department----------"+departmentId)

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
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
        const SubDepartmentId =
          productsList[0]?.SubDepartmentId || "";
        if (subDepartmentName != "Unknown Department") {
          const departmentData = {
            SubDepartmentName: subDepartmentName,
            SubDepartmentId:departmentId,
            comboProductId: comboProductId,
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
          console.log("subdepart---", includedItems)
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

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [includedProductItems, setIncludedProductItems] = useState<
    IncludedItem[]
  >([]);

  useEffect(() => {
    (async () => {
      await GetAllActiveProductsListOfRestaurant();
      await fetchSubDepartments();
    })();
  }, []);

  const handleProductChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    setSelectedProduct(productId);
  
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/single/product?Id=${productId}&restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 && response.data.status === 1) {
        const IncludedProducts: IncludedItem[] = response.data.data.products;
  
        // Update state without resetting it
        setIncludedProductItems((prevItems) => {
          const updatedItems = [...prevItems, ...IncludedProducts];
  
          // Deduplicate based on `Id`
          const uniqueItems = updatedItems.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.Id === value.Id)
          );
  
          return uniqueItems;
        });
  
        console.log("Updated includedProductItems:", includedProductItems);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
    }
  };
  

  const [transformedData, setTransformedData] = useState<any[]>([]); // State to hold the transformed data

  // Callback function to handle the transformed data from the child
  const handleTransformedData = (data: any[]) => {
    console.log("included Products added:",data);
    setTransformedData(data);
  };

  const [departmentData, setDepartmentData] = useState<any>(null);

  // Callback function to receive formData from child
  const handleFormData = (data: any) => {
    setDepartmentData(data);
    // console.log("Received form data ddd:", data);
  };
  console.log("Received form data:", transformedData, "----", departmentData);

  const fetchComboOptionDetails = async (comboOptionId: string | number) => {
    // console.log("Fetching details for ComboOptionId:", comboOptionId);
  
    try {
      // Fetch combo option details
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/combo/product/option/detail?comboOptionId=${comboOptionId}&restaurantLoginId=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data?.data?.comboOptionDetail) {
        const comboOptionDetail = response.data.data.comboOptionDetail;
        console.log("Fetched combo option detail:", comboOptionDetail);
  
        // Separate department and product lists
        const departmentList = comboOptionDetail.IncludedItemsList.filter(
          (item) => item.ProductId === 0
        );
  
        const productList = comboOptionDetail.IncludedItemsList.filter(
          (item) => item.ProductId !== 0
        );
  
        // Fetch product details for each ProductId
        if (productList.length > 0) {
          try {
            const productResponses = await Promise.all(
              productList.map(async (product) => {
                const apiUrl = `${
                  import.meta.env.VITE_API_URL
                }/api/single/product?Id=${product.ProductId}&restaurantLoginId=0`;
                const productResponse = await axios.get(apiUrl, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                  },
                });
                if (
                  productResponse.status === 200 &&
                  productResponse.data.status === 1
                ) {
                  return productResponse.data.data.products;
                } else {
                  console.error(
                    "Error fetching product details:",
                    productResponse.data.message
                  );
                  return [];
                }
              })
            );
  
            const IncludedProducts = productResponses.flat();
            setIncludedProductItems(IncludedProducts);
            // setIncludedProductItems((prevItems) => {
            //   const updatedItems = [...prevItems, ...IncludedProducts];
            //   return updatedItems.filter(
            //     (value, index, self) =>
            //       index === self.findIndex((t) => t.Id === value.Id)
            //   );
            // });
  
            // console.log("Fetched product details:", IncludedProducts);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        }
  
        // Update the matching combo option in addedComboData
        setAddedComboData((prevData) =>
          prevData.map((combo) =>
            combo.Id === comboOptionId
              ? {
                  ...combo,
                  IncludedItemsList: {
                    departmentList,
                    productList,
                  },
                }
              : combo
          )
        );
  
        setIncludedItems((prevItems) => {
          const updatedItems = [...prevItems, ...departmentList];
        
          const uniqueItems = updatedItems.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.SubDepartmentId === value.SubDepartmentId
              )
          );
        
          // console.log("total included Items:",includedItems);
          return uniqueItems;
        });
        
  
        // // console.log("Filtered Department List (ProductId = 0):", departmentList);
        // console.log("Filtered Product List (ProductId != 0):", productList);
        // console.log("Updated Included Items List:", {
        //   departmentList,
        //   productList,
        // });
        // console.log("Filtered depart List :", includedItems);
  
        // Set form default values
        setValue("comboOptionName", comboOptionDetail.ComboOptionName);
        setValue("minSelectionValue", comboOptionDetail.MinSelection);
        setValue("maxSelectionValue", comboOptionDetail.MaxSelection);
        setValue("isMandatory", comboOptionDetail.IsMandatory);
        setValue("defaultProductId", comboOptionDetail.DefaultProductId);
      } else {
        console.error("No combo option details found.");
      }
    } catch (error) {
      console.error("Error fetching combo option details:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch combo option details.",
        icon: "error",
      });
    }
  };
  
  

  // fetchComboOptionDetails(comboProductId);

  const handleUpdate: SubmitHandler<FormData> = async (payload: any) => {
    try {
      // console.log("Submited: ",departmentData,"-----", transformedData )
      payload.includedItemsData=[...departmentData,...transformedData];
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/combo/product/addupdate/option`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating combo option:", error);
    }
  };

  // console.log("Setting comboddd00---", addedComboData)
  // console.log("Setting comboddd00", includedItems)
  // {console.log("Included and dep: ",includedItems,"---",addedComboData.IncludedItemsList.departmentList)}
  return (
    <div>
      {addedComboData.map((combo) => (
        <li
          key={combo.Id}
          
          className="timeline-inverted mt-3"
        >
          <div className="timeline-panel">
            <div className="timeline-heading">
              <div className="faq" data-component="Faq ">
                <details
                  className="faq__grid__faqs__faq"
                  id="dvDetailSection_AddComboOption"
                >
                  <summary className="faq__grid__faqs__faq__button !flex-none"
                    onClick={() => {
                      setComboProductId(combo.Id);
                      fetchComboOptionDetails(combo.Id);
                      console.log("li Clicked");
                    }}
                  >
                    <div className="p-2.5 faq__grid__faqs__faq__button__content !w-full">
                      <div className="heading_text-wraps !flex !justify-between">
                        <div
                          className="title_faq_wrap"
                          style={{ minWidth: "330px", maxWidth: "330px" }}
                        >
                          <div className="head_title" >
                            {combo.ComboOptionName}
                          </div>
                        </div>
                        <div className="heading_edit_delete">
                          <a href="#!" onClick={() => onDelete(combo.Id)}>
                            <i
                              className="fa fa-trash"
                              title="Delete Combo-Option"
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </summary>
                  <div className="faq__grid__faqs__faq__body">
                    {/* Add Combo Option Form */}

                    <div className="bg-[#fff]">
                      <div className="type_wrapper-item">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div
                              className="row pt-4 p-3"
                              style={{
                                padding: "25px 25px 25px 25px !important",
                                display: "flex",
                              }}
                            >
                              <div className="pb-2 border-b-[1px] sm:border-b-[0px] border-gray-300 sm:border-r-[1px] sm:border-gray-300 col-md-6 col-lg-6 col-sm-6 !px-0 sm:!px-2">
                                <form
                                  onSubmit={handleSubmit((data) => {
                                    const payload = {
                                      defaultProductId:
                                        data[`defaultProductId-${combo.Id}`] ||
                                        "0",
                                      id: combo.Id,
                                      includedItemsData: [null],
                                      isMandatory: data[
                                        `isMandatory-${combo.Id}`
                                      ]
                                        ? 1
                                        : 0,
                                      maxSelectionValue:
                                        data[`maxSelectionValue-${combo.Id}`] ||
                                        "0",
                                      minSelectionValue:
                                        data[`minSelectionValue-${combo.Id}`] ||
                                        0,
                                      mode: 2,
                                      optionName:
                                        data[`comboOptionName-${combo.Id}`],
                                      productId: combo.ComboProductId,
                                      restaurantLoginId: 0,
                                    };

                                    // console.log("Payload:", payload);
                                    handleUpdate(payload);
                                  })}
                                >
                                  <div className="form-group plus_from_group mt-0">
                                    <label className="lblModifiersSettingClass lblComboOptionStyle">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      className="h-7 sm:h-auto form-control custom-input-field "
                                      placeholder="Combo Option Name"
                                      defaultValue={combo.ComboOptionName || ""}
                                      {...register(
                                        `comboOptionName-${combo.Id}`,
                                        {
                                          required:
                                            "Please enter combo-option name!",
                                        }
                                      )}
                                      style={{
                                        borderRadius: "25px",
                                        border: "1px solid #ced4da",
                                        fontSize: "initial",
                                      }}
                                    />
                                    {errors[`comboOptionName-${combo.Id}`] && (
                                      <div className="errorsClass2 errClass_ComboOption">
                                        {
                                          errors[`comboOptionName-${combo.Id}`]
                                            ?.message
                                        }
                                      </div>
                                    )}
                                  </div>

                                  <div className="form-group plus_from_group">
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
                                          type="checkbox"
                                          defaultChecked={!!combo.IsMandatory}
                                          {...register(
                                            `isMandatory-${combo.Id}`
                                          )}
                                          onChange={handleMandatoryToggle}
                                        />
                                        <span className="slider round"></span>
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
                                        placeholder="0"
                                        defaultValue={combo.MinSelection || 0}
                                        {...register(
                                          `minSelectionValue-${combo.Id}`
                                        )}
                                        style={{
                                          borderRadius: "25px",
                                          border: "1px solid #ced4da",
                                          fontSize: "initial",
                                        }}
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
                                        placeholder="0"
                                        defaultValue={combo.MaxSelection || 0}
                                        {...register(
                                          `maxSelectionValue-${combo.Id}`,
                                          {
                                            required: "Please enter max-value!",
                                          }
                                        )}
                                        style={{
                                          borderRadius: "25px",
                                          border: "1px solid #ced4da",
                                          fontSize: "initial",
                                        }}
                                      />
                                      {errors[
                                        `maxSelectionValue-${combo.Id}`
                                      ] && (
                                        <div className="errorsClass2 errClass_ComboOption">
                                          {
                                            errors[
                                              `maxSelectionValue-${combo.Id}`
                                            ]?.message
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
                                    <select
                                      className="form-control"
                                      defaultValue={
                                        combo.DefaultProductId || "0"
                                      }
                                      {...register(
                                        `defaultProductId-${combo.Id}`,
                                        { required: true }
                                      )}
                                    >
                                      <option value="0">Select Products</option>
                                      {includedItems?.map((item) => (
                                        <option key={item.Id} value={item.Id}>
                                          {item.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="pl-3 lg:flex">
                                    <div className="form-group pop-up_drop w-full lg:pr-2">
                                      <label className="Combo_defaultItem lblComboOptionStyle">
                                        Import Department
                                      </label>
                                      <select
                                        className="form-control"
                                        defaultValue="0"
                                        {...register(
                                          `ImportDepartment-${combo.Id}`,
                                          { required: true }
                                        )}
                                        onChange={(e) => {
                                          handleDepartmentChange(e);
                                        }}
                                      >
                                        <option value="0">Select</option>
                                        {subDepartments?.map(
                                          (subDepartment) => (
                                            <option
                                              key={subDepartment.Id}
                                              value={subDepartment.Id}
                                            >
                                              {subDepartment.Name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>

                                    <div className="form-group pop-up_drop w-full">
                                      <label className="Combo_defaultItem lblComboOptionStyle">
                                        Import Product
                                      </label>
                                      <select
                                        className="form-control"
                                        {...register(
                                          `ImportProduct-${combo.Id}`,
                                          { required: true }
                                        )}
                                        onChange={handleProductChange}
                                      >
                                        <option value="0">Select</option>
                                        {products.map((product) => (
                                          <option
                                            key={product.Id}
                                            value={product.Id}
                                          >
                                            {product.SubDepartmentName} -{" "}
                                            {product.Name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="modal-bottom plus_modal_bottom">
                                    <button
                                      type="submit"
                                      className="cstm_model_plusbtn_2 btn btn-danger"
                                      style={{
                                        fontSize: "16px",
                                        width: "145px",
                                        height: "45px",
                                      }}
                                    >
                                      Update
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
                                    
                                    <ComboOptionDepartment
                                      departmentProduct={
                                        // combo?.IncludedItemsList?.departmentList || includedItems 
                                        includedItems
                                      }
                                      mode={2}
                                      departmentId={comboProductId}
                                      onFormData={handleFormData}
                                    />

                                    <ComboOptionProduct
                                      productListing={includedProductItems}
                                      onTransformedData={handleTransformedData}
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
                </details>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default AddedComboProduct;
