import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

type Props = { closeModal: () => void, taxId: number, setLoading: (loading: boolean) => void }

const TaxModal: React.FC<Props> = ({ closeModal, taxId, setLoading }) => {

    const [taxName, setTaxName] = useState('');
    const [taxRateValue, setTaxRateValue] = useState('');
    const [taxType, setTaxType] = useState('0');
    const [errorMsg, setErrorMsg] = useState('');
    const [mode, setMode] = useState(1);
    const userToken = localStorage.getItem('authToken') || '';
    const restaurantLoginId = 0;

    const handleSubmit = async () => {
        if (!taxName || !taxRateValue || taxType === '0') {
            setErrorMsg('Please fill all fields');
            return;
        }
        const formData = new FormData();
        formData.append('id', String(taxId));
        formData.append('name', taxName);
        formData.append('taxRateValue', taxRateValue);
        formData.append('taxRateTypeId', '1');
        formData.append('taxType', taxType);
        formData.append('mode', String(mode));
        formData.append('restaurantLoginId', restaurantLoginId.toString());

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/addupdate/tax`, formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 1 || response.data.status === 2) {
                setTaxName('');
                setTaxRateValue('');
                setTaxType('0');
                setErrorMsg('');
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
                closeModal();
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
            toast.error('Failed to update Tax Data', {
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
    };

    const getTaxDataById = async (Id: number) => {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/single/tax?taxId=${Id}&restaurantLoginId=${restaurantLoginId}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },

            });
            if (response.data.status === 1) {
                setTaxName(response.data.data.taxDetails.Name);
                setTaxRateValue(response.data.data.taxDetails.TaxRateValue);
                setTaxType(response.data.data.taxDetails.TaxTypeId);
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

        }
    }
    useEffect(() => {
        if (taxId !== 0) {
            getTaxDataById(taxId);
            setMode(2);
        }
        else {
            setMode(1);
        }
    }, [taxId])

    return (
        <>
            {/* <!-- Modal add/update Tax --> */}
            <div className="modal fade add-pay-modal show" id="ShowAddUpdateTaxModal_ManageSoftwareSetting" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="heading_Title_TaxModal">Create Tax</h5>
                        </div>
                        <div className="modal-body" style={{ height: '273px' }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="textTaxName_ManageSoftwareSetting">Name</label>
                                    <input type="text" className="form-control" id="textTaxName_ManageSoftwareSetting" value={taxName} onChange={(e) => setTaxName(e.target.value)} placeholder="Enter tax name" />
                                    <div className="errorsClass2" id="errorMsg_TaxName_ManageSoftwareSetting">{errorMsg}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="textTaxRateValue_ManageSoftwareSetting">Tax Rate (%)</label>
                                    <input type="text" className="form-control IsDecimal" id="textTaxRateValue_ManageSoftwareSetting" value={taxRateValue} onChange={(e) => setTaxRateValue(e.target.value)} placeholder="0" />
                                    <div className="errorsClass2" id="errorMsg_TaxRateValue_ManageSoftwareSetting">{errorMsg}</div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label htmlFor="ddlTaxType_ManageSoftwareSetting">Type</label>
                                    <select id="ddlTaxType_ManageSoftwareSetting" value={taxType} onChange={(e) => setTaxType(e.target.value)}>
                                        <option value="0">Select option</option>
                                        <option value="1">Included in the price</option>
                                        <option value="2">Without included in the price</option>
                                    </select>
                                    <div className="errorsClass2" id="error_ddlTaxType_ManageSoftwareSetting">{errorMsg}</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn !bg-indigo-700 font-semibold text-white" onClick={closeModal}>Cancel</button>
                            <button id="btnSubmit_Tax_ManageSetting" type="button" className="btn !bg-indigo-700 font-semibold text-white" onClick={handleSubmit}>
                                {mode === 1 ? 'Add' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaxModal