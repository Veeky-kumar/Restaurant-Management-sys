
import React, { useState, useEffect } from "react";

interface Option {
  Id: number;
  OptionName: string;
  Status: boolean;
}

interface Modifier {
  Id: number;
  ModifierName: string;
  Status: boolean;
  OptionsList: Option[];
}

interface Product {
  Id: number;
  Name: string;
  ModifiersList: Modifier[];
}

interface ComboOptionProductProps {
  productListing: Product[];
  onTransformedData: (data: any[]) => void; 
  transformedFormData: any[];
}
const ComboOptionProduct: React.FC<ComboOptionProductProps> = ({
  productListing = [],
  onTransformedData,
  transformedFormData,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [modifiersStatus, setModifiersStatus] = useState<Record<number, boolean>>({});
  const [optionsStatus, setOptionsStatus] = useState<Record<number, boolean>>({});
  const [productStatus, setProductStatus] = useState<Record<number, boolean>>({});
  const [maxAllowed, setMaxAllowed] = useState<Record<number, string>>({});
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };
console.log("combo Open product:  "+ productListing)
  const isSectionExpanded = (sectionId: string) =>
    expandedSections.includes(sectionId);

  const handleMaxAllowedChange = (productId: number, value: string) => {
    setMaxAllowed((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const [toggledProducts, setToggledProducts] = useState<Set<number>>(new Set());

  const handleProductToggle = (id: number) => {
    const newToggledProducts = new Set(toggledProducts);
    const newStatus = !productStatus[id];

    setProductStatus(prevStatus => ({
      ...prevStatus,
      [id]: newStatus,
    }));

    if (newToggledProducts.has(id)) {
      newToggledProducts.delete(id);
    } else {
      newToggledProducts.add(id);
    }

    const newModifiersStatus: Record<number, boolean> = { ...modifiersStatus };
    const newOptionsStatus: Record<number, boolean> = { ...optionsStatus };

    productListing.forEach(product => {
      if (newToggledProducts.has(product.Id)) {
        newModifiersStatus[product.Id] = newStatus;
      }

      product.ModifiersList.forEach(modifier => {
        newModifiersStatus[modifier.Id] = newStatus;

        modifier.OptionsList.forEach(option => {
          newOptionsStatus[option.Id] = newStatus;
        });
      });
    });

    setModifiersStatus(newModifiersStatus);
    setOptionsStatus(newOptionsStatus);
    setToggledProducts(newToggledProducts);

    const updatedTransformedData = productListing.map(product => {
      const updatedModifiersData = product.ModifiersList.map(modifier => {
        const updatedModifierOptions = modifier.OptionsList.map(option => {
          return {
            id: option.Id,
            modifierOptionStatus: newOptionsStatus[option.Id] ? 1 : 0,
          };
        });

        return {
          id: modifier.Id,
          modifierStatus: newModifiersStatus[modifier.Id] ? 1 : 0,
          modifierOptions: updatedModifierOptions,
        };
      });

      return {
        id: product.Id,
        type: "product",
        maxAllowed: 1,
        modifiersData: updatedModifiersData,
      };
    });

    onTransformedData(updatedTransformedData);
  };


  const handleModifierToggle = (modifierId: number, productId: number) => {
    let newStatus = !modifiersStatus[modifierId];
    setModifiersStatus(prev => ({
      ...prev,
      [modifierId]: newStatus,
    }));

    const updatedTransformedData = transformedFormData.map(product => {
      if (product.id === productId) {
        const updatedModifiersData = product.modifiersData.map((modifier: any) => {
          if (modifier.id === modifierId) {
            const updatedModifierOptions = modifier.modifierOptions.map((option :any) => {
              setOptionsStatus(prev => ({
                ...prev,
                [option.id]: newStatus,
              }));
              return {
                ...option,
                modifierOptionStatus: newStatus ? 1 : 0,
              };
            });
            return {
              ...modifier,
              modifierStatus: newStatus ? 1 : 0,
              modifierOptions: updatedModifierOptions,
            };
          }
          return modifier;
        });

        return {
          ...product,
          modifiersData: updatedModifiersData,
        };
      }
      return product;
    });

    onTransformedData(updatedTransformedData);
  };


  const handleOptionToggle = (optionId: number, modifierId: number, productId: number) => {
  
    setOptionsStatus(prev => ({ ...prev, [optionId]: !prev[optionId] }));
    const newStatus = !optionsStatus[optionId]; 
    const updatedTransformedData = transformedFormData.map(product => {
      if (product.id === productId) {
        const updatedModifiersData = product.modifiersData.map((modifier: any) => {
          if (modifier.id === modifierId) {
            const updatedModifierOptions = modifier.modifierOptions.map((option: any) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  modifierOptionStatus: newStatus ? 1 : 0,
                };
              }
              return option;
            });
            return {
              ...modifier,
              modifierOptions: updatedModifierOptions,
            };
          }
          return modifier;
        });
        return {
          ...product,
          modifiersData: updatedModifiersData,
        };
      }
      return product;
    });
    onTransformedData(updatedTransformedData);
  };
  

  // Extract all the data dynamically
  useEffect(() => {
    const initialToggledProducts = new Set(productListing.map(product => product.Id));
    setToggledProducts(initialToggledProducts);

    const allProductStatuses: Record<number, boolean> = {};
    const allOptionStatus: Record<number, boolean> = {};
    const allModiferStatus: Record<number, boolean> = {};

    productListing.forEach(product => {
      allProductStatuses[product.Id] = true;
      product.ModifiersList.forEach(modifier => {
        allModiferStatus[modifier.Id] = true;
        modifier.OptionsList.forEach(option => {
          allOptionStatus[option.Id] = true;
        });
      });
    });

    setProductStatus(allProductStatuses);
    setModifiersStatus(allModiferStatus);
    setOptionsStatus(allOptionStatus);

    const transformedData = productListing.map((product) => {
      return {
        id: product.Id,
        type: "product",
        maxAllowed: maxAllowed[product.Id] ? parseInt(maxAllowed[product.Id], 10) : 1,
        modifiersData: product.ModifiersList.map((modifier) => ({
          id: modifier.Id,
          modifierStatus: 1,
          modifierOptions: modifier.OptionsList.map((option) => ({
            id: option.Id,
            modifierOptionStatus: 1,
          }))
        }))
      };
    });
    onTransformedData(transformedData); 
  }, [maxAllowed, productListing]);

  console.log("maxAllowed------==="+maxAllowed)
  return (
    <div
      className="accordion Included_Item_DragDrop"
      style={{
        marginBottom: "19px",
        background: "rgb(255, 255, 255)",
      }}
    >
      {productListing.map((product) => (
        <div
          key={product.Id}
          id={`IncludedItemProduct_${product.Id}`}
          // className="accordion-item mb-3"
          className="accordion Included_Item_DragDrop"
          style={{ marginBottom: "19px", background: "rgb(255, 255, 255)" }}
        >
          <div >
            <div
              className="bg-gray-200 !py-[10px] px-2 flex justify-between"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                background: "rgba(153, 146, 146, 0.21)"
              }}
            >
              <span
                onClick={() =>
                  toggleSection(`IncludedItemProductArea_${product.Id}`)
                }
                style={{
                  fontSize: "initial",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <span className="lblIncludedItemStyle">Product</span>: {product.Name}
              </span>

              <img
                src="../../Content/Images/delete_icon.png"
                // width="27px"
                // height="27px"
                className="w-5 h-6 my-auto mx-auto"
                onClick={() => console.log(`Remove item: ${product.Name}`)}
                style={{ cursor: "pointer" }}
              />

            </div>
          </div>
          <div
            id={`IncludedItemProductArea_${product.Id}`}
            className={`accordion-collapse ${
              isSectionExpanded(`IncludedItemProductArea_${product.Id}`)
                ? "show"
                : ""
            }`}
            style={{
              border: "1px solid rgb(206, 212, 218)",
              padding: "10px",
              display: isSectionExpanded(`IncludedItemProductArea_${product.Id}`)
                ? "block"
                : "none",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: "100%" }} className="mt-4">
                <label
                  className="lblComboOptionStyle "
                  style={{ marginLeft: "14.5px" }}
                >
                  Max Allowed
                </label>
                <input
                  type="text"
                  className="form-control custom-input-field w-full"
                  id={`txtMaxAllowed_IncludedItemProduct_${product.Id}`}
                  style={{
                    borderRadius: "25px",
                    border: "1px solid #ced4da",
                    fontSize: "initial",
                    // width: "95%",
                    float: "right",
                  }}
                  value={maxAllowed[product.Id] || 1}
                  onChange={(e) =>
                    handleMaxAllowedChange(product.Id, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="dv_ModifiersArea_IncludedItemProductClass">
              <label className="lblComboOptionStyle">Modifiers</label>
              {product.ModifiersList?.map((modifier) => (
                <div className="accordion-item" key={modifier.Id}>
                  <div
                    className="accordion-header flex flex-wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="text-xs  pl-3 font-semibold  text-black "
                      onClick={() =>
                        toggleSection(`ModifierArea_${modifier.Id}`)
                      }
                      style={{ textDecoration: "none" }}
                    >
                      {modifier.ModifierName}
                    </button>
                    <label
                      className="switch round_wraps"
                      style={{
                        paddingRight: "49px",
                        marginRight: "1rem",
                        marginTop: "7px",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <input
                        id={`chkStatus_IncludedItemProductModifier_${modifier.Id}`}
                        type="checkbox"
                        checked={modifiersStatus[modifier.Id] || false}
                        onChange={() => handleModifierToggle(modifier.Id, product.Id)}
                      />
                      <span className="slider round ModifierActivationToggleClass" />
                    </label>
                  </div>
                  <div
                    id={`ModifierArea_${modifier.Id}`}
                    className={`accordion-collapse ${
                      isSectionExpanded(`ModifierArea_${modifier.Id}`)
                        ? "show"
                        : ""
                    }`}
                    style={{
                      padding: "10px",
                      display: isSectionExpanded(`ModifierArea_${modifier.Id}`)
                        ? "block"
                        : "none",
                    }}
                  >
                    <div className="accordion-body p-0">
                      <label
                        className="lblComboOptionStyle"
                        style={{
                          borderTop: "1px solid #ced4da",
                          width: "100%",
                        }}
                      >
                        Modifier Options
                      </label>
                      {modifier.OptionsList && modifier.OptionsList.length > 0 ? (
                        modifier.OptionsList.map((option) => (
                          <ul
                            className="list-group"
                            id={`btn_Accordion_IncludedItemProductModifier_${option.Id}`}
                            key={option.Id}
                            style={{ padding: "4px" }}
                          >
                            <li
                              className="list-group-item"
                              aria-current="true"
                              style={{
                                padding: "0.4375rem 0.75rem",
                                margin: "0px",
                              }}
                            >
                              {option.OptionName}
                              <label
                                className="switch round_wraps"
                                style={{
                                  float: "right",
                                  marginBottom: "0px",
                                }}
                              >
                                <input
                                  id={`chkStatus_IncludedItemProductModifierOption_${modifier.Id}_${option.Id}`}
                                  type="checkbox"
                                  checked={optionsStatus[option.Id] || false} 
                                  onChange={() => handleOptionToggle(option.Id,modifier.Id,product.Id)}
                                />
                                <span className="slider round ModifierActivationToggleClass"></span>
                              </label>
                            </li>
                          </ul>
                        ))
                      ) : (
                        <ul className="list-group" style={{ padding: "12px" }}>
                          <li
                            className="list-group-item"
                            style={{ padding: "0.4375rem 0.75rem" }}
                          >
                            No Options Available
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComboOptionProduct;
