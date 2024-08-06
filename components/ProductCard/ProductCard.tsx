import Link from "next/link";
import styles from "./ProductCard.module.css";
import { formattedPrice } from "@/utils";
import { API_URL_IMAGE } from "@/api/constants";

export const ProductCard = (props: any) => {
  const { product } = props;
  return (
    <div className={styles.cardWrapper}>
      <img
        className={styles.cardImage}
        src={`${API_URL_IMAGE}${product.img}`}
        alt=""
      />
      <Link href={`/store/product/${product.id}`} className={styles.cardTitle}>
        {product.name}
      </Link>
      <p className={styles.cardPrice}>{formattedPrice(product.price)}</p>
    </div>
  );
};
