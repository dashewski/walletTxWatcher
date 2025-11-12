import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config({ path: "../.env" });

export const wsProvider = new ethers.WebSocketProvider(
  `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);

export const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);

export const addresses: string[] = [
  "0x0FfD1b0ec35FD44873726E0Cd3B8675134531F75",
  "0x6452A6733a3D36522289A11Fa5Bbb8b9fc47d2F5",
];

export const tokensAdresses: string[] = [
  "0xC364dc740ecB6C411aE0de8e130c0199bA875724",
  "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  "0x779877A7B0D9E8603169DdbD7836e478b4624789"
];
