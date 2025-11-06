import { provider, addresses } from "../utils/provider.ts";
import { ethers } from "ethers";
import { txDetected } from "../utils/logger.ts";
import type { Wallet } from "../types/types.ts";
import { log } from "../utils/logStyler.ts";
import chalk from "chalk";
import type { TxData } from "../types/types.ts";

let wallets: Wallet[] = [];

//starting with timeout of 1500ms in monitor.ts
export async function loadBalances(): Promise<Wallet[]> {
  wallets = await Promise.all(
    addresses.map(async (addr) => {
      const bal = await provider.getBalance(addr);
      console.log(
        chalk.bgBlack.bold.yellow(
          `Watching for: ${addr}, his balance: ${ethers.formatEther(bal)} ETH`
        )
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
          chalk.cyan(
            `New block ${blockNumber} without important info`
          )
        );
      } else {
        wallet.balance = currentBalance;
        log.block(blockNumber);
        log.balanceChange(wallet.address, wallet.balance)
      }
    } catch (error) {
      console.error("Error checking balance:", error);
    }}
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
      txsWatched.forEach((tx) => {
        const txData: TxData = {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          valueEth: tx.value,
          timestamp: new Date().toISOString(),
        };
        txDetected(txData);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
