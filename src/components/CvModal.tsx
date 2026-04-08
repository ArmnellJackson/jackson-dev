/*
  Componente CvModal: modal a pantalla completa que renderiza el CV en formato PDF.
  Usa un <iframe> para incrustar el visor nativo del navegador, con fallback de descarga
  directa para dispositivos móviles donde el visor embebido puede no funcionar.
  Cierre mediante botón X, tecla Escape o click en el overlay.
*/

import React, { useEffect, useCallback } from 'react';
import { X, Download } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  /* Cierra el modal al presionar la tecla Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    /* Bloquea el scroll del body mientras el modal está abierto */
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 md:p-8"
      onClick={onClose}
    >
      {/* Contenedor del modal: detiene la propagación del click para no cerrar al interactuar */}
      <div
        className="neumorph-container relative w-full max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col p-3 sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior: título y controles de acción */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0">
          <h3 className="text-lg sm:text-xl font-bold text-white">Curriculum Vitae</h3>
          <div className="flex items-center gap-2">
            {/* Botón de descarga directa del PDF */}
            <a
              href="/CV-DEV.pdf"
              download
              className="text-gray-400 hover:text-green-500 transition-colors p-1.5 sm:p-2"
              title="Descargar CV"
            >
              <Download className="w-5 h-5" />
            </a>
            {/* Botón de cierre */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-green-500 transition-colors p-1.5 sm:p-2"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visor PDF: iframe con el visor nativo del navegador */}
        <div className="flex-1 min-h-0 rounded-2xl overflow-hidden bg-[#001004] border border-green-900/30">
          <iframe
            src="/CV-DEV.pdf"
            title="CV de Jackson"
            className="w-full h-full border-none"
          />
        </div>

        {/* Fallback para móviles donde el visor embebido no funciona correctamente */}
        <div className="mt-3 text-center sm:hidden shrink-0">
          <a
            href="/CV-DEV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="uiverse-btn inline-block text-xs py-2 px-6 font-bold"
          >
            Abrir CV en nueva pestaña
          </a>
        </div>
      </div>
    </div>
  );
};

export default CvModal;
