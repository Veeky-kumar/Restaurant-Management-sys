import React from 'react';

const ComboProductPrinterAllocationTab: React.FC = () => {
  const handleCancel = () => {
    // Implement the logic for cancel button
    console.log('Cancel Printer Allocation');
  };

  const handleSave = () => {
    // Implement the logic for save button
    console.log('Save Printer Allocation');
  };

  const handleDeletePrinter = (printerId) => {
    // Implement the logic to handle printer deletion
    console.log(`Delete Printer with ID: ${printerId}`);
  };

  return (
    <div id="PrinterSetup_tab" className="tab-pane fade active show">
      <div
        id="dv_PrinterAllocationSubmissionSection_AddUpdateProduct"
        className="row custom_add_pro_rpw button_botm mt-4"
        style={{ paddingTop: '30px' }}
      >
        <div className="col-sm-6"></div>
        <div className="col-sm-6">
          <button
            id="btnCancel_PrinterAllocation_AddUpdateProduct"
            type="button"
            className="ml-2 btm_button_pro btm_button_pro_sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btm_button_pro btm_button_pro_sm"
            onClick={handleSave}
            style={{ marginRight: '20px' }}
          >
            SAVE
          </button>
        </div>
      </div>

      <div className="product_main-wrap" style={{ paddingTop: '30px', minHeight: '400px' }}>
        <div
          id="PrintersListSection_AddUpdateProduct"
          className="items_chckbox-wraps wrap_product-availability printerAllocationSectionStyle"
        >
          {[
            { id: 3, name: 'Printer New 3333333333333 (p12345999)' },
            { id: 6, name: 'P-100 (p-id-100)' },
            { id: 7, name: 'P-101 (p-id-101)' },
            { id: 8, name: 'Printer 200 (p-12345888)' },
            { id: 9, name: 'Printer QQ-1 (p-1111)' },
            { id: 10, name: 'Printer QQ-2 (p-2222)' },
            { id: 11, name: 'Printer QQ-3 (p-3333)' },
            { id: 12, name: 'Printer QQ-6 (p-66)' },
            { id: 14, name: 'Printer MM-100 (MM-100-12345)' },
            { id: 15, name: 'Printer KK-101 (KK-101)' }
          ].map((printer) => (
            <div
              key={printer.id}
              className="col-md-12 col-lg-12 col-sm-12 product_availability-wrap"
            >
              <div className="row">
                <div className="col-md-2 col-lg-2 col-sm-2">
                  <div style={{ textAlign: 'left', marginRight: '10px', marginTop: '9px' }}>
                    <input
                      id={`chkPrinter_${printer.id}_PrinterAllocation_AddUpdateProduct`}
                      type="checkbox"
                      value={printer.id}
                      className="edit_checkbox chkPrinterAllocationCommonClass"
                      style={{
                        cursor: 'pointer',
                        height: '20px',
                        width: '20px',
                        marginLeft: '26px',
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-8 col-8">
                  <p className="product_item-name">
                    <span style={{ fontSize: '18px', fontWeight: '500' }}>
                      {printer.name}
                    </span>
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-sm-2" style={{ textAlign: 'center' }}>
                  <a
                    className="restaurantDelete"
                    href="javascript:void(0);"
                    onClick={() => handleDeletePrinter(printer.id)}
                    title="Delete Printer"
                  >
                    <i className="material-symbols-outlined text-black">delete</i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComboProductPrinterAllocationTab;
