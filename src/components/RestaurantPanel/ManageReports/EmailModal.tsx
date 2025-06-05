import React from 'react';


const EmailModal: React.FC = () => {
    const closeEmailModal = () => {
        const cancelButton = document.getElementById('btnCancel_SendPDFReportEmail_RestaurantReports_Modal') as HTMLButtonElement;
        if (cancelButton) {
            cancelButton.click()

        }
    };

    return (
        <>
            <button
                id="btn_SendPDFReportEmail_RestaurantReports_Modal"
                type="button"
                className="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#SendPDFReportEmail_RestaurantReports_Modal"
                style={{ display: 'none' }}
            />

            <div
                className="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                id="SendPDFReportEmail_RestaurantReports_Modal"
                data-backdrop="static"
                data-keyboard="false"
                style={{}}
            >
                <div className="modal-dialog transition-opacity cstm_modal_dialog">
                    <div className="modal-content plus_modal_cont">
                        {/* Modal Header */}
                        <div
                            className="modal-header plus_modal_head"
                            style={{
                                display: 'block',
                                paddingBottom: 0,
                                textAlign: 'center',
                            }}
                        >
                            <h4
                                className="modal-title plus_head_popup"
                                style={{ left: 0 }}
                            >
                                Send Report
                            </h4>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body new_modal_work">
                            <div className="form-group plus_from_group">
                                <input
                                    type="text"
                                    className="form-control plus_imput_feild"
                                    id="txtEmail_SendPDFReportEmail_RestaurantReports_Modal"
                                    placeholder="Enter Email"
                                    style={{ textTransform: 'lowercase' }}
                                />
                                <div
                                    id="email_error_SendPDFReportEmail_RestaurantReports_Modal"
                                    className="errorsClass2"
                                ></div>
                            </div>
                            <div className="modal-bottom plus_modal_bottom">
                                <button
                                    id="btnCancel_SendPDFReportEmail_RestaurantReports_Modal"
                                    type="button"
                                    className="cstm_model_plusbtn_1 btn btn-danger"
                                    data-dismiss="modal"
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    className="cstm_model_plusbtn_1 btn btn-danger"
                                    onClick={closeEmailModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    id="btnSendEmail_SendPDFReportEmail_RestaurantReports_Modal"
                                    type="button"
                                    className="cstm_model_plusbtn_2 btn btn-danger"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailModal;
