// src/App.jsx
import { useEffect, useState } from "react";
import Inicio from "./Inicio";
import Galeria from "./Galeria";
import Bio from "./Bio";
import Contacto from "./Contacto";
import "./App.css";

const SECTIONS = ["inicio", "galeria", "bio", "contacto"];

function App() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  // Marca link activo según la sección visible
  useEffect(() => {
    const opts = { root: null, rootMargin: "0px 0px -50% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
    }, opts);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  // Navbar: intensificar fondo + sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú colapsable de Bootstrap en mobile
  const closeIfOpen = () => {
    const el = document.getElementById("navMain");
    if (el && el.classList.contains("show")) {
      const inst = window.bootstrap ? window.bootstrap.Collapse.getOrCreateInstance(el) : null;
      inst && inst.hide();
    }
  };

  return (
    <>
      {/* NAVBAR estilo vidrio + blur; links centrados */}
      <nav
        className={`navbar navbar-expand-lg navbar-glass sticky-top ${scrolled ? "is-scrolled" : ""}`}
        data-bs-theme="dark"
      >
        <div className="container position-relative">
          {/* Marca (izquierda) */}
          <a className="navbar-brand fw-bold" href="#inicio" onClick={closeIfOpen}>
            Koenig Fotografía
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMain"
            aria-controls="navMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Menú colapsable: links centrados */}
          <div className="collapse navbar-collapse justify-content-center" id="navMain">
            <ul className="navbar-nav mx-auto gap-lg-3 text-center">
              <li className="nav-item">
                <a className={`nav-link ${active === "inicio" ? "active" : ""}`} href="#inicio" onClick={closeIfOpen}>
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${active === "galeria" ? "active" : ""}`} href="#galeria" onClick={closeIfOpen}>
                  Galería
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${active === "bio" ? "active" : ""}`} href="#bio" onClick={closeIfOpen}>
                  Bio
                </a>
              </li>

              {/* CTA dentro del menú en mobile */}
              <li className="nav-item d-lg-none mt-2">
                <a
                  className={`btn btn-outline-light btn-cta rounded-pill w-100 ${active === "contacto" ? "active" : ""}`}
                  href="#contacto"
                  onClick={closeIfOpen}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* CTA fija a la derecha en desktop */}
          <a
            className={`btn btn-outline-light btn-cta rounded-pill d-none d-lg-inline-flex position-absolute end-0 top-50 translate-middle-y ${active === "contacto" ? "active" : ""}`}
            href="#contacto"
            onClick={closeIfOpen}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Secciones */}
      <main>
        <section id="inicio" className="full-viewport">
          <Inicio />
        </section>

        <section id="galeria" className="section">
          <Galeria />
        </section>

        <section id="bio" className="section">
          <Bio />
        </section>

        <section id="contacto" className="section">
          <Contacto />
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Koenig Fotografía — Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
