import React from 'react'

type Props = {}

const WTpaymentOrderModal: React.FC = (props: Props) => {
    return (
        <>
            <div className="modal fade advance-btn-modal" id="WT_Payment_OrdersModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content w-50" style={{ height: '80%', overflowY: 'auto', marginTop: '-145px' }}>
                        <div className="modal-header">
                            <div className="text-center" style={{ width: '100%', color: 'white', backgroundColor: '#4235b4' }}>
                                Select Tender Type
                            </div>
                        </div>
                        <div className="modal-body pt-0" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="row" style={{ width: '100px' }}>
                                <button
                                    type="button"
                                    className="btn !bg-indigo-700 !text-white"
                                    // onClick={() => UpdateStatusWTorders()}
                                    id="btn_Payment_Modal_Close"
                                    data-dismiss="modal"
                                >
                                    Cash
                                </button>
                                <button
                                    type="button"
                                    className="btn  !bg-indigo-700 !text-white"
                                    // onClick={() => UpdateStatusWTorders()}
                                    id="btn_Payment_Modal_Close"
                                    data-dismiss="modal"
                                >
                                    Master Card
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer border-top" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                type="button"
                                className="btn !bg-indigo-700 !text-white"
                                id="btn_Auto_AcceptTableModal_Close"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn !bg-indigo-700 !text-white"
                                // onClick={() => PaymentSubmitStatuseWTorders()}
                                id="btn_PaymentSubmitModal_Close"
                                data-dismiss="modal"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" id="btn_WT_Payment_OrdersModal" data-toggle="modal" data-target="#WT_Payment_OrdersModal" style={{ display: "none" }}>
            </button>
        </>

    )
}

export default WTpaymentOrderModal