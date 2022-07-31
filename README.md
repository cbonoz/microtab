<p align='center'>
    <img src='./img/logo_3_2.png' width=400/>
</p>

Microtab

###

Microtab is a web3 implementation of invoice collection built on Solana smart contracts and IPFS.

Free invoice request page hosting on IPFS
Code-free payment requests. No API integrations required.
History tracked on blockchain rather than a centralized source.
Microtab fees collected only when you get paid. Not when you request.
NFT minted on every invoice fulfillment.

Going after the payments and web3 tracks at the Solana Summercamp Hackathon 2022.

<!-- Try it out <a href="microtab.surge.sh" target="_blank">here</a>

Demo video:  -->

### Benefits

- Microtab enables anyone to create and collect invoice against documents without a vendor agreement. A solana smart contract is deployed for each request.
- Each packet of documents for invoice is made accessible at an IPFS url.
- When the invoice is completed, an NFT is generated that links both the payer's payment and the items being fulfilled.
- Hosted documents and the request are immutable.
- Smart contract deployed on Solana which marks the progress/fulfillment of the invoice request. The contract can only be marked completed by the designated invoicee address at time of final signature.
- View history of requests and completed invoices using the covalent chain history API directly from the app.
- An individual in the context of the Microtab application is the pairing of a canvas (handwritten) signature and wallet signature/address.

### Technologies used

- Covalent: Enables in-app history queries of past invoice requests and fulfillment for a given solana address.
- NFTPort: Generation of the invoice record / proof. Attaches the final invoice/agreement to an NFT and saves a link to it in the smart contract.
- Solana: In-app deployment of the request smart contract and marked completed upon completion of the each request based on receival of signer's signature. A new Solana contract is deployed for each new invoice request.

<!-- <b>This project is a hackathon prototype and would require additional work / deployment to be production ready. -->

---

To run/demo the project locally, Microtab requires the following environment variables.

<pre>
    REACT_APP_STORAGE_KEY={YOUR_WEB3_STORAGE_KEY} # web3.storage key for file hosting.
</pre>

---

After declaring the above environment variables, use the below command to start the project:
`yarn; yarn start`

Recompiling Microtab contract:
`cd contracts; npx hardhat compile`

Example invoice requests contracts:
http://localhost:3000/sign/QmUAS9XJyf9gPgadoVeExESiVnVJmVJW6qtcU4dzJzwG96

<!--
Sponsors:
Solana - Deploys a smart contract for esign.
Covalent - Signature history.
NFTport - Signature NFT creation on solana.

Demo flow:
Show docusign site / discuss industry baseline
Show Microtab.
Create an esign request
Submit (Can be metamask or sequence wallet)
Show result (solana contract)
View the completed assets (solana, contract interaction, nftport)
History page (covalent, look up a given contract owner's request/collection history)
Github


### Screenshots

#### Home page

<img src="./img/microtab.png" width=800 />

#### Creating a request

<img src="./img/create.png" width=800 />

### Request saved via IPFS (both the docs and request metadata).

<img src="./img/ipfs_docs.png" width=800 />

### Esigning

<img src="./img/esign.png" width=800 />

### Both the creation of the request and the signature get saved as events on a smart contract

<img src="./img/transactions.png" width=800 />

### Completion invoice NFT

<img src="./img/nft.png" width=800 />

### Deployed Contract

<img src="./img/contract.png" width=800 />

### Contract source

<img src="./img/sol.png" width=800 />

### Viewing signing history via Covalent.

<img src="./img/history.png" width=800 />

-->

### Useful links
* https://web3auth.io/docs/integration-builder?lang=react&chain=sol&customAuthentication=yes&whitelabel=no&dynamicConstructorParams=no&usingEmailPasswordless=no&rnWorkflowMode=expo&evmFramework=web3&customLogin=yes#step-3
* 