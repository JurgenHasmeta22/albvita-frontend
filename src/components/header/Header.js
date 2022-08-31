import React, { useEffect, useState } from 'react';
import Menu from './elements/Menu';

function Header({ containerType, headerStyle, products, categories }) {
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
            <Menu
                containerType={containerType}
                products={products}
                categories={categories}
            />
        </div>
    );
}

export default React.memo(Header);
