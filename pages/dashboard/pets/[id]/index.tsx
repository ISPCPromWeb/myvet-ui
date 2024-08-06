import Link from "next/link";
import styles from "./index.module.css";
import { petsApi, userApi } from "@/api";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { ButtonSmall } from "@/components/ButtonSmall";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [pet] = await petsApi.getOne(Number(id));
  const [user] = await userApi.getOne(Number(pet.owner));
  const [petType] = await petsApi.getType(Number(pet.type));
  return {
    props: {
      pet,
      petType,
      user,
    },
  };
};

const Pet = (props: any) => {
  const { pet, petType, user } = props;

  return (
    <DashboardLayout>
      <div className={styles.clientsList}>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Nombre: </span> <span>{pet.name}</span>
          </li>
          <li className="list-group-item">
            <span>Dueña/o: </span>
            <span>
              <Link href={`/dashboard/clients/${user.id}`}>
                {user.name} {user.surname}
              </Link>
            </span>
          </li>
          <li className="list-group-item">
            <span>Tipo: </span> <span>{petType.name}</span>
          </li>
          <li className="list-group-item">
            <span>Raza: </span> <span>{pet.breed}</span>
          </li>
          <li className="list-group-item">
            <span>Edad: </span> <span>{pet.age}</span>
          </li>
          <li className="list-group-item">
            <span>Vacunas aplicadas: </span>{" "}
            {pet.vaccines.map((vaccine: any, index: number) => (
              <span key={index} className="me-2">
                {vaccine.name}
              </span>
            ))}
          </li>
        </ul>
      </div>
      <Link href={`/dashboard/pets/edit/${pet.id}`}>
        <ButtonSmall type="button" name="Editar" />
      </Link>
    </DashboardLayout>
  );
};

export default Pet;
