import React from 'react'

type Props = {}

const WTserveModal: React.FC = (props: Props) => {
    return (
        <>
            <div className="modal fade advance-btn-modal" id="WT_Serve_OrdersModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content w-30  " style={{ height: "30%", overflowY: "auto", marginTop: "-19px" }}>
                        <div className="modal-header">
                            <b className="text-center">Payment Pending. Complete Payment to Serve.</b>
                        </div>
                        <div className="modal-body pt-0" style={{ display: "flex", justifyContent: "center" }}>

                            <button type="button" className="btn !bg-indigo-700 !text-white" onclick="UpdateStatusWTorders()" id="btn_Serve_Modal_Close" data-dismiss="modal">Ok </button>

                        </div>

                    </div>
                </div>
            </div>
            <button type="button" id="btn_WT_Serve_OrdersModal" data-toggle="modal" data-target="#WT_Serve_OrdersModal" style={{ display: "none" }}>
            </button>
        </>
    )
}

export default WTserveModal