/**
 * @file SheetService.gs
 * @description Handles all interactions with Google Sheets for data storage.
 */

const SheetService = {
  
  /**
   * Saves the form data to the designated Google Sheet. Creates it if missing.
   * @param {Object} data - The parsed form data.
   */
  saveToSheet: function(data) {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      this._initializeHeaders(sheet);
    }
    
    const headers = this._getHeaders();
    const rowData = headers.map(header => {
      if (header === 'Timestamp') return new Date();
      return data[header] !== undefined ? data[header] : '';
    });
    
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, headers.length);
  },

  /**
   * Initializes the column headers on a newly created sheet.
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet 
   */
  _initializeHeaders: function(sheet) {
    const headers = this._getHeaders();
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#343a40");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  },

  /**
   * Defines the schema/headers for the spreadsheet.
   * @returns {Array<string>}
   */
  _getHeaders: function() {
    return [
      'Timestamp', 'Customer Name', 'Address', 'Visit Date', 'Engineer Name',
      'Alignment Done', 'Alignment Remarks', 'Balancing Done', 'Balancing Remarks',
      'PDI Car Check', 'PDI Remarks', 'Machine Cleaning', 'Cleaning Remarks',
      'Technician Name', 'Training Done', 'Dress (1-5)', 'Behavior (1-5)',
      'Experience (1-5)', 'Salesman Name', 'PMS Month', 
      
      'WA Make & Model', 'WA EB Main PN(V)', 'WA EB Main NE(V)', 'WA EB Main PE(V)',
      'WA UPS Checked', 'WA O/P Voltage', 'WA Wall Socket Broken', 'WA Sensor Head Condition',
      'WA Sensor Remarks', 'WA Grabber Condition', 'WA Targets Cleaned', 'WA Clamps Condition',
      'WA Clamps Remarks', 'WA Rear TT Cleaned', 'WA ROC Condition', 'WA ROC Remarks',
      'WA Lock Condition', 'WA Lock Remarks', 'WA Safety Belt Used', 'WA Wheel Chokes Used',
      'WA ROC Procedure Done', 'WA Brake Lock Castor', 'WA Printer Condition', 'WA Printer Remarks',
      'WA Machine Cleaned', 'WA Sunlight Affecting', 'WA Temp Files Deleted', 'WA Tech Training Given',
      
      'WB Wall Socket PN(V)', 'WB Wall Socket NE(V)', 'WB Make & Model', 'WB Quick Release Condition',
      'WB Plastic Cup Condition', 'WB Gauge Condition', 'WB Cleaning Done', 'WB Remarks',
      
      'Pit Rear Slip Plate Condition', 'Pit Rear Slip Plate Cleaned', 'Pit TT Condition', 'Pit TT Remarks',
      'Pit Rear TT Cleaned', 'Pit TT Leveling', 'Pit Site Issues', 'Pit Water Level',
      'Pit Oil Level', 'Pit Voltage', 'Pit Remarks', 'PDF Report URL', 'No of PMS done'
    ];
  }
};