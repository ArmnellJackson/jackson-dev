/*
  Componente Footer: pie de página con copyright.
  Permanece fijo en la parte inferior de la vista gracias al layout flexbox del contenedor padre.
*/

import React from 'react';

const Footer: React.FC = () => (
  <footer className="py-[8px] sm:py-3 px-4 sm:px-6 border-t border-green-900/20 text-center">
    <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">© 2026 Jackson. Todos los derechos reservados.</p>
  </footer>
);

export default Footer;
