import React, { useState } from 'react'
import PromocodeTableModal from './SoftwareSettingModals/PromocodeTableModal'
import Threshold from './SoftwareSettingModals/Threshold'
// import Threshold from './SoftwareSettingModals/Threshold'

interface PromotionProps {
}

const Promotion: React.FC<PromotionProps> = () => {
    const [promotionModal, setPromotionModal] = useState<boolean>(false);
    const [thresholModal, setThresholdModal] = useState<boolean>(false);

    const closePromotionModal = () => {
        setPromotionModal(false);
    }
    const closeThreholdModal = () => {
        setThresholdModal(false);
    }

    return (
        <>
        <div className=" " id="v-pills-promotion" role="tabpanel" aria-labelledby="v-pills-promotion-tab">
            <div className="tab-set">
                <h4 style={{ color: "#4235b4" }}>Promotion</h4>
                <div className="set-check-box promotionSection">
                    <div className="form-check d-flex align-items-center PromoCodeSectionCommonClass promo-modal promo-text ui-sortable-handle ps-0" data-rid="3">
                        <label className="form-check-label flex-grow-1">
                                <span className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                                <g id="Group_15081" data-name="Group 15081" transform="translate(14749 -14701)">
                                    <rect id="Rectangle_18552" data-name="Rectangle 18552" width="50" height="50" transform="translate(-14749 14701)" fill="none"></rect>
                                    <g id="Search_results_for_Promote_code_-_Flaticon-12" data-name="Search results for Promote code - Flaticon-12" transform="translate(-14748.5 14701.5)">
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
                                    </svg>
                                    <a data-toggle="modal" onClick={() => setPromotionModal(true)} data-target="#promoCodeTableModal" id="btn_OpenPromoCodeTable_Modal_ManageSoftwareSetting" style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}>Promocode</a>
                            <button type="button" className="btn tootipCustomClass" data-toggle="tooltip" data-placement="bottom" title="" data-bs-original-title="CLICK ON PROMOCODE TO VIEW IT'S DATA">
                                <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </button>
                                    <i className="input-helper"></i>
                                </span>
                            </label>
                    </div>
                    <div className="form-check d-flex align-items-center ThresholdSectionCommonClass promo-text ps-0" data-rid="4">
                        <label className="form-check-label flex-grow-1">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                                        <g id="Group_15083" data-name="Group 15083" transform="translate(14750 -14766)">
                                            <rect id="Rectangle_18553" data-name="Rectangle 18553" width="50" height="50" transform="translate(-14750 14766)" fill="none"></rect>
                                            <g id="Search_results_for_Threshold_-_Flaticon-12" data-name="Search results for Threshold - Flaticon-12" transform="translate(-14761.465 14744.431)">
                                                <path
                                                    id="Path_14789"
                                                    data-name="Path 14789"
                                                    d="M53.141,43.492A17.558,17.558,0,1,0,51.62,54.966a.965.965,0,1,1,1.721.872,19.482,19.482,0,1,1,1.7-12.663l.557-.74A.965.965,0,0,1,57.143,43.6l-1.96,2.6a.965.965,0,0,1-1.34.2l-2.629-1.923a.965.965,0,0,1,1.139-1.557ZM31.03,47.656H21.17a.685.685,0,1,1,0-1.371H31.564l3.355-8.61a1.242,1.242,0,0,1,2.324.024l3.147,8.587h8.88a.685.685,0,1,1,0,1.371H40.892l2.352,6.419a1.222,1.222,0,0,0,2.15.279l2.752-3.942a2.569,2.569,0,0,1,2.106-1.1h1.915a.685.685,0,1,1,0,1.371H50.252a1.2,1.2,0,0,0-.982.512l-2.752,3.942a2.593,2.593,0,0,1-4.561-.592l-2.525-6.89H32.5L29.486,55.4a2.052,2.052,0,0,1-3.684.291l-2.87-4.907a.685.685,0,0,1,1.183-.692l2.87,4.907a.682.682,0,0,0,1.224-.1Zm7.9-1.371-2.857-7.8-3.038,7.8Z"
                                                    transform="translate(0 0)"
                                                    fill="#4235b4"
                                                    fillRule="evenodd"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <a
                                        data-toggle="modal"
                                        data-target="#thresholdTableModal"
                                        onClick={() => setThresholdModal(true)}
                                        style={{ cursor: "pointer", textDecoration: "none", color: "#000" }}
                                    >
                                        Threshold
                                    </a>
                                    <button
                                        type="button"
                                        className="btn tootipCustomClass"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title=""
                                        data-bs-original-title="CLICK ON THRESHOLD TO VIEW IT'S DATA"
                                    >
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </button>
                                    <i className="input-helper"></i>
                                </span>
                            </label>
                    </div>
                </div>
            </div>
            </div>
            {promotionModal && (
                <PromocodeTableModal
                    onClose={closePromotionModal}
                />
            )}
            {thresholModal && (
                <Threshold
                onClose={closeThreholdModal}
                />
            )}
        </>
    )
}

export default Promotion