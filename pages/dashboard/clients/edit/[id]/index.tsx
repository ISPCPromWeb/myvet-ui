import { ButtonSmall } from "@/components/ButtonSmall";
import styles from "./index.module.css";
import { userApi } from "@/api";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { WithAuth } from "@/components/WithAuth";
import { Toast } from "@/components/Toast";

export const getServerSideProps = async (req: any) => {
  const { id } = req.params;
  const [user] = await userApi.getOne(Number(id));
  return {
    props: {
      id,
      user,
    },
  };
};

const EditClient = (props: any) => {
  const { id, user } = props;
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleEditClient = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      formData.set("password", user.password);
      await userApi.updateOne(id, formData);
      setToastText("Cliente actualizado con éxito!");
      router.push("/dashboard/clients");
    } catch (error) {
      console.error("Client update failed", error);
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    <WithAuth>
      {toastText !== "" && <Toast text={toastText} />}
      <DashboardLayout>
        <div className={styles.clientsList}>
          <form
            className="g-3 pt-4 mt-4 mx-4"
            onSubmit={handleEditClient}
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
                defaultValue={user.name}
              />
            </div>
            <div className="col-md-4 ">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                name="surname"
                id="surname"
                required
                defaultValue={user.surname}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="dni" className="form-label">
                DNI (sin puntos)
              </label>
              <input
                type="text"
                className="form-control"
                name="dni"
                id="dni"
                placeholder="12345678"
                pattern="[0-9]{8}"
                required
                defaultValue={user.dni}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                placeholder="0123456789"
                pattern="[0-9]{10}"
                defaultValue={user.phone}
                required
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                required
                defaultValue={user.address}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="ejemplo@gmail.com"
                id="email"
                required
                defaultValue={user.email}
              />
            </div>

            <div className="col-12 pt-4 mt-4">
              <ButtonSmall type="submit" name="Guardar" />
            </div>
          </form>
        </div>
      </DashboardLayout>
    </WithAuth>
  );
};

export default EditClient;
