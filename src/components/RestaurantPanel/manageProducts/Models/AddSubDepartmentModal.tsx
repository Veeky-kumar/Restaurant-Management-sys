import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";
// import '../../../assets/CSS/manageProducts/ModalStyles.css';

interface DepartmentResponse {
  Id: number;
  Name: string;
  // Status: number;

}

interface Printgroup {
  id: number;
  name: string;
  status: number;
}
interface AddSubDepartmentModalProps {
  isVisible: boolean;
  onClose: () => void;
  mainDepartments: DepartmentResponse[];
  printGroupList: Printgroup[];
  updateModal: boolean;
  selectedId: number;
  setShowCropModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCropModal: boolean
}

const AddSubDepartmentModal: React.FC<AddSubDepartmentModalProps> = ({
  isVisible,
  onClose,
  mainDepartments,
  printGroupList,
  updateModal,
  selectedId,

}) => {
  // const [imagePreview, setImagePreview] = useState(null);
  const [departmentName, setDepartmentName] = useState("0");
  const [mainDepartment, setMainDepartment] = useState("0");
  const [loading, setLoading] = useState<boolean>(true);

  const [printGroup, setPrintGroup] = useState("0");
  const UserToken_Global = localStorage.getItem("authToken");
  const [errors, setErrors] = useState({
    mainDepartment: "",
    departmentName: "",
    // printGroup: "",
    // image: "",
  });

  const validateFields = (): boolean => {
    let isValid = true;
    const newErrors = {
      mainDepartment: "",
      departmentName: "",
      printGroup: "",
      image: "",
    };

    if (mainDepartment === "0") {
      newErrors.mainDepartment = "Please select a main department.";
      isValid = false;
    }

    if (!departmentName.trim()) {
      newErrors.departmentName = "Please enter a department name.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleImageChange = (e: any) => {
  // setShowCropModal(true)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDepartmentByID = async (id: number) => {

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/single/subdepartment?subDepartmentId=${id}`

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200 && response.data.status === 1) {
        const data = response.data.data.subDepartment;
        setDepartmentName(data.Name);
        setMainDepartment(data.MainDepartmentId);
        setPrintGroup(data.PrintGroupId);
      }

    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDepartmentByID(selectedId)
    setDepartmentName("");
    setMainDepartment("0");
    setPrintGroup("0");
    setErrors({
      mainDepartment: "",
      departmentName: "",
      // image: "",
    });
  }, [selectedId]);


  const handleAddUpdateDepartment = async (type: number) => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("mainDepartmentId", mainDepartment);
    formData.append("name", departmentName);
    formData.append("printGroupId", printGroup);

    // if (imagePreview) {
    //   // formData.append("subDepartmentImage", imagePreview);
    // }
    try {
      let response;
      if (type === 1) {
        formData.append("mode", "1");
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/addupdate/subdepartment`, formData, {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      else if (type === 2) {
        formData.append("mode", "2");
        formData.append("Id", String(selectedId));
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/addupdate/subdepartment`, formData, {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response?.data?.status === 1 && response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        onClose();
      } else {
        Swal.fire({
          title: "Warning",
          text: response?.data?.message || "Something went wrong!",
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error processing your request. Please try again.",
        icon: "error",
      });
    }
    finally {
      setLoading(false);
    }
  };
  if (!isVisible) return null;

  return (
    <>
      <div
        className="modal fixed inset-0 z-1000 bg-black bg-opacity-50 flex items-center justify-center"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >

      </div>

      <div
        className="modal show"
        id="CreateSubDepartment_Modal"
        role="dialog"
        style={{ display: "block", paddingRight: "17px" }}
      >
        {loading && (<div style={{
          backgroundColor: "#f0f5f0",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "300%",
          zIndex: 999999999999999,
          MozOpacity: 0.2,
          opacity: 0.2,
        }}>
          <img src="/Content/Images/Loader.gif" style={{
            backgroundColor: "#9af58c",
            alignItems: "center",
            position: "fixed",
            top: "40%",
            width: "10%",
            left: "50%",
          }} />
        </div>)}
        <div className="modal-dialog cstm_modal_dialog">
          <div className="modal-content plus_modal_cont">
            <div className="modal-header plus_modal_head ml-4">
              <h4
                id="heading_Title_SubDepartmentModal"
                className="modal-title plus_head_popup"
              >{!updateModal ? 'Add Department' : 'Update Department'}    
              </h4>
            </div>
            <div className="modal-body new_modal_work">
              <div className="form-group pop-up_drop">
                <div className="select_box">
                  <select
                    className="form-control"
                    id="ddlMainDepartment_ManageSubDepartment"
                    value={mainDepartment}
                    onChange={(e) => setMainDepartment(e.target.value)}
                  >
                    <option value="0">Select Main-Department</option>
                    {mainDepartments && mainDepartments.map((deps, index) =>
                      <option key={index} value={deps.Id}>{deps.Name}</option>
                    )}
                  </select>
                </div>
                {errors.mainDepartment && (
                  <div id="subDepartmentName_error_ManageSubDepartment" className="errorsClass2">{errors.mainDepartment}</div>
                )}
                <div
                  id="mainDepartment_error_ManageSubDepartment"
                  className="errorsClass2"
                ></div>
              </div>

              <div className="form-group plus_from_group">
                <input
                  type="text"
                  className="p-2 plus_imput_feild"
                  id="txtSubDepartmentName_ManageSubDepartment"
                  style={{width:"310px"}}
                  placeholder="Enter Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                {errors.departmentName && (<div
                  id="subDepartmentName_error_ManageSubDepartment"
                  className="errorsClass2"
                >{errors.departmentName}</div>)}

              </div>

              <div className="form-group pop-up_drop">
                <div className="select_box">
                  <select
                    className="form-control"
                    id="ddlPrintGroup_ManageSubDepartment"
                    value={printGroup}
                    onChange={(e) => setPrintGroup(e.target.value)}
                  >
                    <option value="0">Select Print-Group</option>
                    {printGroupList && printGroupList.map((deps, index) =>
                      <option key={index} value={deps.id}>{deps.name}</option>
                    )}
                  </select>
                </div>
                {/* {errors.printGroup && (<div
                  id="printGroup_error_ManageSubDepartment"
                  className="errorsClass2"
                >{errors.printGroup}</div>)} */}
              </div>

              <div
                className="form-group plus_from_group"
                style={{ marginBottom: "0px" }}
              >
                <input
                  type="file"
                  className="p-1 plus_imput_feild"
                  id="fileSubDepartmentImage_ManageSubDepartment"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{width:"310px"}}
                />
                <label>
                  Note: Only .jpg, .jpeg, and .png formats are allowed.
                </label>
                <div style={{ textAlign: "center" }}>
                  {/* {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "auto",
                        marginBottom: "20px",
                      }}
                    />
                  )} */}
                </div>
                <div
                  id="SubDepartmentImage_error_ManageSubDepartment"
                  className="errorsClass2"
                  style={{ paddingBottom: "10px" }}
                ></div>
              </div>
              <div className="modal-bottom plus_modal_bottom">
                <button
                  type="button"
                  className="cstm_model_plusbtn_1 btn btn-danger"
                  onClick={onClose}
                >
                  Cancel
                </button>
                {!updateModal && (<button
                  id="btnSubmit_SubDepartment"
                  type="button"
                  className="cstm_model_plusbtn_2 btn btn-danger"
                  onClick={() => handleAddUpdateDepartment(1)}
                >
                  Add
                </button>)}
                {updateModal && (<button
                  id="btnUpdate_SubDepartment"
                  type="button"
                  className="cstm_model_plusbtn_2 btn btn-danger"
                  onClick={() => handleAddUpdateDepartment(2)}

                >
                  Update
                </button>)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubDepartmentModal;
