import { db } from "../db/db.ts";

const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO txs
  (hash, from_addr, to_addr, value, timestamp)
  VALUES (?, ?, ?, ?, ?)
`);

export function saveTx(tx) {
  try {
    const info = insertStmt.run(
      tx.hash,
      tx.from,
      tx.to ?? null,
      tx.valueEth,               
      tx.timestamp
    );
    return info;
  } catch (err) {
    console.error("DB save error:", err);
    throw err;
  }
}