import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Select } from "antd";
import router from "next/router";

function ShopSidebar({ categories }) {
  const { Option } = Select;
  const [categoryClicked, setCategoryClicked] = useState("all");
  // categories.push("all")
  // function handleCategoryClick(e) {
  //     setCategoryClicked(e.target.value)
  //     router.push()
  // }
  return (
    <div className="shop-sidebar">
      <h5>Categories</h5>
      <div className="shop-sidebar__subcategory">
        <ul>
          <li
            className={classNames({
              active: false,
            })}
          >
            <Link href="/">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/?page=${router.query.page !== "1" ? "1" : router.query.page}&category=all`)
                }}
              >
                All Categories
              </a>
            </Link>
          </li>
          {categories &&
            categories.map((item, index) => (
              <li
                key={index}
                className={classNames({
                  active: false,
                })}
              >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/?page=${router.query.page !== "1" ? "1" : router.query.page}&category=${item.name}`)
                    }}
                  >
                    {item.name}
                  </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="shop-sidebar__subcategory-mobile">
        <Select defaultValue="all" style={{ width: "100%" }}>
          <Option value="all">
            <i className="icon_document_alt" />
            All Categories
          </Option>
          {categories &&
            categories.map((item, index) => (
              <Option key={index} value={item.name}>
                {" "}
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopSidebar);
