<p align='center'>
    <img src='./img/logo_3_2.png' width=400/>
</p>

Microtab

###

Microtab is a web3 implementation of invoice collection built on Solana and IPFS.

* Free invoice request page hosting on IPFS
* Code-free payment requests. No API integrations required.
* History tracked on blockchain rather than a centralized source.
* Microtab fees collected only when you get paid. Not when you request.
* NFT minted on every invoice fulfillment.
* Uses Solana which enables fast transaction times, low fees, and easy wallet connections.

Going after the payments and web3 tracks at the Solana Summercamp Hackathon 2022.

<!-- Try it out <a href="microtab.surge.sh" target="_blank">here</a>

Demo video:  -->

*Zero fees on testnet demo.

### Benefits

- Microtab enables anyone to create and collect invoice against documents without a vendor agreement.
- Each packet of documents for an invoice is made accessible at an IPFS url.
- When the invoice is completed, an NFT is generated that links both the invoice payment to the original request being fulfilled.
- Hosted documents and the request are immutable.

### Technologies used

- IPFS: Generation of the invoice record / proof. NFT storage also used for final NFT mint with receipt image.
- Solana: In-app payment of the request and marked completed upon payment of the each request based on receival of desired payers payment.

<!-- <b>This project is a hackathon prototype and would require additional work / deployment to be production ready. -->

---

To run/demo the project locally, Microtab requires the following environment variables.

<pre>
    REACT_APP_STORAGE_KEY={YOUR_WEB3_STORAGE_KEY} # web3.storage key for file hosting.
    REACT_APP_NFT_KEY={YOUR_NFT_STORAGE_KEY} # (Optional) nft.storage key for receipt nft minting.
</pre>

---

After declaring the above environment variables, use the below command to start the project:
`yarn; yarn start`

Example invoice request:
http://localhost:3000/invoice/bafybeigr4hzkldrbyrxzblzzsqixksqfd6tzew2xbjebjgclpa6tdofywq

### Screenshots

#### Home page / Login

<img src="./img/login1.png" width=800 />
<br/>
<img src="./img/login2.png" width=800 />

#### Creating a invoice request

<img src="./img/create.png" width=800 />


### Viewing a created invoice url (authorized). 

<p>Each url is dynamically rendered based on assets and data on IPFS</p>

<img src="./img/checkout.png" width=800 />

### Created invoice (unauthorized)

<img src="./img/unauth.png" width=800 />


### Sending payment

<p>Payment is processed by Solana, offering low fees and quick transaction times. Once payment settles a receipt and transaction url are both provided to the payer.</p>

<img src="./img/process.png" width=800 />

### Done

<img src="./img/done.png" width=800 />

### Completed invoice NFT

<img src="./img/ipfs.png" width=800 />

### Completed transaction

<img src="./img/tx.png" width=800 />

### Useful links
* https://web3auth.io/docs/integration-builder?lang=react&chain=sol&customAuthentication=yes&whitelabel=no&dynamicConstructorParams=no&usingEmailPasswordless=no&rnWorkflowMode=expo&evmFramework=web3&customLogin=yes#step-3