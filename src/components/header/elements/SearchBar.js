import React, { useState, useEffect } from 'react';
import { Select, Button, AutoComplete } from 'antd';
import { useRouter } from 'next/router';
import useDebounce from '../../../common/useDebound';
import axios from "axios"

function SearchBarMobile({ fillData, placeholder, categories }) {
    const { Option } = Select;
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [showDropdownOptions, setShowDropdownOptions] = useState(false);
    const deboundValue = useDebounce(search, 300);
    const [categoriesFromServer, setCategoriesFromServer] = useState([])
    
    async function getCategories() {
        const res = await axios.get("http://localhost:4000/categories")
        console.log(res.data)
        setCategoriesFromServer(res.data)
    }
    useEffect(() => {
        getCategories()
    },[])

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
                    defaultValue={"All"}
                    style={{ width: 150 }}
                    // onChange={onSelectCateory}
                    // value={globalState.category}
                >
                    <Option key={"All"} value={"All"}>
                        All Products
                    </Option>
                    {categoriesFromServer.map((item, index) => (
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
                        // options={products}
                        placeholder={placeholder}
                        // filterOption={(inputValue, option) =>
                        //     option.value
                        //         .toUpperCase()
                        //         .indexOf(inputValue.toUpperCase()) !== -1
                        // }
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
