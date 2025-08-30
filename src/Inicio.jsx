// src/Inicio.jsx
function Inicio() {
  const heroBg = `${import.meta.env.BASE_URL}fotos/ex3.jpg`; // usa la base de Vite

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay">
        <h1 className="hero-title">Fotografía que cuenta historias</h1>
        <p className="hero-subtitle">Eventos • Escolares • Editorial • Retratos</p>
        <div className="hero-ctas">
          <a href="#galeria" className="btn btn-primary">Ver trabajos</a>
          <a href="#contacto" className="btn btn-outline">Contacto</a>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
