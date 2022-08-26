import { Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios"

function ShopContentHeader({ productPerPage }) {
  const { Option } = Select;
  const [productsCount, setProductsCount] = useState(20)

  async function getProductsCountFromServer() {
    const result = await axios.get("http://localhost:4000/productsCount")
    setProductsCount(result.count)
  }

  useEffect(() => {
    getProductsCountFromServer()
  }, [])

  return (
    <div className="shop-content__header">
      <div className="shop-content__header-showing">
        <h5>
          Showing 1 - {productPerPage} of {productsCount?.count} Products
        </h5>
      </div>
      <div className="shop-content__header-filter">
        <p>Filter by:</p>
        <Select
          className="shop-content__header-filter__select"
          // defaultValue={shopState.sort}
          style={{ width: 250 / 16 + "em" }}
          // onChange={handleChange}
        >
          <Option value="default">Default</Option>
          <Option value="lowHigh">Price: Low to High</Option>
          <Option value="highLow">Price: High to Low</Option>
          <Option value="az">A to Z</Option>
          <Option value="za">Z to A</Option>
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopContentHeader);
