import React, { useState } from "react";
import { Rate, Button, Radio, Progress, message } from "antd";
import Countdown, { zeroPad } from "react-countdown";
import classNames from "classnames";
import { checkAvaiableQuantityToAdd } from "../../../common/shopUtils";
import QuantitySelector from "../../controls/QuantitySelector";
import ProductGuaranteed from "../elements/ProductGuaranteed";

function ProductDetailContentOne({ product, hideGuaranteed, showCountdown }) {
  return (
    <div className="product-detail-content-one">
      <h3>{product.name}</h3>
      <div className="product-detail-content-one-rate">
        <Rate disabled defaultValue={3} />
        <span className="product-detail-content-one-review-count">
          0 Reviews
        </span>
      </div>
      <div className="product-detail-content-two-price">
        <span>Product price: {product.price}</span>
      </div>
      <p className="product-detail-content-one-description">
        {product.description}
      </p>
      {showCountdown && (
        <>
          <div className="product-detail-content-one-countdown">
            <h3>Hurry Up ! Sales end in :</h3>
            <div className="product-detail-content-one-countdown__items">
              <Countdown
                date={Date.now() + 100000000}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <>
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(days)}</div>
                      <span>days</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(hours)}</div>
                      <span>hours</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(minutes)}</div>
                      <span>mins</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(seconds)}</div>
                      <span>secs</span>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="product-detail-content-one-countdown__sold">
              <Progress percent={50} showInfo={false} />
              <div className="sold-data">
                <h5>
                  Already Sold:
                  <span>0</span>
                </h5>
                <h5>
                  Total:
                  <span>Stock: {product.stock}</span>
                </h5>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="product-detail-content-one-actions">
        <QuantitySelector defaultValue={1} size="big" />
        <Button
          disabled={true}
          className={`product-detail-content-one-atc ${classNames({
            disabled: true,
          })}`}
          type="link"
          danger
        >
          Add to cart
        </Button>
      </div>
      {!hideGuaranteed && <ProductGuaranteed />}
    </div>
  );
}

export default React.memo(ProductDetailContentOne);
