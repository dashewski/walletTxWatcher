import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config({ path: "../.env" });

export const wsProvider = new ethers.WebSocketProvider(
  `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);

export const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);

export const addresses: string[] = ["0x0FfD1b0ec35FD44873726E0Cd3B8675134531F75", "0x6452A6733a3D36522289A11Fa5Bbb8b9fc47d2F5"]