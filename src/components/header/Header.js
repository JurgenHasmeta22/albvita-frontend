import React, { useEffect, useState } from 'react';
import Menu from './elements/Menu';
import TopNav from './elements/TopNav';
import axios from 'axios';

function Header({ containerType, headerStyle, products, categories }) {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [boughtCount, setBoughtCount] = useState(0);

    async function getBoughtCount() {
        const res = await axios.post(`http://localhost:4000/getBoughtCount`, {userId: 1});
        const count = res.data.count;
        setBoughtCount(count);
    }
    async function getWishlistCount() {
        const res = await axios.post(`http://localhost:4000/getWishlistCount`, {userId: 1});
        const count = res.data.count;
        setWishlistCount(count);
    }

    useEffect(() => {
        getBoughtCount();
        getWishlistCount();
    }, []);

    const renderStyleClass = (type) => {
        switch (type) {
            case 'two':
                return '-style-two';
            default:
                return 'default';
        }
    };
    return (
        <div className={`header-one ${renderStyleClass(headerStyle)}`}>
            {/* <TopNav containerType={containerType} /> */}
            <Menu
                containerType={containerType}
                products={products}
                categories={categories}
                wishlistCount={wishlistCount}
                boughtCount={boughtCount}
            />
        </div>
    );
}

export default React.memo(Header);
