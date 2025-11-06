import chalk from "chalk";

export const log = {
    block: (block: number) =>
      console.log(chalk.magenta(`[BLOCK] #${block}`)),
    address: (addr: string) =>
      console.log(chalk.cyan(`[WATCH] ${addr}`)),
    fromTo: (to: string, from: string) =>
      console.log(chalk.cyan(`[SENDING] from ${from} => to ${to}`)),
    balanceChange: (addr: string, bal: bigint | string) =>
      console.log(chalk.yellow(`[BALANCE] ${addr} → ${bal} ETH`)),
    tx: (hash: string, value: string) =>
      console.log(chalk.green(`[TX] ${hash.slice(0, 10)}... (${value} ETH)`)),
    error: (err: Error) =>
      console.error(chalk.red(`[ERROR] ${err.message}`)),
  };

