# 🚀 MuktoSoft — IT Solutions & Technology Services

A fully dynamic, admin-managed company website built with **Django REST API** (backend) and **React + Vite** (frontend).

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![Django](https://img.shields.io/badge/Django-5.x-green?logo=django)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)

---

## ✨ Features

### 🎨 Frontend
- **Dynamic Homepage** — All content fetched from API, managed via admin panel
- **Responsive Design** — Looks great on desktop, tablet, and mobile
- **Animated Hero Section** — Floating cloud animations & dynamic floating cards
- **Multi-page Setup** — Home, Services, About, Portfolio, Contact pages with React Router
- **Modern UI** — Merriweather font, `#1B91BC` color theme, glassmorphism, smooth transitions
- **Scroll Features** — Auto scroll-to-top on navigation, back-to-top button, custom scrollbar

### ⚙️ Backend
- **Django REST API** — Unified `/api/homepage/` endpoint
- **Admin Panel** — Full content management with organized fieldsets
- **10 Dynamic Models** — Site settings, hero, services, about, stats, portfolio, floating cards, testimonials, why choose us, CTA
- **Media Handling** — Logo, favicon, portfolio images, about section images

---

## 📁 Project Structure

```
muktosoft/
├── backend/                 # Django Backend
│   ├── api/                 # Main API app
│   │   ├── models.py        # 10+ dynamic models
│   │   ├── serializers.py   # DRF serializers
│   │   ├── views.py         # API views & homepage endpoint
│   │   ├── admin.py         # Customized admin panel
│   │   └── urls.py          # API routes
│   ├── muktosoft/            # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Navbar, Footer, ScrollToTop, BackToTop
│   │   ├── pages/           # Home, Services, About, Portfolio, Contact
│   │   ├── App.jsx          # Router setup
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles & design system
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- pip & npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔑 Admin Panel

Access the admin panel at: `http://localhost:8000/admin/`

### What You Can Manage

| Model | What It Controls |
|-------|-----------------|
| **Site Settings** | Logo, favicon, site name, phone, email, address, social links, copyright |
| **Hero Section** | Badge text, title, description, button text & links |
| **Hero Floating Cards** | Animated floating cards with 8 icon choices |
| **Services** | Service name, description, icon, display order |
| **About Section** | Title, description, image, experience badge, 4 features |
| **Stat Items** | Numbers & labels (e.g., 500+ Projects) |
| **Portfolio Items** | Project name, tag, description, image |
| **Why Choose Us** | Reason title & description |
| **Testimonials** | Client name, role, review, rating |
| **CTA Section** | Call-to-action title, description, button |

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/homepage/` | GET | All homepage data in a single response |
| `/api/services/` | GET, POST | Services CRUD |
| `/api/projects/` | GET, POST | Projects CRUD |
| `/api/team/` | GET, POST | Team members CRUD |
| `/api/contact/` | GET, POST | Contact form submissions |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Color | `#1B91BC` |
| Font | Merriweather (serif) |
| Border Radius | 12px–20px |
| Transitions | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 📜 License

This project is proprietary. All rights reserved © 2026 MuktoSoft.
