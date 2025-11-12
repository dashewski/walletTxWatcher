import { wsProvider } from "./utils/provider.ts";
import { checkBalance, checkTxs, loadBalances} from "./services/tsWatchers.ts";
import { createTokenList } from "./services/tokenListParcing.ts";


async function main() {
  // load balances after short delay
  setTimeout(() => loadBalances(), 1500);

  // parsing tokens
  createTokenList();  

  wsProvider.on("block", async (blockNumber: number) => {
    try {
      await checkBalance(blockNumber);
      await checkTxs(blockNumber);
    } catch (err) {
      console.error("Error handling block:", err);
    }
  });
}

main().catch(console.error);