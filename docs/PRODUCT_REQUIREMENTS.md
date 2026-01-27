# 🧠 Product Requirements Document (PRD)
## FocusDeck — Personal Focus Dashboard (Desktop)

**Platform:** Desktop (Windows / macOS)  
**Stage:** MVP → Daily-use Ready  
**Philosophy:** Less features, more focus

---

## 🎯 Problem yang Mau Disolve

Banyak orang:
- punya banyak task
- kerja lama tapi ga tau **beneran fokus berapa**
- kebanyakan productivity tools malah bikin ribet

Masalah intinya:

> User sulit menjaga fokus harian yang realistis dan tidak punya feedback sederhana tentang progresnya.

Tool yang ada sekarang:
- terlalu kompleks (Notion, ClickUp)
- atau terlalu dangkal (todo list doang)
- atau timer doang tanpa konteks task

FocusDeck hadir untuk **menyatukan task + fokus + feedback**  
tanpa noise dan tanpa beban mental.

---

## 👤 Target User

### Primary User
- Individual knowledge worker
- Developer, designer, student, indie maker
- Kerja di laptop, duduk lama, sering “sibuk tapi ga maju”

### Karakteristik User
- Ga mau ribet setup
- Lebih suka **local-first**
- Tidak peduli fitur fancy
- Peduli: **tenang, fokus, dan konsisten**

---

## ⭐ Fitur Utama (MVP Scope)

### 1️⃣ Task Management (Simple & Tegas)

- Tambah task ke backlog
- Pilih **maksimal 3 task** sebagai fokus harian
- Tandai task selesai
- Hapus task dengan **Undo (toast)**

**Tujuan:**  
Mengurangi pilihan → meningkatkan fokus.

---

### 2️⃣ Focus Timer (Pomodoro yang Waras)

- Mode:
  - Focus
  - Short Break
  - Long Break
- Timer **akurat walaupun**:
  - app di-minimize
  - laptop sleep
  - app di-reload
- Session otomatis tercatat
- Session bisa di-interrupt dengan aman

**Tujuan:**  
Fokus nyata, bukan timer palsu.

---

### 3️⃣ Daily Dashboard

Menampilkan:
- Today Focus (maks. 3 task)
- Total menit fokus hari ini
- Task selesai hari ini
- Progress harian (%)

**Tujuan:**  
User langsung ngerti kondisi hari ini tanpa mikir.

---

### 4️⃣ Feedback & UX

- Toast non-blocking:
  - success
  - error
  - info
  - undo
- Notifikasi OS hanya sebagai bonus
- Tidak ada popup agresif
- UI terang, hangat, dan tenang

---

## ❌ Out of Scope (Sengaja Tidak Masuk)

- Auth / Login
- Cloud sync
- Kalender kompleks
- Reminder pintar
- AI / rekomendasi
- Kolaborasi / sharing
- Mobile app

> Semua ini ditunda untuk menjaga fokus produk dan codebase.

---

## 📈 Success Metrics

MVP dianggap **sukses** jika:

- User bisa pakai app **1 hari penuh tanpa bug**
- Timer tidak bohong
- Data task dan session tidak hilang
- User ngerti:
  - apa yang harus dikerjakan hari ini
  - berapa lama dia benar-benar fokus

### Strong Success Signal
- App dibuka setiap pagi
- Tidak butuh tutorial
- Tidak ada rasa “ini ribet”

---

## 🧠 Product Principles

1. Fokus itu dibatasi, bukan ditambah
2. Lebih sedikit pilihan = lebih tenang
3. Local-first lebih penting dari cloud-first
4. UX harus diam, bukan teriak
5. Kalau ragu, jangan tambah fitur

---

## 🔥 Hot Take

Kalau fitur:
- tidak bikin user lebih fokus → **buang**
- bikin codebase ribet tapi UX ga naik → **jangan masuk**

---

## 🏁 Status Produk

- Core flow: ✅
- Timer reliability: ✅
- UX polish dasar: ✅
- MVP daily-use ready: ✅