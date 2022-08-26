import { useRouter } from "next/router";

import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import { getProductsBySlug } from "../../common/shopUtils";
import productData from "../../data/product.json";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import { useState, useEffect } from "react";

import axios from "axios"

export default function pid() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState(null)

  async function getProductFromServer() {
    const result = await axios.get(`http://localhost:4000/products/${slug}`)
    setProduct(result.data)
  }

  useEffect(() => {
    getProductFromServer()
  }, [slug])

  return (
    <LayoutOne
      title={product && capitalizeFirstLetter(product.name)}
      clearSpaceTop
    >
      {product && <ProductDetailOne data={product} />}
    </LayoutOne>
  );
}
