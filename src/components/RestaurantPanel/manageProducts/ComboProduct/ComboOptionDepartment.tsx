import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ModifierOption {
  Id: number;
  OptionName: string;
  Status: number;
  modifierOptionStatus?: number;
}

interface Modifier {
  Id: number;
  ModifierName: string;
  OptionsList: ModifierOption[];
}

interface Product {
  Id: number;
  Name: string;
  Status: number;
  ModifiersList: Modifier[];
}

interface SubDepartment {
  SubDepartmentName: string;
  comboProductId: number;
  SubDepartmentId: number;
  SubDepartment_ProductListWithModifiers: Product[];
  productsList: Product[];
}

interface ComboOptionDepartmentProps {
  departmentProduct: SubDepartment[];
  mode: number;
  departmentId: string | number;
  onFormData: (data: any) => void;
}

const ComboOptionDepartment: React.FC<ComboOptionDepartmentProps> = ({
  departmentProduct = [],
  mode,
  departmentId,
  onFormData,
}) => {
  const [subDepartmentId, setSubDepartmentId] = useState();
  const [comboProductId, setComboProductId] = useState(
    departmentProduct.length > 0 ? departmentProduct[0].comboProductId : null
  );
  const UserToken_Global = localStorage.getItem("authToken");
  const [isDepartmentOpen, setIsDepartmentOpen] = useState<Record<string, boolean>>({});
  const [isProductOpen, setProductOpen] = useState<Record<number, boolean>>({});
  const [modifierStatus, setModifierStatus] = useState<Record<number, boolean>>(
    {}
  );
  const [maxAllowed, setMaxAllowed] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    id:null,
    maxAllowed: 1,
    productsData: [],
    type: "department"
  });
console.log("departmentProduct: ", departmentProduct, "    subDepartmentId:",subDepartmentId)


console.log(comboProductId)
  

  useEffect(() => {
    if (mode === 2 || mode === 1) {
      const transformedFormData = departmentProduct.map((department) => ({
        id: department.SubDepartmentId,
        type: "department",
        maxAllowed: department.maxAllowed || maxAllowed,
        productsData: (department?.SubDepartment_ProductListWithModifiers || department?.productsList || []).map(
          (product) => ({
            id: product.Id,
            modifiersData: (product?.ModifiersList || []).map((modifier) => ({
              id: modifier.Id,
              modifierOptions: (modifier?.OptionsList || []).map((option) => ({
                id: option.Id,
                modifierOptionStatus: option.IsIncluded_Into_ComboOptionIncludedItem || 1,
              })),
              modifierStatus: modifier.IsIncluded_Into_ComboOptionIncludedItem,
            })),
          })
        ),
      }));
  
      setFormData(transformedFormData);
    }
  }, [departmentProduct, mode, maxAllowed]);
  
  
