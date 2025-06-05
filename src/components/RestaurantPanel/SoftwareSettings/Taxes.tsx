import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import TaxModal from './TaxModal'
import { Bounce, toast } from 'react-toastify';

const Taxes = () => {

    const [taxes, setTaxes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [taxId, setTaxId] = useState<number>(0);
    const [modal, setModal] = useState(false);
    const [taxStatus, setTaxStatus] = useState(false);
    // const [delete,setDelete]=use
    const UserToken_Global = localStorage.getItem("authToken") || '';
    const RestaurantLoginId_Global = 0;
    const apiPrefix = import.meta.env.VITE_API_URL;


    // Fetch all taxes
    const fetchTaxes = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/all/taxes/list?restaurantLoginId=${RestaurantLoginId_Global}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    'Content-Type': 'application/json',
                },
            });

            const dataTaxes = response.data;

            if (dataTaxes.status === 1) {
                setTaxes(dataTaxes.data.Taxes);
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
            console.error('Error fetching taxes:', error);
            toast.error('Error fetching taxes', {
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

    // update tax status
    const updateTaxStatus = async (taxId: number, isActive: boolean): Promise<void> => {
        setLoading(true);
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/update/tax/status?taxId=${taxId}&restaurantLoginId=${RestaurantLoginId_Global}&isActive=${isActive}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 && response.data.status === 1) {

                setTaxes((prevTaxes) =>
                    prevTaxes.map((tax) =>
                        tax.Id === taxId
                            ? { ...tax, DefaultActiveStatus: isActive ? 1 : 0 }
                            : tax
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
            console.error('Error updating tax status:', error);

            toast.error("Error Updating Tax Status", {
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
    
    const OpenCreateTaxPopup = () => {
        setModal(true);
    }
    const openEditTaxModal = (Id: number) => {
        setTaxId(Id);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false)
        setTaxId(0);
    }

    const confirmTaxDelete = (Id: number) => {
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
                DeletetaxData(Id);
            }
        });
    }

    const DeletetaxData = async (Id: number) => {
        const apiUrl = `${apiPrefix}api/delete/tax?taxId=${Id}&restaurantLoginId=${RestaurantLoginId_Global}}`;
        try {
            setLoading(true);
            const response = await axios.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${UserToken_Global}`
                },
            });
            if (response.status === 200 && response.data.status === 1) {
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

            toast.error("Error Deleteing Tax Data", {
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
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (UserToken_Global) {
            fetchTaxes();
        }
    }, [loading]);

    return (
        <>
            <div className="" id="v-pills-taxes" role="tabpanel" aria-labelledby="v-pills-taxes-tab">
                <div className="tab-set taxtEmpty text-center d-none" id="EmptySectionRestaurantTaxesList_ManageSoftwareSetting">

                    <i className="fa fa-university" aria-hidden="true"></i>
                    <h4>Taxes</h4>
                    <button type="button" className="btn add-pay" onClick={OpenCreateTaxPopup}>
                        + Add Tax
                    </button>
                </div>
                <div className="tab-set" id="BindRestaurantTaxesList_ManageSoftwareSetting">


                    <button type="button" className="btn add-pay" onClick={OpenCreateTaxPopup}>
                        + Add Tax
                    </button>
                    <div className="table-responsive" style={{ position: "relative" }}>
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
                        <table className="table tbltaxesListClass" id="tbl_TaxList_Section_ManageSoftwareSetting">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Tax Rate</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxes.length > 0 ? (
                                    taxes.map((tax) => (
                                        <tr key={tax.Id}>
                                            <td title={tax.Name}>{tax.Name.length > 30 ? `${tax.Name.slice(0, 30)}...` : tax.Name}</td>
                                            <td>{tax.TaxRateValue}%</td>
                                            <td>
                                                <div className="toggle-btn">
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            className="activeTaxCommonClass"
                                                            checked={tax.DefaultActiveStatus === 1}
                                                            onChange={(e) => updateTaxStatus(tax.Id, e.target.checked)}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <i
                                                    className="fa fa-edit"
                                                    title="Edit Tax"
                                                    aria-hidden="true"
                                                    onClick={() => openEditTaxModal(tax.Id)}
                                                ></i>
                                                {tax.IsDeletable === 1 && (
                                                    <i
                                                        className="fa fa-trash"
                                                        title="Delete Tax"
                                                        aria-hidden="true"
                                                        onClick={() => confirmTaxDelete(tax.Id)}
                                                    ></i>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Taxes found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {modal && (
                <TaxModal
                    taxId={taxId}
                    closeModal={closeModal}
                    setLoading={setLoading}
                />
            )}
        </>
    )
}

export default Taxes