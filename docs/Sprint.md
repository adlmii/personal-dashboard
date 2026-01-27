# Sprint Plan & Task Breakdown
## Personal Dashboard Desktop App (MVP)

---

## 📌 Sprint Strategy

### Prinsip Utama
- Kerjakan **fondasi → core value → daily usability → trust**
- Jangan sentuh feature tambahan sebelum app **usable harian & reliable**
- Setiap sprint harus hasilin sesuatu yang **bisa dipakai tanpa mikir**

### Sprint Length
- 1 sprint = 1 minggu (solo dev friendly)
- MVP target: **Sprint 0 – Sprint 5**

---

## 🟦 SPRINT 0 — Setup & Foundation (WAJIB)

### Goal
Project siap dikembangkan tanpa technical debt.

### Tasks

#### 0.1 Project Setup
- [x] Init repo (Git)
- [x] Setup Tauri + React + TypeScript
- [x] Setup Tailwind CSS
- [x] Base layout app shell
- [x] Global styling (font, CSS variables, color tokens)

#### 0.2 Architecture Decision
- [x] Folder structure
- [x] State management (Zustand)
- [x] Local DB strategy (SQLite via tauri-plugin-sql)

#### 0.3 Dev Experience
- [x] Linting & formatting
- [ ] Environment config
- [x] Hot reload confirm

✅ **Exit Criteria Sprint 0**
- App bisa dibuka
- UI shell muncul
- Fondasi rapi, belum ada fitur

---

## 🟩 SPRINT 1 — Todo Core (Backlog + Today Focus)

### Goal
User bisa **mencatat dan memilih fokus harian**

### Tasks

#### 1.1 Todo Data Layer
- [x] Todo model
- [x] CRUD Todo (local)
- [x] Status: backlog / today / done

#### 1.2 Backlog UI
- [x] Add todo form
- [x] List backlog
- [x] Delete todo

#### 1.3 Today Focus Logic
- [x] Set task as Today Focus
- [x] Enforce max 3 task
- [x] Remove from Today Focus

#### 1.4 Today Focus UI
- [x] Today Focus card
- [x] Visual priority
- [x] Empty state

✅ **Exit Criteria Sprint 1**
- User bisa:
  - Nambah task
  - Pilih max 3 fokus
  - Tandai selesai

---

## 🟨 SPRINT 2 — Pomodoro Engine

### Goal
User bisa **fokus kerja dan waktu tercatat otomatis**

### Tasks

#### 2.1 Pomodoro Core Logic
- [x] Timer engine (focus / short break / long break)
- [x] Start / pause / reset
- [x] Session completion handling

#### 2.2 Pomodoro Data Layer
- [x] PomodoroSession model
- [x] Auto log session ke DB
- [x] Optional link ke Todo

#### 2.3 Pomodoro UI
- [x] Timer display
- [x] Mode selector
- [x] Action buttons

#### 2.4 Flow Integration
- [x] Timer berjalan berdampingan dengan Today Focus
- [x] Session auto-save

✅ **Exit Criteria Sprint 2**
- User bisa fokus
- Session tersimpan otomatis
- Tidak perlu input manual

---

## 🟧 SPRINT 3 — Dashboard & Daily Experience

### Goal
User **punya satu command center harian**

### Tasks

#### 3.1 Dashboard Layout
- [x] Bento-style layout
- [x] Desktop-first sizing
- [x] Single main workspace (no page hopping)

#### 3.2 Dashboard Cards
- [x] Today Focus section
- [x] Backlog section
- [x] Timer widget
- [x] Stats cards (focus minutes, tasks done, progress)

#### 3.3 Derived Data
- [x] Hitung focus minutes (runtime)
- [x] Hitung completed tasks
- [x] Daily aggregation tanpa duplikasi data

✅ **Exit Criteria Sprint 3**
- App bisa dipakai **1 hari penuh**
- User ngerti:
  - Apa yang difokuskan
  - Sudah sejauh mana progres

---

## 🟥 SPRINT 4 — UX Polish & Interaction Quality

### Goal
Bikin app **tenang, hangat, dan manusiawi**

### Tasks

#### 4.1 Theme System
- [x] CSS variable–based theme
- [x] Warm light theme
- [x] Konsisten di seluruh komponen

