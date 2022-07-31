import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Input } from "antd";
import { getExplorerUrl, ipfsUrl } from "../util";
import { ACTIVE_CHAIN } from "../util/constants";

function Packet(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const sigCanvas = useRef();

  const {
    signId,
    contractAddress,
    authed,
    signerAddress,
    loading,
    sign,
    title,
    files,
  } = props;

  const postSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    sign(dataUrl);
  };

  const openUrl = (url) => window.open(url, "_blank");
  console.log("authorized", authed);

  if (!authed) {
    return (
      <div className="centered">
        <p>
          You are not logged in with the expected user for this invoice
          contract.
          <br />
          <b className="error-text">
            Please log in with address: {signerAddress}
          </b>
        </p>

        <p>
          <a href="/">Return to home</a>
        </p>
      </div>
    );
  }

  const filesToSign = files || [];
  console.log('files', filesToSign)

  return (
    <div>
      {/* <div>{JSON.stringify(props, null, "\t")}</div> */}
      <div>
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
      </div>
      <div>
        <a href={getExplorerUrl(contractAddress)} target="_blank">
          View Contract ({ACTIVE_CHAIN.name})
        </a>
        <br />
        <a href={ipfsUrl(signId, 'metadata.json')} target="_blank">
          View Request
        </a>
      </div>

      <br />
      <h3>Documents to acknowledge: </h3>
      {filesToSign.map((f, i) => {
        return (
          <li key={i}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openUrl(ipfsUrl(signId, f));
              }}
            >
              {f}
            </a>
          </li>
        );
      })}
      <br />
      <br />
      <p>
        By continuing, you agree to the documents listed and available for
        download above.
      </p>
      <Button
        type="primary"
        onClick={() => completePayment(true)}
        disabled={!authed || filesToSign.length === 0}
      >
        Complete payment
      </Button>

    </div>
  );
}

export default Packet;
