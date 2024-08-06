import Link from "next/link";
import styles from "./index.module.css";
import { petsApi, productsApi } from "@/api";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";
import { vaccinesApi } from "@/api/vaccines";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import { LEVELS } from "@/constants";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async () => {
  const rawVaccines = await vaccinesApi.getAll();
  const vaccineTypes = await vaccinesApi.getTypes();
  const pets = await petsApi.getAll();

  return {
    props: {
      rawVaccines,
      vaccineTypes,
      pets,
    },
  };
};

const Vaccines = (props: any) => {
  const { rawVaccines, vaccineTypes, pets } = props;
  const { user } = useUserContext();
  const renderedPets = user && user.level === LEVELS.client ? user.pets : pets;
  const [toastText, setToastText] = useState("");
  const vaccines = rawVaccines.map((vaccine: any) => {
    const typeName =
      vaccineTypes.find((type: any) => type.id === vaccine.type)?.name ||
      "Unknown";
    const petName =
      renderedPets.find((pet: any) => pet.id === vaccine.pet)?.name ||
      "Unknown";
    return { ...vaccine, type: typeName, pet: petName };
  });

  const router = useRouter();
  const handleDeleteVaccine = async (id: number) => {
    try {
      await vaccinesApi.deleteOne(id);
      setToastText("Aplicación de vacuna eliminada con éxito!");
      router.refresh();
    } catch (error) {
      console.error("Vaccine deletion failed", error);
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
            <Link href={`/dashboard/vaccines/add`}>
              <ButtonSmall name="Agregar Aplicación de Vacuna" type="button" />
            </Link>
          </div>
        )}
        {vaccines.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Fecha</th>
                <th scope="col">Mascota</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine: any, index: number) => (
                <tr key={index}>
                  <td>{vaccine.type}</td>
                  <td>{vaccine.app_date}</td>
                  <td>{vaccine.pet}</td>
                  <td>
                    <Link href={`/dashboard/vaccines/edit/${vaccine.id}`}>
                      <ButtonSmall name="Editar" type="button" />
                    </Link>
                    <ButtonSmall
                      callback={() => handleDeleteVaccine(vaccine.id)}
                      type={`button`}
                      name={`Borrar`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <h3>No tienes vacunas en este momento</h3>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vaccines;