#### 4.2 UX Feedback
- [x] Toast system (non-blocking)
- [x] Replace alert / confirm
- [x] Undo delete task

#### 4.3 Interaction Polish
- [x] Hover & active states
- [x] Empty states copy
- [x] Disable noisy UI saat focus

#### 4.4 Navigation Simplification
- [x] Sidebar simplified (Dashboard + Settings)
- [x] Dashboard sebagai single workspace

✅ **Exit Criteria Sprint 4**
- Tidak ada blocking UX
- Feedback jelas & tenang
- App terasa “dewasa”

---

## 🟦🟦 SPRINT 5 — Stability, Lifecycle & Trust (WAJIB SEBELUM RILIS)

### Goal
Pastikan app **bisa dipercaya** dalam kondisi real-life.

> Sprint ini fokus ke engineering reliability, bukan UI.

---

### 🧩 EPIC 5.1 — Timer Lifecycle Refactor

#### 5.1.1 Timestamp-based Timer
- [x] Ganti timer dari decrement per detik
- [x] Gunakan `startedAt` + `Date.now()`
- [x] Hitung elapsed time secara real-time

#### 5.1.2 Drift Prevention
- [x] `tick()` hanya trigger recalculation
- [x] Tidak ada manual `timeLeft -= 1`

---

### 🧩 EPIC 5.2 — Session Integrity

#### 5.2.1 Prevent Double Save
- [x] Tambah flag `hasCompleted`
- [x] Pastikan 1 session = 1 DB row

#### 5.2.2 Interrupted Session Handling
- [x] Tambah field:
  - `interrupted`
  - `interrupted_at`
- [x] Session incomplete tidak dihitung ke stats

---

### 🧩 EPIC 5.3 — App Lifecycle

#### 5.3.1 Persist Timer State
- [x] Simpan state timer (mode, status, startedAt)
- [x] Restore saat app reopen

#### 5.3.2 App Close Mid-session
- [x] Detect active session
- [x] Auto-resume atau mark interrupted

---

### 🧩 EPIC 5.4 — UX Safety Net

#### 5.4.1 Resume Prompt
- [x] Toast / prompt ringan:
  > “Sesi fokus sebelumnya belum selesai. Lanjutkan?”

#### 5.4.2 Silent Error Handling
- [x] DB / audio / notif error tidak crash app
- [x] Fallback ke toast ringan

---

### 🧩 EPIC 5.5 — Hardening & Testing

#### 5.5.1 Lifecycle Testing
- [x] Minimize app
- [x] Laptop sleep
- [x] Reload / reopen

#### 5.5.2 Data Validation
- [x] Stats akurat
- [x] Tidak ada duplicate session

---

✅ **Exit Criteria Sprint 5**
- Timer tetap akurat
- Data tidak rusak
- User bisa percaya app ini

---

## 🚫 Out of Scope (MVP Lock)

- Auth
- Calendar kompleks
- Cloud sync
- AI
- Analytics berat

---

## 🟦🟦 SPRINT 6 — Re-assert Personal Dashboard Identity

### Goal
Mengembalikan makna **Dashboard sebagai orientation layer**,  
bukan tempat kerja penuh distraksi.

> Sprint ini **tidak menambah fitur**, hanya membagi peran layar dengan jelas.

---

### 🧩 EPIC 6.1 — Navigation & Page Responsibility

#### 6.1.1 Sidebar Restructure
- [ ] Sidebar menu:
  - Dashboard
  - Focus
  - Tasks
  - Settings
- [ ] Active state jelas
- [ ] Sidebar collapse / expand (click-based)

**Acceptance Criteria**
- User langsung paham perbedaan konteks tiap menu
- Sidebar collapse tidak mengganggu flow

---

#### 6.1.2 Route Separation
- [ ] `/dashboard`
- [ ] `/focus`
- [ ] `/tasks`
- [ ] `/settings`

**Rules**
- Routing hanya mengubah context
- Tidak ada business logic di route

---

### 🧩 EPIC 6.2 — Dashboard = Orientation Only

#### 6.2.1 Dashboard Content Trim
- [ ] Today Focus → summary view (read-only)
- [ ] Timer → status ringkas (idle / running + remaining)
- [ ] Stats → daily overview

