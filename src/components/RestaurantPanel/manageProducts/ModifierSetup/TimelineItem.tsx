import React, { useState } from "react";
import ModifierOptionModal from "./ModifierOptionModal";

const TimelineItem: React.FC = () => {
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDefaultChange = () => {
    setIsDefaultChecked(!isDefaultChecked);
    // Add your logic for handling the default option change here
  };

  const handleEditModifier = () => {
    // Add your logic to edit the modifier
  };

  const handleDeleteModifier = () => {
    // Add your logic to confirm and delete the modifier
  };

  const handleEditOption = () => {
    // Add your logic to edit the option
  };

  const handleDeleteOption = () => {
    // Add your logic to confirm and delete the option
  };

  const handleShowPopup = () => {
    // Add your logic to show the modifier option popup
  };

  const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);

  // Function to show the modal
  const openModifierOptionModal = () => {
    setIsModifierModalOpen(true);
  };

  // Function to close the modal
  const closeModifierOptionModal = () => {
    setIsModifierModalOpen(false);
  };

  // Handle form submission (replace with actual logic)
  const handleModifierOptionSubmit = () => {
    console.log("Modifier option form submitted");
    closeModifierOptionModal(); // Close the modal after submission
  };

  return (
    <li className=" timeline-inverted">
      <div className="z-1 xl:translate-x-2 timeline-badge z-2">2</div>
      <div className="timeline-panel">
        <div>
          <div className="timeline-heading pl-4 w-full ">
            <div className="faq" data-component="Faq">
              <div className="faq__grid__faqs">
                <details className="faq__grid__faqs__faq" open={isOpen}>
                  <summary
                    className="overflow-hidden justify-center sm:justify-around faq__grid__faqs__faq__button"
                    data-category="faq"
                    data-label="¿Cuánto tiempo dura la sesión?"
                  >
                    <div className="mx-auto sm:!mx-1 faq__grid__faqs__faq__button__content">
                      <div className=" justify-center sm:justify-between heading_text-wraps flex flex-col sm:flex-row">
                        <div
                          className="title_faq_wrap"
                          // style={{ minWidth: "330px", maxWidth: "330px" }}
                        >
                          <div className="head_title">Main Course</div>
                        </div>

                        <div className="other_wrap-all first_other_wraps flex flex-col sm:flex-row ml-0 sm:ml-5 !pl-5 md:!pl-5 sm:!pl-14 sm:py-2">
                          <div  className="flex ">
                            <label >Min</label>
                            <input
                              type="text"
                              className="!mr-1 form-control min_max-value"
                              value="0"
                              readOnly
                            />
                          </div>

                          <div className="flex">
                            <label>Max</label>
                            <input
                              type="text"
                              className="!mr-1 form-control min_max-value"
                              value="1"
                              readOnly
                            />
                          </div>

                        </div>

                        <div className="heading_edit_delete pt-2 sm:pt-0">
                          <a href="javascript:;" onClick={handleEditModifier}>
                            <i className="fa fa-edit translate-y-1 sm:translate-y-0" title="Edit Modifier" />
                          </a>
                          <a href="javascript:;" onClick={handleDeleteModifier}>
                            <i
                              className="fa fa-trash"
                              title="Delete Modifier"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </summary>

                  <div className="type_wrapper-item d-flex flex-wrap ">
                    <div className="type_wrapper-item">
                      <p style={{ position: "relative" }}>
                        <div
                          className="item-edit-del"
                          style={{
                            position: "absolute",
                            top: "3px",
                            right: "3px",
                            display: "flex",
                            gap: "0px",
                          }}
                        >
                          <a
                            href="javascript:;"
                            title="Edit Option"
                            onClick={() =>
                              EditModifierOption_ModifierSetup(3447)
                            }
                          >
                            <i
                              className="fa fa-edit"
                              style={{ fontSize: "18px" }}
                            />
                          </a>
                          <a
                            href="javascript:;"
                            title="Delete Option"
                            onClick={() =>
                              ConfirmDeleteModifierOption_ModifierSetup(
                                1048,
                                3447
                              )
                            }
                          >
                            <i
                              className="fa fa-trash"
                              style={{ fontSize: "18px" }}
                            />
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form-control modifierOptionTitleStyle"
                          value={`Item 1`}
                          style={{
                            borderTopRightRadius: "0px",
                            borderBottomLeftRadius: "6px",
                            borderBottomRightRadius: "6px",
                          }}
                          readOnly
                        />
                      </p>

                      <div className="wrapper_type-value">
                        <label>Max Allow</label>
                        <input
                          type="text"
                          className="form-control min_max-value my-1"
                          value="1"
                          readOnly
                        />
                        <div className="clear" />
                        <label>Price</label>
                        <input
                          type="text"
                          className="form-control min_max-value my-1 "
                          value="10"
                          readOnly
                        />

                        <div className="clear" />
                        <label style={{ marginTop: "4px" }}>Is Default</label>
                        <input
                          id="chkModifierOption_Default_3447 my-1"
                          type="checkbox"
                          style={{
                            marginTop: "4px",
                            cursor: "pointer",
                            width: "25px",
                          }}
                          className="DefaultMOCheckboxClass_1048"
                          onChange={() =>
                            ConfirmSetDefaultModifierOption_ModifierSetup(
                              3447,
                              1048
                            )
                          }
                        />
                        <div className="clear" />
                      </div>
                    </div>

                    <div className="type_wrapper-item">
                      <p onClick={openModifierOptionModal}>
                        <a href="#">
                          <span className="add_item-css">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </a>
                      </p>

                      {/* Pass the isOpen state and close function to the modal */}
                      <ModifierOptionModal
                        isOpen={isModifierModalOpen}
                        onClose={closeModifierOptionModal}
                        onSubmit={handleModifierOptionSubmit}
                      />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TimelineItem;
