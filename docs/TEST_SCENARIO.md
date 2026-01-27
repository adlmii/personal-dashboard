---

## ✅ Test Case & Acceptance Criteria
*(Optional tapi Highly Recommended)*

Dokumen ini menjawab satu pertanyaan penting:

> **“Kapan fitur ini boleh dibilang DONE?”**

Bukan “kayaknya jalan”, tapi **jelas & repeatable**.

---

## 🎯 General Acceptance Criteria (Global)

Sebuah fitur dianggap **DONE** jika:
- Tidak merusak flow utama (Todo → Focus → Pomodoro)
- Tidak crash saat:
  - reload
  - minimize
  - sleep / wake
- Tidak membutuhkan instruksi tambahan
- Error ditangani secara graceful (toast / fallback)

---

## 📝 Todo Feature

### Acceptance Criteria
- User bisa menambahkan todo baru
- Todo kosong **tidak bisa disubmit**
- Todo otomatis masuk ke **Backlog**
- Todo bisa dipindah ke:
  - Today Focus
  - Done
- Maksimal **3 todo** di Today Focus

---

### Test Cases

#### TC-TODO-01 — Add Todo
**Given:** User di Dashboard  
**When:** User submit todo dengan teks valid  
**Then:**  
- Todo muncul di Backlog  
- Input field clear  

---

#### TC-TODO-02 — Empty Todo
**Given:** Input kosong  
**When:** User submit  
**Then:**  
- Tidak ada todo baru  
- Tidak ada error crash  

---

#### TC-TODO-03 — Today Focus Limit
**Given:** Sudah ada 3 task di Today  
**When:** User coba pindahkan task ke Today  
**Then:**  
- Task **tidak pindah**
- Toast error muncul
- App tetap stabil

---

#### TC-TODO-04 — Delete + Undo
**Given:** Todo ada di list  
**When:** User delete todo  
**Then:**  
- Todo hilang dari list  
- Toast “Undo” muncul  
- Jika Undo ditekan → todo kembali  

---

## ⏱️ Pomodoro / Timer Feature

### Acceptance Criteria
- Timer tidak bergantung pada `setInterval`
- Timer akurat walau:
  - app minimize
  - laptop sleep
  - reload
- Session hanya disimpan **1 kali**
- Session < 1 menit **tidak disimpan**

---

### Test Cases

#### TC-TIMER-01 — Start Timer
**Given:** Timer idle  
**When:** User klik Start  
**Then:**  
- Status = running  
- Countdown berjalan  

---

#### TC-TIMER-02 — Pause Timer
**Given:** Timer running  
**When:** User klik Pause  
**Then:**  
- Status = paused  
- Waktu **tidak reset**
- Waktu tidak berkurang

---

#### TC-TIMER-03 — Resume Timer
**Given:** Timer paused  
**When:** User klik Start  
**Then:**  
- Timer lanjut dari sisa waktu  
- Tidak restart dari awal  

---

#### TC-TIMER-04 — Timer Finish
**Given:** Timer running  
**When:** Countdown mencapai 0  
**Then:**  
- Status jadi idle  
- Session tersimpan (completed = true)  
- Toast muncul  
- (Jika permission) OS notification muncul  

---

#### TC-TIMER-05 — Reset While Running
**Given:** Timer running  
**When:** User klik Reset  
**Then:**  
- Timer kembali ke durasi awal  
- Session tersimpan (completed = false)  
- Tidak ada double save  

---

#### TC-TIMER-06 — Reload App Mid Session
**Given:** Timer running  
**When:** App reload  
**Then:**  
- Timer lanjut dengan sisa waktu akurat  
- Tidak reset  
- Tidak double save  

---

#### TC-TIMER-07 — Junk Session Filter
**Given:** Timer berjalan < 1 menit  
**When:** Timer dihentikan  
**Then:**  
- Session **tidak disimpan**
- Tidak muncul di stats  

---

## 📊 Dashboard & Stats

### Acceptance Criteria
- Stats update setelah:
  - todo selesai
  - session selesai
- Tidak perlu refresh manual
- Data konsisten dengan DB

---

### Test Cases

#### TC-STATS-01 — Focus Minutes
**Given:** User menyelesaikan focus session  
**When:** Session saved  
**Then:**  
- Focus minutes bertambah sesuai durasi  

---

#### TC-STATS-02 — Tasks Completed
**Given:** User mark todo as done  
**When:** Status berubah  
**Then:**  
- Tasks Completed naik  
- Progress % update  

---

## 🔔 Notification

### Acceptance Criteria
- App **tetap usable** tanpa OS notification
- Toast selalu muncul untuk feedback penting

---

### Test Cases

#### TC-NOTIF-01 — OS Notification Disabled
**Given:** OS notification mati  
**When:** Timer selesai  
**Then:**  
- App tidak error  
- Toast tetap muncul  

---

#### TC-NOTIF-02 — Toast Visibility
**Given:** Action penting terjadi  
**When:** State berubah  
**Then:**  
- Toast muncul  
- Bisa auto-dismiss  
- Tidak blocking UI  

---

## 🧠 Edge Case Checklist (Quick)

- [x] Todo kosong tidak bisa disubmit  
- [x] Timer pause tidak reset waktu  
- [x] Timer reset tidak double save  
- [x] Reload tidak merusak timer  
- [x] Toast tidak spam / dobel  
- [x] DB tidak corrupted

---