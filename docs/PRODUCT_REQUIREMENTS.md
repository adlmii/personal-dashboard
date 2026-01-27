# Product Requirements Document (PRD)
## Personal Dashboard Desktop App (MVP)
**Product Name:** FocusDeck  
**Platform:** Desktop (Windows / macOS via Tauri)  
**Status:** MVP (v0.1)

---

## 1. Product Overview

### 1.1 Problem Statement
Banyak orang:
- punya terlalu banyak task
- sulit menentukan fokus harian
- tidak sadar berapa lama mereka benar-benar fokus

Aplikasi produktivitas yang ada:
- terlalu kompleks
- terlalu banyak fitur
- atau justru terlalu dangkal

**Masalah utama:**  
Tidak ada *simple daily command center* yang:
- membatasi fokus
- mencatat usaha (waktu)
- terasa tenang dipakai setiap hari

---

### 1.2 Product Vision
Membuat **personal command center** untuk fokus harian yang:
- sederhana
- tenang
- bisa dipercaya

> Fokus bukan soal mengerjakan banyak hal,  
> tapi memilih sedikit hal yang penting — dan benar-benar mengerjakannya.

---

### 1.3 Target User
- Individual knowledge worker
- Developer / designer / student
- Solo worker yang:
  - kerja mandiri
  - butuh struktur ringan
  - tidak mau setup ribet

**Non-goal user:**
- Team collaboration
- Project management skala besar
- Enterprise workflow

---

## 2. Core Value Proposition

### 2.1 Value Utama
1. **Clarity** — tau fokus hari ini
2. **Constraint** — maksimal 3 task
3. **Awareness** — tau berapa lama fokus
4. **Calm UX** — tidak mengganggu flow

---

## 3. MVP Scope

### 3.1 In Scope (WAJIB)

#### 3.1.1 Task Management
- Add / delete task
- Status:
  - Backlog
  - Today Focus (max 3)
  - Done
- Undo delete task

#### 3.1.2 Focus Timer (Pomodoro)
- Focus / short break / long break
- Start / pause / reset
- Auto-save session
- Optional link ke task

#### 3.1.3 Dashboard (Single Workspace)
- Today Focus section
- Backlog section
- Timer widget
- Daily stats:
  - Focus minutes
  - Tasks completed
  - Daily progress %

#### 3.1.4 UX Feedback
- Non-blocking toast system
- In-app feedback (bukan OS modal)
- Undo action support

---

### 3.2 Out of Scope (MVP LOCK)
- Auth / login
- Cloud sync
- Calendar view
- AI features
- Team collaboration
- Analytics kompleks

---

## 4. User Experience & Navigation

### 4.1 Navigation Principle
- **Single primary workspace**
- Minimal navigation
- Sidebar tidak distract


### 4.2 Sidebar Behavior

#### Default State
- Sidebar **expanded** saat app dibuka pertama kali
- Menampilkan:
  - Icon
  - Label
- Tujuan: clarity untuk user baru

#### Collapsed State
- Sidebar bisa di-**collapse**
- Hanya menampilkan **icon**
- Lebar minimal, tidak mengganggu fokus

#### Interaction Rules
- Collapse / expand via:
  - Klik tombol toggle
  - Hover (opsional, configurable)
- State sidebar **diingat** (persisted)

#### UX Principle
> Sidebar membantu navigasi,  
> bukan jadi pusat perhatian.

---

### 4.3 Layout Principles

- Desktop-first
- Single main content area
- Tidak ada nested scroll yang membingungkan
- Semua aksi penting bisa dijangkau **tanpa pindah halaman**

---

## 5. Functional Requirements

### 5.1 Task Management

#### 5.1.1 Task Creation
- User bisa menambahkan task via input cepat
- Task default masuk ke **Backlog**
- Tidak ada due date di MVP

#### 5.1.2 Task States
- `backlog` → task biasa
- `today` → fokus hari ini (max 3)
- `done` → selesai

#### 5.1.3 Today Focus Rules
- Maksimal **3 task**
- Jika user menambah task ke-4:
  - Aksi dibatalkan
  - Toast error muncul

#### 5.1.4 Task Completion
- Task bisa ditandai `done`
- Timestamp `completed_at` disimpan
- Langsung mempengaruhi daily stats

---

### 5.2 Focus Timer (Pomodoro)

#### 5.2.1 Timer Modes
- Focus
- Short Break
- Long Break

Durasi default:
- Focus: 25 menit
- Short break: 5 menit
- Long break: 15 menit

#### 5.2.2 Timer Controls
- Start
- Pause
- Reset
- Mode hanya bisa diganti saat timer **tidak running**

#### 5.2.3 Session Logging
- Session otomatis tersimpan saat selesai
- Field utama:
  - duration
  - started_at
  - ended_at
  - completed
  - todo_id (optional)

---

### 5.3 Dashboard & Daily Stats

#### 5.3.1 Dashboard Content
- Today Focus list
- Backlog list
- Timer widget
- Stats cards

#### 5.3.2 Stats Definition
- Focus Minutes  
  → total durasi session hari ini
- Tasks Completed  
  → jumlah task `done` hari ini
- Daily Progress  
  → persentase completed vs total task aktif

#### 5.3.3 Data Behavior
- Stats dihitung **runtime**
- Tidak ada background job
- Tidak ada cache kompleks

---

## 6. Feedback & Notification System

### 6.1 In-App Toast (Primary)

#### Use Case
- Error
- Success
- Undo action
- Informational feedback

#### Rules
- Non-blocking
- Auto dismiss
- Action optional (Undo)

---

### 6.2 OS Notification (Secondary)
- Digunakan hanya untuk:
  - Timer selesai
- Jika OS notification mati:
  - App **tetap usable**
  - Tidak ada dependensi kritikal

---

## 7. Persistence & Data Integrity

### 7.1 Local-First Storage
- Semua data disimpan lokal
- App fully usable offline

### 7.2 Data Consistency Rules
- Task delete → bisa undo
- Session save → tidak boleh duplikat
- Interrupted session → tidak dihitung ke stats

---

## 8. Reliability Requirements (Sprint 5 Anchor)

### 8.1 Timer Reliability
- Timer tetap akurat saat:
  - App minimize
  - Laptop sleep
  - App reload

### 8.2 Lifecycle Handling
- App reopen saat timer aktif:
  - Resume
  - atau mark interrupted

---

## 9. Accessibility & Comfort

### 9.1 Visual Comfort
- Warna hangat
- Kontras aman
- Tidak menyilaukan

### 9.2 Cognitive Load
- Tidak ada popup agresif
- Tidak ada forced decision
- Semua feedback bisa diabaikan tanpa konsekuensi

---

## 10. Release Criteria (MVP v0.1)

Produk dianggap siap rilis jika:
- Semua core flow berjalan
- Tidak ada data loss
- Timer reliable
- UX non-blocking
- Scope tidak bocor

---

## 11. Risks & Mitigation

### Risk: Timer Tidak Akurat
- Mitigation: timestamp-based calculation

### Risk: User Overwhelm
- Mitigation: max 3 Today Focus

### Risk: Data Corruption
- Mitigation: transactional DB + integrity rules

---

## 12. Product Philosophy (Final)

1. Fokus itu dibatasi, bukan ditambah
2. UX harus tenang, bukan rame
3. Kepercayaan > fitur
4. MVP ≠ mainan

---
