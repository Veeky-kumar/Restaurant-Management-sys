import React, { useState, useEffect } from 'react';
import DiscountSettingModal from "./SoftwareSettingModals/DiscountSettingModal";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

interface DiscountSettingData {
  id: number;
  DiscountTypeDataId: string;
  AlternateDiscountName: string;
  DiscountValue: number;
  MaxDiscountValue: number;
  DiscountValueTypeId: number;
}
interface DiscountTypeData {
  Id: number;
  Name: string;
  AlternateDiscountName: string;
  DiscountTypeId: number;
  DiscountSettingData: any | null;
}

interface DiscountData {
  Id: number,
  Name: string,
  DiscountTypeData: DiscountTypeData[]
}

const DiscountSetting: React.FC = () => {
  const [discountItems, setDiscountItems] = useState<Array<DiscountSettingData | null>>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [DiscountSetting, setDisountSetting] = useState<DiscountData[]>([])
  // const [subDiscountItems, setSubDiscountItems] = useState<Array<DiscountSettingData | null>>([]);
  const [error, setError] = useState<string | null>(null);


  const UserToken_Global = localStorage.getItem("authToken");
  const RestaurantLoginId_Global = 0;

  // Fetching discount items from the API
  const getItemData = async (Id: number) => {
    if (!UserToken_Global) {
      setError('Authorization token is missing.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/get/discount/setting/data?restaurantLoginId=${RestaurantLoginId_Global}&discountTypeDataId=${Id}`, {
        headers: {
          "Authorization": `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const discountSetting = response.data.data.discountSetting;
        setDiscountItems(discountSetting);
        setIsOpen(true);
      } else {
        setError(response.data.message);
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        }
      }
    }
  };

  const fetchSubDiscountItems = async () => {
    if (!UserToken_Global) {
      setError('Authorization token is missing.');
      return;
    }
    try {
      // setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get/discount/type/data/list?restaurantLoginId=0`, {
        headers: {
          "Authorization": `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 1) {
        const discountSetting = Array.isArray(response.data.data.lstDiscountData)
          ? response.data.data.lstDiscountData
          : [response.data.data.lstDiscountData];

        setDisountSetting(discountSetting)
        // setSubDiscountItems(discountSetting);

      } else {
        setError(response.data.message);
        toast.error(response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Unauthorized! Invalid Token!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } else {
            toast.error('There is some technical error, please try again!', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        }
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubDiscountItems();
  }, [loading])

  return (
    <>
      <div
        className=""
        id="v-pills-discount"
        role=""
        aria-labelledby="v-pills-discount-tab"
      >
        {loading && (<div
          className="LoaderDiv_DashboardRestaurantCommonClass"
          style={{
            opacity: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2147483647,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 999999999999999,
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="../../Content/Images/Loader.gif"
              style={{ backgroundColor: "#ffffff", width: "50px" }}
              alt="Loading..."
            />
          </div>
        </div>)}
        {DiscountSetting.map((item) => (
          <div className="tab-set mb-3" data-id="1">
          <div className="discount-list">
              <h4> {item.Name}  </h4>
            <ul>
                {item.DiscountTypeData?.map((item: any) => (
                  <li className="flex space-x-2" key={item.Id} onClick={() => getItemData(item.Id)}>
                    {item.DiscountTypeId === 1 && (<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                      <g id="Group_16767" data-name="Group 16767" transform="translate(9969 -3953)">
                        <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9969 3953)" fill="none" />
                        <g id="Search_results_for_Discount_-_Flaticon-12_1_" data-name="Search results for Discount - Flaticon-12 (1)" transform="translate(-9978.55 3949.19)">
                          <path id="_1" data-name="1" d="M51.493,22.031a2.557,2.557,0,0,0-2.557-2.557H44.449l-7.767-7.245a2.406,2.406,0,1,0-4.355,0l-7.749,7.241H20.107a2.557,2.557,0,0,0-2.557,2.557V41.785a2.557,2.557,0,0,0,2.557,2.557H36.726a.654.654,0,0,1,.643.555l.365,2.415a2.09,2.09,0,0,0,1.443,1.71,2.229,2.229,0,0,0,.65.1,2.1,2.1,0,0,0,1.52-.654l3.745-3.924a.647.647,0,0,1,.468-.2h3.376a2.557,2.557,0,0,0,2.557-2.557ZM33.34,13.3a2.325,2.325,0,0,0,2.353.018l6.616,6.156H26.724ZM49.714,42.567a1.1,1.1,0,0,1-.782.325H45.556a2.115,2.115,0,0,0-1.538.654l-3.734,3.927a.636.636,0,0,1-.665.172.643.643,0,0,1-.446-.526L38.827,44.7a2.123,2.123,0,0,0-2.09-1.827H20.118a1.1,1.1,0,0,1-1.1-1.1V22.028a1.1,1.1,0,0,1,1.1-1.1H48.932a1.11,1.11,0,0,1,1.107,1.107V41.8a1.1,1.1,0,0,1-.325.771ZM40,31.559a2.4,2.4,0,1,0-2.09,1.231A2.422,2.422,0,0,0,40,31.559Zm-1.268-.731A.959.959,0,1,1,37.64,29.44a.994.994,0,0,1,.252-.033.957.957,0,0,1,.829,1.432Zm8.289,1.962a1.706,1.706,0,1,1-.011,0Zm-.365,2.557a.957.957,0,1,1-1.1-1.4.994.994,0,0,1,.252-.033.957.957,0,0,1,.829,1.432Zm-1.713-6.653L40.022,37.28l-1.268-.731,4.921-8.582ZM30.9,27.215h-.731v-.34a3.03,3.03,0,0,0-6.061.007v.34h-.731a1.827,1.827,0,0,0-1.827,1.662l-.8,8.739a1.827,1.827,0,0,0,1.827,1.991h9.133a1.827,1.827,0,0,0,1.827-1.991l-.818-8.75A1.827,1.827,0,0,0,30.9,27.215Zm-3.77-1.9A1.567,1.567,0,0,1,28.7,26.883v.34H25.569v-.34a1.564,1.564,0,0,1,1.564-1.564ZM23,29.009a.365.365,0,0,1,.365-.332H24.1v1.892h1.461V28.677h3.127v1.892h1.461V28.677h.731a.365.365,0,0,1,.365.329l.5,5.5H22.5Zm8.962,9.024a.365.365,0,0,1-.27.117H22.559a.346.346,0,0,1-.351-.409l.161-1.783H31.9l.164,1.783A.365.365,0,0,1,31.962,38.033Z" fill="#352a90" />
                        </g>
                      </g>
                    </svg>)}
                    {item.DiscountTypeId === 2 && (<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                      <g id="sb_total_discount" data-name="sb total discount" transform="translate(9832 -4110)">
                        <rect id="Rectangle_18681" data-name="Rectangle 18681" width="50" height="50" transform="translate(-9832 4110)" fill="none" />
                        <g id="Search_results_for_Discount_-_Flaticon-12" data-name="Search results for Discount - Flaticon-12" transform="translate(-9826.001 4115.654)">
                          <path id="Path_64942" data-name="Path 64942" d="M115.3,16.938v.025a4.165,4.165,0,0,0,2.377,3.974l.016.008a2.8,2.8,0,0,1,1.268,1.22l.006.012a4.352,4.352,0,0,0,4.091,2.283h.026a2.979,2.979,0,0,1,1.761.458,4.465,4.465,0,0,0,4.735,0,2.979,2.979,0,0,1,1.761-.458h.026a4.355,4.355,0,0,0,4.092-2.285l0-.008a2.806,2.806,0,0,1,1.272-1.222l.013-.006a4.166,4.166,0,0,0,2.377-3.974v-.023a2.665,2.665,0,0,1,.464-1.652,4.1,4.1,0,0,0,0-4.634A2.665,2.665,0,0,1,139.122,9V8.977A4.165,4.165,0,0,0,136.744,5L136.73,5a2.8,2.8,0,0,1-1.267-1.216l-.008-.016a4.356,4.356,0,0,0-4.09-2.283h-.026a2.977,2.977,0,0,1-1.76-.458h0a4.465,4.465,0,0,0-4.735,0,2.981,2.981,0,0,1-1.761.458h-.026a4.353,4.353,0,0,0-4.09,2.282l-.006.011A2.8,2.8,0,0,1,117.691,5L117.676,5A4.165,4.165,0,0,0,115.3,8.977V9a2.663,2.663,0,0,1-.464,1.651,4.1,4.1,0,0,0,0,4.635,2.663,2.663,0,0,1,.463,1.651Zm.719-5.47a4.108,4.108,0,0,0,.716-2.549V8.894A2.732,2.732,0,0,1,118.3,6.3l.012-.006a4.231,4.231,0,0,0,1.916-1.845l.007-.013a2.914,2.914,0,0,1,2.742-1.516h.025a4.4,4.4,0,0,0,2.6-.677,3.02,3.02,0,0,1,3.2,0,4.412,4.412,0,0,0,2.6.677h.025a2.909,2.909,0,0,1,2.741,1.513l.009.018a4.23,4.23,0,0,0,1.915,1.842l.012.006a2.732,2.732,0,0,1,1.571,2.6V8.92a4.107,4.107,0,0,0,.716,2.548,2.654,2.654,0,0,1,0,3,4.112,4.112,0,0,0-.715,2.549v.024a2.733,2.733,0,0,1-1.571,2.6l-.011,0a4.236,4.236,0,0,0-1.918,1.848l-.005.011a2.912,2.912,0,0,1-2.742,1.516h-.025a4.41,4.41,0,0,0-2.6.677,3.02,3.02,0,0,1-3.2,0,4.4,4.4,0,0,0-2.361-.684q-.122,0-.244.007h-.025a2.91,2.91,0,0,1-2.743-1.517l-.007-.014a4.226,4.226,0,0,0-1.913-1.842l-.013-.007a2.731,2.731,0,0,1-1.571-2.6v-.026a4.111,4.111,0,0,0-.716-2.548,2.654,2.654,0,0,1,0-3Zm0,0" transform="translate(-103.868 0)" fill="#352a90" />
                          <path id="Path_64943" data-name="Path 64943" d="M18.707,71.957a.718.718,0,0,0,.99-.229l8.512-13.636a.719.719,0,1,0-1.219-.761L18.478,70.967a.718.718,0,0,0,.229.99Zm.763-7.393a3.65,3.65,0,0,0,0-7.237,3.65,3.65,0,0,0,0,7.237Zm0-5.8a2.238,2.238,0,0,1,0,4.363,2.239,2.239,0,0,1,0-4.363Zm4.574,9.348a3.421,3.421,0,0,0,3.173,3.618,3.65,3.65,0,0,0,0-7.237,3.421,3.421,0,0,0-3.173,3.618Zm4.909,0a2,2,0,0,1-1.736,2.181,2.238,2.238,0,0,1,0-4.362,2,2,0,0,1,1.736,2.181ZM38.5,80.044a3.629,3.629,0,0,0-4.793-1.461l-5.629,2.66a4.585,4.585,0,0,0-3.909-2.411l-5.2-.143a5.493,5.493,0,0,1-2.362-.61l-.529-.274a9.326,9.326,0,0,0-8.638.009l.033-1.2a.719.719,0,0,0-.7-.738l-5.7-.157a.718.718,0,0,0-.738.7L0,88.923a.719.719,0,0,0,.7.738l5.7.157h.02a.719.719,0,0,0,.718-.7l.016-.6,1.48-.793a2.54,2.54,0,0,1,1.9-.207L19.366,90l.047.012a9.464,9.464,0,0,0,1.943.2,9.587,9.587,0,0,0,4-.874.712.712,0,0,0,.089-.049L38.266,81a.718.718,0,0,0,.235-.957Zm-37.044,8.2.3-11.067,4.261.117L5.719,88.362Zm23.256-.188a8.144,8.144,0,0,1-4.982.556l-8.815-2.474a3.972,3.972,0,0,0-2.962.324l-.756.4.2-7.358a7.9,7.9,0,0,1,8.024-.428l.529.274a6.936,6.936,0,0,0,2.983.771l5.2.143a3.151,3.151,0,0,1,3,2.511l-7.74-.213A.719.719,0,0,0,19.348,84l8.541.235h.02a.719.719,0,0,0,.718-.7,4.585,4.585,0,0,0-.07-.932l5.772-2.728.017-.008a2.195,2.195,0,0,1,2.483.347Zm0,0" transform="translate(0 -51.559)" fill="#352a90" />
                        </g>
                      </g>
                    </svg>)}

                <span
                  style={{ cursor: "pointer" }}
                      id={`discountName${item.Id}`}
                  className="get_discountSettingBtn"
                      data-id={item?.Id}
                      data-name={item?.AlternateDiscountName}
                      onClick={() => setIsOpen(true)}
                >
                      {item?.AlternateDiscountName}
                </span>
                <button
                  type="button"
                  className="btn tootipCustomClass"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title=""
                  data-bs-original-title="CLICK ON DISCOUNT-NAME TO UPDATE IT'S SETTING"
                  aria-describedby="tooltip648115"
                >
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                </button>
              </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {isOpen &&
        <DiscountSettingModal
        discountSettingItem={discountItems}
        setIsOpen={setIsOpen}
        setLoading={setLoading}
        />
      }
      {/* <AddPromocodeModal /> */}
    </>
  );
};

export default DiscountSetting;
