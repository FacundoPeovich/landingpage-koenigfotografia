// src/Bio.jsx
function Bio() {
  const bioImg = `${import.meta.env.BASE_URL}fotos/lolo.jpg`;

  return (
    <div className="container bio">
      <div className="bio-media">
        <img
          src={bioImg}
          alt="Retrato del fotógrafo/a"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
      <div className="bio-text">
        <h2 className="section-title">Sobre mí</h2>
        <p>
          Soy <strong>Tu Nombre</strong>, fotógrafo/a con foco en capturar emociones reales:
          eventos, retratos y proyectos editoriales. Mi estilo combina luz natural,
          composición limpia y dirección sutil para lograr imágenes honestas y memorables.
        </p>
        <p>Trabajo en CABA y GBA. Disponible para viajes y proyectos especiales.</p>
        <div className="bio-links">
          <a className="btn btn-outline" href="https://www.instagram.com/lolo_koenig/" target="_blank" rel="noreferrer">Instagram</a>
          <a className="btn btn-outline" href="https://wa.me/54911XXXXXXXX" target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="btn btn-outline" href="mailto:koenig.fotografia@gmail.com">Email</a>
        </div>
      </div>
    </div>
  );
}

export default Bio;
