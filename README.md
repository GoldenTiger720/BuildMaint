# BuildMaint

A comprehensive building maintenance management system built with React, TypeScript, and modern web technologies.

## 🏢 Overview

BuildMaint is a full-featured web application designed to streamline building maintenance operations. It provides a complete solution for managing service calls, clients, technicians, finances, and reports in a modern, responsive interface.

## ✨ Features

- **Dashboard Analytics** - Real-time overview of maintenance operations with key metrics
- **Service Call Management** - Create, track, and manage maintenance requests
- **Client Management** - Comprehensive client database with contact information
- **Technician Scheduling** - Assign and track technician work orders
- **Service Catalog** - Manage different types of maintenance services
- **Financial Tracking** - Monitor revenue, expenses, and billing
- **Reporting System** - Generate detailed reports and analytics
- **User Authentication** - Secure login with role-based access
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode Support** - Toggle between light and dark themes

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Lucide React** - Additional icon library

### State Management
- **React Context** - Authentication and theme management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Additional Libraries
- **date-fns** - Date manipulation utilities
- **Recharts** - Chart and data visualization
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BuildMaint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Demo Accounts

The application includes demo authentication with the following account:

- **Admin**: admin@buildmaint.com / password123

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   └── ui/              # shadcn/ui components
├── contexts/            # React context providers
│   ├── AuthContext.tsx  # Authentication state management
│   └── ThemeContext.tsx # Theme state management
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Application pages/routes
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Login.tsx        # Authentication page
│   ├── Calls.tsx        # Service calls management
│   ├── Clients.tsx      # Client management
│   ├── Technicians.tsx  # Technician management
│   ├── Services.tsx     # Service catalog
│   ├── Finances.tsx     # Financial tracking
│   ├── Reports.tsx      # Reports and analytics
│   └── Settings.tsx     # Application settings
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Styling

The application uses a modern design system with:

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for dynamic theming
- **Custom color palette** with semantic color tokens
- **Responsive design** with mobile-first approach
- **Animations** using Tailwind CSS animations and Framer Motion
- **Custom gradients** and modern visual effects

## 🔧 Configuration

### Environment Setup
The application is configured with:
- **Vite** as the build tool
- **TypeScript** for type checking
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **Path aliases** using `@/` prefix

### Deployment
- **Vercel** configuration included (`vercel.json`)
- Supports SPA routing with rewrites
- Production build optimizations enabled

## 📱 Pages & Features

### Dashboard
- Real-time statistics and metrics
- Recent maintenance calls overview
- Quick action buttons
- System alerts and notifications

### Service Calls
- Create and manage maintenance requests
- Track call status and priority
- Assign technicians to calls
- Call history and details

### Client Management
- Add and manage client information
- Contact details and service history
- Client-specific maintenance tracking

### Technician Management
- Technician profiles and availability
- Work order assignments
- Performance tracking

### Financial Management
- Revenue and expense tracking
- Invoice generation
- Financial reporting

### Reports & Analytics
- Comprehensive reporting system
- Data visualization with charts
- Export capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons provided by [Heroicons](https://heroicons.com/) and [Lucide](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)