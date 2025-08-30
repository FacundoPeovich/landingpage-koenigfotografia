// src/App.jsx
import { useEffect, useState } from "react";
import Inicio from "./Inicio";
import Galeria from "./Galeria";
import Bio from "./Bio";
import Contacto from "./Contacto";
import "./App.css";

const SECTIONS = ["inicio", "galeria", "bio", "contacto"];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observa secciones y marca el link activo
  useEffect(() => {
    const opts = { root: null, rootMargin: "0px 0px -50% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, opts);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-content">
          {/* Marca (izquierda) */}
          <div className="brand">
            <a href="#inicio" onClick={closeMenu}>Tu Marca</a>
          </div>

          {/* Links centrados */}
          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <a href="#inicio"   onClick={closeMenu} className={active === "inicio" ? "active" : ""}>Inicio</a>
            <a href="#galeria"  onClick={closeMenu} className={active === "galeria" ? "active" : ""}>Galería</a>
            <a href="#bio"      onClick={closeMenu} className={active === "bio" ? "active" : ""}>Bio</a>
            <a href="#contacto" onClick={closeMenu} className={active === "contacto" ? "active" : ""}>Contacto</a>
          </nav>

          {/* Hamburguesa (derecha, móvil) */}
          <button
            className="menu-toggle"
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(v => !v)}
          >
            <span className="menu-icon" />
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="section full-viewport">
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
          <p>© {new Date().getFullYear()} Tu Nombre — Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
