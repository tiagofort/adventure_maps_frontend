# 🧠 Knowledge and Attitudes of Medical Students Regarding Suicide – Admin Panel

This project is the **Admin Panel** for the academic research **"Knowledge and Attitudes of Medical Students Regarding Suicide"**. Developed during the COVID-19 pandemic (2021) for a **Brazilian medical school**, this application enables researchers to securely manage and analyze survey data from medical students across the country.

The interface is fully in **Portuguese**, as it was tailored to the needs of local faculty and research teams.

---

## 🌐 Live App

👉 **Try it here:** [Click here](https://ucdb-admin.vercel.app/)

👉 If you want to give a try, please, user:
email: tiago@adm.com and password: 123456

---

## 📁 Project Structure

```
src/
├── assets/ # Static assets (images, etc)
├── components/ # Reusable UI components
│ ├── ConfirmDialog.jsx
│ ├── DetailPanel.jsx
│ ├── Layout.jsx
│ ├── LoadingOverlay.jsx
│ ├── ProgressChart.jsx
│ └── StatesGraphBar.jsx
├── context/ # React context providers
│ ├── AuthContext.jsx
│ └── LoadingContext.jsx
├── hooks/
│ └── useAuth.js # Custom hook for auth
├── pages/ # App routes (screens)
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── ResearchAnalitics.jsx
│ ├── ResearchResults.jsx
│ └── Users.jsx
├── services/ # API service handlers
│ ├── auth.js
│ └── requests.js
├── styles/ # Global styles
├── App.jsx # Main layout and routes
├── main.jsx # React root
├── .env # Environment variables
├── index.html
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js
└── vite.config.js # Vite project config
```

---

## 🔐 Features

- **🔑 Secure Authentication:** Login required for access, based on JWT stored in localStorage.
- **📋 Individual Record Access:** View and export each participant’s survey response to Excel.
- **📊 Participation Progress Charts:**
  - Circular chart showing the percentage progress toward the **goal of 2000 responses**.
  - **Bar chart by state (UF):** Clickable bars allow filtering to view participating cities per state.
- **🧑‍🔧 User Management:**
  - Add new researcher accounts
  - Activate/deactivate users
  - Reset passwords
- **🌐 Fully in Portuguese:** Built specifically for Brazilian academic use.
- **📱 Fully Responsive:** Works on desktops, tablets, and mobile devices.

---

## 🧭 Top Navigation Menu

- **🏠 Home** – Dashboard overview.
- **📄 Dados da Pesquisa** – Browse individual survey responses and download them.
- **📈 Análise da Pesquisa** – Visual insights into survey progress and geographic distribution.
- **👥 Usuários do Sistema** – Administer researcher accounts.

---

## ⚙️ Tech Stack

### Frontend Frameworks & Libraries
- [React 18](https://reactjs.org/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/) for accessible component behavior
- [Lucide React](https://lucide.dev/) for icons
- [Recharts](https://recharts.org/) for data visualization

### Tooling & Build System
- [Vite](https://vitejs.dev/) – lightning-fast frontend tooling
- PostCSS + Autoprefixer – for CSS compatibility and transformation


## 📱 Fully Responsive Design

![Responsive Preview](https://imagens-tiago.s3.eu-north-1.amazonaws.com/ucdb-resposive.png)

---

## 📄 License

This project is for academic use only and is not intended for commercial purposes.

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project

# Install dependencies
npm install

# Start development server
npm run dev
