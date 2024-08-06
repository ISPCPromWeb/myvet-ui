import { ButtonSmall } from "@/components/ButtonSmall";
import styles from "./index.module.css";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";
import { petsApi, vaccinesApi } from "@/api";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [vaccine] = await vaccinesApi.getOne(Number(id));
  const pets = await petsApi.getAll();
  const vaccineTypes = await vaccinesApi.getTypes();
  console.log(vaccine.app_date, typeof vaccine.app_date);
  return {
    props: {
      id,
      pets,
      vaccine,
      vaccineTypes,
    },
  };
};

const EditVaccine = (props: any) => {
  const { id, pets, vaccine, vaccineTypes } = props;
  const [toastText, setToastText] = useState("");
  const [newDate, setNewDate] = useState<string | undefined>();
  const router = useRouter();
  const handleEditVaccine = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (newDate) {
      formData.set("app_date", newDate);
    } else {
      formData.set("app_date", vaccine.app_date);
    }
    try {
      await vaccinesApi.updateOne(id, formData);
      setToastText("Aplicación de vacuna actualizada con éxito!");
      router.push("/dashboard/vaccines");
    } catch (error) {
      console.error("Vaccine update failed", error);
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
          onSubmit={handleEditVaccine}
          encType="multipart/form-data"
        >
          <div className="col-md-4">
            <label htmlFor="nombre" className="form-label">
              Nombre de la Vacuna aplicada
            </label>
            <select className="form-control" name="type" id="type" required>
              <option value={0}>Seleccione una opción</option>
              {vaccineTypes.map((type: any, index: number) => (
                <option
                  key={index}
                  value={type.id}
                  selected={vaccine.type === type.id}
                >
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
              onChange={(e) => setNewDate(e.currentTarget.value)}
              defaultValue={vaccine.app_date}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pet" className="form-label">
              Mascota
            </label>
            <select className="form-control" name="pet" id="pet" required>
              <option value={0}>Seleccione una opción</option>
              {pets.map((pet: any, index: number) => (
                <option
                  key={index}
                  value={pet.id}
                  selected={vaccine.pet === pet.id}
                >
                  {pet.name}
                </option>
              ))}
            </select>
          </div>
          <ButtonSmall type="submit" name="Editar" />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditVaccine;
