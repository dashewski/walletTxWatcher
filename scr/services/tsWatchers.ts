import { wsProvider, provider, address } from "../utils/provider.ts";
import { ethers } from "ethers";
import { txDetected } from "../utils/logger.ts";

let prevBalance = await provider.getBalance(address as string);
console.log(`Отслеживание: ${address}, баланс: ${ethers.formatEther(prevBalance)}`)

export async function checkBalance(): Promise<void> {
  try {
    const currentBalance = await provider.getBalance(address as string);
    if (prevBalance === currentBalance) {
      console.log("New block confirmed. No changing in watched wallets");
    } else {
      prevBalance = currentBalance;
      console.log(
        `Balance changed. New balance ${ethers.formatEther(prevBalance)}`
      );
    }
  } catch (error) {
    console.error("Error checking balance:", error);
  }
}

export async function checkTxs(blockNumber: number): Promise<void> {
try {
    const block = await provider.getBlock(blockNumber,true)
    if (block) {
        const txsWatched = block.prefetchedTransactions.filter(tx => tx.from === address || tx.to === address)
        txsWatched.forEach(tx => (txDetected(tx)));
    }
} catch (error) {
    console.error(error)
}
}
    
