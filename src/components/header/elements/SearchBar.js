import React, { useState, useEffect } from 'react';
import { Select, Button, AutoComplete } from 'antd';
import { useRouter } from 'next/router';

import { SHOP } from '../../../common/defines';
import { getProductsByCategory } from '../../../common/shopUtils';
import useDebounce from '../../../common/useDebound';
import axios from "axios"

function SearchBarMobile({ fillData, placeholder }) {
    const { Option } = Select;
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [showDropdownOptions, setShowDropdownOptions] = useState(false);
    const deboundValue = useDebounce(search, 300);

    async function getCategoriesFromServer() {
        const result = await axios.get('http://localhost:4000/categories');
        setCategories(result.data);
    }

    async function getProductsFromServer() {
        const result = await axios.get('http://localhost:4000/products');
        // console.log(result)
        setProducts(result.data);
    }

    useEffect(() => {
        getCategoriesFromServer();
        getProductsFromServer();
    }, []);

    const openDropdownOption = (value) => {
        setShowDropdownOptions(true);
    };

    const closeDropdownOption = () => {
        setShowDropdownOptions(false);
    };

    const onSelectOption = (value, option) => {
        closeDropdownOption();
    };

    return (
        <div className='menu-search'>
            <div className='menu-search__form'>
                <Select
                    className='menu-search__form-select'
                    // defaultValue={globalState.category}
                    style={{ width: 150 }}
                    // onChange={onSelectCateory}
                    // value={globalState.category}
                >
                    {categories.map((item, index) => (
                        <Option key={index} value={item.name}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
                <div className='menu-search__form-input'>
                    <AutoComplete
                        allowClear
                        backfill={true}
                        // open={showDropdownOptions}
                        // onSearch={openDropdownOption}
                        // onBlur={closeDropdownOption}
                        // onSelect={onSelectOption}
                        options={products}
                        placeholder={placeholder}
                        filterOption={(inputValue, option) =>
                            option.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    <Button>
                        <i className='icon_search' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SearchBarMobile);
