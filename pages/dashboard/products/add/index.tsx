import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import { petsApi, productsApi } from "@/api";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async () => {
  const petTypes = await petsApi.getTypes();
  const productTypes = await productsApi.getTypes();
  return {
    props: {
      petTypes,
      productTypes,
    },
  };
};

const AddProduct = (props: any) => {
  const { petTypes, productTypes } = props;
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await productsApi.createOne(formData);
      setToastText("Producto agregado con éxito!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Product creation failed", error);
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    <DashboardLayout>
      {toastText !== "" && <Toast text={toastText} />}
      <form
        className="g-3 pt-4 mt-4 mx-4"
        onSubmit={handleAddProduct}
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
            defaultValue={""}
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
            defaultValue={""}
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
            defaultValue={""}
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
            defaultValue={""}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="type" className="form-label">
            Tipo de Producto
          </label>
          <select className="form-control" name="type" id="type" required>
            <option value={0}>Seleccione una opción</option>
            {productTypes.map((type: any, index: number) => (
              <option key={index} value={type.id}>
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
              <option key={index} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="img" className="form-label">
            Imagen
          </label>
          <input type="file" className="form-control" name="img" id="img" />
        </div>
        <ButtonSmall type="submit" name="Agregar Producto" />
      </form>
    </DashboardLayout>
  );
};

export default AddProduct;
