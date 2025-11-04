import { ethers } from "ethers";
import { saveTx } from "../db/repoTx.ts";
import type { TxData } from "../types/types.ts";


//starting with founded txs in tsWatchers.ts
export function txDetected(tx: TxData) {
  const valueEth = Number(ethers.formatEther(tx.valueEth));
  const timestamp = new Date().toISOString();
  console.log("New block confirmed. Something heppends:", {
    hash: tx.hash,
    from: tx.from,
    to: tx.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp,
  });
  saveTx({
    hash: tx.hash,
    from: tx.from,
    to: tx.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp,
  });
}
