import { Row, Col, Empty, Pagination } from "antd";
import classNames from "classnames";
import axios from "axios"
import Product from "../product/Product";

import { useState, useEffect } from "react";

function ShopContentProduct({
  productResponsive,
  fiveColumn,
  productPerPage,
  productStyle,
}) {

  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(20);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  
  async function getProductsFromServer() {
    const result = await axios.get("http://localhost:4000/products")
    // console.log(result)
    setProducts(result.data)
  }

  async function getProductsCountFromServer() {
    const result = await axios.get("http://localhost:4000/productsCount")
    // console.log(result)
    setProductsCount(result.data.count)
  }

  useEffect(() => {
    getProductsFromServer()
    getProductsCountFromServer()
  }, [])

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <i className="fal fa-angle-left" />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <i className="fal fa-angle-right" />
        </a>
      );
    }
    return originalElement;
  };
  const onChangeOffset = (page, pageSize) => {
    let offset = (page - 1) * pageSize;
    setPage(page);
    setOffset(offset);
  };

  return (
    <div className="shop-content__product">
      {!products ? (
        <Empty description="No products in this category" />
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <Row gutter={[{ xs: 5, sm: 5, xl: 15, xxl: 30 }, 30]}>
                {products.map((product, index) => (
                    <Col
                      key={index}
                      className={classNames({ "five-col": fiveColumn })}
                      {...productResponsive}
                    >
                      <Product data={product} productStyle={productStyle} productImage = {product.image} />
                    </Col>
                  ))}
              </Row>
              {products.length >= productPerPage && (
                <Pagination
                  classNames="shop-content__product-pagination"
                  defaultCurrent={1}
                  current={page}
                  total={products.length}
                  pageSize={productPerPage}
                  itemRender={itemRender}
                  onChange={(page, pageSize) => onChangeOffset(page, pageSize)}
                />
              )}
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(ShopContentProduct);
