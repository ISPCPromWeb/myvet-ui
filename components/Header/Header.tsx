import styles from "./Header.module.css";
import { Navigation } from "../Navigation";
import CartLayout from "../CartLayout/CartLayout";
import { useAppContext } from "@/context";

export const Header = (props: any) => {
  const { type } = useAppContext();
  return (
    <header>
      {type === "common" && (
        <>
          <a className={styles.skipMain} href="#main">
            Saltar al contenido
          </a>
          <Navigation />
        </>
      )}
      {type === "cart" && <CartLayout />}
    </header>
  );
};
