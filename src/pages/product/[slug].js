import { useRouter } from "next/router";
import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import { useState, useEffect } from "react";
import axios from "axios";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const slugSplitted = slug
    .split("")
    .map((char) => (char === "-" ? " " : char))
    .join("");

  const res1 = await axios.get(`http://localhost:4000/getProductByName/${slugSplitted}`);
  const product = res1.data;

  return {
    props: { product },
  };
}

export default function pid({ product }) {
  const [productFromServer, setProductFromServer] = useState(product);

  return (
    <LayoutOne
      title={productFromServer && capitalizeFirstLetter(productFromServer.name)}
      clearSpaceTop
    >
      {productFromServer && <ProductDetailOne product={productFromServer} />}
    </LayoutOne>
  );
}
