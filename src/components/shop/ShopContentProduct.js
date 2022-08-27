import { Row, Col, Empty, Pagination } from "antd";
import classNames from "classnames";
import Product from "../product/Product";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function ShopContentProduct({
  productResponsive,
  fiveColumn,
  productPerPage,
  productStyle,
  products,
  productsCount,
  searchedProducts,
}) {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const router = useRouter();

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
    if (
      router.query.sortBy === undefined &&
      router.query.ascOrDesc === undefined &&
      router.query.category === undefined
    )
      router.push(`/?page=${page}`);

    if (
      router.query.sortBy === undefined &&
      router.query.ascOrDesc === undefined &&
      router.query.category === undefined &&
      router.query.search
    )
      router.push(`/?page=${page}&search=${router.query.search}`);

    if (
      router.query.sortBy &&
      router.query.ascOrDesc === undefined &&
      router.query.category === undefined
    )
      router.push(`/?page=${page}&sortBy=${router.query.sortBy}`);

    if (
      router.query.sortBy === undefined &&
      router.query.category === undefined &&
      router.query.ascOrDesc
    )
      router.push(`/?page=${page}&ascOrDesc=${router.query.ascOrDesc}`);

    if (
      router.query.sortBy &&
      router.query.ascOrDesc &&
      router.query.category === undefined
    )
      router.push(
        `/?page=${page}&sortBy=${router.query.sortBy}&ascOrDesc=${router.query.ascOrDesc}`
      );

    if (router.query.sortBy && router.query.ascOrDesc && router.query.category)
      router.push(
        `/?page=${page}&sortBy=${router.query.sortBy}&ascOrDesc=${router.query.ascOrDesc}&category=${router.query.category}`
      );

    if (
      router.query.sortBy === undefined &&
      router.query.ascOrDesc === undefined &&
      router.query.category
    )
      router.push(`/?page=${page}&category=${router.query.category}`);
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
                    <Product
                      data={product}
                      productStyle={productStyle}
                      productImage={product.image}
                    />
                  </Col>
                ))}
              </Row>
              {products.length >= productPerPage && (
                <Pagination
                  classNames="shop-content__product-pagination"
                  defaultCurrent={1}
                  current={page}
                  total={productsCount.count}
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
