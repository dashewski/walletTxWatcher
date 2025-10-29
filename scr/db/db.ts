import Database from "better-sqlite3";

export const db = new Database("db.db");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS txs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT,
      from_addr TEXT,
      to_addr TEXT,
      value REAL,
      timestamp TEXT
    )
  `
).run();


