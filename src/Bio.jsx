// src/Bio.jsx
import React from "react";

function Bio() {
  const base = import.meta.env.BASE_URL;
  const ASSET_VER = "2";

  // rutas (cache-busting con ?v=2)
  const primary  = `${base}fotos/lolo.jpg?v=${ASSET_VER}`;
  const fallback = `${base}fotos/otros/lolo.jpg?v=${ASSET_VER}`;

  const handleError = (e) => {
    const img = e.currentTarget;
    if (!img.dataset.triedFallback) {
      img.dataset.triedFallback = "1";
      img.src = fallback;
    } else {
      img.style.display = "none";
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        {/* Imagen */}
        <div className="col-12 col-lg-5 d-flex justify-content-center">
          <img
            src={primary}
            alt="Retrato de Lourdes Koenig"
            onError={handleError}
            className="img-fluid rounded-4 shadow"
            style={{ maxWidth: 360 }}
          />
        </div>

        {/* Texto */}
        <div className="col-12 col-lg-7">
          <h2 className="h3 section-title mb-3">Sobre mí</h2>
          <p className="mb-2">
            Soy <strong>Lourdes Koenig</strong>, fotógrafa con foco en capturar
            emociones reales: eventos, retratos y proyectos editoriales. Mi estilo combina
            luz natural, composición limpia y dirección sutil para lograr imágenes honestas y memorables.
          </p>
          <p className="mb-0">Trabajo en CABA y GBA. Disponible para viajes y proyectos especiales.</p>

          <div className="d-flex flex-wrap gap-2 mt-3">
            <a
              className="btn btn-outline-light"
              href="https://www.instagram.com/lolo_koenig/"
              target="_blank" rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="btn btn-outline-light"
              href="https://wa.me/54911XXXXXXXX"
              target="_blank" rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-light"
              href="mailto:koenig.fotografia@gmail.com"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bio;
