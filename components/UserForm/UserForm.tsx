import styles from "./UserForm.module.css";
import { useUserContext } from "@/context";
import { useRouter } from "next/navigation";
import { ButtonSmall } from "../ButtonSmall";
import { userApi } from "@/api";
import { Toast } from "../Toast";
import { useState } from "react";

export const UserForm = () => {
  const { user, setUser } = useUserContext();
  const [toastText, setToastText] = useState("");
  const router = useRouter();
  const handleEditClient = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.set("password", user.password);
    try {
      const updatedUser = await userApi.updateOne(user.id, formData);
      setToastText("Usuario actualizado con éxito!");
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Client update failed", error);
    }
    setTimeout(() => {
      setToastText("");
    }, 2000);
  };

  return (
    user && (
      <>
        {toastText !== "" && <Toast text={toastText} />}
        <h2>Bienvenide, {user.name}</h2>
        <div className="">
          <div className="col-md-12">
            <h3 className="mt-6">Tus datos</h3>
          </div>
        </div>
        <form className="g-3 pt-4 mt-4 mx-4" onSubmit={handleEditClient}>
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

          <div className="col-md-4">
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

          <div className="col-md-4">
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

          <div className="col-md-4">
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

          <div className="col-12 pt-4 my-4">
            <ButtonSmall name="Guardar cambios" type="submit" />
          </div>
        </form>
      </>
    )
  );
};
