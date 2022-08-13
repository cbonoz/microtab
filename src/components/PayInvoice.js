import React, { useState, useEffect, useMemo } from "react";
import { Button, Result, Spin } from "antd";
import { useParams } from "react-router-dom";
import { fetchMetadata, retrieveFiles, storeNFT } from "../util/stor";
import Invoice from "./Invoice/Invoice";
import { sendTransaction } from "../util/solana";
import { getExplorerUrl, ipfsUrl } from "../util";
import { NFT_STORAGE_KEY } from "../util/constants";


function PayInvoice({ account, provider  }) {
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

  const completePayment = async (amountSolana, destination) => {
    let res = {}
    let nftResult = {}

    setLoading(true);

    try {

      const transaction = await sendTransaction(provider, amountSolana, destination)
      console.log('tx', transaction)
      res['transaction'] = transaction

      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      if (NFT_STORAGE_KEY) {
        nftResult = await storeNFT(
          `Receipt for Invoice - ${title} (${invoiceId})`,
          `Paid by ${account}`,
        );
        res["invoiceNft"] = nftResult;
      }
      setResult(res);
    } catch (e) {
      console.error("error signing", e);
      alert("Error completing invoice: " + e.toString());
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
        <Result
        status="success"
          title="Transaction complete!"
        subTitle="Access your completed Solana invoice NFT and payment transaction url."
        extra={[
          <Button type="primary" key="transaction" onClick={() => window.open(getExplorerUrl(result.transaction, true), "_blank")}>
            View transaction
          </Button>,
            <Button type="secondary" key="transaction" onClick={() => window.open(ipfsUrl(result.invoiceNft.ipnft, 'metadata.json'), "_blank")}>
            View NFT receipt
          </Button>,
        ]}
        >
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
</Result>
      </div>
    );
  }

  return (
    <div className="container boxed white">
      <h2 className="centered">Pay Invoice</h2>
      <br />
      <Invoice invoiceId={invoiceId} {...data} account={account} invoiceId={invoiceId} completePayment={completePayment} />
    </div>
  );
}

export default PayInvoice;
