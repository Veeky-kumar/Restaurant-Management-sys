import React from 'react';

const ImportModifiersModal = ({ isModalOpen, closeModal }) => {
  // Handle form submission (you can adjust this as needed)
  const handleSubmit = () => {
    console.log("Importing modifiers...");
    closeModal(); // Close modal after submission
  };

  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="advance-btn-modal modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  show"
          id="ImportModifiers_Modal"
          data-backdrop="static"
          data-keyboard="false"
          style={{ display: 'block' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog cstm_modal_dialog">
            <div className="modal-content plus_modal_cont">
              {/* Modal Header */}
              <div className="modal-header plus_modal_head">
                <h4 id="heading_Title_ImportModifiers_Modall" className="mx-auto !p-0 modal-title plus_head_popup" style={{left:"0px"}}>
                  Import Modifiers
                </h4>
              </div>

              {/* Modal Body */}
              <div className="modal-body new_modal_work">
                <div className="form-group pop-up_drop">
                  <div className="select_box">
                    <select className="form-control" id="ddlProduct_ImportModifiers_Modal">
                      <option value="0">Select Product</option>
                      {/* Options can be populated dynamically based on your API response */}
                    </select>
                  </div>
                  <div id="product_error_ImportModifiers_Modal" className="errorsClass2 errorsClass2_ImportModifiers"></div>
                </div>

                {/* Modal Bottom (Buttons) */}
                <div className="modal-bottom plus_modal_bottom">
                  <button
                    id="btnCancel_ImportModifiers_Modal"
                    type="button"
                    // className="cstm_model_plusbtn_1 btn btn-danger"
                    className=" !bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
                    onClick={closeModal} // Close modal when cancel is clicked
                  >
                    Cancel
                  </button>
                  <button
                    id="btnSubmit_ImportModifiers_Modal"
                    type="button"
                    // className="cstm_model_plusbtn_2 btn btn-danger"
                    className=" !bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
                    onClick={handleSubmit} // Submit logic
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportModifiersModal;
