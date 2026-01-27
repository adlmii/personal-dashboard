# Sprint Plan & Task Breakdown
## Personal Dashboard Desktop App (MVP)

---

## 📌 Sprint Strategy

### Prinsip Utama
- Kerjakan **fondasi → core value → UX polish**
- Jangan sentuh feature tambahan sebelum MVP “usable harian”
- Setiap sprint harus hasilin sesuatu yang **bisa dipakai**

### Sprint Length
- 1 sprint = 1 minggu (solo dev friendly)
- Total MVP target: **4 sprint**

---

## 🟦 SPRINT 0 — Setup & Foundation (Wajib)

### Goal
Project siap dikembangkan tanpa technical debt dari awal.

### Tasks

#### 0.1 Project Setup
- [x] Init repo (Git)
- [x] Setup Tauri + React
- [x] Setup Tailwind
- [x] Base layout app shell
- [x] Global styling (font, color tokens)

#### 0.2 Architecture Decision
- [x] Tentukan folder structure
- [x] Tentukan state management (Zustand installed)
- [x] Tentukan local storage strategy (SQLite installed & connected)

#### 0.3 Dev Experience
- [x] Linting & formatting
- [] Environment config
- [x] Hot reload confirm

✅ **Exit Criteria Sprint 0**
- App bisa dibuka
- UI shell muncul
- Tidak ada fitur, tapi fondasi rapi

---

## 🟩 SPRINT 1 — Todo Core (Backlog + Today Focus)

### Goal
User bisa **mencatat dan memilih fokus harian**

### Tasks

#### 1.1 Todo Data Layer
- [x] Implement Todo model
- [x] CRUD Todo (local)
- [x] Status: backlog / today / done

#### 1.2 Backlog UI
- [x] Add todo form
- [x] List backlog
- [x] Edit & delete todo

#### 1.3 Today Focus Logic
- [x] Set task as Today Focus
- [x] Enforce max 3 task
- [x] Remove from Today Focus

#### 1.4 Today Focus UI
- [x] Today Focus card
- [x] Visual priority
- [x] Empty state (“Plan Your Day”)

✅ **Exit Criteria Sprint 1**
- User bisa:
  - Nambah task
  - Pilih max 3 task
  - Tandai selesai

---

## 🟨 SPRINT 2 — Pomodoro Engine

### Goal
User bisa **fokus kerja dan waktu tercatat**

### Tasks

#### 2.1 Pomodoro Core Logic
- [x] Timer engine (focus/break)
- [x] Start / pause / stop
- [x] Session completion handling

#### 2.2 Pomodoro Data Layer
- [x] PomodoroSession model
- [x] Auto log session
- [x] Link session ke Todo (optional)

#### 2.3 Pomodoro UI
- [x] Timer display
- [x] Active task display
- [x] Action buttons

#### 2.4 Flow Integration
- [x] Start pomodoro from Today Focus
- [x] Post-session modal (continue / break / switch)

✅ **Exit Criteria Sprint 2**
- User bisa:
  - Start focus dari task
  - Menyelesaikan session
  - Data tercatat otomatis

---

## 🟧 SPRINT 3 — Dashboard & Daily Experience

### Goal
User **melihat progres & nyaman dipakai harian**

### Tasks

#### 3.1 Dashboard Layout
- [ ] Bento grid layout
- [ ] Responsive desktop sizing
- [ ] No-scroll main view

#### 3.2 Dashboard Cards
- [ ] Today Focus card (final)
- [ ] Active Pomodoro card
- [ ] Daily Progress card
- [ ] Mini stats card

#### 3.3 Derived Data
- [ ] Hitung focus minutes
- [ ] Hitung completed task
- [ ] Daily aggregation (runtime)

#### 3.4 Daily Wrap-up
- [ ] End-of-day summary
- [ ] Optional mood input
- [ ] Reset Today Focus next day

✅ **Exit Criteria Sprint 3**
- App bisa dipakai **1 hari penuh**
- User ngerti:
  - Fokus hari ini
  - Progresnya

---

## 🟥 SPRINT 4 — Polish & Hardening (Optional tapi recommended)

### Goal
Bikin app **nyaman & stabil**

### Tasks

#### 4.1 UX Polish
- [ ] Empty states
- [ ] Loading states
- [ ] Micro-interactions

#### 4.2 Stability
- [ ] Edge case timer
- [ ] App close / reopen handling
- [ ] Data persistence check

#### 4.3 Performance
- [ ] Render optimization
- [ ] Storage read/write optimization

#### 4.4 Release Prep
- [ ] App icon
- [ ] Basic README
- [ ] MVP release build

✅ **Exit Criteria Sprint 4**
- App stabil
- Siap dipakai harian
- No critical bug

---

## 🧠 Priority Rules (IMPORTANT)

### DO FIRST
- Todo → Today Focus → Pomodoro

### DO NOT TOUCH (MVP)
- Auth
- Calendar kompleks
- Cloud sync
- AI

---

## 🏁 Definition of Done (Global)

Sebuah task dianggap DONE jika:
- Berfungsi sesuai flow
- Tidak merusak core flow lain
- Bisa dipakai tanpa baca dokumentasi

---

## 🔥 PM Final Notes

- Jangan ngerjain sprint paralel
- Jangan nambah scope di tengah sprint
- Kalau ragu → **balik ke user flow**

> Satu hari fokus lebih berharga dari 10 fitur setengah jadi.

---
