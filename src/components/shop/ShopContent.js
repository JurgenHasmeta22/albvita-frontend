import React from "react";
import ShopContentHeader from "./ShopContentHeader";
import ShopContentProduct from "./ShopContentProduct";

function ShopContent({
  fiveColumn,
  productResponsive,
  productPerPage,
  productStyle,
}) {
  return (
    <div className="shop-content">
      <ShopContentHeader productPerPage={productPerPage} />
      <ShopContentProduct
        productStyle={productStyle}
        fiveColumn={fiveColumn}
        productResponsive={productResponsive}
        productPerPage={productPerPage}
      />
    </div>
  );
}

export default React.memo(ShopContent);
