import { useEffect, useState } from "react";
import TimelineItem from "./ModifierSetup/TimelineItem";
import axios from "axios";
import AddModifierModal from "./ModifierSetup/AddModifierModal";
import ImportModifiersModal from "./Models/ImportModifiersModal";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

interface ModifiersComponentProps {
  selectedProductId: number;
}

interface Modifier {
  Id: number;
  ProductId: number;
  ModifierName: string;
  MinSelection: number;
  MaxSelection: number;
  IsMandatory: number;
  Status: number;
  CreatedOn: string;
  CreatedByLoginId: number;
  UpdatedOn: string;
  UpdatedByLoginId: number;
  IsDeleted: number;
  DeletedOn: string;
  OptionsList: any[];
}

interface product {
  Id: number;
  Name: string;
}

const ModifierSetup: React.FC<ModifiersComponentProps> = ({ selectedProductId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModifierFormModalOpen, setIsModifierFormModalOpen] = useState(false);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [searchParams] = useSearchParams();
  const [importList, setImportList] = useState<product[]>([]);
  const UserToken_Global = localStorage.getItem("authToken")


  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); 
  };

  // Function to open the modal
  const handleOpenModal = () => {
    if (productId !== "0") {
      setIsModifierFormModalOpen(true);
    } else {
      alert("Please select a product");
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModifierFormModalOpen(false);
  };


  const getProductById = async (productId: string) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/single/product?Id=${productId}&restaurantLoginId=0`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 1) {
        const modifiersList = response.data.data.products[0]?.ModifiersList || [];
        setModifiers(modifiersList);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const getImportModifiers = async (Id: string) => {

    const apiUrl = `${import.meta.env.VITE_API_URL}api/get/products/havingmodifiers?restaurantLoginId=0&productId=${Id}`

    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${UserToken_Global}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 && response.data.status === 1) {
        const data = response.data.data.productsList;
        const filteredData = data.map((item: any) => {
          console.log(item.Id);
          return {
            Id: item.Id,
            Name: item.Name,
          };
        });
        setImportList(filteredData);
        setIsModalOpen(true);
      }
      else {
        Toast.fire({
          icon: 'error',
          title: response.data.message,
        });
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {

        if (error.response) {

          if (error.response.status === 401) {
            Toast.fire({
              icon: 'error',
              title: 'Unauthorized! Invalid Token!',

            });
          } else {
            Toast.fire({
              icon: 'error',
              title: 'There is some technical error, please try again!',

            });
          }
        } else if (error.request) {
          Toast.fire({
            icon: 'error',
            title: 'No response from server. Please check your network connection!',

          });
        } else {
          Toast.fire({
            icon: 'error',
            title: `Error: ${error.message}`,

          });
        }
      } else {
        Toast.fire({
          icon: 'error',
          title: 'An unexpected error occurred. Please try again!',

        });
      }
    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const productIdFromQuery = searchParams.get("productId");
    if (productIdFromQuery && productIdFromQuery !== "0") {
      setProductId(productIdFromQuery);
      getProductById(productIdFromQuery);
    }
  }, [searchParams, loading]);




  return (

    // <div id="ModifierSetup_tab" className="tab-pane fade">
    <div
      className="product_main-wrap"
      style={{ paddingTop: "12px", minHeight: "400px" }}
    >
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
      <div>
        {/* Import Modifiers Button */}
        <div className="row">
          <div className="col-sm-12">
            <button
              id="btn_ImportModifiersShow_AddUpdateProduct"
              className="float-end btn text-white hover:!text-white !bg-[#66bd50]  btn-sm"
              onClick={() => getImportModifiers(productId)} // Opens the modal
            >
              Import Modifiers from another Product
            </button>
          </div>
          {/* Pass state and function as props to the modal */}
          <ImportModifiersModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            importList={importList}
            productId={productId}
            setLoading={setLoading}
          />
        </div>
      </div>

      <div
        className="wrap-product_main !px-2 sm:!px-6"
        style={{ marginTop: "12px", paddingTop: "10px", paddingBottom: "0px" }}
      >
        <ul id="ModifierOptionsData_ModifierSetup" className=" timeline">
          {modifiers.map((item, index) => (
            <TimelineItem
              key={index}
              name={item.ModifierName}
              min={item.MinSelection}
              max={item.MaxSelection}
              Id={item.Id}
              Optionlist={item.OptionsList}
              productId={productId}
              setLoading={setLoading}
            />
          ))}
          <li className="  timeline-inverted">
            <div className="z-2 xl:translate-x-2 sm:translate-y-2 timeline-badge">12</div>
            <div className="timeline-panel">
              <div className="timeline-heading pl-4 w-full ">
                <div className="faq">
                  <div className="faq__grid__faqs">
                    <summary
                      className="faq__grid__faqs__faq__button"
                      data-category="faq"
                      data-label="¿Cuánto tiempo dura la sesión?"
                      onClick={handleOpenModal}
                      // style={{height:"50px"}}
                    >
                      <div className="p-2.5 faq__grid__faqs__faq__button__content">
                        <div className="heading_text-wraps">
                          <div className="title_faq_wrap">
                            <div className="head_title">Add Modifier</div>
                          </div>
                        </div>
                      </div>
                    </summary>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {/* Trigger the modal when state is set to true */}
          {isModifierFormModalOpen && (
            <AddModifierModal
              onClose={handleCloseModal}
              productId={selectedProductId}
              setLoading={setLoading}
              mode={1}
              modifiedProductId={0}
            />
          )}
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default ModifierSetup;
