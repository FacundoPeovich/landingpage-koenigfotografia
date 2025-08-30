// src/Inicio.jsx
function Inicio() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: "url(/fotos/ex3.jpg)", // tu imagen
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
