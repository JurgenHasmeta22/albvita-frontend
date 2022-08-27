import { Select } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

function ShopContentHeader({ productPerPage, productsCount }) {
  const { Option } = Select;
  const [valueSelected, setValueSelected] = useState("default");
  const router = useRouter();

  const handleChange = (value) => {
    if (value === "default") {
      setValueSelected("default");
      router.push("/");
    } else if (value === "lowHigh") {
      setValueSelected("lowHigh");
      router.push(
        `/?page=${router.query.page !== 1 ? "1" : router.query.page}${
          router.query.category ? `&category=${router.query.category}` : ""
        }&sortBy=price&ascOrDesc=asc`
      );
    } else if (value === "highLow") {
      setValueSelected("highLow");
      router.push(
        `/?page=${router.query.page !== 1 ? "1" : router.query.page}${
          router.query.category ? `&category=${router.query.category}` : ""
        }&sortBy=price&ascOrDesc=desc`
      );
    } else if (value === "az") {
      setValueSelected("az");
      router.push(
        `/?page=${router.query.page !== 1 ? "1" : router.query.page}${
          router.query.category ? `&category=${router.query.category}` : ""
        }&sortBy=name&ascOrDesc=asc`
      );
    } else if (value === "za") {
      setValueSelected("za");
      router.push(
        `/?page=${router.query.page !== 1 ? "1" : router.query.page}${
          router.query.category ? `&category=${router.query.category}` : ""
        }&sortBy=name&ascOrDesc=desc`
      );
    }
  };
  return (
    <div className="shop-content__header">
      <div className="shop-content__header-showing">
        <h5>
          Showing 1 - {productPerPage} of {productsCount?.count} Products
        </h5>
      </div>
      <div className="shop-content__header-filter">
        <p>Filter products by:</p>
        <Select
          className="shop-content__header-filter__select"
          defaultValue={"default"}
          style={{ width: 250 / 16 + "em" }}
          value={valueSelected}
          onChange={handleChange}
        >
          <Option value="default">Default: No filters</Option>
          <Option value="lowHigh">Price: Low to High</Option>
          <Option value="highLow">Price: High to Low</Option>
          <Option value="az">Name: A to Z</Option>
          <Option value="za">Name: Z to A</Option>
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopContentHeader);
