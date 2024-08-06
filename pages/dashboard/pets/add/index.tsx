import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import { petsApi, userApi } from "@/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import { useEffect, useState } from "react";
import { LEVELS } from "@/constants";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async () => {
  const clients = await userApi.getAll();
  const petTypes = await petsApi.getTypes();
  return {
    props: {
      clients,
      petTypes,
    },
  };
};

const AddPet = (props: any) => {
  const { clients, petTypes } = props;
  const router = useRouter();
  const [toastText, setToastText] = useState("");
  const handleAddPet = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await petsApi.createOne(formData);
      setToastText("Mascota agregada con éxito!");
      router.push("/dashboard/pets");
    } catch (error) {
      console.error("Pet creation failed", error);
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
          onSubmit={handleAddPet}
          encType="multipart/form-data"
        >
          <div className="col-md-4">
            <label htmlFor="nombre" className="form-label">
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
            <label htmlFor="type" className="form-label">
              Tipo
            </label>
            <select className="form-control" name="type" id="type" required>
              <option value={0}>Seleccione una opción</option>
              {petTypes.map((type: any, index: number) => (
                <option key={index} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="breed" className="form-label">
              Raza
            </label>
            <input
              type="text"
              className="form-control"
              name="breed"
              id="bredd"
              required
              defaultValue={""}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="age" className="form-label">
              Edad
            </label>
            <input
              type="text"
              className="form-control"
              name="age"
              id="age"
              required
              defaultValue={""}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label htmlFor="owner" className="form-label">
              Dueña/o
            </label>
            <select className="form-control" name="owner" id="owner" required>
              <option value={0}>Seleccione una opción</option>
              {clients.map((client: any, index: number) => (
                <option key={index} value={client.id}>
                  {client.name} {client.surname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <ButtonSmall type="submit" name="Agregar Mascota" />
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPet;
