import React, { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CartSidebar from "../../cart/CartSidebar";
import WishlistSidebar from "../../wishlist/WishlistSidebar";
import MenuSidebar from "./MenuSidebar";
import SearchBar from "./SearchBar";
import Container from "../../other/Container";

function Menu({ containerType, products, categories, boughtCount, wishlistCount }) {
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [wishlistSidebarOpen, setWishlistSidebarOpen] = useState(false);
  return (
    <>
      <div className="menu">
        <Container type={containerType}>
          <div className="menu-wrapper">
            <a
              href="#"
              className="menu-sidebar-opener"
              onClick={(e) => {
                e.preventDefault();
                setMenuSidebarOpen(true);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </a>
            <div className="menu-logo">
              <Link href={process.env.PUBLIC_URL + "/"}>
                <h1>AlbVitaFitness</h1>
              </Link>
            </div>
            <SearchBar
              fillData={products}
              placeholder="What are you looking for ?"
              categories={categories}
            />
            <div className="menu-functions">
              <Button>
                <Link href="/">
                  <a>Join now</a>
                </Link>
              </Button>
              <div
                className="menu-function-item"
                onClick={() => setWishlistSidebarOpen(true)}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/header/menu-wishlist.png"
                  }
                  alt=""
                />
                <span>{wishlistCount}</span>
              </div>
              <div
                className="menu-function-item"
                onClick={() => setCartSidebarOpen(true)}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/header/menu-bag.png"
                  }
                  alt=""
                />
                <span>{boughtCount}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="menu-mobile-search">
        <Container>
          <SearchBar
            fillData={products}
            categories={categories}
            placeholder="Searching..."
          />
        </Container>
      </div>
      <Drawer
        placement="right"
        title={`Wishlist`}
        closable={true}
        onClose={() => setWishlistSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={wishlistSidebarOpen}
        width={445}
        className="menu-side"
      >
        <WishlistSidebar />
      </Drawer>
      <Drawer
        placement="right"
        title={`Shopping cart`}
        closable={true}
        onClose={() => setCartSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={cartSidebarOpen}
        width={445}
        className="menu-side"
      >
        <CartSidebar />
      </Drawer>
      <Drawer
        placement="right"
        closable={true}
        title=" "
        onClose={() => setMenuSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={menuSidebarOpen}
        width={350}
        className="menu-side"
      >
        <MenuSidebar />
      </Drawer>
    </>
  );
}

export default React.memo(Menu);
