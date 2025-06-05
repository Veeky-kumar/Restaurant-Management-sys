
import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

type Props = {
    onClose: () => void,
    thresholdId: number,
    setLoading: (loading: boolean) => void
};

interface Errors {
    thresholdAmount?: string;
    discountValue?: string;
    transactionLimit?: string;
    dateFrom?: string;
    dateTo?: string;
    timeFrom?: string;
    timeTo?: string;
}

const AddThresholdModal: React.FC<Props> = ({ onClose, thresholdId, setLoading }) => {
    const [thresholdAmount, setThresholdAmount] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [transactionLimit, setTransactionLimit] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [thresholdTimingTypeId, setThresholdTimingTypeId] = useState('2');
    const [posVisibilityStatus, setPosVisibilityStatus] = useState(true);
    const [kioskVisibilityStatus, setKioskVisibilityStatus] = useState(true);
    const [onlineOrderingVisibilityStatus, setOnlineOrderingVisibilityStatus] = useState(true);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const UserToken_Global = localStorage.getItem("authToken");
    const RestaurantLoginId_Global = 0;
    const [timimgId, setTimingId] = useState<number>(0);
    const [errors, setErrors] = useState<Errors>({});

    //format selected Date
    const formatDate = (date: string): string => {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();

        return `${month}/${day}/${year}`;
    };

    const convertTo12HourFormat = (time24: string) => {

        const [hours, minutes] = time24.split(":").map((num) => parseInt(num, 10));
        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12; 
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours12}:${minutesStr} ${ampm}`;
    };


    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!thresholdAmount.trim()) newErrors.thresholdAmount = 'Threshold amont is required';
        if (!discountValue.trim() || isNaN(Number(discountValue)) || Number(discountValue) <= 0)
            newErrors.discountValue = 'Discount value must be a positive number';
        if (!transactionLimit.trim() || isNaN(Number(transactionLimit)) || Number(transactionLimit) <= 0)
            newErrors.transactionLimit = 'Transaction limit must be a positive number';
        if (!dateFrom) newErrors.dateFrom = 'Start date is required';
        if (!dateTo) newErrors.dateTo = 'End date is required';
        if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo))
            newErrors.dateTo = 'End date must be after start date';
        if (thresholdTimingTypeId === "2") {
            if (!timeFrom) newErrors.timeFrom = 'Start time is required';
            if (!timeTo) newErrors.timeTo = 'End time is required';
            if (timeFrom && timeTo && new Date(timeFrom) > new Date(dateTo))
                newErrors.timeTo = 'End time must be after start time';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    //Submit Threshold Data
    const handleSubmit = async () => {
        if (validateForm()) {
            const formattedDateFrom = formatDate(dateFrom);
            const formattedDateTo = formatDate(dateTo);

            const data = {
                Id: thresholdId,
                ThresholdAmount: thresholdAmount,
                DiscountValue: discountValue,
                DiscountValueTypeId: "1",
                TransactionLimitValue: transactionLimit,
                TransactionLimitTypeId: "1",
                FromDate: formattedDateFrom,
                ToDate: formattedDateTo,
                ThresholdTimingTypeId: thresholdTimingTypeId,
                POSVisibiltyStatus: posVisibilityStatus ? 1 : 0,
                KioskVisibilityStatus: kioskVisibilityStatus ? 1 : 0,
                OnlineOrderingVisibilityStatus: onlineOrderingVisibilityStatus ? 1 : 0,
                RestaurantLoginId: RestaurantLoginId_Global,
                Mode: thresholdId === 0 ? '1' : '2',
                ThresholdTimings: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => ({
                    Id: timimgId + index,
                    ThresholdId: String(thresholdId),
                    DayName: day,
                    DayValue: String(index + 1),
                    FromTime_12HoursFormat: convertTo12HourFormat(timeFrom),
                    ToTime_12HoursFormat: convertTo12HourFormat(timeTo),
                    Status: selectedDays.includes(day) ? 1 : 0,
                })),
            };
            const apiUrl = `${import.meta.env.VITE_API_URL}api/add/update/threshold?restaurantLoginId=${RestaurantLoginId_Global}`;
            try {
                setLoading(true);
                const response = await axios.post(apiUrl, data, {
                    headers: {
                        Authorization: `Bearer ${UserToken_Global}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status == 200 && response.data.status === 1) {
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
                onClose;
                setLoading(false);
            }
        }
    };

    // Handle form field changes
    const handleThresholdAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setThresholdAmount(e.target.value);
    const handleDiscountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setDiscountValue(e.target.value);
    const handleTransactionLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => setTransactionLimit(e.target.value);
    const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value);
    const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value);
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

    const getThresholdDataById = async (Id: number) => {
        console.log("functionData");
        const apiUrl = `${import.meta.env.VITE_API_URL}api/get/single/threshold/data?Id=${Id}&restaurantLoginId=${RestaurantLoginId_Global}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`
                },
            });
            if (response.status === 200 && response.data.status === 1) {
                const thresholdData = response.data.data.thresholdDetail;
                setThresholdAmount(thresholdData.ThresholdAmount);
                setDiscountValue(thresholdData.DiscountValue);
                setTransactionLimit(thresholdData.TransactionLimitValue);
                setThresholdTimingTypeId(String(thresholdData.ThresholdTimingTypeId));
                const fromDate = thresholdData.FromDate_DateTimeFormat
                    ? thresholdData.FromDate_DateTimeFormat.split('T')[0]
                    : '';
                const toDate = thresholdData.ToDate_DateTimeFormat
                    ? thresholdData.ToDate_DateTimeFormat.split('T')[0]
                    : '';
                setDateFrom(fromDate);
                setDateTo(toDate);
                if (thresholdData && thresholdData.ThresholdTimings && thresholdData.ThresholdTimings.length > 0) {
                    const firstTiming = thresholdData.ThresholdTimings[0];
                    setTimingId(Number(firstTiming.Id));
                    const fromTime24 = convertTo24HourFormat(firstTiming.FromTime_12HoursFormat);
                    const toTime24 = convertTo24HourFormat(firstTiming.ToTime_12HoursFormat);
                    setTimeFrom(fromTime24);
                    setTimeTo(toTime24);
                    const selected = thresholdData.ThresholdTimings.filter(
                        (timing: any) => timing.Status === 1
                    ).map((timing: any) => timing.DayName);
                    setSelectedDays(selected);
                }
                setKioskVisibilityStatus(thresholdData.KioskVisibilityStatus === 1);
                setPosVisibilityStatus(thresholdData.POSVisibiltyStatus === 1);
                setOnlineOrderingVisibilityStatus(thresholdData.OnlineOrderingVisibilityStatus === 1);
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
    }

    useState(() => {
        if (thresholdId !== 0) {
            getThresholdDataById(thresholdId);
        }
    })

    return (
            <div
                className="modal fade advance-btn-modal show "
                id="addThresholdModal"
                data-backdrop="static"
                role="dialog"
                aria-hidden="true"
                aria-labelledby="myLargeModalLabel"
                tabIndex={-1}
                style={{ display: "block" }}

            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content w-100">
                        <div className="modal-header pb-0">
                            <h5 className="modal-title mb-2" id="thresholdModalLongTitle">
                                {thresholdId === 0 ? 'Add New' : 'Edit'} Threshold
                            </h5>
                        </div>
                        <div className="modal-body pt-1">
                            <div className="add-threshold-form">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <form id="addUpdateThreshold">
                                            <div className="input-container">
                                                <label>Threshold Amount</label>
                                            <input type="text" id="thresholdAmount" value={thresholdAmount} onChange={handleThresholdAmountChange} />
                                            {errors.thresholdAmount && <span className=" text-red-600 !text-xs">{errors.thresholdAmount}</span>}
                                            </div>
                                            <div className="input-container">
                                                <label>Discount Value (%)</label>
                                            <input type="text" id="thresholdDiscountValue" value={discountValue} onChange={handleDiscountValueChange} />
                                            {errors.discountValue && <span className=" text-red-600 !text-xs">{errors.discountValue}</span>}
                                            </div>
                                            <div className="input-container">
                                                <label>Transaction Limit</label>
                                                <input type="text" id="thresholdTransactionLimit" value={transactionLimit} onChange={handleTransactionLimitChange} />
                                            </div>
                                            <div className="input-container">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-6 ps-0 pe-1">
                                                        <div className="input-container">
                                                            <label htmlFor="thresholdDateFrom">From</label>
                                                            <input type="date" id="thresholdDateFrom" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                                            {errors.dateFrom && <span className="errorsClass2 text-red-600 !text-xs">{errors.dateFrom}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-6 pe-0 ps-1">
                                                        <div className="input-container">
                                                            <label htmlFor="thresholdDateTo">To</label>
                                                            <input type="date" id="thresholdDateTo" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                                                            {errors.dateTo && <span className="error text-red-600 !text-xs">{errors.dateTo}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        {thresholdTimingTypeId === '2' && (
                                        <form className="timing-form mb-1" id="threshold_TimingSection">
                                            <div className="input-container mb-3">
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <label>From</label>
                                                        <input type="time" id="thresholdTimeFrom" value={timeFrom} onChange={handleTimeFromChange} />
                                                        {errors.timeFrom && <span className="error text-red-600 !text-xs">{errors.timeFrom}</span>}
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <label>To</label>
                                                        <input type="time" id="thresholdTimeTo" value={timeTo} onChange={handleTimeToChange} />
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
                                                                id={`thresholdTiming${day}`}
                                                                checked={selectedDays.includes(day)}
                                                                onChange={() => handleDaySelectionChange(day)}
                                                            />
                                                            <label htmlFor={`thresholdTiming${day}`}>{day.slice(0, 3)}</label>
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
                                                                className="thresholdVisibilityStatus"
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
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input thresholdTimingTypeId"
                                                type="radio"
                                                name="thresholdTimingTypeId"
                                                id="thresholdTimingTypeContinuous"
                                                value="1"
                                                checked={thresholdTimingTypeId === '1'}
                                                onChange={() => setThresholdTimingTypeId('1')}
                                            />
                                            <label className="form-check-label" htmlFor="thresholdTimingTypeContinuous">
                                                Continuous
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input thresholdTimingTypeId"
                                                type="radio"
                                                name="thresholdTimingTypeId"
                                                id="thresholdTimingTypeSpecific"
                                                value="2"
                                                checked={thresholdTimingTypeId === '2'}
                                                onChange={() => setThresholdTimingTypeId('2')}
                                            />
                                            <label className="form-check-label" htmlFor="thresholdTimingTypeSpecific">
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
    )
};

export default AddThresholdModal;