import type { TxData } from "../types/types.ts";
import { saveTx } from "../db/repoTx.ts";
import { log } from "./logStyler.ts";
import { ethers } from "ethers";

export function txDetected(tx: TxData) {
  const valueEth = Number(ethers.formatEther(tx.valueEth ?? 0n)); 
  const timestamp = tx.timestamp ?? new Date().toISOString();

  log.fromTo(tx.from, tx.to ?? "null");
  log.tx(tx.hash, valueEth.toString());

  saveTx({
    hash: tx.hash,
    from: tx.from,
    to: tx.to ?? null,
    valueEth,
    timestamp,
  });
}
