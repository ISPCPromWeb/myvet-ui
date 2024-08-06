import Image from "next/image";
import styles from "./index.module.css";

const Contact = () => {
  return (
    <>
      <section>
        <div className={`${styles.jumbotron} text-center`}>
          <div className="container-fluid bg-grey text-center">
            <h2 className="text-center pb-4">Contactá con nuestro Equipo</h2>
            <div className={`${styles.row}`}>
              <div className="col-sm-6 col-md-12 d-inline m-1">
                <p className=" align-self-center">
                  My Vet es un sistema de Gestión Integral desarrollado pensando
                  exclusivamente en las necesidades de las veterinarias. Es
                  sistema de gestión de historias clínicas para veterinarias,
                  manteniendo un registro actualizado de los clientes y sus
                  mascotas. La automatización de las historias clínicas
                  permitirá al médico veterinario llevar un mayor control y
                  seguimiento de las consultas y evolución de sus pacientes.
                  Permite llevar un registro de todo el tratamiento prescrito
                  para cada mascota. Por dudas, consultas, o simplemente para
                  solicitar más información contactanos!!! Te responderemos en
                  un plazo de 24 horas.
                </p>
              </div>

              <div className="col-sm-6 col-md-12 text-center d-inline m-1">
                <form>
                  <div className={`${styles.row} gap-3`}>
                    <div className="col-sm-4 form-group ">
                      <input
                        className="form-control"
                        id="txtNombre"
                        name="txtNombre"
                        placeholder="Nombre"
                        type="text"
                        aria-label="Ingresa tu nombre"
                        required
                      />
                    </div>
                    <div className="col-sm-4 form-group">
                      <input
                        className="form-control"
                        id="txtEmail"
                        name="txtEmail"
                        placeholder="Email"
                        type="email"
                        aria-label="Ingresa tu correo electronico"
                        required
                      />
                    </div>
                  </div>
                  <textarea
                    className="form-control col-sm-3 mt-3"
                    id="txtMensaje"
                    name="txtMensaje"
                    aria-label="Ingresa tu mensaje"
                    placeholder="Mensaje..."
                    rows={5}
                  ></textarea>
                  <br />
                  <div className={`${styles.row}`}>
                    <div className="col-sm-12 form-group">
                      <button
                        className={`${styles.btn} btn
                         btn-primary`}
                        type="submit"
                        // onClick="hizoClick()"
                      >
                        Enviar
                      </button>
                      <div className={`${styles.consulta} mt-3`}></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.contacto}`}>
        <div className="container w-50 m-auto text-center" id="equipo">
          <h2 className="my-5 fs-2">
            Equipo pequeño con
            <span className="fw-bold"> resultados Grandes</span>.
          </h2>
          <p className="fs-4">Te presentamos al equipo detrás de My Vet</p>
        </div>
        <div className="row">
          <div className="container align-items-center">
            <div className="col-sm-6 col-md-12 text-center ">
              <h3>GUADA PADIN ROJAS</h3>
              <h4>Desarrolladora</h4>
              <p>Contacto:</p>
              <p>
                <a
                  href="https://www.linkedin.com/in/guadalupepadinrojas/"
                  aria-label="LinkedIn de Guada Padin Rojas"
                >
                  <img
                    src="../assets/LogoLinkedInP1.png"
                    alt=""
                    height="50"
                    width="50"
                  />
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/GPRNomade"
                  aria-label="GitHub de Guada Padin Rojas"
                >
                  <img
                    src="../assets/LogoGithubP1.png"
                    alt=""
                    height="50"
                    width="50"
                  />
                </a>
              </p>
              <p className="fw-bold">GPRNomade</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
