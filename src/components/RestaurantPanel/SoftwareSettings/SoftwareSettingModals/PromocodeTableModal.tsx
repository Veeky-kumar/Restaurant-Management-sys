import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPromocodeModal from "./AddPromocodeModal";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

type PromoCode = {
  Id: number;
  Name: string;
  PromoCode: string;
  DiscountValue: number;
  FromDate: string;
  ToDate: string;
  BalanceLimit: number;
  Status: number;
};

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

interface PromoCodeTiming {
  Id: number;
  PromoCodeId: number;
  DayValue: number;
  DayName: string;
  FromTime_12HoursFormat: string;
  FromTime_24HoursFormat: string;
  ToTime_12HoursFormat: string;
  ToTime_24HoursFormat: string;
  Status: number;
}

interface PromoCodeDetail {
  Id: number;
  Name: string;
  PromoCode: string;
  DiscountValue: number;
  DiscountValueTypeId: number;
  FromDate: string;
  FromDate_DateTimeFormat: string;
  ToDate: string;
  ToDate_DateTimeFormat: string;
  TransactionLimitValue: number;
  TransactionLimitTypeId: number;
  PromoCodeTimingTypeId: number;
  POSVisibiltyStatus: number;
  KioskVisibilityStatus: number;
  OnlineOrderingVisibilityStatus: number;
  RestaurantLoginId: number;
  Status: number;
  BalanceLimit: number;
  PromoCodeTimings: PromoCodeTiming[];
}

interface Props {
  onClose: () => void;
}

