import { ButtonSmall } from "@/components/ButtonSmall";
import styles from "./index.module.css";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useRouter } from "next/navigation";
import { productsApi } from "@/api";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [productType] = await productsApi.getType(Number(id));
  return {
    props: {
      id,
      productType,
    },
  };
};

const EditProductType = (props: any) => {
  const { id, productType } = props;
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleEditProductType = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await productsApi.updateType(id, formData);
      setToastText("Tipo de producto actualizado con éxito!");
      router.push("/dashboard/configuration/");
    } catch (error) {
      console.error("Product Type update failed", error);
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
          onSubmit={handleEditProductType}
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
              defaultValue={productType.name}
            />
          </div>

          <ButtonSmall type="submit" name="Guardar" />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProductType;
