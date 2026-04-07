/*
  Componente MailModal: modal con formulario de contacto integrado con Formspree.
  Se muestra como overlay sobre la página al hacer click en el botón de Mail.
  Recibe isOpen para controlar visibilidad y onClose para cerrar el modal.
*/

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ID de Formspree: reemplazar con el endpoint real del dashboard */
const FORMSPREE_ID = 'TU_FORMSPREE_ID';

const MailModal: React.FC<MailModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  /* Manejo del envío del formulario vía Formspree */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  /* Cierra el modal y resetea el estado de envío */
  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={handleClose}>
      {/* Contenedor del modal: detiene la propagación del click para no cerrar al interactuar */}
      <div className="neumorph-container w-full max-w-lg mx-4 p-8 relative" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-6 text-center">Envíame un mensaje</h3>

        {submitted ? (
          /* Estado de éxito tras enviar el formulario */
          <div className="text-center space-y-4 py-8">
            <p className="text-green-500 text-lg font-medium">¡Mensaje enviado correctamente!</p>
            <p className="text-gray-400">Te responderé lo antes posible.</p>
            <button onClick={handleClose} className="uiverse-btn text-sm py-2 px-6 mt-4">Cerrar</button>
          </div>
        ) : (
          /* Formulario de contacto */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#001004] border border-green-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#001004] border border-green-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Mensaje</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[#001004] border border-green-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            <button type="submit" className="uiverse-btn w-full py-3 text-sm font-bold">
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MailModal;
