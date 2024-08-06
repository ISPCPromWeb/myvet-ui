import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export const Breadcrumbs = (props: any) => {
  const { name } = props;
  return (
    <nav className={`${styles.contBreadcrumb} align-top  pt-3 pe-3`}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link className={`${styles.vinculos} `} href="/" title="My Vet">
            Inicio
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link className={`${styles.vinculos}`} href="/store" title="Tienda">
            Tienda
          </Link>
        </li>
        <li className="breadcrumb-item active">
          <span className={`${styles.vinculos}`}>{name}</span>
        </li>
      </ol>
    </nav>
  );
};
