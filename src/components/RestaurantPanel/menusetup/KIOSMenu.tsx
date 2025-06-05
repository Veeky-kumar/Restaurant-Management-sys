import React from "react";

const KIOSMenu: React.FC = () => {
  return (
    <>
      <div className="row flex flex-col sm:flex-row">
        <div className="col-2" style={{ float: "inline-start" }}>
          <a
            className="btn  multi-save d-none"
            onClick=" ShowingModelAutoDepartmentsListKMS();"
          >
            add department
          </a>
        </div>
        <div className="col-8 !w-fit m-3">
          <div className="kiosk-menu-setup">
            <div className="kiosk-head">
              <div className="row align-items-center">
                <div className="col-2 col-md-2">
                  <svg
                    className=""
                    id=""
                    data-name="Group 12350"
                    xmlns="http://www.w3.org/2000/svg"
                    width="82.07"
                    height="33.593"
                    viewBox="0 0 82.07 33.593"
                  >
                    <path
                      id="Path_12821"
                      data-name="Path 12821"
                      d="M-395.568,243.306q-6.4,0-12.792,0c-1.583,0-1.583-.007-1.579-1.557,0-.292.007-.583.007-.875,0-.5.272-.721.752-.726.328,0,.656-.01.984-.01h22.412a13.021,13.021,0,0,0,1.311-.024,1.377,1.377,0,0,0,1.417-1.578c-.011-1.013-.349-1.306-1.543-1.307q-11.206,0-22.412,0c-.692,0-1.385-.01-2.077-.011-.585,0-.857-.277-.854-.873.014-2.751-.3-2.548,2.385-2.549q11.425,0,22.849,0c1.337,0,1.555-.232,1.509-1.506-.039-1.079-.213-1.234-1.691-1.236q-11.1-.016-22.193-.007h-.547c-2.417,0-2.419-.029-2.322-2.454a1.067,1.067,0,0,1,1.019-1.173,10.225,10.225,0,0,1,1.413-.107c6.341-.006,12.682-.017,19.023.005,1.783.006,3.566.093,5.347.183a3.679,3.679,0,0,1,3.753,3.861,5.009,5.009,0,0,1-.8,3.542c-.145.182,0,.74.184,1.012.852,1.276.935,4.693.108,5.973a2.924,2.924,0,0,1-2.65,1.427C-386.9,243.3-391.232,243.306-395.568,243.306Z"
                      transform="translate(409.982 -209.753)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12822"
                      data-name="Path 12822"
                      d="M-379.392,151.636a4.329,4.329,0,0,0-4.242-4.487c-.543-.046-1.089-.079-1.634-.072q-10.267.085-20.532.186a3.942,3.942,0,0,0-4.139,4.176c0,2.26.151,4.53-.026,6.775-.219,2.811,2.524,4.869,4.823,4.784,3.491-.133,6.993-.035,10.491-.037s7,0,10.493,0a4.64,4.64,0,0,0,4.766-4.655Q-379.331,154.969-379.392,151.636Zm-5.3,7.733c-2.4.015-4.8.013-7.2.009q-1.48,0-2.962,0-1.431,0-2.861,0c-2.286,0-4.574,0-6.862-.007-1.549-.007-1.958-.411-1.977-1.932q-.033-2.458,0-4.917a1.977,1.977,0,0,1,2.227-2.222q9.614-.016,19.228,0a1.852,1.852,0,0,1,2.133,2.041q.062,2.674.048,5.353C-382.916,158.913-383.369,159.357-384.69,159.368Z"
                      transform="translate(409.977 -147.076)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12823"
                      data-name="Path 12823"
                      d="M-149.243,227.958c-6.884.1-13.77.077-20.654.011a4.834,4.834,0,0,0-4.928,4.648c-.055,2.332-.072,4.666.011,6.993a4.342,4.342,0,0,0,4.471,4.244c3.6-.142,7.212-.035,10.819-.037H-148.6a4.1,4.1,0,0,0,4.32-4.3c.018-2.185-.127-4.382.033-6.554A4.9,4.9,0,0,0-149.243,227.958Zm1.553,10.528c-.009,1.551-.6,2.133-2.222,2.142-3.2.02-6.411.007-9.616.007-3.13,0-6.263.007-9.4,0-1.862,0-2.492-.634-2.507-2.5-.011-1.492-.02-2.986.011-4.48.033-1.553.575-2.1,2.139-2.1q9.778-.02,19.556,0c1.59,0,2.012.446,2.028,2.021Q-147.673,236.03-147.689,238.487Z"
                      transform="translate(226.301 -210.265)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12824"
                      data-name="Path 12824"
                      d="M-244.842,237.805a3.232,3.232,0,0,0-2.638-3.3,9.088,9.088,0,0,0-2.052-.241c-2.513-.031-5.029-.009-7.542-.026-1-.009-1.229-.319-1.05-1.282a1.736,1.736,0,0,1,1.757-1.461c2.916-.035,5.83-.028,8.746-.042,2.19-.009,2.262-.09,2.17-2.3-.042-.993-.247-1.245-1.234-1.249-3.31-.02-6.63-.195-9.922.046-3.421.252-4.992,1.485-5.355,4.893a38.4,38.4,0,0,0-.015,6.226,4.625,4.625,0,0,0,4.88,4.659c1.455-.046,2.914-.007,4.373-.007v0c1.6,0,3.207,0,4.81,0A2.808,2.808,0,0,0-245.242,242C-244.562,240.638-244.84,239.208-244.842,237.805Zm-5.141,2.745c-2.041.015-4.091.174-6.125,0-1.39-.119-1.925-.4-1.949-1.046-.055-1.473-.144-2.123,1.363-2.13,1.094,0,2.188,0,3.281,0,1.166,0,2.332-.015,3.5,0,1.2.02,1.435.287,1.433,1.529C-248.482,240.131-248.836,240.542-249.982,240.551Z"
                      transform="translate(294.448 -210.161)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12825"
                      data-name="Path 12825"
                      d="M-179.4,154.556a3.407,3.407,0,0,0-2.931-3.321,17.045,17.045,0,0,0-2.605-.241c-2.26-.033-4.519-.026-6.779,0-.7.007-1.067-.2-1.113-.973-.125-2.113-.151-2.111-2.282-2.1h-.219c-1.113.018-1.194.072-1.207,1.164-.022,1.713-.007,3.426-.007,5.138,0,1.678-.046,3.356.011,5.031.081,2.467,1.087,3.83,3.531,4.235a7.544,7.544,0,0,0,1.192.122c2.588.011,5.176.035,7.763-.013a7.842,7.842,0,0,0,2.242-.4,3.285,3.285,0,0,0,2.4-3.183C-179.329,158.2-179.336,156.376-179.4,154.556Zm-3.631,3.679c-.013,1.63-.155,2.074-1.75,2.216a40.092,40.092,0,0,1-6.621-.077c-1.107-.085-1.382-.617-1.409-1.732-.026-1.164,0-2.33-.007-3.5-.007-.685.322-1,1-.989,1.2.011,2.4,0,3.6,0v0c1.019,0,2.039-.018,3.058,0,1.813.039,2.1.33,2.12,2.109Q-183.02,157.253-183.031,158.236Z"
                      transform="translate(243.246 -147.735)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12826"
                      data-name="Path 12826"
                      d="M-76.714,157.1c0,.619-.014,1.238,0,1.857a1.47,1.47,0,0,0,1.6,1.651c.653.035,1.31.018,1.965.011.53-.005.824.225.827.774,0,.073,0,.145.008.218.112,1.953.044,2.044-1.924,2.017a20.114,20.114,0,0,1-3.364-.194,3.12,3.12,0,0,1-2.758-3.383c-.032-1.6-.011-3.2-.021-4.805-.007-1.145-.057-1.155-1.139-1.236-.42-.031-1.152-.209-1.179-.4a6.914,6.914,0,0,1,.087-2.335c.034-.166.773-.275,1.18-.258.824.035,1.068-.313,1.069-1.1,0-1.975.033-1.975,1.978-1.977,1.643,0,1.643,0,1.662,1.718.014,1.311.037,1.334,1.356,1.341.619,0,1.238.02,1.857,0,.84-.024,1.2.393,1.171,1.2-.007.218.007.437,0,.655-.044,1.029-.173,1.153-1.256,1.169-.692.01-1.385.031-2.075-.005-.74-.04-1.084.244-1.048,1.007C-76.689,155.714-76.714,156.407-76.714,157.1Z"
                      transform="translate(154.338 -147.747)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12827"
                      data-name="Path 12827"
                      d="M-258.154,170.235c0,1.092-.02,2.185.007,3.276.019.79-.332,1.119-1.11,1.118-2.51,0-2.6.161-2.556-2.346.035-2.031-.029-4.063.019-6.093.055-2.356,1.175-3.773,3.481-3.974,2.637-.23,5.3-.164,7.953-.21.619-.011.922.355.94.965q0,.164.01.327c.051,1.663-.1,1.836-1.741,1.852-1.711.016-3.422-.013-5.132.031-1.335.034-1.826.557-1.856,1.887-.023,1.055,0,2.111,0,3.167Z"
                      transform="translate(294.23 -158.74)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12828"
                      data-name="Path 12828"
                      d="M-105.8,172.6c0,1.525.05,3.053-.016,4.575-.052,1.2-.2,1.276-1.383,1.3h-.218c-1.96.013-2.093-.115-2.094-2.1,0-2.579,0-5.158.013-7.737.009-1.495.227-1.7,1.7-1.706h.218c1.737,0,1.827.092,1.827,1.852V172.6Z"
                      transform="translate(175.238 -162.594)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12829"
                      data-name="Path 12829"
                      d="M-105.785,148.792c-.009,1.532-.369,1.869-1.985,1.856-1.427-.011-1.8-.421-1.785-1.966.013-1.4.31-1.6,2.294-1.584C-105.977,147.111-105.776,147.342-105.785,148.792Z"
                      transform="translate(175.272 -147.092)"
                      fill="#5650BD"
                    ></path>
                    <path
                      id="Path_12830"
                      data-name="Path 12830"
                      d="M-348.077,203.3h-2.962l-2.861,0q1.431,0,2.861,0Q-349.556,203.3-348.077,203.3Z"
                      transform="translate(366.168 -191.001)"
                      fill="#5650BD"
                    ></path>
                  </svg>
                </div>
                <div className="col-10 col-md-10 text-center pl-0">
                  <h3 className="text-white">Dine In</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 pr-0">
                <div className="main-scroller-cete">
                  <div
                    className="nav flex-column nav-pills add-cetelog text-center ui-sortable"
                    id="LeftSideBindSubDepartmentList_KIOSKMenuSeup"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup active ui-sortable-handle"
                      data-id="2"
                      id="Item_2_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(2,1);">
                        <img
                          src="http://localhost:61743/../Content/ImageUploads/SubDepartmentImages/bb2_4be33df593ae463abca5e337d4e954fc.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Fast Food</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(2,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="3"
                      id="Item_3_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(3,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Veg Food</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(3,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="4"
                      id="Item_4_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(4,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/frychicken_2f193282652b463b992d73de7c89d866.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>22 Banana Shake</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(4,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="5"
                      id="Item_5_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(5,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_47fcf63f50e640c7a01a37b179c76567.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>testing juice resp this is</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(5,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="6"
                      id="Item_6_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(6,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_6d0cf40223574c978c8ce32620fa8ca8.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Banana Shake 2299900</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(6,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="7"
                      id="Item_7_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(7,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Suger Free Juice</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(7,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="8"
                      id="Item_8_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(8,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Special Juices</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(8,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="9"
                      id="Item_9_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(9,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Rolls &amp; Champs</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(9,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="10"
                      id="Item_10_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(10,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(10,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="11"
                      id="Item_11_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(11,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 3</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(11,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="12"
                      id="Item_12_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(12,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 22</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(12,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="13"
                      id="Item_13_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(13,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>gggg</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(13,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="14"
                      id="Item_14_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(14,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>kkkk 222</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(14,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="15"
                      id="Item_15_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(15,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sssss</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(15,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="16"
                      id="Item_16_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(16,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>veg food 22222</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(16,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="17"
                      id="Item_17_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(17,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>HI Veg food</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(17,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="18"
                      id="Item_18_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(18,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(18,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="19"
                      id="Item_19_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(19,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>M1 Sub 2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(19,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="20"
                      id="Item_20_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(20,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>subb</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(20,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="21"
                      id="Item_21_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(21,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/vv_50977c72f1534aef97b81eb47a1a8a64.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>New Sub 1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(21,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="22"
                      id="Item_22_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(22,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/darkcake2_ef2900c2a2814a9e86ca3167dc3b8c42.png"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Testing new respices testing this rep</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(22,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="23"
                      id="Item_23_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(23,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/juice-image_6004bd0b00e94e2fae0ca52e49db65c6.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub Dept</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(23,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="24"
                      id="Item_24_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(24,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Desserts 24444</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(24,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="25"
                      id="Item_25_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(25,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/FinancialGraph_Yearly_b3ffbc13a3e24f3c912c5826c595f11a.PNG"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Veg Food</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(25,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="26"
                      id="Item_26_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(26,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Special Juices T</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(26,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="27"
                      id="Item_27_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(27,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Special Juices T2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(27,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="28"
                      id="Item_28_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(28,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>v1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(28,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="29"
                      id="Item_29_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(29,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>j2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(29,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="30"
                      id="Item_30_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(30,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sub-1-101</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(30,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="31"
                      id="Item_31_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(31,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sub-1-102</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(31,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="32"
                      id="Item_32_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(32,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>S-1-102</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(32,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="33"
                      id="Item_33_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(33,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub-3-102</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(33,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="34"
                      id="Item_34_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(34,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sub-4-102</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(34,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="35"
                      id="Item_35_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(35,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Desserts 222</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(35,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="36"
                      id="Item_36_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(36,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub Test</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(36,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="37"
                      id="Item_37_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(37,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_183065986fad4712838e03cb28f2868f.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 880</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(37,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="38"
                      id="Item_38_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(38,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/darkcake2_192a3e15946d4958bac9f9421adc1a22.png"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Chiken champ</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(38,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="39"
                      id="Item_39_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(39,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/juice-image_74810fe53df14f0ab310ed35f948808e.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>VVV</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(39,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="41"
                      id="Item_41_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(41,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/juice-image_a1e4ecc39d0a41feadf52f5d6a519f78.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Mango Juice Special</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(41,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="42"
                      id="Item_42_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(42,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_38eccffa0c354606b49967506f79860e.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 1000</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(42,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="43"
                      id="Item_43_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(43,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_0ef681a2535c42b0bc07f67751b118fa.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Dept 1111</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(43,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="44"
                      id="Item_44_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(44,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_017ee10caa2f439685300ac185cb17a2.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>asdfa</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(44,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="45"
                      id="Item_45_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(45,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/bb2_c7fff4a9d02d404baeb713c7c2185475.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>New Dept 20001 22222</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(45,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="46"
                      id="Item_46_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(46,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/darkcake2_40b0779b07b7474a8ea71e34f3208b98.png"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Dept VV</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(46,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="49"
                      id="Item_49_2"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(49,2);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/CustomCategoryImages/3a863e639a7d.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>cccc1111</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          title="Edit Category"
                          onClick="EditCustomCategory_KIOSKMenuSetup(49);"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash"
                          title="Delete Category"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(49,2);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="47"
                      id="Item_47_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(47,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/mixJuice_defaad50f11e4769ad0e332472850efb.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Coffee</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(47,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="50"
                      id="Item_50_2"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(50,2);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/CustomCategoryImages/1761a701c190.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>c22222</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          title="Edit Category"
                          onClick="EditCustomCategory_KIOSKMenuSetup(50);"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash"
                          title="Delete Category"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(50,2);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="51"
                      id="Item_51_2"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(51,2);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/CustomCategoryImages/86e2e02bfade.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>c3333 44 55</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          title="Edit Category"
                          onClick="EditCustomCategory_KIOSKMenuSetup(51);"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash"
                          title="Delete Category"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(51,2);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="53"
                      id="Item_53_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(53,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sweets</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(53,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="55"
                      id="Item_55_2"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(55,2);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/CustomCategoryImages/f0398715b3b4.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>cccccc</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          title="Edit Category"
                          onClick="EditCustomCategory_KIOSKMenuSetup(55);"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash"
                          title="Delete Category"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(55,2);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="74"
                      id="Item_74_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(74,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sb</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(74,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="75"
                      id="Item_75_2"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(75,2);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/CustomCategoryImages/24fecc132ed1.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>c new 2k1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          title="Edit Category"
                          onClick="EditCustomCategory_KIOSKMenuSetup(75);"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash"
                          title="Delete Category"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(75,2);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="76"
                      id="Item_76_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(76,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Test VG</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(76,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="77"
                      id="Item_77_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(77,1);">
                        <img
                          src="http://localhost:61743./Content/ImageUploads/SubDepartmentImages/subdepartmentImage_1714559537495_db453711dbb34464998a1c7daeb92e33.png"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sss testing</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(77,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="78"
                      id="Item_78_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(78,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 501-1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(78,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="79"
                      id="Item_79_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(79,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 501-2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(79,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="80"
                      id="Item_80_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(80,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 502-1</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(80,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="81"
                      id="Item_81_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(81,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>Sub 502-2</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(81,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a
                      className="nav-link leftSide_SubDepartmentList_KIOSKMenuSeup ui-sortable-handle"
                      data-id="82"
                      id="Item_82_1"
                      href="javascript:;"
                    >
                      <div onClick="ShowingProductListByDepartment(82,1);">
                        <img
                          src="./Content/Images/no-image.jpg"
                          style={{ marginTop: "17px" }}
                        />
                        <h5>sada</h5>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                          fontSize: "19px",
                          color: "#e45827",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          background: "none",
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          title="Delete Department"
                          onClick="ConfirmDeleteIncludedCategoryItem_KIOSKMenuSetupMenu(82,1);"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>

                  <div className="add-cat-btn ">
                    <button
                      type="button"
                      className="btn add-plus-btn text-white !rounded-full font-bold text-center p-0 "
                      title="Add Custom-Catgeory"
                      data-toggle="modal"
                      data-target="#addCustomcateoryModal"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-10 pl-0">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="show-cetelog">
                      <ul
                        className="px-3 nav nav-pills ui-sortable"
                        id="BindDepartmentListIncludedInCustomCategory"
                        role="tablist"
                        style={{}}
                      >
                        <button
                          className="add-depart w-5"
                          title="Insert Departments"
                          id="ShowingPopup_InsertDepartmentsCustomCategory"
                          onClick="ShowingPopupInsertDepartmentsCustomCategory();"
                        >
                          +
                        </button>
                        <li
                          className="nav-item"
                          style={{ cursor: "pointer" }}
                          onClick="GetProductListIncludedInCustomCategory(378);"
                        >
                          <a
                            className="nav-link includedDepartmentsCommonClass active"
                            id="ProductListIncludedInCustomCategory"
                          >
                            All
                          </a>
                        </li>
                        <li
                          className="nav-item sortableClassDepartment ui-sortable-handle"
                          data-id="81"
                          onClick="GetProductListIncludedDepartmentInCustomCategory(81);"
                        >
                          <a
                            className="nav-link !flex justify-between includedDepartmentsCommonClass"
                            data-id="81"
                            id="IncludedDepartmentsInCustomCatgeory_81"
                            data-toggle="pill"
                            href="#pills-depart1"
                            role="tab"
                            aria-controls="pills-depart1"
                            aria-selected="true"
                            title="दिवाली विशेष"
                          >
                            <div className="px-auto pl-2">

                            दिवाली 
                            </div>
                            <div >
                              <i
                                className="fa fa-pencil"
                                title="Edit Department"
                                onClick="ShowModelChangeDepartmentName(81,378);"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-minus"
                                title="Delete Department"
                                onClick="ConfirmDeleteDepartmentIncludedCCKMS(81);"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </a>
                        </li>
                        <li
                          className="nav-item sortableClassDepartment ui-sortable-handle"
                          data-id="82"
                          onClick="GetProductListIncludedDepartmentInCustomCategory(82);"
                        >
                          <a
                            className="nav-link !flex justify-between includedDepartmentsCommonClass"
                            data-id="82"
                            id="IncludedDepartmentsInCustomCatgeory_82"
                            data-toggle="pill"
                            href="#pills-depart1"
                            role="tab"
                            aria-controls="pills-depart1"
                            aria-selected="true"
                            title="COMBOS"
                          >
                            <div className="px-auto pl-2">

                            COMBOS
                            </div>
                            <div>
                              <i
                                className="fa fa-pencil"
                                title="Edit Department"
                                onClick="ShowModelChangeDepartmentName(82,378);"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-minus"
                                title="Delete Department"
                                onClick="ConfirmDeleteDepartmentIncludedCCKMS(82);"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </a>
                        </li>
                        <li
                          className="nav-item sortableClassDepartment ui-sortable-handle"
                          data-id="83"
                          onClick="GetProductListIncludedDepartmentInCustomCategory(83);"
                        >
                          <a
                            className="nav-link !flex justify-between includedDepartmentsCommonClass"
                            data-id="83"
                            id="IncludedDepartmentsInCustomCatgeory_83"
                            data-toggle="pill"
                            href="#pills-depart1"
                            role="tab"
                            aria-controls="pills-depart1"
                            aria-selected="true"
                            title="All Day Breakfast"
                          >
                            <div className="px-auto pl-2">

                            All Day
                            </div>
                            <div>
                              <i
                                className="fa fa-pencil"
                                title="Edit Department"
                                onClick="ShowModelChangeDepartmentName(83,378);"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-minus"
                                title="Delete Department"
                                onClick="ConfirmDeleteDepartmentIncludedCCKMS(83);"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </a>
                        </li>
                        <li
                          className="nav-item sortableClassDepartment ui-sortable-handle"
                          data-id="84"
                          onClick="GetProductListIncludedDepartmentInCustomCategory(84);"
                        >
                          <a
                            className="nav-link !flex justify-between includedDepartmentsCommonClass"
                            data-id="84"
                            id="IncludedDepartmentsInCustomCatgeory_84"
                            data-toggle="pill"
                            href="#pills-depart1"
                            role="tab"
                            aria-controls="pills-depart1"
                            aria-selected="true"
                            title="Bakery"
                          >
                            <div className="px-auto pl-2">

                            Bakery
                            </div>
                            <div>
                              <i
                                className="fa fa-pencil"
                                title="Edit Department"
                                onClick="ShowModelChangeDepartmentName(84,378);"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-minus"
                                title="Delete Department"
                                onClick="ConfirmDeleteDepartmentIncludedCCKMS(84);"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="pills-depart1"
                          role="tabpanel"
                          aria-labelledby="pills-depart1-tab"
                        >
                          <div className="cat-log-inner">
                            <div
                              className="row pl-[13px] mb-2 ui-sortable"
                              id="BindProductsByDepartmentId_KIOSKMenuSetup"
                            >
                              <div
                                className="col-md-6 products_KIOSKMenuSetup ui-sortable-handle"
                                data-id="94"
                                data-proid="307"
                              >
                                <div className="cat-log-flex">
                                  <div className="cat-log-img">
                                    <img src="./Content/Images/no-image.jpg" />
                                  </div>
                                  <div className="cat-log-text">
                                    <span>
                                      <i
                                        className="fa fa-trash"
                                        title="Delete Products"
                                        onClick="ConfirmDeleteProductDepartmentInKMS(94)"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <h5
                                      style={{ cursor: "pointer" }}
                                      title="Veg Tasty Soya Salad"
                                    >
                                      Veg Tasty Soya ...
                                    </h5>
                                    <h6>testing des</h6>
                                    <p>$139</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row done mb-2 d-none"
                              id="BindAllProductsByCategoryId_KIOSKMenuSetup"
                            ></div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="pills-depart2"
                          role="tabpanel"
                          aria-labelledby="pills-depart2-tab"
                        >
                          ...
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-depart3"
                          role="tabpanel"
                          aria-labelledby="pills-depart3-tab"
                        >
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 m-2 mt-3">
          <a href="/Restaurant/MenuSetup">
            <button type="button" className=" multi-save !text-black">
              Exit
            </button>
          </a>
        </div>
      </div>
      <div
        className="modal fade fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        id="addCustomcateoryModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-top" role="document">
          <div className="modal-content ">
            <div className="modal-header justify-content-center p-2">
              <h5
                className="modal-title"
                id="heading_Title_CustomCatgeoryModal"
              >
                Add Custom Category
              </h5>
            </div>
            <div className="modal-body py-2">
              <div className="form-group row">
                <label
                  htmlFor="txtCustomCategoryName_KIOSKMenuSetup"
                  className="col-sm-4 col-form-label"
                >
                  Category Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="txtCustomCategoryName_KIOSKMenuSetup"
                    placeholder="Enter Category Name"
                  />
                  <div
                    id="customCategoryName_error_KIOSKMenuSetup"
                    className="errorsClass2"
                  ></div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="fileCustomCatgoryImage_KIOSKMenuSetup"
                  className="col-sm-4 col-form-label"
                >
                  Category Image
                </label>
                <div className="col-sm-8">
                  <input
                    type="file"
                    className="form-control"
                    id="fileCustomCatgoryImage_KIOSKMenuSetup"
                    accept="image/*"
                    // onChange={(e) => ShowCustomCategoryImagePreview_KIOSKMenuSetup(e)}
                  />
                  <label style={{ fontWeight: 400, margin: 0 }}>
                    Note: Only .jpg, .jpeg, and .png Formats are allowed.
                  </label>
                  <br />
                  <div
                    id="CustomCategoryImage_error_KIOSKMenuSetup"
                    className="errorsClass2"
                  ></div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img
                    src=""
                    id="imgCustomCatgoryImage_KIOSKMenuSetup"
                    style={{ width: "100px", height: "auto", display: "none" }}
                    alt="Category Preview"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer pt-0 !grid grid-cols-2">
              <button
                type="button"
                className="btn multi-cancel py-1 my-auto"
                data-dismiss="modal"
                // onClick={() => CloseCreateCustomCategoryKIOSKMenuSetup()}
              >
                Cancel
              </button>
              <button
                id="btnSubmit_CustomCategory_KIOSKMenuSetup"
                type="button"
                className="btn multi-save py-1 my-auto"
                // onClick={() => AddUpdateCustomCategoryKioskMenuSetup(1)}
              >
                Add
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KIOSMenu;
