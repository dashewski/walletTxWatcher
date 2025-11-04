import { provider, addresses } from "../utils/provider.ts";
import { ethers } from "ethers";
import { txDetected } from "../utils/logger.ts";
import type { Wallet } from "../types/types.ts";

let wallets: Wallet[] = [];

//starting with timeout of 1500ms in monitor.ts
export async function loadBalances(): Promise<Wallet[]> {
  wallets = await Promise.all(
    addresses.map(async (addr) => {
      const bal = await provider.getBalance(addr);
      console.log(
        `Watching for: ${addr}, his balance: ${ethers.formatEther(bal)} ETH`
      );
      return {
        address: addr,
        balance: bal,
      };
    })
  );

  return wallets;
}

//starting with every new block in monitor.ts
export async function checkBalance(blockNumber: number): Promise<void> {
  for (const wallet of wallets) {
    try {
      const currentBalance = await provider.getBalance(wallet.address);
      if (wallet.balance === currentBalance) {
        console.log(
          `New block ${blockNumber}. Address: ${wallet.address}, nothing changed`
        );
      } else {
        wallet.balance = currentBalance;
        console.log(
          `New block ${blockNumber}. Address: ${
            wallet.address
          }, balance changed: ${ethers.formatEther(wallet.balance)}`
        );
      }
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  }
}

//starting with every new block in monitor.ts
export async function checkTxs(blockNumber: number): Promise<void> {
  try {
    const block = await provider.getBlock(blockNumber, true);
    if (!block) return;
    for (const wallet of wallets) {
      const txsWatched = block.prefetchedTransactions.filter(
        (tx) => tx.from === wallet.address || tx.to === wallet.address
      );
      txsWatched.forEach((tx) => txDetected(tx));
    }
  } catch (error) {
    console.error(error);
  }
}
