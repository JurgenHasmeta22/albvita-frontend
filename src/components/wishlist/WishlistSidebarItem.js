import React, { useState } from 'react';
import Link from 'next/link';
import { Modal, message, Button } from 'antd';
import { formatCurrency } from '../../common/utils';
import { removeFromWishlist } from '../../redux/actions/wishlistActions';

function WishlistSidebarItem({
    product,
    handleDeletingFromWishlist,
    wishlistItem,
}) {
    const [visible, setVisible] = useState(false);

    const onRemoveProductFromWishlist = (e) => {
        e.preventDefault();
        showModal();
    };
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = (e) => {
        setVisible(false);
        handleDeletingFromWishlist(wishlistItem.id)
        return message.error('Product removed from wishlist');
    };

    const handleCancel = (e) => {
        setVisible(false);
    };
    const onAddToCart = () => {};

    return (
        <>
            <div className='wishlist-sidebar-item'>
                <div className='wishlist-sidebar-item__image'>
                    <img src={`http://localhost:4000${product.image}`} alt='Product image' />
                </div>
                <div className='wishlist-sidebar-item__content'>
                    <Link
                        href={process.env.PUBLIC_URL + `/product/[slug]`}
                        as={process.env.PUBLIC_URL + `/product/${product.name}`}
                    >
                        <a>{product.name}</a>
                    </Link>
                    <h5>{product.price}</h5>
                    {product.quantity < 1 ? (
                        <>
                            <Button className='btn-sold-mobile' disabled>
                                <i className='icon_close' />
                            </Button>
                            <Button className='btn-sold' disabled>
                                Sold out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={onAddToCart}
                                disabled={true}
                                className='btn-atc-mobile'
                            >
                                <i className='icon_bag_alt' />
                            </Button>
                            <Button
                                onClick={onAddToCart}
                                disabled={true}
                                className='btn-atc'
                            >
                                Added to cart
                                {/* {productInCart ? "Added to cart" : "Add to Cart"} */}
                            </Button>
                        </>
                    )}
                </div>
                <div className='wishlist-sidebar-item__close'>
                    <a href='#' onClick={(e) => {
                      onRemoveProductFromWishlist(e)
                    }}>
                        <i className='icon_close' />
                    </a>
                </div>
            </div>
            <Modal
                title='Cofirm this action'
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are your sure to remove product from wishlist ?</p>
            </Modal>
        </>
    );
}

export default React.memo(WishlistSidebarItem);
