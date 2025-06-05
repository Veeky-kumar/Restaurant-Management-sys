import React, { useState } from 'react';
import "../../assets/CSS/manage-reasons.css";

interface Reason {
  id: number;
  label: string;
  checked?: boolean;
  editing?: boolean;
}

const reasonsData: Reason[] = [
  { id: 20, label: 'reason 20' },
  { id: 15, label: 'reason 1' },
  { id: 19, label: 'reason 7' },
  { id: 17, label: 'reason 5' },
  { id: 8, label: 'reason 3' },
  { id: 7, label: 'reason 2' },
  { id: 16, label: 'reason 4' }
];

const ManageReasons: React.FC = () => {
  const [reasons, setReasons] = useState<Reason[]>(reasonsData);
  const [newReason, setNewReason] = useState<string>('');

  const handleCheckboxChange = (id: number): void => {
    setReasons(prevReasons =>
      prevReasons.map(reason =>
        reason.id === id ? { ...reason, checked: !reason.checked } : reason
      )
    );
  };

  const handleEdit = (id: number): void => {
    const updatedReasons = reasons.map(reason =>
      reason.id === id
        ? { ...reason, editing: !reason.editing }
        : { ...reason, editing: false }
    );
    setReasons(updatedReasons);
  };

  const handleDelete = (id: number): void => {
    setReasons(prevReasons => prevReasons.filter(reason => reason.id !== id));
  };

  const handleAddReason = (): void => {
    if (newReason.trim() !== '') {
      const newReasonObj: Reason = {
        id: Date.now(),
        label: newReason,
        checked: false,
        editing: false
      };
      setReasons([...reasons, newReasonObj]);
      setNewReason('');
    }
  };

  return (
    <div className="container-scroller">
      <div className="page-body-wrapper">
        <div id="contentWrapper_RestaurantLayout" className="content-wrapper">
          <div className="mange_regions_section">
            <main className="content">
              <div className="card" style={{ borderRadius: '6px' }}>
                <div className="row g-0">
                  <div className="col-12 col-lg-12 col-xl-12">
                    <div className="position-relative">
                      <div
                        id="ReasonsList_Section_ManageReasons"
                        className="chat-messages p-4 ui-sortable"
                        style={{ paddingRight: '20px', minHeight: 'calc(100vh - 308px)' }}
                      >
                        {reasons.map(reason => (
                          <div
                            key={reason.id}
                            className="chat-message-left pb-3 ReasonSectionCommonClass ui-sortable-handle"
                            style={{ width: '100%', alignItems: 'center' }}
                          >
                            <div style={{ textAlign: 'left', marginRight: '10px' }}>
                              <input
                                id={`chkReason_${reason.id}_ManageReasons`}
                                type="checkbox"
                                className="edit_checkbox"
                                style={{ cursor: 'pointer' }}
                                checked={reason.checked}
                                onChange={() => handleCheckboxChange(reason.id)}
                              />
                            </div>
                            <div
                              id={`lblReason_${reason.id}_Section_ManageReasons`}
                              className="flex-shrink-1 rounded py-2 px-3 ml-3 lblReasonSectionClass"
                              style={{ width: 'inherit', minHeight: '50px', cursor: 'pointer' }}
                              onClick={() => handleEdit(reason.id)}
                            >
                              {reason.label}
                            </div>
                            {reason.editing && (
                              <div
                                id={`TextFieldReason_${reason.id}_Section_ManageReasons`}
                                className="flex-shrink-1 rounded py-2 px-3 ml-3 TextFieldReasonSectionClass"
                                style={{ width: 'inherit' }}
                              >
                                <input
                                  id={`txtReasonForEdit_${reason.id}_ManageReasons`}
                                  type="text"
                                  className="form-control TextFieldReasonClass"
                                  onBlur={() => handleEdit(reason.id)}
                                />
                              </div>
                            )}
                            <div style={{ textAlign: 'right' }}>
                              <span
                                className="material-icons"
                                style={{ fontSize: '40px', cursor: 'pointer' }}
                                title="Delete Reason"
                                onClick={() => handleDelete(reason.id)}
                              >
                                delete
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      id="txtReason_ManageReasons"
                      type="text"
                      className="form-control"
                      placeholder="Add New Reason..."
                      value={newReason}
                      onChange={(e) => setNewReason(e.target.value)}
                    />
                    <input
                      type="button"
                      className="btn"
                      style={{ background: '#554EBC', color: '#fff' }}
                      value="ADD"
                      onClick={handleAddReason}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReasons;
