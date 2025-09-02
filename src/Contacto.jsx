// src/Contacto.jsx
import { useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";

const initial = { nombre: "", email: "", mensaje: "", website: "" }; // website = honeypot

function Contacto() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const formRef = useRef(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);

  const validate = useCallback((v) => {
    const e = {};
    if (!v.nombre || v.nombre.trim().length < 2) e.nombre = "Ingresá tu nombre.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!v.email || !re.test(v.email)) e.email = "Ingresá un email válido.";
    if (!v.mensaje || v.mensaje.trim().length < 10) e.mensaje = "Contame un poco más (mín. 10 caracteres).";
    return e;
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);

    // Validación en vivo por campo
    const fieldError = validate(next)[name];
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (values.website) return; // honeypot

    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length) {
      if (eMap.nombre) nameRef.current?.focus();
      else if (eMap.email) emailRef.current?.focus();
      else if (eMap.mensaje) msgRef.current?.focus();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      setValues(initial);
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      console.error(err);
      alert("No se pudo enviar el mensaje. Probá de nuevo más tarde.");
      setStatus("idle");
    }
  }

  return (
    <div className="container py-5">
      <h2 className="h3 section-title mb-3">Contacto</h2>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="contact-form">
        {/* Honeypot (oculto) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          onChange={onChange}
        />

        <div className="row g-3">
          {/* Nombre */}
          <div className="col-12 col-md-6">
            <label className="form-label">Nombre</label>
            <input
              ref={nameRef}
              type="text"
              name="nombre"
              value={values.nombre}
              onChange={onChange}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "err-nombre" : undefined}
              required
              className={`form-control ${errors.nombre ? "is-invalid error" : ""}`}
            />
            {errors.nombre && (
              <div id="err-nombre" className="invalid-feedback d-block form-error">
                {errors.nombre}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="col-12 col-md-6">
            <label className="form-label">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              required
              className={`form-control ${errors.email ? "is-invalid error" : ""}`}
            />
            {errors.email && (
              <div id="err-email" className="invalid-feedback d-block form-error">
                {errors.email}
              </div>
            )}
          </div>

          {/* Mensaje */}
          <div className="col-12">
            <label className="form-label">Mensaje</label>
            <textarea
              ref={msgRef}
              name="mensaje"
              rows="5"
              value={values.mensaje}
              onChange={onChange}
              aria-invalid={!!errors.mensaje}
              aria-describedby={errors.mensaje ? "err-mensaje" : undefined}
              required
              className={`form-control ${errors.mensaje ? "is-invalid error" : ""}`}
            />
            {errors.mensaje && (
              <div id="err-mensaje" className="invalid-feedback d-block form-error">
                {errors.mensaje}
              </div>
            )}
          </div>

          {/* Botón pill ancho centrado */}
          <div className="col-12">
            <button
              className="btn btn-light btn-submit rounded-pill w-100 py-3 fs-6 fw-semibold"
              type="submit"
              disabled={status !== "idle"}
            >
              {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado ✅" : "Enviar"}
            </button>
            {status === "sent" && (
              <p className="form-ok mb-0 mt-2 text-center" aria-live="polite">
                ¡Gracias! Tu mensaje fue enviado.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Contacto;
