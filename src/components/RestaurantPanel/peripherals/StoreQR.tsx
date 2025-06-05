import React, { useEffect, useState } from "react";
import "../../../assets/CSS/peripheral.css";
import axios from "axios";
import DeliveryZoneModal from "./ManageOrderModals/DeliveryZoneModal";
import OrderNumberModal from "./StoreQrModal/OrderNumberModal";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
        popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

interface WorkflowSettingData {
    EnableDeliveryFee: boolean;
    SuggestedTip: boolean;
    TipAmount_1: string;
    TipAmount_2: string;
    TipAmount_3: string;
    AllowScheduleOrder: boolean;
    RequirePaymentWhenPlacingOrder: boolean;
    AllowUserAppToPlaceThePickupOrder: boolean;
    AllowCashOnPickup: boolean;
    AutoAcceptPaidOrder_Pickup: boolean;
    EstimatedTime_Pickup: string;
    AllowUserAppToPlaceTheDeliveryOrder: boolean;
    MinimumCharge_Delivery: string;
    AllowCashOnDelivery: boolean;
    AutoAcceptPaidOrder_Delivery: boolean;
    EstimatedTime_Delivery: string;
    BannerColor: string;
    MinOrderNumber: number | string;
    MaxOrderNumber: number | string;
    SetProductViewType: string;
    RestaurantLoginId: number;
    LogoImage: string | null;
}
interface DeliveryZone {
    Id: number;
    ZoneName: string;
    DistanceValue: string;
    DeliveryFee: string;
}

