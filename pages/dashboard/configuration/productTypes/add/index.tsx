import { useRouter } from "next/navigation";
import styles from "./index.module.css";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import { productsApi } from "@/api";
import { useState } from "react";
import { Toast } from "@/components/Toast";

const AddProductType = () => {
  const router = useRouter();
  const [toastText, setToastText] = useState("");
  const handleAddProductType = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await productsApi.createType(formData);
      setToastText("Tipo de producto agregado con éxito!");
      router.push("/dashboard/configuration");
    } catch (error) {
      console.error("Product Type creation failed", error);
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
          onSubmit={handleAddProductType}
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

          <ButtonSmall type="submit" name="Agregar Nuevo Tipo de Producto" />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProductType;
