import React from 'react'

type Props = {}

const WTacceptOrderModal: React.FC = (props: Props) => {

    const PaymentUpdateStatusWTorders = () => {
        document.getElementById('btn_WT_Payment_OrdersModal')?.click();
    }

    const UpdateStatusServeWTorders = () => {
        document.getElementById('btn_WT_Serve_OrdersModal')?.click();
    }

    return (
        <div className="modal fade advance-btn-modal" id="WT_Auto_Accepted_OrdersModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content w-100" style={{ height: '80%', overflowY: 'auto', marginTop: '-114px' }}>
                    <div className="modal-header">
                        <div className="row" style={{ width: '100%' }}>
                            <div className="col-sm-2">
                                <b id="btn_WebOrderModal_Close" data-dismiss="modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 404.43">
                                        <path fillRule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z" />
                                    </svg> Back
                                </b>
                            </div>
                            <div className="col-sm-5 text-center" style={{ fontSize: '20px' }}>
                                <b>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                            {/* SVG Path data here */}
                                        </g>
                                    </svg> Take Away (28-Oct-2024 03:39:50 PM)
                                </b>
                            </div>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-2 text-lg-right">
                                <b style={{ fontSize: '20px' }}>Test(1232456789)</b>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="modal-body pt-0">
                        <div className="Web-orders-details-form" style={{ width: '100%' }}>
                            <form id="WTAutoAcceptedOrdersForm">
                                <div className="row" style={{ width: '100%' }}>
                                    <div className="col-12 col-md-6">
                                        <table className='!p-0 !border-none' style={{ width: '100%', borderCollapse: 'collapse', padding: "0px" }}>
                                            <tbody>
                                                <tr>
                                                    <th colSpan={2} >Pickled Radish</th>
                                                    <th style={{ textAlign: 'right' }}> </th>
                                                </tr>
                                                {/* Item Rows */}
                                                <tr className="item-row">
                                                    <td>$3.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Team 2 (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$0.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Option (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$55.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Test (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$10.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Cmp1 (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$2.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Combo23 (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$12.0</td>
                                                </tr>
                                                <tr className="item-row">
                                                    <td>Ndhvhvv (1)</td>
                                                    <td style={{ textAlign: 'right' }}>$0.0</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <table style={{ float: 'right', width: '100%', borderCollapse: 'collapse' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: 'right' }}>×</td>
                                                    <td style={{ textAlign: 'right' }}><b>1</b></td>
                                                    <td style={{ textAlign: 'right' }}><b>$82.0</b></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr />
                        <div className="row" style={{ width: '100%' }}>
                            <div className="col-sm-12">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        <tr>
                                            <td><b>Qty</b></td>
                                            <td className="text-right"><b>1</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>GST</b></td>
                                            <td className="text-right"><b>$10.16</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Promo -</b></td>
                                            <td className="text-right"><b>$0.00</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Threshold</b></td>
                                            <td className="text-right"><b>(5.0%) $04.10</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Delivery Charges</b></td>
                                            <td className="text-right"><b>$0.00</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Tip</b></td>
                                            <td className="text-right"><b>$11.69</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Total</b></td>
                                            <td className="text-right"><b>$89.59</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="button" className=" btn !bg-indigo-700 !text-white !hover:bg-indigo-800 !hover:text-cyan-50" onClick={PaymentUpdateStatusWTorders} data-dismiss="modal">Payment</button>
                        <button type="button" className=" btn !bg-indigo-700 !text-white !hover:bg-indigo-800 !hover:text-cyan-50" onClick={UpdateStatusServeWTorders} data-dismiss="modal">Served</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WTacceptOrderModal