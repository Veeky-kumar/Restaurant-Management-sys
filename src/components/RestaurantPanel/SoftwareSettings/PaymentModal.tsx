import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

interface TenderTypeData {
    EftposEnabled: number;
    ForceRefferenceEnabled: number;
    Id: string;
    OpenCashDrawerEnabled: number;
    RestaurantLoginId: string;
    RoundingEnabled: number;
    ShowInBankingReportEnabled: number;
    TenderTypeName: string;
    TenderTypeSurcharges: string;
    TenderTypeSurchargesValueTypeId: string;
}

interface Props {
    closeModal: () => void;
    setLoading: (loading: boolean) => void;
}



const PaymentModal: React.FC<Props> = ({ closeModal, setLoading }) => {
    const Userglobal_token = localStorage.getItem('authToken');
    const { register, handleSubmit, setValue, getValues } = useForm<TenderTypeData>({
        defaultValues: {
            Id: "0",
        }
    })

    const onSubmit: SubmitHandler<TenderTypeData> = async (data) => {
        setValue('EftposEnabled', data.EftposEnabled ? 1 : 0)
        setValue('ForceRefferenceEnabled', data.ForceRefferenceEnabled ? 1 : 0);
        setValue('OpenCashDrawerEnabled', data.OpenCashDrawerEnabled ? 1 : 0);
        setValue('RoundingEnabled', data.RoundingEnabled ? 1 : 0);
        setValue('ShowInBankingReportEnabled', data.ShowInBankingReportEnabled ? 1 : 0);

        const formData = getValues();

        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/add/update/tender/type/data`;
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Userglobal_token}`
                }
            });
            if (response.status == 200 && response.data.status === 1) {
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
        } catch (error) {

        }
        finally {
            setLoading(false);
            closeModal();
        }

    }


    return (
        <>
            <button type="button" id="btn_PaymentTenderType_Modal_ManageSoftwareSetting" data-toggle="modal" data-target="#paymentTenderTypeModal" style={{ display: "none" }}>
            </button>
            {/* <!-- Payemnt Tender Type Modal --> */}
            <div
                className="modal fade add-pay-modal advance-btn-modal show"
                id="paymentTenderTypeModal"
                data-backdrop="static"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="paymentTenderTypeModalTitle"
                // aria-hidden="true"
                style={{ display: "block" }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="paymentTenderTypeModalLongTitle" >
                                Add Payment Type
                            </h5>
                        </div>
                        <form id="addUpdatePaymentTenderType" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body" style={{ height: "fit-content" }}>
                                <input type="hidden" id="paymentTenderTypeId" value="0" />
                                <div className="form-group">
                                    <label htmlFor="tenderTypeName">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tenderTypeName"
                                        {...register("TenderTypeName")}
                                        placeholder="Card"
                                    />
                                    <div
                                        className="errorsClass2"
                                        id="errorMsg_TenderTypeName_ManageSoftwareSetting"
                                    ></div>
                                </div>

                                <div className="form-dis mb-3">
                                    <label htmlFor="tenderTypeSurcharges">
                                        Surcharges (
                                        <span id="tenderTypeSurchargesLabelText">%</span>)
                                    </label>
                                    <div className="form-check form-check-inline float-end">
                                        <input
                                            className="form-check-input tenderTypeSurchargeValueTypeId"
                                            type="radio"
                                            {...register('TenderTypeSurchargesValueTypeId')}
                                            id="tenderTypeSurchargedollarCheck"
                                            value="1"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tenderTypeSurchargedollarCheck"
                                        >
                                            <b>$</b>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline float-end">
                                        <input
                                            className="form-check-input tenderTypeSurchargeValueTypeId"
                                            type="radio"
                                            id="tenderTypeSurchargepercentCheck"
                                            {...register('TenderTypeSurchargesValueTypeId')}
                                            value="0"
                                            defaultChecked
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tenderTypeSurchargepercentCheck"
                                        >
                                            <b>%</b>
                                        </label>
                                    </div>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tenderTypeSurcharges"
                                        {...register('TenderTypeSurcharges')}
                                        placeholder="0.00"
                                    />
                                    <div
                                        className="errorsClass2"
                                        id="errorMsg_TenderTypeSurcharges_ManageSoftwareSetting"
                                    ></div>
                                </div>

                                <label htmlFor="tenderTypeExtraOptions">Extra Options</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="tenderTypeRounding"
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tenderTypeRounding"
                                    >
                                        Rounding
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="tenderTypeShowInBankingReport"
                                        {...register('ShowInBankingReportEnabled')}
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tenderTypeShowInBankingReport"
                                    >
                                        Show In Banking Report
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        {...register('OpenCashDrawerEnabled')}
                                        id="tenderTypeOpenCashDrawer"
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tenderTypeOpenCashDrawer"
                                    >
                                        Open Cash Drawer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="tenderTypeEFTPOS"
                                        {...register('EftposEnabled')}
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tenderTypeEFTPOS"
                                    >
                                        EFTPOS
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="tenderTypeForceReference"
                                        {...register('ForceRefferenceEnabled')}
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tenderTypeForceReference"
                                    >
                                        Force Reference
                                    </label>
                                </div>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn pro-cancel"
                                data-dismiss="modal"
                                id="btn_TenderTypeModalClose"
                                    onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                    type="submit"
                                className="btn pro-submit"
                            //   onClick={onSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentModal