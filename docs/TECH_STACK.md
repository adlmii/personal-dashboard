# 🧱 Tech Stack & Architecture
## FocusDeck — Developer Saver Document

> Dokumen ini dibuat untuk **menjelaskan kenapa teknologi ini dipilih**,  
> supaya 6 bulan ke depan kita **ingat alasannya**.

---

## 🎯 Tujuan Dokumen

- Jadi **single source of truth** untuk tech decision
- Menghindari refactor emosional
- Bikin onboarding (future self / contributor) lebih cepat

---

## 🖥️ Platform Overview

- **Platform:** Desktop App
- **Target OS:** Windows & macOS
- **Mode:** Offline-first, local-only
- **User Scale:** Single user (personal use)

---

## 🎨 Frontend Stack

### React (UI Layer)
**Digunakan untuk:**
- Component-based UI
- Declarative rendering
- State-driven UX

**Alasan memilih React:**
- Ekosistem matang
- Familiar & cepat dikembangkan
- Cocok untuk UI yang sering berubah state (timer, todo, toast)

> React dipilih bukan karena hype, tapi karena **predictable UI state**.

---

### Tailwind CSS (Styling)
**Digunakan untuk:**
- Utility-first styling
- Design consistency
- Rapid iteration

**Alasan memilih Tailwind:**
- Tidak ada context switching CSS ↔ JSX
- Mudah bikin design system ringan (CSS variables)
- Minim dead CSS

> Tailwind = kecepatan + konsistensi + kontrol penuh.

---

### Lucide Icons
**Digunakan untuk:**
- Icon UI

**Alasan:**
- Clean & konsisten
- Tree-shakable
- Cocok untuk app produktivitas

---

## 🧩 Desktop Runtime

### Tauri
**Digunakan untuk:**
- Packaging desktop app
- Native OS access (notification, filesystem)
- Lightweight runtime

**Alasan memilih Tauri:**
- Memory footprint kecil (dibanding Electron)
- Native notification support
- Security model lebih ketat
- Web tech + native bridge yang minimal

> Tauri dipilih karena **app harus ringan dan tenang**.

---

## 🗃️ Data Layer

### SQLite (via tauri-plugin-sql)
**Digunakan untuk:**
- Menyimpan todo
- Menyimpan pomodoro sessions
- Menyimpan daily stats

**Alasan memilih SQLite:**
- Zero config
- Local-first
- Reliable & battle-tested
- Cocok untuk personal app

> Personal Dashboard tidak butuh backend server.  
> Data milik user, disimpan di device user.

---

## 🧠 State Management

### Zustand
**Digunakan untuk:**
- Global state (todo, timer, dashboard, toast)
- Business logic (timer lifecycle)
- Cross-component coordination

**Alasan memilih Zustand:**
- Minimal boilerplate
- Tidak memaksa pattern kompleks
- Mudah dibaca & di-debug
- Cocok untuk solo dev

> Zustand dipilih supaya logic **terlihat jelas**, bukan tersembunyi di magic.

---

### Zustand Persist Middleware
**Digunakan untuk:**
- Persist timer state
- Recover state setelah reload / crash

**Alasan:**
- Timer harus survive reload
- Tidak tergantung lifecycle React

---

## 🔁 Data Flow (High Level)

```text
UI (React Components)
        ↓
Zustand Store (Business Logic)
        ↓
SQLite (Persistence)
        ↓
Derived Stats (Dashboard Store)
        ↑
UI Update (Reactive)
```

## 🧬 Prinsip Data Flow (Detail)

Data flow di FocusDeck **sengaja dibuat satu arah dan dangkal**.

### Prinsip Utama
- **Single Source of Truth = Store**
- UI hanya:
  - membaca state
  - memicu action
- Tidak ada logic bisnis di component

### Aturan Wajib
1. UI ❌ tidak hitung data penting
2. UI ❌ tidak simpan side-effect
3. Store ✅ boleh akses DB
4. Store ✅ boleh trigger notification
5. Derived data dihitung **di store**, bukan di UI

> Kalau logic mulai “nyempil” di component, itu tanda arsitektur bocor.

---

## 🔁 Prinsip Data Flow

### 1. Store = Source of Truth
- Semua state penting **hidup di Zustand store**
- UI hanya **merepresentasikan state**, bukan menentukan kebenaran
- Tidak ada logic bisnis tersembunyi di component

Contoh:
- Status timer → di `timerStore`
- Hitung statistik → di `dashboardStore`
- Limit Today Focus → di `todoStore`

> UI boleh bodoh, store harus pintar.

---

### 2. UI Tidak Menyimpan Logic Kompleks
- React component hanya:
  - render data
  - handle user interaction
- Tidak ada:
  - perhitungan waktu
  - validasi bisnis
  - side-effect berat

Keuntungan:
- UI mudah di-refactor
- Logic reusable
- Bug lebih gampang dilacak

---

### 3. Semua Side-effect Ada di Store
Side-effect meliputi:
- Database write/read (SQLite)
- Notification (OS & toast)
- Audio playback
- Derived data update

Kenapa?
- Side-effect **harus terkontrol**
- Menghindari race condition antar component
- Memudahkan debugging & testing

---

## ⏱️ Timer Architecture (IMPORTANT)

Timer adalah **core feature**, jadi arsitekturnya harus tahan banting.

---

### Core Principles

#### ❌ Tidak pakai `setInterval` sebagai source of truth
- `setInterval` gampang drift
- Gagal saat:
  - app minimize
  - laptop sleep
  - tab freeze

---

#### ✅ Timer Berbasis Real Timestamp (`endTime`)
- Saat start:
  - hitung `endTime = Date.now() + duration`
- Saat tick:
  - hitung sisa waktu dari `endTime - now`
- Saat reload:
  - timer bisa lanjut dengan benar

Ini membuat timer:
- akurat
- deterministik
- tidak tergantung lifecycle React

---

### Aman dari Kondisi Ini
- App di-minimize
- Laptop sleep / wake
- App reload / crash
- CPU throttling

> Timer yang bohong = product killer.

Kalau user ragu sama timer, **selesai sudah trust ke app**.

---

## 🔔 Notification Strategy

Notifikasi dibagi **dua layer**, dengan prioritas jelas.

---

### 1. In-App Toast (Primary)
**Karakteristik:**
- Selalu muncul
- Tidak tergantung permission OS
- Non-blocking
- Konsisten UX

**Dipakai untuk:**
- Session selesai
- Error ringan
- Undo action
- Constraint violation (max 3 task)

> Toast adalah sumber feedback utama.

---

### 2. OS Notification (Secondary)
**Karakteristik:**
- Best-effort
- Tergantung OS permission
- Bisa dimatikan user

**Dipakai untuk:**
- Pomodoro selesai
- Break selesai

**Fallback:**
- Jika gagal → **tidak memblokir flow**

> App **tidak boleh rusak** hanya karena OS notification mati.

---

## 🔐 Backend & Auth (Current Status)

❌ Tidak ada backend  
❌ Tidak ada auth  
❌ Tidak ada cloud sync  

---

### Alasan Keputusan Ini

- MVP fokus ke **daily usability**
- Menghindari:
  - auth complexity
  - sync conflict
  - infra overhead
- Local-first = value lebih cepat terasa

> FokusDeck adalah alat pribadi, bukan platform sosial.

---

## 🚫 Intentional Constraints

Constraint ini **disengaja**, bukan karena belum sempat.

❌ Tidak ada real-time sync  
❌ Tidak ada multi-user  
❌ Tidak ada API publik  
❌ Tidak ada background worker kompleks  

Manfaat:
- Scope terkendali
- Bug surface kecil
- Maintenance ringan

---

## 🧠 Architectural Principles

1. **Local-first by default**  
   Data ada di device user, bukan di server.

2. **Explicit > Implicit**  
   Lebih baik kode sedikit panjang tapi jelas.

3. **Fewer abstractions**  
   Jangan bikin layer hanya demi “arsitektur cantik”.

4. **Business logic di store, bukan di UI**  
   UI itu view, bukan otak.

5. **Reliability > Feature Count**  
   3 fitur yang reliable > 10 fitur setengah jadi.

---

## 🔥 Hot Take (Developer Note)

Tech stack & arsitektur ini dipilih supaya:
- app ringan
- logic bisa dipahami
- future self tidak nyumpahin past self

Kalau suatu hari mau ganti:
- lakukan karena **kebutuhan nyata**
- bukan karena FOMO

> FokusDeck bukan demo tech.  
> FokusDeck alat kerja.

---