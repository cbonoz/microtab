import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { SolanaWallet } from "@web3auth/solana-provider";

// https://web3auth.io/docs/connect-blockchain/solana
export async function sendTransaction(provider, amount, destination) {
  const solanaWallet = new SolanaWallet(provider);

  const connectionConfig = await solanaWallet.request({
    method: "solana_provider_config",
    params: [],
  });
  
  const connection = new Connection(connectionConfig.rpcTarget);
  
  const accounts = await solanaWallet.requestAccounts();
  const blockhash = (await connection.getRecentBlockhash("finalized")).blockhash;
  const fromPubkey = new PublicKey(accounts[0]);
  const TransactionInstruction = SystemProgram.transfer({
    fromPubkey,
    toPubkey: new PublicKey(destination),
    lamports: amount * LAMPORTS_PER_SOL,
  });
  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: fromPubkey,// new PublicKey(pubKey[0]),
  }).add(TransactionInstruction);
  
  const signedTx = await solanaWallet.signAndSendTransaction(transaction);
  console.log(signedTx.signature); 
  return signedTx.signature;
}