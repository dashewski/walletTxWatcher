import { ethers } from "ethers";
import { saveTx } from "../db/repoTx.ts";

//starting with founded txs in tsWatchers.ts
export function txDetected(tx) {
  const valueEth = Number(ethers.formatEther(tx.value));
  const timestamp = new Date().toISOString();
  console.log("New block confirmed. Something heppends:", {
    hash: tx.hash,
    from: tx.from,
    to: tx.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp
  });
  saveTx({
    hash: tx.hash,
    from: tx.from,
    to: tx.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp
  });
}

 