const StoreQR: React.FC = () => {
    const UserToken_Global = localStorage.getItem("authToken");
    const [workflowSetting, setWorkflowSetting] =
        useState<WorkflowSettingData | null>(null);
    const [newColor, setNewColor] = useState(workflowSetting?.BannerColor);

    const fetchWorkflowSettings = async () => {
        try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL
            }api/get/all/wokflow/setting/data/lists?restaurantLoginId=${0}`,
            {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                "Content-Type": "application/json",
            },
          }
      );
        const { data } = response.data;
        if (data && data._list) {
            setWorkflowSetting(data._list);
            setNewColor(data._list.BannerColor);
        } else {
            console.error("Invalid data received");
        }
    } catch (error) {
          console.error("Error fetching workflow settings:", error);
      }
  };

    const handleSave = async () => {
        try {
        const updatedWorkflowSetting = {
            ...workflowSetting,
            BannerColor: newColor,
        };

        updatedWorkflowSetting.LogoImage = " ";

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL
            }api/restaurant/update/workflow/setting/status`,
            updatedWorkflowSetting,
            {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                "Content-Type": "application/json",
            },
          }
      );

        const data = response.data;

        if (data.status === 1) {
            console.log("Workflow setting updated successfully!");
            Toast.fire({
                icon: "success",
                title: data.message,
        });
      } else {
            Toast.fire({
                icon: "error",
                title: data.message,
            });
        }
    } catch (error) {
          console.error("Error saving workflow settings:", error);
      }
  };

    const handleInputChangeColor = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setNewColor(value);
    };

    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value, type, checked, files } = event.target;

      const updatedWorkflowSetting = {
          ...workflowSetting,
          [id]:
              type === "checkbox"
                  ? checked
                      ? 1
                      : 0
                  : type === "number"
                      ? value
                          ? parseFloat(value)
                          : 0
                      : id === "file_LogoImage_WorkflowSetting"
                          ? files?.[0]?.name || ""
                          : value,
      };

      setWorkflowSetting(updatedWorkflowSetting);
      await saveSettings(updatedWorkflowSetting);
  };

    const saveSettings = async (flowsettings) => {
        try {
            flowsettings.BannerColor = newColor;

            flowsettings.LogoImage = " ";

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL
                }api/restaurant/update/workflow/setting/status`,
                flowsettings,
                {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
                    },
                }
        );

        const data = response.data;

        if (data.status === 1) {
            console.log("Workflow setting updated successfully!");
            Toast.fire({
                icon: "success",
                title: data.message,
            });
      } else {
              Toast.fire({
                  icon: "error",
                  title: data.message,
              });
          }
      } catch (error) {
          console.error("Error saving workflow settings:", error);
      }
  };

    useEffect(() => {
        fetchWorkflowSettings();
    }, []);

    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);

    const fetchDeliveryZones = async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL
            }api/get/list/deliveryzones?restaurantLoginId=${0}`;
      try {
        const response = await axios.get<{
            status: number;
            message: string;
            data: { DeliveryZones: DeliveryZone[] };
        }>(apiUrl, {
            headers: {
                Authorization: `Bearer ${UserToken_Global}`,
              "Content-Type": "application/json",
          },
      });

        if (response.data.status === 1) {
            console.log(response.data.data.DeliveryZones);
            setDeliveryZones(response.data.data.DeliveryZones);
        }
    } catch (error) {
          if (axios.isAxiosError(error)) {
              if (error.response?.status === 401) {
                  console.log(error.response);
              }
          }
      }
  };
    useEffect(() => {
        fetchDeliveryZones();
    }, [UserToken_Global]);

    const [isCreateDeliveryZonePopup, setIsCreateDeliveryZonePopup] =
        useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [zoneToUpdate, setZoneToUpdate] = useState<DeliveryZone | null>(null);

    const toggleVisibility = () => {
        setIsDetailsVisible((prev) => !prev);
    };

    const openCreateDeliveryZonePopup = () => {
        setIsCreateDeliveryZonePopup(true);
        setIsUpdate(false);
        setZoneToUpdate(null);
    };

    const openUpdateDeliveryZonePopup = async (zone: DeliveryZone) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL
                }/api/get/deliveryzones/single?Id=${zone.Id}&RestaurantLoginId=0`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    "Content-Type": "application/json",
                },
            });

        if (response.data.status === 1) {
            const fetchedZone = response.data.data;
            setIsCreateDeliveryZonePopup(true);
            setIsUpdate(true);
            setZoneToUpdate(fetchedZone);
        } else {
            console.error(
                "Failed to fetch delivery zone details:",
                response.data.message
            );
        }
    } catch (error) {
        console.error("Error fetching delivery zone:", error);
    }
  };

    const onSave = async () => {
        setIsCreateDeliveryZonePopup(false);
        await fetchDeliveryZones();
    };

    const confirmDeleteDeliveryZone = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure you want to delete this delivery zone?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

      if (result.isConfirmed) {
          try {
          const apiUrl = `${import.meta.env.VITE_API_URL
              }api/delete/restaurantdeliveryzones?Id=${id}&restaurantLoginId=0`;
          const response = await axios.get(apiUrl, {
              headers: {
                  Authorization: `Bearer ${UserToken_Global}`,
            },
        });

          if (response.data.status === 1) {
            console.log("Delivery zone deleted successfully");
            setDeliveryZones((zones) => zones.filter((zone) => zone.Id !== id));

            await Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        } else {
              console.error(
                  "Failed to delete delivery zone:",
                  response.data.message
              );
          }
      } catch (error) {
              console.error("Error deleting delivery zone:", error);
          }
      }
  };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSaveOrderNumbers = (
        minOrderNumber: string,
        maxOrderNumber: string
    ) => {
        console.log("Saving Order Numbers:", minOrderNumber, maxOrderNumber);
    };

    return (
        <>
          <div className="storeqr-box">
              <div
                  id="contentWrapper_RestaurantLayout"
                  className="content-wrapper timing_stores"
              >
                  <div className="col-12 text-center ">
                      <ul className="nav nav-tabs software_settings" role="tablist">
                          <li className="nav-item">
                              <a
                                  className="nav-link  active"
                                  data-toggle="tab"
                                  href="#online_order"
                              >
                                  Online Ordering
                              </a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link " data-toggle="tab" href="#restaurant">
                                  Workflow
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div className="wrapper-navs_wraps wrapper-box">
                      <div className="col-md-12 col-lg-12 col-sm-12 px-0">
                          <div className="tab-content tab-set mx-2">
                              <div
                                  id="online_order"
                                  className="container-fluid tab-pane active"
                              >
                                  <div className="timing-cgt-desc store">
                                      <div className="cgt-desc store_timimgs-wraps">
                                          <div className="cgt-content">
                                              <div id="store_qr_code" className="tab">
                                                  <div className="timing-cgt-desc wrap_delay-setting p-0">
                                                      <div className="scan_qr-code p-2 ">
                                                          <h4 className="qr_code-heading">
                                                              QR Code for Store
                                                          </h4>
                                                          <div className="scanner_image">
                                                              <img
                                                                  id="imgRestaurantQRCode_SoftwareSetting"
                                                                  src="./Content/ImageUploads/RestaurantQRCode/e63b5c2e90274c822885ae9b.png"
                                                                  alt="QR_Code"
                                                                  className="qr_codes-img mx-auto"
                                                                  style={{ maxWidth: "130px", height: "auto" }}
                                                              />
                                                          </div>
                                                          <div className="wrap_scanner_buttons">
                                                              <button
                                                                  type="button"
                                                                  className="btn btn-primary scanner_codebutton"
                                                              >
                                                                  Generate QR code
                                                              </button>
                                                              <button
                                                                  id="btnPrint_RestaurantQRCode_SoftwareSetting"
                                                                  type="button"
                                                                  className="btn btn-primary scanner_codebutton"
                                                              >
                                                                  Print QR code
                                                              </button>
                                                              <button
                                                                  id="btnDelete_RestaurantQRCode_SoftwareSetting"
                                                                  type="button"
                                                                  className="btn btn-primary scanner_codebutton delete_scanner"
                                                              >
                                                                  Delete QR code
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div
                                                      id="dv_RestaurantQRCode_PrintableSection_SoftwareSetting"
                                                      style={{ display: "none" }}
                                                  >
                                                      <img
                                                          id="imgRestaurantQRCode_Printable_SoftwareSetting"
                                                          src="./Content/ImageUploads/RestaurantQRCode/e63b5c2e90274c822885ae9b.png"
                                                          alt="QR_Code"
                                                          style={{ width: "100%" }}
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div
                                  id="restaurant"
                                  className="container-fluid tab-pane fade active px-0"
                              >
                                  <div className="workflow-tab !p-3 sm:!p-5">
                                      <ul
                                          className="nav nav-pills mb-3 space-y-1 justify-content-center "
                                          id="pills-tab"
                                          role="tablist"
                                      >
                                          <li className="nav-item" role="presentation">
                                              <button
                                                  className="nav-link active backcolor"
                                                  id="pills-General-tab"
                                                  data-toggle="pill"
                                                  data-target="#pills-General"
                                                  type="button"
                                                  role="tab"
                                                  aria-controls="pills-General"
                                                  aria-selected="true"
                                              >
                                                  General
                                              </button>
                                          </li>
                                          <li className="nav-item" role="presentation">
                                              <button
                                                  className="nav-link  "
                                                  id="pills-Workflow-tab"
                                                  data-toggle="pill"
                                                  data-target="#pills-Workflow"
                                                  type="button"
                                                  role="tab"
                                                  aria-controls="pills-Workflow"
                                                  aria-selected="false"
                                              >
                                                  Workflow Settings
                                              </button>
                                          </li>
                                          <li className="nav-item d-none" role="presentation">
                                              <button
                                                  className="nav-link "
                                                  id="pills-Users-tab"
                                                  data-toggle="pill"
                                                  data-target="#pills-Users"
                                                  type="button"
                                                  role="tab"
                                                  aria-controls="pills-Users"
                                                  aria-selected="false"
                                              >
                                                  Users Apps Settings
                                              </button>
                                          </li>
                                      </ul>

                                      <div className="tab-content" id="pills-tabContent">
                                          <div
                                              className="tab-pane fade show active"
                                              id="pills-General"
                                              role="tabpanel"
                                              aria-labelledby="pills-General-tab"
                                          >
                                              <div className="container-fluid px-0">
                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          USER APP DELIVERY ORDER
                                                          <span>
                                                              <i
                                                                  className="fa fa-question-circle"
                                                                  aria-hidden="true"
                                                              ></i>
                                                          </span>
                                                      </h6>

                                                      <div className="input-bx">
                                                          <h6>Allow User to Place the Delivery Order</h6>
                                                          <span className="mt-1">
                                                              <div className="toggle-bx text-center">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          id="AllowUserAppToPlaceTheDeliveryOrder"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.AllowUserAppToPlaceTheDeliveryOrder
                                                                              ) === 1
                                                                          }
                                                                          onChange={(e) => {
                                                                              handleInputChange(e);
                                                                          }}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </span>
                                                      </div>

                                                      <div
                                                          id="deliveryordercollapse"
                                                          style={{
                                                              display:
                                                                  workflowSetting?.AllowUserAppToPlaceTheDeliveryOrder
                                                                      ? "block"
                                                                      : "none",
                                                          }}
                                                      >
                                                          <div className="input-bx flex flex-wrap">
                                                              <h6>Minimum Charge</h6>
                                                              <span className="mt-1">
                                                                  <input
                                                                      type="number"
                                                                      min="1"
                                                                      id="MinimumCharge_Delivery"
                                                                      name="MinimumCharge_Delivery"
                                                                      placeholder="0.0"
                                                                      className="time-input"
                                                                      defaultValue={
                                                                          workflowSetting?.MinimumCharge_Delivery ||
                                                                          ""
                                                                      }
                                                                      onChange={handleInputChange}
                                                                  />
                                                              </span>
                                                          </div>
                                                          <div className="input-bx">
                                                              <h6>Allow Cash on Delivery</h6>
                                                              <span className="mt-1">
                                                                  <div className="toggle-bx text-center">
                                                                      <label className="switch mb-0">
                                                                          <input
                                                                              type="checkbox"
                                                                              id="AllowCashOnDelivery"
                                                                              checked={
                                                                                  Number(
                                                                                      workflowSetting?.AllowCashOnDelivery
                                                                                  ) === 1
                                                                              }
                                                                              onChange={handleInputChange}
                                                                          />
                                                                          <span className="slider round"></span>
                                                                      </label>
                                                                  </div>
                                                              </span>
                                                          </div>
                                                          <div className="input-bx">
                                                              <h6>Auto Accept Paid Order</h6>
                                                              <span className="mt-1">
                                                                  <div className="toggle-bx text-center">
                                                                      <label className="switch mb-0">
                                                                          <input
                                                                              type="checkbox"
                                                                              id="AutoAcceptPaidOrder_Delivery"
                                                                              checked={
                                                                                  Number(
                                                                                      workflowSetting?.AutoAcceptPaidOrder_Delivery
                                                                                  ) === 1
                                                                              }
                                                                              onChange={handleInputChange}
                                                                          />
                                                                          <span className="slider round"></span>
                                                                      </label>
                                                                  </div>
                                                              </span>
                                                          </div>
                                                          <div className="input-bx flex flex-wrap">
                                                              <h6>Estimated Time Of The Delivery (mins)</h6>
                                                              <span className="mt-1">
                                                                  <input
                                                                      type="number"
                                                                      min="1"
                                                                      id="EstimatedTime_Delivery"
                                                                      name="EstimatedTime_Delivery"
                                                                      placeholder="0"
                                                                      className="time-input"
                                                                      defaultValue={
                                                                          workflowSetting?.EstimatedTime_Delivery ||
                                                                          ""
                                                                      }
                                                                      onChange={handleInputChange}
                                                                  />
                                                              </span>
                                                          </div>

                                                          <div className="table-input text-left">
                                                              <div
                                                                  className="input-bx"
                                                                  onClick={toggleVisibility}
                                                              >
                                                                  <h6>Create Delivery Zone</h6>
                                                                  <span>
                                                                      <i
                                                                          className="fa fa-angle-right"
                                                                          aria-hidden="true"
                                                                      ></i>
                                                                  </span>
                                                              </div>

                                                              {isDetailsVisible && (
                                                                  <div id="deliveryZoneDetails">
                                                                      <div
                                                                          id="delivery_zone_data"
                                                                          className="mt-4 !grid !grid-rows-2 sm:!grid-cols-6"
                                                                      >
                                                                          <div className="delivery_zone_remark !col-span-1 sm:!col-span-4">
                                                                              <b>Note:</b> If no delivery zone is
                                                                              created, the delivery zone will be
                                                                              disabled.
                                                                          </div>
                                                                          <button
                                                                              type="button"
                                                                              className="btn add-pay sm:col-span-2 "
                                                                              onClick={openCreateDeliveryZonePopup}
                                                                          >
                                                                              + Create Delivery Zone
                                                                          </button>
                                                                      </div>

                                                                      {isCreateDeliveryZonePopup && (
                                                                          <DeliveryZoneModal
                                                                              onClose={() =>
                                                                                  setIsCreateDeliveryZonePopup(false)
                                                                              }
                                                                              onSave={onSave}
                                                                              isUpdate={isUpdate}
                                                                              existingZone={zoneToUpdate}
                                                                          />
                                                                      )}
                                                                      <div className="overflow-scroll">
                                                                      <table id="tbl_DeliveryZoneList_Section_WorkflowSetting">
                                                                          <thead>
                                                                              <tr>
                                                                                  <th>Zone Name</th>
                                                                                  <th>Distance Value</th>
                                                                                  <th>Delivery Fee</th>
                                                                                  <th>Actions</th>
                                                                              </tr>
                                                                          </thead>
                                                                          <tbody>
                                                                              {deliveryZones.length > 0 ? (
                                                                                  deliveryZones.map((zone) => (
                                                                                      <tr key={zone.Id}>
                                                                                          <td>{zone.ZoneName}</td>
                                                                                          <td>{`${zone.DistanceValue} KM`}</td>
                                                                                          <td>{`$ ${zone.DeliveryFee}`}</td>
                                                                                          <td className="text-center mx-auto">
                                                                                              <i
                                                                                                  className="fa fa-edit "
                                                                                                  title="Edit Zone"
                                                                                                  aria-hidden="true"
                                                                                                  onClick={() =>
                                                                                                      openUpdateDeliveryZonePopup(
                                                                                                          zone
                                                                                                      )
                                                                                                  }
                                                                                              ></i>
                                                                                              <i
                                                                                                  className="fa fa-trash"
                                                                                                  title="Delete Zone"
                                                                                                  aria-hidden="true"
                                                                                                  onClick={() =>
                                                                                                      confirmDeleteDeliveryZone(
                                                                                                          zone.Id
                                                                                                      )
                                                                                                  }
                                                                                              ></i>
                                                                                          </td>
                                                                                      </tr>
                                                                                  ))
                                                                              ) : (
                                                                                      <tr>
                                                                                          <td
                                                                                              colSpan={4}
                                                                                              className="text-center"
                                                                                          >
                                                                                              No data found
                                                                                          </td>
                                                                                      </tr>
                                                                              )}
                                                                          </tbody>
                                                                      </table>
                                                                        </div>          
                                                                  </div>
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <hr />
                                                  <div className="table-input">
                                                      <div
                                                          className="suggest-bx text-left"
                                                          id="SuggestedTipContainer"
                                                      >
                                                          <h6
                                                              style={{
                                                                  fontSize: "15px",
                                                                  fontWeight: "bolder",
                                                              }}
                                                          >
                                                              SUGGESTED TIP
                                                              <i
                                                                  className="fa fa-question-circle"
                                                                  aria-hidden="true"
                                                              ></i>
                                                              <div className="toggle-bx text-right">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          id="SuggestedTip"
                                                                          placeholder="00.0"
                                                                          name="SuggestedTip"
                                                                          data-id="0"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.SuggestedTip
                                                                              ) === 1
                                                                          }
                                                                          onChange={(e) => {
                                                                              handleInputChange(e);
                                                                              updateSuggestedTipStatus(e);
                                                                          }}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </h6>

                                                          <div
                                                              className="row align-items-center"
                                                              id="SuggestedTipDetails"
                                                              style={{
                                                                  display: workflowSetting?.SuggestedTip
                                                                      ? "block"
                                                                      : "none",
                                                              }}
                                                          >
                                                              <div className="col-12">
                                                                  <div className="row align-items-center mb-2">
                                                                      <div className="col-4">
                                                                          <label htmlFor="TipAmount_1">
                                                                              1st Amount
                                                                          </label>
                                                                          <input
                                                                              type="number"
                                                                              className="form-control IsNumeric"
                                                                              id="TipAmount_1"
                                                                              name="TipAmount_1"
                                                                              placeholder="00"
                                                                              value={
                                                                                  workflowSetting?.TipAmount_1 || ""
                                                                              }
                                                                              onChange={(e) =>
                                                                                  setWorkflowSetting((prev) => {
                                                                                      if (!prev) return null;
                                                                                      return {
                                                                                          ...prev,
                                                                                          TipAmount_1: e.target.value,
                                                                                      };
                                                                                  })
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="col-4">
                                                                          <label htmlFor="TipAmount_2">
                                                                              2nd Amount
                                                                          </label>
                                                                          <input
                                                                              type="number"
                                                                              className="form-control IsNumeric"
                                                                              id="TipAmount_2"
                                                                              name="TipAmount_2"
                                                                              placeholder="00"
                                                                              value={
                                                                                  workflowSetting?.TipAmount_2 || ""
                                                                              }
                                                                              onChange={(e) =>
                                                                                  setWorkflowSetting((prev) => {
                                                                                      if (!prev) return null;
                                                                                      return {
                                                                                          ...prev,
                                                                                          TipAmount_2: e.target.value,
                                                                                      };
                                                                                  })
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="col-4">
                                                                          <label htmlFor="TipAmount_3">
                                                                              3rd Amount
                                                                          </label>
                                                                          <input
                                                                              type="number"
                                                                              className="form-control IsNumeric"
                                                                              id="TipAmount_3"
                                                                              name="TipAmount_3"
                                                                              placeholder="00"
                                                                              value={
                                                                                  workflowSetting?.TipAmount_3 || ""
                                                                              }
                                                                              onChange={(e) =>
                                                                                  setWorkflowSetting((prev) => {
                                                                                      if (!prev) return null;
                                                                                      return {
                                                                                          ...prev,
                                                                                          TipAmount_3: e.target.value,
                                                                                      };
                                                                                  })
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="col-2">
                                                                          <button
                                                                              type="button"
                                                                              id="tip_Save_button"
                                                                              className="btn-tip"
                                                                              onClick={() => handleSave()}
                                                                          >
                                                                              Save
                                                                          </button>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <hr />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div
                                              className="tab-pane fade"
                                              id="pills-Workflow"
                                              role="tabpanel"
                                              aria-labelledby="pills-Workflow-tab"
                                          >
                                              <div className="container-fluid text-center">
                                                  <div className="schedule-tab">
                                                      <div className="deilay-input text-left mb-3">
                                                          <h6 className="font-weight-bold">
                                                              SCHEDULED ORDER PROCESSING{" "}
                                                              <i
                                                                  className="fa fa-question-circle"
                                                                  aria-hidden="true"
                                                              ></i>
                                                          </h6>
                                                          <div className="delay-bx">
                                                              <h6 className="mb-0">Allow Schedule Order</h6>
                                                              <span className="mt-1">
                                                                  <div className="toggle-bx text-center">
                                                                      <label className="switch mb-0">
                                                                          <input
                                                                              type="checkbox"
                                                                              className="toggleBtn_WorkflowSetting"
                                                                              id="AllowScheduleOrder"
                                                                              data-id="0"
                                                                              checked={
                                                                                  Number(
                                                                                      workflowSetting?.AllowScheduleOrder
                                                                                  ) === 1
                                                                              }
                                                                              onChange={handleInputChange}
                                                                          />
                                                                          <span className="slider round"></span>
                                                                      </label>
                                                                  </div>
                                                              </span>
                                                          </div>
                                                      </div>
                                                  </div>

                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          ORDER PAYMENT{" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx">
                                                          <h6>Require Payment When Placing Order</h6>
                                                          <span className="mt-1">
                                                              <div className="toggle-bx text-center">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          className="toggleBtn_WorkflowSetting"
                                                                          id="RequirePaymentWhenPlacingOrder"
                                                                          data-id="0"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.RequirePaymentWhenPlacingOrder
                                                                              ) === 1
                                                                          }
                                                                          onChange={handleInputChange}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </span>
                                                      </div>
                                                  </div>

                                                  <div className="table-input text-left mb-3 mt-3">
                                                      <h6 className="font-weight-bold">
                                                          BANNER COLOR{" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx">
                                                          <input
                                                              type="color"
                                                              id="BannerColor"
                                                              name="BannerColor"
                                                              value={newColor}
                                                              onChange={handleInputChangeColor}
                                                          />
                                                          <button
                                                              type="button"
                                                              className="btn upload-pay custom-mb"
                                                              style={{ marginBottom: "3px" }}
                                                              onClick={handleSave}
                                                          >
                                                              Save
                                                          </button>
                                                      </div>
                                                  </div>

                                                  <hr />

                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          SET ORDER START NUMBER FOR WEB ORDERS{" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx" onClick={handleModalOpen}>
                                                          <h6>Order Start Number</h6>
                                                          <span className="mt-1">
                                                              <i
                                                                  className="fa fa-angle-right"
                                                                  aria-hidden="true"
                                                              ></i>
                                                          </span>
                                                      </div>
                                                      {isModalOpen && (
                                                          <OrderNumberModal
                                                              onClose={handleModalClose}
                                                              onSave={handleSaveOrderNumbers}
                                                          />
                                                      )}
                                                  </div>

                                                  <hr />

                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          USER APP PICKUP ORDER{" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx">
                                                          <h6>Allow User to place the Pickup Order</h6>
                                                          <span className="mt-1">
                                                              <div className="toggle-bx text-center">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          id="AllowUserAppToPlaceThePickupOrder"
                                                                          data-id="0"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.AllowUserAppToPlaceThePickupOrder
                                                                              ) === 1
                                                                          }
                                                                          onChange={handleInputChange}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </span>
                                                      </div>

                                                      <div className="input-bx">
                                                          <h6>Allow Cash on Pickup</h6>
                                                          <span className="mt-1">
                                                              <div className="toggle-bx text-center">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          id="AllowCashOnPickup"
                                                                          data-id="0"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.AllowCashOnPickup
                                                                              ) === 1
                                                                          }
                                                                          onChange={handleInputChange}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </span>
                                                      </div>

                                                      <div className="input-bx">
                                                          <h6>Auto Accept Paid Order</h6>
                                                          <span className="mt-1">
                                                              <div className="toggle-bx text-center">
                                                                  <label className="switch mb-0">
                                                                      <input
                                                                          type="checkbox"
                                                                          id="AutoAcceptPaidOrder_Pickup"
                                                                          data-id="0"
                                                                          checked={
                                                                              Number(
                                                                                  workflowSetting?.AutoAcceptPaidOrder_Pickup
                                                                              ) === 1
                                                                          }
                                                                          onChange={handleInputChange}
                                                                      />
                                                                      <span className="slider round"></span>
                                                                  </label>
                                                              </div>
                                                          </span>
                                                      </div>

                                                      <div className="input-bx">
                                                          <h6>Estimated Time (mins)</h6>
                                                          <span className="mt-1">
                                                              <input
                                                                  type="number"
                                                                  min="1"
                                                                  id="EstimatedTime_Pickup"
                                                                  name="EstimatedTime_Pickup"
                                                                  placeholder="0"
                                                                  className="time-input"
                                                                  defaultValue={
                                                                      workflowSetting?.EstimatedTime_Pickup || ""
                                                                  }
                                                                  onChange={handleInputChange}
                                                              />
                                                          </span>
                                                      </div>
                                                  </div>

                                                  <hr />

                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          Upload Logo{" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx-ws">
                                                          <div className="logo-detail-ws">
                                                              <div className="mylogo-ws">
                                                                  <div className="imageWrapper-ws">
                                                                      <img
                                                                          className="image"
                                                                          id="imgLogoImage_WorkflowSetting"
                                                                          src="../../Content/ImageUploads/ProductImages/d0c30767bbd6.jpg"
                                                                          alt="Logo"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="container">
                                                              <div className="file-upload-ws aline_input">
                                                                  <input
                                                                      type="file"
                                                                      accept="image/jpeg, image/png"
                                                                      name="file_LogoImage_WorkflowSetting"
                                                                      id="file_LogoImage_WorkflowSetting"
                                                                      className="me-2"
                                                                      style={{ fontSize: "15px" }}
                                                                  />
                                                                  <button
                                                                      id="btnSubmit_LogoImage_WorkflowSetting"
                                                                      type="button"
                                                                      className="btn upload-logo custom-mb"
                                                                  >
                                                                      Save
                                                                  </button>
                                                              </div>
                                                              <div className="file-upload-ws mt-4">
                                                                  <p>
                                                                      <b>Note : </b>Maximum Dimensions{" "}
                                                                      <span className="text-danger">800*800</span>
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>

                                                  <hr />

                                                  <div className="table-input text-left mb-3">
                                                      <h6 className="font-weight-bold">
                                                          SET PRODUCT VIEW TYPE (MOBILE SCREEN){" "}
                                                          <i
                                                              className="fa fa-question-circle"
                                                              aria-hidden="true"
                                                          ></i>
                                                      </h6>
                                                      <div className="input-bx">
                                                          <h6>PRODUCT VIEW</h6>
                                                          <span className="mt-1">
                                                              <span className="form-group">
                                                                  <select
                                                                      id="SetProductViewType"
                                                                      data-id="0"
                                                                      value={
                                                                          workflowSetting?.SetProductViewType || ""
                                                                      }
                                                                      onChange={handleInputChange}
                                                                  >
                                                                      <option value="1">Grid View</option>
                                                                      <option value="2">List View</option>
                                                                  </select>
                                                              </span>
                                                          </span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      {/* <button
                      type="button"
                      id="tip_Save_button"
                      className="btn-tip "
                      onClick={() => handleSave()}
                    >
                      Save Settings
                    </button> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
};

export default StoreQR;
