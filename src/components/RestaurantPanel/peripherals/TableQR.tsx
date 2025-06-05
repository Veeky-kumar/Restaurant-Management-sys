import React, { useEffect, useState } from 'react';
import "../../../assets/CSS/peripheral.css"
import axios from 'axios';
import Swal from 'sweetalert2';

interface TableProps {
    tableId: number;
    tableTitle: string;
    qrCodeImage: string;

}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

interface RestaurantSettings {
    AllowTableJoining: number;
    ClearTableAfterOrderIsPaid: number;
    LockBehaviorWhenIssueingBill: number;
    LockOrderWhenPlacingOrder: number;
    OrderIsInPending_LockOrder: number;
    OrderLock: number;
    OrderUnlockValue: number;
    RequirePaymentWhenPlacingOrder: number;
    RestaurantLoginId: number;
    ReturnHomeAfterPaymentProcessing: number;
    SetProductViewType: string;
}

const TableQR: React.FC = () => {
    const [tableData, settableData] = useState<TableProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);
    const [restaurantSettings, setRestaurantSettings] = useState<RestaurantSettings>({
        AllowTableJoining: 0,
        ClearTableAfterOrderIsPaid: 0,
        LockBehaviorWhenIssueingBill: 0,
        LockOrderWhenPlacingOrder: 0,
        OrderIsInPending_LockOrder: 0,
        OrderLock: 0,
        OrderUnlockValue: 0,
        RequirePaymentWhenPlacingOrder: 0,
        RestaurantLoginId: 0,
        ReturnHomeAfterPaymentProcessing: 0,
        SetProductViewType: ""
    });

    const globalToken = localStorage.getItem("authToken");

    const toggleTableSelection = (tableId: number) => {
        setSelectedTableIds((prevIds) =>
            prevIds.includes(tableId)
                ? prevIds.filter((id) => id !== tableId)
                : [...prevIds, tableId]
        );

    };

    const getTableList = async () => {

        const apiUrl = `${import.meta.env.VITE_API_URL}api/restaurant/tables/list?restaurantLoginId=0`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200 && response.data.status === 1) {
                const data = response.data.data.restaurantTables;
                settableData(
                    data.map((tabs: any) => ({
                        tableId: tabs.Id,
                        tableTitle: tabs.TableName,
                        qrCodeImage: tabs.TableQRCodeWithPath,
                    }))
                );
            }
            else {
                Toast.fire({
                    title: 'Error',
                    text: 'Failed to retrieve data',
                    icon: 'error',
                })
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    //Create new Table
    const createUpdateTable = async (id: number, mode: number) => {

        const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/addupdate/table`
        try {
            setLoading(true);
            const data = new FormData();

            data.append("id", String(id));
            data.append("restaurantLoginId", "0");
            data.append("name", "");
            data.append("mode", String(mode));

            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                Toast.fire({
                    title: 'Success',
                    text: 'Table created successfully',
                    icon: 'success',
                })
            }

        } catch (error) {
            Toast.fire({
                title: 'Error',
                text: 'Failed to retrieve data',
                icon: 'error',
            })
        }
        finally {
            setLoading(false);
            setSelectedTableIds([]);
        }
    }

    const getWorkflowSetting = async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/all/tableqr/wokflow/setting/lists?restaurantLoginId=0`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200 && response.data.status === 1) {
                const data = response.data.data._list;
                setRestaurantSettings(data);
            }
            else {
                Toast.fire({
                    title: 'Error',
                    text: 'Failed to retrieve data',
                    icon: 'error',
                })
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    //Generate Table Qr
    const CreateRestaurantTableQRCode_SoftwareSetting = async () => {

        const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/table/generate/qrcode`
        try {
            setLoading(true);
            const data = new FormData();

            data.append("tableIds", selectedTableIds.toString());
            data.append("restaurantLoginId", "0");

            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                Toast.fire({
                    title: 'Success',
                    text: 'Table created successfully',
                    icon: 'success',
                })
            }

        } catch (error) {
            Toast.fire({
                title: 'Error',
                text: 'Failed to retrieve data',
                icon: 'error',
            })
        }
        finally {
            setLoading(false);
            setSelectedTableIds([]);
        }
    };

    //Delete Confirmation
    const confirmTableDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteTables_SoftwareSetting();
            }
        });
    }

    //Delete Selected Table
    const DeleteTables_SoftwareSetting = async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/table/delete`
        try {
            setLoading(true);
            const data = new FormData();

            data.append("tableIds", selectedTableIds.toString());
            data.append("restaurantLoginId", "0");

            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                Toast.fire({
                    title: 'Success',
                    text: 'Table created successfully',
                    icon: 'success',
                })
            }

        } catch (error) {
            Toast.fire({
                title: 'Error',
                text: 'Failed to retrieve data',
                icon: 'error',
            })
        }
        finally {
            setLoading(false);
            setSelectedTableIds([]);
        }
    };

    const PrintRestaurantTableQRCode_SoftwareSetting = async () => {

        const tableId = selectedTableIds[0];
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/single/table?tableId=${tableId}`
        try {
            setLoading(true);
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200 && response.data.status === 1) {

                const tableData = response.data.data.restaurantTable;
                const qrCodeUrl = `${import.meta.env.VITE_API_URL}${tableData.TableQRCodeWithPath}`;

                const printWindow = window.open('', '_blank');
                if (printWindow) {
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>${tableData.TableName} - QR Code</title>
                                <style>
                                    body {

                                        justify-content: center;
                                        align-items: center;
                                        height: 94vh;
                                        margin: 0;
                                        font-family: Arial, sans-serif;
                                    }
                                    img {
                                        margin-left: 25px;
                                        max-width: 100%;
                                        height: 80%;
                                    }
                                    h1{
                                       text-align:center;   
                                       margin-top: 30px;

                                        }
                                </style>
                            </head>
                            <body>
                                  <h1>${tableData.TableName}</h1>
                                <img src="${qrCodeUrl}" alt="${tableData.TableName}" />
                            </body>
                        </html>
                    `);


                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                        printWindow.print();

                    }, 1000);
                }
            }

        } catch (error) {
            Toast.fire({
                title: 'Error',
                text: 'Failed to retrieve data',
                icon: 'error',
            })
        }
        finally {
            setLoading(false);
            setSelectedTableIds([]);
        }
    };

    const UpdateTableQRWorkflowSetting = async (fieldName: keyof RestaurantSettings, value: any) => {

        if (typeof value === "boolean") {
            setRestaurantSettings((prev) => ({
                ...prev,
                [fieldName]: value ? 1 : 0,
            }));


        }
        else {
            setRestaurantSettings((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        }

        const updatedSettings = {
            ...restaurantSettings,
            [fieldName]: typeof value === "boolean" ? (value ? 1 : 0) : value,
        };

        try {
            setLoading(true)
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/update/tableqr/workflow/setting/status`
            const response = await axios.post(apiUrl, updatedSettings,
                {
                    headers: {
                        'Authorization': `Bearer ${globalToken}`,
                        "Content-Type": "application/json"
                    }
                })
            if (response.status === 200 && response.data.status === 1) {
                Toast.fire({
                    title: 'Success',
                    // text: 'Table QR workflow setting updated successfully',
                    icon: 'success'
                })
            }
            else {
                Toast.fire({
                    title: 'Error',
                    // text: 'Table QR workflow setting updated successfully',
                    icon: 'error'
                })
            }
        }
        catch (error) {
            Toast.fire({
                title: 'Error',
                // text: 'Table QR workflow setting updated successfully',
                icon: 'error'
            })
        }
        finally {
            setLoading(false);
        }

    }


    useEffect(() => {
        getTableList();
        getWorkflowSetting();
    }, [loading])


    return (
        <div className='tableqr-box'>
            {loading && (<div style={{
                backgroundColor: "#f0f5f0",
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "300%",
                zIndex: 999999999999999,
                MozOpacity: 0.2,
                opacity: 0.2,
            }}>
                <img src="/Content/Images/Loader.gif" style={{
                    backgroundColor: "#9af58c",
                    alignItems: "center",
                    position: "fixed",
                    top: "40%",
                    width: "10%",
                    left: "50%",
                }} />
            </div>)}
            <div id="contentWrapper_RestaurantLayout" className="content-wrapper timing_stores">
                <div className="wrapper-navs_wraps p-0">
                    <div className="col-12 text-center pl-0 ">
                        <ul className="nav nav-tabs software_settings mb-4" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a
                                    href="#"
                                    className="nav-link active m-0"
                                    id="home-tab"
                                    data-toggle="tab"
                                    data-target="#home"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                >
                                    Table
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link "
                                    id="profile-tab"
                                    data-toggle="tab"
                                    data-target="#profile"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Workflow Settings
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 px-0">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div id="restaurant">
                                    <div className="cgt-desc">
                                        <div className="floor_wraps">
                                            <a href="#" className="button_floor-ground">
                                                <button type="button" className="btn btn-primary ground_floor-button">
                                                    Ground Floor
                                                </button>
                                            </a>
                                            <a href="#" className="add_wraps-etc  ml-2 mt-1">
                                                <span className="wrap_plus">
                                                    <i className="fa fa-plus m-0" aria-hidden="true"></i>
                                                </span>
                                            </a>

                                            <div className="table_wraps-settings">
                                                <div
                                                    id="TablesList_Section_SoftwareSetting"
                                                    className="create_wrrpr-table"
                                                    style={{ height: '100%', overflowY: 'auto' }}
                                                >
                                                    {tableData.map((table) => (
                                                        <div
                                                            key={table.tableId}
                                                            id={`tblSection_ManageTable_SoftwareSetting_${table.tableId}`}
                                                            className={`table_number !flex !items-center ${selectedTableIds.includes(table.tableId)
                                                                ? 'selectedTableClass_ManageTables_SoftwareSetting'
                                                                : ''
                                                                }`}
                                                            style={{
                                                                padding: '5px',
                                                                display: 'block',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => toggleTableSelection(table.tableId)}
                                                        >
                                                            <div className="tblStyle" title={table.tableTitle} style={{ fontSize: '15px', width: '100%' }}>
                                                                <br />
                                                                {table.tableTitle}
                                                                <br />
                                                                {table.qrCodeImage && (<div style={{ textAlign: 'center' }}>
                                                                    {
                                                                        <img
                                                                            src={`http://posofficialnew.protoshopp.in/${table.qrCodeImage}`}
                                                                            alt="QR_Code"
                                                                            style={{ width: '90%', height: 'auto' }}
                                                                        />
                                                                    }
                                                                </div>)}
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="wrap_button-wrapper">
                                                <div className="col-md-12 col-lg-12 col-sm-12" style={{ padding: '0px' }}>
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-3 col-sm-6">
                                                            <div className="tables-wrpper">
                                                                <a href="javascript:;">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary create_table-wrpper"
                                                                        onClick={() => createUpdateTable(0, 1)}
                                                                    >
                                                                        Create Table
                                                                    </button>
                                                                </a>
                                                                <a href="javascript:;">
                                                                    <button
                                                                        id="btn_CreateTableQR_ManageRestaurantTable_SoftwareSetting"
                                                                        type="button"
                                                                        className="btn btn-primary create_table-wrpper"
                                                                        onClick={CreateRestaurantTableQRCode_SoftwareSetting}
                                                                        disabled={selectedTableIds.length === 0}
                                                                    >
                                                                        Create Table QR
                                                                    </button>
                                                                </a>
                                                            </div>

                                                            <div className="tables-wrpper">
                                                                <a href="javascript:;">
                                                                    <button
                                                                        id="btn_DeleteTable_ManageRestaurantTable_SoftwareSetting"
                                                                        type="button"
                                                                        className="btn btn-primary create_table-wrpper"
                                                                        onClick={confirmTableDelete}
                                                                        disabled={selectedTableIds.length === 0}

                                                                    >
                                                                        Delete Table
                                                                    </button>
                                                                </a>

                                                                <a href="javascript:;">
                                                                    <button
                                                                        id="btn_PrintTableQR_ManageRestaurantTable_SoftwareSetting"
                                                                        type="button"
                                                                        className="btn btn-primary create_table-wrpper"
                                                                        onClick={PrintRestaurantTableQRCode_SoftwareSetting}
                                                                        disabled={selectedTableIds.length !== 1}
                                                                    >
                                                                        Print QRcode
                                                                    </button>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-sm-6">
                                                            <div className="flower_wrap-img">
                                                                <div className="img_flower">
                                                                    <img src="./Content/Restaurant/icons/flower.png" alt="flower" className="flower_icon-img" />
                                                                </div>
                                                                <div className="radio_buttons-wrappers">
                                                                    <div className="form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" className="form-check-input" name="optradio" checked />Table Size
                                                                            <i className="input-helper"></i></label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" className="form-check-input" name="optradio" />Table Position
                                                                            <i className="input-helper"></i></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-sm-6">
                                                            <div className="tables-wrpper">
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Draw Line</button></a>
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Create Box</button></a>
                                                            </div>

                                                            <div className="tables-wrpper">
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Delete Line</button></a>

                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Delete Box</button></a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-sm-6">
                                                            <div className="tables-wrpper">
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Floor Picture</button></a>
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Save</button></a>
                                                            </div>

                                                            <div className="tables-wrpper">
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Remove Floor Pic</button></a>
                                                                <a href="#"><button type="button" className="btn btn-primary create_table-wrpper">Exit</button></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="dv_RestaurantTableQRCode_PrintableSection_SoftwareSetting" style={{ display: "none" }}>
                                        <div id="lblRestaurantTableQRCode_TableName_Printable_SoftwareSetting" style={{ textAlign: "center", paddingBottom: "10px", paddingTop: "30px", fontWeight: "bold", fontSize: "40px" }}></div>
                                        <img id="imgRestaurantTableQRCode_Printable_SoftwareSetting" src="" alt="QR_Code" style={{ width: "100%" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                <div className="table-input text-left mb-3">
                                    <h6 className="font-weight-bold">
                                        RETURN HOME <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </h6>
                                    <div className="input-bx">
                                        <h6>Return Home After Payment Processing</h6>
                                        <span className="mt-1">
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input
                                                        type="checkbox"
                                                        id="ReturnHomeAfterPaymentProcessing"
                                                        data-id="0"
                                                        checked={restaurantSettings.ReturnHomeAfterPaymentProcessing === 1}
                                                        onChange={(e) => UpdateTableQRWorkflowSetting("ReturnHomeAfterPaymentProcessing", e.target.checked)}
                                                    />                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="table-input text-left mb-3">
                                    <h6 className="font-weight-bold">
                                        ORDER PAYMENT <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </h6>
                                    <div className="input-bx">
                                        <h6>Require Payment When Placing Order</h6>
                                        <span className="mt-1">
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input type="checkbox" id="RequirePaymentWhenPlacingOrder_Table" data-id="0" checked={restaurantSettings.RequirePaymentWhenPlacingOrder === 1} onChange={(e) => UpdateTableQRWorkflowSetting("RequirePaymentWhenPlacingOrder", e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="table-input text-left mb-3">
                                    <h6 className="font-weight-bold">
                                        ORDER LOCK <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </h6>
                                    <div className="input-bx mb-2">
                                        <h6>Order lock</h6>
                                        {restaurantSettings.OrderLock === 1 && (
                                            <span className="form-group" style={{ marginLeft: "600px", marginBottom: "0px" }}>
                                                <select
                                                    id="OrderUnLockValue"
                                                    data-id="0"
                                                    value={restaurantSettings.OrderUnlockValue}
                                                    onChange={(e) => UpdateTableQRWorkflowSetting("OrderUnlockValue", e.target.value)}
                                                >
                                                    <option value="1">Manager Password Required</option>
                                                </select>
                                            </span>)}
                                        <span className="mt-1">
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input
                                                        type="checkbox"
                                                        id="OrderLock"
                                                        data-id="0"
                                                        checked={restaurantSettings.OrderLock === 1}
                                                        onChange={(e) => UpdateTableQRWorkflowSetting("OrderLock", e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="input-bx">
                                        <h6>Lock Behavior When Issuing Bill </h6> <span>
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input type="checkbox" id="LockBehaviorWhenIssueingBill" data-id="0" checked={restaurantSettings.LockBehaviorWhenIssueingBill === 1} onChange={(e) => UpdateTableQRWorkflowSetting("LockBehaviorWhenIssueingBill", e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                        </span>
                                    </div>
                                    <div className="input-bx">
                                        <h6>Lock Order When Placing Order</h6>
                                        <span className="mt-1">
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input type="checkbox" id="LockOrderWhenPlacingOrder" data-id="0" checked={restaurantSettings.LockOrderWhenPlacingOrder === 1} onChange={(e) => UpdateTableQRWorkflowSetting("LockOrderWhenPlacingOrder", e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="input-bx">
                                        <h6>Lock Order When Order Is In Pending</h6>
                                        <span className="mt-1">
                                            <div className="toggle-bx text-center">
                                                <label className="switch mb-0">
                                                    <input type="checkbox" id="OrderIsInPending_LockOrder" data-id="0" checked={restaurantSettings.OrderIsInPending_LockOrder === 1} onChange={(e) => UpdateTableQRWorkflowSetting("OrderIsInPending_LockOrder", e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </span>
                                    </div>
                                    <br />
                                    <div className="table-input text-left mb-3">
                                        <h6 className="font-weight-bold">
                                            SET PRODUCT VIEW TYPE<i className="fa fa-question-circle" aria-hidden="true"></i>
                                        </h6>
                                        <div className="input-bx">
                                            <h6>PRODUCT VIEW</h6>
                                            <span className="mt-1">
                                                <span className="form-group">
                                                    <select
                                                        id="SetProductViewType_Table"
                                                        data-id="0"
                                                        value={restaurantSettings.SetProductViewType}
                                                        onChange={(e) => UpdateTableQRWorkflowSetting("SetProductViewType", e.target.value)}
                                                    >
                                                        <option value="1">Grid View</option>
                                                        <option value="2">List View</option>
                                                    </select>
                                                </span>
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableQR;
