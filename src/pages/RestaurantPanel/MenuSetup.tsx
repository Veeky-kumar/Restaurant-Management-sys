import React from 'react';
import { Link } from 'react-router-dom'
import "../../assets/CSS/menusetup.css";

type Props = {}

const MenuSetup: React.FC = (props: Props) => {
    return (
        <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
            <div className="background_menus-colo bg-white p-16 sm:px-40" >
                <div className="menus_wraps-items">
                    <div className="">
                        <div className="grid grid-rows-2 sm:grid-cols-2 gap-3 sm:gap-5">
            

                            <div className="my-2 sm:my-0  menu_setup_commonClass">
                                <Link to="/Restaurant/POSMenuSetup" className="active">
                                    <div className="flex flex-wrap px-5 justify-center items-wraps_etc">
                                        <p className="item_name pb-3 pt-1">POS MENU</p>
                                    </div>
                                </Link>
                            </div>

                            <div className="my-2 sm:my-0  menu_setup_commonClass  menu_setup_commonClass">
                                <Link to="/Restaurant/KIOSKMenuSetup" className="active">
                                    <div className="flex flex-wrap px-5 h-full w-full justify-center items-wraps_etc">
                                        <p className="item_name">KIOSK MENU</p>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuSetup