# 🚀 MuktoSoft — IT Solutions & Technology Services

A fully dynamic, admin-managed company website built with **Django REST API** (backend) and **React + Vite** (frontend).

![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python)
![Django](https://img.shields.io/badge/Django-5.x-green?logo=django)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)

---

## ✨ Features

### 🎨 Frontend
- **Dynamic Homepage** — All content fetched from API, managed via admin panel.
- **Product & Service Details** — Dedicated pages with features, tech stacks, and pricing plans.
- **Mini Chatbot** — Compact UI with Lead Generation (Name/Mobile capture).
- **Floating Contact** — Quick access to phone, email, and location.
- **Animated UI** — Scroll reveals, glassmorphism, and smooth transitions.
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop.

### ⚙️ Backend
- **Django REST Framework** — Powerful API with dedicated endpoints for products, services, and leads.
- **Custom Admin Panel** — Organized management for all site content.
- **Lead Management** — Chatbot leads stored in database for marketing use.
- **Dynamic Pricing** — Support for multiple pricing tiers per product.
- **Newsletter** — Subscription system with duplicate check.

---

## 🚀 Branching Strategy

We follow a professional Git workflow to ensure code stability:

1.  **production**: The live, stable version of the application. Only merge from `staging` when ready for release.
2.  **staging**: The integration branch for testing. All `feature` branches are merged here first.
3.  **feature/***: Branches for individual tasks/features. Created from `staging`.

**Workflow Example:**
`feature/your-task` ➡️ `staging` ➡️ `production`

## 📁 Project Structure

```
muktosoft/
├── backend/                 # Django Backend
│   ├── api/                 # Main API app (Models, Views, Serializers)
│   ├── muktosoft/            # Settings & Core
│   ├── manage.py
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile           # Backend container config
│
├── frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Chatbot, FloatingContact, Navbar, Footer
│   │   ├── pages/           # Home, Products, Services, Details
│   │   └── hooks/           # useScrollReveal, useLocation
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile           # Frontend container config
│
├── docker-compose.yml       # Multi-container orchestration
└── README.md
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (optional)

### Local Development (Manual)

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup (Production Ready)
```bash
docker-compose up --build
```

---

## 🔑 Admin Panel

Access the admin panel at: `http://localhost:8000/admin/`

| Section | What You Can Manage |
|-------|-----------------|
| **Chatbot Leads** | Names and mobile numbers captured via chatbot |
| **Products** | Detailed product info, screenshots, and pricing |
| **Services** | Service details, tech stack, and step-by-step process |
| **Site Settings** | Branding, contact info, and social links |
| **Newsletter** | View and manage subscribed emails |

---

## 🌐 API Key Endpoints

- `GET /api/homepage/` - Main homepage aggregate data
- `GET /api/products/` - List all products
- `POST /api/chatbot-leads/` - Submit new chat leads
- `POST /api/newsletter/` - Newsletter subscription

---

## 📜 License

All rights reserved © 2026 MuktoSoft.
