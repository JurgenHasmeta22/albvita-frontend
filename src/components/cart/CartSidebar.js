import { Empty, Button } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CartSidebarItem from './CartSidebarItem';
import axios from 'axios';

function CartSidebar() {
    const [basket, setBasket] = useState([]);

    async function getUserBought() {
        const res = await axios.get(`http://localhost:4000/getUserById/1`);
        const basket = res.data.boughtItems;
        setBasket(basket);
    }

    useEffect(() => {
        getUserBought();
    }, []);

    async function handleQuantityIncreaseChange(
        basketId,
        productId,
        productQuantity
    ) {
        const request = {
            userId: 1,
            productId,
            quantity: productQuantity + 1,
        };
        const res = await axios.patch(
            `http://localhost:4000/updateBoughtItemById/${basketId}`,
            request
        );
        setBasket(res.data.userUpdated.boughtItems);
    }
    async function handleQuantityDecreaseChange(
        basketId,
        productId,
        productQuantity
    ) {
        const request = {
            userId: 1,
            productId,
            quantity: productQuantity - 1,
        };

        // if (productQuantity === 2) {
        //   request.quantity = 1
        // }

        const res = await axios.patch(
            `http://localhost:4000/updateBoughtItemById/${basketId}`,
            request
        );
        setBasket(res.data.userUpdated.boughtItems);
    }
    async function handleDeletingFromBasket(basketId) {
        const request = {
            userId: 1,
        };
        const res = await axios.delete(
            `http://localhost:4000/deleteBoughtItemById/${basketId}`,
            request
        );
        setBasket(res.data.updatedUser.boughtItems);
    }

    return basket?.length === 0 ? (
        <Empty description='No products in cart' />
    ) : (
        <div className='cart-sidebar'>
            <div className='cart-sidebar-products'>
                {basket?.map((item, index) => (
                    <CartSidebarItem
                        key={index}
                        product={item.product}
                        quantity={item.quantity}
                        basketItem={item}
                        handleQuantityIncreaseChange={
                            handleQuantityIncreaseChange
                        }
                        handleQuantityDecreaseChange={
                            handleQuantityDecreaseChange
                        }
                        handleDeletingFromBasket={handleDeletingFromBasket}
                    />
                ))}
            </div>
            <div className='cart-sidebar-total'>
                <h5>Total: {basket.length}</h5>
                <div className='cart-sidebar-total__buttons'>
                    <Button type='primary' shape='round'>
                        <Link href={process.env.PUBLIC_URL + '/shop/checkout'}>
                            <a>Checkout</a>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CartSidebar);
