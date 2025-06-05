import axios from "axios";
import React, { useRef } from "react";
import Swal from "sweetalert2";

interface LunchBreakModalProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    openingTime: string[];
    timingData: TimingData;
    setTimingData: React.Dispatch<React.SetStateAction<TimingData>>;
    day: string;
}

const LunchBreakModal: React.FC<LunchBreakModalProps> = ({ buttonRef, openingTime, timingData, setTimingData, day }) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleLunchFromChange = async (day: string, lunchFromValue: string) => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("Authentication token not found.");
                return;
            }

            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/closingtiminglist`;

            // Make the API call with `lunchFromValue`.
            const response = await axios.post(
                apiUrl,
                { openTime: lunchFromValue },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 && response.data.status === 1) {
                const fetchedLunchToList = response.data.data.timingList || [];

                setTimingData((prev) => ({
                    ...prev,
                    [day]: {
                        ...prev[day],
                        lunchFrom: lunchFromValue,
                        lunchToList: fetchedLunchToList,
                    },
                }));
            } else {
                console.error("Failed to fetch lunch to list.");
            }
        } catch (error) {
            console.error("Error fetching lunch to list:", error);
        }
    };

    const handleLunchToChange = (day: string, lunchToValue: string) => {
        setTimingData((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                lunchTo: lunchToValue,
            },
        }));
    };

    const setLunchBreakTiming = async (day: string) => {
        try {

            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Authentication token is missing.");
                return;
            }
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/setlunchbreak`;

            const params = {
                restaurantOpeningTime: timingData[day].openingTime,
                restaurantClosingTime: timingData[day].closingTime,
                lunchBreakStartTime: timingData[day].lunchFrom,
                lunchBreakEndTime: timingData[day].lunchTo,
            };

            const formData = new FormData();
            for (const key in params) {
                formData.append(key, params[key]);
            }

            const response = await axios.post(apiUrl, params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                setTimingData((prev) => ({
                    ...prev,
                    [day]: {
                        ...prev[day],
                        show: true,
                    },
                }));

                if (cancelRef.current) {
                    cancelRef.current.click();
                }
            } else if (response.status === 200 && response.data.status === -1) {
                Swal.fire({
                    title: "Warning!",
                    text: response.data.message,
                    icon: "warning",
                });

                if (cancelRef.current) {
                    cancelRef.current.click();
                }
            } else {
                console.error("Failed to set lunch break timing:", response || "Unknown error.");
            }
        } catch (error) {
            console.error("Error while setting lunch break timing:", error);
        }
    };

    return (
        <>
            {/* Hidden button to trigger modal */}
            <button
                id="btn_LunchBreak_RestaurantTiming_SoftwareSetting_Modal"
                ref={buttonRef}
                type="button"
                className="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#LunchBreak_RestaurantTiming_SoftwareSetting_Modal"
                style={{ display: "none" }}
            ></button>

            {/* Modal */}
            <div
                className="modal "
                id="LunchBreak_RestaurantTiming_SoftwareSetting_Modal"
                data-backdrop="static"
                data-keyboard="false"
            >
                <div className=" modal-dialog cstm_modal_dialog pr-0">
                    <div className="modal-content modal-content_m sm:hidden plus_modal_cont">
                        <div className="modal-header plus_modal_head" style={{ display: "block", textAlign: "center" }}>
                            <h4 className="modal-title plus_head_popup" style={{ left: 0 }}>
                                Lunch-Break <span id="heading_Title_RestaurantTiming_SoftwareSetting_Modal">{day}</span>
                            </h4>
                        </div>

                        <div className="modal-body new_modal_work">
                            {/* Lunch From */}
                            <div className="form-group pop-up_drop">
                                <label style={{ fontWeight: 600, fontSize: "16px" }}>Lunch From</label>
                                <div className="select_box">
                                    <select
                                        id="ddlLunchFrom_RestaurantTiming_SoftwareSetting"
                                        className="form-control LunchFromCommonClass"
                                        value={timingData[day]?.lunchFrom || ""}
                                        onChange={(e) => handleLunchFromChange(day, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {openingTime.map((time, index) => (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div id="lunchFrom_error_RestaurantTiming_SoftwareSetting" className="errorsClass2_LunchBreak"></div>
                            </div>

                            {/* Lunch To */}
                            <div className="form-group pop-up_drop">
                                <label style={{ fontWeight: 600, fontSize: "16px" }}>To</label>
                                <div className="select_box">
                                    <select
                                        id="ddlLunchTo_RestaurantTiming_SoftwareSetting"
                                        className="form-control LunchToCommonClass"
                                        value={timingData[day]?.lunchTo || ""}

                                        onChange={(e) => handleLunchToChange(day, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {(timingData[day]?.lunchToList || []).map((time, index) => (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div id="lunchTo_error_RestaurantTiming_SoftwareSetting" className="errorsClass2_LunchBreak"></div>
                            </div>

                            {/* Modal Buttons */}
                            <div className="modal-bottom plus_modal_bottom">
                                <button
                                    type="button"
                                    className="cstm_model_plusbtn_1 btn btn-danger"
                                    data-dismiss="modal"
                                    ref={cancelRef}
                                >
                                  Cancel
                                </button>
                                <button
                                    id="btnSubmitLunchBreakTiming_RestaurantTiming_SoftwareSetting"
                                    type="button"
                                    className="cstm_model_plusbtn_2 btn btn-danger"
                                    onClick={() => setLunchBreakTiming(day)}
                                >
                                  Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LunchBreakModal;
