# AMC Inspection Form

A Google Apps Script web application for capturing Contract AMC (Annual Maintenance Contract) inspection data, generating a standardized A4 PDF inspection report, and storing the submitted inspection record in Google Sheets with a link to the generated PDF.

## ✨ Features

- Four-step AMC inspection workflow: General, Wheel Alignment, Wheel Balancing, and Pit / Lift Health.
- Responsive web interface for desktop and mobile browsers.
- Stepper navigation with progress indication.
- Conditional fields and remark inputs.
- YES / NO / OTHER inspection controls.
- Technician ratings for Dress, Behavior, and Experience.
- PMS Month and Number of PMS Done tracking.
- Live A4 report preview before submission.
- Automatic PDF generation and Google Drive storage.
- Automatic Google Sheet response storage.
- Clickable Open PDF link saved with each submission.
- Automatic creation of the configured Drive folder and response sheet.
- Modular server-side service architecture.
- Unsaved-change protection and submission feedback.

## 🏗️ Architecture

    User
     │
     ▼
    Index.html
     │
     ├── Styles.html
     ├── JavaScript.html
     └── Template.html
     │
     ▼
    Code.js
     │
     ├── DriveService.js  → Generate and save PDF
     │
     └── SheetService.js  → Save inspection data
     │
     ├── Google Drive → AMC Inspection Reports/
     └── Google Sheets → AMC Form Response

### Submission Flow

1. The user opens the deployed Apps Script web application.
2. Code.js serves Index.html.
3. The user completes the four inspection sections.
4. JavaScript collects the form data.
5. The Preview & Generate action populates the report template.
6. The user reviews the generated report preview.
7. Submit & Save PDF sends the form data and populated HTML to Apps Script.
8. DriveService.js converts the HTML report to PDF and stores it in Google Drive.
9. SheetService.js writes the inspection record to Google Sheets.
10. The generated PDF URL is stored as a clickable hyperlink.

## 📁 Project Structure

| File | Purpose |
|---|---|
| Code.js | Main server-side controller, configuration, web-app entry point, and submission orchestration |
| DriveService.js | Google Drive folder management, PDF generation, and file naming |
| SheetService.js | Google Sheets storage, header initialization, and response persistence |
| Index.html | Main application UI and four-step inspection form |
| Styles.html | Application styling, responsive layout, dark/glass UI, controls, and loading states |
| JavaScript.html | Navigation, dynamic fields, preview population, form handling, and submission |
| Template.html | Standardized A4 print/PDF report layout |
| README.md | Project documentation |

## 🧰 Technology Stack

- Google Apps Script
- HTML5
- CSS3
- JavaScript
- Google Sheets
- Google Drive
- Bootstrap 5
- Google Material Icons
- Google Fonts (Poppins)

No separate Node.js, Python, database server, or external backend is required for the core application.

## 📊 Configuration

The main configuration is maintained in Code.js through the CONFIG object.

    const CONFIG = {
      APP_TITLE: "AMC Inspection Form",
      SHEET_NAME: "AMC Form Response",
      DRIVE_FOLDER_NAME: "AMC Inspection Reports",
      SHEET_ID: "YOUR_GOOGLE_SHEET_ID"
    };

### Google Sheet

The application uses the sheet named AMC Form Response. If the sheet does not exist, SheetService.js creates it and initializes the required headers.

The stored information covers customer and visit details, alignment checks, balancing checks, electrical readings, equipment conditions, pit/lift checks, technician ratings, PMS information, remarks, and the generated PDF URL.

### Google Drive

Generated reports are stored in the AMC Inspection Reports folder. If the folder does not exist, DriveService.js creates it automatically.

PDF filenames follow this pattern:

    CustomerName_VisitDate_YYYYMMDD_HHMMSS.pdf

## 🚀 Deployment Guide

### Prerequisites

- A Google account.
- Access to Google Apps Script.
- Access to the Google Spreadsheet used for storing inspection responses.
- Permission to create files in Google Drive.

### 1. Create or Select the Google Sheet

Create or select the spreadsheet that will store AMC inspection responses. Copy its Spreadsheet ID from the Google Sheets URL.

### 2. Create an Apps Script Project

Open Google Apps Script and create a new project.

### 3. Add the Project Files

Add these files to the Apps Script project:

    Code.js
    DriveService.js
    SheetService.js
    Index.html
    JavaScript.html
    Styles.html
    Template.html

Keep the filenames unchanged because the application uses Apps Script HTML includes.

### 4. Configure the Spreadsheet ID

Open Code.js and replace the configured SHEET_ID with your target Google Spreadsheet ID.

