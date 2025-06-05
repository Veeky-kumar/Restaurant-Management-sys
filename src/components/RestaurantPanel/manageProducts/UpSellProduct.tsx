import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../../../assets/CSS/all_css.css";
import ProductDescriptionModal from "./Models/ProductDescriptionModal";
import SetUpsellCrossSellModal from "./Models/SetUpsellCrossSellModal";
import UpsellAdvancedSettingModal from "./Models/UpsellAdvancedSettingModal";

const UpSellProduct: React.FC = () => {
  const [upsellProducts, setUpsellProducts] = useState([
    {
      id: 249,
      name: "HOT SPICY CHK BONELESS",
      price: 100,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: true,
      disabled: true,
    },
    {
      id: 252,
      name: "ORIGINAL FRIED CHICKEN BOWL",
      price: 1000,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: true,
      disabled: true,
    },
    {
      id: 255,
      name: "HOT SPICY CHICKEN BOWL",
      price: 17.99,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: false,
      disabled: false,
    },
    {
      id: 256,
      name: "HONEY SOY CHICKEN BOWL",
      price: 100,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: false,
      disabled: false,
    },
    {
      id: 2356,
      name: "HONEY SOY CHICKEN BOWL",
      price: 100,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: false,
      disabled: false,
    },
    {
      id: 2956,
      name: "HONEY SOY CHICKEN BOWL",
      price: 100,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: false,
      disabled: false,
    },
    {
      id: 2563,
      name: "HONEY SOY CHICKEN BOWL",
      price: 100,
      img: "../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg",
      selected: false,
      disabled: false,
    },
  ]);

  const [crossSellOptions, setCrossSellOptions] = useState([
    { id: 252, name: "ORIGINAL FRIED CHICKEN BOWL" },
    { id: 255, name: "HOT SPICY CHICKEN BOWL" },
    { id: 256, name: "HONEY SOY CHICKEN BOWL " },
    { id: 257, name: "ORIGINAL FRIED CHICKEN COMBO1" },

  ]);

  const handleAddProducts = () => {
    // Your AddProductsToUpsellTable function logic here
  };

  const handleRemoveProducts = () => {
    // Your RemoveProductsFromUpsellTable function logic here
  };

  const handleSubmit = () => {
    // Your LinkUpsellByProduct function logic here
  };

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleToggle = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id); // Toggle dropdown
  };

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const handleSetDescription = (productId: number) => {
    setSelectedProductId(productId);
    setDescriptionModalOpen(true);
  };

  const handleModalClose = () => setDescriptionModalOpen(false);
  const handleModalSubmit = (description: string) => {
    console.log(`Product ID: ${selectedProductId}, Description: ${description}`);
    setDescriptionModalOpen(false);
  };

  const handleSetUpsellCrossSell = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleSetUpsellModalClose = () => setIsModalOpen(false);
  const handleSetUpsellModalSubmit = (description: string) => {
    console.log("Product ID:", selectedProductId);
    console.log("Description:", description);
    setIsModalOpen(false);
  };

  const openSettingsModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalVisible(true);
  };

  const closeSettingsModal = () => setIsModalVisible(false);
  return (
    <div className="">
    <div className="modal-open">
    <div
      id="contentWrapper_RestaurantLayout"
      className="w-full p-4  content-wrapper  min-h-screen"
    >
<div className="top_area_row -translate-y-1">
  <div className="row align-items-center">
    <div className="col-12 col-md-4 col-lg-4">
      <nav>
        <div className="main_nav_bread sm:mb-3">
          <ol className=" sm:translate-x-5 breadcrumb sm:pl-3 mb-0 sm:mt-3 ">
            <li className="breadcrumb-item nav_bread_one">
              <Link className="fs-6 fw-bold" to="/Restaurant/ManageProducts">
                Products
              </Link>
            </li>
            <li className="breadcrumb-icon">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li className="breadcrumb-item nav_bread_two">
              <a href="javascript:;" id="ProductFormName_ProductForm">
                <span className="fs-6 fw-bold">Upsell By Product</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  </div>

  <div className=" wrap_tabs-products sidebar_ul-nav_tabs">
    <div className="tab-content">
      <div className="upsell-cross-main">
        <div className="row">
          <div className="col-md-6">
            <div className="mt-0 upsell-cross-inner upsell-cross-inner-2">
              <div className="upsell-cross-overflow">
                <h3>Product List</h3>
                <div className="cross-scroll" id="cross-scroll-upsell">
                  <Table striped bordered hover id="product_list_table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th className="text-center">Photo</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upsellProducts.map((product, index) => (
                        <tr key={product.id}>
                          <td className="relative p-4">
                            <input
                              type="checkbox"
                              className="translate-x-2 -translate-y-2 form-check-input upsellProductCheck"
                              id={`upsellProductCheck${index}`}
                              data-id={product.id}
                            />
                          </td>
                          <td className="text-center">
                            <img
                              src={product.img}
                              alt={product.name}
                              width="50"
                              height="50"
                            />
                          </td>
                          <td className="text-center">{product.name}</td>
                          <td className="text-center">${product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="upsell-cross-inner upsell-cross-inner-2">
              <div className="upsell-cross-overflow">
                <h3>Item Upsell / Cross Sell</h3>
                <div className="cross-scroll" id="cross-scroll-upsell">
                  <Table striped bordered hover id="upsell_by_product_list">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Upsell Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upsellProducts.map((product, index) => (
                        <tr key={`upsell-${product.id}`}>
                          <td className="relative p-4">
                            <input
                              type="checkbox"
                              className="translate-x-2 -translate-y-2 form-check-input upsellProductCheck"
                              id={`upsellProductCheck${index}`}
                              data-id={product.id}
                            />
                          </td>
                          <td className="text-center">{product.name}</td>
                          <td className="text-center">${product.price}</td>
                          <td className="d-flex align-items-center" style={{ width: "300px" }}>
                            <select className="px-2 form-control upsellByProductListDropdown mr-2">
                              <option>Select</option>
                              {crossSellOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>

                            <div className="dropdown">
                              <button
                                className="btn text-dark dropdown-toggle"
                                type="button"
                                id={`dropdownMenuButton-${product.id}`}
                                data-bs-toggle="dropdown"
                                aria-expanded={openDropdown === product.id ? "true" : "false"}
                                onClick={() => handleToggle(product.id)}
                                style={{ textDecoration: "none", border: "none" }}
                              >
                                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                              </button>

                              <ul
                                className={`dropdown-menu ${openDropdown === product.id ? "show" : ""}`}
                                aria-labelledby={`dropdownMenuButton-${product.id}`}
                              >
                                <li>
                                  <button
                                    className={`dropdown-item ${activeButton === "setDescription" ? "active" : ""}`}
                                    onClick={() => {
                                      handleButtonClick("setDescription");
                                      handleSetDescription(product.id);
                                    }}
                                  >
                                    Set Description
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className={`dropdown-item ${activeButton === "upsellCrossSell" ? "active" : ""}`}
                                    onClick={() => {
                                      handleButtonClick("upsellCrossSell");
                                      handleSetUpsellCrossSell(product.id);
                                    }}
                                  >
                                    Set Upsell/Cross-Sell
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className={`dropdown-item ${activeButton === "settings" ? "active" : ""}`}
                                    onClick={() => {
                                      handleButtonClick("settings");
                                      openSettingsModal(product.id);
                                    }}
                                  >
                                    Settings
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}

                            {/* Product Description Modal */}
      {isDescriptionModalOpen && (
        <ProductDescriptionModal
          show={isDescriptionModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}

      {/* Upsell/Cross-Sell Modal */}
      {isModalOpen && (
        <SetUpsellCrossSellModal
          show={isModalOpen}
          onClose={handleSetUpsellModalClose}
          onSubmit={handleSetUpsellModalSubmit}
        />
      )}

      {/* Settings Modal */}
      {isModalVisible && (
        <UpsellAdvancedSettingModal
          show={isModalVisible}
          onClose={closeSettingsModal}
        />
      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-upsel mt-4">
          <div className="row">
            <div className="col-6">
              <button>
                <Link className="text-light" to="/Restaurant/ManageProducts">
                  Exit
                </Link>
              </button>
              {"  "}
              <button
                className="products-add-btn"
                onClick={handleAddProducts}
                disabled
              >
                Add
              </button>
            </div>
            <div className="col-6 text-right">
              <button className="upsell_remove_btn" onClick={handleRemoveProducts}>
                Remove
              </button>
              {"  "}
              <button className="upsell-submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
       </div>
       
            {/* Modals for each action */}
            <ProductDescriptionModal
        show={isDescriptionModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      <SetUpsellCrossSellModal
        show={isModalOpen}
        onClose={handleSetUpsellModalClose}
        onSubmit={handleSetUpsellModalSubmit}
      />

      <UpsellAdvancedSettingModal
        show={isModalVisible}
        onClose={closeSettingsModal}
      />

            {/* Modals */}

       </div>
  );
};

export default UpSellProduct;
