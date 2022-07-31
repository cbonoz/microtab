import React, { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { fetchMetadata, retrieveFiles } from "../util/stor";
import { mintSolanaNft } from "../util/tatumNft";
import Invoice from "./Invoice/Invoice";


function PayInvoice({ account, getPrivateKey, sendTransaction }) {
  const { invoiceId } = useParams(); // cid
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", invoiceId);
    if (!invoiceId) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetchMetadata(invoiceId);
      setData(res.data);
      console.log("invoice request", res.data);
    } catch (e) {
      console.error(e);
      alert("error getting signdata" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [invoiceId]);

  const authed = useMemo(() => {
    return data && (data.payerAddress || '').toLowerCase() === (account || '').toLowerCase()
  } ,[data, account])

  const { description, title, payerAddress } = data;

  const completePayment = async (amountSolana) => {
    let nftResults = {};

    setLoading(true);

    try {

      const transaction = await sendTransaction(amountSolana, payerAddress)
      console.log('tx', transaction)
      res['transaction'] = transaction

      const privateKey = await getPrivateKey()
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      let res = await mintSolanaNft(
        title,
        account,
        privateKey,
        payerAddress,
        `ipfs://${invoiceId}`
      );
      nftResults["signatureNft"] = res.data;
      const url = nftResults["transaction_external_url"];
      nftResults = { nftResults, ...res };
      
      setResult(nftResults);
    } catch (e) {
      console.error("error signing", e);
      alert("Error completing invoice: " + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="centered">
        <p>
          You are not logged in with the expected user for this invoice
          contract.
          <br />
          <b className="error-text">
            Please log in with address: {payerAddress}
          </b>
        </p>

        <p>
          <a href="/">Return to home</a>
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="container">
        {/* <img src={logo} className="header-logo" /> */}
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>Access your completed solana contract and signature packet.</p>

        {/* <a href={getExplorerUrl(contractAddress)} target="_blank">
          View Contract
        </a> */}
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div className="container boxed white">
      <h2 className="centered">Pay Invoice</h2>
      <br />
      <Invoice {...data} account={account} invoiceId={invoiceId} completePayment={completePayment} />
    </div>
  );
}

export default PayInvoice;
