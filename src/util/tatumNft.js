// import { mintNFT } from '@tatumio/tatum'
// import { APP_NAME } from './constants'

// https://docs.tatum.io/guides/blockchain/how-to-create-nfts-on-solana
// https://www.quicknode.com/guides/web3-sdks/how-to-mint-an-nft-on-solana
export const mintSolanaNft = async (name, from, fromPrivateKey, to, imageUrl) => {

  // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
// let signature = await mintTo(
//   connection,
//   fromWallet,               // Payer of the transaction fees 
//   mint,                     // Mint for the account 
//   fromTokenAccount.address, // Address of the account to mint to 
//   fromWallet.publicKey,     // Minting authority
//   1                         // Amount to mint 
// );

// await setAuthority(
//   connection,
//   fromWallet,            // Payer of the transaction fees
//   mint,                  // Account 
//   fromWallet.publicKey,  // Current authority 
//   0,                     // Authority type: "0" represents Mint Tokens 
//   null                   // Setting the new Authority to null
// );

  // const res = await mintNFT(
  //   {
  //     from, // address
  //     to, // address
  //     fromPrivateKey,
  //     metadata: {
  //       "name": name,
  //       "symbol": APP_NAME,
  //       "sellerFeeBasisPoints": 0,
  //       "uri": imageUrl,
  //     }
  //   }
  // )
  // console.log('mint', res)
  // return res
  return {
    'test': true
  }
}