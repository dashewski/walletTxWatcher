import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
export const wsProvider = new ethers.WebSocketProvider(
  `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);

export const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);
export const address = process.env.WATCH_ADDRESS;