import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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

type Props = {
    onClose: () => void,
    promoCodeId: number,
    promoCodeData: any
};

interface Errors {
    promoCodeName?: string;
    promoCode?: string;
    discountValue?: string;
    transactionLimit?: string;
    dateFrom?: string;
    dateTo?: string;
    timeFrom?: string;
    timeTo?: string;
}

const AddPromocodeModal: React.FC<Props> = ({ onClose, promoCodeId, promoCodeData }) => {
    const [promoCodeName, setPromoCodeName] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [transactionLimit, setTransactionLimit] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState<any>('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [timimgId, setTimingId] = useState<number>(0);
    const [promoCodeTimingTypeId, setPromoCodeTimingTypeId] = useState('2');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [posVisibilityStatus, setPosVisibilityStatus] = useState(true);
    const [kioskVisibilityStatus, setKioskVisibilityStatus] = useState(true);
    const [onlineOrderingVisibilityStatus, setOnlineOrderingVisibilityStatus] = useState(true);
    const UserToken_Global = localStorage.getItem("authToken");
    const RestaurantLoginId_Global = 0;
    const [errors, setErrors] = useState<Errors>({});

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!promoCodeName.trim()) newErrors.promoCodeName = 'Promo code name is required';
        if (!promoCode.trim()) newErrors.promoCode = 'Promo code is required';
        if (!discountValue.trim() || isNaN(Number(discountValue)) || Number(discountValue) <= 0)
            newErrors.discountValue = 'Discount value must be a positive number';
        if (!transactionLimit.trim() || isNaN(Number(transactionLimit)) || Number(transactionLimit) <= 0)
            newErrors.transactionLimit = 'Transaction limit must be a positive number';
        if (!dateFrom) newErrors.dateFrom = 'Start date is required';
        if (!dateTo) newErrors.dateTo = 'End date is required';
        if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo))
            newErrors.dateTo = 'End date must be after start date';
        if (promoCodeTimingTypeId === "2") {
            if (!timeFrom) newErrors.timeFrom = 'Start time is required';
            if (!timeTo) newErrors.timeTo = 'End time is required';
            if (timeFrom && timeTo && new Date(timeFrom) > new Date(dateTo))
                newErrors.timeTo = 'End time must be after start time';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const convertTo12HourFormat = (time24: string) => {
        const [hours, minutes] = time24.split(":").map((num) => parseInt(num, 10));

        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12; // Convert hours to 12-hour format
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours12}:${minutesStr} ${ampm}`;
    };

    const formatDate = (date: string): string => {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const formattedDateFrom = formatDate(dateFrom);
            const formattedDateTo = formatDate(dateTo);

            const data = {
                Id: promoCodeId,
                Name: promoCodeName,
                PromoCode: promoCode,
                DiscountValue: discountValue,
                DiscountValueTypeId: "1",
                TransactionLimitValue: transactionLimit,
                TransactionLimitTypeId: "1",
                FromDate: formattedDateFrom,
                ToDate: formattedDateTo,
                PromoCodeTimingTypeId: promoCodeTimingTypeId,
                POSVisibiltyStatus: posVisibilityStatus ? 1 : 0,
                KioskVisibilityStatus: kioskVisibilityStatus ? 1 : 0,
                OnlineOrderingVisibilityStatus: onlineOrderingVisibilityStatus ? 1 : 0,
                RestaurantLoginId: RestaurantLoginId_Global,
                Mode: promoCodeId === 0 ? '1' : '2',

                PromoCodeTimings: promoCodeTimingTypeId === '1' ? [] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => ({
                    Id: timimgId + index,
                    ThresholdId: String(promoCodeId),
                    DayName: day,
                    DayValue: String(index + 1),
                    FromTime_12HoursFormat: convertTo12HourFormat(timeFrom),
                    ToTime_12HoursFormat: convertTo12HourFormat(timeTo),
                    Status: selectedDays.includes(day) ? 1 : 0,
                })),
            };
            const apiUrl = `${import.meta.env.VITE_API_URL}api/add/update/promocodes?restaurantLoginId=${RestaurantLoginId_Global}`;
            try {
                const response = await axios.post(apiUrl, data, {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
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
                Toast.fire({
                    icon: "error",
                    title: "Error adding promo code.",
                });
            }
            finally {
                onClose();
            }
        }
    };


    // Handle form field changes
    const handleTimeFromChange = (e: React.ChangeEvent<HTMLInputElement>) => setTimeFrom(e.target.value);
    const handleTimeToChange = (e: React.ChangeEvent<HTMLInputElement>) => setTimeTo(e.target.value);

    const handleDaySelectionChange = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
        );
    };

    const handleVisibilityChange = (platform: string, checked: boolean) => {
        if (platform === 'POS') setPosVisibilityStatus(checked);
        if (platform === 'KIOSK') setKioskVisibilityStatus(checked);
        if (platform === 'Online Ordering') setOnlineOrderingVisibilityStatus(checked);
    };

    const convertTo24HourFormat = (time12hr: string) => {
        const [time, modifier] = time12hr.split(' ');
        let [hours, minutes] = time.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10).toString(); + 12;
        } else if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        if (promoCodeId !== 0) {
            setPromoCodeName(promoCodeData.Name || '');
            setPromoCode(promoCodeData.PromoCode || '');
            setDiscountValue(promoCodeData.DiscountValue || '');
            setTransactionLimit(promoCodeData.TransactionLimitValue || '');
            setPromoCodeTimingTypeId(String(promoCodeData.PromoCodeTimingTypeId || '1'));
            const fromDate = promoCodeData.FromDate_DateTimeFormat
                ? promoCodeData.FromDate_DateTimeFormat.split('T')[0]
                : '';
            const toDate = promoCodeData.ToDate_DateTimeFormat
                ? promoCodeData.ToDate_DateTimeFormat.split('T')[0]
                : '';
            setDateFrom(fromDate);
            setDateTo(toDate);
            if (promoCodeData && promoCodeData.PromoCodeTimings && promoCodeData.PromoCodeTimings.length > 0) {
                const firstTiming = promoCodeData.PromoCodeTimings[0];
                setTimingId(Number(firstTiming.Id));
                const fromTime24 = convertTo24HourFormat(firstTiming.FromTime_12HoursFormat);
                const toTime24 = convertTo24HourFormat(firstTiming.ToTime_12HoursFormat);
                setTimeFrom(fromTime24);
                setTimeTo(toTime24);
                const selected = promoCodeData.PromoCodeTimings.filter(
                    (timing: any) => timing.Status === 1
                ).map((timing: any) => timing.DayName);
                setSelectedDays(selected);
            }
        }
    }, [promoCodeData]);


    return (

            <div
            className="modal fade advance-btn-modal show"
                id="addPromoCodeModal"
                data-backdrop="static"
                role="dialog"
                aria-hidden="true"
                aria-labelledby="myLargeModalLabel"
                tabIndex={-1}
            style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content w-100">
                        <div className="modal-header pb-0">
                            <h5 className="modal-title mb-2" id="promoCodeModalLongTitle">
                            {promoCodeId === 0 ? 'Add New ' : 'Edit'} PromoCode
                            </h5>
                        </div>
                        <div className="modal-body pt-1">
                            <div className="add-promo-code-form">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <form id="addUpdatePromoCode">
                                            <div className="input-container">
                                                <label>Promocode Name</label>
                                            <input type="text" id="promoCodeName" value={promoCodeName || ''} onChange={(e) => setPromoCodeName(e.target.value)} />
                                            {errors.promoCodeName && <span className="error text-red-600 !text-xs">{errors.promoCodeName}</span>}
                                            </div>
                                            <div className="input-container">
                                                <label>Promocode</label>
                                            <input type="text" id="promoCode" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} style={{ textTransform: "uppercase" }} />
                                            {errors.promoCode && <span className="error text-red-600 !text-xs">{errors.promoCode}</span>}
                                            </div>
                                            <div className="input-container">
                                                <label>Discount Value (%)</label>
                                            <input type="text" id="promoCodeDiscountValue" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
                                            {errors.discountValue && <span className="error text-red-600 !text-xs">{errors.discountValue}</span>}
                                            </div>
                                            <div className="input-container">
                                                <label>Transaction Limit</label>
                                            <input type="text" id="promoCodeTransactionLimit" value={transactionLimit} onChange={(e) => setTransactionLimit(e.target.value)} />
                                            </div>
                                            <div className="input-container">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-6 ps-0 pe-1">
                                                        <div className="input-container">
                                                            <label htmlFor="promoCodeDateFrom">From</label>
                                                            <input type="date" id="promoCodeDateFrom" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                                            {errors.dateFrom && <span className="errorsClass2 text-red-600 !text-xs">{errors.dateFrom}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-6 pe-0 ps-1">
                                                        <div className="input-container">
                                                            <label htmlFor="promoCodeDateTo">To</label>
                                                            <input type="date" id="promoCodeDateTo" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                                                            {errors.dateTo && <span className="error text-red-600 !text-xs">{errors.dateTo}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
                                </div>
                                    <div className="col-12 col-md-6">
                                    {promoCodeTimingTypeId === '2' && (
                                        <form className="timing-form mb-1" id="promoCode_TimingSection">
                                            <div className="input-container mb-3">
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <label>From</label>
                                                        <input type="time" id="promoCodeTimeFrom" value={timeFrom} onChange={handleTimeFromChange} />
                                                        {errors.timeFrom && <span className="error text-red-600 !text-xs">{errors.timeFrom}</span>}
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <label>To</label>
                                                        <input type="time" id="promoCodeTimeTo" value={timeTo} onChange={handleTimeToChange} />
                                                        {errors.timeTo && <span className="error text-red-600 !text-xs">{errors.timeTo}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="days-check">
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                                    <li key={day}>
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                id={`promoCodeTiming${day}`}
                                                                checked={selectedDays.includes(day)}
                                                                onChange={() => handleDaySelectionChange(day)}
                                                            />
                                                            <label htmlFor={`promoCodeTiming${day}`}>{day.slice(0, 3)}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </form>
                                    )}
                                        <form className="toggle-form">
                                            {['POS', 'KIOSK', 'Online Ordering'].map((label) => (
                                                <div className="input-container" key={label}>
                                                    <label className="mb-0">{label}</label>
                                                    <div className="toggle-btn me-4">
                                                        <label className="switch mb-0">
                                                            <input
                                                                type="checkbox"
                                                                className="promoCodeVisibilityStatus"
                                                                checked={
                                                                    label === 'POS'
                                                                        ? posVisibilityStatus
                                                                        : label === 'KIOSK'
                                                                            ? kioskVisibilityStatus
                                                                            : onlineOrderingVisibilityStatus
                                                                }
                                                                onChange={(e) => handleVisibilityChange(label, e.target.checked)}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </form>
                                </div>
                                    <div className="col-12 mt-2">
                                    <div className="form-check-inline">
                                            <input
                                                className="form-check-input promoCodeTimingTypeId"
                                                type="radio"
                                                name="promoCodeTimingTypeId"
                                                id="promoCodeTimingTypeContinuous"
                                                value="1"
                                                checked={promoCodeTimingTypeId === '1'}
                                                onChange={() => setPromoCodeTimingTypeId('1')}
                                            />
                                        <label className="form-check-label">
                                                Continuous
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input promoCodeTimingTypeId"
                                                type="radio"
                                                name="promoCodeTimingTypeId"
                                                id="promoCodeTimingTypeSpecific"
                                                value="2"
                                                checked={promoCodeTimingTypeId === '2'}
                                                onChange={() => setPromoCodeTimingTypeId('2')}
                                            />
                                        <label className="form-check-label">
                                                During Specific Times
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn !bg-white !text-indigo-600 !border-indigo-700" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn !bg-indigo-700 !text-white" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default AddPromocodeModal;
