/* import mercadopago from "mercadopago"; */
/* import cookie from "cookie"; */

import { CartItem } from "@/components/CartItem";
import { useCartContext } from "@/context";
import { formattedPrice } from "@/utils";
import styles from "./index.module.css";
import { ButtonSmall } from "@/components/ButtonSmall";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  /* const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "[]");
  const cart = JSON.parse(cookies.cart); */

  /* const searchParams = req.params;
  const topic = searchParams.topic || searchParams.type;

  console.log({ topic }); */
  /* try {
    if (topic === "payment") {
      const paymentId = searchParams.id || searchParams.data.id;
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status;

      console.log({ payment, paymentStatus });
    } else {
      return new Response(JSON.stringify({ message: "Invalid topic" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } */

  return {
    props: {},
  };
};

const Summary = () => {
  const { cart } = useCartContext();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleResetCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
  };
  return (
    <div className={styles.wrapper}>
      <h2>Resumen de Compra</h2>
      {cart.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between py-4">
          <span>Total (ARS)</span>
          <strong>{formattedPrice(totalPrice)}</strong>
        </li>
      </ul>
      <Link href={`/`}>
        <ButtonSmall
          callback={() => handleResetCart()}
          type="button"
          name="Ir a la Página Principal"
        />
      </Link>
    </div>
  );
};

export default Summary;
