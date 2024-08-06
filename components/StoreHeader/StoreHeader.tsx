import styles from "./StoreHeader.module.css";
import { Breadcrumbs } from "../Breadcrums";
import { Column } from "../Column";
import { Columns } from "../Columns";

export const StoreHeader = () => {
  return (
    <>
      <Columns color="white" borderRadius="0">
        <div className="container w-100 col-12 col-xxl-8 px-4 pb-4 pt-2">
          <div className="row">
            <Breadcrumbs />
            <h3>My Vet Tienda</h3>
            <p>Elegí los productos que tu mascota necesita</p>
          </div>
        </div>
      </Columns>
    </>
  );
};
