import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Rate, Button, Tooltip, Skeleton, message, Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import ShopQuickView from "../shop/ShopQuickView";

function Product({ data, productStyle, productImage }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageLoading(true);
  }, []);

  const renderProductType = () => {
    if (data.discount && !data.isNew) {
      return <p className="product-type -sale">Sale</p>;
    } else if (data.isNew && !data.discount) {
      return <p className="product-type -new">New</p>;
    } else if (data.isNew && data.discount) {
      return <p className="product-type -new">New</p>;
    } else {
      return null;
    }
  };

  const renderStyleClass = () => {
    const avaialeStyles = ["one", "two", "three"];
    if (avaialeStyles.includes(productStyle)) {
      if (!productStyle || productStyle === "one") {
        return "-style-one";
      } else {
        return "-style-" + productStyle;
      }
    } else {
      return "-style-one";
    }
  };

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  return data ? (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className="product-image">
          <Link
            href={
              process.env.PUBLIC_URL +
              `product/${data.name}`
            }
            as={
              process.env.PUBLIC_URL +
              `product/${data.name
                .split("")
                .map((char) => (char === " " ? "-" : char))
                .join("")}`
            }
          >
            <a className={classNames({ loading: imageLoading })}>
              <img
                onLoad={handleImageLoaded}
                src={`http://localhost:4000${productImage}`}
                // key={data.id}
                alt="Product image"
              />
            </a>
          </Link>
          {imageLoading && (
            <div className="product-image-loading">
              <Spin size="large" />
            </div>
          )}
          {/* {renderProductType()} */}
          {productStyle === "two" ? (
            <div className="product-button-group">
              <Tooltip title="Quick view">
                ``
                <Button onClick={showModal} type="text">
                  <i className="icon_search" />
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  // productInWishlist
                  // ?'Remove from wishlist'
                  "Add to wishlist"
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    // active: productInWishlist,
                    active: false,
                  })}`}
                  type="text"
                  // onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>
              <Tooltip title="Add to cart">
                <Button
                  disabled={avaiableQuantity === 0}
                  type="text"
                  // onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            </div>
          ) : null}
          {!productStyle || productStyle === "one" ? (
            <>
              <Tooltip
                placement="left"
                title={
                  // productInWishlist
                  // ? 'Remove from wishlist'
                  "Add to wishlist"
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    // active: productInWishlist,
                    active: false,
                  })}`}
                  type="text"
                  shape="circle"
                  // onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>

              {/* <Button onClick={showModal} className='product-qv'>
                                Quick view
                            </Button> */}
            </>
          ) : null}
        </div>
        <div className="product-content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.name}`}
          >
            <a className="product-name">{data.name}</a>
          </Link>
          <div className="product-rate">
            {/* <Rate defaultValue={data.rate} disabled /> */}
            <span className="product-rate-quantity">
              Quantity: {data.stock}
            </span>
          </div>
          <div className="product-content__footer">
            <div className="product-content__footer-price">
              <h5 className="product-price">Price: {data.price}</h5>
            </div>
            {!productStyle || productStyle === "one" ? (
              <Tooltip title="Add to cart">
                <Button
                  // disabled={avaiableQuantity === 0}
                  disabled={true}
                  className="product-atc"
                  type="text"
                  shape="circle"
                  // onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            ) : null}
          </div>
          {productStyle === "three" ? (
            <div className="product-button-group">
              <div className="product-button-group__wrapper">
                <Tooltip placement="top" title="Quick view">
                  <Button onClick={showModal} shape="circle">
                    <i className="icon_search" />
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={
                    // productInWishlist
                    // ? 'Remove from wishlist'
                    "Add to wishlist"
                  }
                >
                  <Button
                    shape="circle"
                    className={`product-atw ${classNames({
                      // active: productInWishlist,
                      active: false,
                    })}`}
                    // onClick={() => onAddToWishlist(data)}
                  >
                    <i className="icon_heart_alt" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Add to cart">
                  <Button
                    // disabled={avaiableQuantity === 0}
                    disabled={false}
                    shape="circle"
                    // onClick={() => onAddToCart(data)}
                  >
                    <i className="icon_bag_alt" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* <Modal
                footer={null}
                afterClose={handleCancel}
                onCancel={handleCancel}
                visible={visible}
                width={850}
            >
                <ShopQuickView setModalVisible={setVisible} data={data} />
            </Modal> */}
    </>
  ) : (
    <Skeleton active />
  );
}

export default React.memo(Product);
