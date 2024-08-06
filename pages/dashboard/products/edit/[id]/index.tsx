import { ButtonSmall } from "@/components/ButtonSmall";
import styles from "./index.module.css";
import { petsApi, productsApi } from "@/api";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Toast } from "@/components/Toast";
import { API_URL_IMAGE } from "@/api/constants";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [product] = await productsApi.getOne(Number(id));
  const petTypes = await petsApi.getTypes();
  const productTypes = await productsApi.getTypes();
  return {
    props: {
      id,
      product,
      petTypes,
      productTypes,
    },
  };
};

const Pet = (props: any) => {
  const { id, product, petTypes, productTypes } = props;
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleEditProduct = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await productsApi.updateOne(id, formData);
      setToastText("Producto actualizado con éxito!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Product update failed", error);
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    <DashboardLayout>
      {toastText !== "" && <Toast text={toastText} />}
      <div className={styles.clientsList}>
        <form
          className="g-3 pt-4 mt-4 mx-4"
          onSubmit={handleEditProduct}
          encType="multipart/form-data"
        >
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              required
              defaultValue={product.name}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              required
              defaultValue={product.description}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="quantity" className="form-label">
              Disponibles
            </label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              id="quantity"
              required
              defaultValue={product.quantity}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              Precio
            </label>
            <input
              type="text"
              className="form-control"
              name="price"
              id="price"
              required
              defaultValue={product.price}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="type" className="form-label">
              Tipo de Producto
            </label>
            <select className="form-control" name="type" id="type" required>
              <option value={0}>Seleccione una opción</option>
              {productTypes.map((type: any, index: number) => (
                <option
                  key={index}
                  value={type.id}
                  selected={product.type === type.id}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="pet_type" className="form-label">
              Tipo de Mascota
            </label>
            <select
              className="form-control"
              name="pet_type"
              id="pet_type"
              required
            >
              <option value={0}>Seleccione una opción</option>
              {petTypes.map((type: any, index: number) => (
                <option
                  key={index}
                  value={type.id}
                  selected={product.pet_type === type.id}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            {product.img ? (
              <>
                <label htmlFor="img" className="form-label">
                  Imagen
                </label>
                <>
                  {!isImageChanging ? (
                    <div className="d-flex">
                      <Image
                        width={200}
                        height={200}
                        src={`${API_URL_IMAGE}${product.img}`}
                        alt=""
                      />
                      <ButtonSmall
                        callback={() => setIsImageChanging(!isImageChanging)}
                        type="button"
                        name="Cambiar Imagen"
                      />
                    </div>
                  ) : (
                    <div className="d-flex">
                      <input
                        type="file"
                        className="form-control"
                        name="img"
                        id="img"
                        required
                        defaultValue={""}
                      />
                      <ButtonSmall
                        callback={() => setIsImageChanging(!isImageChanging)}
                        type="button"
                        name="Cancelar"
                      />
                    </div>
                  )}
                </>
              </>
            ) : (
              <>
                <label htmlFor="img" className="form-label">
                  Imagen
                </label>
                <div className="d-flex">
                  <input
                    type="file"
                    className="form-control"
                    name="img"
                    id="img"
                    required
                    defaultValue={""}
                  />
                </div>
              </>
            )}
          </div>
          <ButtonSmall type="submit" name="Guardar" />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Pet;
