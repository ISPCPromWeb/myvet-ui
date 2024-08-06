import { ButtonSmall } from "../ButtonSmall";
import styles from "./FeatProducts.module.css";
import { ProductCard } from "@/components/ProductCard";

export const FeatProducts = (props: any) => {
  const { products } = props;

  return (
    <section className={`${styles.popularProducts} container`}>
      <h3 className="fw-bold mb-4">Productos Destacados</h3>
      <div className={`${styles.cardsContainer} mb-4`}>
        {products.map((product: any, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div
        className={`${styles.paginationvinc} pagination justify-content-end`}
      >
        <a href={"/store"}>
          <ButtonSmall
            type="button"
            name="Ver todos los productos"
          ></ButtonSmall>
        </a>
      </div>
    </section>
  );
};
