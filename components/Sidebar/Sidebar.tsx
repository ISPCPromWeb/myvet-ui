import Link from "next/link";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/navigation";
import { authApi } from "@/api";
import { useUserContext } from "@/context";
import { LEVELS } from "@/constants";

export const Sidebar = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      await authApi.userLogout(formData);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", "");
        setUser(null);
      }
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav
      className={`${styles.navbar} navbar-expand-md navbar-toggler h-100 d-flex flex-column p-3`}
    >
      <div className="container-fluid">
        <button className="navbar-toggler">
          <h4
            className={`${styles.vincnavH4} ${styles.navbarBrand} navbar-brand `}
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menú
          </h4>
        </button>

        <div className=" navbar-collapse collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav flex-column mb-auto">
            <li className={`${styles.navItem} nav-item`}>
              <Link
                href={`/dashboard`}
                className={`${styles.vincnav} nav-link  `}
              >
                Perfil
              </Link>
            </li>
            {user && user.level === LEVELS.professional && (
              <li className={`${styles.navItem} nav-item`}>
                <Link
                  href={`/dashboard/clients`}
                  className={`${styles.vincnav} nav-link`}
                >
                  Clientes
                </Link>
              </li>
            )}
            <li className={`${styles.navItem} nav-item`}>
              <Link
                href={`/dashboard/pets`}
                className={`${styles.vincnav} nav-link`}
              >
                Mascotas
              </Link>
            </li>
            <li className={`${styles.navItem} nav-item`}>
              <Link
                href={`/dashboard/vaccines`}
                className={`${styles.vincnav} nav-link`}
              >
                Aplicaciones de Vacunas
              </Link>
            </li>
            {user && user.level === LEVELS.professional && (
              <li className={`${styles.navItem} nav-item`}>
                <Link
                  href={`/dashboard/products`}
                  className={`${styles.vincnav} nav-link`}
                >
                  Productos
                </Link>
              </li>
            )}
            {user && user.level === LEVELS.professional && (
              <li className={`${styles.navItem} nav-item`}>
                <Link
                  href={`/dashboard/configuration`}
                  className={`${styles.vincnav} nav-link`}
                >
                  Configuración
                </Link>
              </li>
            )}
            <hr />
            <form onSubmit={handleLogout} encType="multipart/form-data">
              <button
                className={`${styles.btn} btn vincnav nav-link`}
                type="submit"
              >
                Cerrar Sesión
              </button>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};
