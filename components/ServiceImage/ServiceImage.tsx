import { Column } from "../Column";
import styles from "./ServiceImage.module.css";

export const ServiceImage = (props: any) => {
  const { image } = props;
  return (
    <Column size={5}>
      <div className="w-100 d-md-flex justify-content-md-center align-self-center text-center mx-auto p-5">
        <img
          src={image}
          className={`img-fluid d-md-block ${styles.imgVetDuenos}`}
          alt=""
        />
      </div>
    </Column>
  );
};
