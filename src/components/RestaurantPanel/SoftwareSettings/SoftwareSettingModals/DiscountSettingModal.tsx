import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce, toast} from "react-toastify";
import { useForm, SubmitHandler } from 'react-hook-form';

interface DiscountSettingData {
    id: number;
    DiscountTypeDataId: string;
    AlternateDiscountName: string;
    DiscountValue: number;
    MaxDiscountValue: number;
    DiscountValueTypeId: number;
}

interface FormData {
    DiscountTypeDataId?: string;
    AlternateDiscountName?: string;
    DiscountValueTypeId?: number;
    DiscountValue?: number;
    MaxDiscountValue?: number;
    RestaurantLoginId?: number;
}

type Props = {
    discountSettingItem: DiscountSettingData;
    setIsOpen: (isOpen: boolean) => void;
    setLoading: (loading: boolean) => void;
};

const DiscountSettingModal: React.FC<Props> = ({ discountSettingItem, setIsOpen, setLoading }) => {
    // Initialize useForm with default values
    const [DiscountValueTypeId, setDiscountValueTypeId] = useState<string>('');
    const [formLoading, setFormLoading] = useState<boolean>(true)
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            DiscountTypeDataId: '',
            AlternateDiscountName: '',
            DiscountValue: 0,
            MaxDiscountValue: 0,
            RestaurantLoginId: 0,
        },
    });
    const onSubmit: SubmitHandler<FormData> = async () => {
        setValue('DiscountValueTypeId', Number(DiscountValueTypeId));
        const formdata = getValues();
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/add/update/discount/setting/data`;
            const response = await axios.post(apiUrl, formdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

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

        }
        finally {
            setIsOpen(false)
            setLoading(false);
        }
    };


    // Update form values when the discountSettingItem is available or changes
    useEffect(() => {
        if (discountSettingItem) {
            setValue('DiscountTypeDataId', discountSettingItem.DiscountTypeDataId);
            setValue('AlternateDiscountName', discountSettingItem.AlternateDiscountName);
            setValue('DiscountValue', discountSettingItem.DiscountValue);
            setValue('MaxDiscountValue', discountSettingItem.MaxDiscountValue);
            setDiscountValueTypeId(String(discountSettingItem.DiscountValueTypeId));
            setFormLoading(false);
            // setValue('DiscountValueTypeId', discountSettingItem.DiscountValueTypeId); // Set the correct radio button value
        }
    }, [discountSettingItem, setValue]);



    return (
        <div
            className="modal fade advance-btn-modal discount-setting show"
            id="discountSettingModal"
            data-backdrop="static"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="discountSettingModalTitle"
            aria-hidden="true"
            style={{ display: 'block' }}
        >
            {formLoading && (<div
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
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="discountSettingModalTitle">
                            Discount Setting
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="discount_setting_form">
                            <div className="form-group">
                                <label htmlFor="alternateName">Alternate Discount Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="alternateName"
                                    {...register('AlternateDiscountName', { required: 'Alternate discount name is required' })}
                                    placeholder=""
                                />
                                {errors.AlternateDiscountName && <p>{errors.AlternateDiscountName.message}</p>}
                            </div>

                            <div className="form-dis">
                                <label htmlFor="exampleInputEmail1" className="d-block">
                                    Discount In
                                </label>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input discountValueTypeId"
                                        type="radio"
                                        id="percentCheck"

                                        checked={DiscountValueTypeId === "1"}
                                        onChange={(e) => setDiscountValueTypeId(e.target.value)}
                                        value={1} 
                                    />
                                    <label className="form-check-label" htmlFor="percentCheck">
                                        Percent Discount<i className="input-helper"></i>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input discountValueTypeId"
                                        type="radio"
                                        id="dollarCheck"
                                        checked={DiscountValueTypeId === "2"}
                                        onChange={(e) => setDiscountValueTypeId(e.target.value)}
                                        value={2} 
                                    />
                                    <label className="form-check-label" htmlFor="dollarCheck">
                                        Dollar Discount<i className="input-helper"></i>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="discountValue">
                                    Automatic-Discount (<span id="discountValueLabelText">%</span>)
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register('DiscountValue', { valueAsNumber: true })}
                                    id="discountValue"
                                    placeholder=""
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="maxDiscountValue">Maximum-Discount ($)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register('MaxDiscountValue', { valueAsNumber: true })}
                                    id="maxDiscountValue"
                                    placeholder=""
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn !bg-indigo-700 !text-white">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn !bg-white !text-indigo-600 !border-indigo-700"
                                    data-dismiss="modal"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountSettingModal;
