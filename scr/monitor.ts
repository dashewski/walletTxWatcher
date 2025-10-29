import { wsProvider, provider } from "./utils/provider.ts";
import { checkBalance, checkTxs } from "./services/tsWatchers.ts";

// ws - для вебсокета (здесь постояный запрос), обычный provider для https (разовый)

wsProvider.on("block", async (blockNumber: number) => {
  try {
    await checkBalance();
    await checkTxs(blockNumber);
  } catch (err) {
    console.error("Error handling block:", err);
  }
});
