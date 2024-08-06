import styles from "./Footer.module.css";

export const Footer = (props: any) => {
  const { type } = props;
  return (
    <footer className="w-100 d-flex align-items-center justify-content-center flex-wrap">
      <p className=" px-3 pt-3">
        My Vet. &copy; Todos Los Derechos Reservados 2024
      </p>
      <a className={`${styles.contactatefooter} mx-3 `} href="./contact">
        Contactate con nosotros
      </a>
      <div
        id="iconos"
        className={`${styles.iconos} disabled`}
        aria-disabled="true"
      >
        <a aria-label="Visita nuestra página de Facebook aquí">
          <img
            className={`${styles.iconos} disabled`}
            aria-disabled="true"
            src="../assets/LogoFaceP1.png"
            alt=""
          />
        </a>
        <a aria-label="Visita nuestro perfil de Instagram aquí">
          <img
            className={`${styles.iconos} disabled`}
            aria-disabled="true"
            src="../assets/LogoInstaP1.png"
            alt=""
          />
        </a>
        <a aria-label="Escribinos a nuestro Whastapp aquí">
          <img
            className={`${styles.iconos} disabled`}
            aria-disabled="true"
            src="../assets/LogoWhatsP1.png"
            alt=""
          />
        </a>
      </div>
    </footer>
  );
};
