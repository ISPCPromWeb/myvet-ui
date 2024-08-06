import { Breadcrumbs } from "@/components/Breadcrums/Breadcrumbs";
import styles from "./index.module.css";
import { Columns } from "@/components/Columns";
import { ServiceImage } from "@/components/ServiceImage";
import { Column } from "@/components/Column";
import { formattedPrice } from "@/utils";
import { FeatProducts } from "@/components/FeatProducts";
import { ProductContent } from "@/components/ProductContent";
import { productsApi } from "@/api";
import { API_URL_IMAGE } from "@/api/constants";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const products = await productsApi.getAll();
  const [product] = await productsApi.getOne(Number(id));
  return {
    props: {
      products,
      product,
    },
  };
};

const Product = (props: any) => {
  const { product, products } = props;

  return (
    <>
      <main>
        <div className="container-fluid">
          <section className="d-flex py-3" id="plpContainer">
            <div className="container mb-4 d-block align-self-center">
              <div className="justify-content-end">
                <Breadcrumbs name={product.name} />
              </div>

              <Columns color="white" borderRadius="3">
                <ServiceImage image={`${API_URL_IMAGE}${product.img}`} />
                <ProductContent
                  content={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                  }}
                />
              </Columns>
            </div>
          </section>
        </div>
        <section className="container">
          <Columns color="white" borderRadius="3">
            <Column size={12}>
              <div className="user-content mb-4">
                <h2 className={`${styles.h2Description} ms-4 mb-4 `}>
                  Descripción
                </h2>
                <p className={`${styles.parag} mx-4 mt-5 mb-2`}>
                  {product.description}
                </p>
              </div>
            </Column>
          </Columns>
        </section>
        <FeatProducts products={products} />
      </main>
    </>
  );
};

export default Product;
