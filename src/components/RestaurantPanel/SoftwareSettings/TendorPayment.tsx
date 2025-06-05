import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import PaymentModal from './PaymentModal';
import { Bounce, toast } from 'react-toastify';

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

interface TenderType {
    Id: number;
    TenderTypeName: string;
    IsActiveTenderType: number;
    IsCommonTenderType: number;
    IsDeletable: number;
    TenderTypeSettingId: number;
}

const TendorPayment: React.FC = () => {

    const [isCashActive, setIsCashActive] = useState<boolean>(false);
    const [tenderTypes, setTenderTypes] = useState<TenderType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    const UserToken_Global = localStorage.getItem("authToken") || '';
    const RestaurantLoginId_Global = 0;

    // Function to update tender type status
    const updateTenderTypeStatus = async (tenderTypeId: number): Promise<void> => {
        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/update/tender/type/active/status?Id=${tenderTypeId}&restaurantLoginId=${RestaurantLoginId_Global}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200 && (response.data.status === 1)) {

                const updatedTenderTypes = tenderTypes.map((tenderType) =>
                    tenderType.TenderTypeSettingId === tenderTypeId
                        ? { ...tenderType, IsActiveTenderType: response.data.isActiveTenderType }
                        : tenderType
                );

                setTenderTypes(updatedTenderTypes);
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
            toast.error('error Updating TendorPayment', {
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
        } finally {
            setLoading(false);
        }
    };

    const fetchTenderTypes = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/payment/tender/type/list?restaurantLoginId=${RestaurantLoginId_Global}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                setTenderTypes(response.data.data.lstTenderTypes);
            } else {
                console.error('Failed to fetch tender types:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('Unauthorized! Invalid Token!', {
                            position: "bottom-center",
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
                            position: "bottom-center",
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

    const handleToggleChange = (tenderTypeId: number) => {
        updateTenderTypeStatus(tenderTypeId);
    };

    const OpenDeletePaymentTenderType = () => {
        console.log("test..");
    };

    const OpenPaymentTenderTypeModal = () => {
        setShowModal(true)
    }

    const closePaymentModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchTenderTypes();
    }, [loading]);

    return (
        <> {loading && (<div
            className="LoaderDiv_DashboardRestaurantCommonClass"
            style={{
                opacity: 1,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2147483647,
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 999999999999999,
                    opacity: 0.4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src="../../Content/Images/Loader.gif"
                    style={{ backgroundColor: "#ffffff", width: "50px" }}
                    alt="Loading..."
                />
            </div>
        </div>)}
            <div className="" id="v-pills-tendor" role="tabpanel" aria-labelledby="v-pills-tendor-tab">
                <div className="tab-set">

                    <button type="button" className="btn add-pay" onClick={OpenPaymentTenderTypeModal}>
                        + Add Payment Type
                    </button>

                    <button type="button" className="btn dalete-pay" onClick={OpenDeletePaymentTenderType}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>

                    {/* <div className="set-check-box tenderPaymentTypeSection ui-sortable">
                        {tenderTypes.map((tenderType) => (
                            <div className="form-check d-flex align-items-center TenderTypeSectionCommonClass ui-sortable-handle" key={tenderType.TenderTypeSettingId}>
                                <label className="form-check-label flex-grow-1">{tenderType.TenderTypeName}</label>
                                <div className="toggle-btn me-4">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            className="activeTenderTypeCommonClass"
                                            id={`toggleBtn_ActiveTenderType_ManageSoftwareSetting_${tenderType.TenderTypeSettingId}`}
                                            onChange={() => handleToggleChange(tenderType.TenderTypeSettingId)}
                                            checked={tenderType.IsActiveTenderType === 1}
                                        />
                                        <span className="slider round"></span>
                                        <i className="input-helper"></i>
                                    </label>
                                </div>
                            </div>
                        ))}

                    </div> */}

                    <div className="set-check-box tenderPaymentTypeSection ui-sortable">
                        {tenderTypes
                            .filter((tenderType) => tenderType.TenderTypeName === "Cash")
                            .map((tenderType) => (
                                <div className="form-check d-flex align-items-center TenderTypeSectionCommonClass ui-sortable-handle" key={tenderType.TenderTypeSettingId}>
                                    <label className="form-check-label flex-grow-1">{tenderType.TenderTypeName}</label>
                                    <div className="toggle-btn me-4">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                className="activeTenderTypeCommonClass"
                                                id={`toggleBtn_ActiveTenderType_ManageSoftwareSetting_${tenderType.TenderTypeSettingId}`}
                                                onChange={() => handleToggleChange(tenderType.TenderTypeSettingId)}
                                                checked={tenderType.IsActiveTenderType === 1}
                                            />
                                            <span className="slider round"></span>
                                            <i className="input-helper"></i>
                                        </label>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
            {showModal &&
                <PaymentModal
                closeModal={closePaymentModal}
                setLoading={setLoading}
                />
            }
        </>
    )
}

export default TendorPayment