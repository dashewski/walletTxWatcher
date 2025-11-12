export interface Wallet {
    address: string;
    balance: bigint;
  }


export interface TxData {
    hash: string;
    from: string;
    to: string | null;
    valueEth: bigint;
    timestamp: string;
  }

export interface Token {
  contract: string,
  symbol: string,
  decimals: number;
}

