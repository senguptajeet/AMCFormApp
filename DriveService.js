/**
 * @file DriveService.gs
 * @description Manages Google Drive folder creation and PDF file saving.
 */

const DriveService = {
  
  /**
   * Generates a PDF from HTML and saves it to a specific Drive folder.
   * @param {Object} data - Form data for filename construction.
   * @param {string} htmlContent - The raw HTML to convert.
   * @returns {Object} - Contains the file URL.
   */
  generateAndSavePDF: function(data, htmlContent) {
    const folder = this._getOrCreateFolder(CONFIG.DRIVE_FOLDER_NAME);
    const fileName = this._generateFileName(data);
    
    // Create Blob from HTML
    const blob = Utilities.newBlob(htmlContent, MimeType.HTML)
                          .setName(fileName)
                          .getAs(MimeType.PDF);
    
    const file = folder.createFile(blob);
    
    return {
      url: file.getUrl(),
      id: file.getId()
    };
  },
  
  /**
   * Retrieves the target folder or creates it if it doesn't exist.
   * @param {string} folderName 
   * @returns {GoogleAppsScript.Drive.Folder}
   */
  _getOrCreateFolder: function(folderName) {
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      return folders.next();
    } else {
      return DriveApp.createFolder(folderName);
    }
  },

  /**
   * Generates standard filename: CustomerName_VisitDate_YYYYMMDD_HHMMSS.pdf
   * @param {Object} data 
   * @returns {string}
   */
  _generateFileName: function(data) {
    const customer = (data['Customer Name'] || 'Unknown').replace(/[^a-zA-Z0-9]/g, '');
    const visitDate = data['Visit Date'] || 'NoDate';
    
    const now = new Date();
    const ts = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
    
    return `${customer}_${visitDate}_${ts}.pdf`;
  }
};