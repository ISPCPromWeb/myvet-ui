import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./index.module.css";
import { petsApi } from "@/api";
import Link from "next/link";
import { ButtonSmall } from "@/components/ButtonSmall";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import { LEVELS } from "@/constants";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async () => {
  const rawPets = await petsApi.getAll();
  const petTypes = await petsApi.getTypes();
  const pets = rawPets.map((pet: any) => {
    const typeName =
      petTypes.find((type: any) => type.id === pet.type)?.name || "Unknown";
    return { ...pet, type: typeName };
  });
  return {
    props: {
      pets,
      petTypes,
    },
  };
};

const Pets = (props: any) => {
  const { pets, petTypes } = props;
  const { user } = useUserContext();
  const [toastText, setToastText] = useState("");
  const userPets =
    user &&
    user.pets.map((pet: any) => {
      const typeName =
        petTypes.find((type: any) => type.id === pet.type)?.name || "Unknown";
      return { ...pet, type: typeName };
    });
  const renderedPets = user && user.level === LEVELS.client ? userPets : pets;

  const router = useRouter();
  const handleDeletePet = async (id: number) => {
    try {
      await petsApi.deleteOne(id);
      setToastText("Mascota eliminada con éxito!");
      router.refresh();
    } catch (error) {
      console.error("Pet deletion failed", error);
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    <DashboardLayout>
      {toastText !== "" && <Toast text={toastText} />}
      <div className={styles.clientsList}>
        {user && user.level === LEVELS.professional && (
          <div className="w-100 my-4">
            <Link href={`/dashboard/pets/add`}>
              <ButtonSmall name="Agregar Mascota" type="button" />
            </Link>
          </div>
        )}
        {renderedPets.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Raza</th>
                <th scope="col">Edad</th>
                <th scope="col">Vacunas</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {renderedPets.map((pet: any, index: number) => (
                <tr key={index}>
                  <td>
                    <Link href={`/dashboard/pets/${pet.id}`}>{pet.name}</Link>
                  </td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>
                    {pet.vaccines.map((vaccine: any, index: number) => (
                      <span key={index} className="me-2">
                        {vaccine.name}
                      </span>
                    ))}
                  </td>
                  {user && user.level === LEVELS.professional && (
                    <td className="d-flex gap-2 pe-4 justify-content-end">
                      <Link href={`/dashboard/pets/edit/${pet.id}`}>
                        <ButtonSmall name="Editar" type="button" />
                      </Link>

                      <ButtonSmall
                        callback={() => handleDeletePet(pet.id)}
                        type={`button`}
                        name={`Borrar`}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <h3>No tienes mascotas en este momento</h3>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pets;
