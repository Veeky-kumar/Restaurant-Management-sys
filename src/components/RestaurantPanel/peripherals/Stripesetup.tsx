import React from 'react';
import "../../../assets/CSS/peripheral.css"

const Stripesetup = () => {
    return (
        <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
            <div>
                <div className="col-sm-12 table_wrap-form">
                    <form action="#" className="new_customer-wrap">

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>Publishable Key <span className="requiredFieldClass">*</span></label>
                                <input type="text" className="form-control" id="txtStripePK_StripeSetup" placeholder="Enter Publishable Key" />
                                <div id="stripePK_error_StripeSetup" className="errorsClass2"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>Secret Key <span className="requiredFieldClass">*</span></label>
                                <input type="text" className="form-control" id="txtStripeSK_StripeSetup" placeholder="Enter Secret Key" />
                                <div id="stripeSK_error_StripeSetup" className="errorsClass2"></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <p className="wrap_plus-add">
                                    <a href="javascript:InsertUpdateStripeKeys();">
                                        <span className="wrapadd_plus">
                                            Submit
                                        </span>
                                    </a>
                                </p>
                                <p className="wrap_plus-add">
                                    <a href="javascript:confirmDeleteStripeKeys();" id="deleteStripeKeys" className="">
                                        <span className="wrapadd_plus">
                                            Delete
                                        </span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Stripesetup