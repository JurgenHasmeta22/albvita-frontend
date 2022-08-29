import React, { useState } from "react";
import Link from "next/link";
import { Modal, message } from "antd";
import QuantitySelector from "../controls/QuantitySelector";
import axios from "axios"

function CartSidebarItem({
  product,
  quantity,
  handleQuantityIncreaseChange,
  handleQuantityDecreaseChange,
  basketItem,
}) {
  const [visible, setVisible] = useState(false);

  const onRemoveProductFromCart = (e) => {
    e.preventDefault();
    showModal();
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = (e) => {
    setVisible(false);
    return message.error("Product removed from cart");
  };
  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <>
      <div className="cart-sidebar-item">
        <div className="cart-sidebar-item__image">
          <img
            src={`http://localhost:4000${product.image}`}
            alt="Product image"
          />
        </div>
        <div className="cart-sidebar-item__content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${product.name}`}
          >
            <a>{product.name}</a>
          </Link>
          <span>Quantity: {quantity}</span>
          <h5>Total Price: {Number(product.price) * Number(quantity)} $</h5>
          <QuantitySelector
            size="small"
            defaultValue={quantity}
            min={1}
            max={product.stock}
            onDecrease={() => handleQuantityDecreaseChange(basketItem.id, quantity, product.id)}
            onIncrease={() => handleQuantityIncreaseChange(basketItem.id, quantity, product.id)}
          />
        </div>
        <div className="cart-sidebar-item__close">
          <a href="#" onClick={onRemoveProductFromCart}>
            <i className="icon_close" />
          </a>
        </div>
      </div>
      <Modal
        title="Cofirm this action"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are your sure to remove product from cart ?</p>
      </Modal>
    </>
  );
}

export default React.memo(CartSidebarItem);
