# Medblocks — Local-first Patient Management System

Medblocks is a modern, offline-first web application for managing patient records in small clinics or hospitals. It features real-time local database storage, structured data entry forms, powerful querying capabilities, and a beautiful, intuitive interface built with React and Tailwind CSS.

---

## Features

- **Patient Registration:** Clean, validated form with DOB → Age auto-calculation.
- **Smart Validation:** Prevents future DOB entries and alerts user with toasts.
- **Full CRUD:** Add, view, edit, delete patients.
- **Emergency + Medical Info:** Store contact, allergy, condition, and blood group data.
- **Query System:** Run advanced SQL-like queries (e.g., filter by age/gender).
- **Offline-first with IndexedDB:** Uses PGlite to store data locally in browser.
- **Real-time Multi-tab Sync:** Changes in one tab instantly reflect in others.
- **Modern UI/UX:** Built with React, Tailwind CSS, and React Icons.

---

## Tech Stack

- **Frontend:** React 18, React Router, Tailwind CSS, React Icons, Notistack
- **Local DB:** [@electric-sql/pglite](https://github.com/electric-sql/pglite) — PostgreSQL running on IndexedDB
- **State Management:** useState, useEffect, useCallback
- **Sync:** localStorage events for tab sync

---

## UI Overview

- `/` — Main Dashboard: Register patient, view list, run query
- `/patients/:id` — Detail view for a patient
- `/edit/:id` — Edit patient form with pre-filled data

---

## Folder Structure

```
src/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── PatientForm/
│   ├── PatientList/
│   ├── PatientDetail/
│   ├── EditPatientForm/
│   └── QueryForm/
├── helpers/
│   └── formHelpers.js
├── services/
│   └── databaseService.js
├── App.js
└── index.js
```

---

## Setup Instructions

```bash
# 1. Clone repo
git clone https://github.com/your-username/medblocks.git
cd medblocks

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

---

## Local Database Schema

```sql
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT,
  age INTEGER,
  gender TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergencycontactname TEXT,
  emergencycontactrelation TEXT,
  emergencycontactphone TEXT,
  bloodgroup TEXT,
  allergies TEXT,
  conditions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Multi-tab Sync Strategy

- Every time a patient is added/updated/deleted:
  - Local DB (`PGlite`) is updated.
  - Entire patient list is stored in `localStorage`.
  - `storage` event listener in other tabs reloads patient data.

---

## Highlights

- ✅ Validates DOB to be only in the past (not future)
- 📆 Age is automatically calculated from date of birth
- 📦 Pure browser-based — no backend server required
- 🔄 Synchronized across tabs with `localStorage` event
- ☁️ Future-ready for migration to ElectricSQL or Supabase

---

## Roadmap

- [ ] Add patient image upload
- [ ] Export patient records as CSV/PDF
- [ ] Add login & role-based access (Doctor, Admin)
- [ ] Sync with cloud DB using ElectricSQL
- [ ] Dark mode toggle

---

## Author

Made with 💙 by Samir Aghav — combining health tech with frontend magic.

---

## License

MIT — feel free to use, modify and share!
