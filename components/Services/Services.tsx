// import { productsApi } from "@/api/products";
import { Columns } from "../Columns";
import { ServiceContent } from "../ServiceContent";
import { ServiceImage } from "../ServiceImage";
import styles from "./Services.module.css";

const servicesContent = [
  {
    image: "/assets/IconoVetes.png",
    content: {
      title: "Para Veterinarias",
      description:
        "My Vet es un sistema de gestión de historias clínicas para veterinarias, manteniendo un registro actualizado de los clientes y sus mascotas. La automatización de las historias clínicas permitirá al médico veterinario llevar un mayor control y seguimiento de las consultas y evolución de sus pacientes. Permite llevar un registro de todo el tratamiento prescrito para cada mascota:",
      soon: "Próximamente:",
      features: ["Estudios y procedimientos realizados.", "Agenda de turnos."],
      anchors: ["Ingreso para Veterinarias aquí"],
    },
  },
  {
    image: "/assets/IconoDueños.png",
    content: {
      title: "Para Dueños",
      description:
        "Chequeá la salud de tu mascota y elegí el alimento adecuado para sus necesidades. También aquí conseguirás los oufits que están de moda para lookearlos.",
      soon: "Próximamente:",
      features: ["Estudios y procedimientos realizados.", "Agenda de turnos."],
      anchors: ["Ingreso para Dueñas/os aquí"],
    },
  },
];

export const Services = () => {
  return (
    <section className="d-flex py-3">
      <div className="container mb-4 d-flex flex-column align-self-center gap-4">
        {servicesContent.map((service, index) => (
          <Columns
            key={index}
            color="white"
            borderRadius="5"
            reversed={index % 2 !== 0}
          >
            <ServiceImage image={service.image} />
            <ServiceContent content={service.content} />
          </Columns>
        ))}
      </div>
    </section>
  );
};
