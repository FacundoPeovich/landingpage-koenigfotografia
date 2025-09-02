// src/Inicio.jsx
function Inicio() {
  const heroBg = `${import.meta.env.BASE_URL}fotos/ex3.jpg`;

  return (
    <div className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay">
        <div className="container">
          <h1 className="hero-title fw-bold">Fotografía que cuenta historias</h1>
          <p className="hero-subtitle">Eventos • Escolares • Editorial • Retratos</p>
          <div className="hero-ctas">
            {/* ↓ antes: btn btn-light btn-lg rounded-pill */}
            <a href="#galeria"  className="btn btn-light rounded-pill px-4 py-2 fs-6">Ver trabajos</a>
            {/* ↓ antes: btn btn-outline-light btn-lg rounded-pill */}
            <a href="#contacto" className="btn btn-outline-light rounded-pill px-4 py-2 fs-6">Contacto</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
