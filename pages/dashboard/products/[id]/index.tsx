import Link from "next/link";
import styles from "./index.module.css";
import { productsApi } from "@/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import Image from "next/image";
import { API_URL_IMAGE } from "@/api/constants";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [product] = await productsApi.getOne(Number(id));
  return {
    props: {
      product,
    },
  };
};

const Product = (props: any) => {
  const { product } = props;

  return (
    <DashboardLayout>
      <div className={styles.clientsList}>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Nombre: </span> <span>{product.name}</span>
          </li>
          <li className="list-group-item">
            <span>Descripción: </span> <span>{product.description}</span>
          </li>
          <li className="list-group-item">
            <span>Disponible: </span> <span>{product.quantity}</span>
          </li>
          <li className="list-group-item">
            <span>Precio: </span> <span>{product.price}</span>
          </li>
          <li className="list-group-item">
            <span>Image: </span>{" "}
            {product.img ? (
              <Image
                width={200}
                height={200}
                src={`${API_URL_IMAGE}${product.img}`}
                alt={""}
              />
            ) : (
              <span>Sin imagen</span>
            )}
          </li>
        </ul>
      </div>
      <Link href={`/dashboard/products/edit/${product.id}`}>
        <ButtonSmall type="button" name="Editar" />
      </Link>
    </DashboardLayout>
  );
};

export default Product;
