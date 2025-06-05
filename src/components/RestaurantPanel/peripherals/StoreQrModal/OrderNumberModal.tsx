import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface OrderNumberModalProps {
  onClose: () => void;
  onSave: (MinOrderNumber: string, MaxOrderNumber: string) => void;
}

const OrderNumberModal: React.FC<OrderNumberModalProps> = ({ onClose, onSave }) => {
  const UserToken_Global = localStorage.getItem('authToken');
  const [MinOrderNumber, setMinOrderNumber] = useState('');
  const [MaxOrderNumber, setMaxOrderNumber] = useState('');
  const [errors, setErrors] = useState<{ MinOrderNumber?: string; MaxOrderNumber?: string }>({});
  const [data, setData] = useState<any>({});

  // Fetch Workflow Settings
  const fetchWorkflowSettings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/get/all/wokflow/setting/data/lists?restaurantLoginId=${0}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data.data._list);
    } catch (error) {
      console.error('Error fetching workflow settings:', error);
    }
  };

  useEffect(() => {
    const fetchOrderNumbers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/Get/Workflowsetting/minandmaxorder?restaurantLoginId=0`,
          {
            headers: {
              Authorization: `Bearer ${UserToken_Global}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const { MinOrderNumber, MaxOrderNumber } = response.data.data;
        setData(response.data.data);
        setMinOrderNumber(MinOrderNumber || '');
        setMaxOrderNumber(MaxOrderNumber || '');
      } catch (error) {
        console.error('Error fetching order numbers:', error);
      }
    };

    fetchOrderNumbers();
    fetchWorkflowSettings();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    const newErrors: { MinOrderNumber?: string; MaxOrderNumber?: string } = {};

    // Validation checks
    if (!MinOrderNumber) newErrors.MinOrderNumber = 'Min order number is required';
    if (!MaxOrderNumber) newErrors.MaxOrderNumber = 'Max order number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update the data state with MinOrderNumber and MaxOrderNumber
    const updatedData = { ...data, MinOrderNumber, MaxOrderNumber };
    updatedData.LogoImage = updatedData.LogoImage === null ? '' : updatedData.LogoImage;

    console.log('Updated Data:', updatedData);

    // Save order numbers
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/restaurant/update/workflow/setting/status`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${UserToken_Global}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // On successful save
      onSave(MinOrderNumber, MaxOrderNumber);
      onClose(); // Close modal after saving
    } catch (error) {
      console.error('Error saving order numbers:', error);
    }
  };

  return (
    <div
      className="modal fade add-pay-modal show"
      id="ShowOrderNumberModal_WorkFlowSetting"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style={{ paddingRight: '17px', display: 'block' }}
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ height: '334px' }}>
          <div className="modal-header">
            <h5 className="modal-title" id="heading_Title_OrderNumberStartModal">
              Add Order Number
            </h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="textMinOrderNumber_WorkFlowSetting">From:</label>
                <input
                  type="text"
                  className="form-control IsNumeric"
                  id="textMinOrderNumber_WorkFlowSetting"
                  placeholder="0"
                  value={MinOrderNumber}
                  onChange={(e) => handleInputChange(e, setMinOrderNumber)}
                />
                {errors.MinOrderNumber && <div className="errorsClass2">{errors.MinOrderNumber}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="textMaxOrderNumber_WorkFlowSetting">To:</label>
                <input
                  type="text"
                  className="form-control IsNumeric"
                  id="textMaxOrderNumber_WorkFlowSetting"
                  placeholder="0"
                  value={MaxOrderNumber}
                  onChange={(e) => handleInputChange(e, setMaxOrderNumber)}
                />
                {errors.MaxOrderNumber && <div className="errorsClass2">{errors.MaxOrderNumber}</div>}
              </div>
            </form>
          </div>
          <div className="modal-foote p-4 pt-0 gap-3 flex flex-row-reverse" >

            <button type="button" className="btn-tip" onClick={onClose}>
              Cancel
            </button>
            <button
              id="btnSubmit_OrderNumber_WorkFlowSetting"
              type="button"
              className="btn-tip"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNumberModal;
