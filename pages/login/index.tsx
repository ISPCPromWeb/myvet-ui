import { authApi } from "@/api";
import styles from "./index.module.css";
import { useUserContext } from "@/context";
import { useRouter } from "next/navigation";

const Login = () => {
  const { setUser } = useUserContext();
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      const currentUser = await authApi.userLogin(formData);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <main>
        <section className="">
          <div className={`${styles.row} g-0`}>
            <div
              className={`${styles.fondoCarrusel} col-lg-7 d-none d-lg-block`}
            >
              <div
                id="carouselExampleCaptions"
                className="carousel slide min-vh-100"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div
                    className={`${styles.img1} carousel-item min-vh-100 active`}
                  >
                    <div className="carousel-caption d-none d-md-block">
                      <h5 className={styles.caption}>
                        La mejor atención y variedad de productos
                      </h5>
                    </div>
                  </div>
                  <div className={`${styles.img2} carousel-item min-vh-100`}>
                    <div className="carousel-caption d-none d-md-block">
                      <h5 className={styles.caption}>
                        Protección tu Mascotas. Tranquilidad para ti
                      </h5>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className={`${styles.flecha} carousel-control-prev-icon`}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className={`${styles.flecha} carousel-control-next-icon`}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className="col-lg-5 d-flex flex-column align-items-end min-vh-100">
              <div className="px-lg-5 py-lg-4 px-5 w-100 mt-auto ">
                <div className="align-items-center pb-3 ">
                  <img
                    src="/assets/IsoDark.png"
                    className={`${styles.imgSmall} mx-auto`}
                  />
                </div>
                <h1 className={`${styles.h1Small} fw-bold text-center`}>
                  My Vet
                </h1>
                <h2 className="mb-5">Bienvenide</h2>
                <form onSubmit={handleLogin} encType="multipart/form-data">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-2 mb-2"
                      placeholder="Ingresa tu Email"
                      aria-describedby="emailHelp"
                    />

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label fw-bold"
                      >
                        Contraseña:
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control border-2 mb-2"
                        placeholder="Ingresa tu Contraseña"
                      />
                      <a
                        href="#"
                        id="emailHelp"
                        className={`${styles.vincnav} form-text `}
                      >
                        Has olvidado tu Contraseña?
                      </a>
                    </div>
                  </div>
                  <div className="align-items-center ">
                    <button
                      className={`${styles.btn}  mx-auto btn w-30 `}
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto">
                <p className="d-inline-block nb-0"></p>
                <a href="#" className="text-decoration-none fw-bold"></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
