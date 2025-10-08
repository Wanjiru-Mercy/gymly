# Gymly - Health Club Management System

A comprehensive health club, gym, and spa management system built with React, Vite, Tailwind CSS, and Shadcn/UI.

## 🏋️ Features

-   **Dashboard** - Overview of key metrics, recent activities, and upcoming classes
-   **Member Management** - Track and manage gym members and memberships
-   **Equipment Management** - Monitor gym equipment inventory and maintenance
-   **Services** - Manage gym classes, personal training, spa services
-   **Staff Management** - Oversee trainers, instructors, and staff
-   **Billing** - Handle invoices, payments, and membership fees
-   **Accounting** - Track revenue, expenses, and financial reports

## 🚀 Tech Stack

-   **React 19** - UI library
-   **Vite** - Build tool
-   **React Router DOM** - Routing
-   **Tailwind CSS** - Styling
-   **Shadcn/UI** - Component library
-   **Framer Motion** - Animations
-   **Lucide React** - Icons
-   **TanStack Query** - Server state management

## 📁 Project Structure

```
src/
├── components/
│   ├── DashboardLayout.jsx    # Main layout with sidebar & navbar
│   └── ui/                    # Shadcn UI components
│       ├── alert.jsx
│       ├── avatar.jsx
│       ├── button.jsx
│       ├── card.jsx
│       └── scroll-area.jsx
├── pages/
│   ├── Dashboard.jsx          # Dashboard overview
│   ├── MemberManagement.jsx   # Member management
│   ├── EquipmentManagement.jsx
│   ├── Services.jsx
│   ├── StaffManagement.jsx
│   ├── Billing.jsx
│   └── Accounting.jsx
├── lib/
│   └── utils.js               # Utility functions
├── App.jsx
└── main.jsx                   # Entry point & routing
```

## 🎨 Layout Features

### Sidebar

-   Collapsible design (expands/collapses)
-   Smooth Framer Motion animations
-   Active route highlighting
-   Responsive mobile drawer
-   Module navigation with icons

### Top Navbar

-   System branding
-   Search functionality (placeholder)
-   Notifications bell with indicator
-   User profile with avatar
-   Responsive design

### Main Content

-   Scrollable content area
-   Max-width container for readability
-   Fade-in animations
-   Consistent spacing and layout

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Todo

-   [ ] Authentication system
-   [ ] API integration
-   [ ] Member CRUD operations
-   [ ] Equipment tracking system
-   [ ] Class scheduling
-   [ ] Payment processing
-   [ ] Financial reporting
-   [ ] Staff scheduling
-   [ ] Notification system
-   [ ] Search functionality
-   [ ] User settings
-   [ ] Dark mode support

## 🎯 Color Scheme

Currently using neutral colors (grays, whites) with blue/purple accents. Color scheme is flexible and can be customized later.

## 📱 Responsive Design

-   Desktop: Full sidebar with labels
-   Tablet: Collapsible sidebar
-   Mobile: Drawer-style navigation

---

Built with ❤️ for health club management
