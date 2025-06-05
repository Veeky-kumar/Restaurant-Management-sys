import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface MainDepartmentModalProps {
  onClose: () => void;
  onCreateMainDepartment: (action: number, departmentValue: string) => void;
  editModal: boolean;
  selectedDepartmentId: number;
  selectedDepartmentName: string;
}

const MainDepartmentModal: React.FC<MainDepartmentModalProps> = ({
  onClose,
  onCreateMainDepartment,
  editModal,
  selectedDepartmentId,
  selectedDepartmentName
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  
  const [departmentName, setDepartmentName] = useState<string>("");

  useEffect(() => {
    if (editModal) {
      setDepartmentName(selectedDepartmentName);
      setValue('mainDepartment', selectedDepartmentName); 
    }
  }, [editModal, selectedDepartmentName, setValue]);

  const onSubmit = (data: { mainDepartment: string }) => {
    onCreateMainDepartment(editModal ? 2 : 1, data.mainDepartment);
    Toast.fire({
      icon: "success",
      title: "Main-Department has been successfully added",
    })
  };

  return (
    <div
      className="modal show fixed inset-0 z-1000 bg-black bg-opacity-50 flex items-center justify-center"
      id="CreateMainDepartment_Modal"
      aria-modal="true"
      role="dialog"
      style={{ display: "block", paddingRight: "17px" }}
    >
      <div className="modal-dialog cstm_modal_dialog">
        <div className="modal-content plus_modal_cont">
          {/* Modal Header */}
          <div
            className="modal-header plus_modal_head"
            style={{
              display: "block",
              paddingBottom: "0px",
              textAlign: "center",
            }}
          >
            <h4
              id="heading_Title_MainDepartmentModal"
              className="modal-title plus_head_popup"
              style={{ left: "0px" }}
            >
              {editModal ? "Edit Main Department" : "Add Main Department"}
            </h4>
          </div>

          {/* Modal Body */}
          <div className="modal-body new_modal_work">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group plus_from_group">
                <input
                  type="text"
                  className="form-control plus_imput_feild"
                  id="txtMainDepartmentName_ManageMainDepartment"
                  placeholder="Enter Main Department"
                  {...register('mainDepartment', {
                    required: 'Department Name is required',
                  })}
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                {/* Error Message */}
                {errors.mainDepartment && (
                  <div className="errorsClass2">{errors.mainDepartment.message}</div>
                )}
              </div>
              <div className="modal-bottom plus_modal_bottom">
                <button
                  type="button"
                  className="cstm_model_plusbtn_1 btn btn-danger"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  id="btnSubmit_MainDepartment"
                  type="submit"
                  className="cstm_model_plusbtn_2 btn btn-danger"
                >
                  {editModal ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDepartmentModal;
