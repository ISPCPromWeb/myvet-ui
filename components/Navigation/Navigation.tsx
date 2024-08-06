import Link from "next/link";
import styles from "./Navigation.module.css";
import { useUserContext } from "@/context";
import { useEffect } from "react";

export const Navigation = () => {
  const { user } = useUserContext();

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg bg-transparent`}>
      <div className="container">
        <Link className={`${styles.vincnav} navbar-brand fw-bold`} href={"/"}>
          <img
            className={`${styles.isotipoNav} mx-3`}
            src="./assets/IsoLight.png"
            alt=""
          />
          My Vet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-1 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`${styles.vincnav} nav-link active fw-bold me-4`}
                href={"/cart"}
                aria-current="page"
              >
                Carrito
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles.vincnav} nav-link active fw-bold me-4`}
                href={"/store"}
                aria-current="page"
              >
                Tienda
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles.vincnav} nav-link active fw-bold me-4`}
                aria-current="page"
                href={user ? "/dashboard" : "/login"}
              >
                {user ? user.name : `Ingresa`}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
