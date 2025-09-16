
### **Project Overview: Digital Vaidya 🌿**

Digital Vaidya is an innovative Ayurvedic Diet Management System that integrates traditional Ayurvedic principles with modern technology to assist users in managing their dietary needs. The platform features multi-role access for doctors, patients, and administrators, an AI assistant for dietary inquiries, and a comprehensive food database with personalized diet chart management. By connecting users with nearby Ayurvedic centers, Digital Vaidya enhances wellness and provides tailored dietary recommendations.

<img width="478" height="213" alt="image" src="https://github.com/user-attachments/assets/e592d75d-8cdc-46ae-9909-8351328338cd" />


-----

### **Key Features**

  * 🔐 **User Authentication:** Secure multi-role access for doctors, patients, and administrators using Supabase for robust and secure user management.
  * 🤖 **AI Assistant:** An interactive chat interface, powered by the Google Gemini API, for instant dietary queries and AI-generated diet plans.
  * 🍎 **Food Database:** An extensive database detailing the Ayurvedic properties, benefits, and classifications of various food items.
  * 📅 **Diet Chart Management:** A flexible system allowing users and doctors to create, manage, track, and download personalized diet charts in PDF format.
  * 📱 **Responsive UI:** A modern, mobile-friendly design built with Shadcn-ui and Tailwind CSS, ensuring a seamless user experience across all devices.
  * 🌐 **Multilingual Support:** The interface is available in multiple languages (English, Hindi, Bengali, Tamil, Telugu, Marathi) to cater to a diverse user base.
  * 👩‍⚕️ **Patient Management:** A dedicated module for doctors to manage their patients' profiles, monitor progress, and generate tailored diet plans.
  * 📍 **Nearby Ayurvedic Centers:** A location-based feature using the Google Maps API to help users find and get directions to Ayurvedic centers near them.

-----

### **Technology Stack**

| Category | Technology / Service |
| :--- | :--- |
| **Frontend** | `React`, `TypeScript`, `Shadcn-ui` |
| **State Management** | `Zustand` |
| **Styling** | `Tailwind CSS` |
| **Build Tool** | `Vite` |
| **Backend & Database** | `Supabase` (Authentication & Data Management) |
| **AI Integration** | `Google Gemini API` |
| **Maps Integration**| `Google Maps API` |

-----

### **Codebase & File Overview**

  * `docs/`: Contains all high-level architectural and design documents for the project, including system design and diagrams.
  * `shadcn-ui/`: The main directory for the frontend application, containing all UI components, logic, and configuration files.
  * `src/`: The core source code directory housing all React components, custom hooks, pages, services, and utility functions.
  * `public/favicon.png`: The custom favicon for the Digital Vaidya application.
  * `public/logo-login.png`: An updated, dedicated logo used on the login and registration pages.
  * `src/pages/ContactUs.tsx`: The "Contact Us" page, which displays team member information and a contact submission form.
  * `src/pages/Index.tsx`: The application's homepage, featuring a project overview and highlighting its key features.
  * `src/pages/Login.tsx`: The user login and registration page, complete with enhanced functionality and input validation.
  * `src/services/supabaseService.ts`: The dedicated service layer for all interactions with the Supabase backend, managing authentication and data operations.

-----

### **Setup & Usage Instructions**

To set up and run the project locally, follow these steps:

1.  **Install Dependencies:** Navigate to the project directory and install the required packages using your preferred package manager.
    ```bash
    npm install
    ```
2.  **Build the Project:** Compile the application and its assets for production.
    ```bash
    npm run build
    ```
3.  **Run the Application:** Start the local development server to view the application in your browser.
    ```bash
    npm run dev
    ```
