/*
  Componente MailModal: modal con formulario de contacto integrado con Formspree.
  Utiliza @formspree/react para gestionar el envío, validación y estados del formulario.
  Se muestra como overlay al hacer click en el botón de Mail en la sección Contacto.
*/

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { X } from 'lucide-react';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MailModal: React.FC<MailModalProps> = ({ isOpen, onClose }) => {
  /* Hook de Formspree: gestiona el estado de envío y errores de validación */
  const [state, handleSubmit] = useForm('xpwdrazz');

  if (!isOpen) return null;

  /* Cierra el modal (el estado de éxito persiste hasta recargar la página) */
  const handleClose = () => {
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

        {state.succeeded ? (
          /* Estado de éxito tras enviar el formulario */
          <div className="text-center space-y-4 py-8">
            <p className="text-green-500 text-lg font-medium">¡Mensaje enviado correctamente!</p>
            <p className="text-gray-400">Te responderé lo antes posible.</p>
            <button onClick={handleClose} className="uiverse-btn text-sm py-2 px-6 mt-4">Cerrar</button>
          </div>
        ) : (
          /* Formulario de contacto con validación de Formspree */
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
              <ValidationError prefix="Nombre" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
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
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
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
              <ValidationError prefix="Mensaje" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
            </div>
            <button type="submit" disabled={state.submitting} className="uiverse-btn w-full py-3 text-sm font-bold disabled:opacity-50">
              {state.submitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MailModal;
