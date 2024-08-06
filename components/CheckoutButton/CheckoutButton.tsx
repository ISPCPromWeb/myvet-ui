import React, { useState, useEffect } from "react";
import styles from "./CheckoutButton.module.css";

export const CheckoutButton = (props: any) => {
  const { url } = props;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (url) {
      setLoading(false);
    } else {
      throw new Error("Invalid URL");
    }
  }, [url]);

  return (
    <div>
      {loading ? (
        <span>Cargando...</span>
      ) : (
        <>
          <a className={`${styles.btn} btn w-100`} href={url || ""}>
            Comprar ahora
          </a>
        </>
      )}
    </div>
  );
};
