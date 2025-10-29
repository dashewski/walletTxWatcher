import { wsProvider, provider, address } from "../utils/provider.ts";
import { ethers } from "ethers";
import { saveTx } from "../db/repoTx.ts";

export function txDetected(txs) {
  const valueEth = Number(ethers.formatEther(txs.value));
  const timestamp = new Date().toISOString();
  console.log("New block confirmed. Something heppends:", {
    hash: txs.hash,
    from: txs.from,
    to: txs.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp
  });
  saveTx({
    hash: txs.hash,
    from: txs.from,
    to: txs.to ?? null,
    valueEth: valueEth,
    timestamp: timestamp
  });
}

 