const PromocodeTableModal: React.FC<Props> = ({ onClose }) => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPromotionModal, setIsPromotionModal] = useState<boolean>(false);
  const UserToken_Global = localStorage.getItem("authToken");
  const [promoCodeId, setPromoCodeId] = useState<number>(0);
  const [promoCodeDetail, setPromoCodeDetail] = useState<PromoCodeDetail[]>([])
  const RestaurantLoginId_Global = 0;

  const closeThreshold = (Id: number) => {
    setPromoCodeId(Id);
    if (Id !== 0) {
      fetchDataByPromoCodeId(Id);
    }
    setIsPromotionModal(true);
  };

  const closePromotionModal = () => {
    setIsPromotionModal(false);
    setPromoCodeId(0);
  }

  // Fetch promo codes from the API
  const fetchPromoCodes = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/get/all/promocode/list?restaurantLoginId=${RestaurantLoginId_Global}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 1) {
        setPromoCodes(response.data.data.lstPromoCodes);

      } else {
        toast.error(response.data.message, {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
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
            toast.error('There is some technical error, please try again!', {
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
      }
    }
    finally {
      setLoading(false);
    }
  };

 // update promo code status
  const updatePromoCodeStatus = async (promoCodeId: number, newStatus: number) => {
    setLoading(true);  
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/update/status/promocode?Id=${promoCodeId}&restaurantLoginId=${RestaurantLoginId_Global}`, {
            headers: {
                Authorization: `Bearer ${UserToken_Global}`,
                "Content-Type": "application/json",
            },
        });
        if (response.data.status === 1) {
            setPromoCodes((prevPromoCodes) =>
                prevPromoCodes.map((promoCode) =>
                    promoCode.Id === promoCodeId
                        ? { ...promoCode, Status: newStatus } 
                        : promoCode
                )
          ); 
          toast.success(response.data.message, {
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
          toast.error(response.data.message, {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
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
            toast.error('There is some technical error, please try again!', {
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
      }
    } finally {
        setLoading(false); 
    }
  };

  //fetch data by PromocodeId
  const fetchDataByPromoCodeId = async (promoCodeId: number) => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}api/get/single/promocode/data?Id=${promoCodeId}&restaurantLoginId=0`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`
        }
      });
      if (response.data.status === 1 && response.status === 200) {
        setPromoCodeDetail(response.data.data.promoCodeDetail);
      }
      else {
        toast.error(response.data.message, {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
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
            toast.error('There is some technical error, please try again!', {
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
      }
    }
  }

  // handle toggle 
  const handleToggle = (promoCodeId: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1; 
    updatePromoCodeStatus(promoCodeId, newStatus);
  };

  function isDateExpired(dateString: string) {
    const [month, day, year] = dateString.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  const deletePromoCode = async (Id: number) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}api/delete/promocode?Id=${Id}&restaurantLoginId=0`;
    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`
        }
      });
      if (response.data.status === 1 && response.status === 200) {
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
    }
    catch {
      console.log("Error");
    }
    finally {
      setLoading(false);
    }

  }

  const confirmDelete = (Id: number) => {
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
        deletePromoCode(Id);
      }
    });
  }

  useEffect(() => {
    fetchPromoCodes();
  }, [loading, isPromotionModal]);

  // if (loading) {
  //   return <div
  //     className="LoaderDiv_DashboardRestaurantCommonClass"
  //     style={{
  //       opacity: 1,
  //       position: "absolute",
  //       top: "50%",
  //       left: "50%",
  //       transform: "translate(-50%, -50%)",
  //       zIndex: 2147483647,
  //     }}
  //   >
  //     <div
  //       style={{
  //         backgroundColor: "#ffffff",
  //         top: 0,
  //         left: 0,
  //         width: "100%",
  //         height: "100%",
  //         zIndex: 999999999999999,
  //         opacity: 0.4,
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <img
  //         src="../../Content/Images/Loader.gif"
  //         style={{ backgroundColor: "#ffffff", width: "50px" }}
  //         alt="Loading..."
  //       />
  //     </div>
  //   </div>
  // }

  return (
    <>
      <div
        className="modal fade advance-btn-modal"
        id="promoCodeTableModal"
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content w-100">
            <div className="modal-header">
              <h5 className="modal-title" id="promoCodeTableModalLongTitle">
                PromoCode
              </h5>
              <button
                type="button"
                className="btn btn_AddPromoCode mb-0"
                data-toggle="modal"
                data-target="#addPromoCodeModal"
                onClick={() => closeThreshold(0)}
              >
                <span>+</span> Add PromoCode
              </button>
            </div>
            <div className="modal-body pt-0">
              <table
                className="table promotionTable mb-0 table-responsive-md table-responsive-sm"
                id="promoCodeTable"
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">PromoCode Name</th>
                    <th scope="col">PromoCode</th>
                    <th scope="col">Discount</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Balance</th>
                    <th>Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promoCode) => {
                    const isExpired = isDateExpired(promoCode.ToDate);
                    return (
                      <tr key={promoCode.Id} className={isExpired ? "expired" : ""}>
                        <td>{promoCode.Name}</td>
                        <td>{promoCode.PromoCode}</td>
                        <td>{promoCode.DiscountValue}%</td>
                        <td>{new Date(promoCode.FromDate).toLocaleDateString()}</td>
                        <td>{new Date(promoCode.ToDate).toLocaleDateString()}</td>
                        <td>{promoCode.BalanceLimit}</td>
                        <td>{promoCode.BalanceLimit}</td>
                        <td>
                          <div className="toggle-btn me-4">
                            <label className="switch">
                              <input
                                type="checkbox"
                                className="promoCodeStatusCommonClass"
                                id={`toggleBtn_PromoCodeStatus_${promoCode.Id}`}
                                checked={promoCode.Status === 1}
                                onChange={() => handleToggle(promoCode.Id, promoCode.Status)}
                                disabled={isExpired}
                              />
                              <span className="slider round"></span>
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <button>
                            <i className="fa fa-pencil-square-o"                 data-toggle="modal"
                data-target="#addPromoCodeModal" aria-hidden="true" onClick={() => closeThreshold(promoCode.Id)}></i>
                          </button>
                          <button>
                            <i className="fa fa-trash" onClick={() => confirmDelete(promoCode.Id)} aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer border-top">
              <button
                type="button"
                onClick={onClose}
                className="btn !bg-white !text-indigo-600 !border-indigo-700"
                id="btn_promoCodeTableModal_Close"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPromotionModal &&
        <AddPromocodeModal
          onClose={closePromotionModal}
          promoCodeId={promoCodeId}
          promoCodeData={promoCodeDetail}
        />
      }
    </>
  );
};

export default PromocodeTableModal;
