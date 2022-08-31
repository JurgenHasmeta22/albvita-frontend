import React from "react";
import ShopContentHeader from "./ShopContentHeader";
import ShopContentProduct from "./ShopContentProduct";

function ShopContent({
  fiveColumn,
  productResponsive,
  productPerPage,
  productStyle,
  products,
  productsCount,
  searchedProducts,
}) {
  // const { productsCount, categories } = useSelector((state) => state.home);
  // const dispatch = useDispatch();

  return (
    <div className="shop-content">
      <ShopContentHeader
        productPerPage={productPerPage}
        productsCount={productsCount}
      />
      <ShopContentProduct
        productStyle={productStyle}
        fiveColumn={fiveColumn}
        productResponsive={productResponsive}
        productPerPage={productPerPage}
        products={products}
        productsCount={productsCount}
        searchedProducts={searchedProducts}
      />
    </div>
  );
}

export default React.memo(ShopContent);
