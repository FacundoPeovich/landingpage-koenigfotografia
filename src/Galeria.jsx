// src/Galeria.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Importá tus nuevas secciones
import { escolares, eventos, musica, deportes } from "./data/gallery.js";

/* ---- Carrusel re-usable ---- */
function Carrusel({ titulo, fotos, onOpen }) {
  if (!fotos?.length) return null;

  return (
    <div className="gallery-block">
      <h2 className="h3 mb-3 section-title">{titulo}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        watchOverflow={true}
        // 👉 Menos slides por vista = cards más grandes
        breakpoints={{
          0:    { slidesPerView: 1.05, spaceBetween: 12 }, // asoma la siguiente
          480:  { slidesPerView: 1.3,  spaceBetween: 14 },
          640:  { slidesPerView: 2,    spaceBetween: 16 },
          900:  { slidesPerView: 2.5,  spaceBetween: 18 },
          1200: { slidesPerView: 3,    spaceBetween: 22 }, // antes 4
          1536: { slidesPerView: 4,    spaceBetween: 24 }, // antes 5
        }}
        className="swiper-wrapper-custom"
      >
        {fotos.map((foto, idx) => (
          <SwiperSlide key={idx}>
            <figure
              className="gallery-card"
              onClick={() => onOpen(fotos, idx, titulo)}
            >
              <img
                src={foto.src}
                alt={foto.alt || `${titulo} ${idx + 1}`}
                loading="lazy"
              />
              {foto.caption && <figcaption>{foto.caption}</figcaption>}
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/* ---- Lightbox accesible con contador/caption ---- */
function Lightbox({ list, index, onClose, onPrev, onNext }) {
  if (!list?.length) return null;
  const item = list[index];

  const closeBtnRef = useRef(null);
  const prevBtnRef  = useRef(null);
  const nextBtnRef  = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      if (e.key === "Tab") {
        const order = [prevBtnRef.current, closeBtnRef.current, nextBtnRef.current].filter(Boolean);
        if (!order.length) return;
        const first = order[0];
        const last = order[order.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const caption = item.caption || item.alt || "Imagen";

  return (
    <div className="lightbox" onClick={onClose}>
      <div
        className="lightbox-content"
        role="dialog"
        aria-modal="true"
        aria-label={`Vista ampliada. ${caption}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lb-counter" aria-live="polite">
          {index + 1} / {list.length}
        </div>

        <img className="lightbox-img" src={item.src} alt={caption} />

        <div className="lb-caption">{caption}</div>

        <button
          ref={closeBtnRef}
          className="lb-btn lb-close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>
        <button
          ref={prevBtnRef}
          className="lb-btn lb-prev"
          aria-label="Anterior"
          onClick={onPrev}
        >
          ‹
        </button>
        <button
          ref={nextBtnRef}
          className="lb-btn lb-next"
          aria-label="Siguiente"
          onClick={onNext}
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ---- Página Galería ---- */
function Galeria() {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbList, setLbList] = useState([]);
  const [lbIndex, setLbIndex] = useState(0);

  const openLightbox = (list, index) => {
    setLbList(list);
    setLbIndex(index);
    setLbOpen(true);
  };

  const closeLightbox = useCallback(() => setLbOpen(false), []);
  const prevLightbox = useCallback(
    () => setLbIndex((i) => (i - 1 + lbList.length) % lbList.length),
    [lbList.length]
  );
  const nextLightbox = useCallback(
    () => setLbIndex((i) => (i + 1) % lbList.length),
    [lbList.length]
  );

  return (
    <div className="container-xxl py-5">
      <p className="section-kicker mb-1">Galería</p>

      <Carrusel titulo="Escolares"         fotos={escolares} onOpen={openLightbox} />
      <Carrusel titulo="Eventos"  fotos={eventos}   onOpen={openLightbox} />
      <Carrusel titulo="Música"    fotos={musica}    onOpen={openLightbox} />
      <Carrusel titulo="Deportes"          fotos={deportes}  onOpen={openLightbox} />

      {lbOpen && (
        <Lightbox
          list={lbList}
          index={lbIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </div>
  );
}

export default Galeria;