### 5. Authorize the Application

Save the project and run an appropriate server-side function when required. Google will request authorization for the Sheets and Drive services used by the application.

### 6. Deploy as a Web App

In Apps Script select Deploy → New deployment → Web app.

Recommended execution setting:

    Execute as: Me

Choose the appropriate access setting for your organization and users, then deploy and open the generated Web App URL.

> Choose the access setting carefully because the application writes to Google Drive and Google Sheets using the deployment owner's authorization.

## 📝 Using the Application

### Step 1 — General Details

Capture customer, visit, engineer, technician, service status, technician ratings, PMS month, and PMS completion information.

### Step 2 — Wheel Alignment

Capture machine make/model, main-line voltage, UPS condition, wall socket condition, sensors, grabbers, clamps, turntable, ROC, locks, safety procedures, printer, machine cleaning, environmental conditions, temporary files, and technician training.

### Step 3 — Wheel Balancing

Capture wall socket voltage, machine make/model, quick-release clamps, plastic cup/bead ring, gauge condition, cleaning status, and remarks.

### Step 4 — Pit / Lift Health

Capture slip plate condition, cleaning, turntable condition, leveling, site/machinery issues, water level, oil level, lift voltage, and general remarks.

### Preview

Select Preview & Generate to populate and review the standardized A4 report.

### Submit

Select Submit & Save PDF. The application generates the PDF, saves it to Drive, stores the inspection record in Sheets, saves the PDF URL, and displays a success notification.

## 📄 PDF Reporting

Template.html contains the standardized A4 report layout. It is designed for print-friendly output and includes:

- Customer and visit information
- Wheel Alignment checks
- Wheel Balancing checks
- Pit / Lift Health checks
- PMS information
- Technician information
- Inspection results and remarks

The same template is used for the preview and PDF workflow to keep the displayed report consistent with the saved document.

## 🔐 Security & Permissions

The application uses Google Apps Script services directly and therefore requires appropriate permissions to access the configured spreadsheet, create/read Drive files, and execute the web application.

Do not place passwords, API keys, OAuth secrets, or other sensitive credentials in the source code.

## 🛠️ Customization

### Application title

Modify APP_TITLE in Code.js.

### Response sheet

Modify SHEET_NAME in Code.js.

### Drive folder

Modify DRIVE_FOLDER_NAME in Code.js.

### Form UI

Modify Index.html, Styles.html, and JavaScript.html.

### PDF layout

Modify Template.html.

### Spreadsheet schema

The response headers are defined in SheetService.js. If you add or remove fields, keep the form field names, JavaScript mappings, PDF mappings, and Sheet headers synchronized.

## 🐛 Troubleshooting

### Application does not open

Check the Apps Script deployment URL, deployment access settings, and authorization status.

### PDF is not generated

Check Drive permissions, the target folder, Template.html inclusion, and Apps Script execution logs.

### Data is not appearing in Google Sheets

Check the Spreadsheet ID, sheet name, spreadsheet permissions, and Apps Script execution logs.

### A PDF field is blank

Verify the complete mapping chain:

    Index.html
        ↓
    Form field name
        ↓
    JavaScript.html
        ↓
    populateTemplate()
        ↓
    Template.html

## 🔄 Future Enhancement Ideas

- User authentication and role-based access.
- Engineer/user profiles.
- Search and retrieval of previous AMC reports.
- AMC visit analytics dashboard.
- Customer-wise inspection history.
- Equipment health trend analysis.
- Technician performance analytics.
- Email or WhatsApp report delivery.
- Photo/video attachment support.
- Automated follow-up reminders.
- PDF versioning.
- Offline-first mobile support.
- Centralized configuration management.
- Automated field-mapping tests.

## 📌 Project Status

**Status:** Active development

The repository contains the core Google Apps Script web application, modular services, responsive inspection interface, and A4 PDF reporting workflow.

## 🤝 Contributing

1. Create a feature branch.
2. Keep existing business logic intact unless the change specifically requires it.
3. Test the complete form → preview → PDF → Google Sheets workflow.
4. Document new configuration values or dependencies.
5. Submit a pull request with a clear description of the change.

## 📜 License

No explicit license is currently defined in this repository. If you plan to distribute or reuse the project publicly, add an appropriate LICENSE file.

## 👤 Author

**Jeet Sengupta**

GitHub: https://github.com/senguptajeet

## 🔗 Repository

https://github.com/senguptajeet/AMCFormApp

---

**AMC Inspection Form — structured inspection data, automated reporting, and centralized record keeping with Google Apps Script.**