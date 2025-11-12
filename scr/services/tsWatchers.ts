import { provider, addresses } from "../utils/provider.ts";
import { ethers } from "ethers";
import type { Wallet } from "../types/types.ts";
import { log } from "../utils/logStyler.ts";
import chalk from "chalk";
import fs from "fs";
import type { Token } from "../types/types.ts";

let wallets: Wallet[] = [];
const tokenList: Token[] = JSON.parse(
  fs.readFileSync("tokenList.json", "utf-8")
);

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
  console.log(chalk.yellowBright(`Processing...new block ${blockNumber}`));

  for (const wallet of wallets) {
    try {
      const currentBalance = await provider.getBalance(wallet.address);
      if (wallet.balance != currentBalance) {
        const balanceInEth = ethers.formatEther(currentBalance);
        wallet.balance = currentBalance;
        log.block(blockNumber);
        log.balanceChange(wallet.address, balanceInEth);
      } else {
        console.log(
          chalk.bgBlackBright(`Nothing changed for ${wallet.address}`)
        );
      }
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  }
}

//starting with every new block in monitor.ts, check all txs, and special token transfers with watched tokens
export async function checkTxs(blockNumber: number): Promise<void> {
  try {
    const block = await provider.getBlock(blockNumber, true);
    if (!block) return;
    for (const wallet of wallets) {
      const txsWatched = block.prefetchedTransactions.filter(
        (tx) => tx.from === wallet.address || tx.to === wallet.address
      );
      for (const tx of txsWatched) {
        const receipt = await provider.getTransactionReceipt(tx.hash);
        if (receipt !== null) {
          for (const logEvent of receipt.logs) {
            const token = tokenList.find(
              (t) => t.contract.toLowerCase() === logEvent.address.toLowerCase()
            );
            if (!token) continue;
            if (
              logEvent.topics[0] !==
              ethers.id("Transfer(address,address,uint256)")
            )
              continue;
            const iface = new ethers.Interface([
              "event Transfer(address indexed from, address indexed to, uint256 value)",
            ]);

            const parsed = iface.parseLog(logEvent);
            if (parsed !== null) {
              const from = parsed.args.from.toLowerCase();
              const to = parsed.args.to.toLowerCase();
              const value = Number(parsed.args.value) / 10 ** token.decimals;
              console.log(`💸 [${token.symbol}] ${value} from ${from} to ${to}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