❌ Tidak ada:
- Add task
- Edit task
- Full timer control

---

#### 6.2.2 Dashboard CTA
- [ ] CTA utama:
  - “Start Focus”
  - “Review Tasks”
- [ ] CTA navigasi ke page yang tepat

**Acceptance Criteria**
- Dashboard bisa dipahami < 5 detik
- Tidak ada scroll panjang
- Tidak ada decision fatigue

---

### 🧩 EPIC 6.3 — Focus Page (Execution Mode)

#### 6.3.1 Focus Layout
- [ ] Timer sebagai hero
- [ ] Active task tunggal
- [ ] Tidak tampilkan backlog
- [ ] Tidak tampilkan stats

---

#### 6.3.2 Focus Safety UX
- [ ] Visual noise diminimalisir
- [ ] Toast lebih subtle saat focus
- [ ] Pause / reset jelas dan aman

**Acceptance Criteria**
- Focus page terasa “sunyi”
- Tidak ada accidental action

---

### 🧩 EPIC 6.4 — Tasks Page (Maintenance Mode)

#### 6.4.1 Tasks Full Control
- [ ] Backlog management
- [ ] Today Focus management
- [ ] Done list (optional collapse)

---

#### 6.4.2 Task Flow Polish
- [ ] Feedback toast konsisten
- [ ] Undo delete tetap tersedia
- [ ] Interaction jelas (no ambiguity)

---

### 🧩 EPIC 6.5 — Copy & Micro-UX Alignment

- [ ] Copy Dashboard → observasional
- [ ] Copy Focus → instruktif
- [ ] Copy Tasks → administratif
- [ ] Tidak ada motivational spam

---

### ✅ Exit Criteria Sprint 6
- Dashboard hanya untuk orientasi
- Focus page untuk eksekusi
- Tasks page untuk maintenance
- User paham app ini **personal dashboard, bukan todo app biasa**

---


## 🟩🟩 SPRINT 7 — Daily Closure & Long-Term Trust

### Goal
Meningkatkan rasa **percaya & keterikatan jangka panjang**  
tanpa menambah kompleksitas.

---

### 🧩 EPIC 7.1 — Passive Daily Closure

#### 7.1.1 End-of-Day Summary
- [ ] Summary otomatis (tanpa modal):
  - Focus minutes
  - Tasks completed
- [ ] Tidak minta input user

Contoh:
> “Hari ini: 90 menit fokus · 3 task selesai”

---

#### 7.1.2 Daily Reset Logic
- [ ] Today Focus reset otomatis tiap hari
- [ ] Backlog tetap aman
- [ ] Tidak menghapus data historis

---

### 🧩 EPIC 7.2 — Trust Reinforcement

#### 7.2.1 Data Integrity Signals
- [ ] Session incomplete tidak masuk stats
- [ ] Tidak ada duplicate log
- [ ] Stats konsisten antar reload

---

#### 7.2.2 Error Transparency
- [ ] Silent failure → toast ringan
- [ ] Tidak ada hard crash
- [ ] App tetap usable walau ada error minor

---

### 🧩 EPIC 7.3 — Settings Finalization (Minimalist)

- [ ] About / App philosophy
- [ ] Notification explanation
- [ ] Version info
- [ ] Tidak ada toggle berlebihan

---

### ✅ Exit Criteria Sprint 7
- User merasa app “ngerti ritme harian”
- Tidak perlu mikir harus ngapain
- App terasa stabil & bisa dipercaya

---

## 🚫 Out of Scope (Tetap Dikunci)

- Auth
- Cloud sync
- Calendar view
- Habit tracking
- Analytics berat
- AI / automation

---


## 🏁 Global Definition of Done

Sebuah task dianggap DONE jika:
- Berfungsi sesuai user flow
- Tidak merusak flow lain
- Bisa dipakai tanpa baca dokumentasi

---

## 🔥 PM Final Notes

> Fokus bukan soal fitur,  
> tapi soal **kepercayaan terhadap sistem**.

Sprint 5 adalah garis pembatas antara:
- “project pribadi”
- dan “produk yang layak dipakai harian”

---
