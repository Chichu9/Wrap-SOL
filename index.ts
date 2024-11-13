// Built by Tachyon Labs

// Import necessary libraries
import { Connection, Keypair, SystemProgram, Transaction, clusterApiUrl, PublicKey, Commitment } from "@solana/web3.js";
import {
  NATIVE_MINT,
  createSyncNativeInstruction,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { decode } from "bs58";
import 'dotenv/config';

// Print signature in console
console.log("====================================================");
console.log("          Built by Tachyon Labs          ");
console.log("====================================================\n");

// Load private key from environment variable
const privateKey = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : '';
if (!privateKey) {
  throw new Error("Missing PRIVATE_KEY in environment variables");
}
const wallet = Keypair.fromSecretKey(decode(privateKey));

// Constants
const LAMPORTS_PER_SOL = 1_000_000_000;
const RPC_URL = clusterApiUrl("mainnet-beta"); // Switch to mainnet URL

// Function to convert SOL to wSOL
async function convertSolToWsol(amountInSol: number) {
  try {
    // Convert the amount from SOL to Lamports
    const amountInLamports = amountInSol * LAMPORTS_PER_SOL;

    // Establish a connection to the Solana cluster with a custom commitment level
    const connection = new Connection(RPC_URL, "confirmed");

    // Get the latest blockhash for transaction confirmation
    const latestBlockhash = await connection.getLatestBlockhash({ commitment: "confirmed" });

    // Get or create the associated token account for wSOL
    console.log("Fetching associated token account...");
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      NATIVE_MINT, // Mint address for wSOL
      wallet.publicKey,
      false,
      "confirmed"
    );
    console.log(`Associated Token Account for wSOL: ${associatedTokenAccount.address.toBase58()}`);

    // Create a transaction to transfer SOL and sync it as wSOL
    console.log("Creating transaction to transfer SOL and sync as wSOL...");
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: associatedTokenAccount.address,
        lamports: amountInLamports,
      }),
      createSyncNativeInstruction(associatedTokenAccount.address)
    );

    // Set transaction details
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey;

    // Sign and send the transaction
    console.log("Signing and sending transaction...");
    const signedTransaction = await connection.sendTransaction(transaction, [wallet], {
      skipPreflight: false,
      preflightCommitment: "processed",
    });

    console.log(`Transaction submitted. Signature: ${signedTransaction}`);

    // Retry confirmation to handle slow confirmations on mainnet
    const maxRetries = 5;
    let retryCount = 0;
    let confirmed = false;
    while (retryCount < maxRetries && !confirmed) {
      try {
        console.log(`Attempting to confirm transaction... (Retry ${retryCount + 1} of ${maxRetries})`);
        const confirmation = await connection.confirmTransaction(signedTransaction, "finalized");

        if (confirmation.value.err) {
          console.error("Transaction failed: ", confirmation.value.err);
          break;
        } else {
          console.log(`Transaction confirmed. SOL successfully wrapped to wSOL.`);
          confirmed = true;
        }
      } catch (error) {
        console.warn("Error confirming transaction, retrying...", error);
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }

    if (!confirmed) {
      console.error(`Transaction could not be confirmed after ${maxRetries} attempts. Check the transaction signature: ${signedTransaction}`);
    }

  } catch (error) {
    console.error("Error during SOL to wSOL conversion:", error);
  }
}

// Set the amount of SOL to wrap
const amountToWrap = 1; // Set the desired amount here
convertSolToWsol(amountToWrap);
