import Link from "next/link";
import styles from "./CartHeader.module.css";

export const CartHeader = () => {
  return (
    <nav className={`${styles.navbar}  navbar-expand-lg bg-transparent`}>
      <div className="container">
        <Link
          href={`/store`}
          className={`d-block text-decoration-none ${styles.h2Cart} align-middle`}
        >
          My Vet Tienda
        </Link>
      </div>
    </nav>
  );
};
