import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

const AddModifierModal = ({ onClose }) => {
  const [modifierName, setModifierName] = useState("");
  const [minSelection, setMinSelection] = useState("0");
  const [maxSelection, setMaxSelection] = useState("1");
  const [isMandatory, setIsMandatory] = useState(false);

  // Handling checkbox state
  const handleMandatoryChange = () => {
    setIsMandatory(!isMandatory);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Logic for adding/updating modifier
    console.log("Modifier Added", {
      modifierName,
      minSelection,
      maxSelection,
      isMandatory,
    });
    onClose();
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      keyboard={false}
      backdrop="static"
      centered
      dialogClassName="cstm_modal_dialog mt-5"
      className="advance-btn-modal"
    >
      {/* Modal Header */}
      <Modal.Header className="!m-0 p-0 mx-auto">
        <Modal.Title
          id="heading_Title_AddUpdateModifier_AddProduct_Modal"
          className="mx-auto p-2 pt-3 m-0 modal-title plus_head_popup"
        >
          Add Modifier
        </Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body className="new_modal_work">
        <div className="flex flex-col form plus_from_group">
          <label className="lblModifiersSettingClass">Name</label>
          <input

            className="plus_imput_feild w-full p-2 pl-2"
          id="modifierName"
          type="text"
          value={modifierName}
          onChange={(e) => setModifierName(e.target.value)}
          placeholder="Enter Modifier Name"
          />
        </div>

        {/* Mandatory Checkbox */}
        <div
          className="form-group plus_from_group"
          style={{ marginTop: "0px", marginBottom: "0px" }}
        >
          <label className="lblModifiersSettingClass">Mandatory</label>
          <p className="mb-0" style={{ textAlign: "left", padding: "0px" }}>
            <label className="switch round_wraps">
              <input
                type="checkbox"
                checked={isMandatory}
                onChange={handleMandatoryChange}
              />
              <span className="slider round"></span>
            </label>
          </p>
        </div>

        {/* Min and Max Selection Inputs */}
        <div className="flex justify-between mb-2 w-full">
          <div className="plus_from_group  my-1 !mr-1 flex  flex-col justify-start">
            <label className="lblModifiersSettingClass">Min</label>
            <InputGroup className="mb-3 ">
              <FormControl
                type="text"
                value={minSelection}
                disabled
                placeholder="0"
                className="plus_imput_feild IsDecimal w-full p-2 pl-2"
                // style={{ width: "150px" }}
              />
            </InputGroup>
          </div>

          <div className="plus_from_group  my-1 !mr-1 flex  flex-col justify-start">
            <label className="lblModifiersSettingClass">Max</label>
              <input
                type="text"
                value={maxSelection}
                onChange={(e) => setMaxSelection(e.target.value)}
                placeholder="1"
                className="plus_imput_feild IsDecimal w-full p-2 pl-2"
                // style={{ width: "150px" }}
              />
          </div>
        </div>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer
        className="pt-0 plus_modal_bottom mx-auto"
        style={{ paddingTop: "15px" }}
      >
        <button
          variant="danger"
          className=" !bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          variant="danger"
          className=" !bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
          onClick={handleSubmit}
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModifierModal;
