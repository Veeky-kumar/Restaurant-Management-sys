import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddSubDepartmentModal from "./Models/AddSubDepartmentModal";
import Swal from "sweetalert2";
import axios from "axios";
// import AddSubDepartmentModal from "./AddSubDepartmentModal";


interface Department {
  Id: number;
  Name: string;
  Status: number;

}
interface DepartmentResponse {
  Id: number;
  Name: string;
}

interface Printgroup {
  id: number;
  name: string;
  status: number;
}

const AddDepartment: React.FC = () => {
  const [isDeleteEnabled, setDeleteEnabled] = useState(false);
  const [subDepartments, setSubDepartments] = useState<Department[]>([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  // const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  // const [selectedMainDepartment, setSelectedMainDepartment] = useState("0");
  // const [departmentName, setDepartmentName] = useState("");
  // const [selectedPrintGroup, setSelectedPrintGroup] = useState("0");
  // const [previewImage, setPreviewImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mainDepartmentList, setMainDepartmentList] = useState<DepartmentResponse[]>([]);
  const [printGroups, setPrintGroups] = useState<Printgroup[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0)
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const UserToken_Global = localStorage.getItem("authToken");

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setUpdateModal(false);
    setModalVisible(false);
    setSelectedDepartmentId(0);
    
  }

  //Get Sub-Depart List
  const fetchSubDepartments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department/list?restaurantLoginId=0`, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
        },
      });
      if (response?.data?.status === 1) {
        const data = response.data.data.subDepartments
        const depData = data.map((dept: any) => ({
          Id: dept.Id,
          Name: dept.Name,
          Status: dept.Status,
        }));
        setSubDepartments(depData);

      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error fetching the sub-departments.",
        icon: "error",
      });
    }
    finally {
      setLoading(false);
    }
  };

  //Get Main Department List
  const fetchMainDepartmentList = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/active/maindepartment/list?restaurantLoginId=${0}`
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json"
        }

      })
      if (response.data.status === 1 || response.status === 200) {
        const data = response.data.data.mainDepartments;
        const depData = data.map((dept: any) => ({
          Id: dept.Id,
          Name: dept.Name,
        }));
        setMainDepartmentList(depData);
      }
    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }

  // Get Print Group List 
  const getPrintGroupData = async () => {
    const token = localStorage.getItem("authToken");
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/printgroup/list?restaurantLoginId=0`
    try {
      const response = await axios.get(apiUrl, {

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200 && response.data.status === 1) {

        const data = response.data.data.printGroupsList;

        const depData = data.map((dept: any) => ({
          id: dept.Id,
          name: dept.Name,
          status: dept.Status,
        }));
        setPrintGroups(depData);
      }
    }
    catch {
      console.log("Error")
    }
    finally {
      setLoading(false);
    }
  }

  const editSubDepartment = async (id:number) => {
    
    setSelectedDepartmentId(id);
    setUpdateModal(true)
    openModal();
  
  };

  //Delete confirmation
  const confirmDeleteSubDepartment = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubDepartment(id);

      }
    });
  };

  //Delete Sub DepartmentItem
  const deleteSubDepartment = async (id: number) => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_API_URL}api/delete/subdepartment?subDepartmentId=${id}&restaurantLoginId=${0}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          'Content-Type': 'application/json',
        }
      })
      if (response.data.status == 1) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
      else {
        Swal.fire({
          title: "Failed!",
          text: response.data.message,
          icon: "error"
        });
      }

    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }

  const handleDeleteToggle = () => {
    setDeleteEnabled(!isDeleteEnabled);
  };

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   setShowCropModal(true);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setPreviewImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };



  useEffect(() => {
    fetchSubDepartments();
    fetchMainDepartmentList();
    getPrintGroupData();
  }, [isModalVisible, loading]);

  return (
    <div className=" department-class sidebar-icon-only min-vh-100">
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


      <div
        id="contentWrapper_RestaurantLayout"
        className="content-wrapper "
      >
        <div className="top_area_row">
          <div className="row">
            <div className=" col-sm-8">
              <nav>
                <div className="pl-1 main_nav_bread">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item nav_bread_one">
                      <Link to="/Restaurant/ManageProducts">Products</Link>
                    </li>
                    <li className="breadcrumb-item nav_right pl-0">
                      <a
                        href="#"
                        style={{ textDecoration: "none", cursor: "text" }}
                      >
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item nav_bread_two pl-0">
                      <a
                        href="#"
                        style={{ textDecoration: "none", cursor: "text" }}
                      >
                        Department
                      </a>
                    </li>
                  </ol>
                </div>
              </nav>
            </div>
          </div>
          {/* </div> */}

          <div className="main_deapt">
            <div className="row">
              <div className="col-sm-10">
                <h2 className="mb-0">DEPARTMENT{showCropModal && (<h1>modal true</h1>)}</h2>
              </div>
              <div className="col-sm-2">
                <div className="check_wrap-right">
                  <div className="form-group mb-0">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="sb-checkbox__input cstm_wrap_uppr"
                        id="chkDeleteSubDepartment"
                        name="chkDeleteSubDepartment"
                        checked={isDeleteEnabled}
                        onChange={handleDeleteToggle}
                      />
                      <label
                        className="sb-checkbox__label sb-checkbox__label--green wrap_label_check"
                        htmlFor="chkDeleteSubDepartment"
                      ></label>
                      <span className="onlie_prder"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_dept_below">
              <div
                id="dv_SubDeparmentsList_Section"
                className="row ui-sortable"
              >
                {subDepartments.map((subDept) => (
                  <div
                    key={subDept.Id}
                    className="flex flex-wrap col-sm-2 subDepartmentsListClass ui-sortable-handle"
                    data-sid={subDept.Id}
                  >
                    <div className="wrap_chekox-remove !w-full">
                      <span>
                        <a
                          href="#"
                          onClick={() => editSubDepartment(subDept.Id)}
                          title={subDept.Name}
                        >
                          {subDept.Name}
                        </a>
                      </span>
                      {isDeleteEnabled && (
                        <span
                          className="removecions removeIconSubDepartmentClass"
                          onClick={() => confirmDeleteSubDepartment(subDept.Id)}
                        >
                          <span className="material-symbols-outlined">
                            remove
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-sm-2 wrapadd-plus-cion ">
                  <div className="svg_plus_icon  ">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <g transform="translate(-688.5 -285.5)">
                          <line
                            y2="16"
                            transform="translate(697.5 286.5)"
                            fill="none"
                            stroke="#1c2126"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></line>
                          <line
                            x2="16"
                            transform="translate(689.5 294.5)"
                            fill="none"
                            stroke="#1c2126"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></line>
                        </g>
                      </svg>
                    </a>
                  </div>

                  <AddSubDepartmentModal
                    isVisible={isModalVisible}
                    mainDepartments={mainDepartmentList}
                    printGroupList={printGroups}
                    updateModal={updateModal}
                    onClose={closeModal}
                    selectedId={selectedDepartmentId}
                    setShowCropModal={setShowCropModal}
                    showCropModal={showCropModal}
                  />
                </div>

                <div>
                  {/* Response Modal */}
                  {showResponseModal && (
                    <div className="modal" style={{ zIndex: 1065 }}>
                      <div className="modal-dialog cstm_modal_dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Response Message</h4>
                          </div>
                          <div className="modal-body">
                            <p id="lblResponseMessage_SubDepartment_Modal">
                              Response Message
                            </p>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => setShowResponseModal(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Crop Image Modal */}
                  {showCropModal && (
                    <div
                      className="modal show"
                      id="CropImage_SubDepartment_Modal"
                      data-backdrop="static"
                      data-keyboard="false"
                      style={{ display: "block" }}
                    >
                      <div
                        className="modal-dialog cstm_modal_dialog"
                        style={{ marginTop: "93px" }}
                      >
                        <div
                          className="modal-content plus_modal_cont"
                          style={{ width: "700px", marginLeft: "-80px" }}
                        >
                          <div
                            className="modal-header plus_modal_head"
                            style={{
                              display: "block",
                              paddingBottom: "0px",
                              textAlign: "center",
                            }}
                          >
                            <h4
                              className="modal-title plus_head_popup"
                              style={{ left: "0px" }}
                            >
                              Adjust SubDepartment Image
                            </h4>
                          </div>

                          <div className="modal-body new_modal_work">
                            <div className="form-group plus_from_group">
                              <main>
                                <div className="demo">
                                  <div className="image-wrapper">
                                    <div
                                      id="dv_CropImage_Section"
                                      style={{ textAlign: "center" }}
                                    >
                                      {/* Content for cropping can be added here */}
                                    </div>
                                  </div>
                                </div>
                              </main>
                            </div>
                            <div className="modal-bottom plus_modal_bottom">
                            <button
                                id="btnCancel_CropImage_SubDepartment_Modal"
                              type="button"
                                className="cstm_model_plusbtn_1 btn btn-danger"
                                // onClick={onCancel} 
                                style={{ display: "none" }}
                              >
                                Cancel
                              </button>

                              <button
                                id="btnSet_CropImage_SubDepartment_Modal"
                                type="button"
                                className="cstm_model_plusbtn_2 btn btn-danger"
                              // onClick={onSet}
                            >
                              Set
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* </div>
        </div>
        
    </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
