import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ProductDescriptionModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
}

const ProductDescriptionModal: React.FC<ProductDescriptionModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description); 
    setDescription(""); 
    onClose(); 
  };

  return (
    <Modal
      className="p-0"
      show={show}
      onHide={onClose}
      backdrop="static"
      centered
      dialogClassName="modal-dialog modal-lg" 
      contentClassName=" p-0" 
      className=" advance-btn-modal"
    >
      {/* Custom backdrop to add black background overlay */}
      {/* <div className="fixed inset-0 bg-black opacity-5 -z-10"></div> */}

      <Modal.Body className="pb-0">
        <form>
          <div className="form-group">
            <label htmlFor="productDescription">
              Description of Upsell Product
            </label>
            <textarea
              className="form-control"
              id="productDescription"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
            />
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

export default ProductDescriptionModal;
