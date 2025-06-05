import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import CropImageModal from "../Models/CropImageModal";
import { Modal, Button, Form } from "react-bootstrap";
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});



interface ModifierOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  modifiedProductId: number;
  setLoading: (loading: boolean) => void;
  optionId: number;
  editOption: boolean;
  setEditOption: (editOption: boolean) => void;
}
interface FormData {
  id: number;
  productModifierId: number;
  productId: number;
  optionName: string;
  price: number;
  maxAllowedValue: number;
  restaurantLoginId: number;
  mode: number;

}

const ModifierOptionModal: React.FC<ModifierOptionModalProps> = ({ isOpen, onClose, productId, modifiedProductId, setLoading, optionId, setEditOption, editOption }) => {
  if (!isOpen) return null;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      id: optionId,
      productId: productId,
      productModifierId: modifiedProductId || 0,
      mode: editOption ? 2 : 1,
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateOptionImage = async (optionId: number) => {
    // const apiUrl=
    
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/product/addupdate/modifieroption`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-datamData"
        }
      });
      if (response.status === 200 && response.data.status === 1) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      else if (response.data.status === 2) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Unauthorized! Invalid Token!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error("There is some technical error, please try again!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        }
      } else {
        toast.error("An unexpected Del error occurred!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
      onClose();
    }

  };

  const getModifiersData = async (id: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/product/single/modifieroption?modifierOptionId=${id}`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      if (response.status === 200 && response.data.status == 1) {
        const data = response.data.data.modifierOptionData
        setValue("optionName", data.OptionName);
        setValue("price", data.Price);
        setValue("maxAllowedValue", data.MaxAllowed);
      }
    }
    catch {

    }
    finally {
      setLoading(false);
    }
  }

  const handleProductImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setProductImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setProductImageUrl(URL.createObjectURL(file));
      console.log("openModal");
      setIsModalOpen(true);
    }
  }

  useEffect(() => {

    if (optionId && optionId != 0) {
      getModifiersData(optionId);
    }
  }, []);



  return (


    <Modal
    show={true}
    onHide={onClose}
    backdrop="static"
    keyboard={false}
    centered
    // fullscreen="sm-down"
    dialogClassName="cstm_modal_dialog mt-5"
    className="advance-btn-modal"
  >
    <Modal.Header  className="p-3  plus_modal_head text-center">
      <Modal.Title className="plus_head_popup !text-lg mx-auto">
        {editOption ? "Update" : "Add"} Modifier Option
      </Modal.Title>
    </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body className="new_modal_work !text-sm">
        {/* Option Name */}
        <div className="plus_from_group mb-2 gap-2 !my-1">
          <label className="lblModifiersSettingClass !text-sm !font-medium">Option Name</label>
          <input
            type="text"
            placeholder="Enter Option Name"
            className="plus_imput_feild w-full p-2 pl-2"
            {...register("optionName", { required: "Option Name is required" })}
          />
          {errors.optionName && (
            <span className="text-red-500">{errors.optionName.message}</span>
          )}
        </div>
  
        <div className="flex justify-between mb-2 w-full">
          {/* Add-On Price */}
          <div className="plus_from_group  my-1 !mr-1 flex  flex-col justify-start" >
            <label className="lblModifiersSettingClass !text-sm !font-medium">Add-On Price</label>
            <input
              type="number"
              placeholder="Price"
              className="plus_imput_feild IsDecimal w-full p-2 pl-2"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
  
          {/* Max Allowed */}
          <div className="plus_from_group  my-1 !ml-3 flex  flex-col justify-start" >
            <label className="lblModifiersSettingClass !text-sm !font-medium">Max Allowed</label>
            <input
              type="number"
              placeholder="Max Allowed"
              className="plus_imput_feild w-full  p-2 pl-2"
              {...register("maxAllowedValue", { valueAsNumber: true })}
            />
            {errors.maxAllowedValue && (
              <span className="text-red-500">{errors.maxAllowedValue.message}</span>
            )}
          </div>
        </div>
  
        {/* Option Image */}
        <div className="plus_from_group mt-0 mb-2">
          <label className="lblModifiersSettingClass !text-sm !font-medium">Option-Image (Optional)</label>
          <input
            type="file"
            className="py-1 px-2 plus_imput_feild w-full"
            accept="image/*"
            onChange={(e) => handleProductImageChange(e, setProductImage)}
          />
          <small className="text-muted">Note: Only .jpg, .jpeg, and .png formats are allowed.</small>
        </div>
        {croppedImageUrl && (
          <div className="text-center flex flex-col gap-2 items-center justify-center">
            <button
              type="button"
              className=" !bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
              onClick={() => {
                setCroppedImageUrl(null);
                setProductImage(null);
              }}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Remove
            </button>
            <img
              src={croppedImageUrl}
              alt="Modifier Option"
              className="mb-1"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="plus_modal_bottom pb-2 pr-3">
        <button
          type="button"
          className="bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#1b964b] text-white px-4 py-1 rounded-2xl"
        >
          {editOption ? "Update" : "Add"}
        </button>
      </Modal.Footer>
    </form>
    <CropImageModal
      isOpen={isModalOpen}
      onCancel={handleCancel}
      setCroppedImageUrl={setCroppedImageUrl}
      productImageUrl={productImageUrl}
    />
  </Modal>
  
    
  );
};

export default ModifierOptionModal;
