import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import WishlistSidebarItem from './WishlistSidebarItem';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {
    setUser
} from "../../toolkitStore/homeSlice"

function WishlistSidebar() {
    const { wishlistItems, user } = useSelector((state) => state.home);
    const dispatch = useDispatch();

    async function handleDeletingFromWishlist(wishlistId) {
        const request = {
            userId: 1,
        };
        const res = await axios.delete(
            `http://localhost:4000/deleteWishlistItemById/${wishlistId}`,
            request
        );
        dispatch(setUser(res.data.updatedUser))
        // dispatch(setWishlistItems(res.data.updatedUser.wishlistItems));
    }

    return user?.wishlistItems?.length === 0 ? (
        <Empty description='No products in wishlist' />
    ) : (
        <div className='wishlist-sidebar'>
            {user?.wishlistItems?.map((item, index) => (
                <WishlistSidebarItem
                    key={index}
                    wishlistItem={item}
                    product={item.product}
                    handleDeletingFromWishlist={handleDeletingFromWishlist}
                />
            ))}
        </div>
    );
}

export default React.memo(WishlistSidebar);
