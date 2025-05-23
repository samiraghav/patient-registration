
# Medblocks — Patient Registration System

This is a fully client-side **Patient Registration App** built with **React** and **PGlite** (a SQLite-compatible database in the browser).

It allows users to:

- Register new patients
- View and manage patient records
- Run raw SQL queries
- Auto-sync patient data across tabs
- Persist data on refresh using localStorage and IndexedDB

---

## Note
- Footer links are not clickable to start with.

## Features

### 1. Patient Registration
Users can register a new patient with the following fields:
- Personal info (name, DOB, age, gender, phone, email, address)
- Emergency contact (name, relation, phone)
- Medical info (blood group, allergies, conditions)

### 2. Patient List
Displays all patients in a scrollable, card-based UI. Each card includes:
- Patient name, gender, age
- Buttons to Edit or Delete
- Clickable name to view full details

### 3. SQL Query Form
Allows raw SQL queries directly in the browser to fetch and filter patient data.

### 4. Local Persistence
Patient data is stored using PGlite (runs in IndexedDB). Changes also reflect in `localStorage` for syncing.

### 5. Multi-Tab Synchronization
Whenever a tab modifies patient data, it updates `localStorage`, triggering updates in all other open tabs.

---

## Setup Instructions

1. **Clone the repo**:
```bash
git clone https://github.com/yourusername/medblocks.git
cd medblocks
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm start
```

4. **Build for production**:
```bash
npm run build
npm run preview
```

---

## Deployment

The app is deployed on Vercel:

[https://patient-registration-pearl.vercel.app](https://patient-registration-pearl.vercel.app)

To deploy yourself:

- Push to GitHub
- Link GitHub repo on [vercel.com](https://vercel.com/)
- Select root directory, hit deploy

---

## API & Storage Details

This is a frontend-only app — no backend API exists.

- Patient data is stored locally using **PGlite**
- `initDb()` creates table schema
- `addPatient()`, `getPatients()`, `updatePatient()`, and `deletePatient()` use SQL queries against local PGlite instance
- `localStorage` sync mirrors database state to trigger tab updates

---

## Commit History Example (for reference)

- `feat: set up project and Tailwind`
- `feat: add PGlite db and init schema`
- `feat: implement PatientForm component`
- `feat: display patient list with sorting`
- `feat: add SQL query support`
- `feat: multi-tab sync using localStorage`
- `fix: prevent future DOB entry`
- `chore: polish UI and add validation`
- `docs: add README`

---

## Challenges Faced

- **Synchronizing across tabs**: localStorage events don’t trigger in the same tab, so sync had to rely on event listeners + re-fetching from db
- **Persisting SQL-based storage**: Ensuring `PGlite` and `localStorage` remain in sync was crucial
- **Preventing invalid DOB**: Added validation to block future-dated birth entries with snackbar warning
- **No backend**: All logic had to be done on frontend, including sorting, validation, and persistence

---

## License

This project is open-source and MIT-licensed.
