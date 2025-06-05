import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainDepartmentModal from "./Models/MainDepartmentModal";
import axios from "axios";
import Swal from "sweetalert2";

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

interface Department {
  id: number;
  name: string;
  status: number;

}

const MainDepartment: React.FC = () => {
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [departmentData, setDepartmentData] = useState<Department[] | null>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedDeparment, setSelectedDeparment] = useState<string>("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0); 

  const toggleDelete = () => {
    setIsDeleteEnabled(!isDeleteEnabled);
  };

  const editMainDepartment = (id: number, departmentName: string) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedDeparment(departmentName);
    setSelectedDepartmentId(id); 
  };

  const confirmDeleteMainDepartment = (id: number) => {
    Swal.fire({
      title: "Delete Main-Department",
      text: "Are you sure to delete this Main-Department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMainDepartment(id);
      }
    });

  };

  const deleteMainDepartment = async (id: number) => {

    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      const apiUrl = `${import.meta.env.VITE_API_URL}api/delete/maindepartment?mainDepartmentId=${id}&restaurantLoginId=${0}`
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) { }
      Toast.fire({
        icon: 'success',
        title: 'Main Department deleted successfully',
      })

    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error deleting Main Department',
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  //fetch main department Data
  const getMaindepartmentData = async () => {
    const token = localStorage.getItem("authToken");
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/maindepartment/list?restaurantLoginId=0`
    try {
      const response = await axios.get(apiUrl, {

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200 && response.data.status === 1) {

        const data = response.data.data.mainDepartments;
        const depData = data.map((dept: any) => ({
          id: dept.Id,
          name: dept.Name,
          status: dept.Status,
        }));
        setDepartmentData(depData);
      }
    }
    catch {
      console.log("Error")
    }
    finally {
      setIsLoading(false)
    }
  }

  const updateMaindepartmentData = async (action: number, department: string) => {
    const token = localStorage.getItem("authToken")
    const apiUrl = `${import.meta.env.VITE_API_URL}api/addupdate/maindepartment`

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", String(selectedDepartmentId || 0));
      formData.append("restaurantLoginId", "0");
      formData.append("name", department);
      formData.append("mode", String(action));

      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          mimeType: 'multipart/form-data',

        }
      })
      if (response.status === 200 && response.data.status === 1) {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
      }
      else if (response.data.status === -2) {
        Toast.fire({
          icon: 'error',
          title: response.data.message,
        });
      }

    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: "failed to update main department Data",
      });
    }
    finally {
      setIsModalOpen(false);
      setIsEdit(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMaindepartmentData();
  }, [isLoading])
  
  // Function to handle modal opening
  const openCreateMainDepartmentPopup = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal closing
  const closeCreateMainDepartmentPopup = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  return (
    <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
      {isLoading && (<div style={{
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
      <div className="top_area_row">
        <div className="row">
          <div className="col-sm-8">
            <nav>
              <div className="sm:pl-1 main_nav_bread">
                <ol className="breadcrumb pl-3">
                  <li className="breadcrumb-item nav_bread_one">
                    <Link
                      className="fs-6 fw-bold"
                      to="/Restaurant/ManageProducts"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="breadcrumb-item nav_right pl-1 px-2">
                    <Link
                      to=""
                      style={{ textDecoration: "none", cursor: "text" }}
                    >
                      <i
                        className="pt-1 fs-6 fa fa-angle-right "
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item nav_bread_two pl-0">
                    <Link
                      className="fs-6 fw-bold"
                      to=""
                      style={{ textDecoration: "none", cursor: "text" }}
                    >
                      Main Department
                    </Link>
                  </li>
                </ol>
              </div>
            </nav>
          </div>
        </div>

        <div className="main_deapt">
          <div className="row align-items-center">
            <div className="col-sm-10">
              <h2 className="mb-0">MAIN DEPARTMENT</h2>
            </div>
            <div className="col-sm-2">
              <div className="check_wrap-right">
                <div className="form-group mb-0">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="sb-checkbox__input cstm_wrap_uppr"
                      id="chkDeleteMainDepartment"
                      name="chkDeleteMainDepartment"
                      checked={isDeleteEnabled}
                      onChange={toggleDelete}
                    />
                    <label
                      className="sb-checkbox__label sb-checkbox__label--green wrap_label_check"
                      htmlFor="chkDeleteMainDepartment"
                    ></label>
                    <span className="onlie_prder"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="main_dept_below">
            <div id="dv_MainDeparmentsList_Section" className="">
              <div className="row" >
                {departmentData && departmentData.map((department) => (
                  <div
                    key={department.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2"
                    // onClick={() => editMainDepartment(department.id, department.name)}
                  >
                    <div
                      className="mainDepartmentsListClass "
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        boxSizing: "border-box",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        className="h-[139px] wrap_chekox-remove"
                      >
                        <span>
                          <a
                            href="javascript:;"
                            title={department.name}
                            onClick={() => editMainDepartment(department.id, department.name)}
                            className="text-lg font-semibold text-blue-600 hover-underline"
                          >
                            {department.name}
                          </a>
                        </span>
                        {isDeleteEnabled && (
                          <span
                            className="removecions removeIconMainDepartmentClass cursor-pointer text-red-500"
                            onClick={() =>
                              confirmDeleteMainDepartment(department.id)
                            }
                          >
                            <span className="material-symbols-outlined">
                              remove
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div> */}
                  {/* Trigger Button */}
                  <div className="col-sm-2 wrapadd-plus-cion">
                    <div className="svg_plus_icon">
                      <a
                        href="javascript:void(0);"
                        onClick={openCreateMainDepartmentPopup}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                        >
                          <g
                            id="Group_12423"
                            data-name="Group 12423"
                            transform="translate(-688.5 -285.5)"
                          >
                            <line
                              id="Line_85"
                              data-name="Line 85"
                              y2="16"
                              transform="translate(697.5 286.5)"
                              fill="none"
                              stroke="#1c2126"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></line>
                            <line
                              id="Line_86"
                              data-name="Line 86"
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
                  </div>
                {/* </div> */}


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Component */}
      {isModalOpen && (
        <MainDepartmentModal
          onClose={closeCreateMainDepartmentPopup}
          onCreateMainDepartment={(action, departmentValue) => {
            console.log("mode:", action)
            updateMaindepartmentData(action, departmentValue);
          }
        }
          editModal={isEdit}
          selectedDepartmentName={selectedDeparment}
          selectedDepartmentId={selectedDepartmentId}

        />
      )}
    </div>
  );
};

export default MainDepartment;
