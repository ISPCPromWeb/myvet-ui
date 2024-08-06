import styles from "./index.module.css";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFilter } from "@/components/StoreFilter";
import { ProductCard } from "@/components/ProductCard";
import { productsApi } from "@/api";
import { useAppContext } from "@/context";
import { useEffect } from "react";

export const getServerSideProps = async () => {
  const products = await productsApi.getAll();
  return {
    props: {
      products,
    },
  };
};

const Store = (props: any) => {
  const { products } = props;
  const { setType } = useAppContext();

  useEffect(() => {
    setType("common");
  }, [setType]);

  return (
    <main id="main" className={styles.main}>
      <StoreHeader />
      <div className="container col-12 h-100 d-block d-md-flex md-flex-row">
        <StoreFilter />
        <section className={`col-12 px-4 col-md-9`}>
          <div className={`${styles.cardsContainer} mb-4`}>
            {products.map((product: any, index: number) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Store;
