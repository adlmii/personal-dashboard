import Database from "@tauri-apps/plugin-sql";

const DB_NAME = "personal-dashboard.db";

export const initDB = async () => {
  const db = await Database.load(`sqlite:${DB_NAME}`);

  // Tabel migrasi
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY,
      version INTEGER NOT NULL
    );
  `);

  const result: any[] = await db.select("SELECT MAX(version) as v FROM _migrations");
  const currentVersion = result[0]?.v || 0;

  console.log(`Current DB Version: ${currentVersion}`);

  // --- MIGRASI ToDo ---
  if (currentVersion < 1) {
    try {
      await db.execute("BEGIN TRANSACTION");
      
      await db.execute(`
        CREATE TABLE IF NOT EXISTS todos (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          status TEXT CHECK(status IN ('backlog', 'today', 'done')) DEFAULT 'backlog',
          priority INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          completed_at DATETIME
        );
      `);
      
      await db.execute("INSERT INTO _migrations (version) VALUES (1)");
      await db.execute("COMMIT");
      console.log("Migration v1 Success");
    } catch (error) {
      await db.execute("ROLLBACK"); // Batalkan semua kalau error
      console.error("Migration v1 Failed:", error);
      throw error;
    }
  }

  // --- MIGRASI Pomodoro ---
  if (currentVersion < 2) {
    try {
      await db.execute("BEGIN TRANSACTION");
      
      await db.execute(`
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          todo_id TEXT,
          duration INTEGER NOT NULL,
          started_at DATETIME NOT NULL,
          ended_at DATETIME NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT 0,
          FOREIGN KEY(todo_id) REFERENCES todos(id)
        );
      `);

      await db.execute("INSERT INTO _migrations (version) VALUES (2)");
      await db.execute("COMMIT");
      console.log("Migration v2 Success");
    } catch (error) {
      await db.execute("ROLLBACK");
      console.error("Migration v2 Failed:", error);
      throw error;
    }
  }

  return db;
};