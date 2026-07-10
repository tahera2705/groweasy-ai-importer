# GrowEasy CRM Importer

A modern AI-powered CRM CSV Importer built as a full-stack web application.

The application allows users to upload CSV files, preview records, automatically map fields using Google's Gemini AI, and export standardized CRM-ready data through a clean SaaS-inspired interface.

---

## Features

- Upload CSV files
- Drag & Drop support
- CSV preview before import
- AI-powered CRM field mapping
- Smart field extraction using Gemini AI
- Import progress tracking
- Search uploaded and imported records
- Download processed CRM CSV
- Responsive SaaS dashboard
- Dark / Light mode
- Modern UI inspired by HubSpot CRM

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React
- PapaParse
- TanStack Virtual
- Sonner Toasts
- next-themes

### Backend

- Node.js
- Express.js
- Google Gemini API
- Multer
- dotenv

---

## Project Structure

```
groweasy-ai-importer
│
├── backend
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── app
│   │   └── components
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/groweasy-ai-importer.git
```

---

### Backend

```bash
cd backend
npm install
npm start
```

Runs on

```
http://localhost:5001
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```
GEMINI_API_KEY=YOUR_API_KEY
```

Create a `.env.local` inside the frontend folder.

```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

---

## Workflow

1. Upload CSV
2. Preview uploaded records
3. AI analyzes CSV columns
4. CRM fields are generated
5. Import summary displayed
6. Export CRM-ready CSV

---

## Screenshots

### Light Mode

<img width="1907" height="866" alt="image" src="https://github.com/user-attachments/assets/8f9e4797-330d-4ef6-8d83-7b133ba5e983" />


### Dark Mode

<img width="1892" height="857" alt="image" src="https://github.com/user-attachments/assets/da6e81b9-0a72-4ddf-9f7c-225363362124" />


---

## Future Improvements

- Authentication
- User Accounts
- Import History
- Database Integration
- Duplicate Detection
- Multiple CRM Templates
- Deployment on Vercel + Render

---

## Author

Tahera Singaporewala

GitHub:
https://github.com/tahera2705

LinkedIn:

www.linkedin.com/in/tahera-singaporewala-7721a0311
---
