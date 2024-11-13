🚀 CLI Bot to Wrap Your SOL to wSOL

This guide will help you run the SOL to wSOL bot, covering both testing in Devnet and deploying it on Mainnet.

🧪 Test the Bot in Devnet
Testing in Devnet allows you to safely verify the bot’s functionality without using real assets. Follow these steps:

Update RPC URL to Devnet

Open the index.ts file and set the RPC URL to Devnet to use test tokens:

const RPC_URL = clusterApiUrl("devnet"); // Devnet URL for testing purposes
Set the amount of SOL you want to wrap:

const amountToWrap = 1; // Set the desired amount here
Fund Your Wallet with Test SOL

Visit the Solana Devnet Faucet and enter your wallet address to receive test SOL.
Run the Bot on Devnet

After configuring the RPC URL and funding your wallet, execute the bot script to run it on Devnet:

npm run start

🌐 Run the Bot on Mainnet
After successful testing in Devnet, you can proceed to use it on Mainnet to handle real SOL. Follow these steps:

Update RPC URL to Mainnet

Open the index.ts file and set the RPC URL to Mainnet to use real tokens:

const RPC_URL = clusterApiUrl("mainnet-beta"); // Mainnet URL
Set the amount of SOL you want to wrap:

const amountToWrap = 1; // Set the desired amount here
Run the Bot on Mainnet

Execute the bot script to wrap SOL on Mainnet:

npm run start

💡 Tips
Ensure you have enough SOL to cover both the amount being wrapped and the transaction fees.

Use Solana Explorer to verify the status of your transactions.
