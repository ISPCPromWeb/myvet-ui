// import { productsApi } from "@/api/products";

import Link from "next/link";
import { Column } from "../Column";
import styles from "./ServiceContent.module.css";

export const ServiceContent = (props: any) => {
  const {
    content: { title, description, soon, features, anchors },
  } = props;
  return (
    <Column size={7}>
      <div className="w-100 align-self-center p-5">
        <h2 className="display-4 fw-bold ms-4 ">{title}</h2>

        <p className="mx-4 mt-5 mb-2 fs-5">{description}</p>
        <p
          className={`${styles.parag}text-decoration-underline fst-italic mt-3 fs-4 text-end`}
        >
          {soon}
        </p>
        <ul className={`${styles.lista2} text-end`}>
          {features.map((feature: any, index: number) => (
            <li key={index} className="text-end">
              {feature}
            </li>
          ))}
        </ul>

        {anchors &&
          anchors.map((anchor: any, index: number) => (
            <Link
              key={index}
              className={`${styles.vinculos} mx-5 my-6 text-center`}
              href="/login"
            >
              {anchor}
            </Link>
          ))}
      </div>
    </Column>
  );
};
