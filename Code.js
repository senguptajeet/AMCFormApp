/**
 * AMC Inspection Form - Enterprise Google Apps Script Web App
 * @file Code.gs
 * @description Main server-side controller handling GET requests, templating, and orchestration.
 */

const CONFIG = {
  APP_TITLE: "AMC Inspection Form",
  SHEET_NAME: "AMC Form Response",
  DRIVE_FOLDER_NAME: "AMC Inspection Reports",
  SHEET_ID: "1GT0yZQATiKFkVq-qRRlqKF-grwDk6gmzTACHe7W4tVI"
};

/**
 * Serves the HTML application.
 * @param {Object} e - Event object
 * @returns {HtmlOutput}
 */
function doGet(e) {
  try {
    const template = HtmlService.createTemplateFromFile('Index');
    return template.evaluate()
      .setTitle(CONFIG.APP_TITLE)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    Logger.log("Error in doGet: " + error.toString());
    return HtmlService.createHtmlOutput("An error occurred loading the application.");
  }
}

/**
 * Helper function to include HTML/CSS/JS files modularly.
 * @param {string} filename - The name of the file to include.
 * @returns {string} - The content of the file.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Main function to process form submission.
 * @param {Object} formData - JSON object containing all form inputs.
 * @param {string} htmlContent - The populated HTML string for PDF generation.
 * @returns {Object} - Result status and messages.
 */
function processFormSubmission(formData, htmlContent) {
  try {
    // 1. Generate PDF and save to Drive
    const pdfResult = DriveService.generateAndSavePDF(formData, htmlContent);
    
    // 2. Append data to Sheet with PDF URL as a clickable link
    formData['PDF Report URL'] = `=HYPERLINK("${pdfResult.url}", "Open PDF")`;
    SheetService.saveToSheet(formData);
    
    return {
      status: 'success',
      message: 'AMC Report successfully saved!',
      pdfUrl: pdfResult.url,
      pdfId: pdfResult.id
    };
  } catch (error) {
    Logger.log("Submission Error: " + error.toString());
    return {
      status: 'error',
      message: error.toString()
    };
  }
}