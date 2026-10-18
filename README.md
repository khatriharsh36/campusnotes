# CampusNotes — Academic Resource Sharing Portal

A ReactJS single-page application for college students to discover and share academic study materials.

---

## Project Objective

Design, develop and deploy a web application using ReactJS to demonstrate client-side validation and interactive functionality.

---

## Features

- **Browse Resources** — View all academic resources on the Home page
- **Search** — Dynamically search by title, subject, or topic
- **Filter & Sort** — Filter by subject, resource type, semester; sort by newest, highest rated, or A–Z
- **Resource Details** — View full details in a modal with download simulation
- **Upload Resource** — Submit study materials with full client-side validation
- **Bookmarks** — Bookmark/unbookmark resources; persisted via `localStorage`
- **Rating** — Interactively rate resources (1–5 stars)
- **Login** — Simulated client-side login with validation
- **Dark Mode** — Theme toggle persisted via `localStorage`
- **Responsive** — Works on desktop, tablet, and mobile

---

## React Concepts Used

| Concept | Where Used |
|---|---|
| Functional Components | All components and pages |
| Props | ResourceCard, SubjectCard, FilterBar, FormInput, etc. |
| `useState` | Form state, filters, bookmarks, theme, modals |
| `useEffect` | localStorage sync for bookmarks and theme |
| Event Handling | Form inputs, button clicks, search, filter changes |
| Controlled Inputs | All form fields in Upload and Login pages |
| Conditional Rendering | Error messages, success modal, empty states |
| `.map()` | Rendering resource cards, subject cards, nav links |
| `.filter()` | Search and filter logic in Explore page |
| `.sort()` | Sorting resources by date, rating, or title |
| Reusable Components | 12+ components in `src/components/` |
| `localStorage` | Bookmarks and theme persistence |

---

## Client-Side Validation (Upload Form)

| Field | Rules |
|---|---|
| Student Name | Required, 3–60 chars, letters/spaces only |
| Email | Required, valid email format |
| Resource Title | Required, 5–80 characters |
| Subject | Required (dropdown) |
| Topic | Required |
| Resource Type | Required (dropdown) |
| Semester | Required (dropdown) |
| Description | Required, 20–300 characters, live counter |
| PDF File | Required, `.pdf` only, max 5 MB |
| Terms Checkbox | Must be checked |

- Errors display inline next to each field
- Success indicator (✓) shown on valid fields
- Banner shown on invalid submit attempt
- Form does not submit if any validation fails

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── SubjectCard.jsx
│   ├── ResourceCard.jsx
│   ├── FilterBar.jsx
│   ├── Rating.jsx
│   ├── BookmarkButton.jsx
│   ├── Modal.jsx
│   ├── FormInput.jsx
│   ├── SelectField.jsx
│   ├── ErrorMessage.jsx
│   └── EmptyState.jsx
├── pages/
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Upload.jsx
│   ├── Bookmarks.jsx
│   └── Login.jsx
├── data/
│   └── resources.js
├── utils/
│   └── validation.js
├── App.jsx
└── main.jsx
```

---

## How to Run Locally

```bash
# 1. Navigate to the project folder
cd campusnotes

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## How to Build for Deployment

```bash
npm run build
```

This creates a `dist/` folder with the production-ready static files.

---

## Deployment Instructions

### Netlify (Recommended)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag and drop the `dist/` folder

### Vercel
1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → "New Project" → Import the repo
3. Vercel auto-detects Vite — click Deploy

### GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json`:
```json
"homepage": "https://<username>.github.io/campusnotes",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Then run: `npm run deploy`

---

## Tech Stack

- **ReactJS** (Vite)
- **Plain CSS** (no external UI library)
- **localStorage** for persistence
- **Mock data** (no backend)
