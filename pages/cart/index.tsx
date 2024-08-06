import styles from "./index.module.css";
import { CartItem } from "@/components/CartItem";
import { CheckoutButton } from "@/components/CheckoutButton";
import mercadopago from "mercadopago";
import cookie from "cookie";
import { useAppContext, useCartContext, useUserContext } from "@/context";
import { formattedPrice } from "@/utils";
import { useEffect } from "react";
import Link from "next/link";
import { ButtonSmall } from "@/components/ButtonSmall";

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "[]");
  const cart = cookies.cart
    ? JSON.parse(cookies.cart)
    : [
        {
          name: "Algo salió mal",
          price: 404,
          quantity: 404,
        },
      ];

  const formattedCart = cart?.map((cartItem: any) => {
    return {
      title: cartItem.name,
      unit_price: cartItem.price,
      quantity: cartItem.quantity,
    };
  });

  mercadopago.configure({
    access_token: process.env.MEPA_TOKEN || "",
  });

  const URL = "https://myvet-three.vercel.app/";

  const preference: any = {
    items: formattedCart,
    auto_return: "approved",
    back_urls: {
      success: `${URL}/cart/summary`,
      failure: `${URL}/cart/`,
    },
    notification_url: `${URL}/cart/summary/`,
  };

  const response = await mercadopago.preferences.create(preference);

  return {
    props: {
      url: response.body.init_point,
    },
  };
};

const Cart = (props: any) => {
  const { url } = props;
  const { cart } = useCartContext();
  const { user } = useUserContext();
  const { setType } = useAppContext();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setType("cart");
  });

  return (
    <div
      className={`${styles.wrapper} container w-100 justify-content-md-center container-md my-5`}
    >
      <div className="h-100 row g-5">
        {cart.length !== 0 ? (
          <>
            <div className="col-md-12 col-lg-6 order-last ">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="mb-1">Tu Carrito</h3>
                </div>
              </div>
              {cart.map((product, index) => (
                <CartItem key={index} product={product} />
              ))}

              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between py-4">
                  <span>Total (ARS)</span>
                  <strong>{formattedPrice(totalPrice)}</strong>
                </li>
              </ul>
              <CheckoutButton url={url} />
            </div>
            <div className="col-md-12 col-lg-6 ">
              <h3>Datos de la compra</h3>
              <form className="needs-validation">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      defaultValue={user?.name}
                      required
                    />
                    <div className="invalid-feedback">
                      Se requiere un nombre válido.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      defaultValue={user?.surname}
                      required
                    />
                    <div className="invalid-feedback">
                      Se requiere apellido válido.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="dni" className="form-label">
                      DNI (solo números)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="dni"
                      id="dni"
                      placeholder="12345678"
                      pattern="[0-9]{8}"
                      defaultValue={user?.dni}
                      required
                    />
                    <div className="invalid-feedback">Tu DNI es requerido</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      defaultValue={user?.email}
                    />
                    <div className="invalid-feedback">
                      Ingresa tu dirección de email válida.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      defaultValue={user?.address}
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor introduce tu dirección de envío.
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </form>
            </div>
          </>
        ) : (
          <>
            <h3>Tu Carrito</h3>
            <p>
              Tu carrito está vacío!. Ve a la tienda para llevarte algo lindo :)
            </p>
            <Link href={`/`}>
              <ButtonSmall type="button" name="ir a la Tienda" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
