import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import WishlistSidebarItem from './WishlistSidebarItem';
import axios from 'axios';

function WishlistSidebar() {
    const [wishlist, setWishlist] = useState([]);

    async function getUserBought() {
        const res = await axios.get(`http://localhost:4000/getUserById/1`);
        const wishlist = res.data.wishlistItems;
        setWishlist(wishlist);
    }

    useEffect(() => {
        getUserBought();
    }, []);

    async function handleDeletingFromWishlist(wishlistId) {
        const request = {
            userId: 1,
        };
        const res = await axios.delete(
            `http://localhost:4000/deleteWishlistItemById/${wishlistId}`,
            request
        );
        setWishlist(res.data.updatedUser.wishlistItems);
    }

    return wishlist?.length === 0 ? (
        <Empty description='No products in wishlist' />
    ) : (
        <div className='wishlist-sidebar'>
            {wishlist?.map((item, index) => (
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
