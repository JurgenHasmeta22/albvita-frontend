import { Rate } from "antd";
import React from "react";

function ProductDetailReviewItem({ data }) {
  return (
    <div className="product-detail-review-item">
      <div className="product-detail-review-item__avatar">
        {/* <img
          src="https://thispersondoesnotexist.com/image"
          alt="Reviewer avatar"
        /> */}
        <Rate disabled defaultValue={4} />
      </div>
      <div className="product-detail-review-item__content">
        <h5>August 27, 2022</h5>
        <h3>Jurgen Hasmeta</h3>
        <p>Rewiew here</p>
      </div>
    </div>
  );
}

export default React.memo(ProductDetailReviewItem);
