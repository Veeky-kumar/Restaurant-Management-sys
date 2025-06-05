import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface SetUpsellCrossSellModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (linkingType: string) => void;
}

const SetUpsellCrossSellModal: React.FC<SetUpsellCrossSellModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [selectedLinkingType, setSelectedLinkingType] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedLinkingType(value);
  };

  const handleSubmit = () => {
    if (selectedLinkingType) {
      onSubmit(selectedLinkingType); 
    }
    setSelectedLinkingType(null);
    onClose(); 
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      centered
      dialogClassName="z-50 relative"
      contentClassName="p-0 bg-white rounded-md"
       className=" advance-btn-modal"
    >
      {/* Modal Backdrop */}
      {/* <div className="fixed inset-0 bg-black opacity-5 -z-10"></div> */}

      <Modal.Body className="pb-0">
        <form>
          {/* Set Upsell/Cross-Sell */}
          <div className="row mb-3">
            <label htmlFor="upsellLinkingType" className="ps-0">
              Set Upsell/Cross-Sell
            </label>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input"
                type="radio"
                name="upsellLinkingType"
                id="upsellLinkingType0"
                value="0"
                checked={selectedLinkingType === "0"}
                onChange={() => handleRadioChange("0")}
              />
              <label className="form-check-label" htmlFor="upsellLinkingType0">
                Upsell (Replace)
              </label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input"
                type="radio"
                name="upsellLinkingType"
                id="upsellLinkingType1"
                value="1"
                checked={selectedLinkingType === "1"}
                onChange={() => handleRadioChange("1")}
              />
              <label className="form-check-label" htmlFor="upsellLinkingType1">
                Cross-Sell (Combine)
              </label>
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="pro-submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="pro-cancel" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetUpsellCrossSellModal;
