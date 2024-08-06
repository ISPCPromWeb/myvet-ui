import { API_URL_IMAGE } from "@/api/constants";
import styles from "./CartItem.module.css";
import { formattedPrice } from "@/utils";

export const CartItem = (props: any) => {
  const { product } = props;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
              <img
                src={`${API_URL_IMAGE}${product.img}`}
                className={`${styles.imgCart} img-fluid rounded-3`}
                alt="Shopping item"
              />
            </div>
            <div className="ms-3">
              <h5>{product.name}</h5>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className={styles.divCant}>
              <h5 className="fw-normal mb-0">{product.quantity}</h5>
            </div>
            <div className={styles.divPrice}>
              <h5 className="mb-0">{formattedPrice(product.price)}</h5>
            </div>
            <a href="#!">
              <i className="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
