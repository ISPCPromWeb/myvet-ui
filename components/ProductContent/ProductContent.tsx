import { useCartContext } from "@/context";
import { Column } from "../Column";
import styles from "./ProductContent.module.css";
import { formattedPrice } from "@/utils";
import { useEffect, useState } from "react";
import { ButtonSmall } from "../ButtonSmall";
import { Toast } from "../Toast";

export const ProductContent = (props: any) => {
  const {
    content: { id, name, price, img },
  } = props;
  const { cart, setCart } = useCartContext();
  const [toastText, setToastText] = useState("");
  const handleAddProductToCart = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const quantity = Number(formData.get("quantity"));
    const currentProduct = Object.assign(
      {},
      {
        id,
        name,
        price,
        quantity,
        img,
      }
    );

    if (typeof window !== "undefined") {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      let productExists = false;

      const newCart = currentCart.map((product: any) => {
        if (currentProduct.name === product.name) {
          productExists = true;
          return {
            ...product,
            quantity: product.quantity + currentProduct.quantity,
          };
        }
        return product;
      });

      if (!productExists) {
        newCart.push(currentProduct);
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      const value = localStorage.getItem("cart");
      document.cookie = `cart=${value}; path=/;`;
      setCart(newCart);
      setToastText("Producto agregado!");
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    <>
      {toastText !== "" && <Toast text={toastText} />}
      <Column size={7}>
        <div className="offset-lg-5">
          <h2 className={`${styles.h2Hero}`}>{name}</h2>
          <div className="price-container mb-4">
            <div className="mb-3">
              <span className="d-inline-block">
                <div className="" id="price_display">
                  <h3>{formattedPrice(price)}</h3>
                </div>
              </span>
            </div>
          </div>
          <form
            onSubmit={handleAddProductToCart}
            encType="multipart/form-data"
            id="product_form"
          >
            <label htmlFor="quantity">Cantidad</label>
            <input
              type="number"
              className="form-control w-75 border-2 mb-5 w-25"
              autoCorrect="off"
              autoCapitalize="off"
              pattern="\d*"
              name="quantity"
              defaultValue={1}
              min="1"
              aria-label="Cambiar cantidad"
            />
            <ButtonSmall type="submit" name="Agregar al Carrito"></ButtonSmall>
          </form>
        </div>
      </Column>
    </>
  );
};
