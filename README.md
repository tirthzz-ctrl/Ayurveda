Digital Vaidya is an innovative Ayurvedic Diet Management System that integrates traditional Ayurvedic principles with modern technology to assist users in managing their dietary needs. The platform features multi-role access for doctors, patients, and administrators, an AI assistant for dietary inquiries, and a comprehensive food database with personalized diet chart management. By connecting users with nearby Ayurvedic centers, Digital Vaidya enhances wellness and provides tailored dietary recommendations.

*Technology Stack*

1.Frontend: React with TypeScript, Shadcn-ui components
2.State Management: Zustand
3.Routing and Authentication: Role-based routing
4.Styling: Tailwind CSS for responsive design
5.Build Tool: Vite
6.AI Integration: Google Gemini API for diet recommendations
7.Database and Authentication: Supabase for user management and secure authentication
8.Maps Integration: Google Maps API for locating Ayurvedic centers

*Project Module Description*

* User Authentication: Secure multi-role access for doctors, patients, and administrators using Supabase.
* AI Assistant: Interactive chat interface for dietary queries and AI-generated diet plans.
* Food Database: Extensive database detailing Ayurvedic properties of various foods.
* Diet Chart Management: Users can create, manage, and download personalized diet charts.
* Responsive UI: Mobile-friendly design enhancing user experience across devices.
* Multilingual Support: Interface available in multiple languages (English, Hindi, Bengali, Tamil, Telugu, Marathi).
* Patient Management: Doctors can manage patients, track progress, and generate diet plans.
* Nearby Ayurvedic Centers: Feature to locate Ayurvedic centers based on user location.

*Directory Tree*

ayurvedic_diet_software/
├── docs/                        # Documentation files
│   ├── backend_architecture.md
│   ├── class_diagram.mermaid
│   ├── frontend_architecture.md
│   ├── prd.md
│   ├── sequence_diagram.mermaid
│   └── system_design.md
shadcn-ui/
├── README.md                    # Project overview and setup instructions
├── package.json                 # Project dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── vite.config.ts               # Vite configuration for development and build
├── public/
│   ├── favicon.png              # New favicon for Digital Vaidya
│   ├── logo-login.png           # Updated logo for the login page
│   └── logo.svg                 # Digital Vaidya logo
└── src/                         # Source files for the application
    ├── components/              # UI components
    ├── hooks/                   # Custom hooks
    ├── pages/                   # Application pages
    ├── services/                # External services (e.g., Supabase, Google Maps API)
    ├── stores/                  # State management stores
    └── utils/                   # Utility functions

*File Description Inventory*

docs/: Contains architectural and design documents for the project.
shadcn-ui/: Main directory for UI components and application logic, including configuration files.
src/: Source code directory housing all React components, hooks, pages, services, and utilities.
public/favicon.png: New favicon for the Digital Vaidya application.
public/logo-login.png: Updated logo for the login page.
src/pages/ContactUs.tsx: Contact page displaying team members and a contact form.
src/pages/Index.tsx: Homepage featuring application overview and key features.
src/pages/Login.tsx: Login and registration page with enhanced functionality and validation.
src/services/supabaseService.ts: Service layer for interacting with Supabase for authentication and data management.

*Usage*

To set up the project, follow these steps:

Install dependencies using the appropriate package manager.
Build the project using the build command.
Run the application to start development.
