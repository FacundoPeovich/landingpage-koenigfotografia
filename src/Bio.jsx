// src/Bio.jsx
function Bio() {
  const base = import.meta.env.BASE_URL;

  // 👉 cambia esta versión cuando quieras forzar recarga del asset
  const ASSET_VER = "2";

  // ruta principal y de respaldo + cache-busting (?v=2)
  const primary  = `${base}fotos/lolo.jpg?v=${ASSET_VER}`;
  const fallback = `${base}fotos/otros/lolo.jpg?v=${ASSET_VER}`;

  return (
    <div className="container bio">
      <div className="bio-media">
        <img
          src={primary}
          alt="Retrato del fotógrafo/a"
          onError={(e) => {
            // si falló la principal, probamos la de /fotos/otros/
            const img = e.currentTarget;
            if (!img.dataset.triedFallback) {
              img.dataset.triedFallback = "1";
              img.src = fallback;
            } else {
              // si también falla, ocultamos
              img.style.display = "none";
            }
          }}
        />
      </div>

      <div className="bio-text">
        <h2 className="section-title">Sobre mí</h2>
        <p>
          Soy <strong>Lourdes Koenig</strong>, fotógrafa con foco en capturar emociones reales:
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
