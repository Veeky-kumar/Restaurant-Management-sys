import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface UpsellAdvancedSettingModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (settingValue: string) => void;
}

const UpsellAdvancedSettingModal: React.FC<UpsellAdvancedSettingModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [visibilityCount, setVisibilityCount] = useState<string>("0");

  const handleRadioChange = (value: string) => {
    setSelectedSetting(value); 
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibilityCount(e.target.value); 
  };

  const handleSubmit = () => {
    if (selectedSetting) {
      onSubmit(selectedSetting);
    }
    setSelectedSetting(null); 
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
          {/* Display Before/After */}
          <div className="row mb-3">
            <label htmlFor="visibilityStatus" className="ps-0">
              Display Before/After
            </label>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input"
                type="radio"
                name="visibilityStatus"
                id="visibilityStatus1"
                value="1"
                checked={selectedSetting === "1"}
                onChange={() => handleRadioChange("1")}
              />
              <label className="form-check-label" htmlFor="visibilityStatus1">
                Before
              </label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input"
                type="radio"
                name="visibilityStatus"
                id="visibilityStatus2"
                value="2"
                checked={selectedSetting === "2"}
                onChange={() => handleRadioChange("2")}
              />
              <label className="form-check-label" htmlFor="visibilityStatus2">
                After
              </label>
            </div>
          </div>

          {/* Don't show if customer declines the offer */}
          <div className="form-group mb-3">
            <label htmlFor="visibilityCount">
              Don't show if the customer declines the offer
            </label>
            <select
              id="visibilityCount"
              className="form-control"
              value={visibilityCount}
              onChange={handleSelectChange}
            >
              <option value="0">Select</option>
              <option value="1">One Time</option>
              <option value="2">Two Time</option>
              <option value="3">Three Time</option>
            </select>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="pro-submit bg-[#1b5703]"  onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="pro-cancel" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpsellAdvancedSettingModal;
