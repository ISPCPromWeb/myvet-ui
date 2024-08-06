import { ButtonSmall } from "@/components/ButtonSmall";
import styles from "./index.module.css";
import { petsApi, userApi } from "@/api";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [pet] = await petsApi.getOne(Number(id));
  const petTypes = await petsApi.getTypes();
  const clients = await userApi.getAll();
  return {
    props: {
      id,
      pet,
      petTypes,
      clients,
    },
  };
};

const EditPet = (props: any) => {
  const { id, pet, petTypes, clients } = props;
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleEditClient = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await petsApi.updateOne(id, formData);
      setToastText("Mascota actualizada con éxito!");
      router.push("/dashboard/pets");
    } catch (error) {
      console.error("Pet update failed", error);
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
          onSubmit={handleEditClient}
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
              defaultValue={pet.name}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="type" className="form-label">
              Tipo
            </label>
            <select className="form-control" name="type" id="type" required>
              <option value={0}>Seleccione una opción</option>
              {petTypes.map((type: any, index: number) => (
                <option
                  key={index}
                  value={type.id}
                  selected={pet.type === type.id}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="age" className="form-label">
              Edad
            </label>
            <input
              type="text"
              className="form-control"
              name="age"
              id="age"
              placeholder="12"
              required
              defaultValue={pet.age}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label htmlFor="owner" className="form-label">
              Dueña/o
            </label>
            <select className="form-control" name="owner" id="owner" required>
              <option value={0}>Seleccione una opción</option>
              {clients.map((client: any, index: number) => (
                <option
                  key={index}
                  value={client.id}
                  selected={pet.owner === client.id}
                >
                  {client.name} {client.surname}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 pt-4 mt-4">
            <ButtonSmall type="submit" name="Guardar" />
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditPet;
