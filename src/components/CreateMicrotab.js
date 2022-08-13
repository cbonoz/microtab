import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Result, Steps, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { invoiceUrl, ipfsUrl, getExplorerUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { storeFiles } from "../util/stor";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

function CreateMicrotab({account}) {
  const [data, setData] = useState({ ...EXAMPLE_FORM })
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    if (!account) {
      navigate('/')
    } else {
      updateData("remittanceAddress", account)
    }
  }, [account])

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return (
      data.title &&
      data.description &&
      data.amount && data.amount > 0 &&
      data.payerAddress &&
      data.remittanceAddress
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide an invoice title, description, valid amount, and valid payer address."
      );
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = (body.files || []).map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      // const contract = await deployContract(data.title, data.signerAddress);
      // res["contract"] = contract;
      // res["address"] = contract.address
      res["files"] = files.map(f => f.path)

      const blob = new Blob([JSON.stringify(res)], { type: 'application/json' })
      const metadataFile = new File([blob], 'metadata.json')
      const allFiles = [...files, metadataFile]

      // 2) Upload files to ipfs,
      const cid = await storeFiles(allFiles);
      res['cid'] = cid

      // 3) return shareable url.
      res["invoiceUrl"] = invoiceUrl(cid);
      // res["contractUrl"] = getExplorerUrl(res.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
      try {
        // await postPacket(res.invoice request);
      } catch (e) {
        console.error("error posting invoice request", e);
      }
    } catch (e) {
      console.error("error creating invoice request", e);
      setError(e.message || e.toString())
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  const openTab = (url) => window.open(url, '_blank')

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Create new invoice request</h2>
            <br />

            <h3 className="vertical-margin">Invoice request title:</h3>
            <Input
              placeholder="Title of the invoice request"
              value={data.title}
              prefix="Title:"
              onChange={(e) => updateData("title", e.target.value)}
            />
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the invoice request"
              prefix="Description"
              value={data.description}
            />

            <Input
              placeholder="USD amount of the invoice request"
              value={data.amount}
              prefix="Amount ($):"
              onChange={(e) => updateData("amount", e.target.value)}
            />
            <br/>
            <p>USD will automatically be translated to {data.currency} at the time of invoice payment.</p>
            {/* <Input
              disabled
              placeholder="Currency of payment" 
              value={data.currency}
              prefix="Currency:"
              onChange={(e) => updateData("currency", e.target.value)}
            /> */}

            {/* TODO: add configurable amount of items */}
            <h3 className="vertical-margin">Upload documents to include for the payer:</h3>
            <FileDrop
              files={data.files}
              setFiles={(files) => updateData("files", files)}
            />

            <h3 className="vertical-margin">Payment information:</h3>
            <p>
              In order to fulfill or complete the invoice, the viewer or
              potential payer of the invoice must prove ownership of a
              particular address. Payment will automatically be sent to your current address upon fulfillment.
            </p>

            <Input
              placeholder="Wallet address of payer"
              value={data.payerAddress}
              prefix="Payer Address:"
              onChange={(e) => updateData("payer", e.target.value)}
            />
            <br/>
            <Input
              placeholder="Remittance address"
              value={data.remittanceAddress}
              disabled
              prefix="Paid to:"
              onChange={(e) => updateData("payer", e.target.value)}
            />
            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Create invoice request!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && 
          <div>
              <Result
              status="success"
              title="Created invoice request"
              subTitle={`Invoice number: ${result.cid} has been created. Share the invoice url with the potential buyer`}
              extra={[
                <Button type="primary" key="console" onClick={() => openTab(result.invoiceUrl)}>
                  Open Invoice url
                </Button>,
                <Button key="metadata" onClick={() => openTab(ipfsUrl(result.cid))}>View metadata</Button>,
              ]}
            ></Result>
            </div>}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create invoice request"
                description="Requires authorizing a create invoice request operation."
              />
              <Step
                title="Wait for invoice"
                description="Your invoice request will be live for others to view and submit payment."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateMicrotab.propTypes = {};

export default CreateMicrotab;
