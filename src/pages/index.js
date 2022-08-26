import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";

export default function Home() {
  
  return (
    <LayoutOne title="AlbVitaFitness - Your fitness store of choice" containerType="fluid" headerStyle="two">
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={20}
        productStyle="three"
        containerType="fluid"
      />
    </LayoutOne>
  );
}
