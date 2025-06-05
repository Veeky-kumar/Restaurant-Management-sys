import React from 'react'

const StaffSetting:React.FC = () => {
    return (
        // <div className="" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        <div className="tab-set">
            <h4>Staff Setting</h4>

            {/* First Form Check */}
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="auto_logout_after_every_sale" data-name="auto logout after every sale" transform="translate(9493 -3664)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9493 3664)" fill="none"></rect>
                            <path id="auto_logout_after_every_sale-2" data-name="auto logout after every sale" d="M18.772,16.519a1.5,1.5,0,1,0,3,0Zm3-11.766a1.5,1.5,0,1,0-3,0Zm-6.889,5.331a1.5,1.5,0,1,0-1.245-2.735ZM6.252,21.1l-1.5-.008v.025ZM20.274,34.8l.017-1.5h-.034ZM34.3,21.1l1.5.017V21.09ZM26.906,7.349a1.5,1.5,0,1,0-1.245,2.735Zm-5.13,9.169V4.752h-3V16.519ZM13.642,7.349A15.186,15.186,0,0,0,4.75,21.09l3,.016a12.181,12.181,0,0,1,7.133-11.022ZM4.75,21.115A15.366,15.366,0,0,0,20.292,36.3l-.034-3A12.361,12.361,0,0,1,7.755,21.08ZM20.257,36.3A15.366,15.366,0,0,0,35.8,21.115l-3-.035A12.361,12.361,0,0,1,20.292,33.3ZM35.8,21.09A15.186,15.186,0,0,0,26.906,7.349l-1.245,2.735a12.181,12.181,0,0,1,7.133,11.022Z" transform="translate(-9488.75 3668.75)" fill="#4235b4"></path>
                        </g>
                    </svg>
                    AUTO LOG OUT AFTER EVERY SALE
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="AUTO LOG OUT AFTER EVERY SALE">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i>
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i>
                    </label>
                </div>
            </div>

            {/* Second Form Check */}
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="auto_logout_after_mention_sale" data-name="auto logout after mention sale" transform="translate(9373 -3664)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9373 3664)" fill="none"></rect>
                            <g id="auto_logout_after_mention_sale-2" data-name="auto logout after mention sale" transform="translate(-9367.189 3668.5)">
                                <path id="Path_64805" data-name="Path 64805" d="M8.25,6.089,9.839,4.5h19.07L30.5,6.089v28.6l-1.589,1.589H9.839L8.25,34.694V29.927h3.178V33.1H27.32V7.678H11.428v3.178H8.25Z" transform="translate(4.543 0)" fill="#4235b4" fill-rule="evenodd"></path>
                                <path id="Path_64806" data-name="Path 64806" d="M10.273,17.539H25.507V14.361H10.273l3.644-3.644L12.4,8.2,4.5,16.1l7.9,7.9,1.512-1.512Z" transform="translate(0.985 4.089)" fill="#4235b4" fill-rule="evenodd"></path>
                            </g>
                        </g>
                    </svg>
                    AUTO LOG OUT AFTER MENTION SALE
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="AUTO LOG OUT AFTER MENTION SALE">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i>
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i>
                    </label>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default StaffSetting