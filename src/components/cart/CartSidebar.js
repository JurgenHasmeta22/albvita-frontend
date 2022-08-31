import { Empty, Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import CartSidebarItem from './CartSidebarItem';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {
    setBasketItems,
    setUser
} from "../../toolkitStore/homeSlice"

function CartSidebar() {
    const { basketItems, user } = useSelector((state) => state.home);
    const dispatch = useDispatch();

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
        dispatch(setUser(res.data.updatedUser));
        // dispatch(setBasketItems(res.data.userUpdated.boughtItems));
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
        dispatch(setUser(res.data.updatedUser));
        // dispatch(setBasketItems(res.data.userUpdated.boughtItems));
    }
    async function handleDeletingFromBasket(basketId) {
        const request = {
            userId: 1,
        };
        const res = await axios.delete(
            `http://localhost:4000/deleteBoughtItemById/${basketId}`,
            request
        );
        dispatch(setUser(res.data.updatedUser));
        // dispatch(setBasketItems(res.data.updatedUser.boughtItems));
    }

    return user?.boughtItems?.length === 0 ? (
        <Empty description='No products in cart' />
    ) : (
        <div className='cart-sidebar'>
            <div className='cart-sidebar-products'>
                {user?.boughtItems?.map((item, index) => (
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
                <h5>Total: {user?.boughtItems?.length}</h5>
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
