import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
import axios from "axios";

export async function getServerSideProps(context) {
  // const categoryFormat = context.query?.category
  //   ?.split("")
  //   .map((char) => (char === " " ? "-" : char))
  //   .join("");
  const url = `http://localhost:4000/products/page/${
    context.query.page ? context.query.page : "1"
  }${
    context.query.category
      ? `?category=${context.query.category}`
      : "?category=all"
  }
  ${
    context.query.sortBy === "price"
      ? `&sortBy=price`
      : `${context.query.sortBy === "name" ? `&sortBy=name` : ""}`
  }${
    context.query.ascOrDesc === "asc"
      ? `&ascOrDesc=asc`
      : `${context.query.ascOrDesc === "desc" ? `&ascOrDesc=desc` : ""}`
  }`;

  const res1 = await axios(url);
  const products = res1.data;

  const res2 = await axios(`http://localhost:4000/productsCount`);
  const productsCount = res2.data;

  const productPayload = {
    title: context.query.search
      ? context.query.search
      : "iewhfewoifhewfioeoijfewoifjewijfijewof",
    page: context.query.page ? context.query.page : "1",
  };

  const res3 = await axios.post(
    `http://localhost:4000/searchProductsByName`,
    productPayload
  );
  const searchedProducts = res3.data;

  const res4 = await axios.get(`http://localhost:4000/categories`);
  const categories = res4.data;

  return {
    props: { products, productsCount, searchedProducts, categories },
  };
}

export default function Home({
  products,
  productsCount,
  searchedProducts,
  categories,
}) {
  return (
    <LayoutOne
      title="AlbVitaFitness - Your fitness store of choice"
      containerType="fluid"
      headerStyle="two"
      products={products}
      categories={categories}
    >
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={20}
        productStyle="three"
        containerType="fluid"
        products={products}
        productsCount={productsCount}
        searchedProducts={searchedProducts}
        categories={categories}
      />
    </LayoutOne>
  );
}