console.log("FormData", formData);
  useEffect(() => {
    onFormData(formData);
  }, [formData, onFormData]);




  const toggleDepartment = (deptId: string) => {
    setIsDepartmentOpen((prev) => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const toggleProduct = (productId: number) => {
    setProductOpen((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };


  const handleMaxAllowedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxAllowed(value);
    setFormData((prev) => ({ ...prev, maxAllowed: value }));
  };

  const toggleModifier = (modifierId: number) => {
    setModifierStatus((prev) => {
      const newStatus = !prev[modifierId];
      return { ...prev, [modifierId]: newStatus };
    });
  
    setFormData((prevData: any) => {
      const updatedProductsData = prevData.productsData?.map((product: any) => ({
        ...product,
        modifiersData: product.modifiersData?.map((modifier: any) =>
          modifier.id === modifierId
            ? { ...modifier, modifierStatus: !modifier.modifierStatus }
            : modifier
        ),
      }));
      return { ...prevData, productsData: updatedProductsData };
    });
  };
  
  const handleModifierOptionChange = (
    productId: number,
    modifierId: number,
    optionId: number,
    status: boolean
  ) => {
    setFormData((prevData: any) => {
      const updatedProductsData = prevData.productsData?.map((product: any) => {
        if (product.id === productId) {
          const updatedModifiersData = product.modifiersData?.map((modifier: any) => {
            if (modifier.id === modifierId) {
              const updatedOptions = modifier.modifierOptions?.map((option: any) => {
                if (option.id === optionId) {
                  return {
                    ...option,
                    modifierOptionStatus: status ? 1 : 0,
                  };
                }
                return option;
              }) || [];
              return { ...modifier, modifierOptions: updatedOptions };
            }
            return modifier;
          }) || [];
          return { ...product, modifiersData: updatedModifiersData };
        }
        return product;
      }) || [];
      return { ...prevData, productsData: updatedProductsData };
    });
  };
  
  const toggleProductWithAll = (productId: number) => {
    setProductOpen((prev) => ({ ...prev, [productId]: !prev[productId] }));
  
    setFormData((prevData: any) => {
      const updatedProductsData = prevData.productsData?.map((product: any) => {
        if (product.id === productId) {
          const updatedModifiersData = product.modifiersData?.map((modifier: any) => ({
            ...modifier,
            modifierStatus: !isProductOpen[productId] ? 1 : 0,
            modifierOptions: modifier.modifierOptions?.map((option: any) => ({
              ...option,
              modifierOptionStatus: !isProductOpen[productId] ? 1 : 0,
            })),
          }));
          return { ...product, modifiersData: updatedModifiersData };
        }
        return product;
      });
      return { ...prevData, productsData: updatedProductsData };
    });
  };
  
  const renderModifiers = (productId: number, modifiers: Modifier[] = []) => (
    <div
      className="accordion-collapse"
      style={{
        border: "1px solid rgb(206, 212, 218)",
        padding: "10px",
        background: "rgb(255, 255, 255)",
      }}
    >
      <div className="dv_ModifiersArea_IncludedItemProductClass p-2">
        <label className="lblComboOptionStyle" style={{ marginTop: "20px" }}>
          Modifiers
        </label>
        <div className="accordion" id={`dv_ModifiersArea_IncludedItemProduct_${productId}`}>
          {(modifiers || []).map((modifier) => (
            <div key={modifier.Id} className="accordion-item">
              <div className="accordion-header flex justify-between items-center mx-3 my-2">
                <button
                  className="font-semibold"
                  onClick={() => toggleModifier(modifier.Id)}
                >
                  {modifier.ModifierName}
                </button>
                <label className="switch round_wraps">
                  <input
                   id={`chkStatus_IncludedItemProductModifier_${modifier.Id}`}
                    type="checkbox"
                    defaultChecked={
                      modifier.IsIncluded_Into_ComboOptionIncludedItem !== undefined
                        ? modifier.IsIncluded_Into_ComboOptionIncludedItem
                        : modifierStatus[modifier.Id] 
                    }
                    // checked={!!modifierStatus[modifier.Id]} 
                    onChange={() => toggleModifier(modifier.Id)}
                  />
                  <span className="slider round ModifierActivationToggleClass"></span>
                </label>
              </div>
              {modifierStatus[modifier.Id] && (
                <div
                  className="accordion-collapse modifier-options"
                  style={{ border: "1px solid rgb(206, 212, 218)" }}
                >
                  <div className="accordion-body">
                    <label className="lblComboOptionStyle">
                      Modifier Options
                    </label>
                    <ul className="list-group">
                      {(modifier?.OptionsList || []).map((option) => (
                        <li
                          key={option.Id}
                          className="list-group-item"
                          style={{ padding: "0.4375rem 0.75rem" }}
                        >
                          {option.OptionName}
                          <label
                            className="switch round_wraps"
                            style={{ float: "right" }}
                          >
                            <input
                              id={`chkStatus_IncludedItemProductModifierOption_${modifier.Id}_${option.Id}`}
                              type="checkbox"
                              defaultChecked={
                                option.IsIncluded_Into_ComboOptionIncludedItem !== undefined
                                  ? option.IsIncluded_Into_ComboOptionIncludedItem
                                  : modifierStatus[option.Id] 
                              }
                              // checked={formData.productsData
                              //   ?.find((product) => product.id === productId)
                              //   ?.modifiersData?.find((modifier) => modifier.id === modifierId)
                              //   ?.modifierOptions?.find((option) => option.id === optionId)
                              //   ?.modifierOptionStatus === 1}
                              
                              onChange={(e) =>
                                handleModifierOptionChange(
                                  productId,
                                  modifier.Id,
                                  option.Id,
                                  e.target.checked
                                )
                                // handleOptionToggle(option.Id,modifier.Id,productId)
                              }
                            />
                            <span className="slider round ModifierActivationToggleClass"></span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="accordion" >
      {departmentProduct.map((dept) => (
        <div
          key={dept.SubDepartmentName}
          id={dept.SubDepartmentName}
          className="accordion Included_Item_DragDrop"
          style={{ marginBottom: "19px", background: "rgb(255, 255, 255)" }}
        >
          <div style={{ height: "auto", background: "#99929236" }}>
            <div className="accordion-header" id={`Dep_${dept.SubDepartmentName}`} onClick={() => toggleDepartment(dept.SubDepartmentName)}>
              <div>
                <div
                  className="!py-[10px] px-2 flex justify-between"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "initial",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <span className="lblIncludedItemStyle">Department:</span> {" "}
                    {dept.SubDepartmentName}
                  </span>
                  <img
                    src="/Content/Images/delete_icon.png"
            className="w-5 h-6 my-auto mx-auto"
                    style={{ cursor: "pointer" }}
                    alt="delete"
                  />
                </div>
              </div>
            </div>
          </div>
          {isDepartmentOpen[dept.SubDepartmentName] && (
            <div
              className="accordion-collapse p-2 "
              style={{ border: "1px solid rgb(206, 212, 218)" }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  marginBottom: "15px",
                  alignItems: "flex-end",
                }}
              >
                <label
                  className="col-6 lblComboOptionStyle"
                  style={{ marginBottom: "0.5rem", paddingLeft: "8px" }}
                >
                  Default Max Allowed
                </label>
                <input
                  type="number"
                  id={`${dept.Id}`}
                  value={maxAllowed}
                  onChange={handleMaxAllowedChange}
                  placeholder="Max Allowed"
                  className="form-control plus_imput_feild "
                  style={{
                    borderRadius: "25px !important",
                    border: "1px solid #ced4da",
                    fontSize: "initial",
                  }}
                />
              </div>
              <div className="" >
              {(mode === 1
  ? dept?.productsList || [] 
  : dept?.SubDepartment_ProductListWithModifiers || dept?.productsList || []
).map((product) => (
                  <div
                    key={product.Id}
                    className="accordion Included_Item_DragDrop"
                    style={{
                      marginBottom: "19px",
                      // background: "rgb(255, 255, 255)",
                      background:" rgba(153, 146, 146, 0.21)"
                      
                    }}
                  >
                    <div>
                      <div
                        className="accordion-header gap-1"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                          
                        }}
                      >
                        <span
                          onClick={() => toggleProduct(product.Id)}
                          style={{
                            fontSize: "initial",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          <span className="lblIncludedItemStyle">Product</span>{" "}
                          : {product.Name}
                        </span>
                        <label
                          className="switch round_wraps"
                          style={{
                            paddingRight: "39px",
                            marginTop: "7px",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <input
                           id={`chkStatus_IncludedItemProductModifier_${product.Id}`}
                            type="checkbox"
                            defaultChecked={
                              product.IsIncluded_Into_ComboOptionIncludedItem !== undefined
                              ? product.IsIncluded_Into_ComboOptionIncludedItem
                              : modifierStatus[product.Id] 
                            }
                            // checked={!!isProductOpen[product.Id]} 
                      onChange={() => toggleProductWithAll(product.Id)}
                          />
                          <span
                            className="slider round ModifierActivationToggleClass"
                            style={{ top: "-5px" }}
                          ></span>
                        </label>
                      </div>
                    </div>

                    {isProductOpen[product.Id] &&
                      renderModifiers(product.Id, product.ModifiersList)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComboOptionDepartment;
