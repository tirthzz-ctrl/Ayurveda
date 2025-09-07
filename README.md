# Project Summary
The Ayurvedic Diet Management app is a comprehensive platform designed to assist Ayurvedic practitioners in creating, managing, and organizing personalized diet charts for patients. It integrates traditional Ayurvedic dietary principles with modern nutritional metrics, providing an intuitive interface for both doctors and patients. The app features a robust food database, automated diet generation, and patient management tools, ensuring accuracy and ease in dietary planning.

# Project Module Description
- **Authentication System**: Handles user login for doctors and patients with role-based access control.
- **Doctor Dashboard**: Allows doctors to manage patient profiles and generate diet charts.
- **Patient Dashboard**: Enables patients to view and download their diet charts and track health metrics.
- **Food Database**: A comprehensive database of over 8,000 food items with Ayurvedic properties.
- **Diet Generation**: Automated generation of personalized diet plans based on individual health profiles.
- **Contact Us Page**: Provides users with a way to reach out for support and inquiries.

# Directory Tree
```
shadcn-ui/
├── README.md                  # Project overview and setup instructions
├── components.json            # Component structure and details
├── eslint.config.js           # ESLint configuration for code quality
├── index.html                 # Main HTML file
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── public/
│   ├── favicon.svg            # Favicon for the application
│   └── robots.txt             # Robots.txt for web crawling
├── src/
│   ├── App.css                # Global styles
│   ├── App.tsx                # Main application component
│   ├── components/            # Reusable UI components
│   ├── contexts/              # Context API for state management
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utility functions and API integrations
│   ├── pages/                 # Application pages (Login, Dashboards, etc.)
│   ├── types/                 # TypeScript type definitions
│   └── vite-env.d.ts          # Vite environment types
├── tailwind.config.ts         # Tailwind CSS configuration
├── template_config.json       # Template configuration
├── todo.md                    # Implementation plan and tasks
├── tsconfig.app.json          # TypeScript configuration for app
├── tsconfig.json              # Base TypeScript configuration
└── vite.config.ts             # Vite configuration for bundling
```

# File Description Inventory
- **README.md**: Documentation for project setup and usage.
- **components.json**: Describes the components used in the project.
- **eslint.config.js**: Configuration file for ESLint to maintain code quality.
- **index.html**: Entry point of the application.
- **package.json**: Lists dependencies and scripts for the project.
- **postcss.config.js**: Configuration for PostCSS.
- **src/**: Contains the source code of the application including components, pages, and utilities.
- **tailwind.config.ts**: Configuration file for Tailwind CSS.
- **template_config.json**: Configuration for template usage in the app.
- **todo.md**: A list of tasks and implementation plans.
- **tsconfig.*.json**: TypeScript configuration files for different environments.
- **vite.config.ts**: Configuration file for Vite.

# Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint
- **Styling**: PostCSS, Tailwind CSS

# Usage
1. **Install Dependencies**: Run `pnpm install` to install all required packages.
2. **Build the Project**: Use `pnpm run build` to compile the application.
3. **Run the Application**: Start the development server with `pnpm run dev`.
