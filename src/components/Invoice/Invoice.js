import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Tooltip, Modal, Input, Result, Empty } from "antd";
import React, { useState, useMemo, useEffect } from "react";
import logo from "../../assets/logo.png";
import { abbreviate, formatMoney, getDateStringFromTimestamp, getExplorerUrl, isEmpty } from "../../util";
import { getRates } from "../../util/coins";
import { ACTIVE_CHAIN, APP_NAME } from "../../util/constants";

import "./Invoice.css";

const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

// github.com/sparksuite/simple-html-invoice-template
function Invoice({
  title,
  account,
  payerAddress,
  remittanceAddress,
  logoUrl,
  ref,
  createdAt,
  paid,
  description,
  completePayment,
  files,
  amount,
  invoiceId
}) {
  const [rates, setRates] = useState()

  const total = amount;

  async function fetchRates() {
    try {
      const {data} = await getRates()
      setRates(data)
      console.log('rates', data)
    } catch (e) {
      console.error('err getting rates', e)
    }
  }

  useEffect(() => {
    fetchRates() 
  }, [])

  const amountString = `${formatMoney(total)} USD`
  const solanaString = rates && total*rates.SOL

  const hasFiles = !isEmpty(files)

  return (
    <div className="invoice-box" ref={ref}>
      {/* <p>
        <b>Transaction Complete! Please print this page.</b>
      </p> */}
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                    <img
                      src={logoUrl || logo}
                      style={{ width: "100%", maxWidth: IMG_WIDTH }}
                    />
                  </td>

                  <td>
                    Purchase #:&nbsp;
                    <Tooltip
                      placement="top"
                      title={<span>{invoiceId}</span>}
                    >
                      {invoiceId.slice(0, 16)}
                    </Tooltip>
                    <br />
                    Created:&nbsp;
                    {getDateStringFromTimestamp(createdAt || Date.now(), true)}
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                    {title && <span><b>{title}</b><br/></span>}
                    Fulfilled by {APP_NAME}, Inc.
                    <br />
                    {/* 12345 Sunny Road */}
                  </td>

                  <td>
                  <Tooltip
                      placement="top"
                      title={<span>{account}</span>}
                    >
                    Your account: {abbreviate(account)}<br/>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title={<span>{remittanceAddress}</span>}
                    >
                      <a href={getExplorerUrl(remittanceAddress)} target="_blank">
                    Payable to: {abbreviate(remittanceAddress)}
                    </a>
                    </Tooltip>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          {description && <p>&nbsp;{description}</p>}

    
          {hasFiles && <><tr className="heading">
            <td>File</td>
            <td>Link</td>
            <td></td>
          </tr>

          {(files || []).map(({ name, url }, i) => (
            <tr className="item" key={i}>
              <td>{name}</td>
              <td>{url}</td>
            </tr>
          ))}
          </>
          }


          <br/>

        <tr className="heading">
            <td>Payment Method</td>
            <td>Check #</td>
          </tr>

          <tr className="details">
            <td>USD</td>

            <td>
              {/* {payId} */}
              {amountString}<br/>
              {solanaString?.toFixed(4)} ({ACTIVE_CHAIN.name})
            </td>
          </tr>


          <tr className="total">
            <td>
              {/* <a href={url} target="_blank">
              View NFT
            </a> */}
              <br />
              <br />
              {!paid && <span>
                <Button
                  type="primary"
                  size="large"
                  className="standard-button"
                  onClick={() => completePayment(solanaString, remittanceAddress)}
                >
                  Pay with wallet
                </Button>
              </span>}
              {paid && <div>
                <CheckCircleTwoTone twoToneColor="#00aa00" />
                  &nbsp;
                  Paid
              </div>}
            </td>

            <td>Total: {amountString}</td>
          </tr>
        </tbody>
      </table>
     
    </div>
  );
}

export default Invoice;
