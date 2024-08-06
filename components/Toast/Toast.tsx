import { createPortal } from "react-dom";
import styles from "./Toast.module.css";
import { useEffect } from "react";

export const Toast = (props: any) => {
  const { text } = props;
  return createPortal(
    <div className={styles.toastWrapper}>
      <p className={styles.toastText}>{text}</p>
    </div>,
    document.body
  );
};
