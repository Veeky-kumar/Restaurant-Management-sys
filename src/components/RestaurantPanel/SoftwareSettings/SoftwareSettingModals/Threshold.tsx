import React, { useEffect,useState } from 'react'
import AddThresholdModal from './AddThresholdModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
// import AddThresholdModal from '../../ReastaurantPanel/SoftwareSettings/SoftwareSettingModals/AddThresholdModal'

type Props = {
    onClose: () => void;
}
interface ThresholdData {
    BalanceLimit: number;
    DiscountValue: number;
    DiscountValueTypeId: number;
    FromDate: string;
    FromDate_DateTimeFormat: string;
    Id: number;
    KioskVisibilityStatus: number;
    OnlineOrderingVisibilityStatus: number;
    POSVisibiltyStatus: number;
    RestaurantLoginId: number;
    Status: number;
    ThresholdAmount: number;
    ThresholdTimingTypeId: number;
    ThresholdTimings: string | null;
    ToDate: string;
    ToDate_DateTimeFormat: string;
    TransactionLimitTypeId: number;
    TransactionLimitValue: number;
}

const Threshold: React.FC<Props> = ({ onClose }) => {
    const [thresholdDatamap, setThresholdDataMap] = useState<ThresholdData[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const UserToken_Global = localStorage.getItem("authToken");
    const RestaurantLoginId_Global = 0;
    const [thresholdId, setThresholdId] = useState<number>(0);

    function isDateExpired(dateString: string) {
        const [month, day, year] = dateString.split('/');
        const date = new Date(Number(year),Number(month) - 1, Number(day));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;

    }

    const handleStatusUpdate = async (Id: number, status: number) => {
        const newStatus = status === 1 ? 0 : 1;
        updateThresholdStatus(Id, newStatus);
    }

    // Update Threshold Status
    const updateThresholdStatus = async (Id: number, status: number) => {
        const newStatus = status === 1 ? 0 : 1;
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/update/status/threshold?Id=${Id}&restaurantLoginId=${RestaurantLoginId_Global}`, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.status === 1) {
                setThresholdDataMap((prevThreshold) =>
                    prevThreshold.map((threshold) =>
                        threshold.Id === Id ? { ...threshold, Status: newStatus } : threshold
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

    }

    //Get Promotion List 
    const getAllThresholdList = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/get/all/threshold/list?restaurantLoginId=0`
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`
                },
            });
            if (response.status === 200 && response.data.status == 1) {
                const data = response.data.data.lstThresholds;
                setThresholdDataMap(data);
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
        }
        finally {
            setLoading(false);
        }
    }

    const openEditThresholdModal = (Id: number) => {
        setThresholdId(Id);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false);
        setThresholdId(0);
    }

    //Delete The threshold
    const deleteThreshold = async (Id: number) => {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/delete/threshold?Id=${Id}&restaurantLoginId=0`;
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
        catch (error) {
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
                deleteThreshold(Id);
            }
        });
    }

    useEffect(() => {
        getAllThresholdList();
    }, [loading]);

    return (
        <>
            <div className="modal fade advance-btn-modal show" id="thresholdTableModal" data-backdrop="static" aria-hidden="true" aria-labelledby="thLargeModalLabel" style={{ display: "block" }}>
                <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content w-100">
                        <div className="modal-header">
                            <h5 className="modal-title" id="thresholdTableModalLongTitle">Threshold</h5>
                            <button type="button" className="btn btn_AddThreshold mb-0" onClick={() => setShowModal(true)} data-toggle="modal" data-target="#addThresholdModal"><span>+</span> Add Threshold</button>
                        </div>
                        <div className="modal-body pt-0">
                            <table className="table promotionTable mb-0" id="thresholdTable">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Threshold Amount</th>
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
                                    {thresholdDatamap &&
                                        thresholdDatamap.map((item) => {
                                            const isExpired = isDateExpired(item.ToDate);
                                            return (
                                                <tr className={` ${!isExpired ? "active" : "expired"}`} key={item.Id}>
                                                    <td>${item.ThresholdAmount}</td>
                                                    <td>{item.DiscountValue}</td>
                                                    <td>{item.FromDate}</td>
                                                    <td>{item.ToDate}</td>
                                                    <td>{item.BalanceLimit}</td>
                                                    <td>{item.TransactionLimitValue}</td>
                                                    <td>
                                                        <div className="toggle-btn me-4">
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    disabled={isExpired}
                                                                    checked={item.Status === 1}
                                                                    onChange={() => handleStatusUpdate(item.Id, item.Status)}

                                                                />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => openEditThresholdModal(item.Id)}>
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                        </button>
                                                        <button onClick={() => confirmDelete(item.Id)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer border-top">
                            <button type="button" className="btn  !bg-white !text-indigo-600 !border-indigo-700" data-dismiss="modal" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <AddThresholdModal
                onClose={onCloseModal}    
                thresholdId={thresholdId}
                    setLoading={setLoading}
                />)
            }
        </>
    )
}

export default Threshold