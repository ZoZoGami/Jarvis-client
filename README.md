# ⚡ JARVIS — Academic & Personal Productivity Command Center

> **Live Repositories:** [Client App](https://github.com/ZoZoGami/Jarvis-client) | [Backend REST API](https://github.com/ZoZoGami/Jarvis-server)

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-5A0EF8)](https://daisyui.com/)
[![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-v12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=react-router)](https://reactrouter.com/)

An all-in-one productivity dashboard tailored for university students and engineers. **JARVIS** unifies daily task tracking, weekly timetable scheduling, course resource management, and automated email reminders into a single, responsive command center.

---

## 🚀 What Does JARVIS Do? (At a Glance)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   JARVIS DASHBOARD                                     │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ 📚 TODAY'S CLASSES       │ ✍️ SMART TODO LIST          │ 🔔 TIMED EMAIL REMINDERS      │
│ • CSE440 (8:00 AM)       │ [High] Submit NLP Paper     │ • "Midterm Exam" (Tomorrow)   │
│   Status: Completed      │ [Med]  Debug Auth Hook      │   Type: Exam                  │
│ • CSE422 (11:00 AM)      │ [Low]  Update Portfolio     │   Auto Email: 5 mins before   │
│   Starts in 1h 24m ⏳    │ Real-time CRUD & Priority   │   Nodemailer + node-cron ⚡   │
├──────────────────────────┴─────────────────────────────┴───────────────────────────────┤
│ 📅 INTERACTIVE 7-DAY TIMETABLE GRID        │ 📁 COURSE-GROUPED ACADEMIC VAULT          │
│ Sun - Sat • 7 Standard University Slots    │ CSE440 ▾ [Drive Slides] [GitHub Repo]     │
│ Click-to-edit • Debounced Cloud Auto-Save │ CSE422 ▾ [Dataset CSV]  [Colab Notebook]  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Core Features & How It Works

### 1. 📚 Real-Time Daily Class Tracker (`DailyReminder`)
* **What it does:** Automatically reads your current computer clock, identifies today's weekday (Sunday–Saturday), and scans your saved university timetable.
* **Smart Countdown:** Calculates minutes/hours remaining until your next lecture (e.g., *"Starts in 45m"*, *"Ongoing"*, *"Completed"*).
* **Live Refresh:** Re-evaluates every 60 seconds so you never miss a lecture or laboratory session.

### 2. 📅 Interactive 7-Day Routine Matrix (`Routine`)
* **What it does:** A weekly grid covering 7 university time slots (`8:00am`, `9:30am`, `11:00am`, `12:30pm`, `2:00pm`, `3:30pm`, `5:00pm`) across all 7 days.
* **Inline Click-to-Edit:** Click any slot, enter the course code and room number, and the app automatically debounces and persists the timetable to MongoDB under your private account.

### 3. 🔔 Automated Email Reminder Engine (`Reminders` + Cron Daemon)
* **What it does:** Set alerts for Quizzes, Assignments, Midterms, Project Deadlines, or Personal Meetings with date-time pickers.
* **Background Notification Engine:** The backend server runs a `node-cron` background job checking every minute. When any reminder is **5 minutes away**, it automatically drafts and dispatches an HTML notification email directly to your inbox via Nodemailer and Gmail SMTP!

### 4. ✍️ Priority-Tiered Task Manager (`Todo`)
* **What it does:** Complete task tracking with title, description, created timestamps, and **High / Medium / Low** priority tags.
* **Interactive Modals:** Add, edit in-place, mark complete, or delete with SweetAlert2 confirmation dialogs.
* **User Isolation:** All todos are strictly isolated to your authenticated account email.

### 5. 📁 Course-Grouped Academic Resource Vault (`Academics`)
* **What it does:** Bookmark lecture drive links, syllabus PDFs, GitHub code repositories, and Zoom/Teams meetings grouped neatly by course code (`CSE440`, `CSE422`, `MAT120`).
* **Accordion Navigation:** One-click expandable course cards prevent clutter and keep all semester materials organized in one place.

### 6. 🔗 One-Click Quick Launch Directory (`Links`)
* **What it does:** Instant launchpad for university portals, student advising dashboards, library databases, and cloud services.

### 7. 🔐 Dual-Layer Security & Authentication
* **Frontend:** Firebase Authentication supporting Google 1-Click OAuth and email/password sign-in with persistent session state.
* **Route Guards:** `PrivateRoute` wrapper protecting all dashboard features from unauthorized access.

---

## 🛠️ Complete Tech Stack

| Layer | Technologies Used | Key Purpose |
|---|---|---|
| **Frontend Core** | **React 19.1**, **Vite 7** | Modern component architecture, ultra-fast HMR builds |
| **Styling & UI** | **Tailwind CSS 3.4**, **DaisyUI 5** | Clean aesthetic, responsive grid layouts, card modals |
| **Routing** | **React Router DOM 7** | Client-side routing, protected routes (`PrivateRoute`) |
| **State & Context** | **React Context API** (`AuthProvider`) | Global user authentication and session synchronization |
| **Animations** | **Lottie React** | Micro-interactions and animated 404 error states |
| **Notifications** | **React Toastify**, **SweetAlert2** | Interactive feedback on CRUD and error operations |
| **HTTP Client** | **Axios** | Interceptor-ready API communication with backend |
| **Authentication** | **Firebase Auth 12** | OAuth 2.0 Google login & secure token management |

---

## 💻 Visual Workflow for Users

```text
[User Logs In (Google OAuth / Email)]
                │
                ▼
      ┌──────────────────┐
      │  Main Dashboard  │
      └─────────┬────────┘
                │
   ┌────────────┼────────────┬─────────────┐
   ▼            ▼            ▼             ▼
[Daily View] [Todo Cards] [Routine Grid] [Reminders]
   │            │            │             │
   │ (Today's   │ (High/Med/ │ (7-Day      │ (Set Due Date)
   │  Classes   │  Low tags) │  Inline     │       │
   │  Countdown)│            │  Editor)    ▼
   │            │            │       [Server Cron Engine]
   │            │            │             │
   ▼            ▼            ▼             ▼ (5 mins before)
[Auto-Synced to User Database]       [Automated Email Sent ✉️]
```

---

## ⚙️ Quick Start (Local Setup)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ZoZoGami/Jarvis-client.git
cd Jarvis-client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root folder:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👤 Author

**Fayez Ahmad Protik**
* Full-Stack Web Development (MERN Stack)
* Frontend Architecture & Responsive UX Design
* API Integration, OAuth & Real-Time Client State Management

---

## 📄 License
This project is open-source and available under the **MIT License**.
