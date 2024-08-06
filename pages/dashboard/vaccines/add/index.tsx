import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import { petsApi, productsApi } from "@/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import { vaccinesApi } from "@/api";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async () => {
  const vaccineTypes = await vaccinesApi.getTypes();
  const pets = await petsApi.getAll();
  return {
    props: {
      pets,
      vaccineTypes,
    },
  };
};

const AddVaccine = (props: any) => {
  const { vaccineTypes, pets } = props;
  const router = useRouter();
  const [toastText, setToastText] = useState("");
  const handleAddVaccine = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await vaccinesApi.createOne(formData);
      setToastText("Aplicación de vacuna agregada con éxito!");
      router.push("/dashboard/vaccines");
    } catch (error) {
      console.error("Vaccine creation failed", error);
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
          onSubmit={handleAddVaccine}
          encType="multipart/form-data"
        >
          <div className="col-md-4">
            <label htmlFor="nombre" className="form-label">
              Nombre de la Vacuna aplicada
            </label>
            <select className="form-control" name="type" id="type" required>
              <option value={0}>Seleccione una opción</option>
              {vaccineTypes.map((type: any, index: number) => (
                <option key={index} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="app_date" className="form-label">
              Fecha de aplicación
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="app_date"
              id="app_date"
              required
              defaultValue={""}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pet" className="form-label">
              Mascota
            </label>
            <select className="form-control" name="pet" id="pet" required>
              <option value={0}>Seleccione una opción</option>
              {pets.map((type: any, index: number) => (
                <option key={index} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <ButtonSmall type="submit" name="Agregar Vacuna" />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddVaccine;
