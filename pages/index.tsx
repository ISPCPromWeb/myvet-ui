// import { productsApi } from "@/api/products";
import styles from "./index.module.css";
import { Services } from "@/components/Services";
import { FeatProducts } from "@/components/FeatProducts";
import { StoreHeader } from "@/components/StoreHeader";
import { productsApi } from "@/api";
import { useEffect } from "react";
import { useAppContext, useCartContext } from "@/context";

export const getServerSideProps = async () => {
  const products = await productsApi.getAll();
  return {
    props: {
      products,
    },
  };
};

const Home = (props: any) => {
  const { products } = props;
  const { setType } = useAppContext();
  const { cart } = useCartContext();

  useEffect(() => {
    setType("common");
    if (cart.length === 0) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [setType]);

  return (
    <main id="main">
      <section
        className={`${styles.hero} h-100 px-5 text-left d-flex`}
        id="hero"
      >
        <div className=" container">
          <div className="row">
            <div className="col-lg-5">
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade  m-auto d-inline"
                data-bs-interval="100"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="./assets/LogoDark.png"
                      className={`${styles.logo} img-fluid  justify-content-sm-center`}
                      alt=""
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./assets/LogoLight.png"
                      className={`${styles.logo} img-fluid justify-content-sm-center`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <h1 className=" text-left py-5 ">My Vet</h1>
              <h2 className={`${styles.h2Hero} mt-2 fs-1`}>
                Sistema Integral de Gestión Veterinaria
              </h2>
              <p className="my-5 fs-4">
                Contá con la información de tus mascotas/pacientes de manera
                rápida y confiable. En cualquier lugar, en cualquier momento.
              </p>
              <a
                className={`${styles.vinculos} col-auto mx-auto my-5 justify-content-end`}
                href={"/login/"}
              >
                Ingreso para Dueñas/os aquí
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <h2 className={`${styles.h2Hero} display-4 fw-bold `}>
          My Vet Tienda{" "}
        </h2>
      </div>

      <FeatProducts products={products} />

      <Services />
    </main>
  );
};

export default Home;
