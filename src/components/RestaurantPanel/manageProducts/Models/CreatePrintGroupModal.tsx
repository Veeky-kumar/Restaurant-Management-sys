import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface CreatePrintGroupModalProps {
  onClose: () => void;
  onCreateMainDepartment: (action: number, departmentValue: string) => void;
  editModal: boolean;
  selectedGroupName: string;
}

const CreatePrintGroupModal: React.FC<CreatePrintGroupModalProps> = ({ onClose,
  onCreateMainDepartment,
  editModal,
  selectedGroupName,

}) => {

  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    if (editModal) {
      setGroupName(selectedGroupName);
    }
  }, [editModal, selectedGroupName]);



  return (
    <div
    className="modal fixed inset-0 z-1000 bg-black bg-opacity-50 flex items-center justify-center"
    style={{ display: 'block' }} 
    aria-modal="true"
    role="dialog"
  >
    {/* <div className="modal show" style={{ display: 'block',}} aria-modal="true" role="dialog"> */}
      <div className="modal-dialog cstm_modal_dialog">
        <div className="modal-content plus_modal_cont">
    
          <div className="modal-header plus_modal_head flex items-center" style={{ display: 'block', paddingBottom: 0 }}>
            <h4 className="translate-x-7 modal-title plus_head_popup">Add Print Group</h4>
          </div>

          <div className="modal-body new_modal_work">
            <div className="form-group plus_from_group">
              <input
                type="text"
                className="p-2 plus_imput_feild"
                placeholder="Enter Print Group"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                style={{width:"310px"}}
              />
              {/* {error && <div className="errorsClass2">{error}</div>} */}
            </div>

            <div className="modal-bottom plus_modal_bottom">
              <button type="button" className="cstm_model_plusbtn_1 btn btn-danger" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="cstm_model_plusbtn_2 btn btn-danger"
                onClick={() => onCreateMainDepartment(editModal ? 2 : 1, groupName)}
              >
                {editModal ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrintGroupModal;