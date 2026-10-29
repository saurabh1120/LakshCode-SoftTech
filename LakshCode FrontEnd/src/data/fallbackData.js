// ============================================================
//  FALLBACK DATA — shown ONLY when the backend is down / returns nothing.
//  When the backend is live and returns data, this file is ignored.
// ============================================================

// Full URL so imgUrl() uses it as-is (images live in public/images/projects)
const img = (file) => window.location.origin + '/images/projects/' + file

// icon must be one of: FaGlobe, FaMobile, FaCloud, FaBriefcase, FaPencilRuler,
// FaCode, FaServer, FaShieldAlt, FaRocket, FaDatabase
export const fallbackServices = [
  {
    id: 1, displayOrder: 1, active: true, icon: 'FaGlobe',
    title: 'Web Development',
    description: 'Fast, responsive, SEO-friendly websites and web apps built with React and modern tooling — from business sites to full customer portals.',
  },
  {
    id: 2, displayOrder: 2, active: true, icon: 'FaCloud',
    title: 'SaaS Product Development',
    description: 'Multi-tenant SaaS platforms with subscriptions, role-based access and admin dashboards — the same architecture behind LakshFit and LakshDine.',
  },
  {
    id: 3, displayOrder: 3, active: true, icon: 'FaServer',
    title: 'Backend & API Development',
    description: 'Secure, scalable REST APIs with Java & Spring Boot, JWT authentication, MySQL and clean, maintainable architecture.',
  },
  {
    id: 4, displayOrder: 4, active: true, icon: 'FaBriefcase',
    title: 'Custom Business Software',
    description: 'CRM, lead management, billing, inventory and workflow tools designed around how your team actually works — no more spreadsheets.',
  },
  {
    id: 5, displayOrder: 5, active: true, icon: 'FaMobile',
    title: 'Mobile-First Apps',
    description: 'Mobile-friendly web apps and PWAs that feel native on every phone, with WhatsApp & email notifications built in.',
  },
  {
    id: 6, displayOrder: 6, active: true, icon: 'FaPencilRuler',
    title: 'UI/UX Design',
    description: 'Clean, modern interfaces and dashboards that your customers and staff enjoy using — designed for clarity and conversion.',
  },
]

// techStack -> comma separated, features -> one per line (\n)
export const fallbackProjects = [
  {
    id: 1, displayOrder: 1, active: true,
    title: 'LakshFit — Gym Management SaaS',
    description: 'A complete multi-tenant gym management platform for Indian gyms. Owners manage members, memberships, payments, staff and expenses from one dashboard, while members get their own portal for workouts, diet plans and attendance.',
    techStack: 'React, Spring Boot, MySQL, JWT, Tailwind CSS, WhatsApp API',
    features: [
      'Member management with membership plans, renewals and dues tracking',
      'QR-based attendance, kiosk mode and staff attendance',
      'Member portal — dashboard, workout plan, diet plan, progress photos',
      'Automated WhatsApp & email notifications',
      'Referral program and loyalty points',
      'Revenue, expenses and net-profit reports',
    ].join('\n'),
    liveLink: 'https://lakshfit.in',
    imageUrl: img('lakshfit.svg'),
  },
  {
    id: 2, displayOrder: 2, active: true,
    title: 'LakshDine — Restaurant & Café Platform',
    description: 'A premium digital dining platform for restaurants and cafés. Guests scan a QR code at the table to browse the menu and order; orders flow straight to the kitchen, and owners get billing and analytics in real time.',
    techStack: 'React, Spring Boot, MySQL, Cloudinary, JWT',
    features: [
      'QR table ordering — Scan, Order, Enjoy',
      'Live kitchen order board',
      'Billing and cashier module',
      '7 roles: Super Admin, Owner, Manager, Waiter, Kitchen Staff, Cashier, Customer',
      'Sales analytics and public restaurant website',
    ].join('\n'),
    liveLink: '',
    imageUrl: img('lakshdine.svg'),
  },
  {
    id: 3, displayOrder: 3, active: true,
    title: 'Meri Gullak — Personal Finance App',
    description: 'A personal finance and expense-tracking app that makes saving simple. Track income and expenses across accounts, set savings goals, plan budgets and split bills with friends.',
    techStack: 'React, Spring Boot, MySQL, Chart.js',
    features: [
      'Multiple accounts, income/expense tracking with receipt upload',
      'Gullak savings goals and budget alerts',
      'Splitwise-style group expense splitting',
      'Dashboard with charts, analytics and gamification',
      'OTP login, email notifications, dark/light theme',
    ].join('\n'),
    liveLink: '',
    imageUrl: img('meri-gullak.jpg'),
  },
  {
    id: 4, displayOrder: 4, active: true,
    title: 'UrjaLytics — Solar Agency Operations',
    description: 'A multi-tenant operations platform for solar installation agencies — from lead capture and site survey to installation, documentation and subsidy tracking.',
    techStack: 'React, Spring Boot, MySQL, JWT',
    features: [
      'Lead pipeline and follow-ups',
      'Site survey and installation tracking',
      'Customer documents and subsidy status',
      'Team roles and agency-level dashboards',
    ].join('\n'),
    liveLink: '',
    imageUrl: img('urjalytics.svg'),
  },
  {
    id: 5, displayOrder: 5, active: true,
    title: 'Loan Operations & Lead Management Platform',
    description: 'A large-scale platform for a housing-finance client that digitised a fully manual Lead → Application → Processing → Decision → Tracking pipeline across 11 user roles.',
    techStack: 'React, Spring Boot, Spring Security, MySQL, Zustand',
    features: [
      '11-role access control with role-based dashboards',
      'Lead module with automated status transitions',
      '8-step application onboarding wizard',
      'HR employee onboarding with auto-generated employee IDs',
      '32-table relational database design',
    ].join('\n'),
    liveLink: '',
    imageUrl: img('loan-platform.svg'),
  },
  {
    id: 6, displayOrder: 6, active: true,
    title: 'LakshCode Website & Admin CMS',
    description: 'Our own company website with a full admin panel — services, projects, blogs, testimonials, inquiries and site settings are all manageable without touching code.',
    techStack: 'React, Vite, Framer Motion, Spring Boot, MySQL, Cloudinary',
    features: [
      'Animated, mobile-responsive public website',
      'Secure admin panel with JWT login',
      'Manage services, projects, blogs and testimonials',
      'Inquiry inbox with status and notes',
    ].join('\n'),
    liveLink: 'https://lakshcode.in',
    imageUrl: img('lakshcode-cms.jpg'),
  },
]
