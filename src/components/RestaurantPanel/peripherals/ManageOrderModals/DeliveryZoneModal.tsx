import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface DeliveryZoneModalProps {
    onClose: () => void;
    onSave: () => void;
    isUpdate: boolean;
    existingZone?: { ZoneName: string; DistanceValue: string; DeliveryFee: string; Id: number };
}

interface FormData {
    ZoneName: string;
    DistanceValue: string;
    DeliveryFee: string;
}

const DeliveryZoneModal: React.FC<DeliveryZoneModalProps> = ({
    onClose,
    onSave,
    isUpdate,
    existingZone,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    useEffect(() => {
        // Set default values if editing
        if (existingZone) {
            reset({
                ZoneName: existingZone[0].ZoneName,
                DistanceValue: existingZone[0].DistanceValue,
                DeliveryFee: existingZone[0].DeliveryFee,
            });
        }
    }, [existingZone, reset]);

    const UserToken_Global = localStorage.getItem('authToken');
    console.log(existingZone)
    const onSubmit = async (data: FormData) => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/add/workflowsetting/deliveryzone`;

        const payload = {
            id: isUpdate ? existingZone[0]?.Id : 0,
            ZoneName: data.ZoneName,
            DistanceValue: data.DistanceValue,
            DeliveryFee: data.DeliveryFee,
            restaurantLoginId: 0,
            mode: isUpdate ? 2 : 1,
        };

        try {
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${UserToken_Global}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 1 || response.data.status === 2) {
                onSave();
                onClose();
            } else {
                console.error('Error saving delivery zone:', response.data.message);
            }
        } catch (error) {
            console.error('Error during API call', error);
        }
    };

    return (
      <div className="modal fade add-pay-modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">{isUpdate ? 'Update Delivery Zone' : 'Create Delivery Zone'}</h5>
                  </div>
                  <div className="modal-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group">
                              <label htmlFor="ZoneName">Zone Name</label>
                              <input
                                  id="ZoneName"
                                  className="form-control"
                                  placeholder="Enter zone name"
                                  {...register('ZoneName', { required: 'Zone name is required' })}
                              />
                              {errors.ZoneName && <span className="text-danger">{errors.ZoneName.message}</span>}
                          </div>

                          <div className="form-group">
                              <label htmlFor="DistanceValue">Distance Value (KM)</label>
                              <input
                                  id="DistanceValue"
                                  className="form-control"
                                  placeholder="Enter distance value"
                                  {...register('DistanceValue', {
                                      required: 'Distance value is required',
                                      pattern: {
                                          value: /^[0-9]+(\.[0-9]+)?$/,
                                          message: 'Enter a valid numeric value',
                                      },
                                  })}
                              />
                              {errors.DistanceValue && <span className="text-danger">{errors.DistanceValue.message}</span>}
                          </div>

                          <div className="form-group">
                              <label htmlFor="DeliveryFee">Delivery Fee</label>
                              <input
                                  id="DeliveryFee"
                                  className="form-control"
                                  placeholder="Enter delivery fee"
                                  {...register('DeliveryFee', {
                                      required: 'Delivery fee is required',
                                      pattern: {
                                          value: /^[0-9]+(\.[0-9]+)?$/,
                                          message: 'Enter a valid numeric value',
                                      },
                                  })}
                              />
                              {errors.DeliveryFee && <span className="text-danger">{errors.DeliveryFee.message}</span>}
                          </div>

                          <div className="modal-foote !flex flex-row-reverse">
                              <button type="button" className="btn-tip" onClick={onClose}>
                                  Cancel
                              </button>
                              <button type="submit" className="btn-tip" id="btnSubmit_DeliveryZone_WorkFlowSetting">
                                  {isUpdate ? 'Update' : 'Add'}
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default DeliveryZoneModal;
