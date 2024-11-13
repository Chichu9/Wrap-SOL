CLi Bot to Wrap your SOl to wSOL


Test the Bot in Devnet

Testing in Devnet allows you to safely verify the bot's functionality without using real assets. Follow these steps:

Open the index.ts file and set the RPC URL to Devnet to use test tokens:

"const RPC_URL = clusterApiUrl("devnet"); // Devnet URL for testing purposes"

"const amountToWrap = 1; // Set the desired amount here"

Fund Your Wallet with Test SOL

Visit the Solana Devnet Faucet and enter your wallet address to receive test SOL.

After configuring the RPC URL and funding your wallet, execute the bot script to run it on Devnet:

command to run the bot: npm start run

To run this Mainnet

Open the index.ts file and set the RPC URL to Devnet to use test tokens:

"const RPC_URL = clusterApiUrl("mainnet-beta"); // Devnet URL for testing purposes"

"const amountToWrap = 1; // Set the desired amount here"

command to run the bot: npm start run

