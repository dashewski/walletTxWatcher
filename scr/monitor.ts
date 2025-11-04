import { wsProvider } from "./utils/provider.ts";
import { checkBalance, checkTxs, loadBalances } from "./services/tsWatchers.ts";

setTimeout(() => loadBalances(),1500)

wsProvider.on("block", async (blockNumber: number) => {
  try {
    await checkBalance(blockNumber);
    await checkTxs(blockNumber);
  } catch (err) {
    console.error("Error handling block:", err);
  }
});
