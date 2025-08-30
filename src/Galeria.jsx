// src/Galeria.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { escolares, eventos, otros, extras } from "./data/gallery";

/* ---- Carrusel re-usable ---- */
function Carrusel({ titulo, fotos, onOpen }) {
  if (!fotos?.length) return null;

  return (
    <div className="gallery-block">
      <h2 className="section-title">{titulo}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        breakpoints={{
          0:    { slidesPerView: 1 },
          480:  { slidesPerView: 1.2 }, // asoma la próxima tarjeta
          640:  { slidesPerView: 2 },
          900:  { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1600: { slidesPerView: 5 },
        }}
        className="swiper-wrapper-custom"
      >
        {fotos.map((foto, idx) => (
          <SwiperSlide key={idx}>
            <figure className="gallery-card" onClick={() => onOpen(fotos, idx, titulo)}>
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

  // Foco inicial + teclado (ESC, ←/→, TAB trap)
  useEffect(() => {
    const previous = document.activeElement;
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      if (e.key === "Tab") {
        const order = [prevBtnRef.current, closeBtnRef.current, nextBtnRef.current].filter(Boolean);
        if (order.length === 0) return;
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
        {/* Contador accesible */}
        <div className="lb-counter" aria-live="polite">
          {index + 1} / {list.length}
        </div>

        {/* Imagen */}
        <img className="lightbox-img" src={item.src} alt={caption} />

        {/* Caption */}
        <div className="lb-caption">{caption}</div>

        {/* Controles */}
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

  const openLightbox = (list, index /*, titulo */) => {
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
    <div className="container-wide">
      <h1 className="section-kicker">Galería</h1>

      <Carrusel titulo="Escolares" fotos={escolares} onOpen={openLightbox} />
      <Carrusel titulo="Eventos" fotos={eventos} onOpen={openLightbox} />
      <Carrusel titulo="Otros" fotos={otros} onOpen={openLightbox} />
      <Carrusel titulo="Extras" fotos={extras} onOpen={openLightbox} />

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
