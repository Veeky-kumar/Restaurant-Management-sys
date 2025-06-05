import React from 'react'

const GeneralSetting: React.FC =  () => {
    return (
        // <div className="" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        <div className="tab-set">
            <h4>General Setting</h4>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_16768" data-name="Group 16768" transform="translate(8184 -3788)">
                            <g id="Rounding_Icons_Symbols-12" data-name="Rounding Icons & Symbols-12" transform="translate(-8185.329 3786.587)">
                                <g id="Group_16750" data-name="Group 16750" transform="translate(8.329 8.413)">
                                    <path
                                        id="Path_64854"
                                        data-name="Path 64854"
                                        d="M40.293,9.706a1.293,1.293,0,0,0-2.585,0v3.022A17.955,17.955,0,0,0,9.428,32.764a1.293,1.293,0,1,0,2.427-.89A15.37,15.37,0,0,1,35.811,14.519H33.449a1.293,1.293,0,0,0,0,2.585h5.12a1.724,1.724,0,0,0,1.724-1.724ZM12.278,43.465a1.293,1.293,0,0,0,2.585,0v-3.03A17.955,17.955,0,0,0,43.142,20.4a1.293,1.293,0,1,0-2.427.89A15.37,15.37,0,0,1,16.759,38.643h2.863a1.293,1.293,0,1,0,0-2.585H14a1.724,1.724,0,0,0-1.724,1.724Z"
                                        transform="translate(-8.329 -8.413)"
                                        fill="#4235b4"
                                    />
                                </g>
                            </g>
                            <rect id="Rectangle_18687" data-name="Rectangle 18687" width="50" height="50" transform="translate(-8184 3788)" fill="none" />
                        </g>
                    </svg>
                    ROUNDING
                    <button
                        type="button"
                        className="btn tootipCustomClass"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="ROUNDING"
                        data-bs-original-title="ROUNDING"
                    >
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
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_16763" data-name="Group 16763" transform="translate(9253 -3664)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9253 3664)" fill="none" />
                            <g id="rounding_5c_up" data-name="rounding 5c up" transform="translate(-9247 3668.58)">
                                <path id="Path_64807" d="M8,16.631l5.1-5.44a2.7,2.7,0,0,1,4.018,0l5.1,5.44" transform="translate(3.889 5.349)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                                <path id="Path_64808" d="M3,10.531V28.309a7.111,7.111,0,0,0,7.111,7.111H27.889A7.111,7.111,0,0,0,35,28.309V10.531A7.111,7.111,0,0,0,27.889,3.42H10.111A7.111,7.111,0,0,0,3,10.531Z" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                            </g>
                        </g>
                    </svg>
                    ROUNDING 10C UP
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="ROUNDING 10C UP">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper" />
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper" />
                    </label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_16764" data-name="Group 16764" transform="translate(9133 -3664)">
                            <g id="rounding_5c_down" data-name="rounding 5c down" transform="translate(-9133 3664)">
                                <rect id="Rectangle_18681" width="50" height="50" fill="none" />
                                <g id="rounding_5c_down-2" transform="translate(9 9)">
                                    <path id="Path_64807" d="M8,10.3l5.1,5.44a2.7,2.7,0,0,0,4.018,0l5.1-5.44" transform="translate(0.889 3.143)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                                    <path id="Path_64808" d="M3,28.309V10.531A7.111,7.111,0,0,1,10.111,3.42H27.889A7.111,7.111,0,0,1,35,10.531V28.309a7.111,7.111,0,0,1-7.111,7.111H10.111A7.111,7.111,0,0,1,3,28.309Z" transform="translate(-3 -3.42)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    ROUNDING 10X DOWN
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="ROUNDING 10X DOWN">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper" />
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper" />
                    </label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="adult_id" transform="translate(9013 -3664)">
                            <rect id="Rectangle_18681" width="50" height="50" transform="translate(-9013 3664)" fill="none" />
                            <g id="adult_id-2" transform="translate(-265.594 92.8)">
                                <path id="Path_64812" d="M3.5,8.576V31.823A3.576,3.576,0,0,0,7.076,35.4H32.111a3.576,3.576,0,0,0,3.576-3.576V8.576A3.576,3.576,0,0,0,32.111,5H7.076A3.576,3.576,0,0,0,3.5,8.576Z" transform="translate(-8742 3577.5)" fill="none" stroke="#5d5d5d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" fillRule="evenodd" />
                                <g id="Group_16743" transform="translate(-8734.029 3590.547)">
                                    <path id="Path_64813" d="M0,0,5.893.009" transform="matrix(1, -0.017, 0.017, 1, 17.306, 3.624)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeWidth="2.5" />
                                    <path id="Path_64814" d="M0,0,5.893.009" transform="matrix(1, -0.017, 0.017, 1, 17.4, 8.988)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeWidth="2.5" />
                                    <path id="Path_64815" d="M14.653,11.576a3.576,3.576,0,1,1-1.048-2.529A3.576,3.576,0,0,1,14.653,11.576Z" transform="translate(-3.924 -8)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" fillRule="evenodd" />
                                    <path id="Path_64816" d="M5.5,17.576c4.977-5.61,10.822-3.846,14.306,0" transform="translate(-5.5 -3.271)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeWidth="2.5" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    SHOW ADULT ID
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="SHOW ADULT ID">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper" />
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper" />
                    </label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_16764" data-name="Group 16764" transform="translate(9133 -3664)">
                            <g id="rounding_5c_down" data-name="rounding 5c down" transform="translate(-9133 3664)">
                                <rect id="Rectangle_18681" width="50" height="50" fill="none" />
                                <g id="rounding_5c_down-2" transform="translate(9 9)">
                                    <path id="Path_64807" d="M8,10.3l5.1,5.44a2.7,2.7,0,0,0,4.018,0l5.1-5.44" transform="translate(0.889 3.143)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                                    <path id="Path_64808" d="M3,28.309V10.531A7.111,7.111,0,0,1,10.111,3.42H27.889A7.111,7.111,0,0,1,35,10.531V28.309a7.111,7.111,0,0,1-7.111,7.111H10.111A7.111,7.111,0,0,1,3,28.309Z" transform="translate(-3 -3.42)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    SHOW PHOTO ID
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="SHOW PHOTO ID">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper" />
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper" />
                    </label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="need_password_for_banking_report" transform="translate(8773 -3664)">
                            <rect width="50" height="50" transform="translate(-8773 3664)" fill="none"></rect>
                            <g id="banking_r" transform="translate(-8768 3668)">
                                <path
                                    d="M3,6.692V26.884a2.7,2.7,0,0,0,2.692,2.692H35.306A2.7,2.7,0,0,0,38,26.884V6.692A2.7,2.7,0,0,0,35.306,4H5.692A2.7,2.7,0,0,0,3,6.692Z"
                                    fill="none"
                                    stroke="#4235b4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                ></path>
                                <line x2="18" transform="translate(11.499 37.326)" fill="none" stroke="#4235b4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line>
                                {/* Other SVG elements go here */}
                            </g>
                        </g>
                    </svg>
                    NEED PASSWORD FOR BANKING REPORT
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="need_password_for_discount_and_amount_change" transform="translate(8653 -3663)">
                            <rect width="50" height="50" transform="translate(-8653 3663)" fill="none"></rect>
                            <g id="need_password_for_discount_and_amount_change-2" transform="translate(-8648 3668.08)">
                                <path
                                    d="M30.8,3.92H9.2A7.2,7.2,0,0,0,2,11.12v18a7.2,7.2,0,0,0,7.2,7.2H30.8a7.2,7.2,0,0,0,7.2-7.2v-18A7.2,7.2,0,0,0,30.8,3.92Z"
                                    fill="none"
                                    stroke="#4235b4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                ></path>
                                {/* Other SVG elements go here */}
                            </g>
                        </g>
                    </svg>
                    NEED PASSWORD FOR DISCOUNTS AND AMOUNT CHANGE
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="NEED PASSWORD FOR DISCOUNTS AND AMOUNT CHANGE">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                </label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="order_number_or_non_table_order" data-name="order number or non table order" transform="translate(9493 -3784)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9493 3784)" fill="none"></rect>
                            <g id="audit-report-survey-icon" transform="translate(-9485 3789)">
                                <path id="Path_64829" data-name="Path 64829" d="M21.891,4.237a.87.87,0,0,1-.283-.043.847.847,0,0,1-.846-.846V1.682h-8.2V3.348a.842.842,0,0,1-.759.833.953.953,0,0,1-.3.043H8.411V7.671H24.6V4.22H21.861l.03.017ZM7.611,24.992a1.665,1.665,0,1,1-1.665,1.665,1.666,1.666,0,0,1,1.665-1.665ZM5.686,20.885a.749.749,0,0,1,1.246-.833l.41.606,1.622-1.972a.75.75,0,0,1,1.159.953L7.878,22.37a.876.876,0,0,1-.18.17.747.747,0,0,1-1.039-.207l-.973-1.449Zm0-5.769a.749.749,0,0,1,1.246-.833l.41.606,1.622-1.975a.75.75,0,0,1,1.159.953L7.878,16.6a.876.876,0,0,1-.18.17.747.747,0,0,1-1.039-.207l-.973-1.446ZM23.05,40.707a.873.873,0,0,1-.566.223.453.453,0,0,1-.133-.013H1.872a1.872,1.872,0,0,1-1.322-.55A1.851,1.851,0,0,1,0,39.042V6.612A1.876,1.876,0,0,1,1.872,4.74H6.745V3.817a1.244,1.244,0,0,1,.373-.893,1.26,1.26,0,0,1,.893-.373H10.9V1.4a1.371,1.371,0,0,1,.416-.979A1.371,1.371,0,0,1,12.291,0h8.784a1.371,1.371,0,0,1,.979.416,1.377,1.377,0,0,1,.416.979V2.555h2.6a1.316,1.316,0,0,1,.893.373,1.284,1.284,0,0,1,.373.893v.923h4.873a1.876,1.876,0,0,1,1.872,1.872V30.008a.854.854,0,0,1-.253.846l-9.676,9.793a.29.29,0,0,1-.073.06h-.03Zm-1.412-1.472c0-11.2-1.412-9.87,9.733-9.87V6.612a.157.157,0,0,0-.06-.133.186.186,0,0,0-.133-.06H26.3v1.7a1.244,1.244,0,0,1-.373.893,1.26,1.26,0,0,1-.893.373H7.994A1.284,1.284,0,0,1,7.1,9.007c-.03-.03-.043-.06-.073-.09a1.294,1.294,0,0,1-.3-.8v-1.7H1.859a.157.157,0,0,0-.133.06.223.223,0,0,0-.06.133v32.43a.14.14,0,0,0,.06.133.186.186,0,0,0,.133.06H21.638Zm-7.9-11.988a.846.846,0,1,1,0-1.692h8.038a.846.846,0,1,1,0,1.692Zm0-12.085a.846.846,0,1,1,0-1.692H26.111a.846.846,0,1,1,0,1.692Zm0,6.042a.846.846,0,1,1,0-1.692H26.111a.846.846,0,1,1,0,1.692Z" transform="translate(0 0)" fill="#4235b4" stroke="#4235b4" stroke-width="1"></path>
                            </g>
                        </g>
                    </svg> ORDER NUMBER FOR NON TABLE ORDER
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="auto_order_number_" data-name="auto order number " transform="translate(9373 -3805)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9373 3805)" fill="none"></rect>
                            <g id="check-list-icon" transform="translate(-9366 3810)">
                                <path id="Path_64830" data-name="Path 64830" d="M16.617,28.551a1.1,1.1,0,1,1,0-2.2h6.177a1.1,1.1,0,1,1,0,2.2ZM7.229,27.459a.814.814,0,1,1,1.354-.906l.442.66,1.758-2.141a.814.814,0,0,1,1.257,1.033L9.606,29.065a.815.815,0,0,1-1.323-.044L7.229,27.459Zm0-7.749a.814.814,0,0,1,1.354-.906l.442.66,1.758-2.141a.814.814,0,0,1,1.257,1.033L9.606,21.316a.815.815,0,0,1-1.323-.044L7.229,19.711Zm0-7.752a.814.814,0,1,1,1.354-.906l.442.66,1.758-2.141a.814.814,0,0,1,1.257,1.033L9.606,13.565a.815.815,0,0,1-1.323-.044L7.229,11.959Zm9.389.187a1.1,1.1,0,1,1,0-2.2H27.91a1.1,1.1,0,0,1,0,2.2ZM2.558,0H33.994a2.55,2.55,0,0,1,2.555,2.555V35.678a2.55,2.55,0,0,1-2.555,2.555H2.558A2.552,2.552,0,0,1,.75,37.486a2.523,2.523,0,0,1-.75-1.8V2.558A2.55,2.55,0,0,1,2.558,0ZM33.994,2.2H2.558a.361.361,0,0,0-.361.361V35.687a.361.361,0,0,0,.361.361H33.994a.361.361,0,0,0,.361-.361V2.564a.36.36,0,0,0-.106-.255.371.371,0,0,0-.255-.106ZM16.617,20.349a1.1,1.1,0,1,1,0-2.2H27.91a1.1,1.1,0,0,1,0,2.2Z" fill="#4235b4" stroke="#4235b4" stroke-width="1"></path>
                            </g>
                        </g>
                    </svg> AUTO  ORDER  NUMBER
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="manual_order_number_for_every_day" data-name="manual order number htmlFor every day" transform="translate(9253 -3784)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9253 3784)" fill="none"></rect>
                            <path id="calendar-alt-svgrepo-com" d="M3,13.365H34.094M9.91,3V6.455M27.184,3V6.455m-19,13.819h3.455m-3.455,6.91h3.455m5.182-6.91h3.455m-3.455,6.91h3.455m5.182-6.91h3.455m-3.455,6.91h3.455M8.528,34.094H28.566c1.935,0,2.9,0,3.641-.377a3.454,3.454,0,0,0,1.51-1.51c.377-.739.377-1.707.377-3.641V11.983c0-1.935,0-2.9-.377-3.641a3.454,3.454,0,0,0-1.51-1.51c-.739-.377-1.707-.377-3.641-.377H8.528c-1.935,0-2.9,0-3.641.377a3.455,3.455,0,0,0-1.51,1.51C3,9.08,3,10.048,3,11.983V28.566c0,1.935,0,2.9.377,3.641a3.454,3.454,0,0,0,1.51,1.51C5.625,34.094,6.593,34.094,8.528,34.094Z" transform="translate(-9246.5 3790.5)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
                        </g>
                    </svg>  MANUAL ORDER NUMBER FOR EVERY DAY
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="force_manual_name" data-name="force manual name" transform="translate(9322 -3784)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9322 3784)" fill="none"></rect>
                            <g id="profile-boy-icon" transform="translate(-9317 3789)">
                                <path id="Path_64831" data-name="Path 64831" d="M19.759,0A19.764,19.764,0,1,1,5.789,5.789,19.686,19.686,0,0,1,19.759,0ZM14.951,27.988a5.316,5.316,0,0,0,9.629.023,10.874,10.874,0,0,1-1.248-1.6c-.061-.09-.122-.177-.183-.267A5.218,5.218,0,0,1,19.762,27.3a5.156,5.156,0,0,1-3.605-1.444c-.055-.051-.113-.1-.167-.158-.135.373-.306.82-.489,1.238a7.165,7.165,0,0,1-.55,1.052ZM29.8,34.678l.437-4.657a15.642,15.642,0,0,1-5.142-1.688c-1.341,4.467-8.548,5-10.577.116a16.612,16.612,0,0,1-5.11,1.56l.634,4.879A17.988,17.988,0,0,0,29.8,34.678ZM5.326,30.484l.077-.045c1.917-1.068,6.9-1.421,8.976-2.865a6.5,6.5,0,0,0,.473-.92c.238-.543.453-1.135.592-1.54a18.909,18.909,0,0,1-1.55-2.209l-1.569-2.5a4.577,4.577,0,0,1-.891-2.28,1.775,1.775,0,0,1,.154-.817,1.491,1.491,0,0,1,.54-.627,1.752,1.752,0,0,1,.379-.193,39.87,39.87,0,0,1-.074-4.486,5.952,5.952,0,0,1,.193-1.016,6,6,0,0,1,2.65-3.377A8.347,8.347,0,0,1,17.5,6.625c.5-.142-.425-1.733.09-1.788,2.492-.257,6.522,2.02,8.262,3.9a6.1,6.1,0,0,1,1.537,3.846l-.1,4.071h0a1.132,1.132,0,0,1,.827.855,3.525,3.525,0,0,1-.431,2.142h0a.384.384,0,0,1-.026.051L25.872,22.65a15.35,15.35,0,0,1-2.193,3.023c.077.113.158.225.235.341a10.527,10.527,0,0,0,1.167,1.5.254.254,0,0,1,.039.048c2.058,1.454,7.069,1.807,8.992,2.878l.077.045a17.98,17.98,0,1,0-28.863,0Zm8.088-13.266a1.543,1.543,0,0,0-.791.206.624.624,0,0,0-.225.26.941.941,0,0,0-.074.421,3.752,3.752,0,0,0,.746,1.82l.006.01h0l1.569,2.5a13.386,13.386,0,0,0,2.11,2.769,4.31,4.31,0,0,0,3.01,1.212,4.442,4.442,0,0,0,3.184-1.264A13.927,13.927,0,0,0,25.12,22.19l1.769-2.91a2.823,2.823,0,0,0,.373-1.55c-.045-.177-.238-.26-.569-.28-.071,0-.142,0-.215,0s-.161.006-.248.016a.462.462,0,0,1-.135-.01,2.5,2.5,0,0,1-.486-.026l.6-2.679c-4.489.708-7.85-2.627-12.6-.666l.341,3.158a2.7,2.7,0,0,1-.544-.023Z" fill="#4235b4"></path>
                            </g>
                        </g>
                    </svg>  FORCE CUSTOMER NAME
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="force_manual_order" data-name="force manual order" transform="translate(9243 -3784)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9243 3784)" fill="none"></rect>
                            <g id="order-svgrepo-com" transform="translate(-9480.2 3526.6)">
                                <path id="Path_64832" data-name="Path 64832" d="M260.861,279.8Z" transform="translate(-13.246 -13.432)" fill="#4235b4"></path>
                                <path id="Path_64835" data-name="Path 64835" d="M417.924,366.8h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,0,0,0-.968Zm0,2.924h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,0,0,0-.968Zm0,2.924h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,1,0,0-.968Zm0,2.918h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,0,0,0-.968Zm0,2.924h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,1,0,0-.968Zm0,2.924h-13.64a.484.484,0,1,0,0,.968h13.64a.484.484,0,0,0,0-.968Z" transform="translate(-148.871 -94.583)" fill="#4235b4"></path>
                                <path id="Path_64836" data-name="Path 64836" d="M279.278,291.705h-3.9V268.687a3.288,3.288,0,0,0-3.287-3.287H247.386a3.3,3.3,0,0,0-3.186,3.307v3.529a1,1,0,0,0,.282.692.972.972,0,0,0,.686.282h3.9v23a3.288,3.288,0,0,0,3.287,3.287.551.551,0,0,1,.242,0h24.362a3.288,3.288,0,0,0,3.287-3.287v-3.529A.963.963,0,0,0,279.278,291.705Zm-33.122-20.443v-2.555c0-1.465,1.539-1.358,1.539-1.358h.047a1.337,1.337,0,0,1,1.338,1.338v2.575Zm7.791,21.418v3.529a1.337,1.337,0,0,1-1.338,1.338.553.553,0,0,1-.242,0,1.337,1.337,0,0,1-1.338-1.338V268.687a3.289,3.289,0,0,0-.282-1.338H272.1a1.337,1.337,0,0,1,1.338,1.338v23.025H254.922A.965.965,0,0,0,253.948,292.68Zm24.356,3.536a1.337,1.337,0,0,1-1.338,1.338H255.608a3.289,3.289,0,0,0,.282-1.338v-2.555H278.3Z" transform="translate(0)" fill="#4235b4"></path>
                            </g>
                        </g>
                    </svg>  FORCE MANUAL ORDER
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="print_order_number_on_reciept" data-name="print order number on reciept" transform="translate(9193 -3784)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9193 3784)" fill="none"></rect>
                            <g id="reciept-financial-report-svgrepo-com" transform="translate(-9441 3578.19)">
                                <line id="Line_8" data-name="Line 8" y1="35.288" transform="translate(258.003 213.046)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <path id="Path_64837" data-name="Path 64837" d="M741.96,710.5v-4.84" transform="translate(-453.829 -462.166)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></path>
                                <path id="Path_64838" data-name="Path 64838" d="M741.96,240.008V216.6" transform="translate(-453.829 -3.554)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></path>
                                <path id="Path_64839" data-name="Path 64839" d="M258,212.81c2.511,0,2.511,2.739,5.021,2.739s2.511-2.739,5.021-2.739,2.511,2.739,5.021,2.739,2.511-2.739,5.022-2.739,2.51,2.739,5.021,2.739,2.511-2.739,5.022-2.739" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></path>
                                <path id="Path_64840" data-name="Path 64840" d="M288.208,746.979c-2.511,0-2.511-2.739-5.021-2.739s-2.511,2.739-5.021,2.739-2.511-2.739-5.021-2.739-2.511,2.739-5.022,2.739-2.51-2.739-5.021-2.739-2.511,2.739-5.022,2.739" transform="translate(-0.075 -498.344)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></path>
                                <line id="Line_9" data-name="Line 9" x2="10.3" transform="translate(262.925 222.611)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <line id="Line_10" data-name="Line 10" x2="6.74" transform="translate(276.469 222.611)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <line id="Line_11" data-name="Line 11" x2="10.3" transform="translate(262.925 230.69)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <line id="Line_12" data-name="Line 12" x2="6.74" transform="translate(276.469 230.69)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <line id="Line_13" data-name="Line 13" x2="10.3" transform="translate(262.925 238.769)" fill="none" stroke="#4235b4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"></line>
                                <path id="Path_64841" data-name="Path 64841" d="M570.631,549.994v-.615a2.738,2.738,0,0,1-1.1-.344,1.906,1.906,0,0,1-.747-.789,2.182,2.182,0,0,1-.215-.669.524.524,0,0,1,.507-.6h0a.523.523,0,0,1,.53.426,1.441,1.441,0,0,0,.156.456,1.157,1.157,0,0,0,.524.5,1.726,1.726,0,0,0,.736.154,1.9,1.9,0,0,0,.8-.152,1.14,1.14,0,0,0,.507-.436,1.241,1.241,0,0,0,.176-.672,1.156,1.156,0,0,0-.149-.586,1.417,1.417,0,0,0-.477-.472,3.914,3.914,0,0,0-.859-.39,4.966,4.966,0,0,1-1.22-.537,2.012,2.012,0,0,1-1-1.822,2.08,2.08,0,0,1,.516-1.459,2.214,2.214,0,0,1,1.416-.677v-.765a.428.428,0,0,1,.428-.429h0a.428.428,0,0,1,.428.429v.772a2.074,2.074,0,0,1,1.407.778,2.413,2.413,0,0,1,.456,1.121.534.534,0,0,1-.527.618h0a.529.529,0,0,1-.524-.436,1.711,1.711,0,0,0-.306-.755,1.113,1.113,0,0,0-.946-.456,1.273,1.273,0,0,0-.96.334,1.26,1.26,0,0,0-.319.914,1.241,1.241,0,0,0,.141.6,1.307,1.307,0,0,0,.472.464,4.486,4.486,0,0,0,.91.4,5.235,5.235,0,0,1,1.22.551,2.1,2.1,0,0,1,.721.747,2.147,2.147,0,0,1,.239,1.047,1.99,1.99,0,0,1-.56,1.486,2.47,2.47,0,0,1-1.534.652v.613a.423.423,0,0,1-.423.423h0a.423.423,0,0,1-.423-.421Z" transform="translate(-291.227 -306.923)" fill="#4235b4"></path>
                            </g>
                        </g>
                    </svg> PRINT ORDER NUMBER ON RECIEPT<br />
                    Set IP and PORT
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_16769" data-name="Group 16769" transform="translate(9791 -4532)">
                            <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9791 4532)" fill="none"></rect>
                            <g id="image-icon_1_" data-name="image-icon (1)" transform="translate(-9783 4543)">
                                <path id="Path_64933" data-name="Path 64933" d="M0,0H34.821V27.68H0V0ZM9.793,7.2A2.264,2.264,0,1,1,7.529,9.462,2.265,2.265,0,0,1,9.793,7.2Zm9.533,9.72,4.531-7.832,4.815,12.174H6.209v-1.51L8.1,19.655,9.983,15.03l.944,3.3h2.831l2.454-6.322,3.114,4.905ZM2.587,2.292H32.237V25.385H2.587V2.292Z" fill="#4235b4" fill-rule="evenodd"></path>
                            </g>
                        </g>
                    </svg> Show Item Images
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="NEED PASSWORD FOR BANKING REPORT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_15081" data-name="Group 15081" transform="translate(14749 -14701)">
                            <rect id="Rectangle_18552" data-name="Rectangle 18552" width="50" height="50" transform="translate(-14749 14701)" fill="none"></rect>
                            <g id="Search_results_for_Promote_code_-_Flaticon-12" data-name="Search results htmlFor Promote code - Flaticon-12" transform="translate(-14748.5 14701.5)">
                                <g id="Group_14836" data-name="Group 14836" transform="translate(3.5 3.5)">
                                    <path id="Path_14784" data-name="Path 14784" d="M22.565,43.258H6.738A3.241,3.241,0,0,1,3.5,40.021V18.437A5.19,5.19,0,0,1,5.614,14.32L14.55,7.478a3.8,3.8,0,0,1,4.517,0l8.94,6.846a5.188,5.188,0,0,1,2.114,4.116v6.835a1.079,1.079,0,1,1-2.158,0V18.437a3.051,3.051,0,0,0-1.266-2.4L17.758,9.191a1.643,1.643,0,0,0-1.9,0l-8.93,6.839a3.054,3.054,0,0,0-1.268,2.4V40.021A1.081,1.081,0,0,0,6.738,41.1H22.565a1.079,1.079,0,0,1,0,2.158Z" transform="translate(-3.5 -4.407)" fill="#4235b4"></path>
                                    <path id="Path_14785" data-name="Path 14785" d="M20.6,23.695a3.6,3.6,0,1,1,3.6-3.6A3.6,3.6,0,0,1,20.6,23.695Zm0-5.036A1.439,1.439,0,1,0,22.036,20.1,1.44,1.44,0,0,0,20.6,18.658Z" transform="translate(-7.287 -7.147)" fill="#4235b4"></path>
                                    <path id="Path_14786" data-name="Path 14786" d="M20.474,15.012A1.079,1.079,0,0,1,19.4,13.932v-1.8a8.634,8.634,0,0,1,17.267,0v1.078a1.079,1.079,0,0,1-2.158,0V12.134a6.475,6.475,0,0,0-12.95,0v1.8A1.079,1.079,0,0,1,20.474,15.012Zm0,21.409a3.549,3.549,0,0,1-3.3-2.12,1.08,1.08,0,0,1,2-.813,1.375,1.375,0,0,0,1.3.774,1.632,1.632,0,0,0,1.753-1.469v-.124c0-1.114-1.916-1.481-1.935-1.484-1.383-.23-3.73-1.252-3.73-3.612v-.124a3.783,3.783,0,0,1,3.912-3.628,3.549,3.549,0,0,1,3.3,2.12,1.08,1.08,0,0,1-2,.813,1.375,1.375,0,0,0-1.3-.774,1.633,1.633,0,0,0-1.754,1.469v.124c0,1.114,1.917,1.481,1.935,1.484,1.384.23,3.73,1.252,3.73,3.612v.124A3.782,3.782,0,0,1,20.474,36.421Z" transform="translate(-7.164 -3.5)" fill="#4235b4"></path>
                                    <path id="Path_14787" data-name="Path 14787" d="M21.579,32.868A1.079,1.079,0,0,1,20.5,31.789V29.456a1.079,1.079,0,0,1,2.158,0v2.333A1.079,1.079,0,0,1,21.579,32.868Zm0,12.776A1.079,1.079,0,0,1,20.5,44.564V42.231a1.079,1.079,0,1,1,2.158,0v2.333A1.079,1.079,0,0,1,21.579,45.644ZM38.127,51.4a1.079,1.079,0,0,1-.677-.239l-2.407-1.939-3.087.154a1.094,1.094,0,0,1-1.1-.8L30.052,45.6l-2.588-1.69a1.078,1.078,0,0,1-.418-1.288l1.1-2.889-1.1-2.888a1.078,1.078,0,0,1,.419-1.288l2.588-1.69.807-2.984a1.077,1.077,0,0,1,1.1-.8l3.087.153L37.45,28.3a1.08,1.08,0,0,1,1.354,0l2.407,1.939,3.087-.153a1.094,1.094,0,0,1,1.1.8l.807,2.984,2.588,1.69a1.078,1.078,0,0,1,.418,1.288l-1.1,2.888,1.1,2.889a1.078,1.078,0,0,1-.419,1.288L46.2,45.6l-.808,2.983a1.111,1.111,0,0,1-1.1.8l-3.087-.154L38.8,51.161a1.079,1.079,0,0,1-.676.239ZM35.4,47.044a1.079,1.079,0,0,1,.677.239l2.05,1.652,2.05-1.652a1.048,1.048,0,0,1,.73-.237l2.63.131.688-2.541a1.079,1.079,0,0,1,.452-.622l2.2-1.439-.937-2.461a1.073,1.073,0,0,1,0-.769l.937-2.461-2.2-1.439a1.083,1.083,0,0,1-.452-.622l-.688-2.541-2.63.131a1.065,1.065,0,0,1-.73-.237l-2.05-1.652-2.05,1.652a1.076,1.076,0,0,1-.73.237l-2.63-.131-.687,2.541a1.08,1.08,0,0,1-.452.622l-2.2,1.439.937,2.461a1.072,1.072,0,0,1,0,.768l-.937,2.461,2.2,1.439a1.083,1.083,0,0,1,.452.622l.687,2.541,2.63-.131H35.4Z" transform="translate(-8.269 -10.39)" fill="#4235b4"></path>
                                    <ellipse id="Ellipse_312" data-name="Ellipse 312" cx="1.799" cy="1.499" rx="1.799" ry="1.499" transform="translate(24.341 26.372) rotate(-45)" fill="#4235b4"></ellipse>
                                    <ellipse id="Ellipse_313" data-name="Ellipse 313" cx="1.799" cy="1.499" rx="1.799" ry="1.499" transform="translate(30.698 32.732) rotate(-45)" fill="#4235b4"></ellipse>
                                    <path id="Path_14788" data-name="Path 14788" d="M40.455,46.74a1.079,1.079,0,0,1-.763-1.842l5.936-5.936a1.079,1.079,0,1,1,1.525,1.526l-5.936,5.936a1.074,1.074,0,0,1-.763.317Z" transform="translate(-13.564 -13.354)" fill="#4235b4"></path>
                                </g>
                            </g>
                        </g>
                    </svg> APPLY MULTIPLE PROMOTIONS ON A SINGLE ORDER
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="APPLY MULTIPLE PROMOTIONS ON A SINGLE ORDER">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                    <input
            type="checkbox"
            className="toggleBtn_SoftwareSetting"
            id="ApplyMultiplePromotionOnOrder"
            data-id="1"
            // onChange={UpdateSoftwareSettingStatus}
        />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_15081" data-name="Group 15081" transform="translate(14749 -14701)">
                            <rect id="Rectangle_18552" data-name="Rectangle 18552" width="50" height="50" transform="translate(-14749 14701)" fill="none"></rect>
                            <g id="Search_results_for_Promote_code_-_Flaticon-12" data-name="Search results htmlFor Promote code - Flaticon-12" transform="translate(-14748.5 14701.5)">
                                <g id="Group_14836" data-name="Group 14836" transform="translate(3.5 3.5)">
                                    <path id="Path_14784" data-name="Path 14784" d="M22.565,43.258H6.738A3.241,3.241,0,0,1,3.5,40.021V18.437A5.19,5.19,0,0,1,5.614,14.32L14.55,7.478a3.8,3.8,0,0,1,4.517,0l8.94,6.846a5.188,5.188,0,0,1,2.114,4.116v6.835a1.079,1.079,0,1,1-2.158,0V18.437a3.051,3.051,0,0,0-1.266-2.4L17.758,9.191a1.643,1.643,0,0,0-1.9,0l-8.93,6.839a3.054,3.054,0,0,0-1.268,2.4V40.021A1.081,1.081,0,0,0,6.738,41.1H22.565a1.079,1.079,0,0,1,0,2.158Z" transform="translate(-3.5 -4.407)" fill="#4235b4"></path>
                                    <path id="Path_14785" data-name="Path 14785" d="M20.6,23.695a3.6,3.6,0,1,1,3.6-3.6A3.6,3.6,0,0,1,20.6,23.695Zm0-5.036A1.439,1.439,0,1,0,22.036,20.1,1.44,1.44,0,0,0,20.6,18.658Z" transform="translate(-7.287 -7.147)" fill="#4235b4"></path>
                                    <path id="Path_14786" data-name="Path 14786" d="M20.474,15.012A1.079,1.079,0,0,1,19.4,13.932v-1.8a8.634,8.634,0,0,1,17.267,0v1.078a1.079,1.079,0,0,1-2.158,0V12.134a6.475,6.475,0,0,0-12.95,0v1.8A1.079,1.079,0,0,1,20.474,15.012Zm0,21.409a3.549,3.549,0,0,1-3.3-2.12,1.08,1.08,0,0,1,2-.813,1.375,1.375,0,0,0,1.3.774,1.632,1.632,0,0,0,1.753-1.469v-.124c0-1.114-1.916-1.481-1.935-1.484-1.383-.23-3.73-1.252-3.73-3.612v-.124a3.783,3.783,0,0,1,3.912-3.628,3.549,3.549,0,0,1,3.3,2.12,1.08,1.08,0,0,1-2,.813,1.375,1.375,0,0,0-1.3-.774,1.633,1.633,0,0,0-1.754,1.469v.124c0,1.114,1.917,1.481,1.935,1.484,1.384.23,3.73,1.252,3.73,3.612v.124A3.782,3.782,0,0,1,20.474,36.421Z" transform="translate(-7.164 -3.5)" fill="#4235b4"></path>
                                    <path id="Path_14787" data-name="Path 14787" d="M21.579,32.868A1.079,1.079,0,0,1,20.5,31.789V29.456a1.079,1.079,0,0,1,2.158,0v2.333A1.079,1.079,0,0,1,21.579,32.868Zm0,12.776A1.079,1.079,0,0,1,20.5,44.564V42.231a1.079,1.079,0,1,1,2.158,0v2.333A1.079,1.079,0,0,1,21.579,45.644ZM38.127,51.4a1.079,1.079,0,0,1-.677-.239l-2.407-1.939-3.087.154a1.094,1.094,0,0,1-1.1-.8L30.052,45.6l-2.588-1.69a1.078,1.078,0,0,1-.418-1.288l1.1-2.889-1.1-2.888a1.078,1.078,0,0,1,.419-1.288l2.588-1.69.807-2.984a1.077,1.077,0,0,1,1.1-.8l3.087.153L37.45,28.3a1.08,1.08,0,0,1,1.354,0l2.407,1.939,3.087-.153a1.094,1.094,0,0,1,1.1.8l.807,2.984,2.588,1.69a1.078,1.078,0,0,1,.418,1.288l-1.1,2.888,1.1,2.889a1.078,1.078,0,0,1-.419,1.288L46.2,45.6l-.808,2.983a1.111,1.111,0,0,1-1.1.8l-3.087-.154L38.8,51.161a1.079,1.079,0,0,1-.676.239ZM35.4,47.044a1.079,1.079,0,0,1,.677.239l2.05,1.652,2.05-1.652a1.048,1.048,0,0,1,.73-.237l2.63.131.688-2.541a1.079,1.079,0,0,1,.452-.622l2.2-1.439-.937-2.461a1.073,1.073,0,0,1,0-.769l.937-2.461-2.2-1.439a1.083,1.083,0,0,1-.452-.622l-.688-2.541-2.63.131a1.065,1.065,0,0,1-.73-.237l-2.05-1.652-2.05,1.652a1.076,1.076,0,0,1-.73.237l-2.63-.131-.687,2.541a1.08,1.08,0,0,1-.452.622l-2.2,1.439.937,2.461a1.072,1.072,0,0,1,0,.768l-.937,2.461,2.2,1.439a1.083,1.083,0,0,1,.452.622l.687,2.541,2.63-.131H35.4Z" transform="translate(-8.269 -10.39)" fill="#4235b4"></path>
                                    <ellipse id="Ellipse_312" data-name="Ellipse 312" cx="1.799" cy="1.499" rx="1.799" ry="1.499" transform="translate(24.341 26.372) rotate(-45)" fill="#4235b4"></ellipse>
                                    <ellipse id="Ellipse_313" data-name="Ellipse 313" cx="1.799" cy="1.499" rx="1.799" ry="1.499" transform="translate(30.698 32.732) rotate(-45)" fill="#4235b4"></ellipse>
                                    <path id="Path_14788" data-name="Path 14788" d="M40.455,46.74a1.079,1.079,0,0,1-.763-1.842l5.936-5.936a1.079,1.079,0,1,1,1.525,1.526l-5.936,5.936a1.074,1.074,0,0,1-.763.317Z" transform="translate(-13.564 -13.354)" fill="#4235b4"></path>
                                </g>
                            </g>
                        </g>
                    </svg> APPLY PROMOTIONS WITH SUBTOTAL/ITEM DISCOUNT
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="APPLY PROMOTIONS WITH SUBTOTAL/ITEM DISCOUNT">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" className="toggleBtn_SoftwareSetting" id="ApplyPromotionWithOtherDiscount" data-id="1" onChange={'updateSoftwareSettingStatus'} />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>

            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_19775" data-name="Group 19775" transform="translate(3818 -4711)">
                            <rect id="Rectangle_19687" data-name="Rectangle 19687" width="50" height="50" transform="translate(-3818 4711)" fill="none"></rect>
                            <g id="Group_19774" data-name="Group 19774" transform="translate(-132.708 -48)">
                                <path id="Path_38105" data-name="Path 38105" d="M21.969,32.695A6.519,6.519,0,0,1,28.4,27.227v-1H12v1a6.519,6.519,0,0,1,6.434,5.467l.879,5.381H16.368v1.283h7.67V38.076H21.089Zm3.047-9.5a5.14,5.14,0,0,0-.69-2.572V17.958h-.839v2.667A5.141,5.141,0,0,0,22.8,23.2v2.669h2.22V23.2ZM21,25.867l.451-3.731H18.96l.464,3.731Z" transform="translate(-3681.752 4759.967)" fill="#352a90"></path>
                                <g id="Group_19773" data-name="Group 19773" transform="translate(-3654.84 4769)">
                                    <path id="Path_38103" data-name="Path 38103" d="M44.121,28.478c1.673,4.574-3.98,4.276-3.98,4.276-5.652.484-5.019,6.731-5.019,6.731H45.5l2.008-16.548C42.188,22.974,44.121,28.478,44.121,28.478Z" transform="translate(-29.396 -10.442)" fill="#352a90"></path>
                                    <path id="Path_38104" data-name="Path 38104" d="M38.621,31.166c.058,0,.113-.015.17-.022a2.7,2.7,0,0,0,.291.024c4.35,0,3.807-9.117,1.375-13.349a2.673,2.673,0,0,0-4.978,1.589c-1.059,1.432-2.273.645-3.706-.827a1.785,1.785,0,0,0-2.559,2.49c2.145,2.2,4.872,3.622,7.509,1.994a8.523,8.523,0,0,1-.235,4.813c-5.57,1.321-7.35,7.143-7.482,10.357a1.785,1.785,0,1,0,3.567.145c.012-.286.351-7.025,6.047-7.213Z" transform="translate(-28.708 -9.748)" fill="#352a90"></path>
                                    <circle id="Ellipse_151" data-name="Ellipse 151" cx="2.677" cy="2.677" r="2.677" transform="translate(5.392)" fill="#352a90"></circle>
                                </g>
                                <g id="Group_19772" data-name="Group 19772" transform="translate(-3684.292 4769)">
                                    <path id="Path_38106" data-name="Path 38106" d="M38.486,28.478c-1.673,4.574,3.98,4.276,3.98,4.276,5.652.484,5.019,6.731,5.019,6.731H37.109L35.1,22.937C40.419,22.974,38.486,28.478,38.486,28.478Z" transform="translate(-35.101 -10.442)" fill="#352a90"></path>
                                    <path id="Path_38107" data-name="Path 38107" d="M32.409,31.166c-.058,0-.113-.015-.17-.022a2.7,2.7,0,0,1-.291.024c-4.35,0-3.807-9.117-1.375-13.349a2.673,2.673,0,0,1,4.978,1.589c1.059,1.432,2.273.645,3.706-.827a1.785,1.785,0,0,1,2.559,2.49c-2.145,2.2-4.872,3.622-7.509,1.994a8.523,8.523,0,0,0,.235,4.813c5.57,1.321,7.35,7.143,7.482,10.357a1.785,1.785,0,1,1-3.567.145c-.012-.286-.351-7.025-6.047-7.213Z" transform="translate(-24.212 -9.748)" fill="#352a90"></path>
                                    <ellipse id="Ellipse_152" data-name="Ellipse 152" cx="2.677" cy="2.677" rx="2.677" ry="2.677" transform="translate(7.363)" fill="#352a90"></ellipse>
                                </g>
                            </g>
                        </g>
                    </svg> ALLOW TABLE JOINING
                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="ALLOW TABLE JOINING">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" className="toggleBtn_SoftwareSetting" id="AllowTableJoining" data-id="1" onChange={'UpdateTableQRWorflow_SoftwareSetting'} />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>
            <div className="form-check form-set">
                <label className="form-check-label" htmlFor="exampleRadios1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_19771" data-name="Group 19771" transform="translate(3878 -4711)">
                            <rect id="Rectangle_19687" data-name="Rectangle 19687" width="50" height="50" transform="translate(-3878 4711)" fill="none"></rect>
                            <g id="dining-room-furniture-of-a-table-with-chairs-svgrepo-com" transform="translate(-3876 4586.344)">
                                <path id="Path_38098" data-name="Path 38098" d="M2.06,153.681H8.579l.88,7.117h.821v-9.489H2.219l-.781-12.652H0V160.8H1.438Z" transform="translate(0 0)" fill="#352a90"></path>
                                <path id="Path_38099" data-name="Path 38099" d="M29.083,273.323H36.2a.4.4,0,0,0,0-.791H29.083a.4.4,0,1,0,0,.791Z" transform="translate(-26.316 -122.805)" fill="#352a90"></path>
                                <path id="Path_38100" data-name="Path 38100" d="M419.842,151.308h-8.654V160.8H412.6l.88-7.117H420l.621,7.117h1.636V138.656h-1.636Z" transform="translate(-377.185 0)" fill="#352a90"></path>
                                <path id="Path_38101" data-name="Path 38101" d="M411.188,272.926a.4.4,0,0,0,.4.4H418.7a.4.4,0,0,0,0-.791h-7.117A.4.4,0,0,0,411.188,272.926Z" transform="translate(-377.185 -122.804)" fill="#352a90"></path>
                                <path id="Path_38102" data-name="Path 38102" d="M77.2,188.051h6.42v16.606H84.84l.95-13.443H98.922l.95,13.443h1.143V188.051h7.211a.7.7,0,0,0,.7-.7v-.188a.7.7,0,0,0-.7-.7H77.2a.7.7,0,0,0-.7.7v.188A.7.7,0,0,0,77.2,188.051Zm21.5,0,.112,1.582H85.9l.111-1.582Z" transform="translate(-70.174 -43.859)" fill="#352a90"></path>
                            </g>
                        </g>
                    </svg>CLEAR TABLE AFTER ORDER IS PAID

                    <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="CLEAR TABLE AFTER ORDER IS PAID">
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </button>
                    <i className="input-helper"></i>
                    <i className="input-helper"></i></label>
                <div className="toggle-btn">
                    <label className="switch">
                        <input type="checkbox" className="toggleBtn_SoftwareSetting" id="ClearTableAfterOrderisPaid" data-id="1" onChange="UpdateTableQRWorflow_SoftwareSetting(this)" />
                        <span className="slider round"></span>
                        <i className="input-helper"></i>
                        <i className="input-helper"></i></label>
                </div>
            </div>


        </div>
        // </div>

    )
}

export default GeneralSetting