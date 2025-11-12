import { ethers } from "ethers";
import { provider, tokensAdresses } from "../utils/provider.ts";
import type { Token } from "../types/types";
import fs from "fs";

const ERC20_ABI: string[] = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
];

async function fetchTokenInfo(address: string): Promise<Token | null> {
  try {
    const contract = new ethers.Contract(address, ERC20_ABI, provider);
    const [symbol, decimals] = await Promise.all([
      contract.symbol(),
      contract.decimals(),
    ]);
    return {
      contract: address,
      symbol,
      decimals: Number(decimals)
    };
  } catch (error) {
    console.error("Something wrong with tokenInfo parcing:", error);
    return null;
  }
}

export async function createTokenList(): Promise<Token[]> {
  const tokenInfos = await Promise.all(tokensAdresses.map(fetchTokenInfo));
  const tokens = tokenInfos.filter((t): t is Token => t !== null);
  const uniqueTokens = tokens.filter(
    (t, index, self) =>
      index === self.findIndex((tok) => tok.contract === t.contract)
  );
  return uniqueTokens;
}

(async () => {
  const uniqueTokens = await createTokenList();
  fs.writeFileSync("tokenList.json", JSON.stringify(uniqueTokens, null, 2));
  console.log("✅ Token list saved!");
})();